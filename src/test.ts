import { expect } from 'chai';
import { assert } from 'chai';
//import * as JsTypeCommander from './dist/JsTypeCommander';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';

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
enum TypeGateNilHandling { notNil, allowUndefined, allowNull, allowNil }
enum JsType { Undefined, Boolean, Number, String, Symbol, Function, Object }
enum JsVariant { None, Null, NotEmpty, Empty, }
type IPatternExpectation = { captures: (string|null)[], groupZero?: string }|(string|null)[]|boolean|null;
type IPatternTest = { input: string, expected: IPatternExpectation };
interface IPatternDefinition {
    name: string;
    getRegex: { (obj: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; };
    tests: IPatternTest[];
}

function expectForNull(expected: any|null, result: any|null, message?: string): result is null {
    if (expected == null) {
        expect(result).to.a('null', message);
        return true;
    }
    expect(result).to.not.a('null', message);
    return false;
}

describe.skip("Testing options", function() {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
    });
    describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            expect(result).to.a('string');
            expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
    });
    describe("Testing JsTypeCommander.getPatternOptions()", function() {
        it('JsTypeCommander.getPatternOptions() should not return nil', function() {
            let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|null|undefined = JsTypeCommander.getPatternOptions();
            expect(regexOptionResult).to.not.a('undefined').and.to.not.a('null');
        });
    });
    describe("Checking JsTypeCommander.getPatternOptions() properties", function() {
        let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = JsTypeCommander.getPatternOptions(); } catch { regexOptionResult = undefined; }
        it('onlyWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.onlyWhitespace).to.not.a('undefined');
        });
        it('trimStart property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.trimStart).to.not.a('undefined');
        });
        it('trimEnd property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.trimEnd).to.not.a('undefined');
        });
        it('lineSeparator property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.lineSeparator).to.not.a('undefined');
        });
        it('booleanText property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.booleanText).to.not.a('undefined');
        });
        it('firstLetterLc property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.firstLetterLc).to.not.a('undefined');
        });
        it('abnormalWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.abnormalWhitespace).to.not.a('undefined');
        });
    });
    describe("Test JsTypeCommander.getPatternOptions() expressions", function() {
        let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = JsTypeCommander.getPatternOptions(); } catch { regexOptionResult = undefined; }
        let originals: JsTypeCommander.IJsTypeCommanderRegex;
        let testRe = /.*/;
        let testDataArr: {
            name: string,
            original: RegExp,
            getRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; }
            setRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegex, value: RegExp): void; }
        }[] = [
            { name: 'abnormalWhitespace', original: testRe, getRegexp: r => r.abnormalWhitespace, setRegexp: (r, v) => { r.abnormalWhitespace = v; } },
            { name: 'booleanText', original: testRe, getRegexp: r => r.booleanText, setRegexp: (r, v) => { r.booleanText = v; } },
            { name: 'lineSeparator', original: testRe, getRegexp: r => r.lineSeparator, setRegexp: (r, v) => { r.lineSeparator = v; } },
            { name: 'onlyWhitespace', original: testRe, getRegexp: r => r.onlyWhitespace, setRegexp: (r, v) => { r.onlyWhitespace = v; } },
            { name: 'trimEnd', original: testRe, getRegexp: r => r.trimEnd, setRegexp: (r, v) => { r.trimEnd = v; } },
            { name: 'trimStart', original: testRe, getRegexp: r => r.trimStart, setRegexp: (r, v) => { r.trimStart = v; } }
        ];
    
        testDataArr.forEach(d => {
            if (typeof(regexOptionResult) == "undefined")
                return;
            let r = d.getRegexp(regexOptionResult);
            if (typeof(r) !== "undefined")
            d.original = r;
        });

        testDataArr.forEach(testData => {
            it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function() {
                if (typeof(regexOptionResult) == "undefined")
                    this.skip();
                else {
                    let arg: JsTypeCommander.IJsTypeCommanderRegex = { };
                    testData.setRegexp(arg, /.*/);
                    let result: JsTypeCommander.IJsTypeCommanderRegex|undefined = JsTypeCommander.setPatternOptions(arg);
                    expect(result).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof(existing) == "undefined")
                            return;
                        if (d.name == testData.name) {
                            expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
                            expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
                        }
                        else {
                            expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
                            expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                        }
                    });
                    testData.setRegexp(arg, testData.original);
                    result = JsTypeCommander.setPatternOptions(arg);
                    expect(result).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof(existing) == "undefined")
                            return;
                        let originalRe = d.original;
                        if (d.name == testData.name)
                            expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
                        else
                            expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                    });
                }
            });
        });
        it('setPatternOptions() should return object with property values restored.', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else {
                let result: JsTypeCommander.IJsTypeCommanderRegex|undefined = JsTypeCommander.setPatternOptions();
                expect(result).to.not.a('undefined').and.to.not.a('null');
                testDataArr.forEach(d => {
                    if (typeof(result) == "undefined")
                        return;
                    let existing = d.getRegexp(result);
                    expect(existing).to.not.a('undefined').and.to.not.a('null');
                    if (typeof(existing) == "undefined")
                        return;
                    let originalRe = d.original;
                    expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
                });
            }
        });
    });
});

