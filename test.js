'use strict';
var expect = require('chai').expect;
var assert = require('chai').assert;
var JsTypeCommander = require('./dist/JsTypeCommander.js');

function ExampleArrayLike() {
    this.length = 3;
    this[0] = "1";
    this[1] = 3;
    this[2] = "4";
}

var TestFunctionType = {
    notNil: 0,
    ifDef: 1,
    orNull: 2,
    orNil: 3
};
var JsType = {
    Undefined: 0,
    Object: 1,
    String: 2,
    Number: 3,
    Boolean: 4,
    Function: 5
};
var JsVariant = {
    None: 0,
    Null: 1,
    NonEmpty: 2,
    Plain: 3,
    Empty: 4,
    Whitespace: 5,
    NzFloat: 6,
    NzInt: 7,
    Zero: 8,
    Infinity: 9,
    NaN: 10,
    Error: 11,
    ErrorLike: 12,
    Date: 13,
    ArrayLike: 14
};

var testArgSets = [
    { name: '', getArgs: () => [], jsType: JsType.Undefined, variant: JsVariant.None },
    { name: 'undefined', getArgs: () => [undefined], jsType: JsType.Undefined, variant: JsVariant.None },
    { name: 'new RangeError("test")', getArgs: () => [new RangeError("test")], jsType: JsType.Object, variant: JsVariant.Error },
    { name: '{ message: "My Message" }', getArgs: () => [{ message: "My Message" }], jsType: JsType.Object, variant: JsVariant.ErrorLike },
    { name: 'Date.now()', getArgs: () => [new Date(Date.now())], jsType: JsType.Object, variant: JsVariant.Date },
    { name: 'new ExampleArrayLike()', getArgs: () => [new ExampleArrayLike()], jsType: JsType.Object, variant: JsVariant.ArrayLike },
    { name: '"Test"', getArgs: () => ["Test"], jsType: JsType.String, variant: JsVariant.NonEmpty },
    { name: '""', getArgs: () => [""], jsType: JsType.String, variant: JsVariant.Empty },
    { name: '"\\n"', getArgs: () => ["\n"], jsType: JsType.String, variant: JsVariant.Whitespace },
    { name: '10.0001', getArgs: () => [10.0001], jsType: JsType.Number, variant: JsVariant.NzFloat },
    { name: '1', getArgs: () => [1], jsType: JsType.Number, variant: JsVariant.NzInt },
    { name: '-1', getArgs: () => [-1], jsType: JsType.Number, variant: JsVariant.NzInt },
    { name: '0', getArgs: () => [0], jsType: JsType.Number, variant: JsVariant.Zero },
    { name: 'Infinity', getArgs: () => [Infinity], jsType: JsType.Number, variant: JsVariant.Infinity },
    { name: 'NaN', getArgs: () => [NaN], jsType: JsType.Number, variant: JsVariant.NaN },
    { name: 'true', getArgs: () => [true], jsType: JsType.Boolean, variant: JsVariant.None },
    { name: 'false', getArgs: () => [false], jsType: JsType.Boolean, variant: JsVariant.None },
    { name: 'null', getArgs: () => [null], jsType: JsType.Object, variant: JsVariant.Null },
    { name: '{}', getArgs: () => [{}], jsType: JsType.Object, variant: JsVariant.Plain },
    { name: '[]', getArgs: () => [[]], jsType: JsType.Object, variant: JsVariant.Empty },
    { name: '[undefined]', getArgs: () => [[undefined]], jsType: JsType.Object, variant: JsVariant.NonEmpty },
    { name: 'function() { return true; }', getArgs: () => [function() { return true; }], jsType: JsType.Function, variant: JsVariant.None }
];

