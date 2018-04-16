import { expect } from 'chai';
import { assert } from 'chai';
import * as JsTypeCommander from './dist/JsTypeCommander';
import { describe } from 'mocha';

enum TypeMappingCondition {
    whenBoolean, whenFunction, whenInfinity, whenNaN, whenNumber, whenArray, whenArrayLike, whenNotArrayLike, whenString, whenSymbol, whenNull, whenUndefined, whenObject, otherwise
}
function typeMappingConditionToString(value: TypeMappingCondition): string {
    switch (value) {
        case TypeMappingCondition.whenBoolean:
            return "whenBoolean";
        case TypeMappingCondition.whenFunction:
            return "whenFunction";
        case TypeMappingCondition.whenInfinity:
            return "whenInfinity";
        case TypeMappingCondition.whenNaN:
            return "whenNaN";
        case TypeMappingCondition.whenNumber:
            return "whenNumber";
        case TypeMappingCondition.whenArray:
            return "whenArray";
        case TypeMappingCondition.whenArrayLike:
            return "whenArrayLike";
        case TypeMappingCondition.whenNotArrayLike:
            return "whenNotArrayLike";
        case TypeMappingCondition.whenString:
            return "whenString";
        case TypeMappingCondition.whenSymbol:
            return "whenSymbol";
        case TypeMappingCondition.whenNull:
            return "whenNull";
        case TypeMappingCondition.whenUndefined:
            return "whenUndefined";
        case TypeMappingCondition.whenObject:
            return "whenObject";
    }
    return "otherwise";
}
enum TestRunOption { default, only, skip };
enum TypeGateNilHandling { notNil, allowUndefined, allowNull, allowNil }
enum JsType { Undefined, Boolean, Number, String, Symbol, Function, Object }
enum JsVariant { None, Null, NotEmpty, Empty, }

interface ArgValueSpec { display: string; getValue: { (): JsTypeCommander.TAnythingAtAll; }; }
interface PrimaryArgSpec extends ArgValueSpec { type: JsType; variant?: JsVariant; argN?: ArgValueSpec[]; }

interface TestDataInfo {
    argsName: string;
    args?: PrimaryArgSpec;
    genericArgs?: (string|ArgValueSpec)[];
    mode?: TestRunOption;
    passed?: boolean;
}

interface TypeMappingTestDataInfo extends TestDataInfo {
    implement?: {
        exclude: boolean;
        callbacks: TypeMappingCondition[];
    }|TypeMappingCondition[];
    expectedResult: TypeMappingCondition;
}

interface FunctionInfo {
    name: string;
    function: Function;
    mode?: TestRunOption;
    passed?: boolean;
}

interface TestGroup {
    description: string;
    option?: TestRunOption;
    passed?: boolean;
}

interface TypeMappingFunction extends FunctionInfo {
    tests: TypeMappingTestDataInfo[];
    type: "type";
}

interface NilMappingFunction extends FunctionInfo {
    nilHandling: TypeGateNilHandling;
    tests: TestDataInfo[];
    type: "nil";
}

interface MappingsSuite extends TestGroup {
    type: "map";
    functions: (TypeMappingFunction|NilMappingFunction)[];
}

interface TypeGateFunctionInfo extends FunctionInfo {
    nilHandling: TypeGateNilHandling;
    expectTrue: { (type: JsType, variant: JsVariant, argsName: string): boolean; }
}

interface TypeGatesContainer extends TestGroup {
    groups: (TypeGatesNested|TypeGatesLeaf)[];
}

interface TypeGatesNested extends TypeGatesContainer {
    isContainer: true;
}

interface TypeGatesLeaf extends TestGroup {
    functions: TypeGateFunctionInfo[];
    isContainer: false;
}

interface TypeGatesSuite extends TypeGatesContainer {
    type: "gate";
}

let typeGateTestData: TestDataInfo[] = [];

let testDefinitionArray: (TypeGatesSuite|MappingsSuite)[] = [
];

