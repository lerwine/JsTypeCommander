import { expect } from 'chai';
import { assert } from 'chai';
//import * as JsTypeCommander from './dist/JsTypeCommander';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';

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

describe("Testing regular expressions", function() {
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

describe("Testing type map functions", function() {
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

enum TypeFlag {
    Undefined =    0x000001,
    Boolean =      0x000002,
    FiniteNumber = 0x000004,
    String =       0x000008,
    Symbol =       0x000010,
    Function =     0x000020,
    Object =       0x000040,
    Null =         0x000080,
    NaN =          0x000100,
    Infinity =     0x000200,
    Array =        0x000100,
    Date =         0x000200,
    Regexp =       0x000400,
    Error =        0x000800,
    Map =          0x001000,
    Set =          0x002000,
    WeakMap =      0x004000,
    WeakSet =      0x008000,
    Promise =      0x010000
}
const TypeFlag_All: number = TypeFlag.Undefined | TypeFlag.Boolean | TypeFlag.FiniteNumber | TypeFlag.String |
    TypeFlag.Symbol | TypeFlag.Function | TypeFlag.Object | TypeFlag.Null | TypeFlag.NaN |
    TypeFlag.Infinity | TypeFlag.Array | TypeFlag.Date | TypeFlag.Regexp | TypeFlag.Error |
    TypeFlag.Map | TypeFlag.Set | TypeFlag.WeakMap | TypeFlag.WeakSet | TypeFlag.Promise;
enum JsTypeExtFlag {
    Undefined = TypeFlag.Undefined,
    Boolean = TypeFlag.Boolean,
    FiniteNumber = TypeFlag.FiniteNumber,
    String = TypeFlag.String,
    Symbol = TypeFlag.Symbol,
    Function = TypeFlag.Function,
    Object = TypeFlag.Object,
    Null = TypeFlag.Null,
    NaN = TypeFlag.NaN,
    Infinity = TypeFlag.Infinity
}
const JsTypeExt_All: number = JsTypeExtFlag.Undefined | JsTypeExtFlag.Boolean | JsTypeExtFlag.FiniteNumber | JsTypeExtFlag.String | JsTypeExtFlag.Symbol |
    JsTypeExtFlag.Function | JsTypeExtFlag.Object | JsTypeExtFlag.Null | JsTypeExtFlag.NaN | JsTypeExtFlag.Infinity;
enum JsTypeFlag {
    Undefined = TypeFlag.Undefined,
    Boolean = TypeFlag.Boolean,
    Number = TypeFlag.FiniteNumber,
    String = TypeFlag.String,
    Symbol = TypeFlag.Symbol,
    Function = TypeFlag.Function,
    Object = TypeFlag.Object
}
const JsType_All: number = JsTypeFlag.Undefined | JsTypeFlag.Boolean | JsTypeFlag.Number | JsTypeFlag.String | JsTypeFlag.Symbol | JsTypeFlag.Function |
    JsTypeFlag.Object;
enum InterfaceFlag {
    ArrayLike = 0x01,
    Iterable = 0x02,
    ErrorLike = 0x04,
    PromiseLike = 0x08,
    HasLength = 0x10
}
abstract class BaseEnumBitFlags<T extends number, TCloneable extends BaseEnumBitFlags<T, TCloneable>> {
    private _flags: number;
    get flags(): number { return this._flags; }
    constructor(values?: T|(T|T[])[]|TCloneable, otherValues?: T|(T|T[])[]) {
        if (typeof(values) == "number")
            this._flags = values;
        else if (typeof(values) == "object" && values !== null) {
            if (Array.isArray(values))
                this._flags = values.reduce((p: number, a: T) => (Array.isArray(a)) ? a.reduce((n: number, v: T) => n | v, p) : p | a, 0);
            else
                this._flags = values.flags;
        }
        if (typeof(otherValues) == "number")
            this._flags |= otherValues;
        else if (typeof(otherValues) == "object" && otherValues !== null)
            this._flags = otherValues.reduce((p: number, a: T) => (Array.isArray(a)) ? a.reduce((n: number, v: T) => n | v, p) : p | a, 0);
    }
    isEmpty(): boolean { return this._flags == 0; }
    hasAnyFlag(value: T|T[], ...otherValues: (T|T[])[]) {
        if (typeof(value) == "number") {
            if ((this._flags & value) != 0)
                return true;
        } else
            for (let i: number = 0; i < value.length; i++) {
                if ((this._flags & value[i]) != 0)
                    return true;
            }
        if (typeof(otherValues) != "object" || otherValues === null || otherValues.length == 0)
            return false;
        for (let n: number = 0; n < otherValues.length; n++) {
            let v: T|T[] = otherValues[n];
            if (typeof(v) == "number") {
                if ((this._flags & v) != 0)
                    return true;
            } else
                for (let i: number = 0; i < v.length; i++) {
                    if ((this._flags & v[i]) != 0)
                        return true;
                }
        }

        return false;
    }
    hasAllFlags(value: T|T[], ...otherValues: (T|T[])[]) {
        if (typeof(value) == "number") {
            if ((this._flags & value) == 0)
                return false;
        } else
            for (let i: number = 0; i < value.length; i++) {
                if ((this._flags & value[i]) == 0)
                    return false;
            }
        if (typeof(otherValues) != "object" || otherValues === null || otherValues.length == 0)
            return true;
        for (let n: number = 0; n < otherValues.length; n++) {
            let v: T|T[] = otherValues[n];
            if (typeof(v) == "number") {
                if ((this._flags & v) == 0)
                    return false;
            } else
                for (let i: number = 0; i < v.length; i++) {
                    if ((this._flags & v[i]) == 0)
                        return false;
                }
        }

        return true;
    }
}

const testTypeSymbol: symbol = Symbol();

class EnumBitFlags<T extends number> extends BaseEnumBitFlags<T, EnumBitFlags<T>> {
    constructor(values?: T|T[]|EnumBitFlags<T>, ...otherValues: (T|T[])[]) { super(values, otherValues); }
}
class InterfaceBitFlags extends BaseEnumBitFlags<InterfaceFlag, InterfaceBitFlags> {
    get ArrayLike() { return this.hasAnyFlag(InterfaceFlag.ArrayLike); }
    get Iterable() { return this.hasAnyFlag(InterfaceFlag.Iterable); }
    get ErrorLike() { return this.hasAnyFlag(InterfaceFlag.ErrorLike); }
    get PromiseLike() { return this.hasAnyFlag(InterfaceFlag.PromiseLike); }
    get HasLength() { return this.hasAnyFlag(InterfaceFlag.HasLength); }
    constructor(values?: InterfaceFlag|(InterfaceFlag|InterfaceFlag[])[]|InterfaceBitFlags, ...otherValues: (InterfaceFlag|InterfaceFlag[])[]) { super(values, otherValues); }
}
enum ValueVariant {
    None = 0x0001,
    Empty = 0x0002,
    Whitespace = 0x0004,
    Zero = 0x0008,
    Float = 0x0010,
    PlainObject = 0x0020,
    DirectInheritance = 0x0040,
    NestedInheritance = 0x0080
}
class VariantBitFlags extends BaseEnumBitFlags<ValueVariant, VariantBitFlags> {
    get Zero() { return this.hasAnyFlag(ValueVariant.Zero); }
    get Whitespace() { return this.hasAnyFlag(ValueVariant.Whitespace); }
    get None() { return this.hasAnyFlag(ValueVariant.None); }
    get NestedInheritance() { return this.hasAnyFlag(ValueVariant.NestedInheritance); }
    get Float() { return this.hasAnyFlag(ValueVariant.Float); }
    get Empty() { return this.hasAnyFlag(ValueVariant.Empty); }
    get DirectInheritance() { return this.hasAnyFlag(ValueVariant.DirectInheritance); }
    constructor(values?: ValueVariant|(ValueVariant|ValueVariant[])[]|VariantBitFlags, ...otherValues: (ValueVariant|ValueVariant[])[]) { super(values, otherValues); }
}
class JsType {
    private _jsType: JsTypeFlag;
    private _baseType: JsTypeExtFlag;
    private _type: TypeFlag;

    static isJsType(obj: any): obj is JsType { return typeof(obj) == "object" && obj !== null && obj[testTypeSymbol] == "JsType"; }
    [testTypeSymbol]() { "JsType" }
    get baseType(): JsTypeExtFlag { return this._baseType; }
    get jsType(): JsTypeFlag { return this._jsType; }
    get type(): TypeFlag { return this._type; }

    constructor(value: TypeFlag) {
        switch(value) {
            case TypeFlag.Undefined:
                this._jsType = JsTypeFlag.Undefined;
                this._baseType = JsTypeExtFlag.Undefined;
                break;
            case TypeFlag.Boolean:
                this._jsType = JsTypeFlag.Boolean;
                this._baseType = JsTypeExtFlag.Boolean;
                break;
            case TypeFlag.FiniteNumber:
                this._jsType = JsTypeFlag.Number;
                this._baseType = JsTypeExtFlag.FiniteNumber;
                break;
            case TypeFlag.String:
                this._jsType = JsTypeFlag.String;
                this._baseType = JsTypeExtFlag.String;
                break;
            case TypeFlag.Symbol:
                this._jsType = JsTypeFlag.Symbol;
                this._baseType = JsTypeExtFlag.Symbol;
                break;
            case TypeFlag.Function:
                this._jsType = JsTypeFlag.Function;
                this._baseType = JsTypeExtFlag.Function;
                break;
            case TypeFlag.Object:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Null:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Null;
                break;
            case TypeFlag.NaN:
                this._jsType = JsTypeFlag.Number;
                this._baseType = JsTypeExtFlag.NaN;
                break;
            case TypeFlag.Infinity:
                this._jsType = JsTypeFlag.Number;
                this._baseType = JsTypeExtFlag.Infinity;
                break;
            case TypeFlag.Array:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Date:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Regexp:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Error:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Map:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Set:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.WeakMap:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.WeakSet:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            case TypeFlag.Promise:
                this._jsType = JsTypeFlag.Object;
                this._baseType = JsTypeExtFlag.Object;
                break;
            default:
                throw new Error(value + " is an invalid builtin root type");
        }
    }
}
interface IJsType {
    type: TypeFlag|JsType;
    variant?: ValueVariant;
    implementation?: InterfaceBitFlags|InterfaceFlag|InterfaceFlag[];
}
class JsTypeVariant extends JsType implements IJsType {
    private _variant: ValueVariant;
    private _implementation: InterfaceBitFlags;

    static isJsTypeVariant(obj: any): obj is JsTypeVariant { return typeof(obj) == "object" && obj !== null && obj[testTypeSymbol] == "JsTypeVariant"; }
    [testTypeSymbol]() { "JsTypeVariant" }
    get variant(): ValueVariant { return this._variant; }
    get implementation(): InterfaceBitFlags { return this._implementation; }

    constructor(value: TypeFlag|JsType, variant?: ValueVariant, ...implementation: (InterfaceFlag|InterfaceFlag[])[]) {
        super((typeof(value) == "number") ? value : value.type);
        let bitFlags: InterfaceBitFlags = new InterfaceBitFlags(implementation);
        if (typeof(variant) != "number")
            variant = ValueVariant.None;
        switch(this.type) {
            case TypeFlag.Undefined:
                if (!bitFlags.isEmpty())
                    throw new Error("Undefined types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Undefined types cannot have a variant");
                break;
            case TypeFlag.Boolean:
                if (!bitFlags.isEmpty())
                    throw new Error("Boolean types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Boolean types cannot have a variant");
                break;
            case TypeFlag.FiniteNumber:
                if (!bitFlags.isEmpty())
                    throw new Error("Number types cannot have interfaces");
                if (variant == ValueVariant.Empty || variant == ValueVariant.Whitespace)
                    throw new Error("Number types cannot be empty or whitespace");
                if (variant == ValueVariant.DirectInheritance || variant == ValueVariant.NestedInheritance)
                    throw new Error("Number types inherit from objects");
                break;
            case TypeFlag.String:
                if (!bitFlags.isEmpty())
                    throw new Error("String types cannot have interfaces");
                if (variant == ValueVariant.Float || variant == ValueVariant.Zero)
                    throw new Error("String types cannot be float or zero");
                if (variant == ValueVariant.DirectInheritance || variant == ValueVariant.NestedInheritance)
                    throw new Error("String types inherit from objects");
                break;
            case TypeFlag.Symbol:
                if (!bitFlags.isEmpty())
                    throw new Error("Symbol types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Symbol types cannot have a variant");
                break;
            case TypeFlag.Function:
                if (!bitFlags.isEmpty())
                    throw new Error("Function types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Function types cannot have a variant");
                break;
            case TypeFlag.Object:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                break;
            case TypeFlag.Null:
                if (!bitFlags.isEmpty())
                    throw new Error("Null types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Null types cannot have a variant");
                break;
            case TypeFlag.NaN:
                if (!bitFlags.isEmpty())
                    throw new Error("Number types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("NaN types cannot have a variant");
                break;
            case TypeFlag.Infinity:
                if (!bitFlags.isEmpty())
                    throw new Error("Number types cannot have interfaces");
                if (variant != ValueVariant.None)
                    throw new Error("Infinity types cannot have a variant");
                break;
            case TypeFlag.Array:
                if (variant != ValueVariant.None && variant != ValueVariant.Empty)
                    throw new Error("Arrays can only have None or Empty variant");
                if (!bitFlags.ArrayLike)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.ArrayLike, InterfaceFlag.Iterable);
                else if (!bitFlags.Iterable)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.Iterable);
                break;
            case TypeFlag.Date:
                if (variant != ValueVariant.None)
                    throw new Error("Infinity types cannot have a variant");
                break;
            case TypeFlag.Regexp:
                if (variant != ValueVariant.None)
                    throw new Error("Infinity types cannot have a variant");
                break;
            case TypeFlag.Error:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                if (!bitFlags.ErrorLike)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.ErrorLike);
                break;
            case TypeFlag.Map:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                if (!bitFlags.Iterable)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.Iterable);
                break;
            case TypeFlag.Set:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                if (!bitFlags.Iterable)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.Iterable);
                break;
            case TypeFlag.WeakMap:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                if (!bitFlags.Iterable)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.Iterable);
                break;
            case TypeFlag.WeakSet:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                if (!bitFlags.Iterable)
                    bitFlags = new InterfaceBitFlags(bitFlags, InterfaceFlag.Iterable);
                break;
            case TypeFlag.Promise:
                if (variant == ValueVariant.Empty || variant == ValueVariant.Float || variant == ValueVariant.Whitespace || variant == ValueVariant.Zero)
                    throw new Error("Invalid object variant");
                break;
        }
        this._implementation = bitFlags;
    }
    asJsTypeVariant(type: JsTypeSpec): JsTypeVariant {
        if (typeof(type) == "number" || JsType.isJsType(type))
            return new JsTypeVariant(type);
        if (JsTypeVariant.isJsTypeVariant(type))
            return type;
        if (typeof(type.implementation) == "object") {
            if (!Array.isArray(type.implementation)) {
                let result: JsTypeVariant = new JsTypeVariant(type.type, type.variant);
                result._implementation = this.implementation;
                return result;
            }
        } else if (typeof(type.implementation) != "number")
            return new JsTypeVariant(type.type, type.variant);
        return new JsTypeVariant(type.type, type.variant, type.implementation);
    }
}
type JsTypeSpec = TypeFlag|JsTypeVariant|JsType|IJsType;
class AllowedVariants {
    private _type: JsType;
    private _variants: VariantBitFlags;
    private _implementation: InterfaceBitFlags;
    static isAllowedVariants(obj: any): obj is AllowedVariants { return typeof(obj) == "object" && obj !== null && obj[testTypeSymbol] == "AllowedVariants"; }
    [testTypeSymbol]() { "AllowedTypes" }
    constructor(type: TypeFlag|JsType, implementation?: InterfaceBitFlags|InterfaceFlag|InterfaceFlag[], ...variant: (ValueVariant|ValueVariant[])[]) {
        this._variants = new VariantBitFlags(variant);
        this._implementation = new InterfaceBitFlags(implementation);
        this._type = (typeof(type) == "number") ? new JsType(type) : type;
    }
    asAllowedVariants(variants: AllowedVariantsSpec): AllowedVariants {
        if (typeof(variants) == "number" || JsType.isJsType(variants))
            return new AllowedVariants(variants);
        if (AllowedVariants.isAllowedVariants(variants))
            return variants;
        return new AllowedVariants(variants.type, variants.implementation, variants.variant);
    }
}
type AllowedVariantsSpec = TypeFlag|JsType|IJsType|AllowedVariants;
class AllowedTypes {
    static isAllowedTypes(obj: any): obj is AllowedTypes { return typeof(obj) == "object" && obj !== null && obj[testTypeSymbol] == "AllowedTypes"; }
    [testTypeSymbol]() { "AllowedTypes" }
    constructor(type: JsTypeSpec|JsTypeSpec[], ...types: (JsTypeSpec|JsTypeSpec[])[]) {

    }
    isAllowed(value: JsTypeSpec) {

    }
    static toAllowedTypes(types: AllowedTypeSpec): AllowedTypes {
        if (typeof(types) == "number" || Array.isArray(types))
            return new AllowedTypes(types);
        if (AllowedTypes.isAllowedTypes(types))
            return types;
        if (JsType.isJsType(types) || JsTypeVariant.isJsTypeVariant(types) || JsType.isJsType(types))
        return new AllowedTypes(types);
        types;
    }
}
type AllowedTypeSpec = AllowedTypes|JsTypeSpec|JsTypeSpec[]|{ type: TypeFlag; variant: ValueVariant|ValueVariant[];
    implementation?: InterfaceBitFlags|InterfaceFlag|InterfaceFlag[]; }