describe("Testing regular expressions", function() {
    let patternDefinitions: IPatternDefinition[] = [
        {
            name: 'onlyWhitespace', getRegex: regexOptions => regexOptions.onlyWhitespace, tests: [
                { input: " ", expected: true }, { input: " \t\r\n ", expected: true }, { input: " \t\r\n ", expected: true }, { input: "", expected: false },
                { input: ".", expected: false }, { input: "0", expected: false }, { input: "X", expected: false }, { input: ". \t\r\n ", expected: false },
                { input: " \t.\r\n ", expected: false }, { input: " \t\r\n .", expected: false }
            ]
        }, {
            name: 'trimStart', getRegex: regexOptions => regexOptions.trimStart, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: false }, { input: "0\t\r\n", expected: false }, { input: ".", expected: false }, { input: ".\t\r\n", expected: false },
                { input: "\t\r\n0", expected: { captures: ["0"], groupZero: "\t\r\n0" } },
                { input: "\t\r\n0\t\r\n", expected: { captures: ["0\t\r\n"], groupZero: "\t\r\n0\t\r\n" } },
                { input: "\t\r\n.", expected: { captures: ["."], groupZero: "\t\r\n." } },
                { input: "\t\r\n.\t\r\n", expected: { captures: [".\t\r\n"], groupZero: "\t\r\n.\t\r\n" } }
            ]
        }, {
            name: 'trimEnd', getRegex: regexOptions => regexOptions.trimEnd, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } },
                { input: "0\t\r\n", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0\t\r\n", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".\t\r\n", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.\t\r\n", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } }
            ]
        }, {
            name: 'lineSeparator', getRegex: regexOptions => regexOptions.lineSeparator, tests: [
                { input: "", expected: false }, { input: " ", expected: false }, { input: ".", expected: false }, { input: "0", expected: false },
                { input: "\r", expected: true }, { input: "\r\n", expected: true }, { input: "\n", expected: true },
                { input: "x \t\r\n\r\nz ", expected: { captures: [], groupZero: "\r\n" } }, { input: " \t\n\r\r\n ", expected: { captures: [], groupZero: "\n" } },
                { input: "x \t\r\r\r\nz ", expected: { captures: [], groupZero: "\r" } }
            ]
        }, {
            name: 'booleanText', getRegex: regexOptions => regexOptions.booleanText, tests: (function() {
                let results: IPatternTest[] = [
                    { input: "true", expected: ["true", null] }, { input: "True", expected: ["True", null] }, { input: "tRuE", expected: ["tRuE", null] }, 
                    { input: "false", expected: [null, "false"] }, { input: "False", expected: [null, "False"] }, { input: "fAlSe", expected: [null, "fAlSe"] },
                    { input: "t", expected: ["t", null] }, { input: "f", expected: [null, "f"] }, { input: "T", expected: ["T", null] }, { input: "F", expected: [null, "F"] },
                    { input: "yes", expected: ["yes", null] }, { input: "Yes", expected: ["Yes", null] }, { input: "yEs", expected: ["yEs", null] },
                    { input: "no", expected: [null, "no"] }, { input: "No", expected: [null, "No"] }, { input: "nO", expected: [null, "nO"] },
                    { input: "y", expected: ["y", null] }, { input: "n", expected: [null, "n"] }, { input: "Y", expected: ["Y", null] }, { input: "N", expected: [null, "N"] },
                    { input: "1", expected: ["1", null] }, { input: "0", expected: [null, "0"] }, { input: "-1", expected: ["-1", null] }, { input: "-0", expected: [null, "-0"] },
                    { input: "1.00", expected: ["1.00", null] }, { input: "0.00", expected: [null, "0.00"] }, { input: "-1.00", expected: ["-1.00", null] },
                    { input: "-0.00", expected: [null, "-0.00"] }, { input: "0.005", expected: ["0.005", null] }, { input: "-0.005", expected: ["-0.005", null] },
                    { input: "-001.00", expected: ["-001.00", null] }, { input: "001.5", expected: ["001.5", null] }, { input: "", expected: false }, { input: " ", expected: false },
                    { input: "nes", expected: false }, { input: "ro", expected: false }, { input: "frue", expected: false }, { input: "talse", expected: false }
                ];
                let l: number = results.length;
                for (let i: number = 0; i < l; i++) {
                    let p: IPatternTest = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    let input: string = "\t\r\n" + p.input + "\t\r\n";
                    if (typeof(p.expected) == "boolean")
                        results.push({ input: input, expected: false });
                    else if (Array.isArray(p.expected))
                        results.push({ input: input, expected: <IPatternExpectation>{ captures: p.expected, groupZero: input }});
                    else if (p.expected !== null)
                        results.push({ input: input, expected: <IPatternExpectation>{ captures: p.expected.captures, groupZero: input }});
                }
                l = results.length;
                let leadNumRe = /^\d/;
                let trainNumRe = /\d$/;
                for (let i: number = 0; i < l; i++) {
                    let p: IPatternTest = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    ["true", "t", "false", "f", "yes", "y", "."].forEach(si => {
                        results.push({ input: si + p.input, expected: false });
                        results.push({ input: p.input + si, expected: false });
                    });
                    ["1", "0"].forEach(si => {
                        if (!leadNumRe.test(p.input))
                            results.push({ input: si + p.input, expected: false });
                        if (!trainNumRe.test(p.input))
                            results.push({ input: p.input + si, expected: false });
                    });
                }
                return results;
            }())
        }, {
            name: 'firstLetterLc', getRegex: regexOptions => regexOptions.firstLetterLc, tests: [
                { input: "test", expected: [null, "t", "est"] }, { input: "t", expected: [null, "t", null] },
                { input: "\r\n.test", expected: ["\r\n.", "t", "est"] }, { input: "\r\n.t", expected: ["\r\n.", "t", null] },
                { input: "Test", expected: false }, { input: "T", expected: false }, { input: " Test", expected: false }, { input: " T", expected: false },
                { input: "0test", expected: false }, { input: "0t", expected: false }, { input: "\r\n.0test", expected: false }, { input: "\r\n.0t", expected: false }
            ]
        }, {
            name: 'abnormalWhitespace', getRegex: regexOptions => regexOptions.abnormalWhitespace, tests: [
                { input: "  ", expected: { captures: [], groupZero: "  " } }, { input: " \t\r\n ", expected: { captures: [], groupZero: " \t\r\n " } },
                { input: " Test this  string   ", expected: { captures: [], groupZero: "  " } },
                { input: " Test\tthis  string   ", expected: { captures: [], groupZero: "\t" } },
                { input: " Test this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "   \t\r\n " } },
                { input: "\tTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\t" } },
                { input: "\r\nTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\r\n" } },
                { input: "\n\r\t\rTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\n\r\t\r" } }
            ]
        }
    ];
    let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex = (function() {
        let r: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { r = JsTypeCommander.getPatternOptions(); } catch { r = undefined; }
        if (typeof(r) == "undefined")
            return { };
        return r;
    })();
    patternDefinitions.forEach(pattern => {
        describe('Testing ' + pattern.name + ' pattern', function() {
            let regex = pattern.getRegex(regexOptionResult);
            pattern.tests.forEach(testData => {
                let expectedGroups: (string|null)[]|null = null;
                if (typeof(testData.expected) == "boolean") {
                    if (testData.expected)
                        expectedGroups = [testData.input];
                } else if (testData.expected !== null) {
                    if (Array.isArray(testData.expected))
                        expectedGroups = (<(string|null)[]>[(testData.expected.length == 0) ? testData.input : testData.expected.join("")]).concat(testData.expected);
                    else
                        expectedGroups = (<(string|null)[]>[(typeof(testData.expected.groupZero) == "string") ? testData.expected.groupZero : ((testData.expected.captures.length == 0) ? testData.input : testData.expected.captures.join(""))]).concat(testData.expected.captures);
                }

                it('regexOptions.' + pattern.name + '.exec(' + JSON.stringify(testData.input) + ') should return ' + JSON.stringify(expectedGroups), function() {
                    let name: string = pattern.name;
                    let input: string = testData.input;
                    if (typeof(regex) == "undefined")
                        this.skip();
                    else {
                        let result: RegExpExecArray|null = regex.exec(input);
                        if (expectForNull(expectedGroups, result, 'Unexpected match result') || expectedGroups === null)
                            return;
                        expect(result.length).to.equal(expectedGroups.length, 'Length mismatch');
                        for (let i: number = 0; i < expectedGroups.length; i++) {
                            let msg: string = 'Result group mismatch at index ' + i;
                            if (typeof(expectedGroups[i]) == "string") {
                                expect(result[i]).to.a('string', msg);
                                expect(JSON.stringify(result[i])).to.equal(JSON.stringify(expectedGroups[i]), msg);
                            } else
                                expect(result[i]).to.not.a('string', msg);
                        }
                    }
                });
            }, this);
        });
    }, this);
});
enum MapCallbackId {
    whenBoolean = 0x0001,
    whenFunction = 0x0002,
    whenInfinity = 0x0004,
    whenNaN = 0x0008,
    whenNumber = 0x0010,
    whenArray = 0x0020,
    whenArrayLike = 0x0040,
    whenNotArrayLike = 0x0080,
    whenString = 0x0100,
    whenSymbol = 0x0200,
    whenNull = 0x0400,
    whenUndefined = 0x0800,
    whenObject = 0x1000,
    otherwise = 0x2000
}

