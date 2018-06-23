import { expect } from 'chai';
import { assert } from 'chai';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';
import { truncate } from 'fs';
import * as TL from './testLib';

describe("Testing type conversion functions", function() {
    let functionTypeGroups: TL.IFunctionTypeGroup[] = [
        TL.functionTypeGroup('string conversion',
            TL.testFunction(JsTypeCommander.asString, 'asString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): Nilable<string>',
                TL.expectIsA('undefined',
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                TL.expectIsA('null',
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined')
                ),
                TL.expectEqualTo('""', () => "",
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [[""]], '[""]'),
                    TL.argSet(() => ["", undefined], '"", undefined'),
                    TL.argSet(() => ["", null], '"", null'),
                    TL.argSet(() => [undefined, ""], 'undefined, ""'),
                    TL.argSet(() => [null, ""], 'null, ""'),
                    TL.argSet(() => ["", Symbol.iterator], '"", Symbol.iterator'),
                    TL.argSet(() => ["", Symbol.iterator, false], '"", Symbol.iterator, false'),
                    TL.argSet(() => ["", "\t\n\r "], '"", "\\t\\n\\r "'),
                    TL.argSet(() => ["\t\n\r ", "", true], '"\\t\\n\\r ", "", true'),
                    TL.argSet(() => ["", "\t\n\r ", false], '"", "\\t\\n\\r ", false')
                ),
                TL.expectEqualTo('"true"', () => "true",
                    TL.argSet(() => ["true"], '"true"'),
                    TL.argSet(() => [true,], 'true')
                ),
                TL.expectEqualTo('"false"', () => "false",
                    TL.argSet(() => ["false"], '"false"'),
                    TL.argSet(() => [false,], 'false')
                ),
                TL.expectEqualTo('"Symbol(Symbol.iterator)"', () => "Symbol(Symbol.iterator)",
                    TL.argSet(() => [Symbol.iterator], 'Symbol.iterator'),
                    TL.argSet(() => [[Symbol.iterator]], '[Symbol.iterator]'),
                    TL.argSet(() => [undefined, Symbol.iterator], 'undefined, Symbol.iterator'),
                    TL.argSet(() => [null, Symbol.iterator], 'null, Symbol.iterator'),
                    TL.argSet(() => ["", Symbol.iterator, true], '"", Symbol.iterator, true'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator, true], '"\\t\\n\\r ", Symbol.iterator, true')
                ),
                TL.expectEqualTo('"\\t\\n\\r "', () => "\t\n\r ",
                    TL.argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    TL.argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator], '"\\t\\n\\r ", Symbol.iterator'),
                    TL.argSet(() => ["", "\t\n\r ", true], '"", "\\t\\n\\r ", true'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator, false], '"\\t\\n\\r ", Symbol.iterator, false')
                )
            ),
            TL.testFunction(JsTypeCommander.toString, 'toString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): string',
                TL.expectEqualTo('""', () => "",
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined'),
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined'),
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [[""]], '[""]'),
                    TL.argSet(() => ["", undefined], '"", undefined'),
                    TL.argSet(() => ["", null], '"", null'),
                    TL.argSet(() => [undefined, ""], 'undefined, ""'),
                    TL.argSet(() => [null, ""], 'null, ""'),
                    TL.argSet(() => ["", Symbol.iterator], '"", Symbol.iterator'),
                    TL.argSet(() => ["", Symbol.iterator, false], '"", Symbol.iterator, false'),
                    TL.argSet(() => ["", "\t\n\r "], '"", "\\t\\n\\r "'),
                    TL.argSet(() => ["\t\n\r ", "", true], '"\\t\\n\\r ", "", true'),
                    TL.argSet(() => ["", "\t\n\r ", false], '"", "\\t\\n\\r ", false')
                ),
                TL.expectEqualTo('"true"', () => "true",
                    TL.argSet(() => ["true"], '"true"'),
                    TL.argSet(() => [true,], 'true')
                ),
                TL.expectEqualTo('"false"', () => "false",
                    TL.argSet(() => ["false"], '"false"'),
                    TL.argSet(() => [false,], 'false')
                ),
                TL.expectEqualTo('"iterator"', () => "Symbol(Symbol.iterator)",
                    TL.argSet(() => [Symbol.iterator], 'Symbol.iterator'),
                    TL.argSet(() => [[Symbol.iterator]], '[Symbol.iterator]'),
                    TL.argSet(() => [undefined, Symbol.iterator], 'undefined, Symbol.iterator'),
                    TL.argSet(() => [null, Symbol.iterator], 'null, Symbol.iterator'),
                    TL.argSet(() => ["", Symbol.iterator, true], '"", Symbol.iterator, true'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator, true], '"\\t\\n\\r ", Symbol.iterator, true')
                ),
                TL.expectEqualTo('"\\t\\n\\r "', () => "\t\n\r ",
                    TL.argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    TL.argSet(() => ["\t\n\r ", " "], '"\\t\\n\\r ", " "'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator], '"\\t\\n\\r ", Symbol.iterator'),
                    TL.argSet(() => ["", "\t\n\r ", true], '"", "\\t\\n\\r ", true'),
                    TL.argSet(() => ["\t\n\r ", Symbol.iterator, false], '"\\t\\n\\r ", Symbol.iterator, false')
                )
            )
        ),
        TL.functionTypeGroup('boolean conversion',
            TL.testFunction(JsTypeCommander.asBoolean, 'asBoolean', '(obj?: TDefined): Nilable<boolean>): Nilable<boolean>',
                TL.expectIsA('undefined',
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [""], '""'), TL.argSet(() => ["talse"], '"talse"'), TL.argSet(() => ["nes"], '""nes'), TL.argSet(() => ["yo"], '"yo"'), TL.argSet(() => ["frue"], '"frue"'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                TL.expectIsA('null',
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined')
                ),
                TL.expectEqualTo('true', () => true,
                    TL.argSet(() => [true], 'true'),
                    TL.argSet(() => [1], '1'),
                    TL.argSet(() => [-1], '-1'),
                    TL.argSet(() => [100], '100'),
                    TL.argSet(() => [Number.POSITIVE_INFINITY], 'Number.POSITIVE_INFINITY'),
                    TL.argSet(() => [Number.NEGATIVE_INFINITY], 'Number.NEGATIVE_INFINITY'),
                    TL.argSet(() => ["t"], '"t"'), TL.argSet(() => ["T"], '"T"'),
                    TL.argSet(() => ["true"], '"true"'), TL.argSet(() => ["TRUE"], '"TRUE"'), TL.argSet(() => ["True"], '"True"'), TL.argSet(() => ["tRuE"], '"tRuE"'),
                    TL.argSet(() => ["y"], '"y"'), TL.argSet(() => ["Y"], '"Y"'),
                    TL.argSet(() => ["yes"], '"yes"'), TL.argSet(() => ["YES"], '"YES"'), TL.argSet(() => ["Yes"], '"Yes"'), TL.argSet(() => ["yEs"], '"yEs"'),
                    TL.argSet(() => [[true]], '[true]'),
                    TL.argSet(() => [true, undefined], 'true, undefined'),
                    TL.argSet(() => [true, null], 'true, null'),
                    TL.argSet(() => [undefined, true], 'undefined, true'),
                    TL.argSet(() => [null, true], 'null, true'),
                    TL.argSet(() => [null, -0.0001], 'null, -0.0001'),
                    TL.argSet(() => [true, false], 'true, false')
                ),
                TL.expectEqualTo('false', () => false,
                    TL.argSet(() => [false], 'false'),
                    TL.argSet(() => [0], '0'),
                    TL.argSet(() => ["-0.0000"], '"-0.0000"'),
                    TL.argSet(() => [NaN], 'NaN'),
                    TL.argSet(() => ["f"], '"f"'), TL.argSet(() => ["F"], '"F"'),
                    TL.argSet(() => ["false"], '"false"'), TL.argSet(() => ["FALSE"], '"FALSE"'), TL.argSet(() => ["False"], '"False"'), TL.argSet(() => ["fAlSe"], '"fAlSe"'),
                    TL.argSet(() => [[false]], '[false]'),
                    TL.argSet(() => [false, undefined], 'false, undefined'),
                    TL.argSet(() => [false, null], 'false, null'),
                    TL.argSet(() => [undefined, false], 'undefined, false'),
                    TL.argSet(() => [null, false], 'null, false'),
                    TL.argSet(() => [false, true], 'false, true')
                )
            ),
            TL.testFunction(JsTypeCommander.toBoolean, 'toBoolean', '(obj?: TDefined): Nilable<boolean>): boolean',
                TL.expectEqualTo('true', () => true,
                    TL.argSet(() => [true], 'true'),
                    TL.argSet(() => [1], '1'),
                    TL.argSet(() => [-1], '-1'),
                    TL.argSet(() => [100], '100'),
                    TL.argSet(() => [Number.POSITIVE_INFINITY], 'Number.POSITIVE_INFINITY'),
                    TL.argSet(() => [Number.NEGATIVE_INFINITY], 'Number.NEGATIVE_INFINITY'),
                    TL.argSet(() => ["t"], '"t"'), TL.argSet(() => ["T"], '"T"'),
                    TL.argSet(() => ["true"], '"true"'), TL.argSet(() => ["TRUE"], '"TRUE"'), TL.argSet(() => ["True"], '"True"'), TL.argSet(() => ["tRuE"], '"tRuE"'),
                    TL.argSet(() => ["y"], '"y"'), TL.argSet(() => ["Y"], '"Y"'),
                    TL.argSet(() => ["yes"], '"yes"'), TL.argSet(() => ["YES"], '"YES"'), TL.argSet(() => ["Yes"], '"Yes"'), TL.argSet(() => ["yEs"], '"yEs"'),
                    TL.argSet(() => [[true]], '[true]'),
                    TL.argSet(() => [true, undefined], 'true, undefined'),
                    TL.argSet(() => [true, null], 'true, null'),
                    TL.argSet(() => [undefined, true], 'undefined, true'),
                    TL.argSet(() => [null, true], 'null, true'),
                    TL.argSet(() => [null, -0.0001], 'null, -0.0001'),
                    TL.argSet(() => [true, false], 'true, false')
                ),
                TL.expectEqualTo('false', () => false,
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [""], '""'), TL.argSet(() => ["talse"], '"talse"'), TL.argSet(() => ["nes"], '""nes'), TL.argSet(() => ["yo"], '"yo"'), TL.argSet(() => ["frue"], '"frue"'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined'),
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined'),
                    TL.argSet(() => [false], 'false'),
                    TL.argSet(() => [0], '0'),
                    TL.argSet(() => ["-0.0000"], '"-0.0000"'),
                    TL.argSet(() => [NaN], 'NaN'),
                    TL.argSet(() => ["f"], '"f"'), TL.argSet(() => ["F"], '"F"'),
                    TL.argSet(() => ["false"], '"false"'), TL.argSet(() => ["FALSE"], '"FALSE"'), TL.argSet(() => ["False"], '"False"'), TL.argSet(() => ["fAlSe"], '"fAlSe"'),
                    TL.argSet(() => [[false]], '[false]'),
                    TL.argSet(() => [false, undefined], 'false, undefined'),
                    TL.argSet(() => [false, null], 'false, null'),
                    TL.argSet(() => [undefined, false], 'undefined, false'),
                    TL.argSet(() => [null, false], 'null, false'),
                    TL.argSet(() => [false, true], 'false, true')
                )
            )
        ),
        TL.functionTypeGroup('number conversion',
            TL.testFunction(JsTypeCommander.asNumber, 'asNumber', '(obj?: TDefined): Nilable<number>): Nilable<number>',
                TL.expectIsA('undefined',
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined')
                ),
                TL.expectIsA('null',
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined')
                ),
                TL.expectEqualTo('1', () => 1,
                    TL.argSet(() => [1], '1'),
                    TL.argSet(() => [true], 'true'),
                    TL.argSet(() => ["1"], '"1"'),
                    TL.argSet(() => ["0001.00"], '"0001.00"'),
                    TL.argSet(() => [undefined, 1], 'undefined, 1'),
                    TL.argSet(() => [undefined, true], 'undefined, true'),
                    TL.argSet(() => [undefined, "1"], 'undefined, "1"'),
                    TL.argSet(() => [undefined, "0001.00"], 'undefined, "0001.00"'),
                    TL.argSet(() => [null, 1], 'null, 1'),
                    TL.argSet(() => [null, true], 'null, true'),
                    TL.argSet(() => [null, "1"], 'null, "1"'),
                    TL.argSet(() => [null, "0001.00"], 'null, "0001.00"'),
                    TL.argSet(() => ["x2", 1], '"x2", 1'),
                    TL.argSet(() => ["x2", true], '"x2", true'),
                    TL.argSet(() => [null, "1"], 'null, "1"'),
                    TL.argSet(() => [null, "0001.00"], 'null, "0001.00"')
                ),
                TL.expectEqualTo('0', () => 0,
                    TL.argSet(() => [0], '0'),
                    TL.argSet(() => ["0"], '"0"'),
                    TL.argSet(() => ["+0"], '"+0"'),
                    TL.argSet(() => [false], 'false'),
                    TL.argSet(() => ["-0.0000"], '"-0.0000"'),
                    //TL.argSet(() => ["false"], '"false"'),
                    //TL.argSet(() => [[false]], '[false]'),
                    TL.argSet(() => [false, undefined], 'false, undefined'),
                    TL.argSet(() => [false, null], 'false, null'),
                    TL.argSet(() => [undefined, false], 'undefined, false'),
                    TL.argSet(() => [null, false], 'null, false'),
                    TL.argSet(() => [false, true], 'false, true')
                ),
                TL.expectEqualTo('100', () => 100,
                    TL.argSet(() => [100], '100'),
                    TL.argSet(() => ["100"], '"100"'),
                    TL.argSet(() => ["+00100.0000"], '"+00100.0000"')
                ),
                TL.expectEqualTo('-100.0001', () => -100.0001,
                    TL.argSet(() => [-100.0001], '-100.0001'),
                    TL.argSet(() => ["-100.0001"], '"-100.0001"'),
                    TL.argSet(() => ["-00100.000100"], '"-00100.000100"')
                ),
                TL.expectEqualTo('0.0001', () => 0.0001,
                    TL.argSet(() => [0.0001], '0.0001'),
                    TL.argSet(() => ["0.0001"], '"0.0001"'),
                    TL.argSet(() => ["+00000.000100"], '"+00000.000100"')
                )
            ),
            TL.testFunction(JsTypeCommander.toNumber, 'toNumber', '(obj?: TDefined): Nilable<number>): number',
                TL.expectEqualTo('0', () => 0,
                    TL.argSet(() => [undefined], 'undefined'),
                    TL.argSet(() => [""], '""'),
                    TL.argSet(() => [[]], '[]'),
                    TL.argSet(() => [undefined, undefined], 'undefined, undefined'),
                    TL.argSet(() => [null], 'null'),
                    TL.argSet(() => [undefined, null], 'undefined, null'),
                    TL.argSet(() => [null, undefined], 'null, undefined'),
                    TL.argSet(() => [0], '0'),
                    TL.argSet(() => ["0"], '"0"'),
                    TL.argSet(() => ["+0"], '"+0"'),
                    TL.argSet(() => [false], 'false'),
                    TL.argSet(() => ["-0.0000"], '"-0.0000"'),
                    TL.argSet(() => ["false"], '"false"'),
                    //TL.argSet(() => [[false]], '[false]'),
                    TL.argSet(() => [false, undefined], 'false, undefined'),
                    TL.argSet(() => [false, null], 'false, null'),
                    TL.argSet(() => [undefined, false], 'undefined, false'),
                    TL.argSet(() => [null, false], 'null, false'),
                    TL.argSet(() => [false, true], 'false, true')
                ),
                TL.expectEqualTo('1', () => 1,
                    TL.argSet(() => [1], '1'),
                    TL.argSet(() => [true], 'true'),
                    TL.argSet(() => ["1"], '"1"'),
                    TL.argSet(() => ["0001.00"], '"0001.00"'),
                    TL.argSet(() => [undefined, 1], 'undefined, 1'),
                    TL.argSet(() => [undefined, true], 'undefined, true'),
                    TL.argSet(() => [undefined, "1"], 'undefined, "1"'),
                    TL.argSet(() => [undefined, "0001.00"], 'undefined, "0001.00"'),
                    TL.argSet(() => [null, 1], 'null, 1'),
                    TL.argSet(() => [null, true], 'null, true'),
                    TL.argSet(() => [null, "1"], 'null, "1"'),
                    TL.argSet(() => [null, "0001.00"], 'null, "0001.00"'),
                    TL.argSet(() => ["x2", 1], '"x2", 1'),
                    TL.argSet(() => ["x2", true], '"x2", true'),
                    TL.argSet(() => [null, "1"], 'null, "1"'),
                    TL.argSet(() => [null, "0001.00"], 'null, "0001.00"')
                ),
                TL.expectEqualTo('100', () => 100,
                    TL.argSet(() => [100], '100'),
                    TL.argSet(() => ["100"], '"100"'),
                    TL.argSet(() => ["+00100.0000"], '"+00100.0000"')
                ),
                TL.expectEqualTo('-100.0001', () => -100.0001,
                    TL.argSet(() => [-100.0001], '-100.0001'),
                    TL.argSet(() => ["-100.0001"], '"-100.0001"'),
                    TL.argSet(() => ["-00100.000100"], '"-00100.000100"')
                ),
                TL.expectEqualTo('0.0001', () => 0.0001,
                    TL.argSet(() => [0.0001], '0.0001'),
                    TL.argSet(() => ["0.0001"], '"0.0001"'),
                    TL.argSet(() => ["+00000.000100"], '"+00000.000100"')
                )
            )
        )
    ];
    TL.describeFunctionTypeGroups(functionTypeGroups);
    describe("Testing function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]", function() {
        it("JsTypeCommander.toArray() should return []", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray();
            expect(result).to.a("Array");
            if (Array.isArray(result))
                expect(result.length).to.equal(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([]) should return []", function() {
            let source: any[] = [];
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray([]);
            expect(result).to.a("Array");
            if (Array.isArray(result))
                expect(result.length).to.equal(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([12, \"7\", true, undefined]) should return [12, \"7\", true, undefined]", function() {
            let source: any[] = [12, "7", true, undefined];
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(source);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(4, "Length mismatch");
                expect(result[0]).to.equal(12, "Element 0 mismatch");
                expect(result[1]).to.equal("7", "Element 1 mismatch");
                expect(result[2]).to.equal(true, "Element 2 mismatch");
                expect(result[3]).to.a("undefined", "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray(undefined) should return [undefined]", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(undefined);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(1, "Length mismatch");
                expect(result[0]).to.a("undefined");
            }
        });
        it("JsTypeCommander.toArray(null) should return [null]", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(null);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(1, "Length mismatch");
                expect(result[0]).to.a("null");
            }
        });
        it("JsTypeCommander.toArray(0) should return [0]", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(0);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(1, "Length mismatch");
                expect(result[0]).to.a("number");
                expect(result[0]).to.equal(0, "Element 0 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }) should return [12, \"7\", undefined, true]", function() {
            let source: JsTypeCommander.IStringKeyedObject = { 0: 12, 1: "7", 3: true, length: 4 };
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(source);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(4, "Length mismatch");
                expect(result[0]).to.equal(12, "Element 0 mismatch");
                expect(result[1]).to.equal("7", "Element 1 mismatch");
                expect(result[2]).to.a("undefined", "Element 2 mismatch");
                expect(result[3]).to.equal(true, "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }, true) should return [{ 0: 12, 1: \"7\", 3: true, length: 4 }]", function() {
            let source: JsTypeCommander.IStringKeyedObject = { 0: 12, 1: "7", 3: true, length: 4 };
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.toArray(source, true);
            expect(result).to.a("Array");
            if (Array.isArray(result)) {
                expect(result.length).to.equal(1, "Length mismatch");
                let obj: JsTypeCommander.AnyNilable = result[0];
                expect(JsTypeCommander.isPlainObject(obj)).to.equal(true, "Element 0 mismatch");
                if (JsTypeCommander.isPlainObject(obj)) {
                    expect(obj[0]).to.equal(12, "Original object not returned as first element");
                    expect(obj[1]).to.equal("7", "Original object not returned as first element");
                    expect(obj[2]).to.a("undefined", "Original object not returned as first element");
                    expect(obj[3]).to.equal(true, "Original object not returned as first element");
                }
            }
        });
    });
    describe("Testing function asErrorLike(obj?: TDefined): Nilable<ErrorLike>", function() {
        it("JsTypeCommander.asErrorLike() should return undefined", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike();
            expect(result).to.a("undefined");
        });
        it("JsTypeCommander.asErrorLike(\" \") should return { message: \"Error\", name: \"ErrorLike\" }", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike(" ");
            expect(result).to.a("object");
            expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander.isPlainObject(result)) {
                expect(result.message).to.a("string", "message property type mismatch");
                expect(result.message).to.equal("Error", "message property value mismatch");
                expect(result.name).to.a("string", "name property type mismatch");
                expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(\"My Error\") should return { message: \"My Error\", name: \"ErrorLike\" }", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike("My Error");
            expect(result).to.a("object");
            expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander.isPlainObject(result)) {
                expect(result.message).to.a("string", "message property type mismatch");
                expect(result.message).to.equal("My Error", "message property value mismatch");
                expect(result.name).to.a("string", "name property type mismatch");
                expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(12) should return { message: \"Error 12\", number: 12, name: \"ErrorLike\" }", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike(12);
            expect(result).to.a("object");
            expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander.isPlainObject(result)) {
                expect(result.message).to.a("string", "message property type mismatch");
                expect(result.message).to.equal("Error 12", "message property mismatch");
                expect(result.number).to.a("number", "number property type mismatch");
                expect(result.number).to.equal(12, "number property mismatch");
                expect(result.name).to.a("string", "name property type mismatch");
                expect(result.name).to.equal("ErrorLike", "name property mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike({ description: \"My Error\" }) should return { message: \"My Error\", name: \"ErrorLike\" }", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike({ description: "My Error" });
            expect(result).to.a("object");
            expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander.isPlainObject(result)) {
                expect(result.message).to.a("string", "message property type mismatch");
                expect(result.message).to.equal("My Error", "message property value mismatch");
                expect(result.name).to.a("string", "name property type mismatch");
                expect(result.name).to.equal("ErrorLike", "name property value mismatch");
            }
        });
        let testObj: RangeError = new RangeError("Out of Range");
        it("JsTypeCommander.asErrorLike(new RangeError(\"Out of Range\")) should return { message: \"Out of Range\", name: \"RangeError\" }", function() {
            let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike(testObj);
            expect(result).to.a("object");
            expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
            if (JsTypeCommander.isPlainObject(result)) {
                expect(result.message).to.a("string", "message property type mismatch");
                expect(result.message).to.equal("Out of Range", "message property value mismatch");
                expect(result.name).to.a("string", "name property type mismatch");
                expect(result.name).to.equal("RangeError", "name property value mismatch");
                if (typeof(testObj.stack) == "string") {
                    expect(result.stack).to.a("string", "stack property type mismatch");
                    expect(result.stack).to.equal(testObj.stack, "name property value mismatch");
                } else
                    expect(result.stack).to.a("undefined", "stack property type mismatch");
            }
        });

        it("JsTypeCommander.asErrorLike(RangeError: thrownErr) should return { message: \"Out of Range\", name: \"RangeError\", stack: string }", function() {
            try { throw testObj; }
            catch (ex) {
                let result: JsTypeCommander.AnyNilable = JsTypeCommander.asErrorLike(ex);
                expect(result).to.a("object");
                expect(JsTypeCommander.isPlainObject(result)).to.equal(true, "Result is not a plain object");
                if (JsTypeCommander.isPlainObject(result)) {
                    expect(result.message).to.a("string", "message property type mismatch");
                    expect(result.message).to.equal("Out of Range", "message property value mismatch");
                    expect(result.name).to.a("string", "name property type mismatch");
                    expect(result.name).to.equal("RangeError", "name property value mismatch");
                    expect(result.stack).to.a("string", "stack property type mismatch");
                    expect(result.stack).to.equal(ex.stack, "name property value mismatch");
                }
            }
        });
    });
});