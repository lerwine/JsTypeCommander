"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
//import * as JsTypeCommander from './dist/JsTypeCommander';
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
function expectNullStatus(expected, result, message) {
    if (expected == null) {
        chai_1.expect(result).to.a('null', message);
        return true;
    }
    chai_1.expect(result).to.not.a('null', message);
    return false;
}
mocha_1.describe.skip("Testing module options settings", function () {
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
mocha_1.describe.skip("Testing regular expressions", function () {
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
                        if (expectNullStatus(expectedGroups, result, 'Unexpected match result') || expectedGroups === null)
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
var MapByTypeHelper = /** @class */ (function () {
    function MapByTypeHelper(omit) {
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
    MapByTypeHelper.prototype._onInvoked = function (key, value) {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    };
    MapByTypeHelper.prototype._whenBoolean = function (value) { return this._onInvoked(MapCallbackId.whenBoolean, value); };
    MapByTypeHelper.prototype._whenFunction = function (value) { return this._onInvoked(MapCallbackId.whenFunction, value); };
    MapByTypeHelper.prototype._whenInfinity = function (value) { return this._onInvoked(MapCallbackId.whenInfinity, value); };
    MapByTypeHelper.prototype._whenNaN = function (value) { return this._onInvoked(MapCallbackId.whenNaN, value); };
    MapByTypeHelper.prototype._whenNumber = function (value) { return this._onInvoked(MapCallbackId.whenNumber, value); };
    MapByTypeHelper.prototype._whenArray = function (value) { return this._onInvoked(MapCallbackId.whenArray, value); };
    MapByTypeHelper.prototype._whenArrayLike = function (value) { return this._onInvoked(MapCallbackId.whenArrayLike, value); };
    MapByTypeHelper.prototype._whenNotArrayLike = function (value) { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); };
    MapByTypeHelper.prototype._whenString = function (value) { return this._onInvoked(MapCallbackId.whenString, value); };
    MapByTypeHelper.prototype._whenSymbol = function (value) { return this._onInvoked(MapCallbackId.whenSymbol, value); };
    MapByTypeHelper.prototype._whenNull = function (value) { return this._onInvoked(MapCallbackId.whenNull, value); };
    MapByTypeHelper.prototype._whenUndefined = function (value) { return this._onInvoked(MapCallbackId.whenUndefined, value); };
    MapByTypeHelper.prototype._whenObject = function (value) { return this._onInvoked(MapCallbackId.whenObject, value); };
    MapByTypeHelper.prototype._invokeThis = function (name, func) {
        if (this._isOmmitted[name])
            return;
        var thisObj = this;
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        return function (arg) { return func.call(thisObj, arg); };
    };
    Object.defineProperty(MapByTypeHelper.prototype, "invokeFlags", {
        get: function () { return this._invokeFlags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "callCount", {
        get: function () { return this._callCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "lastArg", {
        get: function () { return this._lastArg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "thisObj", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenBoolean", {
        get: function () { return this._invokeThis("whenBoolean", this._whenBoolean); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenFunction", {
        get: function () { return this._invokeThis("whenFunction", this._whenFunction); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenInfinity", {
        get: function () { return this._invokeThis("whenInfinity", this._whenInfinity); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenNaN", {
        get: function () { return this._invokeThis("whenNaN", this._whenNaN); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenNumber", {
        get: function () { return this._invokeThis("whenNumber", this._whenNumber); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenArray", {
        get: function () { return this._invokeThis("whenArray", this._whenArray); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenArrayLike", {
        get: function () { return this._invokeThis("whenArrayLike", this._whenArrayLike); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenNotArrayLike", {
        get: function () { return this._invokeThis("whenNotArrayLike", this._whenNotArrayLike); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenString", {
        get: function () { return this._invokeThis("whenString", this._whenString); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenSymbol", {
        get: function () { return this._invokeThis("whenSymbol", this._whenSymbol); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenNull", {
        get: function () { return this._invokeThis("whenNull", this._whenNull); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenUndefined", {
        get: function () { return this._invokeThis("whenUndefined", this._whenUndefined); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByTypeHelper.prototype, "whenObject", {
        get: function () { return this._invokeThis("whenObject", this._whenObject); },
        enumerable: true,
        configurable: true
    });
    MapByTypeHelper.prototype.otherwise = function (value) { return this._onInvoked(MapCallbackId.otherwise, value); };
    MapByTypeHelper.prototype.toJSON = function () {
        var _this = this;
        var allIds = [MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject];
        var result = {};
        allIds.forEach(function (i) {
            var n = mapCallbackIdToName(i);
            if (_this._isOmmitted[n])
                result[n] = false;
        });
        return result;
    };
    return MapByTypeHelper;
}());
var MapByNilHelper = /** @class */ (function () {
    function MapByNilHelper() {
        this._whenTrueInvoked = false;
        this._otherwiseInvoked = false;
        this._callCount = 0;
        this._lastArg = undefined;
        this._trueNum = Math.floor(Math.random() * 100);
        this._otherwiseNum = Math.floor(Math.random() * 100);
        while (this._trueNum == this._otherwiseNum)
            this._otherwiseNum = Math.floor(Math.random() * 100);
    }
    Object.defineProperty(MapByNilHelper.prototype, "whenTrueInvoked", {
        get: function () { return this._whenTrueInvoked; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByNilHelper.prototype, "otherwiseInvoked", {
        get: function () { return this._otherwiseInvoked; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByNilHelper.prototype, "callCount", {
        get: function () { return this._callCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByNilHelper.prototype, "trueNum", {
        get: function () { return this._trueNum; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapByNilHelper.prototype, "otherwiseNum", {
        get: function () { return this._otherwiseNum; },
        enumerable: true,
        configurable: true
    });
    MapByNilHelper.prototype.whenTrue = function (arg) {
        this._callCount++;
        this._whenTrueInvoked = true;
        this._lastArg = arg;
        return this._trueNum;
    };
    MapByNilHelper.prototype.otherwise = function (arg) {
        this._callCount++;
        this._otherwiseInvoked = true;
        this._lastArg = arg;
        return this._otherwiseNum;
    };
    return MapByNilHelper;
}());
mocha_1.describe.skip("Testing type map functions", function () {
    mocha_1.describe("Testing mapByTypeValue function", function () {
        var inputTypeArr = [
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
                            { display: '{ length: 0 }', getValue: function () { return { length: 0 }; } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: function () { var a = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: function () { var a = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                            { display: '{ length: 1 }', getValue: function () { return { length: 1 }; } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: function () { return { length: 0 }; } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: function () { var a = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } }
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
                        arg: { display: '{ }', getValue: function () { return {}; } },
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
                            { display: '{ }', getValue: function () { return {}; } },
                            { display: '{ length: 1 }', getValue: function () { return { length: 1 }; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: function () { var a = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
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
        var dataIterationIndex = 0;
        inputTypeArr.forEach(function (inputType) {
            mocha_1.describe('Testing ' + inputType.type + " values", function () {
                var _this = this;
                var tests = (Array.isArray(inputType.test)) ? inputType.test : [inputType.test];
                tests.forEach(function (mapByTypeTest) {
                    var args = (Array.isArray(mapByTypeTest.arg)) ? mapByTypeTest.arg : [mapByTypeTest.arg];
                    var optArr = (Array.isArray(mapByTypeTest.opt)) ? mapByTypeTest.opt : [mapByTypeTest.opt];
                    optArr.forEach(function (opt) {
                        var omit = (typeof (opt.omit) == "undefined") ? [] : ((typeof (opt.omit) == "string") ? [opt.omit] : opt.omit);
                        args.forEach(function (argInfo) {
                            var tgh = new MapByTypeHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + argInfo.display + ', ' + JSON.stringify(tgh.toJSON()) + ((typeof (opt.checkElements) == "boolean") ? ", " +
                                opt.checkElements : "") + ') should return ' + opt.expected + " (calling " + mapCallbackIdToName(opt.expected) + ")", function () {
                                var result = (typeof (opt.checkElements) == "boolean") ?
                                    JsTypeCommander_1.JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh, opt.checkElements) :
                                    JsTypeCommander_1.JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh);
                                dataIterationIndex++;
                                chai_1.expect(result).to.a("number", "at dataIterationIndex " + dataIterationIndex);
                                chai_1.expect(result).to.equal(opt.expected, mapCallbackIdToName(result) + " called, insteaat dataIterationIndex " + dataIterationIndex);
                            });
                        }, _this);
                    }, _this);
                }, this);
            });
        }, this);
    });
    var mapByNilFunctionArr = [
        { name: 'mapByDefined', callback: JsTypeCommander_1.JsTypeCommander.mapByDefined, allowUndefined: false, allowNull: true },
        { name: 'mapByNotNull', callback: JsTypeCommander_1.JsTypeCommander.mapByNotNull, allowUndefined: true, allowNull: false },
        { name: 'mapByNotNil', callback: JsTypeCommander_1.JsTypeCommander.mapByNotNil, allowUndefined: false, allowNull: false }
    ];
    var mapByNilArguments = [
        { display: 'undefined', type: 'undefined', getValue: function () { return undefined; } },
        { display: 'null', type: 'null', getValue: function () { return null; } },
        { display: 'NaN', type: 'notNil', getValue: function () { return NaN; } },
        { display: '0', type: 'notNil', getValue: function () { return 0; } },
        { display: 'false', type: 'notNil', getValue: function () { return false; } },
        { display: '""', type: 'notNil', getValue: function () { return ""; } },
        { display: '[]', type: 'notNil', getValue: function () { return []; } },
        { display: '[undefined', type: 'notNil', getValue: function () { return [undefined]; } },
        { display: '{}', type: 'notNil', getValue: function () { return {}; } },
        { display: 'Symbol.iterator', type: 'notNil', getValue: function () { return Symbol.iterator; } }
    ];
    mapByNilFunctionArr.forEach(function (mapByNilFunction) {
        mocha_1.describe("Testing " + mapByNilFunction.name + " function", function () {
            mapByNilArguments.forEach(function (argInfo) {
                var whenTrue = (argInfo.type == "notNil" || ((argInfo.type == "null") ? mapByNilFunction.allowNull : mapByNilFunction.allowUndefined));
                var mapByNilHelper = new MapByNilHelper();
                var expected = (whenTrue) ? mapByNilHelper.trueNum : mapByNilHelper.otherwiseNum;
                it(mapByNilFunction.name + "(" + argInfo.display + ", fn(v) => " + mapByNilHelper.trueNum + ', fn' + ((mapByNilFunction.name == "mapByNotNil") ? '(v)' : '()') +
                    ' => ' + mapByNilHelper.otherwiseNum + ') should return ' + expected + ' (' + ((whenTrue) ? 'whenTrue' : 'otherwise') + ')', function () {
                    var result = mapByNilFunction.callback(argInfo.getValue(), mapByNilHelper.whenTrue, mapByNilHelper.otherwise, mapByNilHelper);
                    chai_1.expect(result).to.a('number').and.to.equal(expected);
                    chai_1.expect(mapByNilHelper.callCount).to.not.equal(0, 'Callback not invoked');
                    chai_1.expect(mapByNilHelper.callCount).to.equal(1, 'Callback invoked more than once');
                    if (whenTrue)
                        chai_1.expect(mapByNilHelper.whenTrueInvoked).to.equal(true, 'Wrong callback invoked');
                    else
                        chai_1.expect(mapByNilHelper.otherwiseInvoked).to.equal(true, 'Wrong callback invoked');
                });
            }, this);
        });
    }, this);
});
var TestLengthProp = /** @class */ (function () {
    function TestLengthProp(n) {
        this._length = (typeof (n) == "number") ? n : 0;
    }
    Object.defineProperty(TestLengthProp.prototype, "length", {
        get: function () { return this._length; },
        enumerable: true,
        configurable: true
    });
    return TestLengthProp;
}());
var TestArrayLike = /** @class */ (function (_super) {
    __extends(TestArrayLike, _super);
    function TestArrayLike(n) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, n) || this;
        if (typeof (value) !== "object" || value === null || !Array.isArray(value) || value.length == 0)
            return _this;
        var i = 0;
        value.forEach(function (e) {
            if (Array.isArray(e))
                e.forEach(function (v) {
                    _this[i] = v;
                    i++;
                });
            else {
                _this[i] = e;
                i++;
            }
        });
        return _this;
    }
    return TestArrayLike;
}(TestLengthProp));
var AlmostArrayLike = /** @class */ (function (_super) {
    __extends(AlmostArrayLike, _super);
    function AlmostArrayLike(value) {
        var otherValues = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherValues[_i - 1] = arguments[_i];
        }
        var _this = this;
        var i = (Array.isArray(value)) ? value.length : 1;
        var n = (typeof (otherValues) != "undefined" && Array.isArray(otherValues)) ? otherValues.length : 0;
        _this = _super.call(this, i + n, value) || this;
        if (typeof (otherValues) == "undefined" || !Array.isArray(otherValues))
            return;
        for (var p = 0; p < n; p++)
            _this[i + p + 1] = otherValues[p];
        return _this;
    }
    return AlmostArrayLike;
}(TestArrayLike));
var TestErrorLike = /** @class */ (function () {
    function TestErrorLike() {
        this.message = "Example Error";
    }
    Object.defineProperty(TestErrorLike.prototype, "name", {
        get: function () { return "TestErrorLike"; },
        enumerable: true,
        configurable: true
    });
    return TestErrorLike;
}());
var TestErrorLike2 = /** @class */ (function (_super) {
    __extends(TestErrorLike2, _super);
    function TestErrorLike2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.number = 12;
        return _this;
    }
    Object.defineProperty(TestErrorLike2.prototype, "name", {
        get: function () { return "TestErrorLike2"; },
        enumerable: true,
        configurable: true
    });
    return TestErrorLike2;
}(TestErrorLike));
var TestErrorLike3 = /** @class */ (function (_super) {
    __extends(TestErrorLike3, _super);
    function TestErrorLike3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestErrorLike3.prototype, "name", {
        get: function () { return "TestErrorLike3"; },
        enumerable: true,
        configurable: true
    });
    return TestErrorLike3;
}(TestErrorLike2));
function argSet(getArgs, display, message) {
    return { display: display, getArgs: getArgs, message: message, _type: "ArgSet" };
}
function expectEqualTo(display, getExpectedValue, argSet) {
    var otherArgSets = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        otherArgSets[_i - 3] = arguments[_i];
    }
    var result = { display: display, getExpectedValue: getExpectedValue, argSets: [argSet], _type: "ExpectEquals" };
    if (typeof (otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectIsA(type, argSet) {
    var otherArgSets = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otherArgSets[_i - 2] = arguments[_i];
    }
    var result = { display: type, expectedType: type, argSets: [argSet], _type: "ExpectIs" };
    if (typeof (otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectEqualToFalse(argSet) {
    var otherArgSets = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgSets[_i - 1] = arguments[_i];
    }
    var result = { display: 'false', getExpectedValue: function () { return false; }, argSets: [argSet], _type: "ExpectEquals" };
    if (typeof (otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function expectEqualToTrue(argSet) {
    var otherArgSets = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgSets[_i - 1] = arguments[_i];
    }
    var result = { display: 'true', getExpectedValue: function () { return true; }, argSets: [argSet], _type: "ExpectEquals" };
    if (typeof (otherArgSets) == "object" && otherArgSets !== null)
        result.argSets = result.argSets.concat(otherArgSets);
    return result;
}
function testFunction(callback, name, signature) {
    var expectations = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        expectations[_i - 3] = arguments[_i];
    }
    return { callback: callback, name: name, signature: signature, expectations: expectations, _type: "FunctionDefinition" };
}
function expectationDescription(description, content) {
    var moreContents = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        moreContents[_i - 2] = arguments[_i];
    }
    var result = { description: description, expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "FunctionDefinition")
        result.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof (moreContents) == "object" && moreContents !== null)
        moreContents.forEach(function (c) {
            if (c._type == "FunctionDefinition")
                result.functions.push(c);
            else
                result.expectations.push(c);
        });
    return result;
}
function expectationSet(content) {
    var moreContents = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        moreContents[_i - 1] = arguments[_i];
    }
    var result = { expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "FunctionDefinition")
        result.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof (moreContents) == "object" && moreContents !== null)
        moreContents.forEach(function (c) {
            if (c._type == "FunctionDefinition")
                result.functions.push(c);
            else
                result.expectations.push(c);
        });
    return result;
}
function functionGroup(description, content) {
    var moreContents = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        moreContents[_i - 2] = arguments[_i];
    }
    var result = { description: description, expectations: [], sets: [], _type: "FunctionGroup" };
    var defaultExpectationSet = { expectations: [], functions: [], _type: "ExpectationSet" };
    if (content._type == "ExpectationSet")
        result.sets.push(content);
    else if (content._type == "FunctionDefinition")
        defaultExpectationSet.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof (moreContents) == "object" && moreContents !== null)
        moreContents.forEach(function (c) {
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
function genericFunctionGroup(description, getGenericArgs, content) {
    var moreContents = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        moreContents[_i - 3] = arguments[_i];
    }
    var result = { description: description, expectations: [], sets: [], _type: "FunctionGroup" };
    var defaultExpectationSet = { expectations: [], functions: [], getGenericArgs: getGenericArgs, _type: "ExpectationSet" };
    if (content._type == "ExpectationSet")
        result.sets.push(content);
    else if (content._type == "FunctionDefinition")
        defaultExpectationSet.functions.push(content);
    else
        result.expectations.push(content);
    if (typeof (moreContents) == "object" && moreContents !== null)
        moreContents.forEach(function (c) {
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
function functionTypeGroup(type, content) {
    var moreContents = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        moreContents[_i - 2] = arguments[_i];
    }
    var result = { type: type, expectations: [], groups: [], _type: "TypeGroup" };
    var defaultGroup = { expectations: [], sets: [], _type: "FunctionGroup" };
    var defaultExpectationSet = { expectations: [], functions: [], _type: "ExpectationSet" };
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
function describeTestFunction(expectations, funcDef, getGenericArgs) {
    mocha_1.describe('Testing function ' + funcDef.name + funcDef.signature, function () {
        var _this = this;
        funcDef.expectations.concat(funcDef.expectations).concat(expectations).forEach(function (e) {
            if (e._type == "ExpectIs") {
                var expectedType_1 = e.expectedType;
                e.argSets.forEach(function (a) {
                    it(funcDef.name + "(" + a.display + ") should return " + e.display, function () {
                        var args = a.getArgs();
                        if (typeof (getGenericArgs) == "function") {
                            var gArgs = getGenericArgs();
                            if (gArgs.length > 0)
                                args = args.concat(gArgs);
                        }
                        var target = funcDef.callback.apply(this, args);
                        chai_1.expect(target).is.a(expectedType_1, a.message);
                    });
                }, _this);
            }
            else {
                var expected_1 = e.getExpectedValue();
                e.argSets.forEach(function (a) {
                    it(funcDef.name + "(" + a.display + ") should return " + e.display, function () {
                        var args = a.getArgs();
                        if (typeof (getGenericArgs) == "function") {
                            var gArgs = getGenericArgs();
                            if (gArgs.length > 0)
                                args = args.concat(gArgs);
                        }
                        var target = funcDef.callback.apply(this, args);
                        chai_1.expect(target).to.equal(expected_1, a.message);
                    });
                }, _this);
            }
        }, this);
    });
}
function describeExpectationSet(expectations, expectationSet) {
    var setFunc = function () {
        var _this = this;
        expectationSet.functions.forEach(function (funcDef) {
            describeTestFunction.call(_this, expectations.concat(expectationSet.expectations), funcDef, expectationSet.getGenericArgs);
        }, this);
    };
    if (typeof (expectationSet.description) == "string" && expectationSet.description.trim().length > 0)
        mocha_1.describe(expectationSet.description, setFunc);
    else
        setFunc.call(this);
}
function describeFunctionGroups(expectations, functionGrp) {
    var testFunc = function () {
        var _this = this;
        functionGrp.sets.forEach(function (expectationSet) {
            describeExpectationSet.call(_this, expectations.concat(functionGrp.expectations), expectationSet);
        }, this);
    };
    if (typeof (functionGrp.description) == "string" && functionGrp.description.trim().length > 0)
        mocha_1.describe(functionGrp.description, testFunc);
    else
        testFunc.call(this);
}
function describeFunctionTypeGroups(functionTypeGroups) {
    functionTypeGroups.forEach(function (typeGroup) {
        mocha_1.describe('Testing ' + typeGroup.type + ' functions', function () {
            var _this = this;
            typeGroup.groups.forEach(function (functionGrp) {
                describeFunctionGroups.call(_this, typeGroup.expectations, functionGrp);
            }, this);
        });
    });
}
mocha_1.describe("Testing type gate functions", function () {
    var functionTypeGroups = [
        functionTypeGroup('nil gate', testFunction(JsTypeCommander_1.JsTypeCommander.notDefined, 'notDefined', '(obj?: TDefined): obj is undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNull, 'isNull', '(obj?: TDefined): obj is undefined', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNil, 'isNil', '(obj?: TDefined): obj is undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToFalse(argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [0]; }, '0'), argSet(function () { return [false]; }, 'false'), argSet(function () { return [""]; }, '""'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [[]]; }, '[]'))),
        functionTypeGroup('string gate', functionGroup('Testing type gate functions for any string', testFunction(JsTypeCommander_1.JsTypeCommander.isString, 'isString', '(obj?: TDefined): obj is string'), testFunction(JsTypeCommander_1.JsTypeCommander.isStringIfDef, 'isStringIfDef', '(obj?: TDefined): obj is string | undefined'), testFunction(JsTypeCommander_1.JsTypeCommander.isStringOrNull, 'isStringOrNull', '(obj?: TDefined): obj is string | null'), testFunction(JsTypeCommander_1.JsTypeCommander.isStringOrNil, 'isStringOrNil', '(obj?: TDefined): obj is string | null | undefined'), expectEqualToTrue(argSet(function () { return [" "]; }, '" "'), argSet(function () { return [" \n\r "]; }, '" \\n\\r "'), argSet(function () { return ["Test"]; }, '"Test"'), argSet(function () { return [" Test "]; }, '" Test "'))), functionGroup('Testing empty string type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyString, 'isEmptyString', '(obj?: TDefined): obj is string', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyStringIfDef, 'isEmptyStringIfDef', '(obj?: TDefined): obj is string | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyStringOrNull, 'isEmptyStringOrNull', '(obj?: TDefined): obj is string | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyStringOrNil, 'isEmptyStringOrNil', '(obj?: TDefined): obj is string | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToFalse(argSet(function () { return [" "]; }, '" "'), argSet(function () { return [" \n\r "]; }, '" \\n\\r "'), argSet(function () { return ["Test"]; }, '"Test"'), argSet(function () { return [" Test "]; }, '" Test "'))), functionGroup('Testing whitespace string type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyOrWhitespace, 'isEmptyOrWhitespace', '(obj?: TDefined): obj is string'), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyOrWhitespaceIfDef, 'isEmptyOrWhitespaceIfDef', '(obj?: TDefined): obj is string | undefined'), testFunction(JsTypeCommander_1.JsTypeCommander.isNullOrWhitespace, 'isNullOrWhitespace', '(obj?: TDefined): obj is string | null'), testFunction(JsTypeCommander_1.JsTypeCommander.isNilOrWhitespace, 'isNilOrWhitespace', '(obj?: TDefined): obj is string | null | undefined'), expectEqualToTrue(argSet(function () { return [" "]; }, '" "'), argSet(function () { return [" \n\r "]; }, '" \\n\\r "')), expectEqualToFalse(argSet(function () { return ["Test"]; }, '"Test"'), argSet(function () { return [" Test "]; }, '" Test "'))), expectEqualToTrue(argSet(function () { return [""]; }, '""')), expectEqualToFalse(argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [0]; }, '0'), argSet(function () { return [false]; }, 'false'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[""]]; }, '[""]'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [function () { return ""; }]; }, 'function() { return ""; }'))),
        functionTypeGroup('boolean gate', testFunction(JsTypeCommander_1.JsTypeCommander.isBoolean, 'isBoolean', '(obj?: TDefined): obj is boolean', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isBooleanIfDef, 'isBooleanIfDef', '(obj?: TDefined): obj is boolean | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isBooleanOrNull, 'isBooleanOrNull', '(obj?: TDefined): obj is boolean | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isBooleanOrNil, 'isBooleanOrNil', '(obj?: TDefined): obj is boolean | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToTrue(argSet(function () { return [true]; }, 'true'), argSet(function () { return [false]; }, 'false')), expectEqualToFalse(argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [0]; }, '0'), argSet(function () { return [""]; }, '""'), argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[true]]; }, '[true]'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), argSet(function () { return [function () { return true; }]; }, 'function() { return true; }'))),
        functionTypeGroup('number gate', expectationSet(testFunction(JsTypeCommander_1.JsTypeCommander.isNumber, 'isNumber', '(obj?: TDefined): obj is number', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"), argSet(function () { return [NaN]; }, "NaN"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNumberIfDef, 'isNumberIfDef', '(obj?: TDefined): obj is number | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"), argSet(function () { return [NaN]; }, "NaN"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNumberOrNull, 'isNumberOrNull', '(obj?: TDefined): obj is number | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [NaN]; }, "NaN"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNumberOrNil, 'isNumberOrNil', '(obj?: TDefined): obj is number | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [NaN]; }, "NaN"))), expectEqualToTrue(argSet(function () { return [1]; }, '1'), argSet(function () { return [0]; }, '0'), argSet(function () { return [0.0001]; }, '0.0001'), argSet(function () { return [-1]; }, '-1')), expectEqualToFalse(argSet(function () { return [Infinity]; }, "Infinity"), argSet(function () { return [Number.NEGATIVE_INFINITY]; }, "Number.NEGATIVE_INFINITY"), argSet(function () { return [Number.POSITIVE_INFINITY]; }, "Number.POSITIVE_INFINITY"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNumberNaNorNull, 'isNumberNaNorNull', '(obj?: TDefined): obj is number | null', expectEqualToTrue(argSet(function () { return [null]; }, "null"), argSet(function () { return [NaN]; }, "NaN"), argSet(function () { return [1]; }, '1'), argSet(function () { return [0]; }, '0'), argSet(function () { return [0.0001]; }, '0.0001'), argSet(function () { return [-1]; }, '-1'), argSet(function () { return [Infinity]; }, "Infinity"), argSet(function () { return [Number.NEGATIVE_INFINITY]; }, "Number.NEGATIVE_INFINITY"), argSet(function () { return [Number.POSITIVE_INFINITY]; }, "Number.POSITIVE_INFINITY")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isInfinite, 'isInfinite', '(obj?: TDefined): obj is number', expectEqualToTrue(argSet(function () { return [Infinity]; }, "Infinity"), argSet(function () { return [Number.NEGATIVE_INFINITY]; }, "Number.NEGATIVE_INFINITY"), argSet(function () { return [Number.POSITIVE_INFINITY]; }, "Number.POSITIVE_INFINITY")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"), argSet(function () { return [NaN]; }, "NaN"), argSet(function () { return [1]; }, '1'), argSet(function () { return [0]; }, '0'), argSet(function () { return [0.0001]; }, '0.0001'), argSet(function () { return [-1]; }, '-1'))), expectEqualToFalse(argSet(function () { return [true]; }, 'true'), argSet(function () { return [false]; }, 'false'), argSet(function () { return [""]; }, '""'), argSet(function () { return ["1"]; }, '"1"'), argSet(function () { return ["0"]; }, '"0"'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[1]]; }, '[1]'), argSet(function () { return [[0]]; }, '[0]'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), argSet(function () { return [function () { return true; }]; }, 'function() { return true; }'), argSet(function () { return [function () { return true; }]; }, 'function() { return NaN; }'))),
        functionTypeGroup('function gate', testFunction(JsTypeCommander_1.JsTypeCommander.isFunction, 'isFunction', '(obj?: TDefined): obj is Function', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isFunctionIfDef, 'isFunctionIfDef', '(obj?: TDefined): obj is Function | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isFunctionOrNull, 'isFunctionOrNull', '(obj?: TDefined): obj is Function | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isFunctionOrNil, 'isFunctionOrNil', '(obj?: TDefined): obj is Function | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToTrue(argSet(function () { return [function () { return true; }]; }, 'function() { return true; }')), expectEqualToFalse(argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [true]; }, 'true'), argSet(function () { return [""]; }, '""'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[function () { return true; }]]; }, '[function() { return true; }]'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'))),
        functionTypeGroup('object gate', functionGroup('Testing simple object type gate functions for object type', testFunction(JsTypeCommander_1.JsTypeCommander.isObjectType, 'isObjectType', '(obj?: TDefined): obj is object', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectTypeIfDef, 'isObjectTypeIfDef', '(obj?: TDefined): obj is object | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectTypeOrNull, 'isObjectTypeOrNull', '(obj?: TDefined): obj is object | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectTypeOrNil, 'isObjectTypeOrNil', '(obj?: TDefined): obj is object | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing any object type gate functions for objects which can have any named property', testFunction(JsTypeCommander_1.JsTypeCommander.isObject, 'isObject', '(obj?: TDefined): obj is IStringKeyedObject', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectIfDef, 'isObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectOrNull, 'isObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isObjectOrNil, 'isObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing type gate functions for non-array objects', testFunction(JsTypeCommander_1.JsTypeCommander.isNonArrayObject, 'isNonArrayObject', '(obj?: TDefined): obj is IStringKeyedObject', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNonArrayObjectIfDef, 'isNonArrayObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNonArrayObjectOrNull, 'isNonArrayObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isNonArrayObjectOrNil, 'isNonArrayObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing type gate functions for plain objects', testFunction(JsTypeCommander_1.JsTypeCommander.isPlainObject, 'isPlainObject', '(obj?: TDefined): obj is IStringKeyedObject', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isPlainObjectIfDef, 'isPlainObjectIfDef', '(obj?: TDefined): obj is IStringKeyedObject | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isPlainObjectOrNull, 'isPlainObjectOrNull', '(obj?: TDefined): obj is IStringKeyedObject | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isPlainObjectOrNil, 'isPlainObjectOrNil', '(obj?: TDefined): obj is IStringKeyedObject | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))))),
        functionTypeGroup('Array gate', functionGroup('Testing normal array type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isArray, 'isObjectType', '(obj?: TDefined): obj is AnyNilable[]', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayIfDef, 'isArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayOrNull, 'isArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayOrNil, 'isArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing normal array type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isArray, 'isArray', '(obj?: TDefined): obj is AnyNilable[]', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayIfDef, 'isArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayOrNull, 'isArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayOrNil, 'isArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing empty array type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArray, 'isEmptyArray', '(obj?: TDefined): obj is AnyNilable[]', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArray, 'isEmptyArray', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[]', expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayIfDef, 'isEmptyArrayIfDef', '(obj?: TDefined): obj is AnyNilable[] | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayIfDef, 'isEmptyArrayIfDef', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayOrNull, 'isEmptyArrayOrNull', '(obj?: TDefined): obj is AnyNilable[] | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayOrNull, 'isEmptyArrayOrNull', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayOrNil, 'isEmptyArrayOrNil', '(obj?: TDefined): obj is AnyNilable[] | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isEmptyArrayOrNil, 'isEmptyArrayOrNil', '(obj: TDefined, checkElements: boolean): obj is AnyNilable[] | null | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null")))), functionGroup('Testing ArrayLike type gate functions', testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLike, 'isArrayLike', '(obj?: TDefined): obj is ArrayLike<AnyNilable>', expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLike, 'isArrayLike', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable>', expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeIfDef, 'isArrayLikeIfDef', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeIfDef, 'isArrayLikeIfDef', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeOrNull, 'isArrayLikeOrNull', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeOrNull, 'isArrayLikeOrNull', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeOrNil, 'isArrayLikeOrNil', '(obj?: TDefined): obj is ArrayLike<AnyNilable> | null | undefined', expectEqualToTrue(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToFalse(argSet(function () { return []; }, ""), argSet(function () { return [undefined]; }, "undefined")), testFunction(JsTypeCommander_1.JsTypeCommander.isArrayLikeOrNil, 'isArrayLikeOrNil', '(obj: TDefined, checkElements: boolean): obj is ArrayLike<AnyNilable> | null | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))))),
        functionTypeGroup('derrivation gate', genericFunctionGroup('Testing Error class derrivation functions', function () { return [Error]; }, testFunction(JsTypeCommander_1.JsTypeCommander.derivesFrom, 'derivesFrom<Error>', '(obj?: TDefined, Error): obj is Error', expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<Error>', '(obj?: TDefined, Error): obj is Error | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<Error>', '(obj?: TDefined, Error): obj is Error | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<Error>', '(obj?: TDefined, Error): obj is Error | null | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToTrue(argSet(function () { return [new Error()]; }, 'new Error()'), argSet(function () { return [new RangeError()]; }, 'new RangeError()')), expectEqualToFalse(argSet(function () { return [new TestErrorLike()]; }, 'new TestErrorLike()'), argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [true]; }, 'true'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[new Error()]]; }, '[new Error()]'))), genericFunctionGroup('Testing Error class derrivation functions', function () { return [RangeError]; }, testFunction(JsTypeCommander_1.JsTypeCommander.derivesFrom, 'derivesFrom<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError', expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<RangeError>', '(obj?: TDefined, RangeError): obj is RangeError | null | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToTrue(argSet(function () { return [new RangeError()]; }, 'new RangeError()')), expectEqualToFalse(argSet(function () { return [new Error()]; }, 'new Error()'), argSet(function () { return [new TestErrorLike()]; }, 'new TestErrorLike()'), argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [true]; }, 'true'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[new RangeError()]]; }, '[new RangeError()]'))), genericFunctionGroup('Testing custom class derrivation functions', function () { return [TestErrorLike]; }, testFunction(JsTypeCommander_1.JsTypeCommander.derivesFrom, 'derivesFrom<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike', expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromIfDef, 'derivesFromIfDef<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined")), expectEqualToFalse(argSet(function () { return [null]; }, "null"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNull, 'derivesFromOrNull<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | null', expectEqualToTrue(argSet(function () { return [null]; }, "null")), expectEqualToFalse(argSet(function () { return [undefined]; }, "undefined"))), testFunction(JsTypeCommander_1.JsTypeCommander.derivesFromOrNil, 'derivesFromOrNil<TestErrorLike>', '(obj?: TDefined, TestErrorLike): obj is TestErrorLike | null | undefined', expectEqualToTrue(argSet(function () { return [undefined]; }, "undefined"), argSet(function () { return [null]; }, "null"))), expectEqualToTrue(argSet(function () { return [new TestErrorLike()]; }, 'new TestErrorLike()'), argSet(function () { return [new TestErrorLike2()]; }, 'new TestErrorLike2()'), argSet(function () { return [new TestErrorLike3()]; }, 'new TestErrorLike3()')), expectEqualToFalse(argSet(function () { return [new RangeError()]; }, 'new RangeError()'), argSet(function () { return [new Error()]; }, 'new Error()'), argSet(function () { return [new TestErrorLike()]; }, 'new TestErrorLike()'), argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [true]; }, 'true'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[new RangeError()]]; }, '[new RangeError()]')))),
        functionTypeGroup('ErrorLike gate', testFunction(JsTypeCommander_1.JsTypeCommander.isErrorLike, 'isErrorLike', '(obj?: TDefined): obj is boolean', expectEqualToTrue(argSet(function () { return [new RangeError()]; }, 'new RangeError()'), argSet(function () { return [new Error()]; }, 'new Error()'), argSet(function () { return [new TestErrorLike()]; }, 'new TestErrorLike()'), argSet(function () { return [new TestErrorLike2()]; }, 'new TestErrorLike2()')), expectEqualToFalse(argSet(function () { return [NaN]; }, 'NaN'), argSet(function () { return [1]; }, '1'), argSet(function () { return [0]; }, '0'), argSet(function () { return [""]; }, '""'), argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[true]]; }, '[true]'), argSet(function () { return [{}]; }, '{}'), argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), argSet(function () { return [function () { return true; }]; }, 'function() { return true; }'))))
    ];
    describeFunctionTypeGroups(functionTypeGroups);
});
mocha_1.describe("Testing type conversion functions", function () {
    var functionTypeGroups = [
        functionTypeGroup('string conversion', testFunction(JsTypeCommander_1.JsTypeCommander.asString, 'asString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): Nilable<string>', expectIsA('undefined', argSet(function () { return [undefined]; }, 'undefined'), argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), expectIsA('null', argSet(function () { return [null]; }, 'null'), argSet(function () { return [undefined, null]; }, 'undefined, null'), argSet(function () { return [null, undefined]; }, 'null, undefined')), expectEqualTo('""', function () { return ""; }, argSet(function () { return [""]; }, '""'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[""]]; }, '[""]'), argSet(function () { return ["", undefined]; }, '"", undefined'), argSet(function () { return ["", null]; }, '"", null'), argSet(function () { return [undefined, ""]; }, 'undefined, ""'), argSet(function () { return [null, ""]; }, 'null, ""')), expectEqualTo('"true"', function () { return "true"; }, argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return [true,]; }, 'true')), expectEqualTo('"false"', function () { return "false"; }, argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [false,]; }, 'false')), expectEqualTo('" "', function () { return " "; }, argSet(function () { return [" ", "yes"]; }, '" ", "yes"'), argSet(function () { return [" ", "yes", false]; }, '" ", "yes", false')), expectEqualTo('"yes"', function () { return "yes"; }, argSet(function () { return [" ", "yes", true]; }, '" ", "yes", true')), expectEqualTo('"yes"', function () { return "yes"; }, argSet(function () { return [" \n\r ", "yes", true]; }, '" \\n\\r ", "yes", true'))), testFunction(JsTypeCommander_1.JsTypeCommander.toString, 'toString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): string', expectEqualTo('""', function () { return ""; }, argSet(function () { return [undefined]; }, 'undefined'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [[""]]; }, '[""]'), argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), argSet(function () { return [null]; }, 'null'), argSet(function () { return [undefined, null]; }, 'undefined, null'), argSet(function () { return [null, undefined]; }, 'null, undefined'), argSet(function () { return [""]; }, '""'), argSet(function () { return ["", undefined]; }, '"", undefined'), argSet(function () { return ["", null]; }, '"", null'), argSet(function () { return [undefined, ""]; }, 'undefined, ""'), argSet(function () { return [null, ""]; }, 'null, ""')), expectEqualTo('"true"', function () { return "true"; }, argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return [true,]; }, 'true')), expectEqualTo('"false"', function () { return "false"; }, argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [false]; }, 'false')), expectEqualTo('" "', function () { return " "; }, argSet(function () { return [" ", "yes"]; }, '" ", "yes"'), argSet(function () { return [" ", "yes", false]; }, '" ", "yes", false')), expectEqualTo('"yes"', function () { return "yes"; }, argSet(function () { return [" ", "yes", true]; }, '" ", "yes", true')), expectEqualTo('"yes"', function () { return "yes"; }, argSet(function () { return [" \n\r ", "yes", true]; }, '" \\n\\r ", "yes", true')), expectEqualTo('"NaN"', function () { return "NaN"; }, argSet(function () { return [NaN, "yes", true]; }, 'NaN, "yes", true')), expectEqualTo('"0"', function () { return "0"; }, argSet(function () { return [0, "yes", true]; }, '0, "yes", true')), expectEqualTo('"true,false"', function () { return "true,false"; }, argSet(function () { return [[true, false], "yes", true]; }, '[true, false], "yes", true')))),
        functionTypeGroup('boolean conversion', testFunction(JsTypeCommander_1.JsTypeCommander.asBoolean, 'asBoolean', '(obj?: TDefined): Nilable<boolean>): Nilable<boolean>', expectIsA('undefined', argSet(function () { return [undefined]; }, 'undefined'), argSet(function () { return [""]; }, '""'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), expectIsA('null', argSet(function () { return [null]; }, 'null'), argSet(function () { return [undefined, null]; }, 'undefined, null'), argSet(function () { return [null, undefined]; }, 'null, undefined')), expectEqualTo('true', function () { return true; }, argSet(function () { return [true]; }, 'true'), argSet(function () { return [1]; }, '1'), argSet(function () { return [-1]; }, '-1'), argSet(function () { return [100]; }, '100'), argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return [[true]]; }, '[true]'), argSet(function () { return [true, undefined]; }, 'true, undefined'), argSet(function () { return [true, null]; }, 'true, null'), argSet(function () { return [undefined, true]; }, 'undefined, true'), argSet(function () { return [null, true]; }, 'null, true'), argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), argSet(function () { return [true, false]; }, 'true, false')), expectEqualTo('false', function () { return false; }, argSet(function () { return [false]; }, 'false'), argSet(function () { return [0]; }, '0'), argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [[false]]; }, '[false]'), argSet(function () { return [false, undefined]; }, 'false, undefined'), argSet(function () { return [false, null]; }, 'false, null'), argSet(function () { return [undefined, false]; }, 'undefined, false'), argSet(function () { return [null, false]; }, 'null, false'), argSet(function () { return [false, true]; }, 'false, true'))), testFunction(JsTypeCommander_1.JsTypeCommander.toBoolean, 'toBoolean', '(obj?: TDefined): Nilable<boolean>): boolean', expectEqualTo('true', function () { return true; }, argSet(function () { return [true]; }, 'true'), argSet(function () { return [1]; }, '1'), argSet(function () { return [-1]; }, '-1'), argSet(function () { return [100]; }, '100'), argSet(function () { return ["true"]; }, '"true"'), argSet(function () { return [[true]]; }, '[true]'), argSet(function () { return [true, undefined]; }, 'true, undefined'), argSet(function () { return [true, null]; }, 'true, null'), argSet(function () { return [undefined, true]; }, 'undefined, true'), argSet(function () { return [null, true]; }, 'null, true'), argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), argSet(function () { return [true, false]; }, 'true, false')), expectEqualTo('false', function () { return false; }, argSet(function () { return [false]; }, 'false'), argSet(function () { return [0]; }, '0'), argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), argSet(function () { return ["false"]; }, '"false"'), argSet(function () { return [[false]]; }, '[false]'), argSet(function () { return [false, undefined]; }, 'false, undefined'), argSet(function () { return [false, null]; }, 'false, null'), argSet(function () { return [undefined, false]; }, 'undefined, false'), argSet(function () { return [null, false]; }, 'null, false'), argSet(function () { return [false, true]; }, 'false, true'), argSet(function () { return [undefined]; }, 'undefined'), argSet(function () { return [""]; }, '""'), argSet(function () { return [[]]; }, '[]'), argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), argSet(function () { return [null]; }, 'null'), argSet(function () { return [undefined, null]; }, 'undefined, null'), argSet(function () { return [null, undefined]; }, 'null, undefined'))))
    ];
    describeFunctionTypeGroups(functionTypeGroups);
    mocha_1.describe("Testing number type conversion functions", function () {
        mocha_1.describe("Testing function asNumber(obj?: TDefined): Nilable<number>", function () {
        });
        mocha_1.describe("Testing function asNumber(obj?: TDefined, defaultValue?: Nullable<number>): Nilable<number>", function () {
        });
        mocha_1.describe("Testing function toNumber(obj?: TDefined): number", function () {
        });
        mocha_1.describe("Testing function toNumber(obj?: TDefined, defaultValue?: Nullable<number>): number", function () {
        });
    });
    mocha_1.describe("Testing function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]", function () {
    });
    mocha_1.describe("Testing function asErrorLike(obj?: TDefined): Nilable<ErrorLike>", function () {
    });
});
mocha_1.describe("Testing string manipulation functions", function () {
    mocha_1.describe("Testing function trimStart(text: string): string", function () {
    });
    mocha_1.describe("Testing function trimEnd(text: string): string", function () {
    });
    mocha_1.describe("Testing function asNormalizedWs(text: string): string", function () {
    });
    mocha_1.describe("Testing function ucFirst(text: string): string", function () {
    });
    mocha_1.describe("Testing function splitLines(text: string): string[]", function () {
    });
    mocha_1.describe("Testing function indentText(text: string | string[], indent?: string): string", function () {
    });
    mocha_1.describe("Testing function indentLines(text: string[] | string, indent?: string): string[]", function () {
    });
});
mocha_1.describe("Testing function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any", function () {
});
