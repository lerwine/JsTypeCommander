"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//interface AnyFunction { (...args: anyAtAll[]): anyAtAll; }
//interface AnyConstructor<T> { new(...args: anyAtAll[]): T; };
//export namespace JsTypeCommander {
var newLineString = "\n";
var whitespaceRegex = /^\s*$/;
var trimStartRegex = /^\s+(\S.*)?$/;
var trimEndRegex = /^(\s*\S+(\s+\S+)*)/;
var lineSplitRegex = /\r\n?|\n/g;
var boolRegex = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
var ucFirstRegex = /^([^a-zA-Z\d]+)?([a-z])(.+)?$/g;
var abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;
;
;
function mapByTypeValue(target, callbacks, simpleCheck) {
    switch (typeof (target)) {
        case "boolean":
            if (typeof (callbacks.whenBoolean) == "function")
                return callbacks.whenBoolean(target);
            if (typeof (callbacks.whenBoolean) !== "undefined")
                return callbacks.whenBoolean;
        case "function":
            if (typeof (callbacks.whenFunction) == "function")
                return callbacks.whenFunction(target);
            if (typeof (callbacks.whenFunction) !== "undefined")
                return callbacks.whenFunction;
            break;
        case "number":
            var n = target;
            if (isNaN(n) && typeof (callbacks.whenNaN) != "undefined") {
                if (typeof (callbacks.whenNaN) == "function")
                    return callbacks.whenNaN(n);
                if (typeof (callbacks.whenNaN) !== "undefined")
                    return callbacks.whenNaN;
            }
            if ((n == Number.NEGATIVE_INFINITY || n == Number.POSITIVE_INFINITY) && typeof (callbacks.whenInfinity) != "undefined") {
                if (typeof (callbacks.whenInfinity) == "function")
                    return callbacks.whenInfinity(n);
                if (typeof (callbacks.whenInfinity) !== "undefined")
                    return callbacks.whenInfinity;
            }
            if (typeof (callbacks.whenNumber) == "function")
                return callbacks.whenNumber(n);
            if (typeof (callbacks.whenNumber) !== "undefined")
                return callbacks.whenNumber;
            break;
        case "string":
            if (typeof (callbacks.whenString) == "function")
                return callbacks.whenString(target);
            if (typeof (callbacks.whenString) !== "undefined")
                return callbacks.whenString;
            break;
        case "symbol":
            if (typeof (callbacks.whenSymbol) == "function")
                return callbacks.whenSymbol(target);
            if (typeof (callbacks.whenSymbol) !== "undefined")
                return callbacks.whenSymbol;
            break;
        case "undefined":
            if (typeof (callbacks.whenUndefined) == "function")
                return callbacks.whenUndefined(undefined);
            if (typeof (callbacks.whenUndefined) !== "undefined")
                return callbacks.whenUndefined;
            break;
        case "object":
            if (target === null) {
                if (typeof (callbacks.whenNull) == "function")
                    return callbacks.whenNull(null);
                if (typeof (callbacks.whenNull) !== "undefined")
                    return callbacks.whenNull;
            }
            if (Array.isArray(target)) {
                if (typeof (callbacks.whenArray) == "function")
                    return callbacks.whenArray(target);
                if (typeof (callbacks.whenArray) !== "undefined")
                    return callbacks.whenArray;
                if (typeof (callbacks.whenArrayLike) == "function")
                    return callbacks.whenArrayLike(target);
                if (typeof (callbacks.whenArrayLike) !== "undefined")
                    return callbacks.whenArrayLike;
            }
            else if (typeof (callbacks.whenArrayLike) !== "undefined") {
                if (isArrayLike(target, simpleCheck)) {
                    if (typeof (callbacks.whenArrayLike) == "function")
                        return callbacks.whenArrayLike(target);
                    return callbacks.whenArrayLike;
                }
                else if (typeof (callbacks.whenNotArrayLike) == "function")
                    return callbacks.whenNotArrayLike(target);
                if (typeof (callbacks.whenNotArrayLike) !== "undefined")
                    return callbacks.whenNotArrayLike;
            }
            else {
                if (typeof (callbacks.whenNotArrayLike) == "function")
                    return callbacks.whenNotArrayLike(target);
                if (typeof (callbacks.whenNotArrayLike) !== "undefined")
                    return callbacks.whenNotArrayLike;
            }
            if (typeof (callbacks.whenObject) == "function")
                return callbacks.whenObject(target);
            if (typeof (callbacks.whenObject) !== "undefined")
                return callbacks.whenObject;
            break;
    }
    if (typeof (callbacks.otherwise) == "function")
        return callbacks.otherwise(target);
    return callbacks.otherwise;
}
exports.mapByTypeValue = mapByTypeValue;
/**
 * Gets a mapped value according to whether the object is defined and optionally by target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined.
 * @param otherwise Function to call to get return value, or value to return, when target is undefined.
 * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
 */
