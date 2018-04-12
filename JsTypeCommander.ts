//interface AnyFunction { (...args: anyAtAll[]): anyAtAll; }
//interface AnyConstructor<T> { new(...args: anyAtAll[]): T; };
//export namespace JsTypeCommander {
    let newLineString: string = "\n";
    let whitespaceRegex: RegExp = /^\s*$/;
    let trimStartRegex: RegExp = /^\s+(\S.*)?$/;
    let trimEndRegex: RegExp = /^(\s*\S+(\s+\S+)*)/;
    let lineSplitRegex: RegExp = /\r\n?|\n/g;
    let boolRegex: RegExp = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
    let ucFirstRegex: RegExp = /^([^a-zA-Z\d]+)?([a-z])(.+)?$/g;
    let abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;

    /** Alias for a type that is defined */
    export type TDefined = any|null;

    /** Alias for a type that can be either defined or undefined. */
    export type TAnythingAtAll = any|null|undefined;

    /** Represents a plain object */
    export interface IStringKeyedObject { [key: string]: TAnythingAtAll };

    /** Represents an object which contains both named properties and indexed elements. */
    export interface IComplexObject extends IStringKeyedObject, ArrayLike<TAnythingAtAll> {
        readonly length: number;
        readonly [n: number]: TAnythingAtAll;
        readonly [key: string]: TAnythingAtAll
    };

    /** Represents an object which contains properties in common with Error objects. */
    export interface ErrorMessageLike {
        message: string,
        name?: string,
        stack?: string
    }
    
    /**
     * Function to get mapped value according to a source value.
     * @param {*} value Source value.
     * @returns {*} Mapped value.
     */
    export interface MapFromValueCallback<TSource, TResult> { (value: TSource): TResult; }
    
    export type ObjectTypeString = "boolean"|"function"|"number"|"object"|"string"|"symbol"|"undefined";

    export interface TypeGateCallbacks<TSource, TResult> {
        whenBoolean?: MapFromValueCallback<boolean, TResult>|TResult;
        whenFunction?: MapFromValueCallback<Function, TResult>|TResult;
        whenNumber?: MapFromValueCallback<number, TResult>|TResult;
        whenInfinity?: MapFromValueCallback<number, TResult>|TResult;
        whenNaN?: MapFromValueCallback<number, TResult>|TResult;
        whenObject?: MapFromValueCallback<IStringKeyedObject, TResult>|TResult;
        whenArray?: MapFromValueCallback<TAnythingAtAll[], TResult>|TResult;
        whenArrayLike?: MapFromValueCallback<ArrayLike<TAnythingAtAll>, TResult>|TResult;
        whenNotArrayLike?: MapFromValueCallback<IStringKeyedObject, TResult>|TResult;
        whenString?: MapFromValueCallback<string, TResult>|TResult;
        whenSymbol?: MapFromValueCallback<symbol, TResult>|TResult;
        whenNull?: MapFromValueCallback<null, TResult>|TResult;
        whenUndefined?: MapFromValueCallback<undefined, TResult>|TResult;
        otherwise: MapFromValueCallback<TSource, TResult>|TResult;
    }

    export function mapByTypeValue<TSource, TResult>(target: TSource|null|undefined, callbacks: TypeGateCallbacks<TSource|null|undefined, TResult>, simpleCheck?: boolean): TResult {
        switch (typeof(target)) {
            case "boolean":
                if (typeof(callbacks.whenBoolean) == "function")
                    return callbacks.whenBoolean(<boolean>(<TAnythingAtAll>target));
                if (typeof(callbacks.whenBoolean) !== "undefined")
                    return callbacks.whenBoolean;
            case "function":
                if (typeof(callbacks.whenFunction) == "function")
                    return callbacks.whenFunction(<Function>(<TAnythingAtAll>target));
                if (typeof(callbacks.whenFunction) !== "undefined")
                    return callbacks.whenFunction;
                break;
            case "number":
                let n: number = <number>(<TAnythingAtAll>target);
                if (isNaN(n) && typeof(callbacks.whenNaN) != "undefined") {
                    if (typeof(callbacks.whenNaN) == "function")
                        return callbacks.whenNaN(n);
                    if (typeof(callbacks.whenNaN) !== "undefined")
                        return callbacks.whenNaN;
                }
                if ((n == Number.NEGATIVE_INFINITY || n == Number.POSITIVE_INFINITY) && typeof(callbacks.whenInfinity) != "undefined") {
                    if (typeof(callbacks.whenInfinity) == "function")
                        return callbacks.whenInfinity(n);
                    if (typeof(callbacks.whenInfinity) !== "undefined")
                        return callbacks.whenInfinity;
                }
                if (typeof(callbacks.whenNumber) == "function")
                    return callbacks.whenNumber(n);
                if (typeof(callbacks.whenNumber) !== "undefined")
                    return callbacks.whenNumber;
                break;
            case "string":
                if (typeof(callbacks.whenString) == "function")
                    return callbacks.whenString(<string>(<TAnythingAtAll>target));
                if (typeof(callbacks.whenString) !== "undefined")
                    return callbacks.whenString;
                break;
            case "symbol":
                if (typeof(callbacks.whenSymbol) == "function")
                    return callbacks.whenSymbol(<symbol>(<TAnythingAtAll>target));
                if (typeof(callbacks.whenSymbol) !== "undefined")
                    return callbacks.whenSymbol;
                break;
            case "undefined":
                if (typeof(callbacks.whenUndefined) == "function")
                    return callbacks.whenUndefined(undefined);
                if (typeof(callbacks.whenUndefined) !== "undefined")
                    return callbacks.whenUndefined;
                break;
            case "object":
                if (target === null) {
                    if (typeof(callbacks.whenNull) == "function")
                        return callbacks.whenNull(null);
                    if (typeof(callbacks.whenNull) !== "undefined")
                        return callbacks.whenNull;
                }
                if (Array.isArray(target)) {
                    if (typeof(callbacks.whenArray) == "function")
                        return callbacks.whenArray(<TAnythingAtAll[]>(<TAnythingAtAll>target));
                    if (typeof(callbacks.whenArray) !== "undefined")
                        return callbacks.whenArray;
                    if (typeof(callbacks.whenArrayLike) == "function")
                        return callbacks.whenArrayLike(<TAnythingAtAll[]>(<TAnythingAtAll>target));
                    if (typeof(callbacks.whenArrayLike) !== "undefined")
                        return callbacks.whenArrayLike;
                } else if (typeof(callbacks.whenArrayLike) !== "undefined") {
                    if (isArrayLike(target, simpleCheck)) {
                        if (typeof(callbacks.whenArrayLike) == "function")
                            return callbacks.whenArrayLike(<ArrayLike<TAnythingAtAll>>(<TAnythingAtAll>target));
                        return callbacks.whenArrayLike;
                    } else if (typeof(callbacks.whenNotArrayLike) == "function")
                        return callbacks.whenNotArrayLike(<IStringKeyedObject>target);
                    if (typeof(callbacks.whenNotArrayLike) !== "undefined")
                        return callbacks.whenNotArrayLike;
                } else {
                    if (typeof(callbacks.whenNotArrayLike) == "function")
                        return callbacks.whenNotArrayLike(<IStringKeyedObject>target);
                    if (typeof(callbacks.whenNotArrayLike) !== "undefined")
                        return callbacks.whenNotArrayLike;
                }
                if (typeof(callbacks.whenObject) == "function")
                    return callbacks.whenObject(<IStringKeyedObject>target);
                if (typeof(callbacks.whenObject) !== "undefined")
                    return callbacks.whenObject;
                break;
        }
        if (typeof(callbacks.otherwise) == "function")
            return callbacks.otherwise(target);
        return callbacks.otherwise;
    }
    
    /**
     * Function to get mapped value according to a type string.
     * @param {"boolean"|"function"|"number"|"object"|"string"|"symbol"|"undefined"} type Object type.
     * @returns {*} Mapped value.
     */
    export interface MapFromTypeCallback<TResult> { (type?: ObjectTypeString): TResult; }

    /**
     * Gets a mapped value according to whether the object is defined and optionally by target object type.
     * @param target Value to test.
     * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined.
     * @param otherwise Function to call to get return value, or value to return, when target is undefined.
     * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
     */
    export function mapByDefined<TResult>(target: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult>|TResult, otherwise: MapFromTypeCallback<TResult>|TResult) : TResult {
        let t = typeof(target);
        if (t != "undefined") {
            if (typeof(whenTrue) == "function")
                return whenTrue(t);
            return whenTrue;
        }
        
        if (typeof(otherwise) == "function")
            return otherwise(t);
        return otherwise;
    }

    /**
     * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined or is not null.
     * @param otherwise Function to call to get return value, or value to return, when target is null.
     * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     */
    export function mapByNotNull<TResult>(target: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult>|TResult, otherwise: MapFromTypeCallback<TResult>|TResult) : TResult {
        let t = typeof(target);
        if (t == "object" && target == null) {
            if (typeof(otherwise) == "function")
                return otherwise(t);
            return otherwise;
        }
        
        if (typeof(whenTrue) == "function")
            return whenTrue(t);
        return whenTrue;
    }

    /**
     * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is defined and is not null.
     * @param otherwise Function to call to get return value, or value to return, when target is undefined or null.
     * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
     */
    export function mapByNotNil<TResult>(obj: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult>|TResult,
            otherwise: MapFromTypeCallback<TResult>|TResult) : TResult {
        let t = typeof(obj);
        if (t == "undefined" || (t == "object" && obj === null)) {
            if (typeof(otherwise) == "function")
                return otherwise(t);
            return otherwise;
        }
        
        if (typeof(whenTrue) == "function")
            return whenTrue(t);
        return whenTrue;
    }

    /**
     * Determesin whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    export function notDefined(obj?: TDefined): obj is undefined { return typeof(obj) == "undefined"; }

    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    export function isNil(obj?: TDefined): obj is null|undefined { return typeof(obj) == "undefined" || obj === null; }

    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    export function isNull(obj?: TDefined): obj is null|undefined { return typeof(obj) == "object" && obj === null; }

    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    export function isString(obj?: TDefined): obj is string { return typeof(obj) == "string"; }
    
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    export function isStringIfDef(obj?: TDefined): obj is string|undefined { return typeof(obj) == "undefined" || typeof(obj) == "string"; }

    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    export function isStringOrNull(obj?: TDefined): obj is string|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenString: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    export function isStringOrNil(obj?: TDefined): obj is string|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenUndefined: true,
            whenString: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    export function isEmptyString(obj?: TDefined): obj is string {
        return mapByTypeValue<any, boolean>(obj, {
            whenString: (s) => s.length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    export function isEmptyStringIfDef(obj?: TDefined): obj is string|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenString: (s) => s.length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    export function isEmptyStringOrNull(obj?: TDefined): obj is string|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenString: (s) => s.length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    export function isEmptyStringOrNil(obj?: TDefined): obj is string|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenString: (s) => s.length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    export function isEmptyOrWhitespace(obj?: TDefined): obj is string {
        return mapByTypeValue<any, boolean>(obj, {
            whenString: (s) => s.trim().length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    export function isEmptyOrWhitespaceIfDef(obj?: TDefined): obj is string|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenString: (s) => s.trim().length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    export function isNullOrWhitespace(obj?: TDefined): obj is string|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenString: (s) => s.trim().length == 0,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    export function isNilOrWhitespace(obj?: TDefined): obj is string|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenString: (s) => s.trim().length == 0,
            otherwise: false
        });
    }
    
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    export function toString(obj?: TDefined, defaultValue?: string|null, ifWhitespace?: boolean): string|null|undefined {
        let str: string|undefined|null = mapByTypeValue<any, string|undefined|null>(obj, {
            whenUndefined: (s) => s,
            whenNull: (s) => s,
            whenString: (s) => s,
            whenArray: (a) => (a.length == 0) ? "" : a.join(","),
            otherwise: (s) => {
                try { return s.toString(); } catch (e) { }
                return s + "";
            }
        });
        if (typeof(str) == "string" && (!ifWhitespace || str.trim().length > 0))
            return str;
        return mapByTypeValue<any, string|undefined|null>(defaultValue, {
            whenUndefined: (s) => str,
            whenNull: (s) => s,
            whenString: (s) => s,
            whenArray: (a) => (a.length == 0) ? "" : a.join(","),
            otherwise: (s) => {
                try { return s.toString(); } catch (e) { }
                return s + "";
            }
        });
    }

    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    export function asString(obj?: TDefined, defaultValue?: string|null, ifWhitespace?: boolean): string
    {
        let s = toString(obj, defaultValue, ifWhitespace);
        if (isString(s))
            return s;
        return "";
    }
    
    /**
     * Trims leading whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    export function trimStart(text: string): string {
        let s = asString(text, "");
        let m = trimStartRegex.exec(s);
        if (isNil(m))
            return s;
        return (isNil(m[1])) ? "" : m[1];
    }

    /**
     * Trims trailing whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    export function trimEnd(text: string): string {
        let s = asString(text, "");
        let m = trimEndRegex.exec(s);
        if (isNil(m))
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
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    export function isBoolean(obj?: TDefined): obj is boolean { return typeof(obj) == "boolean"; }
    
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    export function isBooleanIfDef(obj?: TDefined): obj is boolean|undefined { return typeof(obj) == "undefined" || typeof(obj) == "boolean"; }
    
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    export function isBooleanOrNull(obj?: TDefined): obj is boolean|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenBoolean: true,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    export function isBooleanOrNil(obj?: TDefined): obj is boolean|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenBoolean: true,
            otherwise: false
        });
    }

    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    export function toBoolean(obj?: TDefined, defaultValue?: boolean|null): boolean|null|undefined {
        let bs: boolean|string|undefined|null = mapByTypeValue<any, boolean|string|undefined|null>(obj, {
            whenUndefined: (b) => b,
            whenNull: (b) => b,
            whenBoolean: (b) => b,
            whenString: (s) => s,
            whenNaN: false,
            whenNumber: (n) => n != 0,
            otherwise: (o) => {
                try {
                    return mapByTypeValue<any, boolean|string|undefined|null>(o.valueOf(), {
                        whenUndefined: (b) => o.toString(),
                        whenNull: (b) => o.toString(),
                        whenBoolean: (b) => b,
                        whenString: (s) => s,
                        whenNaN: o.toString(),
                        whenNumber: (n) => n != 0,
                        otherwise: (v) => {
                            try { return v.toString(); } catch (e) { }
                            return v + "";
                        }
                    })
                } catch (e) { }
                try { return o.toString(); } catch (e) { }
                return o + "";
            }
        });
        return mapByTypeValue<boolean|string|undefined|null, boolean|undefined|null>(bs, {
            whenBoolean: (b) => b,
            whenString: (s) => {
                if ((s = s.trim()).length > 0) {
                    let m = boolRegex.exec(s);
                    if (!isNil(m))
                        return isNil(m[2]);
                }
                return mapByTypeValue<any, boolean|undefined|null>(defaultValue, {
                    whenUndefined: (o) => o,
                    whenNull: (o) => o,
                    whenBoolean: (b) => b,
                    otherwise: (o) =>  toBoolean(o)
                });
            },
            whenNull: (o) => mapByTypeValue<any, boolean|undefined|null>(defaultValue, {
                whenUndefined: (d) => o,
                whenNull: (d) => d,
                whenBoolean: (b) => b,
                otherwise: (d) =>  toBoolean(d)
            }),
            otherwise: (o) => mapByTypeValue<any, boolean|undefined|null>(defaultValue, {
                whenUndefined: (d) => d,
                whenNull: (d) => d,
                whenBoolean: (b) => b,
                otherwise: (d) =>  toBoolean(d)
            })
        });
    }
    
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    export function asBoolean(obj?: TDefined, defaultValue?: boolean): boolean
    {
        let b = toBoolean(obj, defaultValue);
        return isBoolean(b) && b;
    }
    
    //#endregion

    //#region

    /**
     * Determines whether a value is a number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number; otherwise false.
     */
    export function isNumber(obj?: TDefined): obj is number { return typeof(obj) == "number" && !isNaN(obj); }

    /**
     * Determines whether a value is number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or undefined; otherwise false.
     */
    export function isNumberIfDef(obj?: TDefined): obj is number|undefined { return typeof(obj) == "undefined" || (typeof(obj) == "number" && !isNaN(obj)); }

    /**
     * Determines whether a value is number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    export function isNumberOrNull(obj?: TDefined): obj is number|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenNumber: true,
            whenNaN: false,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is number or null (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    export function isNumberNaNorNull(obj?: TDefined): obj is number|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenNumber: true,
            whenNaN: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number, null or undefined; otherwise false.
     */
    export function isNumberOrNil(obj?: TDefined): obj is number|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenNumber: true,
            whenNaN: false,
            otherwise: false
        });
    }

    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    export function toNumber(obj?: TDefined, defaultValue?: number|null): number|null|undefined
    {
        let ns: number|string|null|undefined = mapByTypeValue<any, number|string|null|undefined>(obj, {
            whenUndefined: (b) => b,
            whenNull: (b) => b,
            whenBoolean: (b) => (b) ? 1 : 0,
            whenString: (s) => s,
            whenNaN: null,
            whenNumber: (n) => n,
            otherwise: (o) => {
                try {
                    return mapByTypeValue<any, number|string|undefined|null>(o.valueOf(), {
                        whenUndefined: (b) => o.toString(),
                        whenNull: (b) => o.toString(),
                        whenBoolean: (b) => (b) ? 1 : 0,
                        whenString: (s) => s,
                        whenNaN: null,
                        whenNumber: (n) => n,
                        otherwise: (v) => {
                            try { return v.toString(); } catch (e) { }
                            return v + "";
                        }
                    })
                } catch (e) { }
                try { return o.toString(); } catch (e) { }
                return o + "";
            }
        });

        return mapByTypeValue<number|string|undefined|null, number|undefined|null>(ns, {
            whenBoolean: (b) => (b) ? 1 : 0,
            whenNumber: (n) => n,
            whenNaN: (o) => mapByTypeValue<any, number|undefined|null>(defaultValue, {
                whenUndefined: (d) => o,
                whenNull: (d) => o,
                whenBoolean: (b) => (b) ? 1 : 0,
                whenNumber: (n) => n,
                otherwise: (d) =>  toNumber(d, o)
            }),
            whenString: (s) => {
                let f: number = Number.NaN;
                if ((s = s.trim()).length > 0) {
                    f = parseFloat(s);
                    if (!isNaN(f))
                        return f;
                }
                return mapByTypeValue<any, number|undefined|null>(defaultValue, {
                    whenUndefined: (o) => f,
                    whenNull: (o) => f,
                    whenBoolean: (b) => (b) ? 1 : 0,
                    whenNumber: (n) => n,
                    otherwise: (o) =>  toNumber(o, f)
                });
            },
            whenNull: (o) => mapByTypeValue<any, number|undefined|null>(defaultValue, {
                whenUndefined: (d) => o,
                whenNull: (d) => d,
                whenBoolean: (b) => (b) ? 1 : 0,
                whenNumber: (n) => n,
                otherwise: (d) =>  toNumber(d)
            }),
            otherwise: (o) => mapByTypeValue<any, number|undefined|null>(defaultValue, {
                whenUndefined: (d) => d,
                whenNull: (d) => d,
                whenBoolean: (b) => (b) ? 1 : 0,
                whenNumber: (n) => n,
                otherwise: (d) =>  toNumber(d)
            })
        });
    }
    
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
     */
    export function asNumber(obj?: TDefined, defaultValue?: number|null): number
    {
        let i = toNumber(obj, defaultValue);
        if (isNumber(i))
            return i;
        return 0;
    }

    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    export function isFunction(obj?: TDefined) : obj is Function { return typeof(obj) === "function"; }

    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    export function isFunctionIfDef(obj?: TDefined) : obj is Function|undefined { return typeof(obj) === "undefined" || typeof(obj) === "function"; }

    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    export function isFunctionOrNull(obj?: TDefined) : obj is Function|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenFunction: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    export function isFunctionOrNil(obj?: TDefined) : obj is Function|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenFunction: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value's type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
     */
    export function isObjectType(obj?: TDefined): obj is object { return typeof(obj) == "object" && obj !== null; }

    /**
     * Determines whether a value is undefined or its type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
     */
    export function isObjectTypeIfDef(obj?: TDefined): obj is object|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: false,
            whenObject: true,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is null or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
     */
    export function isObjectTypeOrNull(obj?: TDefined): obj is object|null { return typeof(obj) == "object"; }

    /**
     * Determines whether a value is undefined, null, or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
     */
    export function isObjectTypeOrNil(obj?: TDefined): obj is object|null|undefined { return typeof(obj) == "undefined" || typeof(obj) == "object"; }

    /**
     * Determines whether a value is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    export function isObject(obj?: TDefined): obj is IStringKeyedObject { return typeof(obj) == "object" && obj !== null; }

    /**
     * Determines whether a value undefined or it is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    export function isObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined { return typeof(obj) == "undefined" || (typeof(obj) == "object" && obj !== null); }

    /**
     * Determines whether a value null or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value null or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    export function isObjectOrNull(obj?: TDefined): obj is IStringKeyedObject|null { return typeof(obj) == "object"; }

    /**
     * Determines whether a value undefined, null, or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    export function isObjectOrNil(obj?: TDefined): obj is IStringKeyedObject|null|undefined { return typeof(obj) == "undefined" || typeof(obj) == "object"; }

    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isPlainObject().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    export function isNonArrayObject(obj?: TDefined): obj is IStringKeyedObject { return typeof(obj) == "object" && obj !== null && !Array.isArray(obj); }
    
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    export function isNonArrayObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: false,
            whenObject: true,
            whenArray: false,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    export function isNonArrayObjectOrNull(obj?: TDefined): obj is IStringKeyedObject|null { return typeof(obj) == "object" && (obj === null || !Array.isArray(obj)); }
    
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    export function isNonArrayObjectOrNil(obj?: TDefined): obj is IStringKeyedObject|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenObject: true,
            whenArray: false,
            otherwise: false
        });
    }
    
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    export function isPlainObject(obj?: TDefined): obj is IStringKeyedObject {
        if (typeof(obj) != "object" || obj === null)
            return false;
        let proto = Object.getPrototypeOf(obj);
        return isNil(proto) || proto === Object;
    }
    
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    export function isPlainObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined {
        let t = typeof(obj);
        if (t == "undefined")
            return true;
        if (t != "object" || obj === null)
            return false;
        let proto = Object.getPrototypeOf(obj);
        return isNil(proto) || proto === Object;
    }
    
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    export function isPlainObjectOrNull(obj?: TDefined): obj is IStringKeyedObject|null {
        if (typeof(obj) != "object")
            return false;
        if (obj === null)
            return true;
        let proto = Object.getPrototypeOf(obj);
        return isNil(proto) || proto === Object;
    }
    
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    export function isPlainObjectOrNil(obj?: TDefined): obj is IStringKeyedObject|null|undefined {
        let t = typeof(obj);
        if (t == "undefined")
            return true;
        if (t != "object")
            return false;
        if (obj === null)
            return true;
        let proto = Object.getPrototypeOf(obj);
        return isNil(proto) || proto === Object;
    }
    
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    export function isArray(obj?: TDefined): obj is TAnythingAtAll[] { return isObject(obj) && Array.isArray(obj); }
   
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    export function isArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[]|undefined { return typeof(obj) == "undefined" || isArray(obj); }
   
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    export function isArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[]|null { return typeof(obj) == "object" && (obj === null || Array.isArray(obj)); }

    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    export function isArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[]|null { return typeof(obj) == "undefined" || (typeof(obj) == "object" && (obj === null || Array.isArray(obj))); }
    
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    export function isEmptyArray(obj?: TDefined): obj is TAnythingAtAll[] {
        return mapByTypeValue<any, boolean>(obj, {
            whenArray: (a) => a.length == 0,
            otherwise: false
        });
    }
   
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    export function isEmptyArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[]|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenArray: (a) => a.length == 0,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    export function isEmptyArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[]|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenArray: (a) => a.length == 0,
            otherwise: false
        });
    }

    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    export function isEmptyArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[]|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenArray: (a) => a.length == 0,
            otherwise: false
        });
    }

    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    export function isArrayLike(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> {
        if (!isObject(obj))
            return false;
        if (Array.isArray(obj))
            return true;
        if (!isNumber(obj.length) || isNaN(obj.length) || obj.length < 0 || obj.length == Number.POSITIVE_INFINITY)
            return false;
        if (simpleCheck || obj.length == 0)
            return true;
        let arr: boolean[] = [];
        for (var i = 0; i < obj.length; i++)
            arr.push(false);
        for (var n in obj) {
            var f = parseFloat(n);
            if (!isNaN(f) && f >= 0 && f < arr.length && parseInt(n) == f)
                arr[f] = true;
        }
        return arr.filter(v => !v).length == 0;
    }
   
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    export function isArrayLikeifDef(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll>|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    }
   
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    export function isArrayLikeOrNull(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll>|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenNull: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    }

    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    export function isArrayLikeOrNil(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll>|null|undefined {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    }

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
    export function asArray(obj?: TDefined, simpleCheck?: boolean): TAnythingAtAll[] {
        if (isArray(obj))
            return obj;
        
        if (isArrayLike(obj)) {
            let result: TAnythingAtAll[] = [];
            for (var i = 0; i < obj.length; i++)
                result.push(obj[i]);
            return result;
        }

        if (notDefined(obj))
            return [];
        return [obj];
    }

    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFrom<T>(obj?: TDefined, classConstructor?: { new(...args: TAnythingAtAll[]): T; }) : obj is T {
        if (notDefined(obj))
            return notDefined(classConstructor);
        if (notDefined(classConstructor))
            return false;
        if (obj === null)
            return classConstructor === null;
        let classProto;
        if (isFunction(classConstructor)) {
            classProto = classConstructor.prototype;
        } else {
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
            
        let valueProto, valueConstructor;
        if (isFunction(obj)) {
            valueConstructor = obj;
            valueProto = obj.prototype;
        } else {
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
        
        let constructorChain = [];
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
    export function derivesFromIfDef<T>(obj?: TDefined, classConstructor?: { new(...args: TAnythingAtAll[]): T; }) : obj is T|undefined {
        return typeof(obj) == "undefined" || derivesFrom<T>(obj, classConstructor);
    }

    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFromOrNull<T>(obj?: TDefined, classConstructor?: { new(...args: TAnythingAtAll[]): T; }) : obj is T|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: false,
            whenNull: true,
            otherwise: (o) => derivesFrom<T>(obj, classConstructor)
        });
    }

    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    export function derivesFromOrNil<T>(obj?: TDefined, classConstructor?: { new(...args: TAnythingAtAll[]): T; }) : obj is T|null {
        return mapByTypeValue<any, boolean>(obj, {
            whenUndefined: true,
            whenNull: true,
            otherwise: (o) => derivesFrom<T>(obj, classConstructor)
        });
    }

    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    export function isErrorLike(obj?: TDefined): obj is ErrorMessageLike|Error {
        if (!isNonArrayObject(obj))
            return false;
        if (derivesFrom<Error>(obj, Error))
            return true;
        if (isString(obj.message))
            return isStringIfDef(obj.name) && isStringIfDef(obj.stack);
        
        if (!notDefined(obj.message))
            return false;
        return isString(obj.stack) && isStringIfDef(obj.name);
    }

    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    export function toErrorLike(obj?: TDefined): ErrorMessageLike|null|undefined {
        if (isNil(obj))
            return obj;
        if (isErrorLike(obj))
            return { message: obj.message, name: obj.name, stack: obj.stack };
        let s: string = asString(obj);
        if (isString(s))
            return { message: s };
        return s;
    }

    /**
     * @callback
     * Similar to Array.map, recursively iterate through nested arrays and named object properties to map result values.
     * @param {*} current The current item being interated. This can be null or undefined, according to the current element or property being iterated.
     * @param {number|string|undefined} key The array element index or object property name of the current item.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @param {*[]|object|undefined} source The source object containing the element or property currently being iterated.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @param {*[]|object|undefined} target The target object which will contain the element or property containing return value of this callback function.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @returns {*} The value to replace the current value. Null and undefined values will be accepted.
     * @description Each element on the parent array is iterated, as well as for each named named property on objects. The only exception is the "count" property on arrays, which will be ignored.
     * If the current item is an array, then the return value must also be an array in order for the current value to be recursively iterated.
     * Likewise,if the curren item is an object, then the return value must a non-null value of type "object" in order for the current value to be recursively iterated.
     * If an empty array is returned, elements will be pushed onto the end of the target array as needed, otherwise, they values at the current index will be replaced.
     * If an object with no properties is returned, property values will be added or replaced on the target according to the current property name.
     * @example The following example effectively deep clones the source array to create an object compatible with JSON.stringify:
     * let deepClone = JsTypeCommander.mapInto([{a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]], (current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) => {
     *     if (JsTypeCommander.isArray(current))
     *         return [];
     *     if (JsTypeCommander.isNonArrayObject(current))
     *         return {};
     *     return (JsTypeCommander.isString(current) || JsTypeCommander.isNumber(current) || JsTypeCommander.isBoolean(current) || JsTypeCommander.isObjectOrNil(current)) ? current : current.toString();
     * });
     */
    export interface RecursiveMapCallbackFn {
        (current: TAnythingAtAll, key: number|string|undefined, source: TAnythingAtAll[]|IStringKeyedObject|undefined, target: TAnythingAtAll[]|IStringKeyedObject|undefined): TAnythingAtAll;
    }
    class limitingIterator implements MapIntoOptions {
        callbackfn: RecursiveMapCallbackFn;
        totalMaxItems: number = 8192;
        currentTotalItems: number = 0;
        maxItemsInObject: number = 1024;
        maxDepth: number = 32;
        thisObj?: any;
    
        constructor(callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions) {
            this.callbackfn = callbackfn;
            if (typeof(options) == "object") {
                this.totalMaxItems = asNumber(options.totalMaxItems, this.totalMaxItems);
                this.maxItemsInObject = asNumber(options.maxItemsInObject, this.maxItemsInObject);
                this.maxDepth = asNumber(options.maxDepth, this.maxDepth);
                this.thisObj = options.thisObj;
            }
        }
    
        iterateInto(maxDepth: number, current: TAnythingAtAll, key: number|string|undefined, source: TAnythingAtAll[]|IStringKeyedObject|undefined,
                target: TAnythingAtAll[]|IStringKeyedObject|undefined): TAnythingAtAll {
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
            } else {
                let count: number = 0;
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
        }
    }

    /**
     * Represents options for the JsTypeCommander.mapInto function.
     */
    export interface MapIntoOptions {
        /**
         * If defined, this becomes the 'this' object when the callback function is invoked.
         * @type {*}
         */
        thisObj?: any;
        
        /**
         * Maximum number of items that will be iterated before all iteration is aborted.
         * @type {number=8192}
         * @description A value less than one wil prevent iteration.
         */
        totalMaxItems?: number;
        
        /**
         * Maximum number of elements or properties that will be added to target objects.
         * @type {number=1024}
         * @description A value less than one wil prevent iteration.
         */
        maxItemsInObject?: number;

        /**
         * Maximum recursion depth for recursing. This helps to prevent endless loops, should there be any circular references.
         * @type {number=32}
         * @description A value less than one wil prevent recursion.
         */
        maxDepth?: number;
    }

    /**
     * Recursively maps an object or array.
     * @param {*} obj Object to recursively map
     * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
     * @param options Recursive Iteration options.
     * @returns {*} Mapped object or array.
     */
    export function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any {
        let i: limitingIterator = new limitingIterator(callbackfn, options);
        return i.iterateInto(i.maxDepth, obj, undefined, undefined, undefined);
    }
//}