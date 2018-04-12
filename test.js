'use strict';
var expect = require('chai').expect;
var JsTypeCommander = require('./dist/JsTypeCommander.js');

function ExampleArrayLike() {
    this.length = 3;
    this[0] = "1";
    this[1] = "3";
    this[2] = "4";
}

var moduleFunctions = [
    { name: 'derrivesFrom<Error>', variant: '', group: 'derrivesFrom<Error>', type: 'object', subType: 'error' },
    { name: 'derrivesFrom<Error>IfDef', variant: 'IfDef', group: 'derrivesFrom<Error>', type: 'object', subType: 'error' },
    { name: 'derrivesFrom<Error>OrNil', variant: 'OrNil', group: 'derrivesFrom<Error>', type: 'object', subType: 'error' },
    { name: 'derrivesFrom<Error>OrNull', variant: 'OrNull', group: 'derrivesFrom<Error>', type: 'object', subType: 'error' },
    { name: 'derrivesFrom<ExampleArrayLike>', variant: '', group: 'derrivesFrom<ExampleArrayLike>', type: 'object', subType: 'arrayLike' },
    { name: 'derrivesFrom<ExampleArrayLike>IfDef', variant: 'IfDef', group: 'derrivesFrom<ExampleArrayLike>', type: 'object', subType: 'arrayLike' },
    { name: 'derrivesFrom<ExampleArrayLike>OrNil', variant: 'OrNil', group: 'derrivesFrom<ExampleArrayLike>', type: 'object', subType: 'arrayLike' },
    { name: 'derrivesFrom<ExampleArrayLike>OrNull', variant: 'OrNull', group: 'derrivesFrom<ExampleArrayLike>', type: 'object', subType: 'arrayLike' },
    { name: 'derrivesFrom<Object>', variant: '', group: 'derrivesFrom<Object>', type: 'object', subType: '*' },
    { name: 'derrivesFrom<Object>IfDef', variant: 'IfDef', group: 'derrivesFrom<Object>', type: 'object', subType: '*' },
    { name: 'derrivesFrom<Object>OrNil', variant: 'OrNil', group: 'derrivesFrom<Object>', type: 'object', subType: '*' },
    { name: 'derrivesFrom<Object>OrNull', variant: 'OrNull', group: 'derrivesFrom<Object>', type: 'object', subType: '*' },
    { name: 'isArray', variant: '', group: 'isArray', type: 'object', subType: 'array' },
    { name: 'isArrayIfDef', variant: 'IfDef', group: 'isArray', type: 'object', subType: 'array' },
    { name: 'isArrayLike', variant: '', group: 'isArrayLike', type: 'object', subType: 'arrayLike' },
    { name: 'isArrayLikeIfDef', variant: 'IfDef', group: 'isArrayLike', type: 'object', subType: 'arrayLike' },
    { name: 'isArrayLikeOrNil', variant: 'OrNil', group: 'isArrayLike', type: 'object', subType: 'arrayLike' },
    { name: 'isArrayLikeOrNull', variant: 'OrNull', group: 'isArrayLike', type: 'object', subType: 'arrayLike' },
    { name: 'isArrayOrNil', variant: 'OrNil', group: 'isArray', type: 'object', subType: 'array' },
    { name: 'isArrayOrNull', variant: 'OrNull', group: 'isArray', type: 'object', subType: 'array' },
    { name: 'isBoolean', variant: '', group: 'isBoolean', type: 'boolean', subType: '' },
    { name: 'isBooleanIfDef', variant: 'IfDef', group: 'isBoolean', type: 'boolean', subType: '' },
    { name: 'isBooleanOrNil', variant: 'OrNil', group: 'isBoolean', type: 'boolean', subType: '' },
    { name: 'isBooleanOrNull', variant: 'OrNull', group: 'isBoolean', type: 'boolean', subType: '' },
    { name: 'isEmptyArrayIfDef', variant: '', group: 'isEmptyArrayIfDef', type: 'object', subType: 'empty' },
    { name: 'isEmptyArrayIfDefIfDef', variant: 'IfDef', group: 'isEmptyArrayIfDef', type: 'object', subType: 'empty' },
    { name: 'isEmptyArrayIfDefOrNil', variant: 'OrNil', group: 'isEmptyArrayIfDef', type: 'object', subType: 'empty' },
    { name: 'isEmptyArrayIfDefOrNull', variant: 'OrNull', group: 'isEmptyArrayIfDef', type: 'object', subType: 'empty' },
    { name: 'isEmptyOrWhitespace', variant: '', group: 'isEmptyOrWhitespace', type: 'string', subType: 'whitespace' },
    { name: 'isEmptyOrWhitespaceIfDef', variant: 'IfDef', group: 'isEmptyOrWhitespace', type: 'string', subType: 'whitespace' },
    { name: 'isEmptyString', variant: '', group: 'isEmptyString', type: 'string', subType: 'empty' },
    { name: 'isEmptyStringIfDef', variant: 'IfDef', group: 'isEmptyString', type: 'string', subType: 'empty' },
    { name: 'isEmptyStringOrNil', variant: 'OrNil', group: 'isEmptyString', type: 'string', subType: 'empty' },
    { name: 'isEmptyStringOrNull', variant: 'OrNull', group: 'isEmptyString', type: 'string', subType: 'empty' },
    { name: 'isErrorLike', variant: '', group: 'isErrorLike', type: 'object', subType: '' },
    { name: 'isFunction', variant: '', group: 'isFunction', type: 'function', subType: '' },
    { name: 'isFunctionIfDef', variant: 'IfDef', group: 'isFunction', type: 'function', subType: '' },
    { name: 'isFunctionOrNil', variant: 'OrNil', group: 'isFunction', type: 'function', subType: '' },
    { name: 'isFunctionOrNull', variant: 'OrNull', group: 'isFunction', type: 'function', subType: '' },
    { name: 'isNil', variant: 'OrNil', group: 'isNil', type: 'nil', subType: '' },
    { name: 'isNilOrWhitespace', variant: 'OrNil', group: 'isEmptyOrWhitespace', type: 'string', subType: 'whitespace' },
    { name: 'isNonArrayObject', variant: '', group: 'isNonArrayObject', type: 'object', subType: 'nonArray' },
    { name: 'isNonArrayObjectIfDef', variant: 'IfDef', group: 'isNonArrayObject', type: 'object', subType: 'nonArray' },
    { name: 'isNonArrayObjectOrNil', variant: 'OrNil', group: 'isNonArrayObject', type: 'object', subType: 'nonArray' },
    { name: 'isNonArrayObjectOrNull', variant: 'OrNull', group: 'isNonArrayObject', type: 'object', subType: 'nonArray' },
    { name: 'isNull', variant: 'OrNull', group: 'isNull', type: 'nil', subType: '' },
    { name: 'isNullOrWhitespace', variant: 'OrNull', group: 'isEmptyOrWhitespace', type: 'string', subType: 'whitespace' },
    { name: 'isNumber', variant: '', group: 'isNumber', type: 'number', subType: '' },
    { name: 'isNumberIfDef', variant: 'IfDef', group: 'isNumber', type: 'number', subType: '' },
    { name: 'isNumberNaNorNull', variant: 'OrNull', group: 'isNumberNaNorNull', type: 'number', subType: 'NaN' },
    { name: 'isNumberOrNil', variant: 'OrNil', group: 'isNumber', type: 'number', subType: '' },
    { name: 'isNumberOrNull', variant: 'OrNull', group: 'isNumber', type: 'number', subType: '' },
    { name: 'isObject', variant: '', group: 'isObject', type: 'object', subType: '' },
    { name: 'isObjectIfDef', variant: 'IfDef', group: 'isObject', type: 'object', subType: '' },
    { name: 'isObjectOrNil', variant: 'OrNil', group: 'isObject', type: 'object', subType: '' },
    { name: 'isObjectOrNull', variant: 'OrNull', group: 'isObject', type: 'object', subType: '' },
    { name: 'isObjectType', variant: '', group: 'isObjectType', type: 'object', subType: '' },
    { name: 'isObjectTypeIfDef', variant: 'IfDef', group: 'isObjectType', type: 'object', subType: '' },
    { name: 'isObjectTypeOrNil', variant: 'OrNil', group: 'isObjectType', type: 'object', subType: '' },
    { name: 'isObjectTypeOrNull', variant: 'OrNull', group: 'isObjectType', type: 'object', subType: '' },
    { name: 'isPlainObject', variant: '', group: 'isPlainObject', type: 'object', subType: 'plain' },
    { name: 'isPlainObjectIfDef', variant: 'IfDef', group: 'isPlainObject', type: 'object', subType: 'plain' },
    { name: 'isPlainObjectOrNil', variant: 'OrNil', group: 'isPlainObject', type: 'object', subType: 'plain' },
    { name: 'isPlainObjectOrNull', variant: 'OrNull', group: 'isPlainObject', type: 'object', subType: 'plain' },
    { name: 'isString', variant: '', group: 'isString', type: 'string', subType: '' },
    { name: 'isStringIfDef', variant: 'IfDef', group: 'isString', type: 'string', subType: '' },
    { name: 'isStringOrNil', variant: 'OrNil', group: 'isString', type: 'string', subType: '' },
    { name: 'isStringOrNull', variant: 'OrNull', group: 'isString', type: 'string', subType: '' },
    { name: 'notDefined', variant: 'IfDef', group: 'notDefined', type: 'nil', subType: '' }
];

