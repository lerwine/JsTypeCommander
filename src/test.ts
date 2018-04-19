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
interface MapByTypeOptions { omit?: MapCallbackName[]|MapCallbackName; checkElements?: boolean; expected: MapCallbackId }
interface MapByTypeTest {
    arg: ArgumentDescriptor[]|ArgumentDescriptor;
    opt: MapByTypeOptions[]|MapByTypeOptions;
}
interface MapByTypeDefinition {
    type: string;
    test: MapByTypeTest[]|MapByTypeTest
}
interface MapByNilArguments extends ArgumentDescriptor {
    type: "notNil"|"null"|"undefined";
}
class MapByTypeHelper implements JsTypeCommander.TypeGuardResultSpecs<JsTypeCommander.TAnythingAtAll, MapCallbackId> {
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
    private _whenBoolean(value: boolean): MapCallbackId { return this._onInvoked(MapCallbackId.whenBoolean, value); }
    private _whenFunction(value: Function): MapCallbackId { return this._onInvoked(MapCallbackId.whenFunction, value); }
    private _whenInfinity(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenInfinity, value); }
    private _whenNaN(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNaN, value); }
    private _whenNumber(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNumber, value); }
    private _whenArray(value: JsTypeCommander.TAnythingAtAll[]): MapCallbackId { return this._onInvoked(MapCallbackId.whenArray, value); }
    private _whenArrayLike(value: ArrayLike<JsTypeCommander.TAnythingAtAll>): MapCallbackId { return this._onInvoked(MapCallbackId.whenArrayLike, value); }
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
    get lastArg(): JsTypeCommander.TAnythingAtAll { return this._lastArg; }
    get thisObj(): MapByTypeHelper { return this; }
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
    otherwise(value: JsTypeCommander.TAnythingAtAll): MapCallbackId { return this._onInvoked(MapCallbackId.otherwise, value); }
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
    private _lastArg: JsTypeCommander.TAnythingAtAll = undefined;
    private _trueNum: number;
    private _otherwiseNum: number;
    get whenTrueInvoked(): boolean { return this._whenTrueInvoked; }
    get otherwiseInvoked(): boolean { return this._otherwiseInvoked; }
    get callCount(): number { return this._callCount; }
    get trueNum(): number { return this._trueNum; }
    get otherwiseNum(): number { return this._otherwiseNum; }
    whenTrue(arg: JsTypeCommander.TAnythingAtAll): number {
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
        let mapByTypeValueTestDefintions: MapByTypeDefinition[] = [
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
        mapByTypeValueTestDefintions.forEach(testData => {
            describe('Testing ' + testData.type + " values", function() {
                let tests: MapByTypeTest[] = (Array.isArray(testData.test)) ? testData.test : [testData.test];
                tests.forEach(grp => {
                    let args: ArgumentDescriptor[] = (Array.isArray(grp.arg)) ? grp.arg : [grp.arg];
                    let opts: MapByTypeOptions[] = (Array.isArray(grp.opt)) ? grp.opt : [grp.opt];
                    opts.forEach(o => {
                        let omit: MapCallbackName[] = (typeof(o.omit) == "undefined") ? [] : ((typeof(o.omit) == "string") ? [o.omit] : o.omit);
                        args.forEach(a => {
                            let tgh: MapByTypeHelper = new MapByTypeHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + a.display + ', ' + JSON.stringify(tgh.toJSON()) + ((typeof(o.checkElements) == "boolean") ? ", " + o.checkElements : "") + ') should return ' + o.expected +
                                    " (calling " + mapCallbackIdToName(o.expected) + ")", function() {
                                let result: JsTypeCommander.TAnythingAtAll = (typeof(o.checkElements) == "boolean") ? JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh, o.checkElements) :
                                    JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh);
                                dataIterationIndex++;
                                expect(result).to.a("number", "at dataIterationIndex " + dataIterationIndex);
                                expect(result).to.equal(o.expected, mapCallbackIdToName(result) + " called, insteaat dataIterationIndex " + dataIterationIndex);
                            });
                        }, this);
                    }, this);
                }, this);
            });
        }, this);
    });

    let functionDefinitions: {
        name: string,
        callback: Function,
        allowUndefined: boolean,
        allowNull: boolean
    }[] = [
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
    functionDefinitions.forEach(fd => {
        describe("Testing " + fd.name + " function", function() {
            mapByNilArguments.forEach(a => {
                let whenTrue: boolean = (a.type == "notNil" || ((a.type == "null") ? fd.allowNull : fd.allowUndefined));
                let mapByNilHelper: MapByNilHelper = new MapByNilHelper();
                let expected: number = (whenTrue) ? mapByNilHelper.trueNum : mapByNilHelper.otherwiseNum;
                it(fd.name + "(" + a.display + ", fn(v) => " + mapByNilHelper.trueNum + ', fn' + ((fd.name == "mapByNotNil") ? '(v)' : '()') + ' => ' + mapByNilHelper.otherwiseNum +
                        ') should return ' + expected + ' (' + ((whenTrue) ? 'whenTrue' : 'otherwise') + ')', function() {
                    let result: JsTypeCommander.TAnythingAtAll = fd.callback(a.getValue(), mapByNilHelper.whenTrue, mapByNilHelper.otherwise, mapByNilHelper);
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

type typeSpec = "undefined"|"null"|"emptyString"|"whitespace"|"nonWhitespace"|"boolean"|"zero"|"nonZero"|"float"|"NaN"|"Infinity"|"function"|"plainObject"|"almostArrayLike"|"ArrayLike"|"Array"|"emptyArray"|
    "errorLike"|"Error"|"RangeError"|"ParentClass"|"InheritedClass"|"DeepInheritedClass"
interface TypeGuardTestArgument {
    value?: ArgumentDescriptor;
    type: typeSpec;
}
interface TypeGuardMethodGroup {
    description: string;
    methods: TypeGuardMethodDefinition[];
}
interface TypeGuardMethodDefinition {
    name: string;
    callback: Function;
    allowed: (typeSpec|{
        isGeneric?: boolean;
        types: typeSpec[]|typeSpec;
        arg?: ArgumentDescriptor;
    })[]|typeSpec;
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
        { type: 'undefined' },
        { type: 'undefined', value: { display: 'undefined', getValue: () => undefined } },
        { type: 'null', value: { display: 'null', getValue: () => null } },
        { type: 'emptyString', value: { display: '""', getValue: () => "" } },
        { type: 'whitespace', value: { display: '" "', getValue: () => " " } },
        { type: 'whitespace', value: { display: '"\\n\\r\\t"', getValue: () => "\n\r\t" } },
        { type: 'nonWhitespace', value: { display: '"."', getValue: () => "" } },
        { type: 'nonWhitespace', value: { display: '" . "', getValue: () => " . " } },
        { type: 'nonWhitespace', value: { display: '"\\n\\r . \\t"', getValue: () => "\n\r . \t" } },
        { type: 'boolean', value: { display: 'true', getValue: () => true } },
        { type: 'boolean', value: { display: 'false', getValue: () => false } },
        { type: 'nonZero', value: { display: '1', getValue: () => 1 } },
        { type: 'nonZero', value: { display: '123', getValue: () => 123 } },
        { type: 'nonZero', value: { display: '-1', getValue: () => -1 } },
        { type: 'zero', value: { display: '0', getValue: () => 0 } },
        { type: 'float', value: { display: '0.0001', getValue: () => 0.0001 } },
        { type: 'NaN', value: { display: 'NaN', getValue: () => NaN } },
        { type: 'Infinity', value: { display: 'Infinity', getValue: () => Infinity } },
        { type: 'function', value: { display: 'function() { return false };', getValue: () => { return function() { return false }; } } },
        { type: 'plainObject', value: { display: '{ }', getValue: () => { return { }; } } },
        { type: 'almostArrayLike', value: { display: '{ length: 1 }', getValue: () => { return { length: 1 }; } } },
        { type: 'almostArrayLike', value: { display: '{ length: 2, [0]: "1", [2]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[2] = "2" } } },
        { type: 'ArrayLike', value: { display: '{ length: 0 }', getValue: () => { return { length: 1 }; } } },
        { type: 'ArrayLike', value: { display: '{ length: 2, [0]: "1", [1]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[1] = "2" } } },
        { type: 'emptyArray', value: { display: '[]', getValue: () => [] } },
        { type: 'Array', value: { display: '[undefined]', getValue: () => [undefined] } },
        { type: 'Error', value: { display: '[undefined]', getValue: () => {
            try { throw new Error("Thrown for test"); }
            catch (e) { return e; }
        } } },
        { type: 'RangeError', value: { display: '[undefined]', getValue: () => {
            try { throw new RangeError("Out of range for a test"); }
            catch (e) { return e; }
        } } },
        { type: 'ParentClass', value: { display: 'new ExampleBaseClass()', getValue: () => new ExampleBaseClass() } },
        { type: 'InheritedClass', value: { display: 'new ExampleChildClass()', getValue: () => new ExampleChildClass() } },
        { type: 'DeepInheritedClass', value: { display: 'new ExampleNestedClass()', getValue: () => new ExampleNestedClass() } }
    ];
    let typeGuardMethodGroupArr: TypeGuardMethodGroup[] = [
        {
            description: 'Testing nil type guard functions',
            methods: [
                { name: 'notDefined', callback: JsTypeCommander.notDefined, allowed: "undefined" },
                { name: 'isNull', callback: JsTypeCommander.isNull, allowed: "null" },
                { name: 'isNil', callback: JsTypeCommander.isNil, allowed: ["undefined", "null"] }
            ]
        }, {
            description: 'Testing string type guard functions',
            methods: [
                { name: 'isString', callback: JsTypeCommander.isString, allowed: ["emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringIfDef', callback: JsTypeCommander.isStringIfDef, allowed: ["undefined", "emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringOrNull', callback: JsTypeCommander.isStringOrNull, allowed: ["null", "emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringOrNil', callback: JsTypeCommander.isStringOrNil, allowed: ["undefined", "null", "emptyString", "whitespace", "nonWhitespace"] }
            ]
        }, {
            description: 'Testing empty string type guard functions',
            methods: [
                { name: 'isEmptyString', callback: JsTypeCommander.isEmptyString, allowed: ["emptyString", "whitespace"] },
                { name: 'isEmptyStringIfDef', callback: JsTypeCommander.isEmptyStringIfDef, allowed: ["undefined", "emptyString", "whitespace"] },
                { name: 'isEmptyStringOrNull', callback: JsTypeCommander.isEmptyStringOrNull, allowed: ["null", "emptyString", "whitespace"] },
                { name: 'isEmptyStringOrNil', callback: JsTypeCommander.isEmptyStringOrNil, allowed: ["undefined", "null", "emptyString", "whitespace"] },
                { name: 'isEmptyOrWhitespace', callback: JsTypeCommander.isEmptyOrWhitespace, allowed: ["emptyString", "whitespace"] },
                { name: 'isEmptyOrWhitespaceIfDef', callback: JsTypeCommander.isEmptyOrWhitespaceIfDef, allowed: ["undefined", "emptyString", "whitespace"] },
                { name: 'isNullOrWhitespace', callback: JsTypeCommander.isNullOrWhitespace, allowed: ["null", "emptyString", "whitespace"] },
                { name: 'isNilOrWhitespace', callback: JsTypeCommander.isNilOrWhitespace, allowed: ["undefined", "null", "emptyString", "whitespace"] }
            ]
        }, {
            description: 'Testing boolean type guard functions',
            methods: [
                { name: 'isBoolean', callback: JsTypeCommander.isBoolean, allowed: "boolean" },
                { name: 'isBooleanIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: ["undefined", "boolean"] },
                { name: 'isBooleanOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: ["null", "boolean"] },
                { name: 'isBooleanOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: ["undefined", "null", "boolean"] }
            ]
        }, {
            description: 'Testing number type guard functions',
            methods: [
                { name: 'isNumber', callback: JsTypeCommander.isNumber, allowed: ["zero", "nonZero", "float"] },
                { name: 'isNumberIfDef', callback: JsTypeCommander.isNumberIfDef, allowed: ["undefined", "zero", "nonZero", "float"] },
                { name: 'isNumberOrNull', callback: JsTypeCommander.isNumberOrNull, allowed: ["null", "zero", "nonZero", "float"] },
                { name: 'isNumberNaNorNull', callback: JsTypeCommander.isNumberOrNull, allowed: ["null", "zero", "nonZero", "float", 'NaN'] },
                { name: 'isNumberOrNil', callback: JsTypeCommander.isNumberOrNil, allowed: ["undefined", "null", "zero", "nonZero", "float"] },
                { name: 'isInfinite', callback: JsTypeCommander.isInfinite, allowed: "Infinity" }
            ]
        }, {
            description: 'Testing function type guard functions',
            methods: [
                { name: 'isFunction', callback: JsTypeCommander.isBoolean, allowed: "function" },
                { name: 'isFunctionIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: ["undefined", "function"] },
                { name: 'isFunctionOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: ["null", "function"] },
                { name: 'isFunctionOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: ["undefined", "null", "function"] }
            ]
        }, {
            description: 'Testing object type guard functions',
            methods: [
                { name: 'isObject', callback: JsTypeCommander.isObject, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObject', callback: JsTypeCommander.isPlainObject, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectType', callback: JsTypeCommander.isObjectType, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
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
            methods: [
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
    typeGuardMethodGroupArr.forEach(grp => {
        describe(grp.description, function() {
            grp.methods.forEach(tgm => {
                describe('Testing ' + tgm.name + ' function', function() {
                    let allowSetArr: { isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[];
                    if (typeof(tgm.allowed) == "string")
                        allowSetArr = [{ types: [tgm.allowed] }];
                    else
                        allowSetArr = <{ isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[]>tgm.allowed.map(a => (typeof(a) == "string") ? { types: [a] } : ((Array.isArray(a)) ? { types: a } : a));
                    allowSetArr.forEach(allowSet => {
                        typeGuardTestArgumentArr.forEach(tga => {
                            let args = [];
                            let description: string = tgm.name;
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
                                let result: JsTypeCommander.TAnythingAtAll = tgm.callback.apply(this, args);
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