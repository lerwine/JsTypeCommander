export declare namespace JsTypeCommander {
    /** Alias for a type that is defined */
    type defined = any | null;
    /** Alias for a type that can be either defined or undefined. */
    type anyAtAll = any | null | undefined;
    interface ErrorMessageLike {
        message: string;
        name?: string;
        stack?: string;
    }
    interface IterateCallbackFn {
        (current: anyAtAll, key?: number | string): anyAtAll;
    }
    /**
     * Determines whether an object is defined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if defined (including null); otherwise, false.
     */
    function isDefined(obj?: defined): obj is defined;
    /**
     * Determesin whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    function notDefined(obj?: defined): obj is undefined;
    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    function isNil(obj?: defined): obj is null | undefined;
    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    function isNull(obj?: defined): obj is null | undefined;
    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    function isString(obj?: defined): obj is string;
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    function isStringIfDef(obj?: defined): obj is string | undefined;
    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    function isStringOrNull(obj?: defined): obj is string | null;
    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    function isStringOrNil(obj?: defined): obj is string | null | undefined;
    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    function isEmptyString(obj?: defined): obj is string;
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    function isEmptyStringIfDef(obj?: defined): obj is string | undefined;
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    function isEmptyStringOrNull(obj?: defined): obj is string | null;
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    function isEmptyStringOrNil(obj?: defined): obj is string | null | undefined;
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    function isEmptyOrWhitespace(obj?: defined): obj is string;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    function isEmptyOrWhitespaceIfDef(obj?: defined): obj is string | undefined;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    function isNullOrWhitespace(obj?: defined): obj is string | null;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    function isNilOrWhitespace(obj?: defined): obj is string | null | undefined;
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    function toString(obj?: defined, defaultValue?: string | null, ifWhitespace?: boolean): string | null | undefined;
    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    function asString(obj?: defined, defaultValue?: string | null, ifWhitespace?: boolean): string;
    /**
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    function isBoolean(obj?: defined): obj is boolean;
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    function isBooleanIfDef(obj?: defined): obj is boolean | undefined;
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    function isBooleanOrNull(obj?: defined): obj is boolean | null;
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    function isBooleanOrNil(obj?: defined): obj is boolean | null | undefined;
    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    function toBoolean(obj?: defined, defaultValue?: boolean | null): boolean | null | undefined;
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    function asBoolean(obj?: defined, defaultValue?: boolean): boolean;
    /**
     * Determines whether a value is a number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number; otherwise false.
     */
    function isNumber(obj?: defined): obj is number;
    /**
     * Determines whether a value is number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or undefined; otherwise false.
     */
    function isNumberIfDef(obj?: defined): obj is number | undefined;
    /**
     * Determines whether a value is number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    function isNumberOrNull(obj?: defined): obj is number | null;
    /**
     * Determines whether a value is number or null (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number or null; otherwise false.
     */
    function isNumberNaNorNull(obj?: defined): obj is number | null;
    /**
     * Determines whether a value is number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is number, null or undefined; otherwise false.
     */
    function isNumberOrNil(obj?: defined): obj is number | null | undefined;
    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    function toNumber(obj?: defined, defaultValue?: number | null): number | null | undefined;
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
     */
    function asNumber(obj?: defined, defaultValue?: number | null): number;
    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    function isFunction(obj?: defined): obj is Function;
    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    function isFunctionIfDef(obj?: defined): obj is Function | undefined;
    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    function isFunctionOrNull(obj?: defined): obj is Function | null;
    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    function isFunctionOrNil(obj?: defined): obj is Function | null | undefined;
    /**
     * Determines whether a value is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type; otherwise false.
     */
    function isObject(obj?: defined): obj is object;
    /**
     * Determines whether a value is an object or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or undefined; otherwise false.
     */
    function isObjectIfDef(obj?: defined): obj is object | undefined;
    /**
     * Determines whether a value is an object or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type or null; otherwise false.
     */
    function isObjectOrNull(obj?: defined): obj is object | null;
    /**
     * Determines whether a value is an object, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an object type, null or undefined; otherwise false.
     */
    function isObjectOrNil(obj?: defined): obj is object | null | undefined;
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     */
    function isPlainObject(obj?: defined): obj is {
        [key: string]: any;
    };
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     */
    function isPlainObjectIfDef(obj?: defined): obj is {
        [key: string]: any;
    } | undefined;
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     */
    function isPlainObjectOrNull(obj?: defined): obj is {
        [key: string]: any;
    } | null;
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     */
    function isPlainObjectOrNil(obj?: defined): obj is {
        [key: string]: any;
    } | null | undefined;
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    function isArray(obj?: defined): obj is anyAtAll[];
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    function isArrayIfDef(obj?: defined): obj is anyAtAll[] | undefined;
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    function isArrayOrNull(obj?: defined): obj is anyAtAll[] | null;
    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    function isArrayOrNil(obj?: defined): obj is anyAtAll[] | null;
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    function isEmptyArray(obj?: defined): obj is anyAtAll[];
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    function isEmptyArrayIfDef(obj?: defined): obj is anyAtAll[] | undefined;
    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    function isEmptyArrayOrNull(obj?: defined): obj is anyAtAll[] | null;
    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    function isEmptyArrayOrNil(obj?: defined): obj is anyAtAll[] | null;
    /**
     * Ensures that a value is an array.
     * @param {*} obj Value to convert.
     * @returns {*[]} Value as an array.
     * @description If object is undefined, an empty array is returned. Else, if object is an array, then the object is returned; Otherwise, an array with a single element containing the value is returned.
     */
    function asArray(obj?: defined): anyAtAll[];
    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    function derivesFrom<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T;
    /**
     * If defined, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromIfDef<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | undefined;
    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNull<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | null;
    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNil<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | null;
    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    function isErrorLike(obj?: defined): obj is ErrorMessageLike | Error;
    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    function toErrorLike(obj?: defined): ErrorMessageLike | null | undefined;
    /**
     * Trims leading whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    function trimStart(text: string): string;
    /**
     * Trims trailing whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    function trimEnd(text: string): string;
    /**
     * Normalizes whitespace in text.
     * @param text Text to trim.
     * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
     */
    function asNormalizedWs(text: string): string;
    /**
     * Capitalizes first letter in text.
     * @param {string} text Text to capitalize.
     * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
     */
    function ucFirst(text: string): string;
    /**
     * Splits text by line separator character sequences.
     * @param {string} text Text to split.
     * @returns {string[]} Array containing individual lines of text.
     */
    function splitLines(text: string): string[];
    /**
     * Indents lines within text and trims trailing whitespace.
     * @param {string|string[]} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Text with lines indented.
     */
    function indentText(text: string | string[], indent?: string): string;
    /**
     * Indents lines of text and trim trailing whitespace.
     * @param {string[]|string} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Array containing indented lines.
     */
    function indentLines(text: string[] | string, indent?: string): string[];
    /**
     * Recursively maps an object or array.
     * @param {*} obj Object to recursively map
     * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
     * @param options Iteration options.
     * @returns {*} Mapped object or array.
     */
    function MapInto(obj: any, callbackfn: IterateCallbackFn, options?: {
        thisObj?: any;
        totalMaxItems?: number;
        maxItemsInArray?: number;
        maxDepth?: number;
    }): any;
}