function mapByDefined(target, whenTrue, otherwise) {
    var t = typeof (target);
    if (t != "undefined") {
        if (typeof (whenTrue) == "function")
            return whenTrue(t);
        return whenTrue;
    }
    if (typeof (otherwise) == "function")
        return otherwise(t);
    return otherwise;
}
exports.mapByDefined = mapByDefined;
/**
 * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined or is not null.
 * @param otherwise Function to call to get return value, or value to return, when target is null.
 * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
 */
function mapByNotNull(target, whenTrue, otherwise) {
    var t = typeof (target);
    if (t == "object" && target == null) {
        if (typeof (otherwise) == "function")
            return otherwise(t);
        return otherwise;
    }
    if (typeof (whenTrue) == "function")
        return whenTrue(t);
    return whenTrue;
}
exports.mapByNotNull = mapByNotNull;
/**
 * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is defined and is not null.
 * @param otherwise Function to call to get return value, or value to return, when target is undefined or null.
 * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
 */
function mapByNotNil(obj, whenTrue, otherwise) {
    var t = typeof (obj);
    if (t == "undefined" || (t == "object" && obj === null)) {
        if (typeof (otherwise) == "function")
            return otherwise(t);
        return otherwise;
    }
    if (typeof (whenTrue) == "function")
        return whenTrue(t);
    return whenTrue;
}
exports.mapByNotNil = mapByNotNil;
/**
 * Determesin whether an object is undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is undefined; otherwise, false.
 */
function notDefined(obj) { return typeof (obj) == "undefined"; }
exports.notDefined = notDefined;
/**
 * Determines wether an object is undefined or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is undefined or null; otherwise, false.
 */
function isNil(obj) { return typeof (obj) == "undefined" || obj === null; }
exports.isNil = isNil;
/**
 * Determines whether an object is null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is null; otherwise false (not defined or not null).
 */
function isNull(obj) { return typeof (obj) == "object" && obj === null; }
exports.isNull = isNull;
/**
 * Determines whether a value is a string.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string; otherwise false.
 */
function isString(obj) { return typeof (obj) == "string"; }
exports.isString = isString;
/**
 * Determines whether a value is a string or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string or undefined; otherwise false.
 */
function isStringIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "string"; }
exports.isStringIfDef = isStringIfDef;
/**
 * Determines whether a value is a string or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string or null; otherwise false.
 */
function isStringOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenString: true,
        otherwise: false
    });
}
exports.isStringOrNull = isStringOrNull;
/**
 * Determines whether a value is a string, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string, null or undefined; otherwise false.
 */
function isStringOrNil(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenUndefined: true,
        whenString: true,
        otherwise: false
    });
}
exports.isStringOrNil = isStringOrNil;
/**
 * Determines whether a value is an empty string.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string; otherwise false.
 */
function isEmptyString(obj) {
    return mapByTypeValue(obj, {
        whenString: function (s) { return s.length == 0; },
        otherwise: false
    });
}
exports.isEmptyString = isEmptyString;
/**
 * Determines whether a value is an empty string or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string undefined; otherwise false.
 */
function isEmptyStringIfDef(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenString: function (s) { return s.length == 0; },
        otherwise: false
    });
}
exports.isEmptyStringIfDef = isEmptyStringIfDef;
/**
 * Determines whether a value is a empty string or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string or null; otherwise false.
 */
function isEmptyStringOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenString: function (s) { return s.length == 0; },
        otherwise: false
    });
}
exports.isEmptyStringOrNull = isEmptyStringOrNull;
/**
 * Determines whether a value is an empty string, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
 */
function isEmptyStringOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenString: function (s) { return s.length == 0; },
        otherwise: false
    });
}
exports.isEmptyStringOrNil = isEmptyStringOrNil;
/**
 * Determines whether a value is an empty string or contains only whitespace characters.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
 */
function isEmptyOrWhitespace(obj) {
    return mapByTypeValue(obj, {
        whenString: function (s) { return s.trim().length == 0; },
        otherwise: false
    });
}
exports.isEmptyOrWhitespace = isEmptyOrWhitespace;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
 */
