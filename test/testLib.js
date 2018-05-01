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
exports.TestLengthProp = TestLengthProp;
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
exports.TestArrayLike = TestArrayLike;
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
exports.AlmostArrayLike = AlmostArrayLike;
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
exports.TestErrorLike = TestErrorLike;
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
exports.TestErrorLike2 = TestErrorLike2;
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
exports.TestErrorLike3 = TestErrorLike3;
function argSet(getArgs, display, message) {
    return { display: display, getArgs: getArgs, message: message, _type: "ArgSet" };
}
exports.argSet = argSet;
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
exports.expectEqualTo = expectEqualTo;
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
exports.expectIsA = expectIsA;
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
exports.expectEqualToFalse = expectEqualToFalse;
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
exports.expectEqualToTrue = expectEqualToTrue;
function testFunction(callback, name, signature) {
    var expectations = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        expectations[_i - 3] = arguments[_i];
    }
    return { callback: callback, name: name, signature: signature, expectations: expectations, _type: "FunctionDefinition" };
}
exports.testFunction = testFunction;
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
exports.expectationDescription = expectationDescription;
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
exports.expectationSet = expectationSet;
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
exports.functionGroup = functionGroup;
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
exports.genericFunctionGroup = genericFunctionGroup;
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
exports.functionTypeGroup = functionTypeGroup;
function describeTestFunction(expectations, funcDef, getGenericArgs) {
    describe('Testing function ' + funcDef.name + funcDef.signature, function () {
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
exports.describeTestFunction = describeTestFunction;
function describeExpectationSet(expectations, expectationSet) {
    var setFunc = function () {
        var _this = this;
        expectationSet.functions.forEach(function (funcDef) {
            describeTestFunction.call(_this, expectations.concat(expectationSet.expectations), funcDef, expectationSet.getGenericArgs);
        }, this);
    };
    if (typeof (expectationSet.description) == "string" && expectationSet.description.trim().length > 0)
        describe(expectationSet.description, setFunc);
    else
        setFunc.call(this);
}
exports.describeExpectationSet = describeExpectationSet;
function describeFunctionGroups(expectations, functionGrp) {
    var testFunc = function () {
        var _this = this;
        functionGrp.sets.forEach(function (expectationSet) {
            describeExpectationSet.call(_this, expectations.concat(functionGrp.expectations), expectationSet);
        }, this);
    };
    if (typeof (functionGrp.description) == "string" && functionGrp.description.trim().length > 0)
        describe(functionGrp.description, testFunc);
    else
        testFunc.call(this);
}
exports.describeFunctionGroups = describeFunctionGroups;
function describeFunctionTypeGroups(functionTypeGroups) {
    functionTypeGroups.forEach(function (typeGroup) {
        describe('Testing ' + typeGroup.type + ' functions', function () {
            var _this = this;
            typeGroup.groups.forEach(function (functionGrp) {
                describeFunctionGroups.call(_this, typeGroup.expectations, functionGrp);
            }, this);
        });
    });
}
exports.describeFunctionTypeGroups = describeFunctionTypeGroups;
