//interface AnyFunction { (...args: anyAtAll[]): anyAtAll; }
//interface AnyConstructor<T> { new(...args: anyAtAll[]): T; };
export namespace JsTypeCommander {
    let newLineString: string = "\n";
    let whitespaceRegex: RegExp = /^\s*$/;
    let trimStartRegex: RegExp = /^\s+(\S.*)?$/;
    let trimEndRegex: RegExp = /^(\s*\S+(\s+\S+)*)/;
    let lineSplitRegex: RegExp = /\r\n?|\n/g;
    let boolRegex: RegExp = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
    let ucFirstRegex: RegExp = /^([^a-zA-Z\d]+)?([a-z])(.+)?$/g;
    let abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;

    /** Alias for a type that is defined */
    export type defined = any|null;

    /** Alias for a type that can be either defined or undefined. */
    export type anyAtAll = any|null|undefined;

    export interface ErrorMessageLike {
        message: string,
        name?: string,
        stack?: string
    }
    
    export interface IterateCallbackFn { (current: anyAtAll, key?: number|string): anyAtAll; }

    class limitingIterator {
        callbackfn: IterateCallbackFn;
        totalMaxItems: number;
        currentTotalItems: number = 0;
        maxItemsInArray: number;
        thisObj?: any;
    
        constructor(callbackfn: IterateCallbackFn, totalMaxItems?: number, maxItemsInArray?: number, thisObj?: any) {
            this.callbackfn = callbackfn;
            this.totalMaxItems = JsTypeCommander.asNumber(totalMaxItems, 8192);
            this.maxItemsInArray = JsTypeCommander.asNumber(maxItemsInArray, 1024);
            this.thisObj = thisObj;
        }
    
        iterateInto(maxDepth: number, current?: defined, key?: number|string): anyAtAll {
            this.currentTotalItems++;
            let target = (JsTypeCommander.isNil(this.thisObj)) ? this.callbackfn(current, key) : this.callbackfn.call(this.thisObj, current, key);
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
            } else if (JsTypeCommander.isPlainObject(target) && JsTypeCommander.isPlainObject(current)) {
                let count: number = 0;
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
        }
    }

    /**
     * Determines whether an object is defined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if defined (including null); otherwise, false.
     */
    export function isDefined(obj?: defined): obj is defined { return typeof(obj) != "undefined"; }