interface GenericArgumentDescriptor extends Descriptor { getValue?: { (): any; } }

interface TypeGuardTestArgument {
    value?: ArgumentDescriptor;
    type: JsTypeSpec;
}
interface TypeGuardFunction {
    name: string;
    callback: Function;
    allowed: AllowedTypeSpec;
    genericType?: GenericArgumentDescriptor|GenericArgumentDescriptor[];
}
interface TypeGuardTargetType {
    description: string;
    functions: TypeGuardFunction[];
}

class ExampleBaseClass {
    get (key: string): number { return parseInt(key); }
}
class ExampleChildClass extends ExampleBaseClass {
    length: string = "0";
}
class ExampleNestedClass extends ExampleChildClass {
    count: number = 0;
}

describe("Testing type guard functions", function() {
    let typeGuardTestArgumentArr: TypeGuardTestArgument[] = [
        { type: TypeFlag.Undefined },
        { type: TypeFlag.Undefined, value: { display: 'undefined', getValue: () => undefined } },
        { type: TypeFlag.Null, value: { display: 'null', getValue: () => null } },
        { type: { type: TypeFlag.String, variant: ValueVariant.Empty }, value: { display: '""', getValue: () => "" } },
        { type: { type: TypeFlag.String, variant: ValueVariant.Whitespace }, value: { display: '" "', getValue: () => " " } },
        { type: { type: TypeFlag.String, variant: ValueVariant.Whitespace }, value: { display: '"\\n\\r\\t"', getValue: () => "\n\r\t" } },
        { type: TypeFlag.String, value: { display: '"."', getValue: () => "" } },
        { type: TypeFlag.String, value: { display: '" . "', getValue: () => " . " } },
        { type: TypeFlag.String, value: { display: '"\\n\\r . \\t"', getValue: () => "\n\r . \t" } },
        { type: TypeFlag.Boolean, value: { display: 'true', getValue: () => true } },
        { type: TypeFlag.Boolean, value: { display: 'false', getValue: () => false } },
        { type: TypeFlag.FiniteNumber, value: { display: '1', getValue: () => 1 } },
        { type: TypeFlag.FiniteNumber, value: { display: '123', getValue: () => 123 } },
        { type: TypeFlag.FiniteNumber, value: { display: '-1', getValue: () => -1 } },
        { type: { type: TypeFlag.FiniteNumber, variant: ValueVariant.Zero }, value: { display: '0', getValue: () => 0 } },
        { type: { type: TypeFlag.FiniteNumber, variant: ValueVariant.Float }, value: { display: '0.0001', getValue: () => 0.0001 } },
        { type: TypeFlag.NaN, value: { display: 'NaN', getValue: () => NaN } },
        { type: TypeFlag.Infinity, value: { display: 'Infinity', getValue: () => Infinity } },
        { type: TypeFlag.Function, value: { display: 'function() { return false };', getValue: () => { return function() { return false }; } } },
        { type: TypeFlag.Object, value: { display: '{ }', getValue: () => { return { }; } } },
        { type: { type: TypeFlag.Object, implementation: InterfaceFlag.HasLength }, value: { display: '{ length: 1 }', getValue: () => { return { length: 1 }; } } },
        { type: { type: TypeFlag.Object, implementation: InterfaceFlag.HasLength }, value: { display: '{ length: 2, [0]: "1", [2]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[2] = "2" } } },
        { type: { type: TypeFlag.Object, implementation: InterfaceFlag.ArrayLike }, value: { display: '{ length: 0 }', getValue: () => { return { length: 1 }; } } },
        { type: { type: TypeFlag.Object, implementation: InterfaceFlag.ArrayLike }, value: { display: '{ length: 2, [0]: "1", [1]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[1] = "2" } } },
        { type: { type: TypeFlag.Array, variant: ValueVariant.Empty }, value: { display: '[]', getValue: () => [] } },
        { type: TypeFlag.Array, value: { display: '[undefined]', getValue: () => [undefined] } },
        { type: { type: TypeFlag.Error }, value: { display: '[undefined]', getValue: () => {
            try { throw new Error("Thrown for test"); }
            catch (e) { return e; }
        } } },
        { type: { type: TypeFlag.Error, variant: ValueVariant.DirectInheritance }, value: { display: '[undefined]', getValue: () => {
            try { throw new RangeError("Out of range for a test"); }
            catch (e) { return e; }
        } } },
        { type: { type: TypeFlag.Object }, value: { display: 'new ExampleBaseClass()', getValue: () => new ExampleBaseClass() } },
        { type: { type: TypeFlag.Object, variant: ValueVariant.DirectInheritance }, value: { display: 'new ExampleChildClass()', getValue: () => new ExampleChildClass() } },
        { type: { type: TypeFlag.Object, variant: ValueVariant.NestedInheritance }, value: { display: 'new ExampleNestedClass()', getValue: () => new ExampleNestedClass() } }
    ];
    let typeGuardTargetTypeArr: TypeGuardTargetType[] = [
        {
            description: 'Testing nil type guard functions',
            functions: [
                { name: 'notDefined', callback: JsTypeCommander.notDefined, allowed: TypeFlag.Undefined },
                { name: 'isNull', callback: JsTypeCommander.isNull, allowed: TypeFlag.Null },
                { name: 'isNil', callback: JsTypeCommander.isNil, allowed: [TypeFlag.Undefined, TypeFlag.Null] }
            ]
        }, {
            description: 'Testing string type guard functions',
            functions: [
                { name: 'notDefined', callback: JsTypeCommander.notDefined, allowed: TypeFlag.Undefined },
                { name: 'isNull', callback: JsTypeCommander.isNull, allowed: TypeFlag.Null },
                { name: 'isNil', callback: JsTypeCommander.isNil, allowed: [TypeFlag.Undefined, TypeFlag.Null] }
            ]
        }, {
            description: 'Testing string type guard functions',
            functions: [
                { name: 'isString', callback: JsTypeCommander.isString, allowed: TypeFlag.String },
                { name: 'isStringIfDef', callback: JsTypeCommander.isStringIfDef, allowed: [TypeFlag.String, TypeFlag.Undefined] },
                { name: 'isStringOrNull', callback: JsTypeCommander.isStringOrNull, allowed: [TypeFlag.String, TypeFlag.Null] },
                { name: 'isStringOrNil', callback: JsTypeCommander.isStringOrNil, allowed: [TypeFlag.String, TypeFlag.Null, TypeFlag.Undefined] }
            ]
        }, {
            description: 'Testing empty string type guard functions',
            functions: [
                { name: 'isEmptyString', callback: JsTypeCommander.isEmptyString, allowed: { type: TypeFlag.String, variant: ValueVariant.Empty } },
                { name: 'isEmptyStringIfDef', callback: JsTypeCommander.isEmptyStringIfDef, allowed: [ TypeFlag.Undefined, { type: TypeFlag.String, variant: ValueVariant.Empty }] },
                { name: 'isEmptyStringOrNull', callback: JsTypeCommander.isEmptyStringOrNull, allowed: [ TypeFlag.Null, { type: TypeFlag.String, variant: ValueVariant.Empty }] },
                { name: 'isEmptyStringOrNil', callback: JsTypeCommander.isEmptyStringOrNil, allowed: [ TypeFlag.Undefined, TypeFlag.Null, { type: TypeFlag.String, variant: ValueVariant.Empty }] },
                { name: 'isEmptyOrWhitespace', callback: JsTypeCommander.isEmptyOrWhitespace, allowed: { type: TypeFlag.String, variant: [ ValueVariant.Empty, ValueVariant.Whitespace ] } },
                { name: 'isEmptyOrWhitespaceIfDef', callback: JsTypeCommander.isEmptyOrWhitespaceIfDef, allowed: [ TypeFlag.Undefined, { type: TypeFlag.String, variant: [ ValueVariant.Empty, ValueVariant.Whitespace ] }] },
                { name: 'isNullOrWhitespace', callback: JsTypeCommander.isNullOrWhitespace, allowed: [ TypeFlag.Null, { type: TypeFlag.String, variant: [ ValueVariant.Empty, ValueVariant.Whitespace ] }] },
                { name: 'isNilOrWhitespace', callback: JsTypeCommander.isNilOrWhitespace, allowed: [ TypeFlag.Undefined, TypeFlag.Null, { type: TypeFlag.String, variant: [ ValueVariant.Empty, ValueVariant.Whitespace ] }] }
            ]
        }, {
            description: 'Testing boolean type guard functions',
            functions: [
                { name: 'isBoolean', callback: JsTypeCommander.isBoolean, allowed: TypeFlag.Boolean },
                { name: 'isBooleanIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: [ TypeFlag.Undefined, TypeFlag.Boolean ] },
                { name: 'isBooleanOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: [ TypeFlag.Null, TypeFlag.Boolean ] },
                { name: 'isBooleanOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: [ TypeFlag.Undefined, TypeFlag.Null, TypeFlag.Boolean ] }
            ]
        }, {
            description: 'Testing number type guard functions',
            functions: [
                { name: 'isNumber', callback: JsTypeCommander.isNumber, allowed: TypeFlag.FiniteNumber },
                { name: 'isNumberIfDef', callback: JsTypeCommander.isNumberIfDef, allowed: [ TypeFlag.Undefined, TypeFlag.FiniteNumber ] },
                { name: 'isNumberOrNull', callback: JsTypeCommander.isNumberOrNull, allowed: [ TypeFlag.Null, TypeFlag.FiniteNumber ] },
                { name: 'isNumberNaNorNull', callback: JsTypeCommander.isNumberOrNull, allowed: [ TypeFlag.NaN, TypeFlag.Null, TypeFlag.FiniteNumber ] },
                { name: 'isNumberOrNil', callback: JsTypeCommander.isNumberOrNil, allowed: [ TypeFlag.Undefined, TypeFlag.Null, TypeFlag.FiniteNumber ] },
                { name: 'isInfinite', callback: JsTypeCommander.isInfinite, allowed: TypeFlag.Infinity }
            ]
        }, {
            description: 'Testing function type guard functions',
            functions: [
                { name: 'isFunction', callback: JsTypeCommander.isBoolean, allowed: TypeFlag.Function },
                { name: 'isFunctionIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: [ TypeFlag.Undefined, TypeFlag.Function ] },
                { name: 'isFunctionOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: [ TypeFlag.Null, TypeFlag.Function ] },
                { name: 'isFunctionOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: [ TypeFlag.Undefined, TypeFlag.Null, TypeFlag.Function ] },
            ]
        }, {
            description: 'Testing object type guard functions',
            functions: [
                { name: 'isObject', callback: JsTypeCommander.isObject, allowed: [ TypeFlag.Object, TypeFlag.Array, TypeFlag.Date, TypeFlag.Error, TypeFlag.Map, TypeFlag.Promise, TypeFlag.Regexp, TypeFlag.Set, TypeFlag.WeakMap, TypeFlag.WeakSet ] },
                { name: 'isPlainObject', callback: JsTypeCommander.isPlainObject, allowed: { type: TypeFlag.Object, variant: ValueVariant.PlainObject } },
                { name: 'isObjectType', callback: JsTypeCommander.isObjectType, allowed: [ TypeFlag.Object, TypeFlag.Array, TypeFlag.Date, TypeFlag.Error, TypeFlag.Map, TypeFlag.Promise, TypeFlag.Regexp, TypeFlag.Set, TypeFlag.WeakMap, TypeFlag.WeakSet ] },
                { name: 'isNonArrayObject', callback: JsTypeCommander.isNonArrayObject, allowed: [
                    {

                        types: ["plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArray', callback: JsTypeCommander.isArray, allowed: ["Array", "emptyArray"] },
                { name: 'isEmptyArray', callback: JsTypeCommander.isEmptyArray, allowed: "emptyArray" },
                { name: 'isArrayLike', callback: JsTypeCommander.isArrayLike, allowed: [
                    {
                        types: ["almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectIfDef', callback: JsTypeCommander.isObjectIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectIfDef', callback: JsTypeCommander.isPlainObjectIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeIfDef', callback: JsTypeCommander.isObjectTypeIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectIfDef', callback: JsTypeCommander.isNonArrayObjectIfDef, allowed: [
                    {
                        types: ["undefined", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArrayIfDef', callback: JsTypeCommander.isArrayIfDef, allowed: ["undefined", "Array", "emptyArray"] },
                { name: 'isEmptyArrayIfDef', callback: JsTypeCommander.isEmptyArrayIfDef, allowed: ["undefined", "emptyArray"] },
                { name: 'isArrayLikeIfDef', callback: JsTypeCommander.isArrayLikeIfDef, allowed: [
                    {
                        types: ["undefined", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectOrNull', callback: JsTypeCommander.isObjectOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectOrNull', callback: JsTypeCommander.isPlainObjectOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeOrNull', callback: JsTypeCommander.isObjectTypeOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectOrNull', callback: JsTypeCommander.isNonArrayObjectOrNull, allowed: [
                    {
                        types: ["null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["null", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArrayOrNull', callback: JsTypeCommander.isArrayOrNull, allowed: ["null", "Array", "emptyArray"] },
                { name: 'isEmptyArrayOrNull', callback: JsTypeCommander.isEmptyArrayOrNull, allowed: ["null", "emptyArray"] },
                { name: 'isArrayLikeOrNull', callback: JsTypeCommander.isArrayLikeOrNull, allowed: [
                    {
                        types: ["null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["null", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectOrNil', callback: JsTypeCommander.isObjectOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectOrNil', callback: JsTypeCommander.isPlainObjectOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeOrNil', callback: JsTypeCommander.isObjectTypeOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectOrNil', callback: JsTypeCommander.isNonArrayObjectOrNil, allowed: [
                    {
                        types: ["undefined", "null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                 ] },
                 { name: 'isArrayOrNil', callback: JsTypeCommander.isArrayOrNil, allowed: ["undefined", "null", "Array", "emptyArray"] },
                 { name: 'isEmptyArrayOrNil', callback: JsTypeCommander.isEmptyArrayOrNil, allowed: ["undefined", "null", "emptyArray"] },
                 { name: 'isArrayLikeOrNil', callback: JsTypeCommander.isArrayLikeOrNil, allowed: [
                     {
                         types: ["undefined", "null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                     }, {
                         arg: { display: 'true', getValue: () => true },
                         types: ["undefined", "null", "ArrayLike", "Array", "emptyArray"]
                     }, {
                         arg: { display: 'false', getValue: () => false },
                         types: ["undefined", "null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                     }
                  ] }
            ]
        }, {
            description: 'Testing derrivation type guard functions',
            functions: [
                {
                    name: 'derivesFrom', callback: JsTypeCommander.derivesFrom, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromIfDef', callback: JsTypeCommander.derivesFromIfDef, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["undefined", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["undefined", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["undefined", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["undefined", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["undefined", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromOrNull', callback: JsTypeCommander.derivesFromOrNull, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["null", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["null", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["null", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["null", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["null", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromOrNil', callback: JsTypeCommander.derivesFromOrNil, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["undefined", "null", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["undefined", "null", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["undefined", "null", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["undefined", "null", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["undefined", "null", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'isErrorLike', callback: JsTypeCommander.isErrorLike, allowed: ["Error", "RangeError", "errorLike"]
                }
            ]
        }
    ];
    typeGuardTargetTypeArr.forEach(targetType => {
        describe(targetType.description, function() {
            targetType.functions.forEach(typeGuardFunction => {
                describe('Testing ' + typeGuardFunction.name + ' function', function() {
                    let allowSetArr: { isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[];
                    if (typeof(typeGuardFunction.allowed) == "string")
                        allowSetArr = [{ types: [typeGuardFunction.allowed] }];
                    else
                        allowSetArr = <{ isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[]>typeGuardFunction.allowed.map(a => (typeof(a) == "string") ? { types: [a] } : ((Array.isArray(a)) ? { types: a } : a));
                    allowSetArr.forEach(allowSet => {
                        typeGuardTestArgumentArr.forEach(tga => {
                            let args = [];
                            let description: string = typeGuardFunction.name;
                            if (typeof(tga.value) == "undefined") {
                                if (typeof(allowSet.arg) != "undefined")
                                    return;
                                description += "(";
                            } else {
                                args.push(tga.value.getValue());
                                if (typeof(allowSet.arg) != "undefined") {
                                    if (allowSet.isGeneric)
                                        description += "<" + allowSet.arg.display + ">(" + tga.value.display;
                                    else
                                        description += "(" + tga.value.display + ", " + allowSet.arg.display;
                                    args.push(allowSet.arg.getValue());
                                }
                                else
                                    description += "(" + tga.value.display;
                            }
                            let expected: boolean = allowSet.types.filter(t => t == tga.type).length > 0;
                            it(description + ") should return " + expected, function() {
                                let result: JsTypeCommander.AnyNilable = typeGuardFunction.callback.apply(this, args);
                                expect(result).to.a('boolean');
                                expect(result).to.equal(expected);
                                });
                        }, this);
                    }, this);
                });
            }, this);
        });
    }, this);
});

interface TypeConversionTargetType {

}
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