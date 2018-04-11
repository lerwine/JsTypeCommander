"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    var limitingIterator = (function () {
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
    function isDefined(obj) { return typeof (obj) != "undefined"; }
    JsTypeCommander.isDefined = isDefined;
    function notDefined(obj) { return typeof (obj) == "undefined"; }
    JsTypeCommander.notDefined = notDefined;
    function isNil(obj) { return typeof (obj) == "undefined" || obj === null; }
    JsTypeCommander.isNil = isNil;
    function isNull(obj) { return typeof (obj) == "object" && obj === null; }
    JsTypeCommander.isNull = isNull;
    function isString(obj) { return typeof (obj) == "string"; }
    JsTypeCommander.isString = isString;
    function isStringIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "string"; }
    JsTypeCommander.isStringIfDef = isStringIfDef;
    function isStringOrNull(obj) { return typeof (obj) == "string" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isStringOrNull = isStringOrNull;
    function isStringOrNil(obj) { return typeof (obj) == "string" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isStringOrNil = isStringOrNil;
    function isEmptyString(obj) { return typeof (obj) == "string" && obj.length == 0; }
    JsTypeCommander.isEmptyString = isEmptyString;
    function isEmptyStringIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isEmptyString(obj); }
    JsTypeCommander.isEmptyStringIfDef = isEmptyStringIfDef;
    function isEmptyStringOrNull(obj) { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isEmptyStringOrNull = isEmptyStringOrNull;
    function isEmptyStringOrNil(obj) { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isEmptyStringOrNil = isEmptyStringOrNil;
    function isEmptyOrWhitespace(obj) { return typeof (obj) == "string" && obj.trim().length == 0; }
    JsTypeCommander.isEmptyOrWhitespace = isEmptyOrWhitespace;
    function isEmptyOrWhitespaceIfDef(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.notDefined(obj); }
    JsTypeCommander.isEmptyOrWhitespaceIfDef = isEmptyOrWhitespaceIfDef;
    function isNullOrWhitespace(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNullOrWhitespace = isNullOrWhitespace;
    function isNilOrWhitespace(obj) { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isNilOrWhitespace = isNilOrWhitespace;
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
    function asString(obj, defaultValue, ifWhitespace) {
        var s = JsTypeCommander.toString(obj, defaultValue, ifWhitespace);
        if (JsTypeCommander.isString(s))
            return s;
        return "";
    }
    JsTypeCommander.asString = asString;
    function isBoolean(obj) { return typeof (obj) == "boolean"; }
    JsTypeCommander.isBoolean = isBoolean;
    function isBooleanIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "boolean"; }
    JsTypeCommander.isBooleanIfDef = isBooleanIfDef;
    function isBooleanOrNull(obj) { return typeof (obj) == "boolean" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isBooleanOrNull = isBooleanOrNull;
    function isBooleanOrNil(obj) { return typeof (obj) == "boolean" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isBooleanOrNil = isBooleanOrNil;
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
    function asBoolean(obj, defaultValue) {
        var b = JsTypeCommander.toBoolean(obj, defaultValue);
        return JsTypeCommander.isBoolean(b) && b;
    }
    JsTypeCommander.asBoolean = asBoolean;
    function isNumber(obj) { return typeof (obj) == "number" && !isNaN(obj); }
    JsTypeCommander.isNumber = isNumber;
    function isNumberIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isNumber(obj); }
    JsTypeCommander.isNumberIfDef = isNumberIfDef;
    function isNumberOrNull(obj) { return JsTypeCommander.isNumber(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNumberOrNull = isNumberOrNull;
    function isNumberNaNorNull(obj) { return typeof (obj) == "number" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isNumberNaNorNull = isNumberNaNorNull;
    function isNumberOrNil(obj) { return typeof (obj) == "number" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isNumberOrNil = isNumberOrNil;
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
    function asNumber(obj, defaultValue) {
        var i = JsTypeCommander.toNumber(obj, defaultValue);
        if (JsTypeCommander.isNumber(i))
            return i;
        return 0;
    }
    JsTypeCommander.asNumber = asNumber;
    function isFunction(obj) { return typeof (obj) === "function"; }
    JsTypeCommander.isFunction = isFunction;
    function isFunctionIfDef(obj) { return typeof (obj) === "undefined" || typeof (obj) === "function"; }
    JsTypeCommander.isFunctionIfDef = isFunctionIfDef;
    function isFunctionOrNull(obj) { return typeof (obj) === "function" || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isFunctionOrNull = isFunctionOrNull;
    function isFunctionOrNil(obj) { return typeof (obj) === "function" || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isFunctionOrNil = isFunctionOrNil;
    function isObject(obj) { return typeof (obj) == "object" && obj !== null; }
    JsTypeCommander.isObject = isObject;
    function isObjectIfDef(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && obj !== null); }
    JsTypeCommander.isObjectIfDef = isObjectIfDef;
    function isObjectOrNull(obj) { return typeof (obj) == "object"; }
    JsTypeCommander.isObjectOrNull = isObjectOrNull;
    function isObjectOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
    JsTypeCommander.isObjectOrNil = isObjectOrNil;
    function isPlainObject(obj) { return typeof (obj) == "object" && obj !== null && Array.isArray(obj); }
    JsTypeCommander.isPlainObject = isPlainObject;
    function isPlainObjectIfDef(obj) { return JsTypeCommander.notDefined(obj) || JsTypeCommander.isPlainObject(obj); }
    JsTypeCommander.isPlainObjectIfDef = isPlainObjectIfDef;
    function isPlainObjectOrNull(obj) { return typeof (obj) == "object" && (obj === null || !Array.isArray(obj)); }
    JsTypeCommander.isPlainObjectOrNull = isPlainObjectOrNull;
    function isPlainObjectOrNil(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isPlainObjectOrNull(obj); }
    JsTypeCommander.isPlainObjectOrNil = isPlainObjectOrNil;
    function isArray(obj) { return JsTypeCommander.isObject(obj) && Array.isArray(obj); }
    JsTypeCommander.isArray = isArray;
    function isArrayIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isArray(obj); }
    JsTypeCommander.isArrayIfDef = isArrayIfDef;
    function isArrayOrNull(obj) { return typeof (obj) == "object" && (obj === null || Array.isArray(obj)); }
    JsTypeCommander.isArrayOrNull = isArrayOrNull;
    function isArrayOrNil(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && (obj === null || Array.isArray(obj))); }
    JsTypeCommander.isArrayOrNil = isArrayOrNil;
    function isEmptyArray(obj) { return JsTypeCommander.isArray(obj) && obj.length == 0; }
    JsTypeCommander.isEmptyArray = isEmptyArray;
    function isEmptyArrayIfDef(obj) { return typeof (obj) == "undefined" || JsTypeCommander.isEmptyArray(obj); }
    JsTypeCommander.isEmptyArrayIfDef = isEmptyArrayIfDef;
    function isEmptyArrayOrNull(obj) { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNull(obj); }
    JsTypeCommander.isEmptyArrayOrNull = isEmptyArrayOrNull;
    function isEmptyArrayOrNil(obj) { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNil(obj); }
    JsTypeCommander.isEmptyArrayOrNil = isEmptyArrayOrNil;
    function asArray(obj) {
        if (JsTypeCommander.isArray(obj))
            return obj;
        if (JsTypeCommander.isDefined(obj))
            return [obj];
        return [];
    }
    JsTypeCommander.asArray = asArray;
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
    function derivesFromIfDef(obj, classConstructor) {
        return typeof (obj) == "undefined" || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromIfDef = derivesFromIfDef;
    function derivesFromOrNull(obj, classConstructor) {
        return JsTypeCommander.isNull(obj) || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromOrNull = derivesFromOrNull;
    function derivesFromOrNil(obj, classConstructor) {
        return JsTypeCommander.isNil(obj) || JsTypeCommander.derivesFrom(obj, classConstructor);
    }
    JsTypeCommander.derivesFromOrNil = derivesFromOrNil;
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
    function trimStart(text) {
        var s = asString(text, "");
        var m = trimStartRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return (JsTypeCommander.isNil(m[1])) ? "" : m[1];
    }
    JsTypeCommander.trimStart = trimStart;
    function trimEnd(text) {
        var s = asString(text, "");
        var m = trimEndRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return m[1];
    }
    JsTypeCommander.trimEnd = trimEnd;
    function asNormalizedWs(text) {
        var s = asString(text, "").trim();
        if (s.length == 0)
            return s;
        return s.replace(abnormalWhitespaceRegex, " ");
    }
    JsTypeCommander.asNormalizedWs = asNormalizedWs;
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
    function splitLines(text) {
        var s = asString(text, "");
        if (s.length == 0)
            return [s];
        return s.split(lineSplitRegex);
    }
    JsTypeCommander.splitLines = splitLines;
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