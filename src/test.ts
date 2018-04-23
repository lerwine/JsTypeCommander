import { expect } from 'chai';
import { assert } from 'chai';
//import * as JsTypeCommander from './dist/JsTypeCommander';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';
import { truncate } from 'fs';

function expectNullStatus(expected: any|null, result: any|null, message?: string): result is null {
    if (expected == null) {
        expect(result).to.a('null', message);
        return true;
    }
    expect(result).to.not.a('null', message);
    return false;
}

describe.skip("Testing module options settings", function() {
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

type ExpectedRegexTestResult = { captures: (string|null)[], groupZero?: string }|(string|null)[]|boolean|null;
type RegexPatternTest = { input: string, expected: ExpectedRegexTestResult };
interface ModuleRegexPattern {
    name: string;
    getRegex: { (obj: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; };
    tests: RegexPatternTest[];
}

describe.skip("Testing regular expressions", function() {
    let patternDefinitions: ModuleRegexPattern[] = [
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
                let results: RegexPatternTest[] = [
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
                    let p: RegexPatternTest = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    let input: string = "\t\r\n" + p.input + "\t\r\n";
                    if (typeof(p.expected) == "boolean")
                        results.push({ input: input, expected: false });
                    else if (Array.isArray(p.expected))
                        results.push({ input: input, expected: <ExpectedRegexTestResult>{ captures: p.expected, groupZero: input }});
                    else if (p.expected !== null)
                        results.push({ input: input, expected: <ExpectedRegexTestResult>{ captures: p.expected.captures, groupZero: input }});
                }
                l = results.length;
                let leadNumRe = /^\d/;
                let trainNumRe = /\d$/;
                for (let i: number = 0; i < l; i++) {
                    let p: RegexPatternTest = results[i];
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
                        if (expectNullStatus(expectedGroups, result, 'Unexpected match result') || expectedGroups === null)
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

interface Descriptor { display: string; }

interface ArgumentDescriptor extends Descriptor { getValue: { (): JsTypeCommander.AnyNilable; } }

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

type MapCallbackName = "whenBoolean"|"whenFunction"|"whenInfinity"|"whenNaN"|"whenNumber"|"whenArray"|"whenArrayLike"|"whenNotArrayLike"|"whenString"|"whenSymbol"|"whenNull"|
    "whenUndefined"|"whenObject"|"otherwise";

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

interface MapByTypeOptions { omit?: MapCallbackName[]|MapCallbackName; checkElements?: boolean; expected: MapCallbackId }
interface MapByTypeTest {
    arg: ArgumentDescriptor[]|ArgumentDescriptor;
    opt: MapByTypeOptions[]|MapByTypeOptions;
}
interface MapByTypeInputType {
    type: string;
    test: MapByTypeTest[]|MapByTypeTest
}
interface MapByNilArguments extends ArgumentDescriptor {
    type: "notNil"|"null"|"undefined";
}
interface MapByNilFunction {
    name: string,
    callback: Function,
    allowUndefined: boolean,
    allowNull: boolean
}

class MapByTypeHelper implements JsTypeCommander.TypeGuardResultSpecs<JsTypeCommander.AnyNilable, MapCallbackId> {
    private _isOmmitted: { [key: string]: boolean } = { };
    private _invokeFlags: number = 0;
    private _callCount: number = 0;
    private _lastArg: JsTypeCommander.AnyNilable = undefined;
    private _onInvoked(key: MapCallbackId, value: JsTypeCommander.AnyNilable): MapCallbackId {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    }
    private _whenBoolean(value: boolean): MapCallbackId { return this._onInvoked(MapCallbackId.whenBoolean, value); }
    private _whenFunction(value: Function): MapCallbackId { return this._onInvoked(MapCallbackId.whenFunction, value); }
    private _whenInfinity(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenInfinity, value); }
    private _whenNaN(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNaN, value); }
    private _whenNumber(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNumber, value); }
    private _whenArray(value: JsTypeCommander.AnyNilable[]): MapCallbackId { return this._onInvoked(MapCallbackId.whenArray, value); }
    private _whenArrayLike(value: ArrayLike<JsTypeCommander.AnyNilable>): MapCallbackId { return this._onInvoked(MapCallbackId.whenArrayLike, value); }
    private _whenNotArrayLike(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); }
    private _whenString(value: string): MapCallbackId { return this._onInvoked(MapCallbackId.whenString, value); }
    private _whenSymbol(value: symbol): MapCallbackId { return this._onInvoked(MapCallbackId.whenSymbol, value); }
    private _whenNull(value: null): MapCallbackId { return this._onInvoked(MapCallbackId.whenNull, value); }
    private _whenUndefined(value: undefined): MapCallbackId { return this._onInvoked(MapCallbackId.whenUndefined, value); }
    private _whenObject(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenObject, value); }
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
    get lastArg(): JsTypeCommander.AnyNilable { return this._lastArg; }
    get thisObj(): MapByTypeHelper { return this; }
    get whenBoolean(): JsTypeCommander.MapFromValueCallback<boolean, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<boolean>("whenBoolean", this._whenBoolean); }
    get whenFunction(): JsTypeCommander.MapFromValueCallback<Function, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<Function>("whenFunction", this._whenFunction); }
    get whenInfinity(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenInfinity", this._whenInfinity); }
    get whenNaN(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNaN", this._whenNaN); }
    get whenNumber(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNumber", this._whenNumber); }
    get whenArray(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.AnyNilable[], MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.AnyNilable[]>("whenArray", this._whenArray); }
    get whenArrayLike(): JsTypeCommander.MapFromValueCallback<ArrayLike<JsTypeCommander.AnyNilable>, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<ArrayLike<JsTypeCommander.AnyNilable>>("whenArrayLike", this._whenArrayLike); }
    get whenNotArrayLike(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenNotArrayLike", this._whenNotArrayLike); }
    get whenString(): JsTypeCommander.MapFromValueCallback<string, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<string>("whenString", this._whenString); }
    get whenSymbol(): JsTypeCommander.MapFromValueCallback<symbol, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<symbol>("whenSymbol", this._whenSymbol); }
    get whenNull(): JsTypeCommander.MapFromValueCallback<null, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<null>("whenNull", this._whenNull); }
    get whenUndefined(): JsTypeCommander.MapFromValueCallback<undefined, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<undefined>("whenUndefined", this._whenUndefined); }
    get whenObject(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenObject", this._whenObject); }
    otherwise(value: JsTypeCommander.AnyNilable): MapCallbackId { return this._onInvoked(MapCallbackId.otherwise, value); }
    toJSON(): { [key: number]: boolean|undefined } {
        let allIds: MapCallbackId[] = [ MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject ];
        let result: { [key: string]: boolean|undefined } = { };
        allIds.forEach(i => {
            let n: MapCallbackName = mapCallbackIdToName(i);
            if (this._isOmmitted[n])
                result[n] = false
        })
        return result;
    }
}
class MapByNilHelper {
    private _whenTrueInvoked: boolean = false;
    private _otherwiseInvoked: boolean = false;
    private _callCount: number = 0;
    private _lastArg: JsTypeCommander.AnyNilable = undefined;
    private _trueNum: number;
    private _otherwiseNum: number;
    get whenTrueInvoked(): boolean { return this._whenTrueInvoked; }
    get otherwiseInvoked(): boolean { return this._otherwiseInvoked; }
    get callCount(): number { return this._callCount; }
    get trueNum(): number { return this._trueNum; }
    get otherwiseNum(): number { return this._otherwiseNum; }
    whenTrue(arg: JsTypeCommander.AnyNilable): number {
        this._callCount++;
        this._whenTrueInvoked = true;
        this._lastArg = arg;
        return this._trueNum;
    }
    otherwise(arg?: any): number {
        this._callCount++;
        this._otherwiseInvoked = true;
        this._lastArg = arg;
        return this._otherwiseNum;
    }
    constructor() {
        this._trueNum = Math.floor(Math.random() * 100);
        this._otherwiseNum = Math.floor(Math.random() * 100);
        while (this._trueNum == this._otherwiseNum)
            this._otherwiseNum = Math.floor(Math.random() * 100);
    }
}

