export declare module JsTypeCommander {
    interface IJsTypeCommanderRegex {
        /**
         * Pattern which matches one or more consecutive whitespace characters.
         */
        onlyWhitespace?: RegExp;
        /**
         * Pattern which captures text from the first non-whitespace character to the end of the string in group index 1 or fails if there are no non-whitespace characters.
         */
        trimStart?: RegExp;
        /**
         * Pattern which captures text in group at index 1, omitting trailing whitespace characters, or fails if there are no non-whitespace characters.
         */
        trimEnd?: RegExp;
        /**
         * Pattern which matches a single character sequence which separates 2 lines of text.
         */
        lineSeparator?: RegExp;
        /**
         * Pattern which captures text that can represent a boolean value, with true values being a successful match at group index 1,
         * and false values being a successful match at group index 2.
         */
        booleanText?: RegExp;
        /**
         * Pattern which captures text that can be used for capitalizing text.
         * @description The group at index 1 captures all leading text which is not a letter or digit, and will fail if there are no such leading characters.
         * The group at index 1 captures the first letter to be capitalized, and will never fail unless the whole pattern fails.
         * The group at index 2 captures remaining text following the capitalized letter, and will fail if there are no remaining characters.
         * If there are no letter characters or if the first letter is already capitalized, then the entire match will fail.
         */
        firstLetterLc?: RegExp;
        /**
         * Pattern which matches consecutive whitespace characters except for single space (' ') characters that are not next to other whitespace characters.
         */
        abnormalWhitespace?: RegExp;
    }
    type PatternSettingsName = "onlyWhitespace" | "trimStart" | "trimEnd" | "lineSeparator" | "booleanText" | "firstLetterLc" | "abnormalWhitespace";
    /**
     * Alias for a type that is defined.
     * @description This is intended to represent any defined value at all when strictNullChecks is turned on.
     */
    type TDefined = any | null;
    /**
     * Alias for a type that can be either defined or undefined.
     * @description This is intended to represent any value at all when strictNullChecks is turned on.
     */
    type TAnythingAtAll = any | null | undefined;
    /** Represents an object which can contained arbitrarily named properties. */
    interface IStringKeyedObject {
        [key: string]: TAnythingAtAll;
    }
    /**
     * Represents an object which contains both named properties and indexed elements.
     */
    interface ICompoundArrayObject extends IStringKeyedObject, ArrayLike<TAnythingAtAll> {
        readonly [key: string]: TAnythingAtAll;
    }
    /**
     * Represents an object which contains properties that are similar to Error objects.
     * @description Properties described in this interface are an aggregation of selectred reference information provided by
     * [Microsoft]{@link https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript} and
     * the [Mozilla Developer Network]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}.
     */
    interface ErrorLike {
        /**
         * Brief string that describes the error.
         * @type {string}
         */
        message: string;
        /**
         * String describing the error.
         * @description This can be used in lieu of the {@link ErrorLike.message} property or it can contain more detailed descriptive information.
         * @type {string}
         */
        description?: string;
        /**
         * Numeric value assigned to the error.
         * @type {number}
         */
        number?: number;
        /**
         * The name for the type of error.
         * @type {string}
         */
        name?: string;
        /**
         * The name of the file associated with the error.
         * @type {string}
         */
        fileName?: string;
        /**
         * The line number associated with the error.
         * @type {number}
         */
        lineNumber?: number;
        /**
         * Contains stack trace information when error is thrown.
         *
         */
        stack?: string;
    }
    /**
     * Function to get mapped value according to a source value.
     * @param {*} value Source value.
     * @returns {*} Mapped value.
     */
    interface MapFromValueCallback<TSource, TResult> {
        (value: TSource): TResult;
    }
    /**
     * Represents supported return values from the <code>typeof</code> funciton.
     */
    type ObjectTypeString = "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";
    type ReservedClassPropertyName = "Arguments" | "Array" | "Boolean" | "Date" | "Error" | "Function" | "JSON" | "Math" | "Number" | "Object" | "RegExp" | "String";
    /**
     * Defines a set of values and/or {@link MapFromValueCallback} which will determine the mapped value according to a source value's type.
     */
    interface TypeGuardResultSpecs<TSource, TResult> {
        /**
         * If defined, will be the "this" variable when callbacks defined in this interface are invoked.
         */
        thisObj?: any;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"boolean"</code>.
         * @description If the source value is <code>"boolean"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenBoolean?: MapFromValueCallback<boolean, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"function"</code>.
         * @description If the source value is a <code>"function"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenFunction?: MapFromValueCallback<Function, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code> and the source value is an infinite value.
         * @description If the source value is an infinite value and this property is not defined, then {@link TypeGuardResultSpecs#whenNumber} will be next in line to determine the mapped value.
         */
        whenInfinity?: MapFromValueCallback<number, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code> and the source value is <code>NaN</code>.
         * @description If the source value is <code>NaN/code> and this property is not defined, then {@link TypeGuardResultSpecs#whenNumber} will be next in line to determine the mapped value.
         */
        whenNaN?: MapFromValueCallback<number, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code>.
         * @description If the source value is a <code>"number"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         * If the source value is an infinite value, and {@link TypeGuardResultSpecs#whenInfinity} is defined, then that property will determine the mapped value, instead.
         * Likewise, if the source value is <code>NaN</code>, and {@link TypeGuardResultSpecs#whenNaN} is defined, then that property will determine the mapped value, instead.
         */
        whenNumber?: MapFromValueCallback<number, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source value derrives from <code>Array</code>.
         * @description If the source value derrives from <code>Array</code> and this property is not defined, then {@link TypeGuardResultSpecs#whenArrayLike} will be next in line to determine the mapped value.
         */
        whenArray?: MapFromValueCallback<TAnythingAtAll[], TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source appears to implement the <code>ArrayLike</code> interface.
         * @description If this property is not defined then the following rules apply:
         * If the source value derrives from <code>Array</code> and {@link TypeGuardResultSpecs#whenArrayLike} is defined, then {@link TypeGuardResultSpecs#whenArrayLike} will determine the mapped value.
         * Otherwise, {@link TypeGuardResultSpecs#whenObject} will be next in line to determine the mapped value.
         */
        whenArrayLike?: MapFromValueCallback<ArrayLike<TAnythingAtAll>, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source value does not derrive from <code>Array</code> and does not appear to implement the <code>ArrayLike</code> interface.
         * @description If the source value is an object and this property is not defined, then {@link TypeGuardResultSpecs#whenObject} will be next in line to determine the mapped value.
         */
        whenNotArrayLike?: MapFromValueCallback<IStringKeyedObject, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"string"</code>.
         * @description If the source value is a <code>"string"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenString?: MapFromValueCallback<string, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"symbol"</code>.
         * @description If the source value is a <code>"symbol"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenSymbol?: MapFromValueCallback<symbol, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and it is equal to <code>null</code>.
         * @description If the source value is null and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenNull?: MapFromValueCallback<null, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"undefined"</code>.
         * @description If the source value is <code>"undefined"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenUndefined?: MapFromValueCallback<undefined, TResult> | TResult;
        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and it is not equal to <code>null</code>.
         * @description If the source value is array-like and either {@link TypeGuardResultSpecs#whenArray} or {@link TypeGuardResultSpecs#whenArrayLike} are defined, then those methods will determine the mapped value, instead.
         */
        whenObject?: MapFromValueCallback<IStringKeyedObject, TResult> | TResult;
        /**
         * This determines the mapped value when the associated type-based property was not defined.
         */
        otherwise: MapFromValueCallback<TSource, TResult> | TResult;
    }
    /**
     * Gets the default character sequence that will be used when joining lines of text.
     * @returns {string} The default character sequence that will be used when joining lines of text.
     */
    function getDefaultLineSeparatorSequence(): string;
    /**
     * Gets regular expression patterns used internally by this module.
     * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns used internally by this module.
     */
    function getPatternOptions(): IJsTypeCommanderRegex;
    /**
     * Sets regular expression pattern options used internally by this module.
     * @param {IJsTypeCommanderRegex} settings Object whose properties contain regular expression patterns used internally by this module.
     * Undefined properties will not be changed. If this parameter is not defined, then the default pattern options will be restored.
     * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns now being used internally by this module.
     */
    function setPatternOptions(settings?: IJsTypeCommanderRegex): IJsTypeCommanderRegex;
    /**
     * Sets the default character sequence that will be used when joining lines of text.
     * @param s The default character sequence to use when joining lines of text. If this parameter is not defined, then the default character sequence will be restored.
     * @returns {string} The default character sequence that will now be used when joining lines of text.
     */
    function setDefaultLineSeparatorSequence(s?: string): string;
    /**
     * Maps a source value to a new value based upon the source value's type.
     * @param target Source value to be mapped.
     * @param callbacks Conditional callbacks which get invoked based upon the source object's type.
     * @param checkElements When checking whether an object is <code>ArrayLike</code> and this is set true, then the existance of each element index is checked, which makes it slower, but more accurate.
     * @returns {*} Value returned from the matching callback.
     */
    function mapByTypeValue<TSource, TResult>(target: TSource | null | undefined, callbacks: TypeGuardResultSpecs<TSource | null | undefined, TResult>, checkElements?: boolean): TResult;
    /**
     * Gets a mapped value according to whether the object is defined and optionally by target object type.
     * @param target Value to test.
     * @param whenTrue When target type is not "undefined": Callback to invoke to get the return value according to target object type, or value to return.
     * @param otherwise When target is "undefined": Function to call to get return value, or value to return.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
     */
    function mapByDefined<TSource, TResult>(target: TSource | undefined, whenTrue: MapFromValueCallback<TSource, TResult> | TResult, otherwise: {
        (): TResult;
    } | TResult, thisObj?: any): TResult;
    /**
     * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue When target value is not null: Function to call to get return value according to target object type, or value to return.
     * @param otherwise When target value is null: Function to call to get return value, or value to return, when target is null.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     */
    function mapByNotNull<TSource, TResult>(target: TSource, whenTrue: MapFromValueCallback<TSource, TResult> | TResult, otherwise: {
        (): TResult;
    } | TResult, thisObj?: any): TResult;
    /**
     * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue When target type is not "undefined" and target value is not null: Function to call to get return value according to target object type, or value to return.
     * @param otherwise When target type is "undefined" or target value is null: Function to call to get return value, or value to return.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
     */
    function mapByNotNil<TSource, TResult>(target: TSource | undefined, whenTrue: MapFromValueCallback<TSource, TResult> | TResult, otherwise: MapFromValueCallback<TAnythingAtAll, TResult> | TResult, thisObj?: any): TResult;
    /**
     * Determesin whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    function notDefined(obj?: TDefined): obj is undefined;
    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    function isNil(obj?: TDefined): obj is null | undefined;
    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    function isNull(obj?: TDefined): obj is null | undefined;
    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    function isString(obj?: TDefined): obj is string;
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    function isStringIfDef(obj?: TDefined): obj is string | undefined;
    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    function isStringOrNull(obj?: TDefined): obj is string | null;
    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    function isStringOrNil(obj?: TDefined): obj is string | null | undefined;
    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    function isEmptyString(obj?: TDefined): obj is string;
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    function isEmptyStringIfDef(obj?: TDefined): obj is string | undefined;
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    function isEmptyStringOrNull(obj?: TDefined): obj is string | null;
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    function isEmptyStringOrNil(obj?: TDefined): obj is string | null | undefined;
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    function isEmptyOrWhitespace(obj?: TDefined): obj is string;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    function isEmptyOrWhitespaceIfDef(obj?: TDefined): obj is string | undefined;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    function isNullOrWhitespace(obj?: TDefined): obj is string | null;
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    function isNilOrWhitespace(obj?: TDefined): obj is string | null | undefined;
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    function asString(obj?: TDefined, defaultValue?: string | null, ifWhitespace?: boolean): string | null | undefined;
    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    function toString(obj?: TDefined, defaultValue?: string | null, ifWhitespace?: boolean): string;
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
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    function isBoolean(obj?: TDefined): obj is boolean;
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    function isBooleanIfDef(obj?: TDefined): obj is boolean | undefined;
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    function isBooleanOrNull(obj?: TDefined): obj is boolean | null;
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    function isBooleanOrNil(obj?: TDefined): obj is boolean | null | undefined;
    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    function asBoolean(obj?: TDefined, defaultValue?: boolean | null): boolean | null | undefined;
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    function toBoolean(obj?: TDefined, defaultValue?: boolean): boolean;
    /**
     * Determines whether a value is a finite number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number; otherwise false.
     */
    function isNumber(obj?: TDefined): obj is number;
    /**
     * Determines whether a value is a finite number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is finite number or undefined; otherwise false.
     */
    function isNumberIfDef(obj?: TDefined): obj is number | undefined;
    /**
     * Determines whether a value is a finite number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number or null; otherwise false.
     */
    function isNumberOrNull(obj?: TDefined): obj is number | null;
    /**
     * Determines whether a value is a number or null (including NaN and Infinity).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a number or null; otherwise false.
     */
    function isNumberNaNorNull(obj?: TDefined): obj is number | null;
    /**
     * Determines whether a value is a finite number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number, null or undefined; otherwise false.
     */
    function isNumberOrNil(obj?: TDefined): obj is number | null | undefined;
    /**
     * Determines whether a value is an infinite number.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an infinite number; otherwise false.
     */
    function isInfinite(obj?: TDefined): obj is number;
    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    function asNumber(obj?: TDefined, defaultValue?: number | null): number | null | undefined;
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
     */
    function toNumber(obj?: TDefined, defaultValue?: number | null): number;
    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    function isFunction(obj?: TDefined): obj is Function;
    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    function isFunctionIfDef(obj?: TDefined): obj is Function | undefined;
    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    function isFunctionOrNull(obj?: TDefined): obj is Function | null;
    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    function isFunctionOrNil(obj?: TDefined): obj is Function | null | undefined;
    /**
     * Determines whether a value's type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
     */
    function isObjectType(obj?: TDefined): obj is object;
    /**
     * Determines whether a value is undefined or its type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
     */
    function isObjectTypeIfDef(obj?: TDefined): obj is object | undefined;
    /**
     * Determines whether a value is null or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
     */
    function isObjectTypeOrNull(obj?: TDefined): obj is object | null;
    /**
     * Determines whether a value is undefined, null, or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
     */
    function isObjectTypeOrNil(obj?: TDefined): obj is object | null | undefined;
    /**
     * Determines whether a value is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    function isObject(obj?: TDefined): obj is IStringKeyedObject;
    /**
     * Determines whether a value undefined or it is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    function isObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
    /**
     * Determines whether a value null or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value null or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    function isObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
    /**
     * Determines whether a value undefined, null, or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    function isObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isPlainObject().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    function isNonArrayObject(obj?: TDefined): obj is IStringKeyedObject;
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    function isNonArrayObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    function isNonArrayObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    function isNonArrayObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    function isPlainObject(obj?: TDefined): obj is IStringKeyedObject;
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    function isPlainObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    function isPlainObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    function isPlainObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    function isArray(obj?: TDefined): obj is TAnythingAtAll[];
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    function isArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[] | undefined;
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    function isArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[] | null;
    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    function isArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[] | null;
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    function isEmptyArray(obj?: TDefined): obj is TAnythingAtAll[];
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    function isEmptyArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[] | undefined;
    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    function isEmptyArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[] | null;
    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    function isEmptyArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[] | null;
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} checkElements If true, then the existance of each element index is checked, which makes this function slower, but more accurate.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     * @see {@link https://github.com/Microsoft/TypeScript/blob/530d7e9358ee95d2101a619e73356867b617cd95/lib/lib.es5.d.ts}
     */
    function isArrayLike(obj?: TDefined, checkElements?: boolean): obj is ArrayLike<TAnythingAtAll>;
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    function isArrayLikeIfDef(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | undefined;
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    function isArrayLikeOrNull(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | null;
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    function isArrayLikeOrNil(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | null | undefined;
    /**
     * Ensures that a value is a true array.
     * @param {*} obj Value to convert.
     * @param {boolan} checkElements If true and obj is Array-like (but not a true array), then the existance of each element index is checked, which makes this function more accurate, but slower.
     * @returns {*[]} Value as an array.
     * @description If the value is undefined, an empty array is returned.
     * If the value is an actual array, then the object itself is returned;
     * If the object is Array-like, an array is returned with values taken from each of its indexed values.
     * Otherwise, an array with a single element containing the value is returned.
     */
    function toArray(obj?: TDefined, checkElements?: boolean): TAnythingAtAll[];
    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    function derivesFrom<T>(obj?: TDefined, classConstructor?: {
        new (...args: TAnythingAtAll[]): T;
    }): obj is T;
    /**
     * If defined, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromIfDef<T>(obj?: TDefined, classConstructor?: {
        new (...args: TAnythingAtAll[]): T;
    }): obj is T | undefined;
    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNull<T>(obj?: TDefined, classConstructor?: {
        new (...args: TAnythingAtAll[]): T;
    }): obj is T | null;
    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    function derivesFromOrNil<T>(obj?: TDefined, classConstructor?: {
        new (...args: TAnythingAtAll[]): T;
    }): obj is T | null;
    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    function isErrorLike(obj?: TDefined): obj is ErrorLike;
    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {ErrorLike|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    function asErrorLike(obj?: TDefined): ErrorLike | null | undefined;
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
    interface RecursiveMapCallbackFn {
        (current: TAnythingAtAll, key: number | string | undefined, source: TAnythingAtAll[] | IStringKeyedObject | undefined, target: TAnythingAtAll[] | IStringKeyedObject | undefined): TAnythingAtAll;
    }
    /**
     * Represents options for the JsTypeCommander.mapInto function.
     */
    interface MapIntoOptions {
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
    function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any;
}
