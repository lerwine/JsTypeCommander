/** Alias for a type that is defined */
export declare type TDefined = any | null;
/** Alias for a type that can be either defined or undefined. */
export declare type TAnythingAtAll = any | null | undefined;
/** Represents a plain object */
export interface IStringKeyedObject {
    [key: string]: TAnythingAtAll;
}
/** Represents an object which contains both named properties and indexed elements. */
export interface IComplexObject extends IStringKeyedObject, ArrayLike<TAnythingAtAll> {
    readonly length: number;
    readonly [n: number]: TAnythingAtAll;
    readonly [key: string]: TAnythingAtAll;
}
/** Represents an object which contains properties in common with Error objects. */
export interface ErrorMessageLike {
    message: string;
    name?: string;
    stack?: string;
}
/**
 * Function to get mapped value according to a source value.
 * @param {*} value Source value.
 * @returns {*} Mapped value.
 */
export interface MapFromValueCallback<TSource, TResult> {
    (value: TSource): TResult;
}
export declare type ObjectTypeString = "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";
export interface TypeGateCallbacks<TSource, TResult> {
    whenBoolean?: MapFromValueCallback<boolean, TResult> | TResult;
    whenFunction?: MapFromValueCallback<Function, TResult> | TResult;
    whenNumber?: MapFromValueCallback<number, TResult> | TResult;
    whenInfinity?: MapFromValueCallback<number, TResult> | TResult;
    whenNaN?: MapFromValueCallback<number, TResult> | TResult;
    whenObject?: MapFromValueCallback<IStringKeyedObject, TResult> | TResult;
    whenArray?: MapFromValueCallback<TAnythingAtAll[], TResult> | TResult;
    whenArrayLike?: MapFromValueCallback<ArrayLike<TAnythingAtAll>, TResult> | TResult;
    whenNotArrayLike?: MapFromValueCallback<IStringKeyedObject, TResult> | TResult;
    whenString?: MapFromValueCallback<string, TResult> | TResult;
    whenSymbol?: MapFromValueCallback<symbol, TResult> | TResult;
    whenNull?: MapFromValueCallback<null, TResult> | TResult;
    whenUndefined?: MapFromValueCallback<undefined, TResult> | TResult;
    otherwise: MapFromValueCallback<TSource, TResult> | TResult;
}
export declare function mapByTypeValue<TSource, TResult>(target: TSource | null | undefined, callbacks: TypeGateCallbacks<TSource | null | undefined, TResult>, simpleCheck?: boolean): TResult;
/**
 * Function to get mapped value according to a type string.
 * @param {"boolean"|"function"|"number"|"object"|"string"|"symbol"|"undefined"} type Object type.
 * @returns {*} Mapped value.
 */
export interface MapFromTypeCallback<TResult> {
    (type?: ObjectTypeString): TResult;
}
/**
 * Gets a mapped value according to whether the object is defined and optionally by target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined.
 * @param otherwise Function to call to get return value, or value to return, when target is undefined.
 * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
 */
export declare function mapByDefined<TResult>(target: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult> | TResult, otherwise: MapFromTypeCallback<TResult> | TResult): TResult;
/**
 * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is not undefined or is not null.
 * @param otherwise Function to call to get return value, or value to return, when target is null.
 * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
 */
export declare function mapByNotNull<TResult>(target: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult> | TResult, otherwise: MapFromTypeCallback<TResult> | TResult): TResult;
/**
 * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
 * @param target Value to test.
 * @param whenTrue Function to call to get return value according to target object type, or value to return, when target is defined and is not null.
 * @param otherwise Function to call to get return value, or value to return, when target is undefined or null.
 * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
 */
export declare function mapByNotNil<TResult>(obj: TAnythingAtAll, whenTrue: MapFromTypeCallback<TResult> | TResult, otherwise: MapFromTypeCallback<TResult> | TResult): TResult;
/**
 * Determesin whether an object is undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is undefined; otherwise, false.
 */
export declare function notDefined(obj?: TDefined): obj is undefined;
/**
 * Determines wether an object is undefined or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is undefined or null; otherwise, false.
 */
export declare function isNil(obj?: TDefined): obj is null | undefined;
/**
 * Determines whether an object is null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is null; otherwise false (not defined or not null).
 */