    /**
     * Determesin whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    export function notDefined(obj?: defined): obj is undefined { return typeof(obj) == "undefined"; }

    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    export function isNil(obj?: defined): obj is null|undefined { return typeof(obj) == "undefined" || obj === null; }

    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    export function isNull(obj?: defined): obj is null|undefined { return typeof(obj) == "object" && obj === null; }

    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    export function isString(obj?: defined): obj is string { return typeof(obj) == "string"; }
    
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    export function isStringIfDef(obj?: defined): obj is string|undefined { return typeof(obj) == "undefined" || typeof(obj) == "string"; }

    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    export function isStringOrNull(obj?: defined): obj is string|null { return typeof(obj) == "string" || JsTypeCommander.isNull(obj); }

    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    export function isStringOrNil(obj?: defined): obj is string|null|undefined { return typeof(obj) == "string" || JsTypeCommander.isNil(obj); }

    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    export function isEmptyString(obj?: defined): obj is string { return typeof(obj) == "string" && obj.length == 0; }
    
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    export function isEmptyStringIfDef(obj?: defined): obj is string|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isEmptyString(obj); }
    
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    export function isEmptyStringOrNull(obj?: defined): obj is string|null { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNull(obj); }
    
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    export function isEmptyStringOrNil(obj?: defined): obj is string|null|undefined { return JsTypeCommander.isEmptyString(obj) || JsTypeCommander.isNil(obj); }
    
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    export function isEmptyOrWhitespace(obj?: defined): obj is string { return typeof(obj) == "string" && obj.trim().length == 0; }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    export function isEmptyOrWhitespaceIfDef(obj?: defined): obj is string|undefined { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.notDefined(obj); }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    export function isNullOrWhitespace(obj?: defined): obj is string|null { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNull(obj); }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    export function isNilOrWhitespace(obj?: defined): obj is string|null|undefined { return JsTypeCommander.isEmptyOrWhitespace(obj) || JsTypeCommander.isNil(obj); }
    
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    export function toString(obj?: defined, defaultValue?: string|null, ifWhitespace?: boolean): string|null|undefined
    {
        if (JsTypeCommander.isString(obj)) {
            if (ifWhitespace && obj.trim().length == 0 && !JsTypeCommander.isNil(defaultValue)) {
                let v = JsTypeCommander.toString(defaultValue);
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

        let s: string;
        if (JsTypeCommander.isErrorLike(obj))
            s = JSON.stringify(JsTypeCommander.toErrorLike(obj));
        else if (JsTypeCommander.isArray(obj))
            s = (obj.length == 0) ? "" : obj.join(",");
        else {
            try { s = obj.toString(); } catch (e) { s = obj + ""; }
            if (!JsTypeCommander.isString(s)){
                if (JsTypeCommander.isNil(defaultValue))
                    return defaultValue;
                return JsTypeCommander.toString(defaultValue);
            }
        }
        if (ifWhitespace && s.trim().length == 0 && !JsTypeCommander.isNil(defaultValue)) {
            let v = JsTypeCommander.toString(defaultValue);
            if (JsTypeCommander.isString(v))
                return v;
        }

        return s;
    }

    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    export function asString(obj?: defined, defaultValue?: string|null, ifWhitespace?: boolean): string
    {
        let s = JsTypeCommander.toString(obj, defaultValue, ifWhitespace);
        if (JsTypeCommander.isString(s))
            return s;
        return "";
    }

    /**
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    export function isBoolean(obj?: defined): obj is boolean { return typeof(obj) == "boolean"; }
    
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    export function isBooleanIfDef(obj?: defined): obj is boolean|undefined { return typeof(obj) == "undefined" || typeof(obj) == "boolean"; }
    
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    export function isBooleanOrNull(obj?: defined): obj is boolean|null { return typeof(obj) == "boolean" || JsTypeCommander.isNull(obj); }
    
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    export function isBooleanOrNil(obj?: defined): obj is boolean|null|undefined { return typeof(obj) == "boolean" || JsTypeCommander.isNull(obj); }

    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    export function toBoolean(obj?: defined, defaultValue?: boolean|null): boolean|null|undefined
    {
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
        } else {
            if (JsTypeCommander.isFunction(obj.valueOf)) {
                try {
                    let v = obj.valueOf();
                    if (JsTypeCommander.isBoolean(v))
                        return v;
                    if (JsTypeCommander.isNumber(v))
                        return v != 0;
                    if (!JsTypeCommander.isNil(v))
                        obj = v;
                } catch { }
            }
            let s = JsTypeCommander.toString(obj);
            if (JsTypeCommander.isString(s) && (s = s.trim()).length > 0) {
                let m = boolRegex.exec(s.trim());
                if (!JsTypeCommander.isNil(m))
                    return !JsTypeCommander.isNil(m[1]);
            }
        }

        if (JsTypeCommander.isNil(defaultValue))
            return defaultValue;
        return JsTypeCommander.toBoolean(defaultValue);
    }
    
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    export function asBoolean(obj?: defined, defaultValue?: boolean): boolean
    {
        let b = JsTypeCommander.toBoolean(obj, defaultValue);
        return JsTypeCommander.isBoolean(b) && b;
    }
    
    /**
     * Determines whether a value is a number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number; otherwise false.
     */
    export function isNumber(obj?: defined): obj is number { return typeof(obj) == "number" && !isNaN(obj); }