function describeOpt(description: string, callback: { (this: Mocha.ISuiteCallbackContext): void }, option: TestRunOption = TestRunOption.default): Mocha.ISuite|void {
    if (option === TestRunOption.only)
        return describe.only(description, callback);
    if (option !== TestRunOption.skip)
        return describe(description, callback);
    describe.skip(description, callback);
}

function itOpt(expectation: string, callback?: { (this: Mocha.ITestCallbackContext, done: MochaDone): PromiseLike<any> | void }, option: TestRunOption = TestRunOption.default): Mocha.ITest|void {
    if (option === TestRunOption.only)
        return it.only(expectation, callback);
    if (option !== TestRunOption.skip)
        return it(expectation, callback);
    it.skip(expectation, callback);
}

function getArgInfo(testData: TestDataInfo, funcName: string, ...argN: ArgValueSpec[]) : { expectation: string, primaryArg: PrimaryArgSpec, args: JsTypeCommander.TAnythingAtAll[] } {
    let expectation: string = funcName;
    let ga: ArgValueSpec[] = [];
    if (typeof(testData.genericArgs) !== "undefined" && testData.genericArgs.length > 0) {
        expectation += "<" + testData.genericArgs.map(a => {
            if (typeof(a) == "string")
                return a;
            ga.push(a.getValue());
            return a.display;
        }).join(",") + ">";
    }
    expectation += "(";
    let args: JsTypeCommander.TAnythingAtAll[];
    let primaryArg: PrimaryArgSpec;
    if (typeof(testData.args) == undefined) {
        args = [];
        if (typeof(argN) != "undefined" && argN.length > 0)
            expectation += argN.map(a => {
                args.push(a.getValue());
                return a.display;
            }).join(", ");
        primaryArg = { display: '', getValue: () => undefined, type: JsType.Undefined };
    } else {
        args = [primaryArg.getValue()];
        expectation += primaryArg.display;
        if (typeof(argN) != "undefined" && argN.length > 0)
            expectation += ", " + argN.map(a => {
                args.push(a.getValue());
                return a.display;
            }).join(", ");
        if (typeof(primaryArg.argN) != "undefined" && primaryArg.argN.length > 0)
            expectation += ", " + primaryArg.argN.map(a => {
                args.push(a.getValue());
                return a.display;
            }).join(", ");
    }
    expectation += ") should return ";
    if (ga.length > 0)
        args = ((args.length == 0) ? [undefined] : args).concat(ga);
    return { expectation: expectation, primaryArg: primaryArg, args: args };
}
function iterateTypeGateGroups(groups: (TypeGatesNested|TypeGatesLeaf)[], thisObj: any) {
    groups.forEach(grp => describeOpt(grp.description, function() {
        if (grp.isContainer === true) {
            iterateTypeGateGroups(grp.groups, this);
            return;
        }
        grp.functions.forEach(funcDef => describeOpt('Testing ' + funcDef.name + ' function', function() {
            typeGateTestData.forEach(testData => {
                let argInfo = getArgInfo(testData, funcDef.name);
                let expected: boolean;
                if (argInfo.primaryArg.type == JsType.Undefined)
                    expected = funcDef.nilHandling == TypeGateNilHandling.allowUndefined || funcDef.nilHandling == TypeGateNilHandling.allowNil;
                else if (argInfo.primaryArg.variant === JsVariant.Null)
                    expected = funcDef.nilHandling == TypeGateNilHandling.allowNull || funcDef.nilHandling == TypeGateNilHandling.allowNil;
                else
                    expected = funcDef.expectTrue(argInfo.primaryArg.type, (typeof(argInfo.primaryArg.variant) == "undefined") ? JsVariant.None : argInfo.primaryArg.variant, testData.argsName);
                    argInfo.expectation += expected;
                itOpt(argInfo.expectation, function() {
                    let result: JsTypeCommander.TAnythingAtAll = funcDef.function.call(this, argInfo.args);
                    expect(result).to.equal(expected);
                }, testData.mode);
            }, this);
        }, funcDef.mode), this);
    }, grp.option), thisObj);
}
class TypeMappingHelper implements JsTypeCommander.TypeGateCallbacks<JsTypeCommander.TAnythingAtAll, TypeMappingCondition> {
    appliedValue: JsTypeCommander.TAnythingAtAll;
    expectation: string;
    primaryArg: PrimaryArgSpec;
    args: JsTypeCommander.TAnythingAtAll[];
    callbackFlags: number = 0;
    invocationCount: number = 0;

