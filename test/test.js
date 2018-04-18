"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
//import * as JsTypeCommander from './dist/JsTypeCommander';
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
var TypeMappingCondition;
(function (TypeMappingCondition) {
    TypeMappingCondition[TypeMappingCondition["whenBoolean"] = 0] = "whenBoolean";
    TypeMappingCondition[TypeMappingCondition["whenFunction"] = 1] = "whenFunction";
    TypeMappingCondition[TypeMappingCondition["whenInfinity"] = 2] = "whenInfinity";
    TypeMappingCondition[TypeMappingCondition["whenNaN"] = 3] = "whenNaN";
    TypeMappingCondition[TypeMappingCondition["whenNumber"] = 4] = "whenNumber";
    TypeMappingCondition[TypeMappingCondition["whenArray"] = 5] = "whenArray";
    TypeMappingCondition[TypeMappingCondition["whenArrayLike"] = 6] = "whenArrayLike";
    TypeMappingCondition[TypeMappingCondition["whenNotArrayLike"] = 7] = "whenNotArrayLike";
    TypeMappingCondition[TypeMappingCondition["whenString"] = 8] = "whenString";
    TypeMappingCondition[TypeMappingCondition["whenSymbol"] = 9] = "whenSymbol";
    TypeMappingCondition[TypeMappingCondition["whenNull"] = 10] = "whenNull";
    TypeMappingCondition[TypeMappingCondition["whenUndefined"] = 11] = "whenUndefined";
    TypeMappingCondition[TypeMappingCondition["whenObject"] = 12] = "whenObject";
    TypeMappingCondition[TypeMappingCondition["otherwise"] = 13] = "otherwise";
})(TypeMappingCondition || (TypeMappingCondition = {}));
function typeMappingConditionToString(value) {
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
var TypeGateNilHandling;
(function (TypeGateNilHandling) {
    TypeGateNilHandling[TypeGateNilHandling["notNil"] = 0] = "notNil";
    TypeGateNilHandling[TypeGateNilHandling["allowUndefined"] = 1] = "allowUndefined";
    TypeGateNilHandling[TypeGateNilHandling["allowNull"] = 2] = "allowNull";
    TypeGateNilHandling[TypeGateNilHandling["allowNil"] = 3] = "allowNil";
})(TypeGateNilHandling || (TypeGateNilHandling = {}));
var JsType;
(function (JsType) {
    JsType[JsType["Undefined"] = 0] = "Undefined";
    JsType[JsType["Boolean"] = 1] = "Boolean";
    JsType[JsType["Number"] = 2] = "Number";
    JsType[JsType["String"] = 3] = "String";
    JsType[JsType["Symbol"] = 4] = "Symbol";
    JsType[JsType["Function"] = 5] = "Function";
    JsType[JsType["Object"] = 6] = "Object";
})(JsType || (JsType = {}));
var JsVariant;
(function (JsVariant) {
    JsVariant[JsVariant["None"] = 0] = "None";
    JsVariant[JsVariant["Null"] = 1] = "Null";
    JsVariant[JsVariant["NotEmpty"] = 2] = "NotEmpty";
    JsVariant[JsVariant["Empty"] = 3] = "Empty";
})(JsVariant || (JsVariant = {}));
function expectForNull(expected, result, message) {
    if (expected == null) {
        chai_1.expect(result).to.a('null', message);
        return true;
    }
    chai_1.expect(result).to.not.a('null', message);
    return false;
}
mocha_1.describe.skip("Testing options", function () {
    mocha_1.describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\n");
        });
    });
    mocha_1.describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.setDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\n");
        });
    });
    mocha_1.describe("Testing JsTypeCommander.getPatternOptions()", function () {
        it('JsTypeCommander.getPatternOptions() should not return nil', function () {
            var regexOptionResult = JsTypeCommander_1.JsTypeCommander.getPatternOptions();
            chai_1.expect(regexOptionResult).to.not.a('undefined').and.to.not.a('null');
        });
    });
    mocha_1.describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
        var regexOptionResult;
        try {
            regexOptionResult = JsTypeCommander_1.JsTypeCommander.getPatternOptions();
        }
        catch (_a) {
            regexOptionResult = undefined;
        }
        it('onlyWhitespace property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.onlyWhitespace).to.not.a('undefined');
        });
        it('trimStart property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.trimStart).to.not.a('undefined');
        });
        it('trimEnd property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.trimEnd).to.not.a('undefined');
        });
        it('lineSeparator property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.lineSeparator).to.not.a('undefined');
        });
        it('booleanText property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.booleanText).to.not.a('undefined');
        });
        it('firstLetterLc property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.firstLetterLc).to.not.a('undefined');
        });
        it('abnormalWhitespace property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else
                chai_1.expect(regexOptionResult.abnormalWhitespace).to.not.a('undefined');
        });
    });
    mocha_1.describe("Test JsTypeCommander.getPatternOptions() expressions", function () {
        var regexOptionResult;
        try {
            regexOptionResult = JsTypeCommander_1.JsTypeCommander.getPatternOptions();
        }
        catch (_a) {
            regexOptionResult = undefined;
        }
        var originals;
        var testRe = /.*/;
        var testDataArr = [
            { name: 'abnormalWhitespace', original: testRe, getRegexp: function (r) { return r.abnormalWhitespace; }, setRegexp: function (r, v) { r.abnormalWhitespace = v; } },
            { name: 'booleanText', original: testRe, getRegexp: function (r) { return r.booleanText; }, setRegexp: function (r, v) { r.booleanText = v; } },
            { name: 'lineSeparator', original: testRe, getRegexp: function (r) { return r.lineSeparator; }, setRegexp: function (r, v) { r.lineSeparator = v; } },
            { name: 'onlyWhitespace', original: testRe, getRegexp: function (r) { return r.onlyWhitespace; }, setRegexp: function (r, v) { r.onlyWhitespace = v; } },
            { name: 'trimEnd', original: testRe, getRegexp: function (r) { return r.trimEnd; }, setRegexp: function (r, v) { r.trimEnd = v; } },
            { name: 'trimStart', original: testRe, getRegexp: function (r) { return r.trimStart; }, setRegexp: function (r, v) { r.trimStart = v; } }
        ];
        testDataArr.forEach(function (d) {
            if (typeof (regexOptionResult) == "undefined")
                return;
            var r = d.getRegexp(regexOptionResult);
            if (typeof (r) !== "undefined")
                d.original = r;
        });
        testDataArr.forEach(function (testData) {
            it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else {
                    var arg = {};
                    testData.setRegexp(arg, /.*/);
                    var result_1 = JsTypeCommander_1.JsTypeCommander.setPatternOptions(arg);
                    chai_1.expect(result_1).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(function (d) {
                        if (typeof (result_1) == "undefined")
                            return;
                        var existing = d.getRegexp(result_1);
                        chai_1.expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof (existing) == "undefined")
                            return;
                        if (d.name == testData.name) {
                            chai_1.expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
                            chai_1.expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
                        }
                        else {
                            chai_1.expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
                            chai_1.expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                        }
                    });
                    testData.setRegexp(arg, testData.original);
                    result_1 = JsTypeCommander_1.JsTypeCommander.setPatternOptions(arg);
                    chai_1.expect(result_1).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(function (d) {
                        if (typeof (result_1) == "undefined")
                            return;
                        var existing = d.getRegexp(result_1);
                        chai_1.expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof (existing) == "undefined")
                            return;
                        var originalRe = d.original;
                        if (d.name == testData.name)
                            chai_1.expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
                        else
                            chai_1.expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                    });
                }
            });
        });
        it('setPatternOptions() should return object with property values restored.', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                var result_2 = JsTypeCommander_1.JsTypeCommander.setPatternOptions();
                chai_1.expect(result_2).to.not.a('undefined').and.to.not.a('null');
                testDataArr.forEach(function (d) {
                    if (typeof (result_2) == "undefined")
                        return;
                    var existing = d.getRegexp(result_2);
                    chai_1.expect(existing).to.not.a('undefined').and.to.not.a('null');
                    if (typeof (existing) == "undefined")
                        return;
                    var originalRe = d.original;
                    chai_1.expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
                });
            }
        });
    });
});
mocha_1.describe("Testing regular expressions", function () {
    var patternDefinitions = [
        {
            name: 'onlyWhitespace', getRegex: function (regexOptions) { return regexOptions.onlyWhitespace; }, tests: [
                { input: " ", expected: true }, { input: " \t\r\n ", expected: true }, { input: " \t\r\n ", expected: true }, { input: "", expected: false },
                { input: ".", expected: false }, { input: "0", expected: false }, { input: "X", expected: false }, { input: ". \t\r\n ", expected: false },
                { input: " \t.\r\n ", expected: false }, { input: " \t\r\n .", expected: false }
            ]
        }, {
            name: 'trimStart', getRegex: function (regexOptions) { return regexOptions.trimStart; }, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: false }, { input: "0\t\r\n", expected: false }, { input: ".", expected: false }, { input: ".\t\r\n", expected: false },
                { input: "\t\r\n0", expected: { captures: ["0"], groupZero: "\t\r\n0" } },
                { input: "\t\r\n0\t\r\n", expected: { captures: ["0\t\r\n"], groupZero: "\t\r\n0\t\r\n" } },
                { input: "\t\r\n.", expected: { captures: ["."], groupZero: "\t\r\n." } },
                { input: "\t\r\n.\t\r\n", expected: { captures: [".\t\r\n"], groupZero: "\t\r\n.\t\r\n" } }
            ]
        }, {
            name: 'trimEnd', getRegex: function (regexOptions) { return regexOptions.trimEnd; }, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } },
                { input: "0\t\r\n", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0\t\r\n", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".\t\r\n", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.\t\r\n", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } }
            ]
        }, {
            name: 'lineSeparator', getRegex: function (regexOptions) { return regexOptions.lineSeparator; }, tests: [
                { input: "", expected: false }, { input: " ", expected: false }, { input: ".", expected: false }, { input: "0", expected: false },
                { input: "\r", expected: true }, { input: "\r\n", expected: true }, { input: "\n", expected: true },
                { input: "x \t\r\n\r\nz ", expected: { captures: [], groupZero: "\r\n" } }, { input: " \t\n\r\r\n ", expected: { captures: [], groupZero: "\n" } },
                { input: "x \t\r\r\r\nz ", expected: { captures: [], groupZero: "\r" } }
            ]
        }, {
            name: 'booleanText', getRegex: function (regexOptions) { return regexOptions.booleanText; }, tests: (function () {
                var results = [
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
                var l = results.length;
                for (var i = 0; i < l; i++) {
                    var p = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    var input = "\t\r\n" + p.input + "\t\r\n";
                    if (typeof (p.expected) == "boolean")
                        results.push({ input: input, expected: false });
                    else if (Array.isArray(p.expected))
                        results.push({ input: input, expected: { captures: p.expected, groupZero: input } });
                    else if (p.expected !== null)
                        results.push({ input: input, expected: { captures: p.expected.captures, groupZero: input } });
                }
                l = results.length;
                var leadNumRe = /^\d/;
                var trainNumRe = /\d$/;
                var _loop_1 = function (i) {
                    var p = results[i];
                    if (p.input.trim().length == 0)
                        return "continue";
                    ["true", "t", "false", "f", "yes", "y", "."].forEach(function (si) {
                        results.push({ input: si + p.input, expected: false });
                        results.push({ input: p.input + si, expected: false });
                    });
                    ["1", "0"].forEach(function (si) {
                        if (!leadNumRe.test(p.input))
                            results.push({ input: si + p.input, expected: false });
                        if (!trainNumRe.test(p.input))
                            results.push({ input: p.input + si, expected: false });
                    });
                };
                for (var i = 0; i < l; i++) {
                    _loop_1(i);
                }
                return results;
            }())
        }, {
            name: 'firstLetterLc', getRegex: function (regexOptions) { return regexOptions.firstLetterLc; }, tests: [
                { input: "test", expected: [null, "t", "est"] }, { input: "t", expected: [null, "t", null] },
                { input: "\r\n.test", expected: ["\r\n.", "t", "est"] }, { input: "\r\n.t", expected: ["\r\n.", "t", null] },
                { input: "Test", expected: false }, { input: "T", expected: false }, { input: " Test", expected: false }, { input: " T", expected: false },
                { input: "0test", expected: false }, { input: "0t", expected: false }, { input: "\r\n.0test", expected: false }, { input: "\r\n.0t", expected: false }
            ]
        }, {
            name: 'abnormalWhitespace', getRegex: function (regexOptions) { return regexOptions.abnormalWhitespace; }, tests: [
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
    var regexOptionResult = (function () {
        var r;
        try {
            r = JsTypeCommander_1.JsTypeCommander.getPatternOptions();
        }
        catch (_a) {
            r = undefined;
        }
        if (typeof (r) == "undefined")
            return {};
        return r;
    })();
    patternDefinitions.forEach(function (pattern) {
        mocha_1.describe('Testing ' + pattern.name + ' pattern', function () {
            var regex = pattern.getRegex(regexOptionResult);
            pattern.tests.forEach(function (testData) {
                var expectedGroups = null;
                if (typeof (testData.expected) == "boolean") {
                    if (testData.expected)
                        expectedGroups = [testData.input];
                }
                else if (testData.expected !== null) {
                    if (Array.isArray(testData.expected))
                        expectedGroups = [(testData.expected.length == 0) ? testData.input : testData.expected.join("")].concat(testData.expected);
                    else
                        expectedGroups = [(typeof (testData.expected.groupZero) == "string") ? testData.expected.groupZero : ((testData.expected.captures.length == 0) ? testData.input : testData.expected.captures.join(""))].concat(testData.expected.captures);
                }
                it('regexOptions.' + pattern.name + '.exec(' + JSON.stringify(testData.input) + ') should return ' + JSON.stringify(expectedGroups), function () {
                    var name = pattern.name;
                    var input = testData.input;
                    if (typeof (regex) == "undefined")
                        this.skip();
                    else {
                        var result = regex.exec(input);
                        if (expectForNull(expectedGroups, result, 'Unexpected match result') || expectedGroups === null)
                            return;
                        chai_1.expect(result.length).to.equal(expectedGroups.length, 'Length mismatch');
                        for (var i = 0; i < expectedGroups.length; i++) {
                            var msg = 'Result group mismatch at index ' + i;
                            if (typeof (expectedGroups[i]) == "string") {
                                chai_1.expect(result[i]).to.a('string', msg);
                                chai_1.expect(JSON.stringify(result[i])).to.equal(JSON.stringify(expectedGroups[i]), msg);
                            }
                            else
                                chai_1.expect(result[i]).to.not.a('string', msg);
                        }
                    }
                });
            }, this);
        });
    }, this);
});
var MapCallbackId;
(function (MapCallbackId) {
    MapCallbackId[MapCallbackId["whenBoolean"] = 1] = "whenBoolean";
    MapCallbackId[MapCallbackId["whenFunction"] = 2] = "whenFunction";
    MapCallbackId[MapCallbackId["whenInfinity"] = 4] = "whenInfinity";
    MapCallbackId[MapCallbackId["whenNaN"] = 8] = "whenNaN";
    MapCallbackId[MapCallbackId["whenNumber"] = 16] = "whenNumber";
    MapCallbackId[MapCallbackId["whenArray"] = 32] = "whenArray";
    MapCallbackId[MapCallbackId["whenArrayLike"] = 64] = "whenArrayLike";
    MapCallbackId[MapCallbackId["whenNotArrayLike"] = 128] = "whenNotArrayLike";
    MapCallbackId[MapCallbackId["whenString"] = 256] = "whenString";
    MapCallbackId[MapCallbackId["whenSymbol"] = 512] = "whenSymbol";
    MapCallbackId[MapCallbackId["whenNull"] = 1024] = "whenNull";
    MapCallbackId[MapCallbackId["whenUndefined"] = 2048] = "whenUndefined";
    MapCallbackId[MapCallbackId["whenObject"] = 4096] = "whenObject";
    MapCallbackId[MapCallbackId["otherwise"] = 8192] = "otherwise";
})(MapCallbackId || (MapCallbackId = {}));
function mapCallbackIdToName(id) {
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
var TypeGateCallbackHelper = /** @class */ (function () {
    function TypeGateCallbackHelper(omit) {
        var omitOther = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            omitOther[_i - 1] = arguments[_i];
        }
        var _this = this;
        this._isOmmitted = {};
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        if (Array.isArray(omit))
            omit.forEach(function (n) {
                if (typeof (n) == "number") {
                    if (n != MapCallbackId.otherwise)
                        _this._isOmmitted[mapCallbackIdToName(n)] = true;
                }
                else if (n != "otherwise")
                    _this._isOmmitted[n] = true;
            }, this);
        else if (typeof (omit) == "number") {
            if (omit != MapCallbackId.otherwise)
                this._isOmmitted[mapCallbackIdToName(omit)] = true;
        }
        else if (typeof (omit) != "undefined" && omit != "otherwise")
            this._isOmmitted[omit] = true;
        if (!Array.isArray(omitOther))
            return;
        omitOther.forEach(function (n) {
            if (typeof (n) == "number") {
                if (n != MapCallbackId.otherwise)
                    _this._isOmmitted[mapCallbackIdToName(n)] = true;
            }
            else if (n != "otherwise")
                _this._isOmmitted[n] = true;
        }, this);
    }
    TypeGateCallbackHelper.prototype._onInvoked = function (key, value) {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    };
    TypeGateCallbackHelper.prototype._whenBoolean = function (value) { return this._onInvoked(MapCallbackId.whenBoolean, value); };
    ;
    TypeGateCallbackHelper.prototype._whenFunction = function (value) { return this._onInvoked(MapCallbackId.whenFunction, value); };
    ;
    TypeGateCallbackHelper.prototype._whenInfinity = function (value) { return this._onInvoked(MapCallbackId.whenInfinity, value); };
    ;
    TypeGateCallbackHelper.prototype._whenNaN = function (value) { return this._onInvoked(MapCallbackId.whenNaN, value); };
    ;
    TypeGateCallbackHelper.prototype._whenNumber = function (value) { return this._onInvoked(MapCallbackId.whenNumber, value); };
    ;
    TypeGateCallbackHelper.prototype._whenArray = function (value) { return this._onInvoked(MapCallbackId.whenArray, value); };
    ;
    TypeGateCallbackHelper.prototype._whenArrayLike = function (value) { return this._onInvoked(MapCallbackId.whenArrayLike, value); };
    ;
    TypeGateCallbackHelper.prototype._whenNotArrayLike = function (value) { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); };
    ;
    TypeGateCallbackHelper.prototype._whenString = function (value) { return this._onInvoked(MapCallbackId.whenString, value); };
    ;
    TypeGateCallbackHelper.prototype._whenSymbol = function (value) { return this._onInvoked(MapCallbackId.whenSymbol, value); };
    ;
    TypeGateCallbackHelper.prototype._whenNull = function (value) { return this._onInvoked(MapCallbackId.whenNull, value); };
    ;
    TypeGateCallbackHelper.prototype._whenUndefined = function (value) { return this._onInvoked(MapCallbackId.whenUndefined, value); };
    ;
    TypeGateCallbackHelper.prototype._whenObject = function (value) { return this._onInvoked(MapCallbackId.whenObject, value); };
    ;
    TypeGateCallbackHelper.prototype._invokeThis = function (name, func) {
        if (this._isOmmitted[name])
            return;
        var thisObj = this;
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        return function (arg) { return func.call(thisObj, arg); };
    };
    Object.defineProperty(TypeGateCallbackHelper.prototype, "invokeFlags", {
        get: function () { return this._invokeFlags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "callCount", {
        get: function () { return this._callCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "lastArg", {
        get: function () { return this._lastArg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenBoolean", {
        get: function () { return this._invokeThis("whenBoolean", this._whenBoolean); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenFunction", {
        get: function () { return this._invokeThis("whenFunction", this._whenFunction); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenInfinity", {
        get: function () { return this._invokeThis("whenInfinity", this._whenInfinity); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenNaN", {
        get: function () { return this._invokeThis("whenNaN", this._whenNaN); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenNumber", {
        get: function () { return this._invokeThis("whenNumber", this._whenNumber); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenArray", {
        get: function () { return this._invokeThis("whenArray", this._whenArray); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenArrayLike", {
        get: function () { return this._invokeThis("whenArrayLike", this._whenArrayLike); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenNotArrayLike", {
        get: function () { return this._invokeThis("whenNotArrayLike", this._whenNotArrayLike); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenString", {
        get: function () { return this._invokeThis("whenString", this._whenString); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenSymbol", {
        get: function () { return this._invokeThis("whenSymbol", this._whenSymbol); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenNull", {
        get: function () { return this._invokeThis("whenNull", this._whenNull); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenUndefined", {
        get: function () { return this._invokeThis("whenUndefined", this._whenUndefined); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeGateCallbackHelper.prototype, "whenObject", {
        get: function () { return this._invokeThis("whenObject", this._whenObject); },
        enumerable: true,
        configurable: true
    });
    TypeGateCallbackHelper.prototype.otherwise = function (value) { return this._onInvoked(MapCallbackId.otherwise, value); };
    ;
    TypeGateCallbackHelper.prototype.asJSON = function () {
        var _this = this;
        var allIds = [MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject];
        var result = {};
        allIds.forEach(function (i) {
            var n = mapCallbackIdToName(i);
            if (!_this._isOmmitted[n])
                result[n] = function () { return i; };
        });
        return result;
    };
    return TypeGateCallbackHelper;
}());
mocha_1.describe("Testing type map functions", function () {
    mocha_1.describe("Testing mapByTypeValue function", function () {
        var testDataArr = [
            {
                type: 'nil',
                test: [
                    {
                        arg: { display: 'undefined', getValue: function () { return undefined; } },
                        opt: [
                            { expected: MapCallbackId.whenUndefined },
                            { omit: "whenUndefined", expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'null', getValue: function () { return null; } },
                        opt: [
                            { expected: MapCallbackId.whenNull },
                            { omit: "whenNull", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'boolean',
                test: {
                    arg: [{ display: 'true', getValue: function () { return true; } }, { display: 'false', getValue: function () { return false; } }],
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
                            { display: 'Number.POSITIVE_INFINITY', getValue: function () { return Number.POSITIVE_INFINITY; } },
                            { display: 'Number.NEGATIVE_INFINITY', getValue: function () { return Number.NEGATIVE_INFINITY; } },
                            { display: 'Infinity', getValue: function () { return Infinity; } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenInfinity },
                            { omit: "whenInfinity", expected: MapCallbackId.whenNumber },
                            { omit: ["whenInfinity", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'NaN', getValue: function () { return NaN; } },
                        opt: [
                            { expected: MapCallbackId.whenNaN },
                            { omit: "whenNaN", expected: MapCallbackId.whenNumber },
                            { omit: ["whenNaN", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [{ display: '0', getValue: function () { return 0; } }, { display: '-1', getValue: function () { return -1; } }, { display: '0.0001', getValue: function () { return 0.0001; } }, { display: '10', getValue: function () { return 10; } }],
                        opt: [
                            { expected: MapCallbackId.whenNumber },
                            { omit: "whenNumber", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'Array',
                test: {
                    arg: [{ display: '[]', getValue: function () { return []; } }, { display: '[undefined]', getValue: function () { return [undefined]; } }, { display: '[false]', getValue: function () { return [false]; } }],
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
                            { display: '{ length: 0 }', getValue: function () { return { length: 0 }; } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }', getValue: function () {
                                    return _a = { length: 2 }, _a[0] = "test", _a[1] = "again", _a;
                                    var _a;
                                } },
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: function () { return { length: 0 }; } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }', getValue: function () {
                                    return _a = { length: 2 }, _a[0] = "test", _a[1] = "again", _a;
                                    var _a;
                                } },
                            { display: '{ length: 1 }', getValue: function () { return { length: 1 }; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }', getValue: function () {
                                    return _a = { length: 2 }, _a[0] = "test", _a[2] = "again", _a;
                                    var _a;
                                } }
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
                        { display: '{ }', getValue: function () { return {}; } },
                        { display: '{ length: 1 }', getValue: function () { return { length: 1 }; } },
                        { display: '{ length: 2, [0]: "test", [2]: "again" }', getValue: function () {
                                return _a = { length: 2 }, _a[0] = "test", _a[2] = "again", _a;
                                var _a;
                            } },
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
                    arg: [{ display: '""', getValue: function () { return ""; } }, { display: '"false"', getValue: function () { return "false"; } }],
                    opt: [
                        { expected: MapCallbackId.whenString },
                        { omit: "whenString", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'symbol',
                test: {
                    arg: { display: 'Symbol.iterator', getValue: function () { return Symbol.iterator; } },
                    opt: [
                        { expected: MapCallbackId.whenSymbol },
                        { omit: "whenSymbol", expected: MapCallbackId.otherwise }
                    ]
                }
            }
        ];
        testDataArr.forEach(function (testData) {
            mocha_1.describe('Testing ' + testData.type + " values", function () {
                var _this = this;
                var tests = (Array.isArray(testData.test)) ? testData.test : [testData.test];
                tests.forEach(function (grp) {
                    var args = (Array.isArray(grp.arg)) ? grp.arg : [grp.arg];
                    var opts = (Array.isArray(grp.opt)) ? grp.opt : [grp.opt];
                    opts.forEach(function (o) {
                        var omit = (typeof (o.omit) == "undefined") ? [] : ((typeof (o.omit) == "string") ? [o.omit] : o.omit);
                        args.forEach(function (a) {
                            var tgh = new TypeGateCallbackHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + args.map(function (a) { return a.display; }).join(", ") + ', ' + JSON.stringify(tgh) + ') should return ' + o.expected +
                                " (calling " + mapCallbackIdToName(o.expected) + ")", function () {
                                var result = (typeof (o.simpleCheck) == "boolean") ? JsTypeCommander_1.JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh, o.simpleCheck) :
                                    JsTypeCommander_1.JsTypeCommander.mapByTypeValue.call(this, a.getValue(), tgh);
                                chai_1.expect(result).to.a("number");
                                chai_1.expect(result).to.equal(o.expected);
                            });
                        }, _this);
                    }, _this);
                }, this);
            });
        }, this);
    });
    mocha_1.describe("Testing mapByDefined function", function () {
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
    mocha_1.describe("Testing mapByNotNull function", function () {
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
    mocha_1.describe("Testing mapByNotNil function", function () {
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
mocha_1.describe("Testing type guard functions", function () {
    mocha_1.describe("Testing notDefined function", function () {
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
    mocha_1.describe("Testing isNil function", function () {
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
    mocha_1.describe("Testing isNull function", function () {
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
    mocha_1.describe("Testing isString functions", function () {
        mocha_1.describe("Testing isString", function () {
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
        mocha_1.describe("Testing isStringIfDef", function () {
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
        mocha_1.describe("Testing isStringOrNull", function () {
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
        mocha_1.describe("Testing isStringOrNil", function () {
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
    mocha_1.describe("Testing isEmptyString functions", function () {
        mocha_1.describe("Testing isEmptyString", function () {
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
        mocha_1.describe("Testing isEmptyOrWhitespace", function () {
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
        mocha_1.describe("Testing isEmptyStringIfDef", function () {
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
        mocha_1.describe("Testing isEmptyOrWhitespaceIfDef", function () {
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
        mocha_1.describe("Testing isEmptyStringOrNull", function () {
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
        mocha_1.describe("Testing isNullOrWhitespace", function () {
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
        mocha_1.describe("Testing isEmptyStringOrNil", function () {
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
        mocha_1.describe("Testing isNilOrWhitespace", function () {
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
    mocha_1.describe("Testing isBoolean functions", function () {
        mocha_1.describe("Testing isBoolean", function () {
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
        mocha_1.describe("Testing isBooleanIfDef", function () {
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
        mocha_1.describe("Testing isBooleanOrNull", function () {
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
        mocha_1.describe("Testing isBooleanOrNil", function () {
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
    mocha_1.describe("Testing isNumber functions", function () {
        mocha_1.describe("Testing isNumber", function () {
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
        mocha_1.describe("Testing isNumberIfDef", function () {
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
        mocha_1.describe("Testing isNumberOrNull", function () {
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
        mocha_1.describe("Testing isNumberNaNorNull", function () {
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
        mocha_1.describe("Testing isNumberOrNil", function () {
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
        mocha_1.describe("Testing isInfinite", function () {
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
    mocha_1.describe("Testing isFunction functions", function () {
        mocha_1.describe("Testing isFunction", function () {
        });
        mocha_1.describe("Testing isFunctionIfDef", function () {
        });
        mocha_1.describe("Testing isFunctionOrNull", function () {
        });
        mocha_1.describe("Testing isFunctionOrNil", function () {
        });
    });
    mocha_1.describe("Testing isObject functions", function () {
        mocha_1.describe("Testing isObject", function () {
        });
        mocha_1.describe("Testing isObjectType", function () {
        });
        mocha_1.describe("Testing isNonArrayObject", function () {
        });
        mocha_1.describe("Testing isPlainObject", function () {
        });
        mocha_1.describe("Testing isObjectIfDef", function () {
        });
        mocha_1.describe("Testing isObjectTypeIfDef", function () {
        });
        mocha_1.describe("Testing isNonArrayObjectIfDef", function () {
        });
        mocha_1.describe("Testing isPlainObjectIfDef", function () {
        });
        mocha_1.describe("Testing isObjectOrNull", function () {
        });
        mocha_1.describe("Testing isObjectTypeOrNull", function () {
        });
        mocha_1.describe("Testing isNonArrayObjectOrNull", function () {
        });
        mocha_1.describe("Testing isPlainObjectOrNull", function () {
        });
        mocha_1.describe("Testing isObjectTypeOrNil", function () {
        });
        mocha_1.describe("Testing isObjectOrNil", function () {
        });
        mocha_1.describe("Testing isNonArrayObjectOrNil", function () {
        });
        mocha_1.describe("Testing isPlainObjectOrNil", function () {
        });
    });
    mocha_1.describe("Testing isArray functions", function () {
        mocha_1.describe("Testing isArray", function () {
        });
        mocha_1.describe("Testing isEmptyArray", function () {
        });
        mocha_1.describe("Testing isArrayLike", function () {
        });
        mocha_1.describe("Testing isArrayIfDef", function () {
        });
        mocha_1.describe("Testing isEmptyArrayIfDef", function () {
        });
        mocha_1.describe("Testing isArrayLikeIfDef", function () {
        });
        mocha_1.describe("Testing isArrayOrNull", function () {
        });
        mocha_1.describe("Testing isEmptyArrayOrNull", function () {
        });
        mocha_1.describe("Testing isArrayLikeOrNull", function () {
        });
        mocha_1.describe("Testing isArrayOrNil", function () {
        });
        mocha_1.describe("Testing isEmptyArrayOrNil", function () {
        });
        mocha_1.describe("Testing isArrayLikeOrNil", function () {
        });
    });
    mocha_1.describe("Testing derivesFrom functions", function () {
        mocha_1.describe("Testing derivesFrom", function () {
        });
        mocha_1.describe("Testing derivesFromIfDef", function () {
        });
        mocha_1.describe("Testing derivesFromOrNull", function () {
        });
        mocha_1.describe("Testing derivesFromOrNil", function () {
        });
    });
    mocha_1.describe("Testing isErrorLike", function () {
    });
});
mocha_1.describe("Testing type conversion functions", function () {
    mocha_1.describe("Testing string conversion functions", function () {
        mocha_1.describe("Testing asString", function () {
        });
        mocha_1.describe("Testing toString", function () {
        });
        mocha_1.describe("Testing trimStart", function () {
        });
        mocha_1.describe("Testing trimEnd", function () {
        });
        mocha_1.describe("Testing asNormalizedWs", function () {
        });
        mocha_1.describe("Testing ucFirst", function () {
        });
        mocha_1.describe("Testing splitLines", function () {
        });
        mocha_1.describe("Testing indentText", function () {
        });
        mocha_1.describe("Testing indentLines", function () {
        });
    });
    mocha_1.describe("Testing boolean conversion functions", function () {
        mocha_1.describe("Testing asBoolean", function () {
        });
        mocha_1.describe("Testing toBoolean", function () {
        });
    });
    mocha_1.describe("Testing number conversion functions", function () {
        mocha_1.describe("Testing asNumber", function () {
        });
        mocha_1.describe("Testing toNumber", function () {
        });
    });
    mocha_1.describe("Testing Array conversion functions", function () {
        mocha_1.describe("Testing toArray", function () {
        });
        mocha_1.describe("Testing mapInto", function () {
        });
    });
    mocha_1.describe("Testing asErrorLike", function () {
    });
});