function isEmptyOrWhitespaceIfDef(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenString: function (s) { return s.trim().length == 0; },
        otherwise: false
    });
}
exports.isEmptyOrWhitespaceIfDef = isEmptyOrWhitespaceIfDef;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
 */
function isNullOrWhitespace(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenString: function (s) { return s.trim().length == 0; },
        otherwise: false
    });
}
exports.isNullOrWhitespace = isNullOrWhitespace;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
 */
function isNilOrWhitespace(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenString: function (s) { return s.trim().length == 0; },
        otherwise: false
    });
}
exports.isNilOrWhitespace = isNilOrWhitespace;
/**
 * Converts a value to a string.
 * @param {*} obj Object to convert.
 * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
 * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
 * @returns {string|null|undefined} Value converted to a string or the default value.
 */
function toString(obj, defaultValue, ifWhitespace) {
    var str = mapByTypeValue(obj, {
        whenUndefined: function (s) { return s; },
        whenNull: function (s) { return s; },
        whenString: function (s) { return s; },
        whenArray: function (a) { return (a.length == 0) ? "" : a.join(","); },
        otherwise: function (s) {
            try {
                return s.toString();
            }
            catch (e) { }
            return s + "";
        }
    });
    if (typeof (str) == "string" && (!ifWhitespace || str.trim().length > 0))
        return str;
    return mapByTypeValue(defaultValue, {
        whenUndefined: function (s) { return str; },
        whenNull: function (s) { return s; },
        whenString: function (s) { return s; },
        whenArray: function (a) { return (a.length == 0) ? "" : a.join(","); },
        otherwise: function (s) {
            try {
                return s.toString();
            }
            catch (e) { }
            return s + "";
        }
    });
}
exports.toString = toString;
/**
 * Forces a value to a string.
 * @param {*} obj Object to convert.
 * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
 * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
 * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
 */
function asString(obj, defaultValue, ifWhitespace) {
    var s = toString(obj, defaultValue, ifWhitespace);
    if (isString(s))
        return s;
    return "";
}
exports.asString = asString;
/**
 * Trims leading whitespace from text.
 * @param text Text to trim.
 * @returns {string} Text with leading whitespace removed.
 */
function trimStart(text) {
    var s = asString(text, "");
    var m = trimStartRegex.exec(s);
    if (isNil(m))
        return s;
    return (isNil(m[1])) ? "" : m[1];
}
exports.trimStart = trimStart;
/**
 * Trims trailing whitespace from text.
 * @param text Text to trim.
 * @returns {string} Text with trailing whitespace removed.
 */
function trimEnd(text) {
    var s = asString(text, "");
    var m = trimEndRegex.exec(s);
    if (isNil(m))
        return s;
    return m[1];
}
exports.trimEnd = trimEnd;
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
exports.asNormalizedWs = asNormalizedWs;
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
    if (isNil(m))
        return s;
    if (isString(m[1])) {
        if (isString(m[3]))
            return m[1] + m[2].toUpperCase() + m[3];
        return m[1] + m[2].toUpperCase();
    }
    if (isString(m[3]))
        return m[2].toUpperCase() + m[3];
    return m[2].toUpperCase();
}
exports.ucFirst = ucFirst;
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
exports.splitLines = splitLines;
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
exports.indentText = indentText;
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
exports.indentLines = indentLines;
/**
 * Determines whether a value is boolean.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean; otherwise false.
 */
function isBoolean(obj) { return typeof (obj) == "boolean"; }
exports.isBoolean = isBoolean;
/**
 * Determines whether a value is boolean or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean or undefined; otherwise false.
 */
function isBooleanIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "boolean"; }
exports.isBooleanIfDef = isBooleanIfDef;
/**
 * Determines whether a value is boolean or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean or null; otherwise false.
 */
function isBooleanOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenBoolean: true,
        otherwise: false
    });
}
exports.isBooleanOrNull = isBooleanOrNull;
/**
 * Determines whether a value is boolean, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
 */
function isBooleanOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenBoolean: true,
        otherwise: false
    });
}
exports.isBooleanOrNil = isBooleanOrNil;
/**
 * Converts a value to a boolean.
 * @param {*} obj Object to convert.
 * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
 * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
 */
