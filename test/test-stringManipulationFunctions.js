"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
var newLine = JsTypeCommander_1.JsTypeCommander.getDefaultLineSeparatorSequence();
var testData = [
    {
        fName: 'trimStart',
        signature: '(text: string): string',
        callback: JsTypeCommander_1.JsTypeCommander.trimStart,
        tests: [
            { args: [""], expected: "" }, { args: [" "], expected: "" }, { args: ["\r"], expected: "" }, { args: ["\n"], expected: "" }, { args: [" \r\n "], expected: "" },
            { args: [" \r\n \r\n "], expected: "" },
            { args: ["Test \n\r\t Text"], expected: "Test \n\r\t Text" }, { args: [" Test \n\r\t Text "], expected: "Test \n\r\t Text " },
            { args: ["\n\r Test \n\r\t Text \t"], expected: "Test \n\r\t Text \t" },
            { args: ["\n\r Test \n\r\t Text \n\r"], expected: "Test \n\r\t Text \n\r" }
        ]
    }, {
        fName: 'trimEnd',
        signature: '(text: string): string',
        callback: JsTypeCommander_1.JsTypeCommander.trimEnd,
        tests: [
            { args: [""], expected: "" }, { args: [" "], expected: "" }, { args: ["\r"], expected: "" }, { args: ["\n"], expected: "" }, { args: [" \r\n "], expected: "" },
            { args: [" \r\n \r\n "], expected: "" },
            { args: ["Test \n\r\t Text"], expected: "Test \n\r\t Text" }, { args: [" Test \n\r\t Text "], expected: " Test \n\r\t Text" },
            { args: ["\t\n\r Test \n\r\t Text \t"], expected: "\t\n\r Test \n\r\t Text" },
            { args: ["\n\r Test \n\r\t Text \n\r"], expected: "\n\r Test \n\r\t Text" }
        ]
    }, {
        fName: 'asNormalizedWs',
        signature: '(text: string): string',
        callback: JsTypeCommander_1.JsTypeCommander.asNormalizedWs,
        tests: [
            { args: [""], expected: "" }, { args: [" "], expected: "" }, { args: ["\r"], expected: "" }, { args: ["\n"], expected: "" }, { args: [" \r\n "], expected: "" },
            { args: [" \r\n \r\n "], expected: "" },
            { args: ["Test \n\r\t Text"], expected: "Test Text" }, { args: [" test \n\r\t Text "], expected: "test Text" },
            { args: ["\t\n\r Test \n\r\t text \t"], expected: "Test text" },
            { args: ["\n\r Test \n\r\t Text \n\r"], expected: "Test Text" }
        ]
    }, {
        fName: 'ucFirst',
        signature: '(text: string): string',
        callback: JsTypeCommander_1.JsTypeCommander.ucFirst,
        tests: [
            { args: [""], expected: "" }, { args: [" "], expected: " " }, { args: ["\r"], expected: "\r" }, { args: ["\n"], expected: "\n" }, { args: [" \r\n "], expected: " \r\n " },
            { args: [" \r\n \r\n "], expected: " \r\n \r\n " }, { args: ["test"], expected: "Test" }, { args: ["Test \n\r\t Text"], expected: "Test \n\r\t Text" },
            { args: ["test \n\r\t text"], expected: "Test \n\r\t text" }, { args: [" test \ntext "], expected: " Test \ntext " },
            { args: ["\t\n\r test \n\r\t text \t"], expected: "\t\n\r Test \n\r\t text \t" },
            { args: ["\n\r.?test \n\r\t text \n\r"], expected: "\n\r.?Test \n\r\t text \n\r" }
        ]
    }, {
        fName: 'splitLines',
        signature: '(text: string): string[]',
        callback: JsTypeCommander_1.JsTypeCommander.splitLines,
        tests: [
            { args: [""], expected: [""] }, { args: [" "], expected: [" "] }, { args: ["\r"], expected: ["", ""] }, { args: ["\n"], expected: ["", ""] },
            { args: ["Test"], expected: ["Test"] }, { args: [" \r\n "], expected: [" ", " "] },
            { args: [" \r\n \r\n "], expected: [" ", " ", " "] }, { args: [" \r\n \n\r "], expected: [" ", " ", "", " "] },
            { args: ["Test \n\r\t Text"], expected: ["Test ", "", "\t Text"] }, { args: [" Test \ntext "], expected: [" Test ", "text "] },
            { args: ["\t\n\r test \n\r\t text \t"], expected: ["\t", "", " test ", "", "\t text \t"] },
            { args: ["\n.?Test \r\n\t text \n"], expected: ["", ".?Test ", "\t text ", ""] },
            { args: ["\r\n.?Test \r\n\t text \n"], expected: ["", ".?Test ", "\t text ", ""] },
            { args: ["\n\r.?Test \r\n\t text \n"], expected: ["", "", ".?Test ", "\t text ", ""] }
        ]
    }, {
        fName: 'indentText',
        signature: '(text: string|string[], indent?: string): string',
        callback: JsTypeCommander_1.JsTypeCommander.indentText,
        tests: [
            { args: [""], expected: "" }, { args: [" "], expected: "" }, { args: ["\r"], expected: newLine }, { args: ["\n"], expected: newLine },
            { args: [" \r\n "], expected: newLine },
            { args: [" \r\n \r\n "], expected: newLine + newLine }, { args: [" \r\n \n\r "], expected: newLine + newLine + newLine },
            { args: ["test"], expected: "\ttest" }, { args: ["Test \n\r\t Text"], expected: "\tTest" + newLine + newLine + "\t\t Text" },
            { args: ["test \n\r\t text"], expected: "\ttest" + newLine + newLine + "\t\t text" }, { args: [" Test \ntext "], expected: "\t Test" + newLine + "\ttext" },
            { args: ["\t\n\r test \n\r\t text \t"], expected: newLine + newLine + "\t test" + newLine + newLine + "\t\t text" },
            { args: ["\r\n\t.?Test \r\n\t\t text \r\n"], expected: newLine + "\t\t.?Test" + newLine + "\t\t\t text" + newLine },
            { args: ["\n\r\t.?Test \n\r\t\t text \n\r"], expected: newLine + newLine + "\t\t.?Test" + newLine + newLine + "\t\t\t text" + newLine + newLine },
            { args: [[""]], expected: "" }, { args: [[" "]], expected: "" }, { args: [["\r"]], expected: newLine }, { args: [["\n"]], expected: newLine },
            { args: [[" \r\n "]], expected: newLine },
            { args: [[" \r\n \r\n "]], expected: newLine + newLine }, { args: [[" \r\n \n\r "]], expected: newLine + newLine + newLine },
            { args: [["test"]], expected: "\ttest" }, { args: [["Test \n\r\t Text"]], expected: "\tTest" + newLine + newLine + "\t\t Text" },
            { args: [["test \n\r\t text"]], expected: "\ttest" + newLine + newLine + "\t\t text" }, { args: [[" Test \ntext "]], expected: "\t Test" + newLine + "\ttext" },
            { args: [["\t\n\r test \n\r\t text \t"]], expected: newLine + newLine + "\t test" + newLine + newLine + "\t\t text" },
            { args: [["\r\n\t.?Test \r\n\t\t text \r\n"]], expected: newLine + "\t\t.?Test" + newLine + "\t\t\t text" + newLine },
            { args: [["\n\r\t.?Test \n\r\t\t text \n\r"]], expected: newLine + newLine + "\t\t.?Test" + newLine + newLine + "\t\t\t text" + newLine + newLine },
            { args: [["", ""]], expected: newLine }, { args: [[" ", " ", " "]], expected: newLine + newLine }, { args: [[" ", " ", "", " "]], expected: newLine + newLine + newLine },
            { args: [["Test ", "", "\t Text"]], expected: "\tTest" + newLine + newLine + "\t\t Text" },
            { args: [["test ", "", "\t text"]], expected: "\ttest" + newLine + newLine + "\t\t text" },
            { args: [["\t", "", " test ", "", "\t text \t"]], expected: newLine + newLine + "\t test" + newLine + newLine + "\t\t text" },
            { args: [["", "\t.?Test ", "\t\t text ", ""]], expected: newLine + "\t\t.?Test" + newLine + "\t\t\t text" + newLine },
            { args: [["", "", "\t.?Test ", "", "\t\t text ", "", ""]], expected: newLine + newLine + "\t\t.?Test" + newLine + newLine + "\t\t\t text" + newLine + newLine },
            { args: [["", "\n"]], expected: newLine + newLine }, { args: [[" ", "\n ", " "]], expected: newLine + newLine + newLine },
            { args: [["Test ", "", "\t\nText"]], expected: "\tTest" + newLine + newLine + newLine + "\tText" },
            { args: [["test ", "", "\t\ntext"]], expected: "\ttest" + newLine + newLine + newLine + "\ttext" },
            { args: [["\t", "", " test ", "\r", "\t text \t"]], expected: newLine + newLine + "\t test" + newLine + newLine + newLine + "\t\t text" },
            { args: [["\n\r\n", "\t.?Test ", "\t\t text ", ""]], expected: newLine + newLine + newLine + "\t\t.?Test" + newLine + "\t\t\t text" + newLine },
            { args: [["\r\n\r", "", "\t.?Test ", "", "\t\t text ", "", ""]], expected: newLine + newLine + newLine + newLine + "\t\t.?Test" + newLine + newLine + "\t\t\t text" + newLine + newLine },
            { args: ["", ".."], expected: "" }, { args: [" ", ".."], expected: "" }, { args: ["\r", ".."], expected: newLine }, { args: ["\n", ".."], expected: newLine },
            { args: [" \r\n ", ".."], expected: newLine },
            { args: [" \r\n \r\n ", ".."], expected: newLine + newLine }, { args: [" \r\n \n\r ", ".."], expected: newLine + newLine + newLine },
            { args: ["test", ".."], expected: "..test" }, { args: ["Test \n\r\t Text", ".."], expected: "..Test" + newLine + newLine + "..\t Text" },
            { args: ["test \n\r\t text", ".."], expected: "..test" + newLine + newLine + "..\t text" }, { args: [" Test \ntext ", ".."], expected: ".. Test" + newLine + "..text" },
            { args: ["\t\n\r test \n\r\t text \t", ".."], expected: newLine + newLine + ".. test" + newLine + newLine + "..\t text" },
            { args: ["\r\n\t.?Test \r\n\t\t text \r\n", ".."], expected: newLine + "..\t.?Test" + newLine + "..\t\t text" + newLine },
            { args: ["\n\r\t.?Test \n\r\t\t text \n\r", ".."], expected: newLine + newLine + "..\t.?Test" + newLine + newLine + "..\t\t text" + newLine + newLine },
            { args: [[""], ".."], expected: "" }, { args: [[" "], ".."], expected: "" }, { args: [["\r"], ".."], expected: newLine }, { args: [["\n"], ".."], expected: newLine },
            { args: [[" \r\n "], ".."], expected: newLine },
            { args: [[" \r\n \r\n "], ".."], expected: newLine + newLine }, { args: [[" \r\n \n\r "], ".."], expected: newLine + newLine + newLine },
            { args: [["test"], ".."], expected: "..test" }, { args: [["Test \n\r\t Text"], ".."], expected: "..Test" + newLine + newLine + "..\t Text" },
            { args: [["test \n\r\t text"], ".."], expected: "..test" + newLine + newLine + "..\t text" }, { args: [[" Test \ntext "], ".."], expected: ".. Test" + newLine + "..text" },
            { args: [["\t\n\r test \n\r\t text \t"], ".."], expected: newLine + newLine + ".. test" + newLine + newLine + "..\t text" },
            { args: [["\r\n\t.?Test \r\n\t\t text \r\n"], ".."], expected: newLine + "..\t.?Test" + newLine + "..\t\t text" + newLine },
            { args: [["\n\r\t.?Test \n\r\t\t text \n\r"], ".."], expected: newLine + newLine + "..\t.?Test" + newLine + newLine + "..\t\t text" + newLine + newLine },
            { args: [["", ""], ".."], expected: newLine }, { args: [[" ", " ", " "], ".."], expected: newLine + newLine }, { args: [[" ", " ", "", " "], ".."], expected: newLine + newLine + newLine },
            { args: [["Test ", "", "\t Text"], ".."], expected: "..Test" + newLine + newLine + "..\t Text" },
            { args: [["test ", "", "\t text"], ".."], expected: "..test" + newLine + newLine + "..\t text" },
            { args: [["\t", "", " test ", "", "\t text \t"], ".."], expected: newLine + newLine + ".. test" + newLine + newLine + "..\t text" },
            { args: [["", "\t.?Test ", "\t\t text ", ""], ".."], expected: newLine + "..\t.?Test" + newLine + "..\t\t text" + newLine },
            { args: [["", "", "\t.?Test ", "", "\t\t text ", "", ""], ".."], expected: newLine + newLine + "..\t.?Test" + newLine + newLine + "..\t\t text" + newLine + newLine },
            { args: [["", "\n"], ".."], expected: newLine + newLine }, { args: [[" ", "\n ", " "], ".."], expected: newLine + newLine + newLine },
            { args: [["Test ", "", "\t\nText"], ".."], expected: "..Test" + newLine + newLine + newLine + "..Text" },
            { args: [["test ", "", "\t\ntext"], ".."], expected: "..test" + newLine + newLine + newLine + "..text" },
            { args: [["\t", "", " test ", "\r", "\t text \t"], ".."], expected: newLine + newLine + ".. test" + newLine + newLine + newLine + "..\t text" },
            { args: [["\n\r\n", "\t.?Test ", "\t\t text ", ""], ".."], expected: newLine + newLine + newLine + "..\t.?Test" + newLine + "..\t\t text" + newLine },
            { args: [["\r\n\r", "", "\t.?Test ", "", "\t\t text ", "", ""], ".."], expected: newLine + newLine + newLine + newLine + "..\t.?Test" + newLine + newLine + "..\t\t text" + newLine + newLine },
        ]
    }, {
        fName: 'indentLines',
        signature: '(text: string|string[], indent?: string): string[]',
        callback: JsTypeCommander_1.JsTypeCommander.indentLines,
        tests: [
            { args: [""], expected: [""] }, { args: [" "], expected: [""] }, { args: ["\r"], expected: ["", ""] }, { args: ["\n"], expected: ["", ""] },
            { args: [" \r\n "], expected: ["", ""] },
            { args: [" \r\n \r\n "], expected: ["", "", ""] }, { args: [" \r\n \n\r "], expected: ["", "", "", ""] },
            { args: ["test"], expected: ["\ttest"] }, { args: ["Test \n\r\t Text"], expected: ["\tTest", "", "\t\t Text"] },
            { args: ["test \n\r\t text"], expected: ["\ttest", "", "\t\t text"] }, { args: [" Test \ntext "], expected: ["\t Test", "\ttext"] },
            { args: ["\t\n\r test \n\r\t text \t"], expected: ["", "", "\t test", "", "\t\t text"] },
            { args: ["\r\n\t.?Test \r\n\t\t text \r\n"], expected: ["", "\t\t.?Test", "\t\t\t text", ""] },
            { args: ["\n\r\t.?Test \n\r\t\t text \n\r"], expected: ["", "", "\t\t.?Test", "", "\t\t\t text", "", ""] },
            { args: [[""]], expected: [""] }, { args: [[" "]], expected: [""] }, { args: [["\r"]], expected: ["", ""] }, { args: [["\n"]], expected: ["", ""] },
            { args: [[" \r\n "]], expected: ["", ""] },
            { args: [[" \r\n \r\n "]], expected: ["", "", ""] }, { args: [[" \r\n \n\r "]], expected: ["", "", "", ""] },
            { args: [["test"]], expected: ["\ttest"] }, { args: [["Test \n\r\t Text"]], expected: ["\tTest", "", "\t\t Text"] },
            { args: [["test \n\r\t text"]], expected: ["\ttest", "", "\t\t text"] }, { args: [[" Test \ntext "]], expected: ["\t Test", "\ttext"] },
            { args: [["\t\n\r test \n\r\t text \t"]], expected: ["", "", "\t test", "", "\t\t text"] },
            { args: [["\r\n\t.?Test \r\n\t\t text \r\n"]], expected: ["", "\t\t.?Test", "\t\t\t text", ""] },
            { args: [["\n\r\t.?Test \n\r\t\t text \n\r"]], expected: ["", "", "\t\t.?Test", "", "\t\t\t text", "", ""] },
            { args: [["", ""]], expected: ["", ""] }, { args: [[" ", " ", " "]], expected: ["", "", ""] }, { args: [[" ", " ", "", " "]], expected: ["", "", "", ""] },
            { args: [["Test ", "", "\t Text"]], expected: ["\tTest", "", "\t\t Text"] },
            { args: [["test ", "", "\t text"]], expected: ["\ttest", "", "\t\t text"] },
            { args: [["\t", "", " test ", "", "\t text \t"]], expected: ["", "", "\t test", "", "\t\t text"] },
            { args: [["", "\t.?Test ", "\t\t text ", ""]], expected: ["", "\t\t.?Test", "\t\t\t text", ""] },
            { args: [["", "", "\t.?Test ", "", "\t\t text ", "", ""]], expected: ["", "", "\t\t.?Test", "", "\t\t\t text", "", ""] },
            { args: [["", "\n"]], expected: ["", "", ""] }, { args: [[" ", "\n ", " "]], expected: ["", "", "", ""] },
            { args: [["Test ", "", "\t\nText"]], expected: ["\tTest" + "", "", "", "\tText"] },
            { args: [["test ", "", "\t\ntext"]], expected: ["\ttest" + "", "", "", "\ttext"] },
            { args: [["\t", "", " test ", "\r", "\t text \t"]], expected: ["", "", "\t test", "", "", "\t\t text"] },
            { args: [["\n\r\n", "\t.?Test ", "\t\t text ", ""]], expected: ["", "", "", "\t\t.?Test", "\t\t\t text", ""] },
            { args: [["\r\n\r", "", "\t.?Test ", "", "\t\t text ", "", ""]], expected: ["", "", "", "", "\t\t.?Test", "", "\t\t\t text", "", ""] },
            { args: ["", ".."], expected: [""] }, { args: [" ", ".."], expected: [""] }, { args: ["\r", ".."], expected: ["", ""] }, { args: ["\n", ".."], expected: ["", ""] },
            { args: [" \r\n ", ".."], expected: ["", ""] },
            { args: [" \r\n \r\n ", ".."], expected: ["", "", ""] }, { args: [" \r\n \n\r ", ".."], expected: ["", "", "", ""] },
            { args: ["test", ".."], expected: ["..test"] }, { args: ["Test \n\r\t Text", ".."], expected: ["..Test", "", "..\t Text"] },
            { args: ["test \n\r\t text", ".."], expected: ["..test", "", "..\t text"] }, { args: [" Test \ntext ", ".."], expected: [".. Test", "..text"] },
            { args: ["\t\n\r test \n\r\t text \t", ".."], expected: ["", "", ".. test", "", "..\t text"] },
            { args: ["\r\n\t.?Test \r\n\t\t text \r\n", ".."], expected: ["", "..\t.?Test", "..\t\t text", ""] },
            { args: ["\n\r\t.?Test \n\r\t\t text \n\r", ".."], expected: ["", "", "..\t.?Test", "", "..\t\t text", "", ""] },
            { args: [[""], ".."], expected: [""] }, { args: [[" "], ".."], expected: [""] }, { args: [["\r"], ".."], expected: ["", ""] }, { args: [["\n"], ".."], expected: ["", ""] },
            { args: [[" \r\n "], ".."], expected: ["", ""] },
            { args: [[" \r\n \r\n "], ".."], expected: ["", "", ""] }, { args: [[" \r\n \n\r "], ".."], expected: ["", "", "", ""] },
            { args: [["test"], ".."], expected: ["..test"] }, { args: [["Test \n\r\t Text"], ".."], expected: ["..Test", "", "..\t Text"] },
            { args: [["test \n\r\t text"], ".."], expected: ["..test", "", "..\t text"] }, { args: [[" Test \ntext "], ".."], expected: [".. Test", "..text"] },
            { args: [["\t\n\r test \n\r\t text \t"], ".."], expected: ["", "", ".. test", "", "..\t text"] },
            { args: [["\r\n\t.?Test \r\n\t\t text \r\n"], ".."], expected: ["", "..\t.?Test", "..\t\t text", ""] },
            { args: [["\n\r\t.?Test \n\r\t\t text \n\r"], ".."], expected: ["", "", "..\t.?Test", "", "..\t\t text", "", ""] },
            { args: [["", ""], ".."], expected: ["", ""] }, { args: [[" ", " ", " "], ".."], expected: ["", "", ""] }, { args: [[" ", " ", "", " "], ".."], expected: ["", "", "", ""] },
            { args: [["Test ", "", "\t Text"], ".."], expected: ["..Test", "", "..\t Text"] },
            { args: [["test ", "", "\t text"], ".."], expected: ["..test", "", "..\t text"] },
            { args: [["\t", "", " test ", "", "\t text \t"], ".."], expected: ["", "", ".. test", "", "..\t text"] },
            { args: [["", "\t.?Test ", "\t\t text ", ""], ".."], expected: ["", "..\t.?Test", "..\t\t text", ""] },
            { args: [["", "", "\t.?Test ", "", "\t\t text ", "", ""], ".."], expected: ["", "", "..\t.?Test", "", "..\t\t text", "", ""] },
            { args: [["", "\n"], ".."], expected: ["", "", ""] }, { args: [[" ", "\n ", " "], ".."], expected: ["", "", "", ""] },
            { args: [["Test ", "", "\t\nText"], ".."], expected: ["..Test", "", "", "..Text"] },
            { args: [["test ", "", "\t\ntext"], ".."], expected: ["..test", "", "", "..text"] },
            { args: [["\t", "", " test ", "\r", "\t text \t"], ".."], expected: ["", "", ".. test", "", "", "..\t text"] },
            { args: [["\n\r\n", "\t.?Test ", "\t\t text ", ""], ".."], expected: ["", "", "", "..\t.?Test", "..\t\t text", ""] },
            { args: [["\r\n\r", "", "\t.?Test ", "", "\t\t text ", "", ""], ".."], expected: ["", "", "", "", "..\t.?Test", "", "..\t\t text", "", ""] },
        ]
    }
];
mocha_1.describe("Testing string manipulation functions", function () {
    testData.forEach(function (f) {
        mocha_1.describe("Testing function " + f.fName + f.signature, function () {
            f.tests.forEach(function (t) {
                var expected = JSON.stringify(t.expected);
                it(f.fName + "(" + t.args.map(function (a) { return (typeof (a) == "undefined") ? "undefined" : JSON.stringify(a); }).join(", ") + ") should return " + expected, function () {
                    var result = f.callback.apply(undefined, t.args);
                    chai_1.expect(JSON.stringify(result)).to.equal(expected);
                });
            }, this);
        });
    }, this);
});
