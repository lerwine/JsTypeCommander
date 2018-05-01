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
mocha_1.describe("Testing function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any", function () {
});