function toBoolean(obj, defaultValue) {
    var bs = mapByTypeValue(obj, {
        whenUndefined: function (b) { return b; },
        whenNull: function (b) { return b; },
        whenBoolean: function (b) { return b; },
        whenString: function (s) { return s; },
        whenNaN: false,
        whenNumber: function (n) { return n != 0; },
        otherwise: function (o) {
            try {
                return mapByTypeValue(o.valueOf(), {
                    whenUndefined: function (b) { return o.toString(); },
                    whenNull: function (b) { return o.toString(); },
                    whenBoolean: function (b) { return b; },
                    whenString: function (s) { return s; },
                    whenNaN: o.toString(),
                    whenNumber: function (n) { return n != 0; },
                    otherwise: function (v) {
                        try {
                            return v.toString();
                        }
                        catch (e) { }
                        return v + "";
                    }
                });
            }
            catch (e) { }
            try {
                return o.toString();
            }
            catch (e) { }
            return o + "";
        }
    });
    return mapByTypeValue(bs, {
        whenBoolean: function (b) { return b; },
        whenString: function (s) {
            if ((s = s.trim()).length > 0) {
                var m = boolRegex.exec(s);
                if (!isNil(m))
                    return isNil(m[2]);
            }
            return mapByTypeValue(defaultValue, {
                whenUndefined: function (o) { return o; },
                whenNull: function (o) { return o; },
                whenBoolean: function (b) { return b; },
                otherwise: function (o) { return toBoolean(o); }
            });
        },
        whenNull: function (o) { return mapByTypeValue(defaultValue, {
            whenUndefined: function (d) { return o; },
            whenNull: function (d) { return d; },
            whenBoolean: function (b) { return b; },
            otherwise: function (d) { return toBoolean(d); }
        }); },
        otherwise: function (o) { return mapByTypeValue(defaultValue, {
            whenUndefined: function (d) { return d; },
            whenNull: function (d) { return d; },
            whenBoolean: function (b) { return b; },
            otherwise: function (d) { return toBoolean(d); }
        }); }
    });
}
exports.toBoolean = toBoolean;
/**
 * Forces a value to a boolean.
 * @param {*} obj Object to convert.
 * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
 * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
 */
function asBoolean(obj, defaultValue) {
    var b = toBoolean(obj, defaultValue);
    return isBoolean(b) && b;
}
exports.asBoolean = asBoolean;
//#endregion
//#region
/**
 * Determines whether a value is a number (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number; otherwise false.
 */
function isNumber(obj) { return typeof (obj) == "number" && !isNaN(obj); }
exports.isNumber = isNumber;
/**
 * Determines whether a value is number or undefined (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or undefined; otherwise false.
 */
function isNumberIfDef(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "number" && !isNaN(obj)); }
exports.isNumberIfDef = isNumberIfDef;
/**
 * Determines whether a value is number or null (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or null; otherwise false.
 */
function isNumberOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenNumber: true,
        whenNaN: false,
        otherwise: false
    });
}
exports.isNumberOrNull = isNumberOrNull;
/**
 * Determines whether a value is number or null (including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or null; otherwise false.
 */
function isNumberNaNorNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenNumber: true,
        whenNaN: true,
        otherwise: false
    });
}
exports.isNumberNaNorNull = isNumberNaNorNull;
/**
 * Determines whether a value is number, null or undefined (including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number, null or undefined; otherwise false.
 */
function isNumberOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenNumber: true,
        whenNaN: false,
        otherwise: false
    });
}
exports.isNumberOrNil = isNumberOrNil;
/**
 * Converts a value to a number.
 * @param {*} obj Object to convert.
 * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
 * @returns {number|null|undefined} Value converted to a number or the default value.
 */
