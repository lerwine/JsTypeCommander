import { expect } from 'chai';
import { assert } from 'chai';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';
import { truncate } from 'fs';

describe("Testing module options settings", function() {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
    });
    describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n", then getDefaultLineSeparatorSequence() should return "\\r\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            expect(result).to.a('string');
            expect(result).to.equal("\r\n");
            result = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string', "validation is not a string");
            expect(result).to.equal("\r\n", "Validation failed");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n", then getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
            result = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string', "validation is not a string");
            expect(result).to.equal("\n", "Validation failed");
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
    describe("Test JsTypeCommander.setPatternOptions() expressions", function() {
        let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = JsTypeCommander.setPatternOptions(); } catch { regexOptionResult = undefined; }
        let originals: JsTypeCommander.IJsTypeCommanderRegex;
        let testRe = /.*/;
        let testDataArr: {
            name: string,
            original: RegExp,
            getRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; }
            setRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegexOpt, value: RegExp): void; }
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
                    let arg: JsTypeCommander.IJsTypeCommanderRegexOpt = { };
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