describe.skip("Testing type map functions", function() {
    describe("Testing mapByTypeValue function", function() {
        let inputTypeArr: MapByTypeInputType[] = [
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
                        { expected: MapCallbackId.whenArray, checkElements: false },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false },
                        { expected: MapCallbackId.whenArray, checkElements: true },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                    ]
                }
            }, {
                type: 'ArrayLike',
                test: [
                    {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike, checkElements: true },
                            { omit: "whenArrayLike", checkElements: true, expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], checkElements: true, expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'not ArrayLike',
                test: [
                    {
                        arg: { display: '{ }', getValue: () => { return { } } },
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: false },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: false },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false }
                        ]
                    }, {
                        arg: [
                            { display: '{ }', getValue: () => { return { } } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                        ],
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: true },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: true },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                        ]
                    }
                ]
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
        let dataIterationIndex: number = 0;
        inputTypeArr.forEach(inputType => {
            describe('Testing ' + inputType.type + " values", function() {
                let tests: MapByTypeTest[] = (Array.isArray(inputType.test)) ? inputType.test : [inputType.test];
                tests.forEach(mapByTypeTest => {
                    let args: ArgumentDescriptor[] = (Array.isArray(mapByTypeTest.arg)) ? mapByTypeTest.arg : [mapByTypeTest.arg];
                    let optArr: MapByTypeOptions[] = (Array.isArray(mapByTypeTest.opt)) ? mapByTypeTest.opt : [mapByTypeTest.opt];
                    optArr.forEach(opt => {
                        let omit: MapCallbackName[] = (typeof(opt.omit) == "undefined") ? [] : ((typeof(opt.omit) == "string") ? [opt.omit] : opt.omit);
                        args.forEach(argInfo => {
                            let tgh: MapByTypeHelper = new MapByTypeHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + argInfo.display + ', ' + JSON.stringify(tgh.toJSON()) + ((typeof(opt.checkElements) == "boolean") ? ", " +
                                    opt.checkElements : "") + ') should return ' + opt.expected + " (calling " + mapCallbackIdToName(opt.expected) + ")", function() {
                                let result: JsTypeCommander.AnyNilable = (typeof(opt.checkElements) == "boolean") ?
                                    JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh, opt.checkElements) :
                                    JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh);
                                dataIterationIndex++;
                                expect(result).to.a("number", "at dataIterationIndex " + dataIterationIndex);
                                expect(result).to.equal(opt.expected, mapCallbackIdToName(result) + " called, insteaat dataIterationIndex " + dataIterationIndex);
                            });
                        }, this);
                    }, this);
                }, this);
            });
        }, this);
    });

    let mapByNilFunctionArr: MapByNilFunction[] = [
        { name: 'mapByDefined', callback: JsTypeCommander.mapByDefined, allowUndefined: false, allowNull: true },
        { name: 'mapByNotNull', callback: JsTypeCommander.mapByNotNull, allowUndefined: true, allowNull: false },
        { name: 'mapByNotNil', callback: JsTypeCommander.mapByNotNil, allowUndefined: false, allowNull: false }
    ];
    let mapByNilArguments: MapByNilArguments[] = [
        { display: 'undefined', type: 'undefined', getValue: () => undefined },
        { display: 'null', type: 'null', getValue: () => null },
        { display: 'NaN', type: 'notNil', getValue: () => NaN },
        { display: '0', type: 'notNil', getValue: () => 0 },
        { display: 'false', type: 'notNil', getValue: () => false },
        { display: '""', type: 'notNil', getValue: () => "" },
        { display: '[]', type: 'notNil', getValue: () => [] },
        { display: '[undefined', type: 'notNil', getValue: () => [undefined] },
        { display: '{}', type: 'notNil', getValue: () => { return {}; } },
        { display: 'Symbol.iterator', type: 'notNil', getValue: () => Symbol.iterator }
    ];
    mapByNilFunctionArr.forEach(mapByNilFunction => {
        describe("Testing " + mapByNilFunction.name + " function", function() {
            mapByNilArguments.forEach(argInfo => {
                let whenTrue: boolean = (argInfo.type == "notNil" || ((argInfo.type == "null") ? mapByNilFunction.allowNull : mapByNilFunction.allowUndefined));
                let mapByNilHelper: MapByNilHelper = new MapByNilHelper();
                let expected: number = (whenTrue) ? mapByNilHelper.trueNum : mapByNilHelper.otherwiseNum;
                it(mapByNilFunction.name + "(" + argInfo.display + ", fn(v) => " + mapByNilHelper.trueNum + ', fn' + ((mapByNilFunction.name == "mapByNotNil") ? '(v)' : '()') +
                        ' => ' + mapByNilHelper.otherwiseNum + ') should return ' + expected + ' (' + ((whenTrue) ? 'whenTrue' : 'otherwise') + ')', function() {
                    let result: JsTypeCommander.AnyNilable = mapByNilFunction.callback(argInfo.getValue(), mapByNilHelper.whenTrue, mapByNilHelper.otherwise, mapByNilHelper);
                    expect(result).to.a('number').and.to.equal(expected);
                    expect(mapByNilHelper.callCount).to.not.equal(0, 'Callback not invoked');
                    expect(mapByNilHelper.callCount).to.equal(1, 'Callback invoked more than once');
                    if (whenTrue)
                        expect(mapByNilHelper.whenTrueInvoked).to.equal(true, 'Wrong callback invoked');
                    else
                        expect(mapByNilHelper.otherwiseInvoked).to.equal(true, 'Wrong callback invoked');
                });
            }, this);
        });
    }, this);
});

