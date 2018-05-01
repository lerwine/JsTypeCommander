"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
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