type MapCallbackName = "whenBoolean"|"whenFunction"|"whenInfinity"|"whenNaN"|"whenNumber"|"whenArray"|"whenArrayLike"|"whenNotArrayLike"|"whenString"|"whenSymbol"|"whenNull"|"whenUndefined"|"whenObject"|"otherwise";

function mapCallbackIdToName(id: MapCallbackId): MapCallbackName {
    switch (id) {
        case MapCallbackId.whenBoolean:
            return 'whenBoolean';
        case MapCallbackId.whenFunction:
            return 'whenFunction';
        case MapCallbackId.whenInfinity:
            return 'whenInfinity';
        case MapCallbackId.whenNaN:
            return 'whenNaN';
        case MapCallbackId.whenNumber:
            return 'whenNumber';
        case MapCallbackId.whenArray:
            return 'whenArray';
        case MapCallbackId.whenArrayLike:
            return 'whenArrayLike';
        case MapCallbackId.whenNotArrayLike:
            return 'whenNotArrayLike';
        case MapCallbackId.whenString:
            return 'whenString';
        case MapCallbackId.whenSymbol:
            return 'whenSymbol';
        case MapCallbackId.whenNull:
            return 'whenNull';
        case MapCallbackId.whenUndefined:
            return 'whenUndefined';
        case MapCallbackId.whenObject:
            return 'whenObject';
    }
    return 'otherwise';
}

