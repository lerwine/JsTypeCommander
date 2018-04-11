'use strict';
var expect = require('chai').expect;
var tc = require('./dist/JsTypeCommander.js');
describe('isDefined function test', () => {
    it('should return false', () => {
        var result = tc.JsTypeCommander.isDefined();
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isDefined(null);
        expect(result).to.equal(true);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isDefined([undefined]);
        expect(result).to.equal(true);
    });
});
describe('isNull function test', () => {
    it('should return false', () => {
        var result = tc.JsTypeCommander.isNull();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isNull(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isNull(null);
        expect(result).to.equal(true);
    });
});
describe('isNil function test', () => {
    it('should return false', () => {
        var result = tc.JsTypeCommander.isNil();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isNil(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isNil(null);
        expect(result).to.equal(true);
    });
});
describe('isString function test', () => {
    it('should return false', () => {
        var result = tc.JsTypeCommander.isString();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isString(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isString(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isString(null);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isString("");
        expect(result).to.equal(true);
    });
});
describe('isStringIfDef function test', () => {
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringIfDef();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringIfDef(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringIfDef(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringIfDef(null);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringIfDef("");
        expect(result).to.equal(true);
    });
});
describe('isStringOrNull function test', () => {
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringOrNull();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNull(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNull(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNull(null);
        expect(result).to.equal(true);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringOrNull("");
        expect(result).to.equal(true);
    });
});
describe('isStringOrNil function test', () => {
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringOrNil();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNil(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNil(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = tc.JsTypeCommander.isStringOrNil(null);
        expect(result).to.equal(true);
    });
    it('should return true', () => {
        var result = tc.JsTypeCommander.isStringOrNil("");
        expect(result).to.equal(true);
    });
});
describe('toString function test', () => {
    it('should return undefined', () => {
        var result = tc.JsTypeCommander.toString();
        expect(result).to.equal(undefined);
    });
    it('should return "NaN" from Number.NaN', () => {
        var result = tc.JsTypeCommander.toString(Number.NaN);
        expect(result).to.equal("NaN")
    });
    it('should return "test" from ["test"]', () => {
        var result = tc.JsTypeCommander.toString(["test"]);
        expect(result).to.equal("test");
    });
    it('should return null from null', () => {
        var result = tc.JsTypeCommander.toString(null);
        expect(result).to.equal(null);
    });
    it('should return "" from ""', () => {
        var result = tc.JsTypeCommander.toString("");
        expect(result).to.equal("");
    });
    it('should return "test" from undefined, "test"', () => {
        var result = tc.JsTypeCommander.toString(undefined, "test");
        expect(result).to.equal("test");
    });
    it('should return "NaN" from Number.NaN, "test"', () => {
        var result = tc.JsTypeCommander.toString(Number.NaN, "test");
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"], "again"', () => {
        var result = tc.JsTypeCommander.toString(["test"], "again");
        expect(result).to.equal("test");
    });
    it('should return "test" from null, "test"', () => {
        var result = tc.JsTypeCommander.toString(null, "test");
        expect(result).to.equal("test");
    });
    it('should return "" from "", "test"', () => {
        var result = tc.JsTypeCommander.toString("", "test");
        expect(result).to.equal("");
    });
    it('should return "test" from "  ", "test", true', () => {
        var result = tc.JsTypeCommander.toString("  ", "test", true);
        expect(result).to.equal("test");
    });
    it('should return "test" from "", "test", true', () => {
        var result = tc.JsTypeCommander.toString("", "test", true);
        expect(result).to.equal("test");
    });
});
describe('asString function test', () => {
    it('should return "" from undefined', () => {
        var result = tc.JsTypeCommander.asString();
        expect(result).to.equal("");
    });
    it('should return "NaN" from Number.NaN', () => {
        var result = tc.JsTypeCommander.asString(Number.NaN);
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"]', () => {
        var result = tc.JsTypeCommander.asString(["test"]);
        expect(result).to.equal("test");
    });
    it('should return "" from null', () => {
        var result = tc.JsTypeCommander.asString(null);
        expect(result).to.equal("");
    });
    it('should return "" from ""', () => {
        var result = tc.JsTypeCommander.asString("");
        expect(result).to.equal("");
    });
    it('should return "test" from "test"', () => {
        var result = tc.JsTypeCommander.asString(undefined, "test");
        expect(result).to.equal("test");
    });
    it('should return "NaN" from Number.NaN, "test"', () => {
        var result = tc.JsTypeCommander.asString(Number.NaN, "test");
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"], "again"', () => {
        var result = tc.JsTypeCommander.asString(["test"], "again");
        expect(result).to.equal("test");
    });
    it('should return "test" from null, "test"', () => {
        var result = tc.JsTypeCommander.asString(null, "test");
        expect(result).to.equal("test");
    });
    it('should return "" from "", "test"', () => {
        var result = tc.JsTypeCommander.asString("", "test");
        expect(result).to.equal("");
    });
    it('should return "test" from "  ", "test", true', () => {
        var result = tc.JsTypeCommander.asString("  ", "test", true);
        expect(result).to.equal("test");
    });
    it('should return "test" from "", "test", true', () => {
        var result = tc.JsTypeCommander.asString("", "test", true);
        expect(result).to.equal("test");
    });
});