var testArgs = [
    {
        args: '(new ExampleArrayLike())',
        expectTrue: ['isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef',
            'derrivesFrom<Object>', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull',
            'isNonArrayObjectIfDef', 'isNonArrayObject', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean',
            'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>']
    }, {
        args: '("Test")',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '()',
        expectTrue: ['isStringIfDef', 'isEmptyArrayIfDefIfDef', 'isPlainObjectIfDef', 'isArrayLikeIfDef', 'notDefined', 'isBooleanIfDef', 'derrivesFrom<ExampleArrayLike>IfDef',
            'isArrayIfDef', 'isEmptyStringIfDef', 'derrivesFrom<Object>IfDef', 'isObjectTypeIfDef', 'isEmptyOrWhitespaceIfDef', 'isFunctionIfDef', 'isNonArrayObjectIfDef',
            'isNumberIfDef', 'isObjectIfDef', 'derrivesFrom<Error>IfDef'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDef', 'isPlainObjectOrNil', 'isPlainObjectOrNull',
            'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLike', 'isBooleanOrNil', 'isBooleanOrNull', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil',
            'derrivesFrom<ExampleArrayLike>OrNull', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArray', 'isEmptyStringOrNil', 'isEmptyStringOrNull',
            'isEmptyString', 'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull',
            'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunction', 'isNonArrayObjectOrNil',
            'isNonArrayObjectOrNull', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumber', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull', 'isObject',
            'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>']
    }, {
        args: '(1)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(false)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(null)',
        expectTrue: [],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>',
            'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace',
            'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull',
            'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull',
            'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>']
    }, {
        args: '("")',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef',
            'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef',
            'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber',
            'isErrorLike', 'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef',
            'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(Number.NEGATIVE_INFINITY)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(-1)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(Number.NaN)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(0)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '({})',
        expectTrue: ['isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef', 'isPlainObjectOrNil', 'isPlainObjectOrNull',
            'isPlainObjectIfDef', 'isPlainObject', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike', 'derrivesFrom<ExampleArrayLike>OrNil',
            'derrivesFrom<ExampleArrayLike>OrNull', 'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray',
            'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>', 'isObjectTypeOrNil', 'isObjectTypeOrNull',
            'isObjectTypeIfDef', 'isObjectType', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isErrorLike', 'isObjectOrNil',
            'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isNil', 'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean',
            'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isNilOrWhitespace', 'isNullOrWhitespace',
            'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef',
            'isNumber']
    }, {
        args: '(true)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(new Error("test"))',
        expectTrue: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>', 'isObjectTypeOrNil', 'isObjectTypeOrNull',
            'isObjectTypeIfDef', 'isObjectType', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isErrorLike', 'isObjectOrNil',
            'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef',
            'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber']
    }, {
        args: '(Number.POSITIVE_INFINITY)',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '([])',
        expectTrue: ['isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef',
            'isArrayLike', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull', 'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>',
            'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString',
            'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace',
            'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull',
            'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull',
            'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>']
    }, {
        args: '(new function() { return true; })',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '(undefined)',
        expectTrue: ['isStringIfDef', 'isEmptyArrayIfDefIfDef', 'isPlainObjectIfDef', 'isArrayLikeIfDef', 'notDefined', 'isBooleanIfDef', 'derrivesFrom<ExampleArrayLike>IfDef',
            'isArrayIfDef', 'isEmptyStringIfDef', 'derrivesFrom<Object>IfDef', 'isObjectTypeIfDef', 'isEmptyOrWhitespaceIfDef', 'isFunctionIfDef', 'isNonArrayObjectIfDef',
            'isNumberIfDef', 'isObjectIfDef', 'derrivesFrom<Error>IfDef', 'isStringIfDef', 'isEmptyArrayIfDefIfDef', 'isPlainObjectIfDef', 'isArrayLikeIfDef', 'notDefined',
            'isBooleanIfDef', 'derrivesFrom<ExampleArrayLike>IfDef', 'isArrayIfDef', 'isEmptyStringIfDef', 'derrivesFrom<Object>IfDef', 'isObjectTypeIfDef', 'isEmptyOrWhitespaceIfDef',
            'isFunctionIfDef', 'isNonArrayObjectIfDef', 'isNumberIfDef', 'isObjectIfDef', 'derrivesFrom<Error>IfDef'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDef', 'isPlainObjectOrNil',
            'isPlainObjectOrNull', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLike', 'isBooleanOrNil', 'isBooleanOrNull', 'isBoolean',
            'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArray',
            'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyString', 'derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>', 'isNumberNaNorNull',
            'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull',
            'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumber', 'isErrorLike', 'isObjectOrNil',
            'isObjectOrNull', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>', 'isStringOrNil', 'isStringOrNull', 'isString',
            'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDef', 'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObject', 'isNil', 'isArrayLikeOrNil',
            'isArrayLikeOrNull', 'isArrayLike', 'isBooleanOrNil', 'isBooleanOrNull', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArray', 'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyString', 'derrivesFrom<Object>OrNil',
            'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectType', 'isNilOrWhitespace',
            'isNullOrWhitespace', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObject',
            'isNumberOrNil', 'isNumberOrNull', 'isNumber', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull',
            'derrivesFrom<Error>']
    }, {
        args: '("\n")',
        expectTrue: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike',
            'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef', 'isBoolean', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'isEmptyStringOrNil',
            'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull', 'isObjectTypeIfDef', 'isObjectType',
            'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull', 'isFunctionIfDef', 'isFunction',
            'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull', 'isNumberIfDef', 'isNumber', 'isErrorLike',
            'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull', 'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>'],
        expectFalse: ['derrivesFrom<Object>OrNil', 'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>']
    }, {
        args: '([undefined])',
        expectTrue: ['isArrayLikeOrNil', 'isArrayLikeOrNull', 'isArrayLikeIfDef', 'isArrayLike', 'derrivesFrom<ExampleArrayLike>OrNil', 'derrivesFrom<ExampleArrayLike>OrNull',
            'derrivesFrom<ExampleArrayLike>IfDef', 'derrivesFrom<ExampleArrayLike>', 'isArrayOrNil', 'isArrayOrNull', 'isArrayIfDef', 'isArray', 'derrivesFrom<Object>OrNil',
            'derrivesFrom<Object>OrNull', 'derrivesFrom<Object>IfDef', 'derrivesFrom<Object>'],
        expectFalse: ['isStringOrNil', 'isStringOrNull', 'isStringIfDef', 'isString', 'isEmptyArrayIfDefOrNil', 'isEmptyArrayIfDefOrNull', 'isEmptyArrayIfDefIfDef', 'isEmptyArrayIfDef',
            'isPlainObjectOrNil', 'isPlainObjectOrNull', 'isPlainObjectIfDef', 'isPlainObject', 'isNil', 'notDefined', 'isBooleanOrNil', 'isBooleanOrNull', 'isBooleanIfDef',
            'isBoolean', 'isEmptyStringOrNil', 'isEmptyStringOrNull', 'isEmptyStringIfDef', 'isEmptyString', 'isNumberNaNorNull', 'isNull', 'isObjectTypeOrNil', 'isObjectTypeOrNull',
            'isObjectTypeIfDef', 'isObjectType', 'isNilOrWhitespace', 'isNullOrWhitespace', 'isEmptyOrWhitespaceIfDef', 'isEmptyOrWhitespace', 'isFunctionOrNil', 'isFunctionOrNull',
            'isFunctionIfDef', 'isFunction', 'isNonArrayObjectOrNil', 'isNonArrayObjectOrNull', 'isNonArrayObjectIfDef', 'isNonArrayObject', 'isNumberOrNil', 'isNumberOrNull',
            'isNumberIfDef', 'isNumber', 'isErrorLike', 'isObjectOrNil', 'isObjectOrNull', 'isObjectIfDef', 'isObject', 'derrivesFrom<Error>OrNil', 'derrivesFrom<Error>OrNull',
            'derrivesFrom<Error>IfDef', 'derrivesFrom<Error>']
    }
];
describe('notDefined function test', () => {
    it('should return true', () => {
        var result = JsTypeCommander.notDefined();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = JsTypeCommander.notDefined(null);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.notDefined([undefined]);
        expect(result).to.equal(false);
    });
});
describe('isNull function test', () => {
    it('should return false', () => {
        var result = JsTypeCommander.isNull();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isNull(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isNull(null);
        expect(result).to.equal(true);
    });
});
describe('isNil function test', () => {
    it('should return false', () => {
        var result = JsTypeCommander.isNil();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isNil(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isNil(null);
        expect(result).to.equal(true);
    });
});
describe('isString function test', () => {
    it('should return false', () => {
        var result = JsTypeCommander.isString();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isString(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isString(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isString(null);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isString("");
        expect(result).to.equal(true);
    });
});
describe('isStringIfDef function test', () => {
    it('should return true', () => {
        var result = JsTypeCommander.isStringIfDef();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringIfDef(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringIfDef(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringIfDef(null);
        expect(result).to.equal(false);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isStringIfDef("");
        expect(result).to.equal(true);
    });
});
describe('isStringOrNull function test', () => {
    it('should return true', () => {
        var result = JsTypeCommander.isStringOrNull();
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNull(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNull(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNull(null);
        expect(result).to.equal(true);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isStringOrNull("");
        expect(result).to.equal(true);
    });
});
describe('isStringOrNil function test', () => {
    it('should return true', () => {
        var result = JsTypeCommander.isStringOrNil();
        expect(result).to.equal(true);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNil(Number.NaN);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNil(["test"]);
        expect(result).to.equal(false);
    });
    it('should return false', () => {
        var result = JsTypeCommander.isStringOrNil(null);
        expect(result).to.equal(true);
    });
    it('should return true', () => {
        var result = JsTypeCommander.isStringOrNil("");
        expect(result).to.equal(true);
    });
});
describe('toString function test', () => {
    it('should return undefined', () => {
        var result = JsTypeCommander.toString();
        expect(result).to.equal(undefined);
    });
    it('should return "NaN" from Number.NaN', () => {
        var result = JsTypeCommander.toString(Number.NaN);
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"]', () => {
        var result = JsTypeCommander.toString(["test"]);
        expect(result).to.equal("test");
    });
    it('should return null from null', () => {
        var result = JsTypeCommander.toString(null);
        expect(result).to.equal(null);
    });
    it('should return "" from ""', () => {
        var result = JsTypeCommander.toString("");
        expect(result).to.equal("");
    });
    it('should return "test" from undefined, "test"', () => {
        var result = JsTypeCommander.toString(undefined, "test");
        expect(result).to.equal("test");
    });
    it('should return "NaN" from Number.NaN, "test"', () => {
        var result = JsTypeCommander.toString(Number.NaN, "test");
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"], "again"', () => {
        var result = JsTypeCommander.toString(["test"], "again");
        expect(result).to.equal("test");
    });
    it('should return "test" from null, "test"', () => {
        var result = JsTypeCommander.toString(null, "test");
        expect(result).to.equal("test");
    });
    it('should return "" from "", "test"', () => {
        var result = JsTypeCommander.toString("", "test");
        expect(result).to.equal("");
    });
    it('should return "test" from "  ", "test", true', () => {
        var result = JsTypeCommander.toString("  ", "test", true);
        expect(result).to.equal("test");
    });
    it('should return "test" from "", "test", true', () => {
        var result = JsTypeCommander.toString("", "test", true);
        expect(result).to.equal("test");
    });
});
describe('asString function test', () => {
    it('should return "" from undefined', () => {
        var result = JsTypeCommander.asString();
        expect(result).to.equal("");
    });
    it('should return "NaN" from Number.NaN', () => {
        var result = JsTypeCommander.asString(Number.NaN);
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"]', () => {
        var result = JsTypeCommander.asString(["test"]);
        expect(result).to.equal("test");
    });
    it('should return "" from null', () => {
        var result = JsTypeCommander.asString(null);
        expect(result).to.equal("");
    });
    it('should return "" from ""', () => {
        var result = JsTypeCommander.asString("");
        expect(result).to.equal("");
    });
    it('should return "test" from "test"', () => {
        var result = JsTypeCommander.asString(undefined, "test");
        expect(result).to.equal("test");
    });
    it('should return "NaN" from Number.NaN, "test"', () => {
        var result = JsTypeCommander.asString(Number.NaN, "test");
        expect(result).to.equal("NaN");
    });
    it('should return "test" from ["test"], "again"', () => {
        var result = JsTypeCommander.asString(["test"], "again");
        expect(result).to.equal("test");
    });
    it('should return "test" from null, "test"', () => {
        var result = JsTypeCommander.asString(null, "test");
        expect(result).to.equal("test");
    });
    it('should return "" from "", "test"', () => {
        var result = JsTypeCommander.asString("", "test");
        expect(result).to.equal("");
    });
    it('should return "test" from "  ", "test", true', () => {
        var result = JsTypeCommander.asString("  ", "test", true);
        expect(result).to.equal("test");
    });
    it('should return "test" from "", "test", true', () => {
        var result = JsTypeCommander.asString("", "test", true);
        expect(result).to.equal("test");
    });
});
describe('mapByTypeValue([], {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue([], {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(1);
});
describe('mapByTypeValue([], {*-whenArray}) test', () => {
    var result = JsTypeCommander.mapByTypeValue([], {
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(2);
});
describe('mapByTypeValue([], {*-whenArray,whenArrayLike}) test', () => {
    var result = JsTypeCommander.mapByTypeValue([], {
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(10);
});
describe('mapByTypeValue([], {*-whenArray,whenArrayLike,whenObject}) test', () => {
    var result = JsTypeCommander.mapByTypeValue([], {
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(-1);
});
describe('mapByTypeValue(new ExampleArrayLike(), {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(new ExampleArrayLike(), {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(2);
});
describe('mapByTypeValue(new ExampleArrayLike(), {*-whenArrayLike}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(new ExampleArrayLike(), {
        whenArray: 1,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(10);
});
describe('mapByTypeValue(new ExampleArrayLike(), {*-whenArrayLike,whenObject}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(new ExampleArrayLike(), {
        whenArray: 1,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(-1);
});
describe('mapByTypeValue(true, {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(true, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(3);
});
describe('mapByTypeValue(false, {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(false, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(3);
});
describe('mapByTypeValue(false, {*-whenBoolean}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(false, {
        whenArray: 1,
        whenArrayLike: 2,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(-1);
});
describe('mapByTypeValue(function() { return true; }, {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(function() { return true; }, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(4);
});
describe('mapByTypeValue(function() { return true; }, {*-whenFunction}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(function() { return true; }, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(-1);
});
describe('mapByTypeValue(Number.NEGATIVE_INFINITY, {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(Number.NEGATIVE_INFINITY, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(5);
});
describe('mapByTypeValue(Number.POSITIVE_INFINITY, {*}) test', () => {
    var result = JsTypeCommander.mapByTypeValue(Number.POSITIVE_INFINITY, {
        whenArray: 1,
        whenArrayLike: 2,
        whenBoolean: 3,
        whenFunction: 4,
        whenInfinity: 5,
        whenNaN: 6,
        whenNotArrayLike: 7,
        whenNull: 8,
        whenNumber: 9,
        whenObject: 10,
        whenString: 11,
        whenSymbol: 12,
        whenUndefined: 13,
        otherwise: -1
    });
    expect(result).to.equal(5);
});