interface ArgumentDescriptor { display: string, getValue: { (): JsTypeCommander.TAnythingAtAll; } }
interface MapByTypeOptions { omit?: MapCallbackName[]|MapCallbackName; simpleCheck?: boolean; expected: MapCallbackId }
interface MapTyTypeTest {
    arg: ArgumentDescriptor[]|ArgumentDescriptor;
    opt: MapByTypeOptions[]|MapByTypeOptions;
}
interface MapByTypeDefinition {
    type: string;
    test: MapTyTypeTest[]|MapTyTypeTest
}
class TypeGateCallbackHelper implements JsTypeCommander.TypeGateCallbacks<JsTypeCommander.TAnythingAtAll, MapCallbackId> {
    private _isOmmitted: { [key: string]: boolean } = { };
    private _invokeFlags: number = 0;
    private _callCount: number = 0;
    private _lastArg: JsTypeCommander.TAnythingAtAll = undefined;
    private _onInvoked(key: MapCallbackId, value: JsTypeCommander.TAnythingAtAll): MapCallbackId {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    }
    private _whenBoolean(value: boolean): MapCallbackId { return this._onInvoked(MapCallbackId.whenBoolean, value); };
    private _whenFunction(value: Function): MapCallbackId { return this._onInvoked(MapCallbackId.whenFunction, value); };
    private _whenInfinity(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenInfinity, value); };
    private _whenNaN(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNaN, value); };
    private _whenNumber(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNumber, value); };
    private _whenArray(value: JsTypeCommander.TAnythingAtAll[]): MapCallbackId { return this._onInvoked(MapCallbackId.whenArray, value); };
    private _whenArrayLike(value: ArrayLike<JsTypeCommander.TAnythingAtAll>): MapCallbackId { return this._onInvoked(MapCallbackId.whenArrayLike, value); };
    private _whenNotArrayLike(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); };
    private _whenString(value: string): MapCallbackId { return this._onInvoked(MapCallbackId.whenString, value); };
    private _whenSymbol(value: symbol): MapCallbackId { return this._onInvoked(MapCallbackId.whenSymbol, value); };
    private _whenNull(value: null): MapCallbackId { return this._onInvoked(MapCallbackId.whenNull, value); };
    private _whenUndefined(value: undefined): MapCallbackId { return this._onInvoked(MapCallbackId.whenUndefined, value); };
    private _whenObject(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenObject, value); };
    private _invokeThis<T>(name: string, func: JsTypeCommander.MapFromValueCallback<T, MapCallbackId>) : JsTypeCommander.MapFromValueCallback<T, MapCallbackId>|undefined {
        if (this._isOmmitted[name])
            return;
        let thisObj = this;
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        return function(arg: T) { return func.call(thisObj, arg); };
    }
    constructor(omit?: MapCallbackId|MapCallbackName|(MapCallbackId|MapCallbackName)[], ...omitOther: (MapCallbackId|MapCallbackName)[]) {
        if (Array.isArray(omit))
            omit.forEach(n => {
                if (typeof(n) == "number") {
                    if (n != MapCallbackId.otherwise)
                        this._isOmmitted[mapCallbackIdToName(n)] = true;
                } else if (n != "otherwise")
                    this._isOmmitted[n] = true;
            }, this);
        else if (typeof(omit) == "number") {
            if (omit != MapCallbackId.otherwise)
                this._isOmmitted[mapCallbackIdToName(omit)] = true;
        } else if (typeof(omit) != "undefined" && omit != "otherwise")
            this._isOmmitted[omit] = true;
        if (!Array.isArray(omitOther))
            return;
        omitOther.forEach(n => {
            if (typeof(n) == "number") {
                if (n != MapCallbackId.otherwise)
                    this._isOmmitted[mapCallbackIdToName(n)] = true;
            } else if (n != "otherwise")
                this._isOmmitted[n] = true;
        }, this);
    }
    get invokeFlags(): number { return this._invokeFlags; }
    get callCount(): number { return this._callCount; }
    get lastArg(): JsTypeCommander.TAnythingAtAll { return this._lastArg; }
    get whenBoolean(): JsTypeCommander.MapFromValueCallback<boolean, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<boolean>("whenBoolean", this._whenBoolean); }
    get whenFunction(): JsTypeCommander.MapFromValueCallback<Function, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<Function>("whenFunction", this._whenFunction); }
    get whenInfinity(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenInfinity", this._whenInfinity); }
    get whenNaN(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNaN", this._whenNaN); }
    get whenNumber(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNumber", this._whenNumber); }
    get whenArray(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.TAnythingAtAll[], MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.TAnythingAtAll[]>("whenArray", this._whenArray); }
    get whenArrayLike(): JsTypeCommander.MapFromValueCallback<ArrayLike<JsTypeCommander.TAnythingAtAll>, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<ArrayLike<JsTypeCommander.TAnythingAtAll>>("whenArrayLike", this._whenArrayLike); }
    get whenNotArrayLike(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenNotArrayLike", this._whenNotArrayLike); }
    get whenString(): JsTypeCommander.MapFromValueCallback<string, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<string>("whenString", this._whenString); }
    get whenSymbol(): JsTypeCommander.MapFromValueCallback<symbol, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<symbol>("whenSymbol", this._whenSymbol); }
    get whenNull(): JsTypeCommander.MapFromValueCallback<null, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<null>("whenNull", this._whenNull); }
    get whenUndefined(): JsTypeCommander.MapFromValueCallback<undefined, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<undefined>("whenUndefined", this._whenUndefined); }
    get whenObject(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenObject", this._whenObject); }
    otherwise(value: JsTypeCommander.TAnythingAtAll): MapCallbackId { return this._onInvoked(MapCallbackId.otherwise, value); };
    asJSON(): { [key: string]: Function|undefined } {
        let allIds: MapCallbackId[] = [ MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject ];
        let result: { [key: string]: Function|undefined } = { };
        allIds.forEach(i => {
            let n: MapCallbackName = mapCallbackIdToName(i);
            if (!this._isOmmitted[n])
                result[n] = function() { return i; }
        })
        return result;
    }
}

