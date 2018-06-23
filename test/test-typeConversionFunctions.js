"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
var TL = require("./testLib");
mocha_1.describe("Testing type conversion functions", function () {
    var functionTypeGroups = [
        TL.functionTypeGroup('string conversion', TL.testFunction(JsTypeCommander_1.JsTypeCommander.asString, 'asString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): Nilable<string>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('""', function () { return ""; }, TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [[""]]; }, '[""]'), TL.argSet(function () { return ["", undefined]; }, '"", undefined'), TL.argSet(function () { return ["", null]; }, '"", null'), TL.argSet(function () { return [undefined, ""]; }, 'undefined, ""'), TL.argSet(function () { return [null, ""]; }, 'null, ""'), TL.argSet(function () { return ["", Symbol.iterator]; }, '"", Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, false]; }, '"", Symbol.iterator, false'), TL.argSet(function () { return ["", "\t\n\r "]; }, '"", "\\t\\n\\r "'), TL.argSet(function () { return ["\t\n\r ", "", true]; }, '"\\t\\n\\r ", "", true'), TL.argSet(function () { return ["", "\t\n\r ", false]; }, '"", "\\t\\n\\r ", false')), TL.expectEqualTo('"true"', function () { return "true"; }, TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return [true,]; }, 'true')), TL.expectEqualTo('"false"', function () { return "false"; }, TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return [false,]; }, 'false')), TL.expectEqualTo('"Symbol(Symbol.iterator)"', function () { return "Symbol(Symbol.iterator)"; }, TL.argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), TL.argSet(function () { return [[Symbol.iterator]]; }, '[Symbol.iterator]'), TL.argSet(function () { return [undefined, Symbol.iterator]; }, 'undefined, Symbol.iterator'), TL.argSet(function () { return [null, Symbol.iterator]; }, 'null, Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, true]; }, '"", Symbol.iterator, true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, true]; }, '"\\t\\n\\r ", Symbol.iterator, true')), TL.expectEqualTo('"\\t\\n\\r "', function () { return "\t\n\r "; }, TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator]; }, '"\\t\\n\\r ", Symbol.iterator'), TL.argSet(function () { return ["", "\t\n\r ", true]; }, '"", "\\t\\n\\r ", true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, false]; }, '"\\t\\n\\r ", Symbol.iterator, false'))), TL.testFunction(JsTypeCommander_1.JsTypeCommander.toString, 'toString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): string', TL.expectEqualTo('""', function () { return ""; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [[""]]; }, '[""]'), TL.argSet(function () { return ["", undefined]; }, '"", undefined'), TL.argSet(function () { return ["", null]; }, '"", null'), TL.argSet(function () { return [undefined, ""]; }, 'undefined, ""'), TL.argSet(function () { return [null, ""]; }, 'null, ""'), TL.argSet(function () { return ["", Symbol.iterator]; }, '"", Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, false]; }, '"", Symbol.iterator, false'), TL.argSet(function () { return ["", "\t\n\r "]; }, '"", "\\t\\n\\r "'), TL.argSet(function () { return ["\t\n\r ", "", true]; }, '"\\t\\n\\r ", "", true'), TL.argSet(function () { return ["", "\t\n\r ", false]; }, '"", "\\t\\n\\r ", false')), TL.expectEqualTo('"true"', function () { return "true"; }, TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return [true,]; }, 'true')), TL.expectEqualTo('"false"', function () { return "false"; }, TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return [false,]; }, 'false')), TL.expectEqualTo('"iterator"', function () { return "Symbol(Symbol.iterator)"; }, TL.argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), TL.argSet(function () { return [[Symbol.iterator]]; }, '[Symbol.iterator]'), TL.argSet(function () { return [undefined, Symbol.iterator]; }, 'undefined, Symbol.iterator'), TL.argSet(function () { return [null, Symbol.iterator]; }, 'null, Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, true]; }, '"", Symbol.iterator, true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, true]; }, '"\\t\\n\\r ", Symbol.iterator, true')), TL.expectEqualTo('"\\t\\n\\r "', function () { return "\t\n\r "; }, TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator]; }, '"\\t\\n\\r ", Symbol.iterator'), TL.argSet(function () { return ["", "\t\n\r ", true]; }, '"", "\\t\\n\\r ", true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, false]; }, '"\\t\\n\\r ", Symbol.iterator, false')))),
        TL.functionTypeGroup('boolean conversion', TL.testFunction(JsTypeCommander_1.JsTypeCommander.asBoolean, 'asBoolean', '(obj?: TDefined): Nilable<boolean>): Nilable<boolean>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return ["talse"]; }, '"talse"'), TL.argSet(function () { return ["nes"]; }, '""nes'), TL.argSet(function () { return ["yo"]; }, '"yo"'), TL.argSet(function () { return ["frue"]; }, '"frue"'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('true', function () { return true; }, TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [-1]; }, '-1'), TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return [Number.POSITIVE_INFINITY]; }, 'Number.POSITIVE_INFINITY'), TL.argSet(function () { return [Number.NEGATIVE_INFINITY]; }, 'Number.NEGATIVE_INFINITY'), TL.argSet(function () { return ["t"]; }, '"t"'), TL.argSet(function () { return ["T"]; }, '"T"'), TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return ["TRUE"]; }, '"TRUE"'), TL.argSet(function () { return ["True"]; }, '"True"'), TL.argSet(function () { return ["tRuE"]; }, '"tRuE"'), TL.argSet(function () { return ["y"]; }, '"y"'), TL.argSet(function () { return ["Y"]; }, '"Y"'), TL.argSet(function () { return ["yes"]; }, '"yes"'), TL.argSet(function () { return ["YES"]; }, '"YES"'), TL.argSet(function () { return ["Yes"]; }, '"Yes"'), TL.argSet(function () { return ["yEs"]; }, '"yEs"'), TL.argSet(function () { return [[true]]; }, '[true]'), TL.argSet(function () { return [true, undefined]; }, 'true, undefined'), TL.argSet(function () { return [true, null]; }, 'true, null'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), TL.argSet(function () { return [true, false]; }, 'true, false')), TL.expectEqualTo('false', function () { return false; }, TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return [NaN]; }, 'NaN'), TL.argSet(function () { return ["f"]; }, '"f"'), TL.argSet(function () { return ["F"]; }, '"F"'), TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return ["FALSE"]; }, '"FALSE"'), TL.argSet(function () { return ["False"]; }, '"False"'), TL.argSet(function () { return ["fAlSe"]; }, '"fAlSe"'), TL.argSet(function () { return [[false]]; }, '[false]'), TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true'))), TL.testFunction(JsTypeCommander_1.JsTypeCommander.toBoolean, 'toBoolean', '(obj?: TDefined): Nilable<boolean>): boolean', TL.expectEqualTo('true', function () { return true; }, TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [-1]; }, '-1'), TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return [Number.POSITIVE_INFINITY]; }, 'Number.POSITIVE_INFINITY'), TL.argSet(function () { return [Number.NEGATIVE_INFINITY]; }, 'Number.NEGATIVE_INFINITY'), TL.argSet(function () { return ["t"]; }, '"t"'), TL.argSet(function () { return ["T"]; }, '"T"'), TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return ["TRUE"]; }, '"TRUE"'), TL.argSet(function () { return ["True"]; }, '"True"'), TL.argSet(function () { return ["tRuE"]; }, '"tRuE"'), TL.argSet(function () { return ["y"]; }, '"y"'), TL.argSet(function () { return ["Y"]; }, '"Y"'), TL.argSet(function () { return ["yes"]; }, '"yes"'), TL.argSet(function () { return ["YES"]; }, '"YES"'), TL.argSet(function () { return ["Yes"]; }, '"Yes"'), TL.argSet(function () { return ["yEs"]; }, '"yEs"'), TL.argSet(function () { return [[true]]; }, '[true]'), TL.argSet(function () { return [true, undefined]; }, 'true, undefined'), TL.argSet(function () { return [true, null]; }, 'true, null'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), TL.argSet(function () { return [true, false]; }, 'true, false')), TL.expectEqualTo('false', function () { return false; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return ["talse"]; }, '"talse"'), TL.argSet(function () { return ["nes"]; }, '""nes'), TL.argSet(function () { return ["yo"]; }, '"yo"'), TL.argSet(function () { return ["frue"]; }, '"frue"'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return [NaN]; }, 'NaN'), TL.argSet(function () { return ["f"]; }, '"f"'), TL.argSet(function () { return ["F"]; }, '"F"'), TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return ["FALSE"]; }, '"FALSE"'), TL.argSet(function () { return ["False"]; }, '"False"'), TL.argSet(function () { return ["fAlSe"]; }, '"fAlSe"'), TL.argSet(function () { return [[false]]; }, '[false]'), TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')))),
        TL.functionTypeGroup('number conversion', TL.testFunction(JsTypeCommander_1.JsTypeCommander.asNumber, 'asNumber', '(obj?: TDefined): Nilable<number>): Nilable<number>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('1', function () { return 1; }, TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return ["1"]; }, '"1"'), TL.argSet(function () { return ["0001.00"]; }, '"0001.00"'), TL.argSet(function () { return [undefined, 1]; }, 'undefined, 1'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [undefined, "1"]; }, 'undefined, "1"'), TL.argSet(function () { return [undefined, "0001.00"]; }, 'undefined, "0001.00"'), TL.argSet(function () { return [null, 1]; }, 'null, 1'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"'), TL.argSet(function () { return ["x2", 1]; }, '"x2", 1'), TL.argSet(function () { return ["x2", true]; }, '"x2", true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"')), TL.expectEqualTo('0', function () { return 0; }, TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["0"]; }, '"0"'), TL.argSet(function () { return ["+0"]; }, '"+0"'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), 
        //TL.argSet(() => ["false"], '"false"'),
        //TL.argSet(() => [[false]], '[false]'),
        TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')), TL.expectEqualTo('100', function () { return 100; }, TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return ["100"]; }, '"100"'), TL.argSet(function () { return ["+00100.0000"]; }, '"+00100.0000"')), TL.expectEqualTo('-100.0001', function () { return -100.0001; }, TL.argSet(function () { return [-100.0001]; }, '-100.0001'), TL.argSet(function () { return ["-100.0001"]; }, '"-100.0001"'), TL.argSet(function () { return ["-00100.000100"]; }, '"-00100.000100"')), TL.expectEqualTo('0.0001', function () { return 0.0001; }, TL.argSet(function () { return [0.0001]; }, '0.0001'), TL.argSet(function () { return ["0.0001"]; }, '"0.0001"'), TL.argSet(function () { return ["+00000.000100"]; }, '"+00000.000100"'))), TL.testFunction(JsTypeCommander_1.JsTypeCommander.toNumber, 'toNumber', '(obj?: TDefined): Nilable<number>): number', TL.expectEqualTo('0', function () { return 0; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["0"]; }, '"0"'), TL.argSet(function () { return ["+0"]; }, '"+0"'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return ["false"]; }, '"false"'), 
        //TL.argSet(() => [[false]], '[false]'),
        TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')), TL.expectEqualTo('1', function () { return 1; }, TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return ["1"]; }, '"1"'), TL.argSet(function () { return ["0001.00"]; }, '"0001.00"'), TL.argSet(function () { return [undefined, 1]; }, 'undefined, 1'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [undefined, "1"]; }, 'undefined, "1"'), TL.argSet(function () { return [undefined, "0001.00"]; }, 'undefined, "0001.00"'), TL.argSet(function () { return [null, 1]; }, 'null, 1'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"'), TL.argSet(function () { return ["x2", 1]; }, '"x2", 1'), TL.argSet(function () { return ["x2", true]; }, '"x2", true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"')), TL.expectEqualTo('100', function () { return 100; }, TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return ["100"]; }, '"100"'), TL.argSet(function () { return ["+00100.0000"]; }, '"+00100.0000"')), TL.expectEqualTo('-100.0001', function () { return -100.0001; }, TL.argSet(function () { return [-100.0001]; }, '-100.0001'), TL.argSet(function () { return ["-100.0001"]; }, '"-100.0001"'), TL.argSet(function () { return ["-00100.000100"]; }, '"-00100.000100"')), TL.expectEqualTo('0.0001', function () { return 0.0001; }, TL.argSet(function () { return [0.0001]; }, '0.0001'), TL.argSet(function () { return ["0.0001"]; }, '"0.0001"'), TL.argSet(function () { return ["+00000.000100"]; }, '"+00000.000100"'))))
    ];
    TL.describeFunctionTypeGroups(functionTypeGroups);
    mocha_1.describe("Testing function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]", function () {
        it("JsTypeCommander.toArray() should return []", function () {
            var result = JsTypeCommander_1.JsTypeCommander.toArray();
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result))
                chai_1.expect(result.length).to.equal(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([]) should return []", function () {
            var source = [];
            var result = JsTypeCommander_1.JsTypeCommander.toArray([]);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result))
                chai_1.expect(result.length).to.equal(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([12, \"7\", true, undefined]) should return [12, \"7\", true, undefined]", function () {
            var source = [12, "7", true, undefined];
            var result = JsTypeCommander_1.JsTypeCommander.toArray(source);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(4, "Length mismatch");
                chai_1.expect(result[0]).to.equal(12, "Element 0 mismatch");
                chai_1.expect(result[1]).to.equal("7", "Element 1 mismatch");
                chai_1.expect(result[2]).to.equal(true, "Element 2 mismatch");
                chai_1.expect(result[3]).to.a("undefined", "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray(undefined) should return [undefined]", function () {
            var result = JsTypeCommander_1.JsTypeCommander.toArray(undefined);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(1, "Length mismatch");
                chai_1.expect(result[0]).to.a("undefined");
            }
        });
        it("JsTypeCommander.toArray(null) should return [null]", function () {
            var result = JsTypeCommander_1.JsTypeCommander.toArray(null);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(1, "Length mismatch");
                chai_1.expect(result[0]).to.a("null");
            }
        });
        it("JsTypeCommander.toArray(0) should return [0]", function () {
            var result = JsTypeCommander_1.JsTypeCommander.toArray(0);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(1, "Length mismatch");
                chai_1.expect(result[0]).to.a("number");
                chai_1.expect(result[0]).to.equal(0, "Element 0 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }) should return [12, \"7\", undefined, true]", function () {
            var source = { 0: 12, 1: "7", 3: true, length: 4 };
            var result = JsTypeCommander_1.JsTypeCommander.toArray(source);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(4, "Length mismatch");
                chai_1.expect(result[0]).to.equal(12, "Element 0 mismatch");
                chai_1.expect(result[1]).to.equal("7", "Element 1 mismatch");
                chai_1.expect(result[2]).to.a("undefined", "Element 2 mismatch");
                chai_1.expect(result[3]).to.equal(true, "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }, true) should return [{ 0: 12, 1: \"7\", 3: true, length: 4 }]", function () {
            var source = { 0: 12, 1: "7", 3: true, length: 4 };
            var result = JsTypeCommander_1.JsTypeCommander.toArray(source, true);
            chai_1.expect(result).to.a("Array");
            if (Array.isArray(result)) {
                chai_1.expect(result.length).to.equal(1, "Length mismatch");
                var obj = result[0];
                chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(obj)).to.equal(true, "Element 0 mismatch");
                if (JsTypeCommander_1.JsTypeCommander.isPlainObject(obj)) {
                    chai_1.expect(obj[0]).to.equal(12, "Original object not returned as first element");
                    chai_1.expect(obj[1]).to.equal("7", "Original object not returned as first element");
                    chai_1.expect(obj[2]).to.a("undefined", "Original object not returned as first element");
                    chai_1.expect(obj[3]).to.equal(true, "Original object not returned as first element");
                }
            }
        });
    });
    mocha_1.describe("Testing function asErrorLike(obj?: TDefined): Nilable<ErrorLike>", function () {
        it("JsTypeCommander.asErrorLike() should return undefined", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike();
            chai_1.expect(result).to.a("undefined");
        });
        it("JsTypeCommander.asErrorLike(\" \") should return { message: \"Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike(" ");
            chai_1.expect(result).to.a("object");
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                chai_1.expect(result.message).to.a("string", "message property type mismatch");
                chai_1.expect(result.message).to.equal("Error", "message property value mismatch");
                chai_1.expect(result.name).to.a("string", "name property type mismatch");
                chai_1.expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(\"My Error\") should return { message: \"My Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike("My Error");
            chai_1.expect(result).to.a("object");
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                chai_1.expect(result.message).to.a("string", "message property type mismatch");
                chai_1.expect(result.message).to.equal("My Error", "message property value mismatch");
                chai_1.expect(result.name).to.a("string", "name property type mismatch");
                chai_1.expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(12) should return { message: \"Error 12\", number: 12, name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike(12);
            chai_1.expect(result).to.a("object");
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                chai_1.expect(result.message).to.a("string", "message property type mismatch");
                chai_1.expect(result.message).to.equal("Error 12", "message property mismatch");
                chai_1.expect(result.number).to.a("number", "number property type mismatch");
                chai_1.expect(result.number).to.equal(12, "number property mismatch");
                chai_1.expect(result.name).to.a("string", "name property type mismatch");
                chai_1.expect(result.name).to.equal("ErrorLike", "name property mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike({ description: \"My Error\" }) should return { message: \"My Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike({ description: "My Error" });
            chai_1.expect(result).to.a("object");
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                chai_1.expect(result.message).to.a("string", "message property type mismatch");
                chai_1.expect(result.message).to.equal("My Error", "message property value mismatch");
                chai_1.expect(result.name).to.a("string", "name property type mismatch");
                chai_1.expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        var testObj = new RangeError("Out of Range");
        it("JsTypeCommander.asErrorLike(new RangeError(\"Out of Range\")) should return { message: \"Out of Range\", name: \"RangeError\" }", function () {
            var result = JsTypeCommander_1.JsTypeCommander.asErrorLike(testObj);
            chai_1.expect(result).to.a("object");
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                chai_1.expect(result.message).to.a("string", "message property type mismatch");
                chai_1.expect(result.message).to.equal("Out of Range", "message property value mismatch");
                chai_1.expect(result.name).to.a("string", "name property type mismatch");
                chai_1.expect(result.name).to.equal("RangeError", "name property value mismatch");
                if (typeof (testObj.stack) == "string") {
                    chai_1.expect(result.stack).to.a("string", "stack property type mismatch");
                    chai_1.expect(result.stack).to.equal(testObj.stack, "name property value mismatch");
                }
                else
                    chai_1.expect(result.stack).to.a("undefined", "stack property type mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(RangeError: thrownErr) should return { message: \"Out of Range\", name: \"RangeError\", stack: string }", function () {
            try {
                throw testObj;
            }
            catch (ex) {
                var result = JsTypeCommander_1.JsTypeCommander.asErrorLike(ex);
                chai_1.expect(result).to.a("object");
                chai_1.expect(JsTypeCommander_1.JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
                if (JsTypeCommander_1.JsTypeCommander.isPlainObject(result)) {
                    chai_1.expect(result.message).to.a("string", "message property type mismatch");
                    chai_1.expect(result.message).to.equal("Out of Range", "message property value mismatch");
                    chai_1.expect(result.name).to.a("string", "name property type mismatch");
                    chai_1.expect(result.name).to.equal("RangeError", "name property value mismatch");
                    chai_1.expect(result.stack).to.a("string", "stack property type mismatch");
                    chai_1.expect(result.stack).to.equal(ex.stack, "name property value mismatch");
                }
            }
        });
    });
});