export declare function isNull(obj?: TDefined): obj is null | undefined;
/**
 * Determines whether a value is a string.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string; otherwise false.
 */
export declare function isString(obj?: TDefined): obj is string;
/**
 * Determines whether a value is a string or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string or undefined; otherwise false.
 */
export declare function isStringIfDef(obj?: TDefined): obj is string | undefined;
/**
 * Determines whether a value is a string or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string or null; otherwise false.
 */
export declare function isStringOrNull(obj?: TDefined): obj is string | null;
/**
 * Determines whether a value is a string, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a string, null or undefined; otherwise false.
 */
export declare function isStringOrNil(obj?: TDefined): obj is string | null | undefined;
/**
 * Determines whether a value is an empty string.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string; otherwise false.
 */
export declare function isEmptyString(obj?: TDefined): obj is string;
/**
 * Determines whether a value is an empty string or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string undefined; otherwise false.
 */
export declare function isEmptyStringIfDef(obj?: TDefined): obj is string | undefined;
/**
 * Determines whether a value is a empty string or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string or null; otherwise false.
 */
export declare function isEmptyStringOrNull(obj?: TDefined): obj is string | null;
/**
 * Determines whether a value is an empty string, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
 */
export declare function isEmptyStringOrNil(obj?: TDefined): obj is string | null | undefined;
/**
 * Determines whether a value is an empty string or contains only whitespace characters.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
 */
export declare function isEmptyOrWhitespace(obj?: TDefined): obj is string;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
 */
export declare function isEmptyOrWhitespaceIfDef(obj?: TDefined): obj is string | undefined;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
 */
export declare function isNullOrWhitespace(obj?: TDefined): obj is string | null;
/**
 * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
 */
export declare function isNilOrWhitespace(obj?: TDefined): obj is string | null | undefined;
/**
 * Converts a value to a string.
 * @param {*} obj Object to convert.
 * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
 * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
 * @returns {string|null|undefined} Value converted to a string or the default value.
 */
export declare function toString(obj?: TDefined, defaultValue?: string | null, ifWhitespace?: boolean): string | null | undefined;
/**
 * Forces a value to a string.
 * @param {*} obj Object to convert.
 * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
 * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
 * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
 */
export declare function asString(obj?: TDefined, defaultValue?: string | null, ifWhitespace?: boolean): string;
/**
 * Trims leading whitespace from text.
 * @param text Text to trim.
 * @returns {string} Text with leading whitespace removed.
 */
export declare function trimStart(text: string): string;
/**
 * Trims trailing whitespace from text.
 * @param text Text to trim.
 * @returns {string} Text with trailing whitespace removed.
 */
export declare function trimEnd(text: string): string;
/**
 * Normalizes whitespace in text.
 * @param text Text to trim.
 * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
 */
export declare function asNormalizedWs(text: string): string;
/**
 * Capitalizes first letter in text.
 * @param {string} text Text to capitalize.
 * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
 */
export declare function ucFirst(text: string): string;
/**
 * Splits text by line separator character sequences.
 * @param {string} text Text to split.
 * @returns {string[]} Array containing individual lines of text.
 */
export declare function splitLines(text: string): string[];
/**
 * Indents lines within text and trims trailing whitespace.
 * @param {string|string[]} text Text to indent.
 * @param {string} indent Characters to use for indentation.
 * @returns {string} Text with lines indented.
 */
export declare function indentText(text: string | string[], indent?: string): string;
/**
 * Indents lines of text and trim trailing whitespace.
 * @param {string[]|string} text Text to indent.
 * @param {string} indent Characters to use for indentation.
 * @returns {string} Array containing indented lines.
 */
export declare function indentLines(text: string[] | string, indent?: string): string[];
/**
 * Determines whether a value is boolean.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean; otherwise false.
 */
export declare function isBoolean(obj?: TDefined): obj is boolean;
/**
 * Determines whether a value is boolean or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean or undefined; otherwise false.
 */
export declare function isBooleanIfDef(obj?: TDefined): obj is boolean | undefined;
/**
 * Determines whether a value is boolean or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean or null; otherwise false.
 */
export declare function isBooleanOrNull(obj?: TDefined): obj is boolean | null;
/**
 * Determines whether a value is boolean, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
 */