var testFunctionGroups = [
    {
        name: 'basic',
        subGroups: [
            {
                functions: [
                    { name: 'notDefined', type: TestFunctionType.ifDef },
                    { name: 'isNull', type: TestFunctionType.orNull },
                    { name: 'isNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => false,
                genericArgs: []
            }
        ]
    }, {
        name: 'isNumber',
        subGroups: [
            {
                functions: [
                    { name: 'isNumber', type: TestFunctionType.notNil },
                    { name: 'isNumberIfDef', type: TestFunctionType.ifDef },
                    { name: 'isNumberOrNull', type: TestFunctionType.orNull },
                    { name: 'isNumberOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Number && (a.variant == JsVariant.NzInt || a.variant == JsVariant.NzFloat || a.variant == JsVariant.Zero),
                genericArgs: []
            }, {
                functions: [
                    { name: 'isInfinite', type: TestFunctionType.notNil },
                    { name: 'isNumberNaNorNull', type: TestFunctionType.orNull }
                ],
                typeFilter: (a, f) => a.jsType == JsType.Number && (f != "isInfinite" || a.variant == JsVariant.Infinity),
                genericArgs: []
            }
        ]
    }, {
        name: 'isBoolean',
        subGroups: [
            {
                functions: [
                    { name: 'isBoolean', type: TestFunctionType.notNil },
                    { name: 'isBooleanIfDef', type: TestFunctionType.ifDef },
                    { name: 'isBooleanOrNull', type: TestFunctionType.orNull },
                    { name: 'isBooleanOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Boolean,
                genericArgs: []
            }
        ]
    }, {
        name: 'isString',
        subGroups: [
            {
                functions: [
                    { name: 'isString', type: TestFunctionType.notNil },
                    { name: 'isStringIfDef', type: TestFunctionType.ifDef },
                    { name: 'isStringOrNull', type: TestFunctionType.orNull },
                    { name: 'isStringOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.String,
                genericArgs: []
            }, {
                functions: [
                    { name: 'isEmptyString', type: TestFunctionType.notNil },
                    { name: 'isEmptyStringIfDef', type: TestFunctionType.ifDef },
                    { name: 'isEmptyStringOrNull', type: TestFunctionType.orNull },
                    { name: 'isEmptyStringOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.String && a.variant == JsVariant.Empty,
                genericArgs: []
            }, {
                functions: [
                    { name: 'isEmptyOrWhitespace', type: TestFunctionType.notNil },
                    { name: 'isEmptyOrWhitespaceIfDef', type: TestFunctionType.ifDef },
                    { name: 'isNullOrWhitespace', type: TestFunctionType.orNull },
                    { name: 'isNilOrWhitespace', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.String && (a.variant == JsVariant.Whitespace || a.variant == JsVariant.Empty),
                genericArgs: []
            }
        ]
    }, {
        name: 'isFunction',
        subGroups: [
            {
                functions: [
                    { name: 'isFunction', type: TestFunctionType.notNil },
                    { name: 'isFunctionIfDef', type: TestFunctionType.ifDef },
                    { name: 'isFunctionOrNull', type: TestFunctionType.orNull },
                    { name: 'isFunctionOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Function,
                genericArgs: []
            }
        ]
    }, {
        name: 'isObject',
        subGroups: [
            {
                functions: [
                    { name: 'isObject', type: TestFunctionType.notNil },
                    { name: 'isObjectIfDef', type: TestFunctionType.ifDef },
                    { name: 'isObjectOrNull', type: TestFunctionType.orNull },
                    { name: 'isObjectOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object,
                genericArgs: []
            }, {
                functions: [
                    { name: 'isPlainObject', type: TestFunctionType.notNil },
                    { name: 'isPlainObjectIfDef', type: TestFunctionType.ifDef },
                    { name: 'isPlainObjectOrNull', type: TestFunctionType.orNull },
                    { name: 'isPlainObjectOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && (a.variant == JsVariant.Plain || a.variant == JsVariant.ErrorLike),
                genericArgs: []
            }, {
                functions: [
                    { name: 'isNonArrayObject', type: TestFunctionType.notNil },
                    { name: 'isNonArrayObjectIfDef', type: TestFunctionType.ifDef },
                    { name: 'isNonArrayObjectOrNull', type: TestFunctionType.orNull },
                    { name: 'isNonArrayObjectOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && a.variant != JsVariant.Empty && a.variant != JsVariant.NonEmpty,
                genericArgs: []
            }
        ]
    }, {
        name: 'isArray',
        subGroups: [
            {
                functions: [
                    { name: 'isArray', type: TestFunctionType.notNil },
                    { name: 'isArrayIfDef', type: TestFunctionType.ifDef },
                    { name: 'isArrayOrNull', type: TestFunctionType.orNull },
                    { name: 'isArrayOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && (a.variant == JsVariant.Empty || a.variant == JsVariant.NonEmpty),
                genericArgs: []
            }, {
                functions: [
                    { name: 'isEmptyArray', type: TestFunctionType.notNil },
                    { name: 'isEmptyArrayIfDef', type: TestFunctionType.ifDef },
                    { name: 'isEmptyArrayOrNull', type: TestFunctionType.orNull },
                    { name: 'isEmptyArrayOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && a.variant == JsVariant.Empty,
                genericArgs: []
            }, {
                functions: [
                    { name: 'isArrayLike', type: TestFunctionType.notNil },
                    { name: 'isArrayLikeIfDef', type: TestFunctionType.ifDef },
                    { name: 'isArrayLikeOrNull', type: TestFunctionType.orNull },
                    { name: 'isArrayLikeOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && (a.variant == JsVariant.Empty || a.variant == JsVariant.NonEmpty || a.variant == JsVariant.ArrayLike),
                genericArgs: []
            }
        ]
    }, {
        name: 'isErrorLike',
        subGroups: [
            {
                functions: [
                    { name: 'isErrorLike', type: TestFunctionType.notNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && (a.variant == JsVariant.Error || a.variant == JsVariant.ErrorLike),
                genericArgs: []
            }
        ]
    }, {
        name: 'derivesFrom',
        subGroups: [
            {
                functions: [
                    { name: 'derivesFrom', type: TestFunctionType.notNil },
                    { name: 'derivesFromIfDef', type: TestFunctionType.ifDef },
                    { name: 'derivesFromOrNull', type: TestFunctionType.orNull },
                    { name: 'derivesFromOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && a.variant == JsVariant.Error,
                genericArgs: [{ name: "Error", getArg: () => Error }]
            }, {
                functions: [
                    { name: 'derivesFrom', type: TestFunctionType.notNil },
                    { name: 'derivesFromIfDef', type: TestFunctionType.ifDef },
                    { name: 'derivesFromOrNull', type: TestFunctionType.orNull },
                    { name: 'derivesFromOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => a.jsType == JsType.Object && a.variant == JsVariant.Date,
                genericArgs: [{ name: "Date", getArg: () => Date }]
            }, {
                functions: [
                    { name: 'derivesFrom', type: TestFunctionType.notNil },
                    { name: 'derivesFromIfDef', type: TestFunctionType.ifDef },
                    { name: 'derivesFromOrNull', type: TestFunctionType.orNull },
                    { name: 'derivesFromOrNil', type: TestFunctionType.orNil }
                ],
                typeFilter: a => true,
                genericArgs: [{ name: "Object", getArg: () => Object }]
            }
        ]
    }
];

var exampleError;
try { throw new RangeError("Test"); }
catch (e) { exampleError = e; }

function TypeGateCallbackHelper(argDesc, getArg, expectedHandler, simpleCheck, omitHandlers) {
    this.returnDesc = expectedHandler + " (calling " + TypeGateCallbackHelper.handlerValueToName(expectedHandler) + "(a))";
    this.getArg = getArg;
    this.expected = expectedHandler;
    this.invocationCount = 0;
    this.handlerFlags = 0;
    this.target = undefined;
    this.simpleCheck = simpleCheck;
    this.getArgs = () => {
        this.invocationCount = 0;
        this.handlerFlags = 0;
        this.target = undefined;
        return (typeof(this.simpleCheck) == "boolean") ? [this.getArg(), this, this.simpleCheck] : [this.getArg(), this];
    };
    this.raiseCallback = function(target, handler) {
        this.invocationCount++;
        this.handlerFlags |= handler;
        this.target = target;
        return handler;
    };
    this.argDesc = argDesc + ", { " + [TypeGateCallbackHelper.handlers.whenBoolean, TypeGateCallbackHelper.handlers.whenInfinity,
        TypeGateCallbackHelper.handlers.whenNaN, TypeGateCallbackHelper.handlers.whenNumber,
        TypeGateCallbackHelper.handlers.whenString, TypeGateCallbackHelper.handlers.whenSymbol,
        TypeGateCallbackHelper.handlers.whenFunction, TypeGateCallbackHelper.handlers.whenArray,
        TypeGateCallbackHelper.handlers.whenArrayLike, TypeGateCallbackHelper.handlers.whenNotArrayLike,
        TypeGateCallbackHelper.handlers.whenNull, TypeGateCallbackHelper.handlers.whenObject,
        TypeGateCallbackHelper.handlers.whenUndefined].filter(i => {
            if (i == expectedHandler)
                return true;
            for (var a = 4; a < arguments.length; a++) {
                if (typeof(arguments[a]) == "number" && arguments[a] == i)
                    return false;
            }
            return true;
        }).map(i => {
            var n = TypeGateCallbackHelper.handlerValueToName(i);
            this[n] = v => this.raiseCallback(v, i);
            return n;
        }, this).concat(['otherwise']).join(': fn(), ') + ': fn() }, ' + this.simpleCheck;
    this.otherwise = v => this.raiseCallback(v, TypeGateCallbackHelper.handlers.otherwise);
}
TypeGateCallbackHelper.handlers = {
    whenBoolean: 0x0001,
    whenFunction: 0x0002,
    whenInfinity: 0x0004,
    whenNaN: 0x0008,
    whenNumber: 0x0010,
    whenArray: 0x0020,
    whenArrayLike: 0x0040,
    whenNotArrayLike: 0x0080,
    whenString: 0x0100,
    whenSymbol: 0x0200,
    whenNull: 0x0400,
    whenUndefined: 0x0800,
    whenObject: 0x1000,
    otherwise: 0x2000
};
TypeGateCallbackHelper.handlerValueToName = function(value) {
    switch(value) {
        case TypeGateCallbackHelper.handlers.whenBoolean:
            return "whenBoolean";
        case TypeGateCallbackHelper.handlers.whenFunction:
            return "whenFunction";
        case TypeGateCallbackHelper.handlers.whenInfinity:
            return "whenInfinity";
        case TypeGateCallbackHelper.handlers.whenNaN:
            return "whenNaN";
        case TypeGateCallbackHelper.handlers.whenNumber:
            return "whenNumber";
        case TypeGateCallbackHelper.handlers.whenArray:
            return "whenArray";
        case TypeGateCallbackHelper.handlers.whenArrayLike:
            return "whenArrayLike";
        case TypeGateCallbackHelper.handlers.whenNotArrayLike:
            return "whenNotArrayLike";
        case TypeGateCallbackHelper.handlers.whenString:
            return "whenString";
        case TypeGateCallbackHelper.handlers.whenSymbol:
            return "whenSymbol";
        case TypeGateCallbackHelper.handlers.whenNull:
            return "whenNull";
        case TypeGateCallbackHelper.handlers.whenUndefined:
            return "whenUndefined";
        case TypeGateCallbackHelper.handlers.whenObject:
            return "whenObject";
        case TypeGateCallbackHelper.handlers.otherwise:
            return "otherwise";
    }
};


var conversionFunctionGroups = [
    {
        convertsTo: 'mapped values',
        functions: [
            {
                name: 'mapByTypeValue',
                evaluate: (result, expected, t) => {
                    expect(t.invocationCount).to.equal(1, "Invocation count");
                    expect(result).to.equals(expected, TypeGateCallbackHelper.handlerValueToName(result));
                },
                tests: [
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.whenUndefined),
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenUndefined),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.whenNull),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenNull),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArrayLike, undefined, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenObject, undefined, TypeGateCallbackHelper.handlers.whenArrayLike, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenArrayLike),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenObject, undefined, TypeGateCallbackHelper.handlers.whenArrayLike),
                    new TypeGateCallbackHelper('true', () => true, TypeGateCallbackHelper.handlers.whenBoolean),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.whenBoolean),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenBoolean),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.whenFunction),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenFunction),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNaN),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNumber, undefined, TypeGateCallbackHelper.handlers.whenNaN),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, undefined, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, undefined, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenNumber, undefined, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.whenNumber),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenNumber),
                    new TypeGateCallbackHelper('{ length: 1 }', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenNotArrayLike),
                    new TypeGateCallbackHelper('12', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenObject, undefined, TypeGateCallbackHelper.handlers.whenNotArrayLike),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.whenString),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenString),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.whenSymbol),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.otherwise, undefined, TypeGateCallbackHelper.handlers.whenSymbol),
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.whenUndefined, false),
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenUndefined),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.whenNull, false),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenNull),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArray, false),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArrayLike, false, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenObject, false, TypeGateCallbackHelper.handlers.whenArrayLike, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenArrayLike, false),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenObject, false, TypeGateCallbackHelper.handlers.whenArrayLike),
                    new TypeGateCallbackHelper('true', () => true, TypeGateCallbackHelper.handlers.whenBoolean, false),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.whenBoolean, false),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenBoolean),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.whenFunction, false),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenFunction),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNaN, false),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNumber, false, TypeGateCallbackHelper.handlers.whenNaN),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity, false),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity, false),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenInfinity, false),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, false, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, false, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenNumber, false, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.whenNumber, false),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenNumber),
                    new TypeGateCallbackHelper('{ length: 1 }', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenNotArrayLike, false),
                    new TypeGateCallbackHelper('12', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenObject, false, TypeGateCallbackHelper.handlers.whenNotArrayLike),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.whenString, false),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenString),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.whenSymbol, false),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.otherwise, false, TypeGateCallbackHelper.handlers.whenSymbol),
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.whenUndefined, true),
                    new TypeGateCallbackHelper('undefined', () => undefined, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenUndefined),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.whenNull, true),
                    new TypeGateCallbackHelper('null', () => null, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenNull),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArray, true),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenArrayLike, true, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('[NaN]', () => [NaN], TypeGateCallbackHelper.handlers.whenObject, true, TypeGateCallbackHelper.handlers.whenArrayLike, TypeGateCallbackHelper.handlers.whenArray),
                    new TypeGateCallbackHelper('{ length: 1 }', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenArrayLike, true),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenArrayLike, true),
                    new TypeGateCallbackHelper('new ExampleArrayLike()', () => new ExampleArrayLike(), TypeGateCallbackHelper.handlers.whenObject, true, TypeGateCallbackHelper.handlers.whenArrayLike),
                    new TypeGateCallbackHelper('true', () => true, TypeGateCallbackHelper.handlers.whenBoolean, true),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.whenBoolean, true),
                    new TypeGateCallbackHelper('false', () => false, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenBoolean),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.whenFunction, true),
                    new TypeGateCallbackHelper('() => false', () => () => false, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenFunction),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNaN, true),
                    new TypeGateCallbackHelper('NaN', () => NaN, TypeGateCallbackHelper.handlers.whenNumber, true, TypeGateCallbackHelper.handlers.whenNaN),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity, true),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenInfinity, true),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenInfinity, true),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.NEGATIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, true, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Number.NEGATIVE_INFINITY', () => Number.POSITIVE_INFINITY, TypeGateCallbackHelper.handlers.whenNumber, true, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('Infinity', () => Infinity, TypeGateCallbackHelper.handlers.whenNumber, true, TypeGateCallbackHelper.handlers.whenInfinity),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.whenNumber, true),
                    new TypeGateCallbackHelper('12', () => 12, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenNumber),
                    new TypeGateCallbackHelper('{ length: -1 }', () => { return { length: -1 }; }, TypeGateCallbackHelper.handlers.whenNotArrayLike, true),
                    new TypeGateCallbackHelper('12', () => { return { length: 1 }; }, TypeGateCallbackHelper.handlers.whenObject, true, TypeGateCallbackHelper.handlers.whenNotArrayLike),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.whenString, true),
                    new TypeGateCallbackHelper('"12"', () => "12", TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenString),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.whenSymbol, true),
                    new TypeGateCallbackHelper('Symbol.iterator', () => Symbol.iterator, TypeGateCallbackHelper.handlers.otherwise, true, TypeGateCallbackHelper.handlers.whenSymbol)
                ]
            }
        ]
    }/*, {
        convertsTo: 'string values',
        functions: [
            {
                name: 'asString',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: 'undefined', getArgs: () => [], expected: undefined },
                    { argDesc: 'undefined', returnDesc: 'undefined', getArgs: () => [undefined], expected: undefined },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: null },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: 'NaN', returnDesc: '"NaN"', getArgs: () => [NaN], expected: "NaN" },
                    { argDesc: '12', returnDesc: '"12"', getArgs: () => [12], expected: "12" },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'undefined, 7', returnDesc: '"7"', getArgs: () => [undefined, 7], expected: "7" },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'null, "Test"', returnDesc: '"Test"', getArgs: () => [null, "Test"], expected: "Test" },
                    { argDesc: 'null, NaN', returnDesc: '"NaN"', getArgs: () => [null, NaN], expected: "NaN" },
                    { argDesc: '"", "Test"', returnDesc: '""', getArgs: () => ["", "Test"], expected: "" },
                    { argDesc: 'NaN, "Test"', returnDesc: '"NaN"', getArgs: () => [NaN, "Test"], expected: "NaN" },
                    { argDesc: '12, "Test"', returnDesc: '"12"', getArgs: () => [12, "Test"], expected: "12" },
                    { argDesc: 'undefined, undefined, true', returnDesc: 'undefined', getArgs: () => [undefined, undefined, true], expected: undefined },
                    { argDesc: 'null, null, true', returnDesc: 'null', getArgs: () => [null, null, true], expected: null },
                    { argDesc: '"", null, true', returnDesc: '""', getArgs: () => ["", null, true], expected: "" },
                    { argDesc: 'NaN, null, true', returnDesc: '"NaN"', getArgs: () => [NaN, null, true], expected: "NaN" },
                    { argDesc: '12, null, true', returnDesc: '"12"', getArgs: () => [12, null, true], expected: "12" },
                    { argDesc: 'undefined, null, true', returnDesc: 'null', getArgs: () => [undefined, null, true], expected: null },
                    { argDesc: 'undefined, 7, true', returnDesc: '"7"', getArgs: () => [undefined, 7, true], expected: "7" },
                    { argDesc: 'undefined, null, true', returnDesc: 'null', getArgs: () => [undefined, null, true], expected: null },
                    { argDesc: 'null, "Test", true', returnDesc: '"Test"', getArgs: () => [null, "Test", true], expected: "Test" },
                    { argDesc: 'null, NaN, true', returnDesc: '"NaN"', getArgs: () => [null, NaN, true], expected: "NaN" },
                    { argDesc: '"", "Test", true', returnDesc: '"Test"', getArgs: () => ["", "Test", true], expected: "Test" },
                    { argDesc: '"\\n", "Test", true', returnDesc: '"Test"', getArgs: () => ["", "Test", true], expected: "Test" },
                    { argDesc: '0, "Test", true', returnDesc: '"0"', getArgs: () => [0, "Test", true], expected: "0" },
                    { argDesc: '12, "Test", true', returnDesc: '"12"', getArgs: () => [12, "Test", true], expected: "12" }
                ]
            }, {
                name: 'toString',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: 'undefined', getArgs: () => [], expected: "" },
                    { argDesc: 'undefined', returnDesc: 'undefined', getArgs: () => [undefined], expected: "" },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: 'NaN', returnDesc: '"NaN"', getArgs: () => [NaN], expected: "NaN" },
                    { argDesc: '12', returnDesc: '"12"', getArgs: () => [12], expected: "12" },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: "" },
                    { argDesc: 'undefined, 7', returnDesc: '"7"', getArgs: () => [undefined, 7], expected: "7" },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: "" },
                    { argDesc: 'null, "Test"', returnDesc: '"Test"', getArgs: () => [null, "Test"], expected: "Test" },
                    { argDesc: 'null, NaN', returnDesc: '"NaN"', getArgs: () => [null, NaN], expected: "NaN" },
                    { argDesc: '"", "Test"', returnDesc: '""', getArgs: () => ["", "Test"], expected: "" },
                    { argDesc: 'NaN, "Test"', returnDesc: '"NaN"', getArgs: () => [NaN, "Test"], expected: "NaN" },
                    { argDesc: '12, "Test"', returnDesc: '"12"', getArgs: () => [12, "Test"], expected: "12" },
                    { argDesc: 'undefined, undefined, true', returnDesc: 'undefined', getArgs: () => [undefined, undefined, true], expected: "" },
                    { argDesc: 'null, null, true', returnDesc: 'null', getArgs: () => [null, null, true], expected: "" },
                    { argDesc: '"", null, true', returnDesc: '""', getArgs: () => ["", null, true], expected: "" },
                    { argDesc: 'NaN, null, true', returnDesc: '"NaN"', getArgs: () => [NaN, null, true], expected: "NaN" },
                    { argDesc: '12, null, true', returnDesc: '"12"', getArgs: () => [12, null, true], expected: "12" },
                    { argDesc: 'undefined, null, true', returnDesc: 'null', getArgs: () => [undefined, null, true], expected: "" },
                    { argDesc: 'undefined, 7, true', returnDesc: '"7"', getArgs: () => [undefined, 7, true], expected: "7" },
                    { argDesc: 'undefined, null, true', returnDesc: 'null', getArgs: () => [undefined, null, true], expected: "" },
                    { argDesc: 'null, "Test", true', returnDesc: '"Test"', getArgs: () => [null, "Test", true], expected: "Test" },
                    { argDesc: 'null, NaN, true', returnDesc: '"NaN"', getArgs: () => [null, NaN, true], expected: "NaN" },
                    { argDesc: '"", "Test", true', returnDesc: '"Test"', getArgs: () => ["", "Test", true], expected: "Test" },
                    { argDesc: '"\\n", "Test", true', returnDesc: '"Test"', getArgs: () => ["", "Test", true], expected: "Test" },
                    { argDesc: '0, "Test", true', returnDesc: '"0"', getArgs: () => [0, "Test", true], expected: "0" },
                    { argDesc: '12, "Test", true', returnDesc: '"12"', getArgs: () => [12, "Test", true], expected: "12" }
                ]
            }, {
                name: 'trimStart',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '""', getArgs: () => [], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: '" Test   1  "', returnDesc: '"Test   1  "', getArgs: () => [" Test   1  "], expected: "Test   1  " },
                    { argDesc: '" \\tTest\\t  2 \\t "', returnDesc: '"Test\\t  2 \\t "', getArgs: () => [" \tTest\t  2 \t "], expected: "Test\t  2 \t " },
                    { argDesc: '" \\nTest\\n3  \\n"', returnDesc: '"Test\\n3  \\n"', getArgs: () => [" \nTest\n3  \n"], expected: "Test\n3  \n" }
                ]
            }, {
                name: 'trimEnd',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '""', getArgs: () => [], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: '" Test   1  "', returnDesc: '" Test   1"', getArgs: () => [" Test   1  "], expected: " Test   1" },
                    { argDesc: '" \\tTest\\t 2 \\t "', returnDesc: '" \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t "], expected: " \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n"', returnDesc: '" \\nTest\\n3"', getArgs: () => [" \nTest\n3  \n"], expected: " \nTest\n3" }
                ]
            }, {
                name: 'asNormalizedWs',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '""', getArgs: () => [], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: '" Test   1  "', returnDesc: '"Test 1"', getArgs: () => [" Test   1  "], expected: "Test 1" },
                    { argDesc: '" \\tTest\\t 2 \t "', returnDesc: '"Test 2"', getArgs: () => [" \tTest\t 2 \t "], expected: "Test 2" },
                    { argDesc: '" \\nTest\\n3  \n"', returnDesc: '"Test 3"', getArgs: () => [" \nTest\n3  \n"], expected: "Test 3" }
                ]
            }, {
                name: 'ucFirst',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '""', getArgs: () => [], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: '" test   1  "', returnDesc: '" Test   1  "', getArgs: () => [" test   1  "], expected: " Test   1  " },
                    { argDesc: '" \\ttest\\t 2 \\t "', returnDesc: '" \\tTest\\t 2 \\t "', getArgs: () => [" \ttest\t 2 \t "], expected: " \tTest\t 2 \t " },
                    { argDesc: '" \\ntest\\n3  \\n"', returnDesc: '" \\nTest\\n3  \\n"', getArgs: () => [" \ntest\n3  \n"], expected: " \nTest\n3  \n" },
                    { argDesc: '" \\n.test\\n3  \\n"', returnDesc: '" \\n.Test\\n3  \\n"', getArgs: () => [" \n.test\n3  \n"], expected: " \n.Test\n3  \n" },
                    { argDesc: '" \\n4est\\n4  \\n"', returnDesc: '" \\n4est\\n4  \\n"', getArgs: () => [" \n4est\n4  \n"], expected: " \n4est\n4  \n" }
                ]
            }, {
                name: 'splitLines',
                evaluate: (result, expected) => expect(result).to.deep.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '[""]', getArgs: () => [], expected: [""] },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: [""] },
                    { argDesc: '" test   1  "', returnDesc: '[" Test   1  "]', getArgs: () => [" test   1  "], expected: [" Test   1  "] },
                    { argDesc: '" \\ttest\\t 2 \\t "', returnDesc: '[" \\tTest\\t  2 \\t "]', getArgs: () => [" \ttest\t 2 \t "], expected: [" \tTest\t  2 \t "] },
                    { argDesc: '" \\ntest\\n3  \\n"', returnDesc: '[" ", "Test", "3  ", ""]', getArgs: () => [" \ntest\n3  \n"], expected: [" ", "Test", "3  ", ""] },
                    { argDesc: '"\\n\\r\\r\\nx\\n "', returnDesc: '["", "", "", "x", " "]', getArgs: () => ["\n\r\r\nx\n "], expected: ["", "", "", "x", " "] }
                ]
            }, {
                name: 'indentText',
                evaluate: (result, expected) => expect(result).to.equals(expected),
                tests: [
                    { argDesc: '', returnDesc: '""', getArgs: () => [], expected: "" },
                    { argDesc: '""', returnDesc: '""', getArgs: () => [""], expected: "" },
                    { argDesc: '" Test   1  "', returnDesc: '"\\t Test   1"', getArgs: () => [" Test   1  "], expected: "\t Test   1" },
                    { argDesc: '" \\tTest\\t 2 \\t "', returnDesc: '"\\t \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t "], expected: "\t \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n"', returnDesc: '"\\n\\tTest\\n\\t3\\n"', getArgs: () => [" \nTest\n3  \n"], expected: "\n\tTest\n\t3\n" },
                    { argDesc: '"", null', returnDesc: '""', getArgs: () => ["", null], expected: "" },
                    { argDesc: '" Test   1  ", null', returnDesc: '"\t Test   1"', getArgs: () => [" Test   1  ", null], expected: "\t Test   1" },
                    { argDesc: '" \\tTest\\t 2 \t ", null', returnDesc: '"\\t \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t ", null], expected: "\t \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n", null', returnDesc: '"\\n\\tTest\\n\\t3\\n"', getArgs: () => [" \nTest\n3  \n", null], expected: "\n\tTest\n\t3\n" },
                    { argDesc: '"", ""', returnDesc: '""', getArgs: () => ["", ""], expected: "" },
                    { argDesc: '" Test   1  ", ""', returnDesc: '"\\t Test   1"', getArgs: () => [" Test   1  ", ""], expected: "\t Test   1" },
                    { argDesc: '" \\tTest\\t 2 \\t ", ""', returnDesc: '"\\t \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t ", ""], expected: "\t \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n", ""', returnDesc: '"\\n\\tTest\\n\\t3\\n"', getArgs: () => [" \nTest\n3  \n", ""], expected: "\n\tTest\n\t3\n" },
                    { argDesc: '"", "\\t"', returnDesc: '""', getArgs: () => ["", "\t"], expected: "" },
                    { argDesc: '" Test   1  ", "\\t"', returnDesc: '"\\t Test   1"', getArgs: () => [" Test   1  ", "\t"], expected: "\t Test   1" },
                    { argDesc: '" \\tTest\\t 2 \\t ", "\\t"', returnDesc: '"\\t \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t ", "\t"], expected: "\t \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n", "\\t"', returnDesc: '"\\n\\tTest\\n\\t3"', getArgs: () => [" \nTest\n3  \n", "\t"], expected: "\n\tTest\n\t3\n" },
                    { argDesc: '"", " "', returnDesc: '""', getArgs: () => ["", " "], expected: "" },
                    { argDesc: '" Test   1  ", " "', returnDesc: '"  Test   1"', getArgs: () => [" Test   1  ", ""], expected: "  Test   1" },
                    { argDesc: '" \\tTest\\t 2 \t ", "\\t\\t"', returnDesc: '"\\t\\t \\tTest\\t  2"', getArgs: () => [" \tTest\t 2 \t ", ""], expected: "\t\t \tTest\t 2" },
                    { argDesc: '" \\nTest\\n3  \\n", "\\t\\t"', returnDesc: '"\\n\\t\\tTest\\n\\t\\t3"', getArgs: () => [" \nTest\n3  \n", ""], expected: "\n\t\tTest\n\t\t3\n" }
                ]
            }, {
                name: 'indentLines',
                evaluate: (result, expected) => {
                    if (typeof(expected) == "undefined" || expected === null || typeof(result) != "object" || result === null)
                        expect(result).to.equal(expected);
                    else {
                        expect(result.length).to.equal(expected.length);
                        for (var i = 0; i < result.length; i++)
                            expect(result[i].to.equals(expected[i]));
                    }
                },
                tests: [
                    { argDesc: '', returnDesc: '[""]', getArgs: () => [], expected: [""] },
                    { argDesc: '""', returnDesc: '[""]', getArgs: () => [""], expected: [""] },
                    { argDesc: '" Test   1  "', returnDesc: '["\t Test   1"]', getArgs: () => [" Test   1  "], expected: ["\t Test   1"] },
                    { argDesc: '" \\tTest\\t 2 \\t "', returnDesc: '["\\t \\tTest\\t  2"]', getArgs: () => [" \tTest\t 2 \t "], expected: ["\t \tTest\t 2"] },
                    { argDesc: '" \\nTest\\n3  \\n"', returnDesc: '["", "\\tTest", "\\t3", ""]', getArgs: () => [" \nTest\n3  \n"], expected: ["", "\tTest", "\t3", ""] },
                    { argDesc: '"", null', returnDesc: '[""]', getArgs: () => ["", null], expected: [""] },
                    { argDesc: '" Test   1  ", null', returnDesc: '["\\t Test   1"]', getArgs: () => [" Test   1  ", null], expected: ["\t Test   1"] },
                    { argDesc: '" \\tTest\\t 2 \t ", null', returnDesc: '["\\t \\tTest\\t  2"]', getArgs: () => [" \tTest\t 2 \t ", null], expected: ["\t \tTest\t 2"] },
                    { argDesc: '" \\nTest\\n3  \\n", null', returnDesc: '["", "\\tTest", "\\t3", ""]', getArgs: () => [" \nTest\n3  \n", null], expected: ["", "\tTest", "\t3", ""] },
                    { argDesc: '"", ""', returnDesc: '[""]', getArgs: () => ["", ""], expected: [""] },
                    { argDesc: '" Test   1  ", ""', returnDesc: '["\\t Test   1"]', getArgs: () => [" Test   1  ", ""], expected: ["\t Test   1"] },
                    { argDesc: '" \\tTest\\t 2 \\t ", ""', returnDesc: '["\\t \\tTest\\t  2"]', getArgs: () => [" \tTest\t 2 \t ", ""], expected: ["\t \tTest\t 2"] },
                    { argDesc: '" \\nTest\\n3  \\n", ""', returnDesc: '["", "\\tTest", "\\t3", ""]', getArgs: () => [" \nTest\n3  \n", ""], expected: ["", "\tTest", "\t3", ""] },
                    { argDesc: '"", "\\t"', returnDesc: '[""]', getArgs: () => ["", "\\t"], expected: [""] },
                    { argDesc: '" Test   1  ", "\\t"', returnDesc: '["\\t Test   1"]', getArgs: () => [" Test   1  ", "\t"], expected: ["\t Test   1"] },
                    { argDesc: '" \\tTest\\t 2 \\t ", "\\t"', returnDesc: '["\\t \\tTest\\t  2"]', getArgs: () => [" \tTest\t 2 \t ", "\t"], expected: ["\t \tTest\t 2"] },
                    { argDesc: '" \\nTest\\n3  \\n", "\\t"', returnDesc: '["", "\\tTest", "\\t3", ""]', getArgs: () => [" \nTest\n3  \n", "\t"], expected: ["", "\tTest", "\t3", ""] },
                    { argDesc: '"", " "', returnDesc: '[""]', getArgs: () => ["", " "], expected: [""] },
                    { argDesc: '" Test   1  ", " "', returnDesc: '["  Test   1"]', getArgs: () => [" Test   1  ", ""], expected: ["  Test   1"] },
                    { argDesc: '" \\tTest\\t 2 \\t ", "\\t\\t"', returnDesc: '["\\t\\t \\tTest\\t  2"]', getArgs: () => [" \tTest\t 2 \t ", ""], expected: ["\t\t \tTest\t 2"] },
                    { argDesc: '" \\nTest\\n3  \\n", "\\t\\t"', returnDesc: '["", "\\t\\tTest", "\\t\\t3", ""]', getArgs: () => [" \nTest\n3  \n", ""], expected: ["", "\t\tTest", "\t\t3", ""] }
                ]
            }        ]
    }, {
        convertsTo: 'boolean values',
        functions: [
            {
                name: 'asBoolean',
                evaluate: function(result, expected) { expect(result).to.equals(expected); },
                tests: [
                    { argDesc: '', returnDesc: 'undefined', getArgs: () => [], expected: undefined },
                    { argDesc: 'undefined', returnDesc: 'undefined', getArgs: () => [undefined], expected: undefined },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: null },
                    { argDesc: 'true', returnDesc: 'true', getArgs: () => [true], expected: true },
                    { argDesc: 'false', returnDesc: 'true', getArgs: () => [false], expected: false },
                    { argDesc: '12', returnDesc: 'true', getArgs: () => [12], expected: true },
                    { argDesc: '0', returnDesc: 'false', getArgs: () => [0], expected: false },
                    { argDesc: '"Y"', returnDesc: 'true', getArgs: () => ["Y"], expected: true },
                    { argDesc: '"y"', returnDesc: 'true', getArgs: () => ["y"], expected: true },
                    { argDesc: '"Yes"', returnDesc: 'true', getArgs: () => ["Yes"], expected: true },
                    { argDesc: '"yEs"', returnDesc: 'true', getArgs: () => ["yEs"], expected: true },
                    { argDesc: '"T"', returnDesc: 'true', getArgs: () => ["T"], expected: true },
                    { argDesc: '"t"', returnDesc: 'true', getArgs: () => ["t"], expected: true },
                    { argDesc: '"True"', returnDesc: 'true', getArgs: () => ["True"], expected: true },
                    { argDesc: '"tRuE"', returnDesc: 'true', getArgs: () => ["tRuE"], expected: true },
                    { argDesc: '"yo"', returnDesc: 'undefined', getArgs: () => ["yo"], expected: undefined },
                    { argDesc: '"nes"', returnDesc: 'undefined', getArgs: () => ["nes"], expected: undefined },
                    { argDesc: '"frue"', returnDesc: 'undefined', getArgs: () => ["frue"], expected: undefined },
                    { argDesc: '"talse"', returnDesc: 'undefined', getArgs: () => ["talse"], expected: undefined },
                    { argDesc: '"-1"', returnDesc: 'true', getArgs: () => ["-1"], expected: true },
                    { argDesc: '"3"', returnDesc: 'true', getArgs: () => ["3"], expected: true },
                    { argDesc: '"-0.000"', returnDesc: 'true', getArgs: () => ["3"], expected: false },
                    { argDesc: '""', returnDesc: 'undefined', getArgs: () => [""], expected: undefined },
                    { argDesc: 'NaN', returnDesc: 'false', getArgs: () => [NaN], expected: false },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'undefined, 7', returnDesc: 'true', getArgs: () => [undefined, 7], expected: true },
                    { argDesc: 'undefined, 0', returnDesc: 'false', getArgs: () => [undefined, 0], expected: false },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'null, "Test"', returnDesc: 'null', getArgs: () => [null, "Test"], expected: null },
                    { argDesc: 'null, true', returnDesc: 'true', getArgs: () => [null, true], expected: true },
                    { argDesc: 'null, false', returnDesc: 'false', getArgs: () => [null, false], expected: false },
                    { argDesc: 'null, NaN', returnDesc: 'false', getArgs: () => [null, NaN], expected: false },
                    { argDesc: 'null, "Y"', returnDesc: 'true', getArgs: () => [null, "Y"], expected: true },
                    { argDesc: 'null, "y"', returnDesc: 'true', getArgs: () => [null, "y"], expected: true },
                    { argDesc: 'null, "Yes"', returnDesc: 'true', getArgs: () => [null, "Yes"], expected: true },
                    { argDesc: 'null, "yEs"', returnDesc: 'true', getArgs: () => [null, "yEs"], expected: true },
                    { argDesc: 'null, "T"', returnDesc: 'true', getArgs: () => [null, "T"], expected: true },
                    { argDesc: 'null, "t"', returnDesc: 'true', getArgs: () => [null, "t"], expected: true },
                    { argDesc: 'null, "True"', returnDesc: 'true', getArgs: () => [null, "True"], expected: true },
                    { argDesc: 'null, "tRuE"', returnDesc: 'true', getArgs: () => [null, "tRuE"], expected: true },
                    { argDesc: 'null, "yo"', returnDesc: 'null', getArgs: () => [null, "yo"], expected: null },
                    { argDesc: 'null, "nes"', returnDesc: 'null', getArgs: () => [null, "nes"], expected: null },
                    { argDesc: 'null, "frue"', returnDesc: 'null', getArgs: () => [null, "frue"], expected: null },
                    { argDesc: 'null, "talse"', returnDesc: 'null', getArgs: () => [null, "talse"], expected: null },
                    { argDesc: 'null, "-1"', returnDesc: 'true', getArgs: () => [null, "-1"], expected: true },
                    { argDesc: 'null, "3"', returnDesc: 'true', getArgs: () => [null, "3"], expected: true },
                    { argDesc: 'null, "-0.000"', returnDesc: 'false', getArgs: () => [null, "-0.000"], expected: false }
                ]
            }, {
                name: 'toBoolean',
                evaluate: function(result, expected) { expect(result).to.equals(expected); },
                tests: [
                    { argDesc: '', returnDesc: 'false', getArgs: () => [], expected: false },
                    { argDesc: 'undefined', returnDesc: 'false', getArgs: () => [undefined], expected: false },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: null },
                    { argDesc: 'true', returnDesc: 'true', getArgs: () => [true], expected: true },
                    { argDesc: 'false', returnDesc: 'true', getArgs: () => [false], expected: false },
                    { argDesc: '12', returnDesc: 'true', getArgs: () => [12], expected: true },
                    { argDesc: '0', returnDesc: 'false', getArgs: () => [0], expected: false },
                    { argDesc: '"Y"', returnDesc: 'true', getArgs: () => ["Y"], expected: true },
                    { argDesc: '"y"', returnDesc: 'true', getArgs: () => ["y"], expected: true },
                    { argDesc: '"Yes"', returnDesc: 'true', getArgs: () => ["Yes"], expected: true },
                    { argDesc: '"yEs"', returnDesc: 'true', getArgs: () => ["yEs"], expected: true },
                    { argDesc: '"T"', returnDesc: 'true', getArgs: () => ["T"], expected: true },
                    { argDesc: '"t"', returnDesc: 'true', getArgs: () => ["t"], expected: true },
                    { argDesc: '"True"', returnDesc: 'true', getArgs: () => ["True"], expected: true },
                    { argDesc: '"tRuE"', returnDesc: 'true', getArgs: () => ["tRuE"], expected: true },
                    { argDesc: '"yo"', returnDesc: 'false', getArgs: () => ["yo"], expected: false },
                    { argDesc: '"nes"', returnDesc: 'false', getArgs: () => ["nes"], expected: false },
                    { argDesc: '"frue"', returnDesc: 'false', getArgs: () => ["frue"], expected: false },
                    { argDesc: '"talse"', returnDesc: 'false', getArgs: () => ["talse"], expected: false },
                    { argDesc: '"-1"', returnDesc: 'true', getArgs: () => ["-1"], expected: true },
                    { argDesc: '"3"', returnDesc: 'true', getArgs: () => ["3"], expected: true },
                    { argDesc: '"-0.000"', returnDesc: 'true', getArgs: () => ["3"], expected: false },
                    { argDesc: '""', returnDesc: 'false', getArgs: () => [""], expected: false },
                    { argDesc: 'NaN', returnDesc: 'false', getArgs: () => [NaN], expected: false },
                    { argDesc: 'undefined, false', returnDesc: 'null', getArgs: () => [undefined, null], expected: false },
                    { argDesc: 'undefined, 7', returnDesc: 'true', getArgs: () => [undefined, 7], expected: true },
                    { argDesc: 'undefined, 0', returnDesc: 'false', getArgs: () => [undefined, 0], expected: false },
                    { argDesc: 'undefined, false', returnDesc: 'null', getArgs: () => [undefined, null], expected: false },
                    { argDesc: 'null, "Test"', returnDesc: 'false', getArgs: () => [null, "Test"], expected: false },
                    { argDesc: 'null, NaN', returnDesc: 'false', getArgs: () => [null, NaN], expected: false },
                    { argDesc: 'null, "Y"', returnDesc: 'true', getArgs: () => [null, "Y"], expected: true },
                    { argDesc: 'null, "y"', returnDesc: 'true', getArgs: () => [null, "y"], expected: true },
                    { argDesc: 'null, "Yes"', returnDesc: 'true', getArgs: () => [null, "Yes"], expected: true },
                    { argDesc: 'null, "yEs"', returnDesc: 'true', getArgs: () => [null, "yEs"], expected: true },
                    { argDesc: 'null, "T"', returnDesc: 'true', getArgs: () => [null, "T"], expected: true },
                    { argDesc: 'null, "t"', returnDesc: 'true', getArgs: () => [null, "t"], expected: true },
                    { argDesc: 'null, "True"', returnDesc: 'true', getArgs: () => [null, "True"], expected: true },
                    { argDesc: 'null, "tRuE"', returnDesc: 'true', getArgs: () => [null, "tRuE"], expected: true },
                    { argDesc: 'null, "yo"', returnDesc: 'false', getArgs: () => [null, "yo"], expected: false },
                    { argDesc: 'null, "nes"', returnDesc: 'false', getArgs: () => [null, "nes"], expected: false },
                    { argDesc: 'null, "frue"', returnDesc: 'false', getArgs: () => [null, "frue"], expected: false },
                    { argDesc: 'null, "talse"', returnDesc: 'false', getArgs: () => [null, "talse"], expected: false },
                    { argDesc: 'null, "-1"', returnDesc: 'true', getArgs: () => [null, "-1"], expected: true },
                    { argDesc: 'null, "3"', returnDesc: 'true', getArgs: () => [null, "3"], expected: true },
                    { argDesc: 'null, "-0.000"', returnDesc: 'false', getArgs: () => [null, "-0.000"], expected: false }
                ]
            }
        ]
    }, {
        convertsTo: 'number values',
        functions: [
            {
                name: 'asNumber',
                evaluate: function(result, expected) {
                    if (typeof(result) != "number" || typeof(expected) != "number")
                        expect(result).to.equals(expected);
                    else if (isNaN(expected) || isNaN(result))
                        expect(result.toString()).to.equals(expected.toString());
                    else
                        expect(result).to.equals(expected);
                },
                tests: [
                    { argDesc: '', returnDesc: 'undefined', getArgs: () => [], expected: undefined },
                    { argDesc: 'undefined', returnDesc: 'undefined', getArgs: () => [undefined], expected: undefined },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: null },
                    { argDesc: 'true', returnDesc: '1', getArgs: () => [true], expected: 1 },
                    { argDesc: 'false', returnDesc: '0', getArgs: () => [false], expected: 0 },
                    { argDesc: '12', returnDesc: '12', getArgs: () => [12], expected: 12 },
                    { argDesc: '0', returnDesc: '0', getArgs: () => [0], expected: 0 },
                    { argDesc: '"Y"', returnDesc: 'undefined', getArgs: () => ["Y"], expected: undefined },
                    { argDesc: '"Yes"', returnDesc: 'undefined', getArgs: () => ["Yes"], expected: undefined },
                    { argDesc: '"t"', returnDesc: 'undefined', getArgs: () => ["t"], expected: undefined },
                    { argDesc: '"True"', returnDesc: 'undefined', getArgs: () => ["True"], expected: undefined },
                    { argDesc: '"-1"', returnDesc: '-1', getArgs: () => ["-1"], expected: -1 },
                    { argDesc: '"3"', returnDesc: '3', getArgs: () => ["3"], expected: 3 },
                    { argDesc: '"-0.000"', returnDesc: '0', getArgs: () => ["3"], expected: 0 },
                    { argDesc: '""', returnDesc: 'undefined', getArgs: () => [""], expected: undefined },
                    { argDesc: 'NaN', returnDesc: 'NaN', getArgs: () => [NaN], expected: NaN },
                    { argDesc: 'undefined, true', returnDesc: '1', getArgs: () => [undefined, true], expected: 1 },
                    { argDesc: 'undefined, false', returnDesc: '0', getArgs: () => [undefined, false], expected: 0 },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'undefined, 7', returnDesc: '7', getArgs: () => [undefined, 7], expected: 7 },
                    { argDesc: 'undefined, 0', returnDesc: '0', getArgs: () => [undefined, 0], expected: 0 },
                    { argDesc: 'undefined, null', returnDesc: 'null', getArgs: () => [undefined, null], expected: null },
                    { argDesc: 'null, "Test"', returnDesc: 'null', getArgs: () => [null, "Test"], expected: null },
                    { argDesc: 'null, NaN', returnDesc: 'NaN', getArgs: () => [null, NaN], expected: NaN },
                    { argDesc: 'NaN, "y"', returnDesc: 'null', getArgs: () => [null, "y"], expected: NaN },
                    { argDesc: 'NaN, "yes"', returnDesc: 'null', getArgs: () => [null, "yes"], expected: NaN },
                    { argDesc: 'NaN, "t"', returnDesc: 'null', getArgs: () => [null, "t"], expected: NaN },
                    { argDesc: 'NaN, "true"', returnDesc: 'NaN', getArgs: () => [null, "true"], expected: NaN },
                    { argDesc: 'NaN, "-1"', returnDesc: '-1', getArgs: () => [null, "-1"], expected: -1 },
                    { argDesc: 'NaN, "3"', returnDesc: '3', getArgs: () => [null, "3"], expected: 3 },
                    { argDesc: 'null, "-0.000"', returnDesc: '0', getArgs: () => [null, "-0.000"], expected: 0 }
                ]
            }, {
                name: 'toNumber',
                evaluate: function(result, expected) {
                    if (typeof(result) != "number" || typeof(expected) != "number")
                        expect(result).to.equals(expected);
                    else if (isNaN(expected) || isNaN(result))
                        expect(result.toString()).to.equals(expected.toString());
                    else
                        expect(result).to.equals(expected);
                },
                tests: [
                    { argDesc: '', returnDesc: '0', getArgs: () => [], expected: 0 },
                    { argDesc: 'undefined', returnDesc: '0', getArgs: () => [undefined], expected: 0 },
                    { argDesc: 'null', returnDesc: '0', getArgs: () => [null], expected: 0 },
                    { argDesc: 'true', returnDesc: '1', getArgs: () => [""], expected: 1 },
                    { argDesc: 'false', returnDesc: '0', getArgs: () => [""], expected: 0 },
                    { argDesc: '12', returnDesc: '12', getArgs: () => [12], expected: 12 },
                    { argDesc: '0', returnDesc: '0', getArgs: () => [0], expected: 0 },
                    { argDesc: '"Y"', returnDesc: '0', getArgs: () => ["Y"], expected: 0 },
                    { argDesc: '"Yes"', returnDesc: '0', getArgs: () => ["Yes"], expected: 0 },
                    { argDesc: '"t"', returnDesc: '0', getArgs: () => ["t"], expected: 0 },
                    { argDesc: '"True"', returnDesc: '0', getArgs: () => ["True"], expected: 0 },
                    { argDesc: '"-1"', returnDesc: '-1', getArgs: () => ["-1"], expected: -1 },
                    { argDesc: '"3"', returnDesc: '3', getArgs: () => ["3"], expected: 3 },
                    { argDesc: '"-0.000"', returnDesc: '0', getArgs: () => ["3"], expected: 0 },
                    { argDesc: '""', returnDesc: '0', getArgs: () => [""], expected: 0 },
                    { argDesc: 'NaN', returnDesc: 'NaN', getArgs: () => [NaN], expected: NaN },
                    { argDesc: 'undefined, null', returnDesc: '0', getArgs: () => [undefined, null], expected: 0 },
                    { argDesc: 'undefined, true', returnDesc: '0', getArgs: () => [undefined, true], expected: 1 },
                    { argDesc: 'undefined, false', returnDesc: '0', getArgs: () => [undefined, false], expected: 0 },
                    { argDesc: 'undefined, 7', returnDesc: '7', getArgs: () => [undefined, 7], expected: 7 },
                    { argDesc: 'undefined, 0', returnDesc: '0', getArgs: () => [undefined, 0], expected: 0 },
                    { argDesc: 'undefined, null', returnDesc: '0', getArgs: () => [undefined, null], expected: 0 },
                    { argDesc: 'null, "Test"', returnDesc: '0', getArgs: () => [null, "Test"], expected: 0 },
                    { argDesc: 'null, NaN', returnDesc: 'NaN', getArgs: () => [null, NaN], expected: NaN },
                    { argDesc: 'NaN, "y"', returnDesc: 'null', getArgs: () => [null, "y"], expected: NaN },
                    { argDesc: 'NaN, "yes"', returnDesc: 'null', getArgs: () => [null, "yes"], expected: NaN },
                    { argDesc: 'NaN, "t"', returnDesc: 'null', getArgs: () => [null, "t"], expected: NaN },
                    { argDesc: 'NaN, "true"', returnDesc: 'NaN', getArgs: () => [null, "true"], expected: NaN },
                    { argDesc: 'NaN, "-1"', returnDesc: '-1', getArgs: () => [null, "-1"], expected: -1 },
                    { argDesc: 'NaN, "3"', returnDesc: '3', getArgs: () => [null, "3"], expected: 3 },
                    { argDesc: 'null, "-0.000"', returnDesc: '0', getArgs: () => [null, "-0.000"], expected: 0 }
                ]
            }
        ]
    }, {
        convertsTo: 'objects',
        functions: [
            {
                name: 'toArray',
                evaluate: function(result, expected) {
                    if (typeof(expected) == "undefined" || expected === null || typeof(result) != "object" || result === null)
                        expect(result).to.equal(expected);
                    else {
                        expect(result.length).to.equal(expected.length);
                        for (var i = 0; i < result.length; i++)
                            expect(result[i].to.equals(expected[i]));
                    }
                },
                tests: [
                    { argDesc: '', returnDesc: '[]', getArgs: () => [], expected: [] },
                    { argDesc: 'undefined', returnDesc: '[]', getArgs: () => [undefined], expected: [] },
                    { argDesc: 'null', returnDesc: '[null]', getArgs: () => [null], expected: [null] },
                    { argDesc: 'true', returnDesc: '[true]', getArgs: () => [""], expected: [true] },
                    { argDesc: 'false', returnDesc: '[false]', getArgs: () => [""], expected: [false] },
                    { argDesc: '12', returnDesc: '[12]', getArgs: () => [12], expected: [12] },
                    { argDesc: '0', returnDesc: '[0]', getArgs: () => [0], expected: [0] },
                    { argDesc: '[]', returnDesc: '[]', getArgs: () => [[]], expected: [] },
                    { argDesc: '[undefined]', returnDesc: '[undefined]', getArgs: () => [[undefined]], expected: [undefined] },
                    { argDesc: '[null]', returnDesc: '[null]', getArgs: () => [[]], expected: [null] },
                    { argDesc: '["test"]', returnDesc: '["test"]', getArgs: () => [["test"]], expected: ["test"] },
                    { argDesc: '[0, ""]', returnDesc: '[0, ""]', getArgs: () => [[0, ""]], expected: [0, ""] },
                    { argDesc: 'new ExampleArrayLike()', returnDesc: '["1", 3, "4"]', getArgs: () => [new ExampleArrayLike()], expected: ["1", 3, "4"] }
                ]
            }, {
                name: 'asErrorLike',
                evaluate: function(result, expected) {
                    if (typeof(expected) == "undefined" || expected === null || typeof(result) != "object" || result === null)
                        expect(result).to.equal(expected);
                    else {
                        expect(result.message).to.equal(expected.message);
                        expect(result.name).to.equal(expected.name);
                        expect(result.stack).to.equal(expected.stack);
                    }
                },
                tests: [
                    { argDesc: '', returnDesc: 'undefined', getArgs: () => [], expected: undefined },
                    { argDesc: 'undefined', returnDesc: 'undefined', getArgs: () => [undefined], expected: undefined },
                    { argDesc: 'null', returnDesc: 'null', getArgs: () => [null], expected: null },
                    { argDesc: '{ message: "Test" }', returnDesc: '{ message: "Test" }', getArgs: () => [{ message: "Test" }],
                        expected: { message: "Test" } },
                    { argDesc: 'exampleError', returnDesc: '{ message: exampleError.message, name: exampleError.name, stack: exampleError.stack }', getArgs: () => [new ExampleArrayLike()],
                        expected: exampleError }
                ]
            }
        ]
    }*/
];