    /**
     * Determines whether a value is number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or undefined; otherwise false.
     */
    export function isNumberIfDef(obj?: defined): obj is number|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isNumber(obj); }

    /**
     * Determines whether a value is number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    export function isNumberOrNull(obj?: defined): obj is number|null { return JsTypeCommander.isNumber(obj) || JsTypeCommander.isNull(obj); }

    /**
     * Determines whether a value is number or null (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    export function isNumberNaNorNull(obj?: defined): obj is number|null { return typeof(obj) == "number" || JsTypeCommander.isNull(obj); }

    /**
     * Determines whether a value is number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number, null or undefined; otherwise false.
     */
    export function isNumberOrNil(obj?: defined): obj is number|null|undefined { return typeof(obj) == "number" || JsTypeCommander.isNil(obj); }

    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    export function toNumber(obj?: defined, defaultValue?: number|null): number|null|undefined
    {
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
                let v = obj.valueOf();
                if (JsTypeCommander.isNumber(v))
                    return v;
                if (JsTypeCommander.isBoolean(v))
                    return (v) ? 1 : 0;
                if (!JsTypeCommander.isNil(v))
                    obj = v;
            } catch { }
        }
        let s: string = JsTypeCommander.asString(obj);
        if (JsTypeCommander.isString(s) && (s = s.trim()).length > 0) {
            let i: number = parseFloat(s);
            if (!isNaN(i))
                return i;
            let m = boolRegex.exec(s.trim());
            if (!JsTypeCommander.isNil(m))
                return (JsTypeCommander.isNil(m[1])) ? 0 : 1;
        }

        if (JsTypeCommander.isNil(defaultValue))
            return defaultValue;
        return JsTypeCommander.toNumber(defaultValue);
    }
    
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
     */
    export function asNumber(obj?: defined, defaultValue?: number|null): number
    {
        let i = JsTypeCommander.toNumber(obj, defaultValue);
        if (JsTypeCommander.isNumber(i))
            return i;
        return 0;
    }
    
    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    export function isFunction(obj?: defined) : obj is Function { return typeof(obj) === "function"; }

    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    export function isFunctionIfDef(obj?: defined) : obj is Function|undefined { return typeof(obj) === "undefined" || typeof(obj) === "function"; }

    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    export function isFunctionOrNull(obj?: defined) : obj is Function|null { return typeof(obj) === "function" || JsTypeCommander.isNull(obj); }

    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    export function isFunctionOrNil(obj?: defined) : obj is Function|null|undefined { return typeof(obj) === "function" || JsTypeCommander.isNil(obj); }

    /**
     * Determines whether a value is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type; otherwise false.
     */
    export function isObject(obj?: defined): obj is object { return typeof(obj) == "object" && obj !== null; }

    /**
     * Determines whether a value is an object or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or undefined; otherwise false.
     */
    export function isObjectIfDef(obj?: defined): obj is object|undefined { return typeof(obj) == "undefined" || (typeof(obj) == "object" && obj !== null); }

    /**
     * Determines whether a value is an object or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or null; otherwise false.
     */
    export function isObjectOrNull(obj?: defined): obj is object|null { return typeof(obj) == "object"; }

    /**
     * Determines whether a value is an object, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type, null or undefined; otherwise false.
     */
    export function isObjectOrNil(obj?: defined): obj is object|null|undefined { return typeof(obj) == "undefined" || typeof(obj) == "object"; }

    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     */
    export function isPlainObject(obj?: defined): obj is { [key: string]: any } { return typeof(obj) == "object" && obj !== null && Array.isArray(obj); }
    
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     */
    export function isPlainObjectIfDef(obj?: defined): obj is { [key: string]: any }|undefined { return JsTypeCommander.notDefined(obj) || JsTypeCommander.isPlainObject(obj); }
    
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     */
    export function isPlainObjectOrNull(obj?: defined): obj is { [key: string]: any }|null { return typeof(obj) == "object" && (obj === null || !Array.isArray(obj)); }
    
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     */
    export function isPlainObjectOrNil(obj?: defined): obj is { [key: string]: any }|null|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isPlainObjectOrNull(obj); }
    
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    export function isArray(obj?: defined): obj is anyAtAll[] { return JsTypeCommander.isObject(obj) && Array.isArray(obj); }
   
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    export function isArrayIfDef(obj?: defined): obj is anyAtAll[]|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isArray(obj); }
   
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    export function isArrayOrNull(obj?: defined): obj is anyAtAll[]|null { return typeof(obj) == "object" && (obj === null || Array.isArray(obj)); }

    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    export function isArrayOrNil(obj?: defined): obj is anyAtAll[]|null { return typeof(obj) == "undefined" || (typeof(obj) == "object" && (obj === null || Array.isArray(obj))); }
    
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    export function isEmptyArray(obj?: defined): obj is anyAtAll[] { return JsTypeCommander.isArray(obj) && obj.length == 0; }
   
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    export function isEmptyArrayIfDef(obj?: defined): obj is anyAtAll[]|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isEmptyArray(obj); }
   
    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    export function isEmptyArrayOrNull(obj?: defined): obj is anyAtAll[]|null { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNull(obj); }

    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    export function isEmptyArrayOrNil(obj?: defined): obj is anyAtAll[]|null { return JsTypeCommander.isEmptyArray(obj) || JsTypeCommander.isNil(obj); }

    /**
     * Ensures that a value is an array.
     * @param {*} obj Value to convert.
     * @returns {*[]} Value as an array.
     * @description If object is undefined, an empty array is returned. Else, if object is an array, then the object is returned; Otherwise, an array with a single element containing the value is returned.
     */
    export function asArray(obj?: defined): anyAtAll[] {
        if (JsTypeCommander.isArray(obj))
            return obj;
        if (JsTypeCommander.isDefined(obj))
            return [obj];
        return [];
    }

    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFrom<T>(obj?: defined, classConstructor?: { new(...args: anyAtAll[]): T; }) : obj is T {
        if (!JsTypeCommander.isDefined(obj))
            return !JsTypeCommander.isDefined(classConstructor);
        if (!JsTypeCommander.isDefined(classConstructor))
            return false;
        if (obj === null)
            return classConstructor === null;
        let classProto;
        if (JsTypeCommander.isFunction(classConstructor)) {
            classProto = classConstructor.prototype;
        } else {
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
            
        let valueProto, valueConstructor;
        if (JsTypeCommander.isFunction(obj)) {
            valueConstructor = obj;
            valueProto = obj.prototype;
        } else {
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
        
        let constructorChain = [];
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
        for (let i = 0; i < constructorChain.length; i++) {
            if (constructorChain[i] === classConstructor)
                return true;
        }
        return false;
    }

    /**
     * If defined, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFromIfDef<T>(obj?: defined, classConstructor?: { new(...args: anyAtAll[]): T; }) : obj is T|undefined {
        return typeof(obj) == "undefined" || JsTypeCommander.derivesFrom<T>(obj, classConstructor);
    }

    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFromOrNull<T>(obj?: defined, classConstructor?: { new(...args: anyAtAll[]): T; }) : obj is T|null {
        return JsTypeCommander.isNull(obj) || JsTypeCommander.derivesFrom<T>(obj, classConstructor);
    }

    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFromOrNil<T>(obj?: defined, classConstructor?: { new(...args: anyAtAll[]): T; }) : obj is T|null {
        return JsTypeCommander.isNil(obj) || JsTypeCommander.derivesFrom<T>(obj, classConstructor);
    }

    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    export function isErrorLike(obj?: defined): obj is ErrorMessageLike|Error {
        if (!JsTypeCommander.isPlainObject(obj))
            return false;
        if (JsTypeCommander.derivesFrom<Error>(obj, Error))
            return true;
        if (JsTypeCommander.isString(obj.message))
            return JsTypeCommander.isStringIfDef(obj.name) && JsTypeCommander.isStringIfDef(obj.stack);
        
        if (JsTypeCommander.isDefined(obj.message))
            return false;
        return JsTypeCommander.isString(obj.stack) && JsTypeCommander.isStringIfDef(obj.name);
    }

    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    export function toErrorLike(obj?: defined): ErrorMessageLike|null|undefined {
        if (JsTypeCommander.isNil(obj))
            return obj;
        if (JsTypeCommander.isErrorLike(obj))
            return { message: obj.message, name: obj.name, stack: obj.stack };
        let s: string = JsTypeCommander.asString(obj);
        if (JsTypeCommander.isString(s))
            return { message: s };
        return s;
    }
    
    /**
     * Trims leading whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    export function trimStart(text: string): string {
        let s = asString(text, "");
        let m = trimStartRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return (JsTypeCommander.isNil(m[1])) ? "" : m[1];
    }

    /**
     * Trims trailing whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    export function trimEnd(text: string): string {
        let s = asString(text, "");
        let m = trimEndRegex.exec(s);
        if (JsTypeCommander.isNil(m))
            return s;
        return m[1];
    }

    /**
     * Normalizes whitespace in text.
     * @param text Text to trim.
     * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
     */
    export function asNormalizedWs(text: string): string {
        let s = asString(text, "").trim();
        if (s.length == 0)
            return s;
        return s.replace(abnormalWhitespaceRegex, " ");
    }

    /**
     * Capitalizes first letter in text.
     * @param {string} text Text to capitalize.
     * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
     */
    export function ucFirst(text: string): string {
        let s = asString(text, "");
        if (s.length < 2)
            return s.toUpperCase();
        let m = ucFirstRegex.exec(s);
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

    /**
     * Splits text by line separator character sequences.
     * @param {string} text Text to split.
     * @returns {string[]} Array containing individual lines of text.
     */
    export function splitLines(text: string): string[] {
        let s = asString(text, "");
        if (s.length == 0)
            return [s];
        return s.split(lineSplitRegex);
    }

    /**
     * Indents lines within text and trims trailing whitespace.
     * @param {string|string[]} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Text with lines indented.
     */
    export function indentText(text: string|string[], indent?: string): string {
        let i = asString(indent, "\t");
        let t = (Array.isArray(text)) ? text.join(newLineString) : asString(text, "");
        if (i.length == 0 || t.length == 0)
            return t;

        return splitLines(t).map(s => trimEnd(s)).map(s => {
            if (s.length == 0)
                return s;
            return i + s;
        }).join(newLineString);
    }

    /**
     * Indents lines of text and trim trailing whitespace.
     * @param {string[]|string} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Array containing indented lines.
     */
    export function indentLines(text: string[]|string, indent?: string): string[] {
        let i = asString(indent, "\t");
        let t = (Array.isArray(text)) ? text.join(newLineString) : asString(text, "");
        if (t.length == 0)
            return [t];
        let a = splitLines(t).map(s => trimEnd(s));
        if (i.length == 0)
            return a;

        return a.map(s => {
            if (s.length == 0)
                return s;
            return i + s;
        });
    }

    /**
     * Recursively maps an object or array.
     * @param {*} obj Object to recursively map
     * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
     * @param options Iteration options.
     * @returns {*} Mapped object or array.
     */
    export function MapInto(obj: any, callbackfn: IterateCallbackFn, options?: {
            thisObj?: any,
            totalMaxItems?: number,
            maxItemsInArray?: number,
            maxDepth?: number
    }): any {
        let maxDepth: number;
        let i: limitingIterator;
        if (JsTypeCommander.isPlainObject(options)) {
            i = new limitingIterator(callbackfn, options.totalMaxItems, options.maxItemsInArray, options.thisObj);
            maxDepth = JsTypeCommander.asNumber(options.maxDepth, 32);
        } else {
            i = new limitingIterator(callbackfn);
            maxDepth = 32;
        }
        return i.iterateInto(maxDepth, obj);
    }
}