export declare function isBooleanOrNil(obj?: TDefined): obj is boolean | null | undefined;
/**
 * Converts a value to a boolean.
 * @param {*} obj Object to convert.
 * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
 * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
 */
export declare function toBoolean(obj?: TDefined, defaultValue?: boolean | null): boolean | null | undefined;
/**
 * Forces a value to a boolean.
 * @param {*} obj Object to convert.
 * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
 * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
 */
export declare function asBoolean(obj?: TDefined, defaultValue?: boolean): boolean;
/**
 * Determines whether a value is a number (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number; otherwise false.
 */
export declare function isNumber(obj?: TDefined): obj is number;
/**
 * Determines whether a value is number or undefined (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or undefined; otherwise false.
 */
export declare function isNumberIfDef(obj?: TDefined): obj is number | undefined;
/**
 * Determines whether a value is number or null (not including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or null; otherwise false.
 */
export declare function isNumberOrNull(obj?: TDefined): obj is number | null;
/**
 * Determines whether a value is number or null (including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number or null; otherwise false.
 */
export declare function isNumberNaNorNull(obj?: TDefined): obj is number | null;
/**
 * Determines whether a value is number, null or undefined (including NaN).
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is number, null or undefined; otherwise false.
 */
export declare function isNumberOrNil(obj?: TDefined): obj is number | null | undefined;
/**
 * Converts a value to a number.
 * @param {*} obj Object to convert.
 * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
 * @returns {number|null|undefined} Value converted to a number or the default value.
 */
export declare function toNumber(obj?: TDefined, defaultValue?: number | null): number | null | undefined;
/**
 * Forces a value to a number.
 * @param {*} obj Object to convert.
 * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
 * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zer0 value will be returned.
 */
export declare function asNumber(obj?: TDefined, defaultValue?: number | null): number;
/**
 * Determines whether a value is a function.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function; otherwise false.
 */
export declare function isFunction(obj?: TDefined): obj is Function;
/**
 * Determines whether a value is function or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function or undefined; otherwise false.
 */
export declare function isFunctionIfDef(obj?: TDefined): obj is Function | undefined;
/**
 * Determines whether a value is function or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function or null; otherwise false.
 */
export declare function isFunctionOrNull(obj?: TDefined): obj is Function | null;
/**
 * Determines whether a value is function, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is function, null or undefined; otherwise false.
 */
export declare function isFunctionOrNil(obj?: TDefined): obj is Function | null | undefined;
/**
 * Determines whether a value's type is "object" and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
 */
export declare function isObjectType(obj?: TDefined): obj is object;
/**
 * Determines whether a value is undefined or its type is "object" and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
 */
export declare function isObjectTypeIfDef(obj?: TDefined): obj is object | undefined;
/**
 * Determines whether a value is null or its type is "object".
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
 */
export declare function isObjectTypeOrNull(obj?: TDefined): obj is object | null;
/**
 * Determines whether a value is undefined, null, or its type is "object".
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
 */
export declare function isObjectTypeOrNil(obj?: TDefined): obj is object | null | undefined;
/**
 * Determines whether a value is an object and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value is an object and it is not null; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
export declare function isObject(obj?: TDefined): obj is IStringKeyedObject;
/**
 * Determines whether a value undefined or it is an object and it is not null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
export declare function isObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
/**
 * Determines whether a value null or it is an object.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value null or it is an object; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
export declare function isObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
/**
 * Determines whether a value undefined, null, or it is an object.
 * @param {*} obj Object to test.
 * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
 * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
 * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
 */
export declare function isObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
/**
 * Determines whether a value is an object, but not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type; otherwise false.
 * @description As a type guard, this behaves the same as isObject() and isPlainObject().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
export declare function isNonArrayObject(obj?: TDefined): obj is IStringKeyedObject;
/**
 * Determines whether a value is an object or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
export declare function isNonArrayObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
/**
 * Determines whether a value is an object or null, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or null; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
export declare function isNonArrayObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
/**
 * Determines whether a value is an object, null or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
 * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
 */
