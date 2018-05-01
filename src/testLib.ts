import { expect } from 'chai';
import { JsTypeCommander } from '../dist/JsTypeCommander';

export class TestLengthProp {
    private _length: number;
    get length(): number { return this._length; }
    constructor(n?: number) { this._length = (typeof(n) == "number") ? n : 0; }
}
export class TestArrayLike<T> extends TestLengthProp implements ArrayLike<T> {
    [key: number]: T;
    constructor(n?: number, ...value: (T|T[])[]) {
        super(n);
        if (typeof(value) !== "object" || value === null || !Array.isArray(value) || value.length == 0)
            return;
        
        let i: number = 0;
        value.forEach((e: T|T[]) => {
            if (Array.isArray(e))
                e.forEach(v => {
                    this[i] = v;
                    i++;
                });
            else {
                this[i] = e;
                i++;
            }
        })
    }
}
export class AlmostArrayLike<T> extends TestArrayLike<T> {
    constructor(value: T|T[], ...otherValues: T[]) {
        let i: number = (Array.isArray(value)) ? value.length : 1;
        let n: number = (typeof(otherValues) != "undefined" && Array.isArray(otherValues)) ? otherValues.length : 0;
        super(i + n, value);
        if (typeof(otherValues) == "undefined" || !Array.isArray(otherValues))
            return;
        for (let p: number = 0; p < n; p++)
            this[i + p + 1] = otherValues[p];
    }
}
export class TestErrorLike {
    message: string = "Example Error";
    get name(): string { return "TestErrorLike"; }
}
export class TestErrorLike2 extends TestErrorLike {
    number: number = 12;
    get name(): string { return "TestErrorLike2"; }
}
export class TestErrorLike3 extends TestErrorLike2 implements JsTypeCommander.ErrorLike {
    description?: string;
    fileName?: string;
    lineNumber?: number;
    stack?: string;
    get name(): string { return "TestErrorLike3"; }
}

export interface IFunctionDefinition {
    name: string;
    signature: string;
    callback: Function;
    expectations: (IExpectEquals|IExpectIs)[];
    _type: "FunctionDefinition";
}
export interface IArgSet { display: string; getArgs: { (): (any|null|undefined)[] }; message?: string; _type: "ArgSet" }
export interface IExpectEquals {
    display: string;
    getExpectedValue: { (): any|null|undefined; };
    argSets: IArgSet[];
    _type: "ExpectEquals";
}
export interface IExpectIs {
    display: string;
    expectedType: string;
    argSets: IArgSet[];
    _type: "ExpectIs";
}
export interface IExpectationSet {
    description?: string;
    expectations: (IExpectEquals|IExpectIs)[];
    functions: IFunctionDefinition[];
    getGenericArgs?: { (): (any|null|undefined)[] };
    _type: "ExpectationSet";
}
export interface IFunctionGroup {
    description?: string;
    expectations: (IExpectEquals|IExpectIs)[];
    sets: IExpectationSet[];
    _type: "FunctionGroup";
}
export interface IFunctionTypeGroup {
    type: string;
    expectations: (IExpectEquals|IExpectIs)[];
    groups: IFunctionGroup[];
    _type: "TypeGroup";
}
export function argSet(getArgs: { (): (any|null|undefined)[] }, display: string, message?: string): IArgSet {
    return { display: display, getArgs: getArgs, message: message, _type: "ArgSet" };
}
export function expectEqualTo(display: string, getExpectedValue: { (): any|null|undefined[]; }, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: display, getExpectedValue: getExpectedValue, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
export function expectIsA(type: string, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectIs {
    let result: IExpectIs = { display: type, expectedType: type, argSets: [argSet], _type: "ExpectIs"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
export function expectEqualToFalse(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: 'false', getExpectedValue: () => false, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
export function expectEqualToTrue(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: 'true', getExpectedValue: () => true, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
export function testFunction(callback: Function, name: string, signature: string, ...expectations: (IExpectEquals|IExpectIs)[]): IFunctionDefinition {
    return { callback: callback, name: name, signature: signature, expectations: expectations, _type: "FunctionDefinition" };
}
export function expectationDescription(description: string, content: IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IFunctionDefinition|IExpectEquals|IExpectIs)[]): IExpectationSet {
    let result: IExpectationSet = { description: description, expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "FunctionDefinition")
        result.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof(moreContents) == "object" && moreContents !== null)
        moreContents.forEach(c => {
            if (c._type == "FunctionDefinition")
                result.functions.push(c);
            else
                result.expectations.push(c);
        });
    return result;
}
export function expectationSet(content: IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IFunctionDefinition|IExpectEquals|IExpectIs)[]): IExpectationSet {
    let result: IExpectationSet = { expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "FunctionDefinition")
        result.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof(moreContents) == "object" && moreContents !== null)
        moreContents.forEach(c => {
            if (c._type == "FunctionDefinition")
                result.functions.push(c);
            else
                result.expectations.push(c);
        });
    return result;
}
export function functionGroup(description: string, content: IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs)[]): IFunctionGroup {
    let result: IFunctionGroup = { description: description, expectations: [], sets: [], _type: "FunctionGroup" };
    let defaultExpectationSet: IExpectationSet = { expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "ExpectationSet")
        result.sets.push(content);
    else if (content._type == "FunctionDefinition")
        defaultExpectationSet.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof(moreContents) == "object" && moreContents !== null)
        moreContents.forEach(c => {
            if (c._type == "ExpectationSet")
                result.sets.push(c);
            else if (c._type == "FunctionDefinition")
                defaultExpectationSet.functions.push(c);
            else
                result.expectations.push(c);
        });
    if (defaultExpectationSet.functions.length > 0)
        result.sets.push(defaultExpectationSet);
    return result;
}
export function genericFunctionGroup(description: string, getGenericArgs: { (): (any|null|undefined)[] }, content: IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs)[]) : IFunctionGroup {
    let result: IFunctionGroup = { description: description, expectations: [], sets: [], _type: "FunctionGroup" };
    let defaultExpectationSet: IExpectationSet = { expectations: [], functions: [], getGenericArgs: getGenericArgs, _type: "ExpectationSet" };
    if (content._type == "ExpectationSet")
        result.sets.push(content);
    else if (content._type == "FunctionDefinition")
        defaultExpectationSet.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof(moreContents) == "object" && moreContents !== null)
        moreContents.forEach(c => {
            if (c._type == "ExpectationSet")
                result.sets.push(c);
            else if (c._type == "FunctionDefinition")
                defaultExpectationSet.functions.push(c);
            else
                result.expectations.push(c);
        });
    result.sets.push(defaultExpectationSet);
    return result;
}
export function functionTypeGroup(type: string, content: IExpectationSet|IFunctionGroup|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionGroup|IFunctionDefinition|IExpectEquals|IExpectIs)[]) : IFunctionTypeGroup {
    let result: IFunctionTypeGroup = { type: type, expectations: [], groups: [], _type: "TypeGroup" };
    let defaultGroup: IFunctionGroup = { expectations: [], sets: [], _type: "FunctionGroup" };
    let defaultExpectationSet: IExpectationSet = { expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "ExpectationSet")
        defaultGroup.sets.push(content);
    else if (content._type == "FunctionDefinition")
        defaultExpectationSet.functions.push(content);
    else if (content._type == "FunctionGroup")
        result.groups.push(content);
    else
        result.expectations.push(content);

    if (defaultExpectationSet.functions.length > 0 || defaultExpectationSet.expectations.length > 0)
        defaultGroup.sets.push(defaultExpectationSet);

    if (defaultGroup.sets.length > 0)
        result.groups.push(defaultGroup);
    return result;
}