function toNumber(obj, defaultValue) {
    var ns = mapByTypeValue(obj, {
        whenUndefined: function (b) { return b; },
        whenNull: function (b) { return b; },
        whenBoolean: function (b) { return (b) ? 1 : 0; },
        whenString: function (s) { return s; },
        whenNaN: null,
        whenNumber: function (n) { return n; },
        otherwise: function (o) {
            try {
                return mapByTypeValue(o.valueOf(), {
                    whenUndefined: function (b) { return o.toString(); },
                    whenNull: function (b) { return o.toString(); },
                    whenBoolean: function (b) { return (b) ? 1 : 0; },
                    whenString: function (s) { return s; },
                    whenNaN: null,
                    whenNumber: function (n) { return n; },
                    otherwise: function (v) {
                        try {
                            return v.toString();
                        }
                        catch (e) { }
                        return v + "";
                    }
                });
            }
            catch (e) { }
            try {
                return o.toString();
            }
            catch (e) { }
            return o + "";
        }
    });
    return mapByTypeValue(ns, {
        whenBoolean: function (b) { return (b) ? 1 : 0; },
        whenNumber: function (n) { return n; },
        whenNaN: function (o) { return mapByTypeValue(defaultValue, {
            whenUndefined: function (d) { return o; },
            whenNull: function (d) { return o; },
            whenBoolean: function (b) { return (b) ? 1 : 0; },
            whenNumber: function (n) { return n; },
            otherwise: function (d) { return toNumber(d, o); }
        }); },
        whenString: function (s) {
            var f = Number.NaN;
            if ((s = s.trim()).length > 0) {
                f = parseFloat(s);
                if (!isNaN(f))
                    return f;
            }
            return mapByTypeValue(defaultValue, {
                whenUndefined: function (o) { return f; },
                whenNull: function (o) { return f; },
                whenBoolean: function (b) { return (b) ? 1 : 0; },
                whenNumber: function (n) { return n; },
                otherwise: function (o) { return toNumber(o, f); }
            });
        },
        whenNull: function (o) { return mapByTypeValue(defaultValue, {
            whenUndefined: function (d) { return o; },
            whenNull: function (d) { return d; },
            whenBoolean: function (b) { return (b) ? 1 : 0; },
            whenNumber: function (n) { return n; },
            otherwise: function (d) { return toNumber(d); }
        }); },
        otherwise: function (o) { return mapByTypeValue(defaultValue, {
            whenUndefined: function (d) { return d; },
            whenNull: function (d) { return d; },
            whenBoolean: function (b) { return (b) ? 1 : 0; },
            whenNumber: function (n) { return n; },
            otherwise: function (d) { return toNumber(d); }
        }); }
    });
}
exports.toNumber = toNumber;
/**
 * Forces a value to a number.
 * @param {*} obj Object to convert.
 * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
 * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
 */
function asNumber(obj, defaultValue) {
    var i = toNumber(obj, defaultValue);
    if (isNumber(i))
        return i;
    return 0;
}
exports.asNumber = asNumber;
/**
 * Determines whether a value is a function.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function; otherwise false.
 */
function isFunction(obj) { return typeof (obj) === "function"; }
exports.isFunction = isFunction;
/**
 * Determines whether a value is function or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function or undefined; otherwise false.
 */
function isFunctionIfDef(obj) { return typeof (obj) === "undefined" || typeof (obj) === "function"; }
exports.isFunctionIfDef = isFunctionIfDef;
/**
 * Determines whether a value is function or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function or null; otherwise false.
 */
function isFunctionOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenFunction: true,
        otherwise: false
    });
}
exports.isFunctionOrNull = isFunctionOrNull;
/**
 * Determines whether a value is function, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function, null or undefined; otherwise false.
 */
function isFunctionOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenFunction: true,
        otherwise: false
    });
}
exports.isFunctionOrNil = isFunctionOrNil;
/**
 * Determines whether a value's type is "object" and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
 */
function isObjectType(obj) { return typeof (obj) == "object" && obj !== null; }
exports.isObjectType = isObjectType;
/**
 * Determines whether a value is undefined or its type is "object" and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
 */
function isObjectTypeIfDef(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: false,
        whenObject: true,
        otherwise: false
    });
}
exports.isObjectTypeIfDef = isObjectTypeIfDef;
/**
 * Determines whether a value is null or its type is "object".
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
 */
function isObjectTypeOrNull(obj) { return typeof (obj) == "object"; }
exports.isObjectTypeOrNull = isObjectTypeOrNull;
/**
 * Determines whether a value is undefined, null, or its type is "object".
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
 */
function isObjectTypeOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
exports.isObjectTypeOrNil = isObjectTypeOrNil;
/**
 * Determines whether a value is an object and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is an object and it is not null; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
function isObject(obj) { return typeof (obj) == "object" && obj !== null; }
exports.isObject = isObject;
/**
 * Determines whether a value undefined or it is an object and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
function isObjectIfDef(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && obj !== null); }
exports.isObjectIfDef = isObjectIfDef;
/**
 * Determines whether a value null or it is an object.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value null or it is an object; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
function isObjectOrNull(obj) { return typeof (obj) == "object"; }
exports.isObjectOrNull = isObjectOrNull;
/**
 * Determines whether a value undefined, null, or it is an object.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
function isObjectOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
exports.isObjectOrNil = isObjectOrNil;
/**
 * Determines whether a value is an object, but not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type; otherwise false.
 * @description As a type guard, this behaves the same as isObject() and isPlainObject().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
function isNonArrayObject(obj) { return typeof (obj) == "object" && obj !== null && !Array.isArray(obj); }
exports.isNonArrayObject = isNonArrayObject;
/**
 * Determines whether a value is an object or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
function isNonArrayObjectIfDef(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: false,
        whenObject: true,
        whenArray: false,
        otherwise: false
    });
}
exports.isNonArrayObjectIfDef = isNonArrayObjectIfDef;
/**
 * Determines whether a value is an object or null, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or null; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
function isNonArrayObjectOrNull(obj) { return typeof (obj) == "object" && (obj === null || !Array.isArray(obj)); }
exports.isNonArrayObjectOrNull = isNonArrayObjectOrNull;
/**
 * Determines whether a value is an object, null or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
function isNonArrayObjectOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenObject: true,
        whenArray: false,
        otherwise: false
    });
}
exports.isNonArrayObjectOrNil = isNonArrayObjectOrNil;
/**
 * Determines whether a value is an object, but not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type; otherwise false.
 * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
function isPlainObject(obj) {
    if (typeof (obj) != "object" || obj === null)
        return false;
    var proto = Object.getPrototypeOf(obj);
    return isNil(proto) || proto === Object;
}
exports.isPlainObject = isPlainObject;
/**
 * Determines whether a value is an object or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
function isPlainObjectIfDef(obj) {
    var t = typeof (obj);
    if (t == "undefined")
        return true;
    if (t != "object" || obj === null)
        return false;
    var proto = Object.getPrototypeOf(obj);
    return isNil(proto) || proto === Object;
}
exports.isPlainObjectIfDef = isPlainObjectIfDef;
/**
 * Determines whether a value is an object or null, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or null; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
function isPlainObjectOrNull(obj) {
    if (typeof (obj) != "object")
        return false;
    if (obj === null)
        return true;
    var proto = Object.getPrototypeOf(obj);
    return isNil(proto) || proto === Object;
}
exports.isPlainObjectOrNull = isPlainObjectOrNull;
/**
 * Determines whether a value is an object, null or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
function isPlainObjectOrNil(obj) {
    var t = typeof (obj);
    if (t == "undefined")
        return true;
    if (t != "object")
        return false;
    if (obj === null)
        return true;
    var proto = Object.getPrototypeOf(obj);
    return isNil(proto) || proto === Object;
}
exports.isPlainObjectOrNil = isPlainObjectOrNil;
/**
 * Determines whether a value is an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array; otherwise false.
 */
function isArray(obj) { return isObject(obj) && Array.isArray(obj); }
exports.isArray = isArray;
/**
 * Determines whether a value is an array or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array or undefined; otherwise false.
 */
function isArrayIfDef(obj) { return typeof (obj) == "undefined" || isArray(obj); }
exports.isArrayIfDef = isArrayIfDef;
/**
 * Determines whether a value is an array or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array or null; otherwise false.
 */
function isArrayOrNull(obj) { return typeof (obj) == "object" && (obj === null || Array.isArray(obj)); }
exports.isArrayOrNull = isArrayOrNull;
/**
 * Determines whether a value is an array, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array, null or undefined; otherwise false.
 */
function isArrayOrNil(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && (obj === null || Array.isArray(obj))); }
exports.isArrayOrNil = isArrayOrNil;
/**
 * Determines whether a value is an empty array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array; otherwise false.
 */
function isEmptyArray(obj) {
    return mapByTypeValue(obj, {
        whenArray: function (a) { return a.length == 0; },
        otherwise: false
    });
}
exports.isEmptyArray = isEmptyArray;
/**
 * Determines whether a value is an empty array or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array or undefined; otherwise false.
 */
function isEmptyArrayIfDef(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenArray: function (a) { return a.length == 0; },
        otherwise: false
    });
}
exports.isEmptyArrayIfDef = isEmptyArrayIfDef;
/**
 * Determines whether a value is an empty array or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array or null; otherwise false.
 */
function isEmptyArrayOrNull(obj) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenArray: function (a) { return a.length == 0; },
        otherwise: false
    });
}
exports.isEmptyArrayOrNull = isEmptyArrayOrNull;
/**
 * Determines whether a value is an empty array, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
 */