export declare function isNonArrayObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
/**
 * Determines whether a value is an object, but not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type; otherwise false.
 * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
export declare function isPlainObject(obj?: TDefined): obj is IStringKeyedObject;
/**
 * Determines whether a value is an object or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
export declare function isPlainObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;
/**
 * Determines whether a value is an object or null, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type or null; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
export declare function isPlainObjectOrNull(obj?: TDefined): obj is IStringKeyedObject | null;
/**
 * Determines whether a value is an object, null or undefined, and not an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
 * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
 * The difference is that this returns false if the value is not constructed directly from Object.
 */
export declare function isPlainObjectOrNil(obj?: TDefined): obj is IStringKeyedObject | null | undefined;
/**
 * Determines whether a value is an array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array; otherwise false.
 */
export declare function isArray(obj?: TDefined): obj is TAnythingAtAll[];
/**
 * Determines whether a value is an array or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array or undefined; otherwise false.
 */
export declare function isArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[] | undefined;
/**
 * Determines whether a value is an array or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array or null; otherwise false.
 */
export declare function isArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[] | null;
/**
 * Determines whether a value is an array, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an array, null or undefined; otherwise false.
 */
export declare function isArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[] | null;
/**
 * Determines whether a value is an empty array.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array; otherwise false.
 */
export declare function isEmptyArray(obj?: TDefined): obj is TAnythingAtAll[];
/**
 * Determines whether a value is an empty array or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array or undefined; otherwise false.
 */
export declare function isEmptyArrayIfDef(obj?: TDefined): obj is TAnythingAtAll[] | undefined;
/**
 * Determines whether a value is an empty array or null.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array or null; otherwise false.
 */
export declare function isEmptyArrayOrNull(obj?: TDefined): obj is TAnythingAtAll[] | null;
/**
 * Determines whether a value is an empty array, null or undefined.
 * @param {*} obj Object to test.
 * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
 */
export declare function isEmptyArrayOrNil(obj?: TDefined): obj is TAnythingAtAll[] | null;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
export declare function isArrayLike(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll>;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
export declare function isArrayLikeifDef(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | undefined;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
export declare function isArrayLikeOrNull(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | null;
/**
 * Determines whether an object has properties which indiciates it behaves like an array.
 * @param {*} obj Object to test.
 * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
 * but can result in false positives for non-array objects which have a numeric "length" property.
 * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
 */
export declare function isArrayLikeOrNil(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<TAnythingAtAll> | null | undefined;
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
export declare function asArray(obj?: TDefined, simpleCheck?: boolean): TAnythingAtAll[];
/**
 * Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
 */
export declare function derivesFrom<T>(obj?: TDefined, classConstructor?: {
    new (...args: TAnythingAtAll[]): T;
}): obj is T;
/**
 * If defined, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
 */
export declare function derivesFromIfDef<T>(obj?: TDefined, classConstructor?: {
    new (...args: TAnythingAtAll[]): T;
}): obj is T | undefined;
/**
 * If not null, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
 */
export declare function derivesFromOrNull<T>(obj?: TDefined, classConstructor?: {
    new (...args: TAnythingAtAll[]): T;
}): obj is T | null;
/**
 * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
 * @param value Value to test.
 * @param {AnyFunction} classConstructor Constructor function to look for.
 * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
 */
export declare function derivesFromOrNil<T>(obj?: TDefined, classConstructor?: {
    new (...args: TAnythingAtAll[]): T;
}): obj is T | null;
/**
 * Determines if an object has properties similar to an Error object.
 * @param {*} obj Value to test
 * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
 */
export declare function isErrorLike(obj?: TDefined): obj is ErrorMessageLike | Error;
/**
 * Creates an object with properties similar to an Error object.
 * @param {*} obj Object to convert.
 * @returns {{ message: string, name?: string, stack?: string}|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
 * @description This can be useful for serializing error objects when logging.
 */
export declare function toErrorLike(obj?: TDefined): ErrorMessageLike | null | undefined;
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
    (current: TAnythingAtAll, key: number | string | undefined, source: TAnythingAtAll[] | IStringKeyedObject | undefined, target: TAnythingAtAll[] | IStringKeyedObject | undefined): TAnythingAtAll;
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
export declare function mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any;
export declare class ExampleArrayLike implements ArrayLike<string> {
    [n: number]: string;
    length: number;
    [0]: string;
    [1]: string;
    [2]: string;
}
