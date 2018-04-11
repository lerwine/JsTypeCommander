"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//interface AnyFunction { (...args: anyAtAll[]): anyAtAll; }
//interface AnyConstructor<T> { new(...args: anyAtAll[]): T; };
var JsTypeCommander;
(function (JsTypeCommander) {
    var newLineString = "\n";
    var whitespaceRegex = /^\s*$/;
    var trimStartRegex = /^\s+(\S.*)?$/;
    var trimEndRegex = /^(\s*\S+(\s+\S+)*)/;
    var lineSplitRegex = /\r\n?|\n/g;
    var boolRegex = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
    var ucFirstRegex = /^([^a-zA-Z\d]+)?([a-z])(.+)?$/g;
    var abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;
    var limitingIterator = /** @class */ (function () {
        function limitingIterator(callbackfn, totalMaxItems, maxItemsInArray, thisObj) {
            this.currentTotalItems = 0;
            this.callbackfn = callbackfn;
            this.totalMaxItems = JsTypeCommander.asNumber(totalMaxItems, 8192);
            this.maxItemsInArray = JsTypeCommander.asNumber(maxItemsInArray, 1024);
            this.thisObj = thisObj;
        }
        limitingIterator.prototype.iterateInto = function (maxDepth, current, key) {
            this.currentTotalItems++;
            var target = (JsTypeCommander.isNil(this.thisObj)) ? this.callbackfn(current, key) : this.callbackfn.call(this.thisObj, current, key);
            if (maxDepth < 1 || this.currentTotalItems >= this.totalMaxItems)
                return target;
            if (JsTypeCommander.isArray(target)) {
                if (JsTypeCommander.isArray(current)) {
                    for (var index = 0; index < current.length && index < this.maxItemsInArray; index++) {
                        var t = this.iterateInto(maxDepth - 1, current[index], index);
                        if (index < target.length)
                            target[index] = t;
                        else
                            target.push(t);
                        if (this.currentTotalItems >= this.totalMaxItems)
                            break;
                    }
                }
            }
            else if (JsTypeCommander.isPlainObject(target) && JsTypeCommander.isPlainObject(current)) {
                var count = 0;
                for (var n in current) {
                    count++;
                    if (count > this.maxItemsInArray)
                        break;
                    target[n] = this.iterateInto(maxDepth - 1, current[n], n);
                    if (this.currentTotalItems >= this.totalMaxItems)
                        break;
                }
            }
            return target;
        };
        return limitingIterator;
    }());
    /**
     * Determines whether an object is defined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if defined (including null); otherwise, false.
     */
    function isDefined(obj) { return typeof (obj) != "undefined"; }
    JsTypeCommander.isDefined = isDefined;
    /**
     * Determesin whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    function notDefined(obj) { return typeof (obj) == "undefined"; }
    JsTypeCommander.notDefined = notDefined;
    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    function isNil(obj) { return typeof (obj) == "undefined" || obj === null; }
    JsTypeCommander.isNil = isNil;
    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    function isNull(obj) { return typeof (obj) == "object" && obj === null; }
    JsTypeCommander.isNull = isNull;
    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    function isString(obj) { return typeof (obj) == "string"; }
    JsTypeCommander.isString = isString;
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    function isStringIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "string"; }
    JsTypeCommander.isStringIfDef = isStringIfDef;
    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    function isStringOrNull(obj) { return typeof (obj) == "string" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isStringOrNull = isStringOrNull;
    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    function isStringOrNil(obj) { return typeof (obj) == "string" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isStringOrNil = isStringOrNil;
    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    function isEmptyString(obj) { return typeof (obj) == "string" && obj.length == 0; }
    JsTypeCommander.isEmptyString = isEmptyString;
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    function isEmptyStringIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isEmptyString(obj); }
    JsTypeCommander.isEmptyStringIfDef = isEmptyStringIfDef;
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    function isEmptyStringOrNull(obj) { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isEmptyStringOrNull = isEmptyStringOrNull;
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    function isEmptyStringOrNil(obj) { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isEmptyStringOrNil = isEmptyStringOrNil;
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    function isEmptyOrWhitespace(obj) { return typeof (obj) == "string" && obj.trim().length == 0; }
    JsTypeCommander.isEmptyOrWhitespace = isEmptyOrWhitespace;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    function isEmptyOrWhitespaceIfDef(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.notDefined(obj); }
    JsTypeCommander.isEmptyOrWhitespaceIfDef = isEmptyOrWhitespaceIfDef;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    function isNullOrWhitespace(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNullOrWhitespace = isNullOrWhitespace;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    function isNilOrWhitespace(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isNilOrWhitespace = isNilOrWhitespace;
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    function toString(obj, defaultValue, ifWhitespace) {
        if (JsTypeCommander.isString(obj)) {
            if (ifWhitespace && obj.trim().length == 0 && !JsTypeCommander.isNil(defaultValue)) {
                var v = JsTypeCommander.toString(defaultValue);
                if (JsTypeCommander.isString(v))
                    return v;
            }
            return obj;
        }
        if (JsTypeCommander.isNil(obj)) {
            if (JsTypeCommander.isNil(defaultValue)) {
                return (JsTypeCommander.isNull(obj)) ? obj : defaultValue;
            }
            return JsTypeCommander.toString(defaultValue);
        }
        var s;
        if (JsTypeCommander.isErrorLike(obj))
            s = JSON.stringify(JsTypeCommander.toErrorLike(obj));
        else if (JsTypeCommander.isArray(obj))
            s = (obj.length == 0) ? "" : obj.join(",");
        else {
            try {
                s = obj.toString();
            }
            catch (e) {
                s = obj + "";
            }
            if (!JsTypeCommander.isString(s)) {
                if (JsTypeCommander.isNil(defaultValue))
                    return defaultValue;
                return JsTypeCommander.toString(defaultValue);
            }
        }
        if (ifWhitespace && s.trim().length == 0 && !JsTypeCommander.isNil(defaultValue)) {
            var v = JsTypeCommander.toString(defaultValue);
            if (JsTypeCommander.isString(v))
                return v;
        }
        return s;
    }
    JsTypeCommander.toString = toString;
    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    function asString(obj, defaultValue, ifWhitespace) {
        var s = JsTypeCommander.toString(obj, defaultValue, ifWhitespace);
        if (JsTypeCommander.isString(s))
            return s;
        return "";
    }
    JsTypeCommander.asString = asString;
    /**
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    function isBoolean(obj) { return typeof (obj) == "boolean"; }
    JsTypeCommander.isBoolean = isBoolean;
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    function isBooleanIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "boolean"; }
    JsTypeCommander.isBooleanIfDef = isBooleanIfDef;
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    function isBooleanOrNull(obj) { return typeof (obj) == "boolean" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isBooleanOrNull = isBooleanOrNull;
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    function isBooleanOrNil(obj) { return typeof (obj) == "boolean" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isBooleanOrNil = isBooleanOrNil;
    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    function toBoolean(obj, defaultValue) {
        if (JsTypeCommander.isBoolean(obj))
            return obj;
        if (JsTypeCommander.isNil(obj)) {
            if (JsTypeCommander.isNil(defaultValue))
                return (JsTypeCommander.isNull(obj)) ? obj : defaultValue;
            return JsTypeCommander.toBoolean(defaultValue);
        }
        if (JsTypeCommander.isNumber(obj)) {
            if (!isNaN(obj))
                return obj != 0;
        }
        else {
            if (JsTypeCommander.isFunction(obj.valueOf)) {
                try {
                    var v = obj.valueOf();
                    if (JsTypeCommander.isBoolean(v))
                        return v;
                    if (JsTypeCommander.isNumber(v))
                        return v != 0;
                    if (!JsTypeCommander.isNil(v))
                        obj = v;
                }
                catch (_a) { }
            }
            var s = JsTypeCommander.toString(obj);
            if (JsTypeCommander.isString(s) && (s = s.trim()).length > 0) {
                var m = boolRegex.exec(s.trim());
                if (!JsTypeCommander.isNil(m))
                    return !JsTypeCommander.isNil(m[1]);
            }
        }
        if (JsTypeCommander.isNil(defaultValue))
            return defaultValue;
        return JsTypeCommander.toBoolean(defaultValue);
    }
    JsTypeCommander.toBoolean = toBoolean;
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    function asBoolean(obj, defaultValue) {
        var b = JsTypeCommander.toBoolean(obj, defaultValue);
        return JsTypeCommander.isBoolean(b) && b;
    }
    JsTypeCommander.asBoolean = asBoolean;
    /**
     * Determines whether a value is a number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number; otherwise false.
     */
    function isNumber(obj) { return typeof (obj) == "number" && !isNaN(obj); }
    JsTypeCommander.isNumber = isNumber;
    /**
     * Determines whether a value is number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or undefined; otherwise false.
     */
    function isNumberIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isNumber(obj); }
    JsTypeCommander.isNumberIfDef = isNumberIfDef;
    /**
     * Determines whether a value is number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    function isNumberOrNull(obj) { return JsTypeCommander.isNumber(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNumberOrNull = isNumberOrNull;
    /**
     * Determines whether a value is number or null (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    function isNumberNaNorNull(obj) { return typeof (obj) == "number" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNumberNaNorNull = isNumberNaNorNull;
    /**
     * Determines whether a value is number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number, null or undefined; otherwise false.
     */
    function isNumberOrNil(obj) { return typeof (obj) == "number" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isNumberOrNil = isNumberOrNil;
    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    function toNumber(obj, defaultValue) {
        if (JsTypeCommander.isNumber(obj))
            return obj;
        if (JsTypeCommander.isNil(obj)) {
            if (JsTypeCommander.isNil(defaultValue))
                return (JsTypeCommander.isNull(obj)) ? obj : defaultValue;
            return JsTypeCommander.toNumber(defaultValue);
        }
        if (JsTypeCommander.isBoolean(obj))
            return (obj) ? 1 : 0;
        if (JsTypeCommander.isFunction(obj.valueOf)) {
            try {
                var v = obj.valueOf();
                if (JsTypeCommander.isNumber(v))
                    return v;
                if (JsTypeCommander.isBoolean(v))
                    return (v) ? 1 : 0;
                if (!JsTypeCommander.isNil(v))
                    obj = v;
            }
            catch (_a) { }
        }
        var s = JsTypeCommander.asString(obj);
        if (JsTypeCommander.isString(s) && (s = s.trim()).length > 0) {
            var i = parseFloat(s);
            if (!isNaN(i))
                return i;
            var m = boolRegex.exec(s.trim());
            if (!JsTypeCommander.isNil(m))
                return (JsTypeCommander.isNil(m[1])) ? 0 : 1;
        }
        if (JsTypeCommander.isNil(defaultValue))
            return defaultValue;
        return JsTypeCommander.toNumber(defaultValue);
    }
    JsTypeCommander.toNumber = toNumber;
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
     */
    function asNumber(obj, defaultValue) {
        var i = JsTypeCommander.toNumber(obj, defaultValue);
        if (JsTypeCommander.isNumber(i))
            return i;
        return 0;
    }
    JsTypeCommander.asNumber = asNumber;
    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    function isFunction(obj) { return typeof (obj) === "function"; }
    JsTypeCommander.isFunction = isFunction;
    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    function isFunctionIfDef(obj) { return typeof (obj) === "undefined" || typeof (obj) === "function"; }
    JsTypeCommander.isFunctionIfDef = isFunctionIfDef;
    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    function isFunctionOrNull(obj) { return typeof (obj) === "function" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isFunctionOrNull = isFunctionOrNull;
    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    function isFunctionOrNil(obj) { return typeof (obj) === "function" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isFunctionOrNil = isFunctionOrNil;
    /**
     * Determines whether a value is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type; otherwise false.
     */
    function isObject(obj) { return typeof (obj) == "object" && obj !== null; }
    JsTypeCommander.isObject = isObject;
    /**
     * Determines whether a value is an object or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or undefined; otherwise false.
     */
    function isObjectIfDef(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && obj !== null); }
    JsTypeCommander.isObjectIfDef = isObjectIfDef;
    /**
     * Determines whether a value is an object or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or null; otherwise false.
     */
    function isObjectOrNull(obj) { return typeof (obj) == "object"; }
    JsTypeCommander.isObjectOrNull = isObjectOrNull;
    /**
     * Determines whether a value is an object, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type, null or undefined; otherwise false.
     */
    function isObjectOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
    JsTypeCommander.isObjectOrNil = isObjectOrNil;
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     */
    function isPlainObject(obj) { return typeof (obj) == "object" && obj !== null && Array.isArray(obj); }
    JsTypeCommander.isPlainObject = isPlainObject;
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     */
    function isPlainObjectIfDef(obj) { return JsTypeCommander.notDefined(obj) || JsTypeCommander.isPlainObject(obj); }
    JsTypeCommander.isPlainObjectIfDef = isPlainObjectIfDef;
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     */
    function isPlainObjectOrNull(obj) { return typeof (obj) == "object" && (obj === null || !Array.isArray(obj)); }
    JsTypeCommander.isPlainObjectOrNull = isPlainObjectOrNull;
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     */
    function isPlainObjectOrNil(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isPlainObjectOrNull(obj); }
    JsTypeCommander.isPlainObjectOrNil = isPlainObjectOrNil;
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    function isArray(obj) { return JsTypeCommander.isObject(obj) && Array.isArray(obj); }
    JsTypeCommander.isArray = isArray;
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    function isArrayIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isArray(obj); }
    JsTypeCommander.isArrayIfDef = isArrayIfDef;
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    function isArrayOrNull(obj) { return typeof (obj) == "object" && (obj === null || Array.isArray(obj)); }
    JsTypeCommander.isArrayOrNull = isArrayOrNull;
    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    function isArrayOrNil(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && (obj === null || Array.isArray(obj))); }
    JsTypeCommander.isArrayOrNil = isArrayOrNil;
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    function isEmptyArray(obj) { return JsTypeCommander.isArray(obj) && obj.length == 0; }
    JsTypeCommander.isEmptyArray = isEmptyArray;
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    function isEmptyArrayIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isEmptyArray(obj); }
    JsTypeCommander.isEmptyArrayIfDef = isEmptyArrayIfDef;
    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    function isEmptyArrayOrNull(obj) { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isEmptyArrayOrNull = isEmptyArrayOrNull;
    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    function isEmptyArrayOrNil(obj) { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isEmptyArrayOrNil = isEmptyArrayOrNil;
    /**
     * Ensures that a value is an array.
     * @param {*} obj Value to convert.
     * @returns {*[]} Value as an array.
     * @description If object is undefined, an empty array is returned. Else, if object is an array, then the object is returned; Otherwise, an array with a single element containing the value is returned.
     */
    function asArray(obj) {
        if (JsTypeCommander.isArray(obj))
            return obj;
        if (JsTypeCommander.isDefined(obj))
            return [obj];
        return [];
    }
    JsTypeCommander.asArray = asArray;
    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    function derivesFrom(obj, classConstructor) {
        if (!JsTypeCommander.isDefined(obj))
            return !JsTypeCommander.isDefined(classConstructor);
        if (!JsTypeCommander.isDefined(classConstructor))
            return false;
        if (obj === null)
            return classConstructor === null;
        var classProto;
        if (JsTypeCommander.isFunction(classConstructor)) {
            classProto = classConstructor.prototype;
        }
        else {
            classProto = Object.getPrototypeOf(classConstructor);
            classConstructor = classProto.constructor;
            while (!JsTypeCommander.isFunction(classConstructor)) {
                classProto = Object.getPrototypeOf(classProto);
                if (JsTypeCommander.isNil(classProto))
                    break;
                classConstructor = classProto.constructor;
            }
        }
        if (JsTypeCommander.isFunction(classConstructor) && obj instanceof classConstructor)
            return true;
        var valueProto, valueConstructor;
        if (JsTypeCommander.isFunction(obj)) {
            valueConstructor = obj;
            valueProto = obj.prototype;
        }
        else {
            valueProto = Object.getPrototypeOf(obj);
            valueConstructor = valueProto.constructor;
            while (!JsTypeCommander.isFunction(valueConstructor)) {
                valueProto = Object.getPrototypeOf(valueProto);
                if (JsTypeCommander.isNil(valueProto))
                    break;
                valueConstructor = valueProto.constructor;
            }
        }
        if (JsTypeCommander.isNil(valueConstructor))
            return (JsTypeCommander.isNil(classConstructor) && JsTypeCommander.isNil(classProto) == JsTypeCommander.isNil(valueProto));
        if (valueConstructor === classConstructor)
            return true;
        if (JsTypeCommander.isNil(valueProto))
            return (JsTypeCommander.isNil(classProto) && valueConstructor === classConstructor);
        var constructorChain = [];
        do {
            if (JsTypeCommander.isFunction(classConstructor) && valueProto instanceof classConstructor)
                return true;
            constructorChain.push(valueConstructor);
            valueConstructor = null;
            do {
                valueProto = Object.getPrototypeOf(valueProto);
                if (JsTypeCommander.isNil(valueProto))
                    break;
                valueConstructor = valueProto.constructor;
            } while (JsTypeCommander.isNil(valueConstructor));
        } while (!JsTypeCommander.isNil(valueConstructor));
        for (var i = 0; i < constructorChain.length; i++) {
            if (constructorChain[i] === classConstructor)
                return true;
        }
        return false;
    }
    JsTypeCommander.derivesFrom = derivesFrom;
    /**
     * If defined, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromIfDef(obj, classConstructor) {
        return typeof (obj) == "undefined" || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromIfDef = derivesFromIfDef;
    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNull(obj, classConstructor) {
        return JsTypeCommander.isNull(obj) || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromOrNull = derivesFromOrNull;
    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNil(obj, classConstructor) {
        return JsTypeCommander.isNil(obj) || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromOrNil = derivesFromOrNil;
    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    function isErrorLike(obj) {
        if (!JsTypeCommander.isPlainObject(obj))
            return false;
        if (JsTypeCommander.derivesFrom(obj, Error))
            return true;
        if (JsTypeCommander.isString(obj.message))
            return JsTypeCommander.isStringIfDef(obj.name) && JsTypeCommander.isStringIfDef(obj.stack);
        if (JsTypeCommander.isDefined(obj.message))
            return false;
        return JsTypeCommander.isString(obj.stack) && JsTypeCommander.isStringIfDef(obj.name);
    }
    JsTypeCommander.isErrorLike = isErrorLike;
    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    function toErrorLike(obj) {
        if (JsTypeCommander.isNil(obj))
            return obj;
        if (JsTypeCommander.isErrorLike(obj))
            return { message: obj.message, name: obj.name, stack: obj.stack };
        var s = JsTypeCommander.asString(obj);
        if (JsTypeCommander.isString(s))
            return { message: s };
        return s;
    }
    JsTypeCommander.toErrorLike = toErrorLike;
    /**
     * Trims leading whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    function trimStart(text) {
        var s = asString(text, "");
        var m = trimStartRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return (JsTypeCommander.isNil(m[1])) ? "" : m[1];
    }
    JsTypeCommander.trimStart = trimStart;
    /**
     * Trims trailing whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    function trimEnd(text) {
        var s = asString(text, "");
        var m = trimEndRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return m[1];
    }
    JsTypeCommander.trimEnd = trimEnd;
    /**
     * Normalizes whitespace in text.
     * @param text Text to trim.
     * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
     */
    function asNormalizedWs(text) {
        var s = asString(text, "").trim();
        if (s.length == 0)
            return s;
        return s.replace(abnormalWhitespaceRegex, " ");
    }
    JsTypeCommander.asNormalizedWs = asNormalizedWs;
    /**
     * Capitalizes first letter in text.
     * @param {string} text Text to capitalize.
     * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
     */
    function ucFirst(text) {
        var s = asString(text, "");
        if (s.length < 2)
            return s.toUpperCase();
        var m = ucFirstRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        if (JsTypeCommander.isString(m[1])) {
            if (JsTypeCommander.isString(m[3]))
                return m[1] + m[2].toUpperCase() + m[3];
            return m[1] + m[2].toUpperCase();
        }
        if (JsTypeCommander.isString(m[3]))
            return m[2].toUpperCase() + m[3];
        return m[2].toUpperCase();
    }
    JsTypeCommander.ucFirst = ucFirst;
    /**
     * Splits text by line separator character sequences.
     * @param {string} text Text to split.
     * @returns {string[]} Array containing individual lines of text.
     */
    function splitLines(text) {
        var s = asString(text, "");
        if (s.length == 0)
            return [s];
        return s.split(lineSplitRegex);
    }
    JsTypeCommander.splitLines = splitLines;
    /**
     * Indents lines within text and trims trailing whitespace.
     * @param {string|string[]} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Text with lines indented.
     */
    function indentText(text, indent) {
        var i = asString(indent, "\t");
        var t = (Array.isArray(text)) ? text.join(newLineString) : asString(text, "");
        if (i.length == 0 || t.length == 0)
            return t;
        return splitLines(t).map(function (s) { return trimEnd(s); }).map(function (s) {
            if (s.length == 0)
                return s;
            return i + s;
        }).join(newLineString);
    }
    JsTypeCommander.indentText = indentText;
    /**
     * Indents lines of text and trim trailing whitespace.
     * @param {string[]|string} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Array containing indented lines.
     */
    function indentLines(text, indent) {
        var i = asString(indent, "\t");
        var t = (Array.isArray(text)) ? text.join(newLineString) : asString(text, "");
        if (t.length == 0)
            return [t];
        var a = splitLines(t).map(function (s) { return trimEnd(s); });
        if (i.length == 0)
            return a;
        return a.map(function (s) {
            if (s.length == 0)
                return s;
            return i + s;
        });
    }
    JsTypeCommander.indentLines = indentLines;
    /**
     * Recursively maps an object or array.
     * @param {*} obj Object to recursively map
     * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
     * @param options Iteration options.
     * @returns {*} Mapped object or array.
     */
    function MapInto(obj, callbackfn, options) {
        var maxDepth;
        var i;
        if (JsTypeCommander.isPlainObject(options)) {
            i = new limitingIterator(callbackfn, options.totalMaxItems, options.maxItemsInArray, options.thisObj);
            maxDepth = JsTypeCommander.asNumber(options.maxDepth, 32);
        }
        else {
            i = new limitingIterator(callbackfn);
            maxDepth = 32;
        }
        return i.iterateInto(maxDepth, obj);
    }
    JsTypeCommander.MapInto = MapInto;
})(JsTypeCommander = exports.JsTypeCommander || (exports.JsTypeCommander = {}));
//# sourceMappingURL=JsTypeCommander.js.map