describe('Checking test data validity', () => {
    it('should contain consistent and valid argument set test data', () => testArgSets.forEach((argSet, i) => {
        var msg = 'at testArgSets[' + i + ']';
        assert.exists(argSet, msg);
        assert.exists(argSet.name, msg + ".name");
        assert.isString(argSet.name, msg + ".name");
        assert.exists(argSet.getArgs, msg + ".getArgs");
        assert.isFunction(argSet.getArgs, msg + ".getArgs");
        var a = argSet.getArgs();
        assert.exists(a, msg + ".getArgs()");
        assert.isArray(a, msg + ".getArgs()");
        assert.exists(argSet.jsType, msg + ".jsType");
        assert.isNumber(argSet.jsType, msg + ".jsType");
        assert.exists(argSet.variant, msg + ".variant");
        assert.isNumber(argSet.variant, msg + ".variant");
    }));
    it('should contains consistent and valid test function group test data', () => testFunctionGroups.forEach((tfg, fgi) => {
        var msg = 'at testFunctionGroups[' + fgi + ']';
        assert.exists(tfg, msg);
        assert.exists(tfg.name, msg + ".name");
        assert.isString(tfg.name, msg + ".name");
        assert.isNotEmpty(tfg.name, msg + ".name");
        assert.exists(tfg.subGroups, msg + ".subGroups");
        assert.isArray(tfg.subGroups, msg + ".subGroups");
        assert.isNotEmpty(tfg.subGroups, msg + ".subGroups");
        tfg.subGroups.forEach((sg, si) => {
            var d = msg + '.subGroups[' + si + ']';
            assert.exists(sg, d);
            assert.exists(sg.functions, d + ".functions");
            assert.isArray(sg.functions, d + ".functions");
            assert.isNotEmpty(sg.functions, d + ".functions");
            sg.functions.forEach((f, i) => {
                var m = d + ".functions[" + i + "]";
                assert.exists(f, m);
                assert.exists(f.name, m + ".name");
                assert.isString(f.name, m + ".name");
                assert.isNotEmpty(f.name, m + ".name");
                assert.exists(f.type, m + ".exists");
                assert.isNumber(f.type, m + ".exists");
            });
            assert.exists(sg.typeFilter, d + ".typeFilter");
            assert.isFunction(sg.typeFilter, d + ".typeFilter");
            var r = sg.typeFilter(testArgSets[0], "undefined");
            assert.exists(r, d + ".typeFilter()");
            assert.isBoolean(r, d + ".typeFilter()");
            assert.exists(sg.genericArgs, d + ".typeFilter");
            assert.isArray(sg.genericArgs, d + ".typeFilter");
            if (sg.genericArgs.length > 0)
                sg.genericArgs.forEach((g, i) => {
                    var m = d + ".genericArgs[" + i + "]";
                    assert.exists(g, m);
                    assert.exists(g.name, m + ".name");
                    assert.isString(g.name, m + ".name");
                    assert.isNotEmpty(g.name, m + ".name");
                    assert.exists(g.getArg, m + ".getArg");
                    assert.isFunction(g.getArg, m + ".getArg");
                    var a = g.getArg();
                    assert.exists(a, m + ".getArg()");
                    assert.isNotNull(a, m + ".getArg()");
                });
        });
    }));
    it('should contain consistent and valid conversion function group test data', () => conversionFunctionGroups.forEach((tcg, cfi) => {
        var msg = "at conversionFunctionGroups[" + cfi + "]";
        assert.exists(tcg, msg);
        assert.exists(tcg.convertsTo, msg + ".convertsTo");
        assert.isString(tcg.convertsTo, msg + ".convertsTo");
        assert.isNotEmpty(tcg.convertsTo, msg + ".convertsTo");
        assert.exists(tcg.functions, msg + ".functions");
        assert.isArray(tcg.functions, msg + ".functions");
        assert.isNotEmpty(tcg.functions, msg + ".functions");
        tcg.functions.forEach((cf, ci) => {
            var d = msg + ".functions[" + ci + "]";
            assert.exists(cf, d);
            assert.isString(cf.name, d + ".name");
            assert.isNotEmpty(cf.name, d + ".name");
            assert.exists(cf.evaluate, d + ".evaluate");
            assert.isFunction(cf.evaluate, d + ".evaluate");
            assert.exists(cf.tests, d + ".tests");
            assert.isArray(cf.tests, d + ".tests");
            assert.isNotEmpty(cf.tests, d + ".tests");
            cf.tests.forEach((ct, i) => {
                var m = d + ".tests[" + i + "]";
                assert.exists(ct, m);
                assert.exists(ct.argDesc, m + ".argDesc");
                assert.isString(ct.argDesc, m + ".argDesc");
                assert.exists(ct.returnDesc, m + ".returnDesc");
                assert.isString(ct.returnDesc, m + ".returnDesc");
                assert.isNotEmpty(ct.returnDesc, m + ".returnDesc");
                assert.exists(ct.getArgs, m + ".getArgs");
                assert.isFunction(ct.getArgs, m + ".getArgs");
                var a = ct.getArgs();
                assert.exists(a, m + ".getArgs()");
                assert.isArray(a, m + ".getArgs()");
                assert.property(ct, "expected", m + ".expected");
            });
        });
    }));
});

