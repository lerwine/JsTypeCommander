"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
mocha_1.describe("Testing module options settings", function () {
    mocha_1.describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\n");
        });
    });
    mocha_1.describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n", then getDefaultLineSeparatorSequence() should return "\\r\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\r\n");
            result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string', "validation is not a string");
            chai_1.expect(result).to.equal("\r\n", "Validation failed");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n", then getDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.JsTypeCommander.setDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string');
            chai_1.expect(result).to.equal("\n");
            result = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
            chai_1.expect(result).to.a('string', "validation is not a string");
            chai_1.expect(result).to.equal("\n", "Validation failed");
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
    mocha_1.describe("Test JsTypeCommander.setPatternOptions() expressions", function () {
        var regexOptionResult;
        try {
            regexOptionResult = JsTypeCommander_1.JsTypeCommander.setPatternOptions();
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