function isEmptyArrayOrNil(obj) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenArray: function (a) { return a.length == 0; },
        otherwise: false
    });
}
exports.isEmptyArrayOrNil = isEmptyArrayOrNil;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
function isArrayLike(obj, simpleCheck) {
    if (!isObject(obj))
        return false;
    if (Array.isArray(obj))
        return true;
    if (!isNumber(obj.length) || isNaN(obj.length) || obj.length < 0 || obj.length == Number.POSITIVE_INFINITY)
        return false;
    if (simpleCheck || obj.length == 0)
        return true;
    var arr = [];
    for (var i = 0; i < obj.length; i++)
        arr.push(false);
    for (var n in obj) {
        var f = parseFloat(n);
        if (!isNaN(f) && f >= 0 && f < arr.length && parseInt(n) == f)
            arr[f] = true;
    }
    return arr.filter(function (v) { return !v; }).length == 0;
}
exports.isArrayLike = isArrayLike;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
function isArrayLikeifDef(obj, simpleCheck) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenArrayLike: true,
        whenArray: true,
        otherwise: false
    });
}
exports.isArrayLikeifDef = isArrayLikeifDef;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
function isArrayLikeOrNull(obj, simpleCheck) {
    return mapByTypeValue(obj, {
        whenNull: true,
        whenArrayLike: true,
        whenArray: true,
        otherwise: false
    });
}
exports.isArrayLikeOrNull = isArrayLikeOrNull;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
function isArrayLikeOrNil(obj, simpleCheck) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        whenArrayLike: true,
        whenArray: true,
        otherwise: false
    });
}
exports.isArrayLikeOrNil = isArrayLikeOrNil;
/**
 * Ensures that a value is a true array.
 * @param {*} obj Value to convert.
 * @param {boolan} simpleCheck If true and obj is Array-like (but not a true array), then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {*[]} Value as an array.
 * @description If the value is undefined, an empty array is returned.
 * If the value is an actual array, then the object itself is returned;
 * If the object is Array-like, an array is returned with values taken from each of its indexed values.
 * Otherwise, an array with a single element containing the value is returned.
 */
function asArray(obj, simpleCheck) {
    if (isArray(obj))
        return obj;
    if (isArrayLike(obj)) {
        var result = [];
        for (var i = 0; i < obj.length; i++)
            result.push(obj[i]);
        return result;
    }
    if (notDefined(obj))
        return [];
    return [obj];
}
exports.asArray = asArray;
/**
 * Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
 */
function derivesFrom(obj, classConstructor) {
    if (notDefined(obj))
        return notDefined(classConstructor);
    if (notDefined(classConstructor))
        return false;
    if (obj === null)
        return classConstructor === null;
    var classProto;
    if (isFunction(classConstructor)) {
        classProto = classConstructor.prototype;
    }
    else {
        classProto = Object.getPrototypeOf(classConstructor);
        classConstructor = classProto.constructor;
        while (!isFunction(classConstructor)) {
            classProto = Object.getPrototypeOf(classProto);
            if (isNil(classProto))
                break;
            classConstructor = classProto.constructor;
        }
    }
    if (isFunction(classConstructor) && obj instanceof classConstructor)
        return true;
    var valueProto, valueConstructor;
    if (isFunction(obj)) {
        valueConstructor = obj;
        valueProto = obj.prototype;
    }
    else {
        valueProto = Object.getPrototypeOf(obj);
        valueConstructor = valueProto.constructor;
        while (!isFunction(valueConstructor)) {
            valueProto = Object.getPrototypeOf(valueProto);
            if (isNil(valueProto))
                break;
            valueConstructor = valueProto.constructor;
        }
    }
    if (isNil(valueConstructor))
        return (isNil(classConstructor) && isNil(classProto) == isNil(valueProto));
    if (valueConstructor === classConstructor)
        return true;
    if (isNil(valueProto))
        return (isNil(classProto) && valueConstructor === classConstructor);
    var constructorChain = [];
    do {
        if (isFunction(classConstructor) && valueProto instanceof classConstructor)
            return true;
        constructorChain.push(valueConstructor);
        valueConstructor = null;
        do {
            valueProto = Object.getPrototypeOf(valueProto);
            if (isNil(valueProto))
                break;
            valueConstructor = valueProto.constructor;
        } while (isNil(valueConstructor));
    } while (!isNil(valueConstructor));
    for (var i = 0; i < constructorChain.length; i++) {
        if (constructorChain[i] === classConstructor)
            return true;
    }
    return false;
}
exports.derivesFrom = derivesFrom;
/**
 * If defined, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
 */