export function describeTestFunction(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], funcDef: IFunctionDefinition, getGenericArgs?: { (): any|null|undefined; }) {
    describe('Testing function ' + funcDef.name + funcDef.signature, function() {
        funcDef.expectations.concat(funcDef.expectations).concat(expectations).forEach(e => {
            if (e._type == "ExpectIs") {
                let expectedType: string = e.expectedType;
                e.argSets.forEach(a => {
                    it(funcDef.name + "(" + a.display + ") should return " + e.display, function() {
                        let args: (any|null|undefined)[] = a.getArgs();
                        if (typeof(getGenericArgs) == "function") {
                            let gArgs: (any|null|undefined)[] = getGenericArgs();
                            if (gArgs.length > 0)
                                args = args.concat(gArgs);
                        }
                        let target: any|null|undefined = funcDef.callback.apply(this, args);
                        expect(target).is.a(expectedType, a.message);
                    });
                }, this);
            } else {
                let expected: any|null|undefined = e.getExpectedValue();
                e.argSets.forEach(a => {
                    it(funcDef.name + "(" + a.display + ") should return " + e.display, function() {
                        let args: (any|null|undefined)[] = a.getArgs();
                        if (typeof(getGenericArgs) == "function") {
                            let gArgs: (any|null|undefined)[] = getGenericArgs();
                            if (gArgs.length > 0)
                                args = args.concat(gArgs);
                        }
                        let target: any|null|undefined = funcDef.callback.apply(this, args);
                        expect(target).to.equal(expected, a.message);
                    });
                }, this);
            }
        }, this);
    });
}

export function describeExpectationSet(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], expectationSet: IExpectationSet) {
    let setFunc: { (this: Mocha.ISuiteCallbackContext): void; } = function() {
        expectationSet.functions.forEach(funcDef => {
            describeTestFunction.call(this, expectations.concat(expectationSet.expectations), funcDef, expectationSet.getGenericArgs);
        }, this);
    };
    if (typeof(expectationSet.description) == "string" && expectationSet.description.trim().length > 0)
        describe(expectationSet.description, setFunc);
    else
        setFunc.call(this);
}

export function describeFunctionGroups(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], functionGrp: IFunctionGroup) {
    let testFunc: { (this: Mocha.ISuiteCallbackContext): void } = function() {
        functionGrp.sets.forEach(expectationSet => {
            describeExpectationSet.call(this, expectations.concat(functionGrp.expectations), expectationSet);
        }, this);
    };
    if (typeof(functionGrp.description) == "string" && functionGrp.description.trim().length > 0)
        describe(functionGrp.description, testFunc);
    else
        testFunc.call(this);
}
export function describeFunctionTypeGroups(functionTypeGroups: IFunctionTypeGroup[]) {
    functionTypeGroups.forEach(typeGroup => {
        describe('Testing ' + typeGroup.type + ' functions', function() {
            typeGroup.groups.forEach(functionGrp => {
                describeFunctionGroups.call(this, typeGroup.expectations, functionGrp);
            }, this);
        });
    });
}