    whenBoolean?: JsTypeCommander.MapFromValueCallback<boolean, TypeMappingCondition>;
    whenFunction?: JsTypeCommander.MapFromValueCallback<Function, TypeMappingCondition>;
    whenInfinity?: JsTypeCommander.MapFromValueCallback<number, TypeMappingCondition>;
    whenNaN?: JsTypeCommander.MapFromValueCallback<number, TypeMappingCondition>;
    whenNumber?: JsTypeCommander.MapFromValueCallback<number, TypeMappingCondition>;
    whenArray?: JsTypeCommander.MapFromValueCallback<JsTypeCommander.TAnythingAtAll[], TypeMappingCondition>;
    whenArrayLike?: JsTypeCommander.MapFromValueCallback<ArrayLike<JsTypeCommander.TAnythingAtAll>, TypeMappingCondition>;
    whenNotArrayLike?: JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, TypeMappingCondition>;
    whenString?: JsTypeCommander.MapFromValueCallback<string, TypeMappingCondition>;
    whenSymbol?: JsTypeCommander.MapFromValueCallback<symbol, TypeMappingCondition>;
    whenNull?: JsTypeCommander.MapFromValueCallback<null, TypeMappingCondition>;
    whenUndefined?: JsTypeCommander.MapFromValueCallback<undefined, TypeMappingCondition>;
    whenObject?: JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, TypeMappingCondition>;
    otherwise(value: JsTypeCommander.TAnythingAtAll) : TypeMappingCondition { return this._onCallback(value, TypeMappingCondition.otherwise); }
    _onCallback(value: JsTypeCommander.TAnythingAtAll, cb: TypeMappingCondition) : TypeMappingCondition {
        this.appliedValue = value;
        this.invocationCount++;
        this.callbackFlags |= cb;
        return cb;
    }
    constructor(testData: TypeMappingTestDataInfo, funcName: string) {
        let implementedFunctions: TypeMappingCondition[] = [
            TypeMappingCondition.whenBoolean, TypeMappingCondition.whenFunction, TypeMappingCondition.whenInfinity, TypeMappingCondition.whenNaN, TypeMappingCondition.whenNumber,
            TypeMappingCondition.whenArray, TypeMappingCondition.whenArrayLike, TypeMappingCondition.whenNotArrayLike, TypeMappingCondition.whenString,
            TypeMappingCondition.whenSymbol, TypeMappingCondition.whenNull, TypeMappingCondition.whenUndefined, TypeMappingCondition.whenObject, TypeMappingCondition.otherwise
        ];
        if (typeof(testData.implement) != "undefined") {
            let arr: TypeMappingCondition[];
            if (Array.isArray(testData.implement)) {
                arr = testData.implement;
                implementedFunctions = implementedFunctions.filter(c => arr.filter(i => (i & c) != 0).length > 0);
            }
            else {
                arr = testData.implement.callbacks;
                if (testData.implement.exclude !== true)
                    implementedFunctions = implementedFunctions.filter(c => arr.filter(i => (i & c) != 0).length == 0);
                else 
                    implementedFunctions = implementedFunctions.filter(c => arr.filter(i => (i & c) == 0).length == 0);
            }
            if (implementedFunctions.filter(c => c == TypeMappingCondition.otherwise).length == 0)
                implementedFunctions.push(TypeMappingCondition.otherwise);
        }
        let implementedNames: { [key: string]: boolean } = { };
        let display: string = implementedFunctions.map(i => {
            let n: string = typeMappingConditionToString(i);
            implementedNames[n] = true;
            return n;
        }).join(': fn(), ') + ': fn()';
        let thisObj = this;
        if (implementedNames["whenBoolean"])
            this.whenBoolean = v => thisObj._onCallback(v, TypeMappingCondition.whenBoolean);
        if (implementedNames["whenFunction"])
            this.whenFunction = v => thisObj._onCallback(v, TypeMappingCondition.whenFunction);
        if (implementedNames["whenInfinity"])
            this.whenInfinity = v => thisObj._onCallback(v, TypeMappingCondition.whenInfinity);
        if (implementedNames["whenNaN"])
            this.whenNaN = v => thisObj._onCallback(v, TypeMappingCondition.whenNaN);
        if (implementedNames["whenNumber"])
            this.whenNumber = v => thisObj._onCallback(v, TypeMappingCondition.whenNumber);
        if (implementedNames["whenArray"])
            this.whenArray = v => thisObj._onCallback(v, TypeMappingCondition.whenArray);
        if (implementedNames["whenArrayLike"])
            this.whenArrayLike = v => thisObj._onCallback(v, TypeMappingCondition.whenArrayLike);
        if (implementedNames["whenNotArrayLike"])
            this.whenNotArrayLike = v => thisObj._onCallback(v, TypeMappingCondition.whenNotArrayLike);
        if (implementedNames["whenString"])
            this.whenString = v => thisObj._onCallback(v, TypeMappingCondition.whenString);
        if (implementedNames["whenSymbol"])
            this.whenSymbol = v => thisObj._onCallback(v, TypeMappingCondition.whenSymbol);
        if (implementedNames["whenNull"])
            this.whenNull = v => thisObj._onCallback(v, TypeMappingCondition.whenNull);
        if (implementedNames["whenUndefined"])
            this.whenUndefined = v => thisObj._onCallback(v, TypeMappingCondition.whenUndefined);
        if (implementedNames["whenObject"])
            this.whenObject = v => thisObj._onCallback(v, TypeMappingCondition.whenObject);
        let argInfo = getArgInfo(testData, funcName, { getValue: () => {
            thisObj.invocationCount = 0;
            this.callbackFlags = 0;
            this.appliedValue = undefined;
            return thisObj;
        }, display: '{ ' + display + ' }' });
        this.args = argInfo.args;
        this.expectation = argInfo.expectation + testData.expectedResult + " (calls " + typeMappingConditionToString(testData.expectedResult) + "())";
        this.primaryArg = argInfo.primaryArg;
    }
}
testDefinitionArray.forEach(testDef => describeOpt(testDef.description, function() {
    if (testDef.type == "gate") {
        iterateTypeGateGroups(testDef.groups, this);
        return;
    }
    testDef.functions.forEach(funcDef => describeOpt("Testing " + funcDef.name + " function", function() {
        if (funcDef.type == "type") {
            funcDef.tests.forEach(testData => {
                let argInfo = new TypeMappingHelper(testData, funcDef.name);
                itOpt(argInfo.expectation, function() {
                    let result: JsTypeCommander.TAnythingAtAll = funcDef.function.call(this, argInfo.args);
                    expect(result).to.equal(testData.expectedResult);
                    expect(argInfo.callbackFlags).to.equal(testData.expectedResult, "Callback flag validation");
                    expect(argInfo.invocationCount).to.equal(1, "Callback count validation");
                    expect(argInfo.appliedValue).to.equal((argInfo.args.length == 0) ? undefined : argInfo.args[0], "Called value validation");
                }, testData.mode);
            })
        } else {
            funcDef.tests.forEach(testData => {
                let argInfo = getArgInfo(testData, funcDef.name);
                let expected: boolean;
                if (argInfo.primaryArg.type == JsType.Undefined)
                    expected = funcDef.nilHandling == TypeGateNilHandling.allowUndefined || funcDef.nilHandling == TypeGateNilHandling.allowNil;
                else if (argInfo.primaryArg.variant === JsVariant.Null)
                    expected = funcDef.nilHandling == TypeGateNilHandling.allowNull || funcDef.nilHandling == TypeGateNilHandling.allowNil;
                else
                    expected = funcDef.nilHandling == TypeGateNilHandling.notNil;
                argInfo.expectation += expected;
                itOpt(argInfo.expectation, function() {
                    let result: JsTypeCommander.TAnythingAtAll = funcDef.function.call(this, argInfo.args);
                    expect(result).to.equal(expected);
                }, testData.mode);
            })
        }
    }));
}, testDef.option));