function derivesFromIfDef(obj, classConstructor) {
    return typeof (obj) == "undefined" || derivesFrom(obj, classConstructor);
}
exports.derivesFromIfDef = derivesFromIfDef;
/**
 * If not null, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
 */
function derivesFromOrNull(obj, classConstructor) {
    return mapByTypeValue(obj, {
        whenUndefined: false,
        whenNull: true,
        otherwise: function (o) { return derivesFrom(obj, classConstructor); }
    });
}
exports.derivesFromOrNull = derivesFromOrNull;
/**
 * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
 */
function derivesFromOrNil(obj, classConstructor) {
    return mapByTypeValue(obj, {
        whenUndefined: true,
        whenNull: true,
        otherwise: function (o) { return derivesFrom(obj, classConstructor); }
    });
}
exports.derivesFromOrNil = derivesFromOrNil;
/**
 * Determines if an object has properties similar to an Error object.
 * @param {*} obj Value to test
 * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
 */
function isErrorLike(obj) {
    if (!isNonArrayObject(obj))
        return false;
    if (derivesFrom(obj, Error))
        return true;
    if (isString(obj.message))
        return isStringIfDef(obj.name) && isStringIfDef(obj.stack);
    if (!notDefined(obj.message))
        return false;
    return isString(obj.stack) && isStringIfDef(obj.name);
}
exports.isErrorLike = isErrorLike;
/**
 * Creates an object with properties similar to an Error object.
 * @param {*} obj Object to convert.
 * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
 * @description This can be useful for serializing error objects when logging.
 */
function toErrorLike(obj) {
    if (isNil(obj))
        return obj;
    if (isErrorLike(obj))
        return { message: obj.message, name: obj.name, stack: obj.stack };
    var s = asString(obj);
    if (isString(s))
        return { message: s };
    return s;
}
exports.toErrorLike = toErrorLike;
var limitingIterator = /** @class */ (function () {
    function limitingIterator(callbackfn, options) {
        this.totalMaxItems = 8192;
        this.currentTotalItems = 0;
        this.maxItemsInObject = 1024;
        this.maxDepth = 32;
        this.callbackfn = callbackfn;
        if (typeof (options) == "object") {
            this.totalMaxItems = asNumber(options.totalMaxItems, this.totalMaxItems);
            this.maxItemsInObject = asNumber(options.maxItemsInObject, this.maxItemsInObject);
            this.maxDepth = asNumber(options.maxDepth, this.maxDepth);
            this.thisObj = options.thisObj;
        }
    }
    limitingIterator.prototype.iterateInto = function (maxDepth, current, key, source, target) {
        this.currentTotalItems++;
        target = (isNil(this.thisObj)) ? this.callbackfn(current, key, source, target) : this.callbackfn.call(this.thisObj, current, key);
        if (maxDepth < 1 || this.currentTotalItems >= this.totalMaxItems || !isObject(target) || !isObject(source))
            return target;
        source = current;
        if (isArray(target)) {
            if (!isArray(current))
                return target;
            for (var index = 0; index < current.length && index < this.maxItemsInObject; index++) {
                var t = this.iterateInto(maxDepth - 1, current[index], index, source, target);
                if (index < target.length)
                    target[index] = t;
                else
                    target.push(t);
                if (this.currentTotalItems >= this.totalMaxItems)
                    break;
            }
        }
        else {
            var count = 0;
            for (var n in current) {
                count++;
                if (count > this.maxItemsInObject)
                    break;
                target[n] = this.iterateInto(maxDepth - 1, current[n], n, source, target);
                if (this.currentTotalItems >= this.totalMaxItems)
                    break;
            }
        }
        return target;
    };
    return limitingIterator;
}());
/**
 * Recursively maps an object or array.
 * @param {*} obj Object to recursively map
 * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
 * @param options Recursive Iteration options.
 * @returns {*} Mapped object or array.
 */
function mapInto(obj, callbackfn, options) {
    var i = new limitingIterator(callbackfn, options);
    return i.iterateInto(i.maxDepth, obj, undefined, undefined, undefined);
}
exports.mapInto = mapInto;
var ExampleArrayLike = /** @class */ (function () {
    function ExampleArrayLike() {
        this.length = 3;
        this[0] = "1";
        this[1] = "3";
        this[2] = "4";
    }
    return ExampleArrayLike;
}());
exports.ExampleArrayLike = ExampleArrayLike;
//}
//# sourceMappingURL=JsTypeCommander.js.map