/*
describe('Checking existance of functions', () => {
    describe('Checking type gate functions', () => testFunctionGroups.forEach(tfg =>
        describe("Checking " + tfg.name + " functions", () => {
            var validated = { };
            tfg.subGroups.forEach(sg => sg.functions.forEach(f => {
                if (!validated[f.name]) {
                    validated[f.name] = true;
                    it(f.name + ' should exist as a function', () => {
                        var result = JsTypeCommander[f.name];
                        expect(result).is.a("function");
                    });
                }
            }));
        })
    ));
    describe('Checking conversion functions', () => conversionFunctionGroups.forEach((tcg, cfi) =>
        describe("Checking functions for conversion to " + tcg.convertsTo, () =>
            tcg.functions.forEach(f => it(f.name + ' should exist as a function', () => {
                var result = JsTypeCommander[f.name];
                expect(result).is.a("function");
            }))
    )));
});

describe('Testing type gate functions', () => testFunctionGroups.forEach(tfg =>
    describe("Testing " + tfg.name + " functions", () =>
        tfg.subGroups.forEach(sg => sg.functions.forEach(fd => {
            var name = fd.name;
            if (sg.genericArgs.length > 0)
                name += "<" + sg.genericArgs.map(g => g.name).join(",") + ">";
            describe("Testing " + name, () => testArgSets.forEach(argSet => {
                var expected;
                if (argSet.jsType == JsType.Undefined)
                    expected = fd.type == TestFunctionType.ifDef || fd.type == TestFunctionType.orNil;
                else if (argSet.variant == JsVariant.Null)
                    expected = fd.type == TestFunctionType.orNull || fd.type == TestFunctionType.orNil;
                else
                    expected = sg.typeFilter(argSet, fd.name);
                var f = JsTypeCommander[fd.name];
                var args = argSet.getArgs();
                if (sg.genericArgs.length > 0) {
                    if (args.length == 0)
                        return;
                    args = args.concat(sg.genericArgs.map(g => g.getArg()));
                }
                it(name + "(" + argSet.name + ") should return " + expected, () => {
                    var result = f.apply(this, args);
                    expect(result).to.equal(expected);
                });
            }));
        }))
    )
));
*/
describe('Testing conversion functions', () => conversionFunctionGroups.forEach((tcg, cfi) =>
    describe("Testing functions for conversion to " + tcg.convertsTo, () =>
        tcg.functions.forEach(fd => describe("Testing " + fd.name, () => {
            var f = JsTypeCommander[fd.name];
            fd.tests.forEach(t =>
                it(fd.name + "(" + t.argDesc + ') should return ' + t.returnDesc, () => {
                    var result = f.apply(this, t.getArgs());
                    fd.evaluate(result, t.expected, t);
                })
            );
        }))
    )
));