class TestLengthProp {
    private _length: number;
    get length(): number { return this._length; }
    constructor(n?: number) { this._length = (typeof(n) == "number") ? n : 0; }
}
class TestArrayLike<T> extends TestLengthProp implements ArrayLike<T> {
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
class AlmostArrayLike<T> extends TestArrayLike<T> {
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
class TestErrorLike {
    message: string = "Example Error";
    get name(): string { return "TestErrorLike"; }
}
class TestErrorLike2 extends TestErrorLike {
    number: number = 12;
    get name(): string { return "TestErrorLike2"; }
}
class TestErrorLike3 extends TestErrorLike2 implements JsTypeCommander.ErrorLike {
    description?: string;
    fileName?: string;
    lineNumber?: number;
    stack?: string;
    get name(): string { return "TestErrorLike3"; }
}

interface IFunctionDefinition {
    name: string;
    signature: string;
    callback: Function;
    expectations: (IExpectEquals|IExpectIs)[];
    _type: "FunctionDefinition";
}
interface IArgSet { display: string; getArgs: { (): (any|null|undefined)[] }; message?: string; _type: "ArgSet" }
interface IExpectEquals {
    display: string;
    getExpectedValue: { (): any|null|undefined; };
    argSets: IArgSet[];
    _type: "ExpectEquals";
}
interface IExpectIs {
    display: string;
    expectedType: string;
    argSets: IArgSet[];
    _type: "ExpectIs";
}
interface IExpectationSet {
    description?: string;
    expectations: (IExpectEquals|IExpectIs)[];
    functions: IFunctionDefinition[];
    getGenericArgs?: { (): (any|null|undefined)[] };
    _type: "ExpectationSet";
}
interface IFunctionGroup {
    description?: string;
    expectations: (IExpectEquals|IExpectIs)[];
    sets: IExpectationSet[];
    _type: "FunctionGroup";
}
interface IFunctionTypeGroup {
    type: string;
    expectations: (IExpectEquals|IExpectIs)[];
    groups: IFunctionGroup[];
    _type: "TypeGroup";
}
function argSet(getArgs: { (): (any|null|undefined)[] }, display: string, message?: string): IArgSet {
    return { display: display, getArgs: getArgs, message: message, _type: "ArgSet" };
}
function expectEqualTo(display: string, getExpectedValue: { (): any|null|undefined[]; }, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: display, getExpectedValue: getExpectedValue, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectIsA(type: string, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectIs {
    let result: IExpectIs = { display: type, expectedType: type, argSets: [argSet], _type: "ExpectIs"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectEqualToFalse(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: 'false', getExpectedValue: () => false, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectEqualToTrue(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals {
    let result: IExpectEquals = { display: 'true', getExpectedValue: () => true, argSets: [argSet], _type: "ExpectEquals"};
    if (typeof(otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function testFunction(callback: Function, name: string, signature: string, ...expectations: (IExpectEquals|IExpectIs)[]): IFunctionDefinition {
    return { callback: callback, name: name, signature: signature, expectations: expectations, _type: "FunctionDefinition" };
}
function expectationDescription(description: string, content: IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IFunctionDefinition|IExpectEquals|IExpectIs)[]): IExpectationSet {
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
function expectationSet(content: IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IFunctionDefinition|IExpectEquals|IExpectIs)[]): IExpectationSet {
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
function functionGroup(description: string, content: IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs)[]): IFunctionGroup {
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
function genericFunctionGroup(description: string, getGenericArgs: { (): (any|null|undefined)[] }, content: IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionDefinition|IExpectEquals|IExpectIs)[]) : IFunctionGroup {
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
function functionTypeGroup(type: string, content: IExpectationSet|IFunctionGroup|IFunctionDefinition|IExpectEquals|IExpectIs, ...moreContents: (IExpectationSet|IFunctionGroup|IFunctionDefinition|IExpectEquals|IExpectIs)[]) : IFunctionTypeGroup {
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

function describeTestFunction(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], funcDef: IFunctionDefinition, getGenericArgs?: { (): any|null|undefined; }) {
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

function describeExpectationSet(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], expectationSet: IExpectationSet) {
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

function describeFunctionGroups(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals|IExpectIs)[], functionGrp: IFunctionGroup) {
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
function describeFunctionTypeGroups(functionTypeGroups: IFunctionTypeGroup[]) {
    functionTypeGroups.forEach(typeGroup => {
        describe('Testing ' + typeGroup.type + ' functions', function() {
            typeGroup.groups.forEach(functionGrp => {
                describeFunctionGroups.call(this, typeGroup.expectations, functionGrp);
            }, this);
        });
    });
}
describe("Testing type gate functions", function() {
    let functionTypeGroups: IFunctionTypeGroup[] = [
        functionTypeGroup('nil gate',
            testFunction(JsTypeCommander.notDefined, 'notDefined', '(obj?: TDefined): obj is undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                expectEqualToFalse(argSet(() => [null], "null"))),
            testFunction(JsTypeCommander.isNull, 'isNull', '(obj?: TDefined): obj is undefined',
                expectEqualToTrue(argSet(() => [null], "null")),
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
            testFunction(JsTypeCommander.isNil, 'isNil', '(obj?: TDefined): obj is undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
            expectEqualToFalse(argSet(() => [NaN], 'NaN'), argSet(() => [0], '0'), argSet(() => [false], 'false'), argSet(() => [""], '""'), argSet(() => [{}], '{}'), argSet(() => [[]], '[]'))
        ),
        functionTypeGroup('string gate',
            functionGroup('Testing type gate functions for any string',
                testFunction(JsTypeCommander.isString, 'isString', '(obj?: TDefined): obj is string'),
                testFunction(JsTypeCommander.isStringIfDef, 'isStringIfDef', '(obj?: TDefined): obj is string | undefined'),
                testFunction(JsTypeCommander.isStringOrNull, 'isStringOrNull', '(obj?: TDefined): obj is string | null'),
                testFunction(JsTypeCommander.isStringOrNil, 'isStringOrNil', '(obj?: TDefined): obj is string | null | undefined'),
                expectEqualToTrue(argSet(() => [" "], '" "'), argSet(() => [" \n\r "], '" \\n\\r "'), argSet(() => ["Test"], '"Test"'), argSet(() => [" Test "], '" Test "'))
            ),
            functionGroup('Testing empty string type gate functions',
                testFunction(JsTypeCommander.isEmptyString, 'isEmptyString', '(obj?: TDefined): obj is string',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyStringIfDef, 'isEmptyStringIfDef', '(obj?: TDefined): obj is string | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyStringOrNull, 'isEmptyStringOrNull', '(obj?: TDefined): obj is string | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isEmptyStringOrNil, 'isEmptyStringOrNil', '(obj?: TDefined): obj is string | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                expectEqualToFalse(argSet(() => [" "], '" "'), argSet(() => [" \n\r "], '" \\n\\r "'), argSet(() => ["Test"], '"Test"'), argSet(() => [" Test "], '" Test "'))
            ),
            functionGroup('Testing whitespace string type gate functions',
                testFunction(JsTypeCommander.isEmptyOrWhitespace, 'isEmptyOrWhitespace', '(obj?: TDefined): obj is string'),
                testFunction(JsTypeCommander.isEmptyOrWhitespaceIfDef, 'isEmptyOrWhitespaceIfDef', '(obj?: TDefined): obj is string | undefined'),
                testFunction(JsTypeCommander.isNullOrWhitespace, 'isNullOrWhitespace', '(obj?: TDefined): obj is string | null'),
                testFunction(JsTypeCommander.isNilOrWhitespace, 'isNilOrWhitespace', '(obj?: TDefined): obj is string | null | undefined'),
                expectEqualToTrue(argSet(() => [" "], '" "'), argSet(() => [" \n\r "], '" \\n\\r "')),
                expectEqualToFalse(argSet(() => ["Test"], '"Test"'), argSet(() => [" Test "], '" Test "'))
            ),
            expectEqualToTrue(argSet(() => [""], '""')),
            expectEqualToFalse(argSet(() => [NaN], 'NaN'), argSet(() => [0], '0'), argSet(() => [false], 'false'), argSet(() => [[]], '[]'), argSet(() => [[""]], '[""]'),
                argSet(() => [{}], '{}'), argSet(() => [function() { return ""; }], 'function() { return ""; }'))
        ),
        functionTypeGroup('boolean gate',
            testFunction(JsTypeCommander.isBoolean, 'isBoolean', '(obj?: TDefined): obj is boolean',
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
            testFunction(JsTypeCommander.isBooleanIfDef, 'isBooleanIfDef', '(obj?: TDefined): obj is boolean | undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                expectEqualToFalse(argSet(() => [null], "null"))),
            testFunction(JsTypeCommander.isBooleanOrNull, 'isBooleanOrNull', '(obj?: TDefined): obj is boolean | null',
                expectEqualToTrue(argSet(() => [null], "null")),
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
            testFunction(JsTypeCommander.isBooleanOrNil, 'isBooleanOrNil', '(obj?: TDefined): obj is boolean | null | undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
            expectEqualToTrue(argSet(() => [true], 'true'), argSet(() => [false], 'false')),
            expectEqualToFalse(argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'), argSet(() => [0], '0'), argSet(() => [""], '""'), argSet(() => ["true"], '"true"'),
                argSet(() => ["false"], '"false"'), argSet(() => [[]], '[]'), argSet(() => [[true]], '[true]'), argSet(() => [{}], '{}'),
                argSet(() => [Symbol.iterator], 'Symbol.iterator'), argSet(() => [function() { return true; }], 'function() { return true; }'))
        ),
        functionTypeGroup('number gate',
            expectationSet(
                testFunction(JsTypeCommander.isNumber, 'isNumber', '(obj?: TDefined): obj is number',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"), argSet(() => [NaN], "NaN"))),
                testFunction(JsTypeCommander.isNumberIfDef, 'isNumberIfDef', '(obj?: TDefined): obj is number | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"), argSet(() => [NaN], "NaN"))),
                testFunction(JsTypeCommander.isNumberOrNull, 'isNumberOrNull', '(obj?: TDefined): obj is number | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [NaN], "NaN"))),
                testFunction(JsTypeCommander.isNumberOrNil, 'isNumberOrNil', '(obj?: TDefined): obj is number | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [NaN], "NaN"))),
                expectEqualToTrue(argSet(() => [1], '1'), argSet(() => [0], '0'), argSet(() => [0.0001], '0.0001'), argSet(() => [-1], '-1')),
                expectEqualToFalse(argSet(() => [Infinity], "Infinity"), argSet(() => [Number.NEGATIVE_INFINITY], "Number.NEGATIVE_INFINITY"),
                    argSet(() => [Number.POSITIVE_INFINITY], "Number.POSITIVE_INFINITY"))
            ),
            testFunction(JsTypeCommander.isNumberNaNorNull, 'isNumberNaNorNull', '(obj?: TDefined): obj is number | null',
                expectEqualToTrue(argSet(() => [null], "null"), argSet(() => [NaN], "NaN"), argSet(() => [1], '1'), argSet(() => [0], '0'),
                    argSet(() => [0.0001], '0.0001'), argSet(() => [-1], '-1'), argSet(() => [Infinity], "Infinity"),
                    argSet(() => [Number.NEGATIVE_INFINITY], "Number.NEGATIVE_INFINITY"), argSet(() => [Number.POSITIVE_INFINITY], "Number.POSITIVE_INFINITY")),
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
            testFunction(JsTypeCommander.isInfinite, 'isInfinite', '(obj?: TDefined): obj is number',
                expectEqualToTrue(argSet(() => [Infinity], "Infinity"), argSet(() => [Number.NEGATIVE_INFINITY], "Number.NEGATIVE_INFINITY"),
                    argSet(() => [Number.POSITIVE_INFINITY], "Number.POSITIVE_INFINITY")),
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"), argSet(() => [NaN], "NaN"),
                    argSet(() => [1], '1'), argSet(() => [0], '0'), argSet(() => [0.0001], '0.0001'), argSet(() => [-1], '-1'))),
            expectEqualToFalse(argSet(() => [true], 'true'), argSet(() => [false], 'false'), argSet(() => [""], '""'),
                argSet(() => ["1"], '"1"'), argSet(() => ["0"], '"0"'), argSet(() => [[]], '[]'), argSet(() => [[1]], '[1]'), argSet(() => [[0]], '[0]'),
                argSet(() => [{}], '{}'), argSet(() => [Symbol.iterator], 'Symbol.iterator'), argSet(() => [function() { return true; }], 'function() { return true; }'),
                argSet(() => [function() { return true; }], 'function() { return NaN; }'))
        ),
        functionTypeGroup('function gate',
            testFunction(JsTypeCommander.isFunction, 'isFunction', '(obj?: TDefined): obj is Function',
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
            testFunction(JsTypeCommander.isFunctionIfDef, 'isFunctionIfDef', '(obj?: TDefined): obj is Function | undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                expectEqualToFalse(argSet(() => [null], "null"))),
            testFunction(JsTypeCommander.isFunctionOrNull, 'isFunctionOrNull', '(obj?: TDefined): obj is Function | null',
                expectEqualToTrue(argSet(() => [null], "null")),
                expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
            testFunction(JsTypeCommander.isFunctionOrNil, 'isFunctionOrNil', '(obj?: TDefined): obj is Function | null | undefined',
                expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
            expectEqualToTrue(argSet(() => [function() { return true; }], 'function() { return true; }')),
            expectEqualToFalse(argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'), argSet(() => [true], 'true'), argSet(() => [""], '""'), argSet(() => [[]], '[]'),
                argSet(() => [[function() { return true; }]], '[function() { return true; }]'), argSet(() => [{}], '{}'),
                argSet(() => [Symbol.iterator], 'Symbol.iterator'))
        ),
        functionTypeGroup('object gate',
            functionGroup('Testing simple object type gate functions for object type',
                testFunction(JsTypeCommander.isObjectType, 'isObjectType', '(obj?: TDefined): obj is object',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isObjectTypeIfDef, 'isObjectTypeIfDef', '(obj?: TDefined): obj is object | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isObjectTypeOrNull, 'isObjectTypeOrNull', '(obj?: TDefined): obj is object | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isObjectTypeOrNil, 'isObjectTypeOrNil', '(obj?: TDefined): obj is object | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing any object type gate functions for objects which can have any named property',
                testFunction(JsTypeCommander.isObject, 'isObject', '(obj?: TDefined): obj is IStringKeyedObject',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isObjectIfDef, 'isObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isObjectOrNull, 'isObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isObjectOrNil, 'isObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing type gate functions for non-array objects',
                testFunction(JsTypeCommander.isNonArrayObject, 'isNonArrayObject', '(obj?: TDefined): obj is IStringKeyedObject',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isNonArrayObjectIfDef, 'isNonArrayObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isNonArrayObjectOrNull, 'isNonArrayObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isNonArrayObjectOrNil, 'isNonArrayObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing type gate functions for plain objects',
                testFunction(JsTypeCommander.isPlainObject, 'isPlainObject', '(obj?: TDefined): obj is IStringKeyedObject',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isPlainObjectIfDef, 'isPlainObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isPlainObjectOrNull, 'isPlainObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isPlainObjectOrNil, 'isPlainObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            )
        ),
        functionTypeGroup('Array gate',
            functionGroup('Testing normal array type gate functions',
                testFunction(JsTypeCommander.isArray, 'isObjectType', '(obj?: TDefined): obj is AnyNilable[]',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayIfDef, 'isArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayOrNull, 'isArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isArrayOrNil, 'isArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing normal array type gate functions',
                testFunction(JsTypeCommander.isArray, 'isArray', '(obj?: TDefined): obj is AnyNilable[]',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayIfDef, 'isArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayOrNull, 'isArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isArrayOrNil, 'isArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing empty array type gate functions',
                testFunction(JsTypeCommander.isEmptyArray, 'isEmptyArray', '(obj?: TDefined): obj is AnyNilable[]',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyArray, 'isEmptyArray', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[]',
                    expectEqualToFalse(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyArrayIfDef, 'isEmptyArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyArrayIfDef, 'isEmptyArrayIfDef', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyArrayOrNull, 'isEmptyArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isEmptyArrayOrNull, 'isEmptyArrayOrNull', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isEmptyArrayOrNil, 'isEmptyArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isEmptyArrayOrNil, 'isEmptyArrayOrNil', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | null | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            ),
            functionGroup('Testing ArrayLike type gate functions',
                testFunction(JsTypeCommander.isArrayLike, 'isArrayLike', '(obj?: TDefined): obj is ArrayLike<AnyNilable>',
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayLike, 'isArrayLike', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable>',
                    expectEqualToFalse(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayLikeIfDef, 'isArrayLikeIfDef', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayLikeIfDef, 'isArrayLikeIfDef', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.isArrayLikeOrNull, 'isArrayLikeOrNull', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isArrayLikeOrNull, 'isArrayLikeOrNull', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.isArrayLikeOrNil, 'isArrayLikeOrNil', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | null | undefined',
                    expectEqualToTrue(argSet(() => [], ""), argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                    expectEqualToFalse(argSet(() => [], ""), argSet(() => [undefined], "undefined")),
                testFunction(JsTypeCommander.isArrayLikeOrNil, 'isArrayLikeOrNil', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | null | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined"), argSet(() => [null], "null")))
            )
        ),
        functionTypeGroup('derrivation gate',
            genericFunctionGroup('Testing Error class derrivation functions', () => [Error],
                testFunction(JsTypeCommander.derivesFrom, 'derivesFrom<Error>', '(obj?: TDefined, Error): obj is Error',
                    expectEqualToFalse(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<Error>', '(obj?: TDefined, Error): obj is Error | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<Error>', '(obj?: TDefined, Error): obj is Error | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<Error>', '(obj?: TDefined, Error): obj is Error | null | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                expectEqualToTrue(argSet(() => [new Error()], 'new Error()'), argSet(() => [new RangeError()], 'new RangeError()')),
                expectEqualToFalse(argSet(() => [new TestErrorLike()], 'new TestErrorLike()'), argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'),
                    argSet(() => [true], 'true'), argSet(() => [[]], '[]'), argSet(() => [[new Error()]], '[new Error()]'))
            ),
            genericFunctionGroup('Testing Error class derrivation functions', () => [RangeError],
                testFunction(JsTypeCommander.derivesFrom, 'derivesFrom<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError',
                    expectEqualToFalse(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | null | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                expectEqualToTrue(argSet(() => [new RangeError()], 'new RangeError()')),
                expectEqualToFalse(argSet(() => [new Error()], 'new Error()'), argSet(() => [new TestErrorLike()], 'new TestErrorLike()'), argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'),
                    argSet(() => [true], 'true'), argSet(() => [[]], '[]'), argSet(() => [[new RangeError()]], '[new RangeError()]'))
            ),
            genericFunctionGroup('Testing custom class derrivation functions', () => [TestErrorLike],
                testFunction(JsTypeCommander.derivesFrom, 'derivesFrom<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike',
                    expectEqualToFalse(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined")),
                    expectEqualToFalse(argSet(() => [null], "null"))),
                testFunction(JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | null',
                    expectEqualToTrue(argSet(() => [null], "null")),
                    expectEqualToFalse(argSet(() => [undefined], "undefined"))),
                testFunction(JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | null | undefined',
                    expectEqualToTrue(argSet(() => [undefined], "undefined"), argSet(() => [null], "null"))),
                expectEqualToTrue(argSet(() => [new TestErrorLike()], 'new TestErrorLike()'), argSet(() => [new TestErrorLike2()], 'new TestErrorLike2()'), argSet(() => [new TestErrorLike3()], 'new TestErrorLike3()')),
                expectEqualToFalse(argSet(() => [new RangeError()], 'new RangeError()'), argSet(() => [new Error()], 'new Error()'), argSet(() => [new TestErrorLike()], 'new TestErrorLike()'), argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'),
                    argSet(() => [true], 'true'), argSet(() => [[]], '[]'), argSet(() => [[new RangeError()]], '[new RangeError()]'))
            )
        ),
        functionTypeGroup('ErrorLike gate',
            testFunction(JsTypeCommander.isErrorLike, 'isErrorLike', '(obj?: TDefined): obj is boolean',
                expectEqualToTrue(argSet(() => [new RangeError()], 'new RangeError()'), argSet(() => [new Error()], 'new Error()'),
                    argSet(() => [new TestErrorLike()], 'new TestErrorLike()'), argSet(() => [new TestErrorLike2()], 'new TestErrorLike2()')),
                expectEqualToFalse(argSet(() => [NaN], 'NaN'), argSet(() => [1], '1'), argSet(() => [0], '0'), argSet(() => [""], '""'), argSet(() => ["true"], '"true"'),
                    argSet(() => ["false"], '"false"'), argSet(() => [[]], '[]'), argSet(() => [[true]], '[true]'), argSet(() => [{}], '{}'),
                    argSet(() => [Symbol.iterator], 'Symbol.iterator'), argSet(() => [function() { return true; }], 'function() { return true; }')))
        )
    ];
    describeFunctionTypeGroups(functionTypeGroups);
});

describe("Testing type conversion functions", function() {
    let functionTypeGroups: IFunctionTypeGroup[] = [
        functionTypeGroup('string conversion',
            testFunction(JsTypeCommander.asString, 'asString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): Nilable<string>',
                expectIsA('undefined',
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                expectIsA('null',
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined')
                ),
                expectEqualTo('""', () => "",
                    argSet(() => [""], '""'),
                    argSet(() => [""], '""'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [[""]], '[""]'),
                    argSet(() => ["", undefined], '"", undefined'),
                    argSet(() => ["", null], '"", null'),
                    argSet(() => [undefined, ""], 'undefined, ""'),
                    argSet(() => [null, ""], 'null, ""'),
                    argSet(() => ["", Symbol.iterator], '"", Symbol.iterator'),
                    argSet(() => ["", Symbol.iterator, false], '"", Symbol.iterator, false'),
                    argSet(() => ["", "\t\n\r "], '"", "\\t\\n\\r "'),
                    argSet(() => ["", "\t\n\r ", false], '"", "\\t\\n\\r ", false')
                ),
                expectEqualTo('"true"', () => "true",
                    argSet(() => ["true"], '"true"'),
                    argSet(() => [true,], 'true')
                ),
                expectEqualTo('"false"', () => "false",
                    argSet(() => ["false"], '"false"'),
                    argSet(() => [false,], 'false')
                ),
                expectEqualTo('"iterator"', () => "iterator",
                    argSet(() => [Symbol.iterator], 'Symbol.iterator'),
                    argSet(() => [[Symbol.iterator]], '[Symbol.iterator]'),
                    argSet(() => [undefined, Symbol.iterator], 'undefined, Symbol.iterator'),
                    argSet(() => [null, Symbol.iterator], 'null, Symbol.iterator'),
                    argSet(() => ["", Symbol.iterator, true], '"", Symbol.iterator, true'),
                    argSet(() => ["\t\n\r ", Symbol.iterator, true], '"\\t\\n\\r ", Symbol.iterator, true')
                ),
                expectEqualTo('"\\t\\n\\r "', () => "\t\n\r ",
                    argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    argSet(() => ["\t\n\r ", Symbol.iterator], '"\\t\\n\\r ", Symbol.iterator'),
                    argSet(() => ["", "\t\n\r ", true], '"", "\\t\\n\\r ", true'),
                    argSet(() => ["\t\n\r ", "", true], '"\\t\\n\\r ", "", true'),
                    argSet(() => ["\t\n\r ", Symbol.iterator, false], '"\\t\\n\\r ", Symbol.iterator, false')
                )
            ),
            testFunction(JsTypeCommander.toString, 'toString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): string',
                expectEqualTo('""', () => "",
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [undefined, undefined], 'undefined, undefined'),
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined'),
                    argSet(() => [""], '""'),
                    argSet(() => [""], '""'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [[""]], '[""]'),
                    argSet(() => ["", undefined], '"", undefined'),
                    argSet(() => ["", null], '"", null'),
                    argSet(() => [undefined, ""], 'undefined, ""'),
                    argSet(() => [null, ""], 'null, ""'),
                    argSet(() => ["", Symbol.iterator], '"", Symbol.iterator'),
                    argSet(() => ["", Symbol.iterator, false], '"", Symbol.iterator, false'),
                    argSet(() => ["", "\t\n\r "], '"", "\\t\\n\\r "'),
                    argSet(() => ["", "\t\n\r ", false], '"", "\\t\\n\\r ", false')
                ),
                expectEqualTo('"true"', () => "true",
                    argSet(() => ["true"], '"true"'),
                    argSet(() => [true,], 'true')
                ),
                expectEqualTo('"false"', () => "false",
                    argSet(() => ["false"], '"false"'),
                    argSet(() => [false,], 'false')
                ),
                expectEqualTo('"iterator"', () => "iterator",
                    argSet(() => [Symbol.iterator], 'Symbol.iterator'),
                    argSet(() => [[Symbol.iterator]], '[Symbol.iterator]'),
                    argSet(() => [undefined, Symbol.iterator], 'undefined, Symbol.iterator'),
                    argSet(() => [null, Symbol.iterator], 'null, Symbol.iterator'),
                    argSet(() => ["", Symbol.iterator, true], '"", Symbol.iterator, true'),
                    argSet(() => ["\t\n\r ", Symbol.iterator, true], '"\\t\\n\\r ", Symbol.iterator, true')
                ),
                expectEqualTo('"\\t\\n\\r "', () => "\t\n\r ",
                    argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    argSet(() => ["\t\n\r ", Symbol.iterator], '"\\t\\n\\r ", Symbol.iterator'),
                    argSet(() => ["", "\t\n\r ", true], '"", "\\t\\n\\r ", true'),
                    argSet(() => ["\t\n\r ", "", true], '"\\t\\n\\r ", "", true'),
                    argSet(() => ["\t\n\r ", Symbol.iterator, false], '"\\t\\n\\r ", Symbol.iterator, false')
                )
            )
        ),
        functionTypeGroup('boolean conversion',
            testFunction(JsTypeCommander.asBoolean, 'asBoolean', '(obj?: TDefined): Nilable<boolean>): Nilable<boolean>',
                expectIsA('undefined',
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [""], '""'), argSet(() => ["talse"], '"talse"'), argSet(() => ["nes"], '""nes'), argSet(() => ["yo"], '"yo"'), argSet(() => ["frue"], '"frue"'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                expectIsA('null',
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined')
                ),
                expectEqualTo('true', () => true,
                    argSet(() => [true], 'true'),
                    argSet(() => [1], '1'),
                    argSet(() => [-1], '-1'),
                    argSet(() => [100], '100'),
                    argSet(() => [Number.POSITIVE_INFINITY], 'Number.POSITIVE_INFINITY'),
                    argSet(() => [Number.NEGATIVE_INFINITY], 'Number.NEGATIVE_INFINITY'),
                    argSet(() => ["t"], '"t"'), argSet(() => ["T"], '"T"'),
                    argSet(() => ["true"], '"true"'), argSet(() => ["TRUE"], '"TRUE"'), argSet(() => ["True"], '"True"'), argSet(() => ["tRuE"], '"tRuE"'),
                    argSet(() => ["y"], '"y"'), argSet(() => ["Y"], '"Y"'),
                    argSet(() => ["yes"], '"yes"'), argSet(() => ["YES"], '"YES"'), argSet(() => ["Yes"], '"Yes"'), argSet(() => ["yEs"], '"yEs"'),
                    argSet(() => [[true]], '[true]'),
                    argSet(() => [true, undefined], 'true, undefined'),
                    argSet(() => [true, null], 'true, null'),
                    argSet(() => [undefined, true], 'undefined, true'),
                    argSet(() => [null, true], 'null, true'),
                    argSet(() => [null, -0.0001], 'null, -0.0001'),
                    argSet(() => [true, false], 'true, false')
                ),
                expectEqualTo('false', () => false,
                    argSet(() => [false], 'false'),
                    argSet(() => [0], '0'),
                    argSet(() => ["-0.0000"], '"-0.0000"'),
                    argSet(() => [NaN], 'NaN'),
                    argSet(() => ["f"], '"f"'), argSet(() => ["F"], '"F"'),
                    argSet(() => ["false"], '"false"'), argSet(() => ["FALSE"], '"FALSE"'), argSet(() => ["False"], '"False"'), argSet(() => ["fAlSe"], '"fAlSe"'),
                    argSet(() => [[false]], '[false]'),
                    argSet(() => [false, undefined], 'false, undefined'),
                    argSet(() => [false, null], 'false, null'),
                    argSet(() => [undefined, false], 'undefined, false'),
                    argSet(() => [null, false], 'null, false'),
                    argSet(() => [false, true], 'false, true')
                )
            ),
            testFunction(JsTypeCommander.toBoolean, 'toBoolean', '(obj?: TDefined): Nilable<boolean>): boolean',
                expectEqualTo('true', () => true,
                    argSet(() => [true], 'true'),
                    argSet(() => [1], '1'),
                    argSet(() => [-1], '-1'),
                    argSet(() => [100], '100'),
                    argSet(() => [Number.POSITIVE_INFINITY], 'Number.POSITIVE_INFINITY'),
                    argSet(() => [Number.NEGATIVE_INFINITY], 'Number.NEGATIVE_INFINITY'),
                    argSet(() => ["t"], '"t"'), argSet(() => ["T"], '"T"'),
                    argSet(() => ["true"], '"true"'), argSet(() => ["TRUE"], '"TRUE"'), argSet(() => ["True"], '"True"'), argSet(() => ["tRuE"], '"tRuE"'),
                    argSet(() => ["y"], '"y"'), argSet(() => ["Y"], '"Y"'),
                    argSet(() => ["yes"], '"yes"'), argSet(() => ["YES"], '"YES"'), argSet(() => ["Yes"], '"Yes"'), argSet(() => ["yEs"], '"yEs"'),
                    argSet(() => [[true]], '[true]'),
                    argSet(() => [true, undefined], 'true, undefined'),
                    argSet(() => [true, null], 'true, null'),
                    argSet(() => [undefined, true], 'undefined, true'),
                    argSet(() => [null, true], 'null, true'),
                    argSet(() => [null, -0.0001], 'null, -0.0001'),
                    argSet(() => [true, false], 'true, false')
                ),
                expectEqualTo('false', () => false,
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [""], '""'), argSet(() => ["talse"], '"talse"'), argSet(() => ["nes"], '""nes'), argSet(() => ["yo"], '"yo"'), argSet(() => ["frue"], '"frue"'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [undefined, undefined], 'undefined, undefined'),
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined'),
                    argSet(() => [false], 'false'),
                    argSet(() => [0], '0'),
                    argSet(() => ["-0.0000"], '"-0.0000"'),
                    argSet(() => [NaN], 'NaN'),
                    argSet(() => ["f"], '"f"'), argSet(() => ["F"], '"F"'),
                    argSet(() => ["false"], '"false"'), argSet(() => ["FALSE"], '"FALSE"'), argSet(() => ["False"], '"False"'), argSet(() => ["fAlSe"], '"fAlSe"'),
                    argSet(() => [[false]], '[false]'),
                    argSet(() => [false, undefined], 'false, undefined'),
                    argSet(() => [false, null], 'false, null'),
                    argSet(() => [undefined, false], 'undefined, false'),
                    argSet(() => [null, false], 'null, false'),
                    argSet(() => [false, true], 'false, true')
                )
            )
        ),
        functionTypeGroup('number conversion',
            testFunction(JsTypeCommander.asNumber, 'asNumber', '(obj?: TDefined): Nilable<number>): Nilable<number>',
                expectIsA('undefined',
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [""], '""'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                expectIsA('null',
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined')
                ),
                expectEqualTo('1', () => 1,
                    argSet(() => [1], '1'),
                    argSet(() => [true], 'true'),
                    argSet(() => ["1"], '"1"'),
                    argSet(() => ["0001.00"], '"0001.00"'),
                    argSet(() => [undefined, 1], 'undefined, 1'),
                    argSet(() => [undefined, true], 'undefined, true'),
                    argSet(() => [undefined, "1"], 'undefined, "1"'),
                    argSet(() => [undefined, "0001.00"], 'undefined, "0001.00"'),
                    argSet(() => [null, 1], 'null, 1'),
                    argSet(() => [null, true], 'null, true'),
                    argSet(() => [null, "1"], 'null, "1"'),
                    argSet(() => [null, "0001.00"], 'null, "0001.00"'),
                    argSet(() => ["x2", 1], '"x2", 1'),
                    argSet(() => ["x2", true], '"x2", true'),
                    argSet(() => [null, "1"], 'null, "1"'),
                    argSet(() => [null, "0001.00"], 'null, "0001.00"')
                ),
                expectEqualTo('false', () => false,
                    argSet(() => [false], 'false'),
                    argSet(() => [0], '0'),
                    argSet(() => ["-0.0000"], '"-0.0000"'),
                    argSet(() => ["false"], '"false"'),
                    argSet(() => [[false]], '[false]'),
                    argSet(() => [false, undefined], 'false, undefined'),
                    argSet(() => [false, null], 'false, null'),
                    argSet(() => [undefined, false], 'undefined, false'),
                    argSet(() => [null, false], 'null, false'),
                    argSet(() => [false, true], 'false, true')
                )
            ),
            testFunction(JsTypeCommander.toNumber, 'toNumber', '(obj?: TDefined): Nilable<number>): number',
                expectEqualTo('true', () => true,
                    argSet(() => [true], 'true'),
                    argSet(() => [1], '1'),
                    argSet(() => [-1], '-1'),
                    argSet(() => [100], '100'),
                    argSet(() => ["true"], '"true"'),
                    argSet(() => [[true]], '[true]'),
                    argSet(() => [true, undefined], 'true, undefined'),
                    argSet(() => [true, null], 'true, null'),
                    argSet(() => [undefined, true], 'undefined, true'),
                    argSet(() => [null, true], 'null, true'),
                    argSet(() => [null, -0.0001], 'null, -0.0001'),
                    argSet(() => [true, false], 'true, false')
                ),
                expectEqualTo('false', () => false,
                    argSet(() => [false], 'false'),
                    argSet(() => [0], '0'),
                    argSet(() => ["-0.0000"], '"-0.0000"'),
                    argSet(() => ["false"], '"false"'),
                    argSet(() => [[false]], '[false]'),
                    argSet(() => [false, undefined], 'false, undefined'),
                    argSet(() => [false, null], 'false, null'),
                    argSet(() => [undefined, false], 'undefined, false'),
                    argSet(() => [null, false], 'null, false'),
                    argSet(() => [false, true], 'false, true'),
                    argSet(() => [undefined], 'undefined'),
                    argSet(() => [""], '""'),
                    argSet(() => [[]], '[]'),
                    argSet(() => [undefined, undefined], 'undefined, undefined'),
                    argSet(() => [null], 'null'),
                    argSet(() => [undefined, null], 'undefined, null'),
                    argSet(() => [null, undefined], 'null, undefined')
                )
            )
        )
    ];
    describeFunctionTypeGroups(functionTypeGroups);
    describe("Testing number type conversion functions", function() {
        describe("Testing function asNumber(obj?: TDefined): Nilable<number>", function() {
        
        });
        describe("Testing function asNumber(obj?: TDefined, defaultValue?: Nullable<number>): Nilable<number>", function() {
        
        });
        describe("Testing function toNumber(obj?: TDefined): number", function() {
        
        });
        describe("Testing function toNumber(obj?: TDefined, defaultValue?: Nullable<number>): number", function() {
        
        });
    });
    describe("Testing function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]", function() {
    
    });
    describe("Testing function asErrorLike(obj?: TDefined): Nilable<ErrorLike>", function() {
    
    });
});
describe("Testing string manipulation functions", function() {
    describe("Testing function trimStart(text: string): string", function() {
    
    });
    describe("Testing function trimEnd(text: string): string", function() {
    
    });
    describe("Testing function asNormalizedWs(text: string): string", function() {
    
    });
    describe("Testing function ucFirst(text: string): string", function() {
    
    });
    describe("Testing function splitLines(text: string): string[]", function() {
    
    });
    describe("Testing function indentText(text: string | string[], indent?: string): string", function() {
    
    });
    describe("Testing function indentLines(text: string[] | string, indent?: string): string[]", function() {
    
    });
});
describe("Testing function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any", function() {

});