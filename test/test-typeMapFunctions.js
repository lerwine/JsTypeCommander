"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
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
mocha_1.describe("Testing type map functions", function () {
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
mocha_1.describe("Testing function mapInto(obj: any, callbackFn: RecursiveMapCallbackFn, options?: MapIntoOptions): any", function () {
    var sourceNumber = 7;
    var expectedNumber = sourceNumber / 2;
    it("JsTypeCommander.mapInto(" + sourceNumber + ", (current, key, source, target) => current / 2)) should return " + expectedNumber, function () {
        var callbackFn = function (current, key, source, target) {
            return current / 2;
        };
        var actual = JsTypeCommander_1.JsTypeCommander.mapInto(sourceNumber, callbackFn);
        chai_1.expect(actual).to.a("number");
        chai_1.expect(actual).to.equal(expectedNumber);
    });
    var sourceArray1 = [true, "2", 3];
    var expectedArray1 = ["true", "2", "3"];
    it("JsTypeCommander.mapInto(" + JSON.stringify(sourceArray1) + ", (current, key, source, target): any)) should return" + JSON.stringify(expectedArray1), function () {
        var callbackFn = function (current, key, source, target) {
            if (JsTypeCommander_1.JsTypeCommander.notDefined(source))
                return [];
            return current.toString();
        };
        var actual = JsTypeCommander_1.JsTypeCommander.mapInto(sourceArray1, callbackFn);
        chai_1.expect(actual).to.a("Array");
        if (Array.isArray(actual)) {
            chai_1.expect(actual.length).to.equal(expectedArray1.length, "length mismatch");
            for (var i = 0; i < expectedArray1.length; i++) {
                chai_1.expect(actual[i]).to.a("string", "Element " + i + " type mismatch");
                chai_1.expect(actual[i]).to.equal(expectedArray1[i], "Element " + i + " value mismatch");
            }
        }
    });
    var myThisObj = { count: 0, count2: 0 };
    var sourceOpts1 = {
        thisObj: myThisObj,
        totalMaxItems: 6
    };
    var sourceArray2 = [undefined, null, true, false, 0, "test", 5.6];
    var expectedArray2 = ["undefined", "null", "true", "false", "0", "\"test\""];
    it("JsTypeCommander.mapInto(" + (sourceArray2.map(function (i) {
        if (JsTypeCommander_1.JsTypeCommander.notDefined(i))
            return "undefined";
        if (JsTypeCommander_1.JsTypeCommander.isNull(i))
            return "null";
        return JSON.stringify(i);
    })) + ", (current, key, source, target): any, " + JSON.stringify(sourceOpts1) + ")) should return" + JSON.stringify(expectedArray2) + " and thisObj.count should be " + expectedArray2.length + 1, function () {
        var callbackFn = function (current, key, source, target) {
            this.count++;
            if (JsTypeCommander_1.JsTypeCommander.notDefined(source))
                return [];
            if (JsTypeCommander_1.JsTypeCommander.notDefined(current))
                return "undefined";
            if (JsTypeCommander_1.JsTypeCommander.isNull(current))
                return "null";
            return JSON.stringify(current);
        };
        var actual = JsTypeCommander_1.JsTypeCommander.mapInto(sourceArray2, callbackFn, sourceOpts1);
        chai_1.expect(actual).to.a("Array");
        if (Array.isArray(actual)) {
            if (actual.length != expectedArray2.length) {
                chai_1.expect(actual).to.equal(expectedArray2);
                chai_1.expect(actual.length).to.equal(expectedArray2.length, "length mismatch");
            }
            for (var i = 0; i < expectedArray2.length; i++) {
                chai_1.expect(actual[i]).to.a("string", "Element " + i + " type mismatch in ");
                chai_1.expect(actual[i]).to.equal(expectedArray2[i], "Element " + i + " value mismatch");
            }
        }
        chai_1.expect(myThisObj.count).to.equal(expectedArray2.length + 1);
    });
    var sourceArray3 = [{ a: 1, b: 2 }, 3, 4, ["Eins", "Svein", "Drei"]];
    var expectedArray3 = [{ count: 2, a: 1, b: 2 }, 3, 4, ["Eins", "Svein", "Drei"]];
    myThisObj.count = 0;
    myThisObj.count2 = 0;
    var sourceOpts2 = { thisObj: myThisObj };
    it("JsTypeCommander.mapInto(" + JSON.stringify(sourceArray3) + ", (current, key, source, target): any, " + JSON.stringify(sourceOpts2) + ")) should return " + JSON.stringify(expectedArray3) + " and thisObj.count should be 10", function () {
        var callbackFn = function (current, key, source, target) {
            this.count++;
            if (JsTypeCommander_1.JsTypeCommander.notDefined(source) || Array.isArray(current))
                return [];
            return (JsTypeCommander_1.JsTypeCommander.isObject(current)) ? { count: this.count } : current;
        };
        myThisObj.count = 0;
        myThisObj.count2 = 0;
        var actual = JsTypeCommander_1.JsTypeCommander.mapInto(sourceArray3, callbackFn, sourceOpts2);
        (sourceArray3[0])["a"] = 5;
        (sourceArray3[0])["b"] = 5;
        sourceArray3[1] = 5;
        sourceArray3[2] = 5;
        sourceArray3[3][0] = "5";
        sourceArray3[3][1] = "5";
        sourceArray3[3][2] = "5";
        chai_1.expect(actual).to.a("Array");
        if (Array.isArray(actual)) {
            chai_1.expect(actual.length).to.equal(expectedArray3.length, "length mismatch");
            var obj = actual[0];
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isNonArrayObject(obj)).to.equal(true, "Element 0 is not a non-array object");
            if (JsTypeCommander_1.JsTypeCommander.isNonArrayObject(obj)) {
                var e0 = (expectedArray3[0]);
                chai_1.expect(obj["a"]).to.a("number", "actual[0].a is not a number");
                chai_1.expect(obj["a"]).to.equal(e0["a"], "actual[0].a value mismatch");
                chai_1.expect(obj["b"]).to.a("number", "actual[0].b is not a number");
                chai_1.expect(obj["b"]).to.equal(e0["b"], "actual[0].b value mismatch");
                chai_1.expect(obj["count"]).to.a("number", "actual[0].count is not a number");
            }
            obj = actual[1];
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isNumber(obj)).to.equal(true, "Element 1 is not a number");
            if (JsTypeCommander_1.JsTypeCommander.isNumber(obj)) {
                chai_1.expect(obj).to.a("number", "actual[1] is not a number");
                chai_1.expect(obj).to.equal(expectedArray3[1], "actual[1] value mismatch");
            }
            obj = actual[2];
            chai_1.expect(JsTypeCommander_1.JsTypeCommander.isNumber(obj)).to.equal(true, "Element 2 is not a number");
            if (JsTypeCommander_1.JsTypeCommander.isNumber(obj)) {
                chai_1.expect(obj).to.a("number", "actual[2] is not a number");
                chai_1.expect(obj).to.equal(expectedArray3[2], "actual[2] value mismatch");
            }
            obj = actual[3];
            chai_1.expect(obj).to.a("Array", "Element 3 is not an array");
            if (Array.isArray(obj)) {
                var arr = (expectedArray3[3]);
                chai_1.expect(obj.length).to.equal(arr.length);
                for (var i = 0; i < arr.length; i++) {
                    chai_1.expect(obj[i]).to.a("string", "actual[3][" + i + "] is not a string");
                    chai_1.expect(obj[i]).to.equal(arr[i], "actual[3][" + i + "] value mismatch");
                }
            }
        }
        chai_1.expect(myThisObj.count).to.equal(10, "thisObj.count failed");
    });
});