describe("Testing type map functions", function() {
    describe("Testing mapByTypeValue function", function() {
        let testDataArr: MapByTypeDefinition[] = [
            {
                type: 'nil',
                test: [
                    {
                        arg: { display: 'undefined', getValue: () => undefined },
                        opt: [
                            { expected: MapCallbackId.whenUndefined },
                            { omit: "whenUndefined", expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'null', getValue: () => null },
                        opt: [
                            { expected: MapCallbackId.whenNull },
                            { omit: "whenNull", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'boolean',
                test: {
                    arg: [ { display: 'true', getValue: () => true }, { display: 'false', getValue: () => false } ],
                    opt: [
                        { expected: MapCallbackId.whenBoolean },
                        { omit: "whenBoolean", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'number',
                test: [
                    {
                        arg: [
                            { display: 'Number.POSITIVE_INFINITY', getValue: () => Number.POSITIVE_INFINITY },
                            { display: 'Number.NEGATIVE_INFINITY', getValue: () => Number.NEGATIVE_INFINITY },
                            { display: 'Infinity', getValue: () => Infinity }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenInfinity },
                            { omit: "whenInfinity", expected: MapCallbackId.whenNumber },
                            { omit: ["whenInfinity", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'NaN', getValue: () => NaN },
                        opt: [
                            { expected: MapCallbackId.whenNaN },
                            { omit: "whenNaN", expected: MapCallbackId.whenNumber },
                            { omit: ["whenNaN", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [ { display: '0', getValue: () => 0 }, { display: '-1', getValue: () => -1 }, { display: '0.0001', getValue: () => 0.0001 }, { display: '10', getValue: () => 10 } ],
                        opt: [
                            { expected: MapCallbackId.whenNumber },
                            { omit: "whenNumber", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'Array',
                test: {
                    arg: [ { display: '[]', getValue: () => [] }, { display: '[undefined]', getValue: () => [undefined] }, { display: '[false]', getValue: () => [false] } ],
                    opt: [
                        { expected: MapCallbackId.whenArray },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                        { expected: MapCallbackId.whenArray, simpleCheck: false },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, simpleCheck: false },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, simpleCheck: false },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, simpleCheck: false }
                    ]
                }
            }, {
                type: 'ArrayLike',
                test: [
                    {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }', getValue: () => { return { length: 2, [0]: "test", [1]: "again" } } },
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }', getValue: () => { return { length: 2, [0]: "test", [1]: "again" } } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }', getValue: () => { return { length: 2, [0]: "test", [2]: "again" } } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike, simpleCheck: true },
                            { omit: "whenArrayLike", simpleCheck: true, expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], simpleCheck: true, expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'not ArrayLike',
                test: {
                    arg: [
                        { display: '{ }', getValue: () => { return { } } },
                        { display: '{ length: 1 }', getValue: () => { return { length: 1 } } },
                        { display: '{ length: 2, [0]: "test", [2]: "again" }', getValue: () => { return { length: 2, [0]: "test", [2]: "again" } } },
                    ],
                    opt: [
                        { expected: MapCallbackId.whenNotArrayLike },
                        { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject },
                        { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                        { expected: MapCallbackId.whenNotArrayLike, simpleCheck: false },
                        { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, simpleCheck: false },
                        { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, simpleCheck: false }
                    ]
                }
            }, {
                type: 'string',
                test: {
                    arg: [ { display: '""', getValue: () => "" }, { display: '"false"', getValue: () => "false" } ],
                    opt: [
                        { expected: MapCallbackId.whenString },
                        { omit: "whenString", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'symbol',
                test: {
                    arg: { display: 'Symbol.iterator', getValue: () => Symbol.iterator },
                    opt: [
                        { expected: MapCallbackId.whenSymbol },
                        { omit: "whenSymbol", expected: MapCallbackId.otherwise }
                    ]
                }
            }
        ];
        testDataArr.forEach(testData => {
            describe('Testing ' + testData.type + " values", function() {
                let tests: MapTyTypeTest[] = (Array.isArray(testData.test)) ? testData.test : [testData.test];
                tests.forEach(grp => {
                    let args: ArgumentDescriptor[] = (Array.isArray(grp.arg)) ? grp.arg : [grp.arg];
                    let opts: MapByTypeOptions[] = (Array.isArray(grp.opt)) ? grp.opt : [grp.opt];
                    opts.forEach(o => {
                        let omit: MapCallbackName[] = (typeof(o.omit) == "undefined") ? [] : ((typeof(o.omit) == "string") ? [o.omit] : o.omit);
                        args.forEach(a => {
                            let tgh: TypeGateCallbackHelper = new TypeGateCallbackHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + args.map(a => a.display).join(", ") + ', ' + JSON.stringify(tgh) + ') should return ' + o.expected +
                                    " (calling " + mapCallbackIdToName(o.expected) + ")", function() {
                                let result: JsTypeCommander.TAnythingAtAll = (typeof(o.simpleCheck) == "boolean") ? JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh, o.simpleCheck) :
                                    JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh);
                                expect(result).to.a("number");
                                expect(result).to.equal(o.expected);
                            });
                        }, this);
                    }, this);
                }, this);
            });
        }, this);
        
    });
    describe("Testing mapByDefined function", function() {
        it("mapByDefined(undefined, fn() => 1, fn() => 2) should return 2 (otherwise called)");
        it("mapByDefined(null, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined(NaN, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined(0, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined(false, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined(\"\", fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined([], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined([undefined], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined({ }, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByDefined(Symbol.iterator, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
    });
    describe("Testing mapByNotNull function", function() {
        it("mapByNotNull(undefined, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull(null, fn() => 1, fn() => 2) should return 2 (otherwise called)");
        it("mapByNotNull(NaN, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull(0, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull(false, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull(\"\", fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull([], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull([undefined], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull({ }, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNull(Symbol.iterator, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
    });
    describe("Testing mapByNotNil function", function() {
        it("mapByNotNil(undefined, fn() => 1, fn() => 2) should return 2 (otherwise called)");
        it("mapByNotNil(null, fn() => 1, fn() => 2) should return 2 (otherwise called)");
        it("mapByNotNil(NaN, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil(0, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil(false, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil(\"\", fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil([], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil([undefined], fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil({ }, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
        it("mapByNotNil(Symbol.iterator, fn() => 1, fn() => 2) should return 1 (whenTrue called)");
    });
});

describe("Testing type guard functions", function() {
    describe("Testing notDefined function", function() {
        it("notDefined() should return true");
        it("notDefined(undefined) should return true");
        it("notDefined(null) should return false");
        it("notDefined(NaN) should return false");
        it("notDefined(0) should return false");
        it("notDefined(false) should return false");
        it("notDefined(\"\") should return false");
        it("notDefined([]) should return false");
        it("notDefined([undefined]) should return false");
        it("notDefined({ }) should return false");
        it("notDefined(Symbol.iterator) should return false");
    });
    describe("Testing isNil function", function() {
        it("isNil() should return true");
        it("isNil(undefined) should return true");
        it("isNil(null) should return true");
        it("isNil(NaN) should return false");
        it("isNil(0) should return false");
        it("isNil(false) should return false");
        it("isNil(\"\") should return false");
        it("isNil([]) should return false");
        it("isNil([undefined]) should return false");
        it("isNil({ }) should return false");
        it("isNil(Symbol.iterator) should return false");
    });
    describe("Testing isNull function", function() {
        it("isNull() should return false");
        it("isNull(undefined) should return false");
        it("isNull(null) should return true");
        it("isNull(NaN) should return false");
        it("isNull(0) should return false");
        it("isNull(false) should return false");
        it("isNull(\"\") should return false");
        it("isNull([]) should return false");
        it("isNull([undefined]) should return false");
        it("isNull({ }) should return false");
        it("isNull(Symbol.iterator) should return false");
    });
    describe("Testing isString functions", function() {
        describe("Testing isString", function() {
            it("isString() should return false");
            it("isString(undefined) should return false");
            it("isString(null) should return false");
            it("isString(NaN) should return false");
            it("isString(0) should return false");
            it("isString(false) should return false");
            it("isString(\"\") should return true");
            it("isString(\"\\n\") should return true");
            it("isString(\" test \") should return true");
            it("isString([]) should return false");
            it("isString([undefined]) should return false");
            it("isString({ }) should return false");
            it("isString(Symbol.iterator) should return false");
        });
        describe("Testing isStringIfDef", function() {
            it("isStringIfDef() should return true");
            it("isStringIfDef(undefined) should return true");
            it("isStringIfDef(null) should return false");
            it("isStringIfDef(NaN) should return false");
            it("isStringIfDef(0) should return false");
            it("isStringIfDef(false) should return false");
            it("isStringIfDef(\"\") should return true");
            it("isStringIfDef(\"\\n\") should return true");
            it("isStringIfDef(\" test \") should return true");
            it("isStringIfDef([]) should return false");
            it("isStringIfDef([undefined]) should return false");
            it("isStringIfDef({ }) should return false");
            it("isStringIfDef(Symbol.iterator) should return false");
        });
        describe("Testing isStringOrNull", function() {
            it("isStringOrNull() should return false");
            it("isStringOrNull(undefined) should return false");
            it("isStringOrNull(null) should return true");
            it("isStringOrNull(NaN) should return false");
            it("isStringOrNull(0) should return false");
            it("isStringOrNull(false) should return false");
            it("isStringOrNull(\"\") should return true");
            it("isStringOrNull(\"\\n\") should return true");
            it("isStringOrNull(\" test \") should return true");
            it("isStringOrNull([]) should return false");
            it("isStringOrNull([undefined]) should return false");
            it("isStringOrNull({ }) should return false");
            it("isStringOrNull(Symbol.iterator) should return false");
        });
        describe("Testing isStringOrNil", function() {
            it("isStringOrNil() should return true");
            it("isStringOrNil(undefined) should return true");
            it("isStringOrNil(null) should return true");
            it("isStringOrNil(NaN) should return false");
            it("isStringOrNil(0) should return false");
            it("isStringOrNil(false) should return false");
            it("isStringOrNil(\"\") should return true");
            it("isStringOrNil(\"\\n\") should return true");
            it("isStringOrNil(\" test \") should return true");
            it("isStringOrNil([]) should return false");
            it("isStringOrNil([undefined]) should return false");
            it("isStringOrNil({ }) should return false");
            it("isStringOrNil(Symbol.iterator) should return false");
        });
    });
    describe("Testing isEmptyString functions", function() {
        describe("Testing isEmptyString", function() {
            it("isEmptyString() should return false");
            it("isEmptyString(undefined) should return false");
            it("isEmptyString(null) should return false");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return false");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isEmptyOrWhitespace", function() {
            it("isEmptyString() should return false");
            it("isEmptyString(undefined) should return false");
            it("isEmptyString(null) should return false");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return true");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isEmptyStringIfDef", function() {
            it("isEmptyString() should return true");
            it("isEmptyString(undefined) should return true");
            it("isEmptyString(null) should return false");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return false");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isEmptyOrWhitespaceIfDef", function() {
            it("isEmptyString() should return true");
            it("isEmptyString(undefined) should return true");
            it("isEmptyString(null) should return false");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return true");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isEmptyStringOrNull", function() {
            it("isEmptyString() should return false");
            it("isEmptyString(undefined) should return false");
            it("isEmptyString(null) should return true");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return false");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isNullOrWhitespace", function() {
            it("isEmptyString() should return false");
            it("isEmptyString(undefined) should return false");
            it("isEmptyString(null) should return true");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return true");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isEmptyStringOrNil", function() {
            it("isEmptyString() should return true");
            it("isEmptyString(undefined) should return true");
            it("isEmptyString(null) should return true");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return false");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
        describe("Testing isNilOrWhitespace", function() {
            it("isEmptyString() should return true");
            it("isEmptyString(undefined) should return true");
            it("isEmptyString(null) should return true");
            it("isEmptyString(NaN) should return false");
            it("isEmptyString(0) should return false");
            it("isEmptyString(false) should return false");
            it("isEmptyString(\"\") should return true");
            it("isEmptyString(\"\\n\") should return true");
            it("isEmptyString(\" test \") should return false");
            it("isEmptyString([]) should return false");
            it("isEmptyString([undefined]) should return false");
            it("isEmptyString({ }) should return false");
            it("isEmptyString(Symbol.iterator) should return false");
        });
    });
    describe("Testing isBoolean functions", function() {
        describe("Testing isBoolean", function() {
            it("isBoolean() should return false");
            it("isBoolean(undefined) should return false");
            it("isBoolean(null) should return false");
            it("isBoolean(NaN) should return false");
            it("isBoolean(1) should return false");
            it("isBoolean(0) should return false");
            it("isBoolean(true) should return true");
            it("isBoolean(false) should return true");
            it("isBoolean(\"\") should return false");
            it("isBoolean(\"\\n\") should return false");
            it("isBoolean(\"true\") should return false");
            it("isBoolean(\"false\") should return false");
            it("isBoolean([]) should return false");
            it("isBoolean([undefined]) should return false");
            it("isBoolean({ }) should return false");
            it("isBoolean(Symbol.iterator) should return false");
        });
        describe("Testing isBooleanIfDef", function() {
            it("isBooleanIfDef() should return true");
            it("isBooleanIfDef(undefined) should return true");
            it("isBooleanIfDef(null) should return false");
            it("isBooleanIfDef(NaN) should return false");
            it("isBooleanIfDef(1) should return false");
            it("isBooleanIfDef(0) should return false");
            it("isBooleanIfDef(true) should return true");
            it("isBooleanIfDef(false) should return true");
            it("isBooleanIfDef(\"\") should return false");
            it("isBooleanIfDef(\"\\n\") should return false");
            it("isBooleanIfDef(\"true\") should return false");
            it("isBooleanIfDef(\"false\") should return false");
            it("isBooleanIfDef([]) should return false");
            it("isBooleanIfDef([undefined]) should return false");
            it("isBooleanIfDef({ }) should return false");
            it("isBooleanIfDef(Symbol.iterator) should return false");
        });
        describe("Testing isBooleanOrNull", function() {
            it("isBooleanOrNull() should return false");
            it("isBooleanOrNull(undefined) should return false");
            it("isBooleanOrNull(null) should return true");
            it("isBooleanOrNull(NaN) should return false");
            it("isBooleanOrNull(1) should return false");
            it("isBooleanOrNull(0) should return false");
            it("isBooleanOrNull(true) should return true");
            it("isBooleanOrNull(false) should return true");
            it("isBooleanOrNull(\"\") should return false");
            it("isBooleanOrNull(\"\\n\") should return false");
            it("isBooleanOrNull(\"true\") should return false");
            it("isBooleanOrNull(\"false\") should return false");
            it("isBooleanOrNull([]) should return false");
            it("isBooleanOrNull([undefined]) should return false");
            it("isBooleanOrNull({ }) should return false");
            it("isBooleanOrNull(Symbol.iterator) should return false");
        });
        describe("Testing isBooleanOrNil", function() {
            it("isBooleanOrNil() should return true");
            it("isBooleanOrNil(undefined) should return true");
            it("isBooleanOrNil(null) should return true");
            it("isBooleanOrNil(NaN) should return false");
            it("isBooleanOrNil(1) should return false");
            it("isBooleanOrNil(0) should return false");
            it("isBooleanOrNil(true) should return true");
            it("isBooleanOrNil(false) should return true");
            it("isBooleanOrNil(\"\") should return false");
            it("isBooleanOrNil(\"\\n\") should return false");
            it("isBooleanOrNil(\"true\") should return false");
            it("isBooleanOrNil(\"false\") should return false");
            it("isBooleanOrNil([]) should return false");
            it("isBooleanOrNil([undefined]) should return false");
            it("isBooleanOrNil({ }) should return false");
            it("isBooleanOrNil(Symbol.iterator) should return false");
        });
    });
    describe("Testing isNumber functions", function() {
        describe("Testing isNumber", function() {
            it("isNumber() should return false");
            it("isNumber(undefined) should return false");
            it("isNumber(null) should return false");
            it("isNumber(NaN) should return false");
            it("isNumber(-1) should return true");
            it("isNumber(1) should return true");
            it("isNumber(0) should return true");
            it("isNumber(0.0001) should return true");
            it("isNumber(Infinity) should return false");
            it("isNumber(Number.NEGATIVE_INFINITY) should return false");
            it("isNumber(Number.POSITIVE_INFINITY) should return false");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
            it("isNumber(Symbol.iterator) should return false");
        });
        describe("Testing isNumberIfDef", function() {
            it("isNumber() should return true");
            it("isNumber(undefined) should return true");
            it("isNumber(null) should return false");
            it("isNumber(NaN) should return false");
            it("isNumber(-1) should return true");
            it("isNumber(1) should return true");
            it("isNumber(0) should return true");
            it("isNumber(0.0001) should return true");
            it("isNumber(Infinity) should return false");
            it("isNumber(Number.NEGATIVE_INFINITY) should return false");
            it("isNumber(Number.POSITIVE_INFINITY) should return false");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
        });
        describe("Testing isNumberOrNull", function() {
            it("isNumber() should return false");
            it("isNumber(undefined) should return false");
            it("isNumber(null) should return true");
            it("isNumber(NaN) should return false");
            it("isNumber(-1) should return true");
            it("isNumber(1) should return true");
            it("isNumber(0) should return true");
            it("isNumber(0.0001) should return true");
            it("isNumber(Infinity) should return false");
            it("isNumber(Number.NEGATIVE_INFINITY) should return false");
            it("isNumber(Number.POSITIVE_INFINITY) should return false");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
        });
        describe("Testing isNumberNaNorNull", function() {
            it("isNumber() should return false");
            it("isNumber(undefined) should return false");
            it("isNumber(null) should return true");
            it("isNumber(NaN) should return true");
            it("isNumber(-1) should return true");
            it("isNumber(1) should return true");
            it("isNumber(0) should return true");
            it("isNumber(0.0001) should return true");
            it("isNumber(Infinity) should return false");
            it("isNumber(Number.NEGATIVE_INFINITY) should return false");
            it("isNumber(Number.POSITIVE_INFINITY) should return false");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
        });
        describe("Testing isNumberOrNil", function() {
            it("isNumber() should return true");
            it("isNumber(undefined) should return true");
            it("isNumber(null) should return true");
            it("isNumber(NaN) should return false");
            it("isNumber(-1) should return true");
            it("isNumber(1) should return true");
            it("isNumber(0) should return true");
            it("isNumber(0.0001) should return true");
            it("isNumber(Infinity) should return false");
            it("isNumber(Number.NEGATIVE_INFINITY) should return false");
            it("isNumber(Number.POSITIVE_INFINITY) should return false");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
        });
        describe("Testing isInfinite", function() {
            it("isNumber() should return false");
            it("isNumber(undefined) should return false");
            it("isNumber(null) should return false");
            it("isNumber(NaN) should return false");
            it("isNumber(-1) should return false");
            it("isNumber(1) should return false");
            it("isNumber(0) should return false");
            it("isNumber(0.0001) should return false");
            it("isNumber(Infinity) should return true");
            it("isNumber(Number.NEGATIVE_INFINITY) should return true");
            it("isNumber(Number.POSITIVE_INFINITY) should return true");
            it("isNumber(true) should return false");
            it("isNumber(false) should return false");
            it("isNumber(\"\") should return false");
            it("isNumber(\"\\n\") should return false");
            it("isNumber(\"1\") should return false");
            it("isNumber(\"0\") should return false");
            it("isNumber([]) should return false");
            it("isNumber([undefined]) should return false");
            it("isNumber({ }) should return false");
        });
    });
    describe("Testing isFunction functions", function() {
        describe("Testing isFunction", function() {
    
        });
        describe("Testing isFunctionIfDef", function() {
    
        });
        describe("Testing isFunctionOrNull", function() {
    
        });
        describe("Testing isFunctionOrNil", function() {
    
        });
    });
    describe("Testing isObject functions", function() {
        describe("Testing isObject", function() {
    
        });
        describe("Testing isObjectType", function() {
    
        });
        describe("Testing isNonArrayObject", function() {
    
        });
        describe("Testing isPlainObject", function() {
    
        });
        describe("Testing isObjectIfDef", function() {
    
        });
        describe("Testing isObjectTypeIfDef", function() {
    
        });
        describe("Testing isNonArrayObjectIfDef", function() {
    
        });
        describe("Testing isPlainObjectIfDef", function() {
    
        });
        describe("Testing isObjectOrNull", function() {
    
        });
        describe("Testing isObjectTypeOrNull", function() {
    
        });
        describe("Testing isNonArrayObjectOrNull", function() {
    
        });
        describe("Testing isPlainObjectOrNull", function() {
    
        });
        describe("Testing isObjectTypeOrNil", function() {
    
        });
        describe("Testing isObjectOrNil", function() {
    
        });
        describe("Testing isNonArrayObjectOrNil", function() {
    
        });
        describe("Testing isPlainObjectOrNil", function() {
    
        });
    });
    describe("Testing isArray functions", function() {
        describe("Testing isArray", function() {
    
        });
        describe("Testing isEmptyArray", function() {
    
        });
        describe("Testing isArrayLike", function() {
    
        });
        describe("Testing isArrayIfDef", function() {
    
        });
        describe("Testing isEmptyArrayIfDef", function() {
    
        });
        describe("Testing isArrayLikeIfDef", function() {
    
        });
        describe("Testing isArrayOrNull", function() {
    
        });
        describe("Testing isEmptyArrayOrNull", function() {
    
        });
        describe("Testing isArrayLikeOrNull", function() {
    
        });
        describe("Testing isArrayOrNil", function() {
    
        });
        describe("Testing isEmptyArrayOrNil", function() {
    
        });
        describe("Testing isArrayLikeOrNil", function() {
    
        });
    });
    describe("Testing derivesFrom functions", function() {
        describe("Testing derivesFrom", function() {
    
        });
        describe("Testing derivesFromIfDef", function() {
    
        });
        describe("Testing derivesFromOrNull", function() {
    
        });
        describe("Testing derivesFromOrNil", function() {
    
        });
    });
    describe("Testing isErrorLike", function() {

    });
});

describe("Testing type conversion functions", function() {
    describe("Testing string conversion functions", function() {
        describe("Testing asString", function() {
    
        });
        describe("Testing toString", function() {
    
        });
        describe("Testing trimStart", function() {
    
        });
        describe("Testing trimEnd", function() {
    
        });
        describe("Testing asNormalizedWs", function() {
    
        });
        describe("Testing ucFirst", function() {
    
        });
        describe("Testing splitLines", function() {
    
        });
        describe("Testing indentText", function() {
    
        });
        describe("Testing indentLines", function() {
    
        });
    });
    describe("Testing boolean conversion functions", function() {
        describe("Testing asBoolean", function() {
    
        });
        describe("Testing toBoolean", function() {
    
        });
    });
    describe("Testing number conversion functions", function() {
        describe("Testing asNumber", function() {
    
        });
        describe("Testing toNumber", function() {
    
        });
    });
    describe("Testing Array conversion functions", function() {
        describe("Testing toArray", function() {
    
        });
        describe("Testing mapInto", function() {
    
        });
    });
    describe("Testing asErrorLike", function() {

    });
});