# JsTypeCommander #

Validate, detect and convert JavaScript types and classes.

## Summary ##

Contains functions for checking and converting many JavaScript types, with many functions being able to serve as TypeScript type guards.

> ### NOTE ###
> This is being prepared to be usable as an npm module, but documentation is not yet fully complete.
> In the meantime, you can refer to dist/JsTypeCommander.d.ts for more complete function documentation.

## Usage ##

### Importing ###

#### JavaScript ####

`var JsTypeCommander = require("JsTypeCommander");`

#### TypeScript ####

`import { JsTypeCommander } from '../dist/JsTypeCommander';`

### getDefaultLineSeparatorSequence ##

** getDefaultLineSeparatorSequence(): string
Gets the default character sequence that will be used when joining lines of text.

`let newLine: string = getDefaultLineSeparatorSequence();`

### getPatternOptions() ##

** getPatternOptions(): IJsTypeCommanderRegex
Gets regular expression patterns used internally by this module.

```TypeScript
let patternOptions: IJsTypeCommanderRegex = JsTypeCommander.getPatternOptions();
console.log("Pattern which matches one or more consecutive whitespace characters:\n\t" +
    patternOptions.onlyWhitespace.toString());
console.log("Pattern which captures text from the first non-whitespace character to the end of the string in group index 1 or fails if there are no non-whitespace characters:\n\t" +
    patternOptions.trimStart.toString());
console.log("Pattern which captures text in group at index 1, omitting trailing whitespace characters, or fails if there are no non-whitespace characters:\n\t" +
    patternOptions.trimEnd.toString());
console.log("Pattern which matches a single character sequence which separates 2 lines of text:\n\t" +
    patternOptions.lineSeparator.toString());
console.log("Pattern which captures text that can represent a boolean value, with true values being a successful match at group index 1, and false values being a successful match at group index 2:\n\t" +
    patternOptions.booleanText.toString());
console.log("Pattern which captures text that can be used for capitalizing text:\n\t" +
    patternOptions.firstLetterLc.toString());
console.log("Note:\n\t@description The group at index 1 captures all leading text which is not a letter or digit, and will fail if there are no such leading characters.");
console.log("    The group at index 1 captures the first letter to be capitalized, and will never fail unless the whole pattern fails.");
console.log("    The group at index 2 captures remaining text following the capitalized letter, and will fail if there are no remaining characters.");
console.log("    If there are no letter characters or if the first letter is already capitalized, then the entire match will fail.");
console.log("Pattern which matches consecutive whitespace characters except for single space (' ') characters that are not next to other whitespace characters:\n\t" +
    patternOptions.abnormalWhitespace.toString());
```

### setPatternOptions ##

** setPatternOptions(settings?: IJsTypeCommanderRegex): IJsTypeCommanderRegex

Sets regular expression pattern options used internally by this module.

Undefined properties will not be changed. If this parameter is not defined, then the default pattern options will be restored.

```TypeScript
// Object whose properties contain regular expression patterns used internally by this module.
let patternOptions: JsTypeCommander.IJsTypeCommanderRegex = { firstLetterLc: /^([\s\r\n]+)?([a-z]+)((?:.|\r\n0)*)/ };
patternOptions = JsTypeCommander.setPatternOptions(patternOptions);
// returns IJsTypeCommanderRegex object whose properties contain regular expression patterns now being used internally by this module.
```

### setDefaultLineSeparatorSequence ###

** setDefaultLineSeparatorSequence(s?: string): string;

Sets the default character sequence that will be used when joining lines of text.

```TypeScript
// Set default character sequence to use when joining lines of text. If this parameter is not defined, then the default character sequence will be restored.
let s: string = "\r\n";
JsTypeCommander.setDefaultLineSeparatorSequence(s);
// Restore the default character sequence;
let newLline = JsTypeCommander.setDefaultLineSeparatorSequence();
// Returns the the default character sequence that will be used when joining lines of text.
```

### mapByTypeValue ###

** mapByTypeValue&lt;TSource, TResult>(target: Nilable&lt;TSource>, callbacks: TypeGuardResultSpecs&lt;Nilable&lt;TSource>, TResult>, checkElements?: boolean): TResult;

Maps a source value to a new value based upon the source value's type.

```TypeScript
// Simple type mapping to a number.
let n: number = JsTypeCommander.mapByTypeValue&lt;any|undefined, number>(myVar, {
    whenBoolean: 1,
    whenNumber: 2,
    whenNull: 0,
    whenUndefined: -1,
    otherwise: -2
});
// Returns number value according to type of myVar.

// Type mapping using callbacks and use more thorough checks for array-like objects.
n = JsTypeCommander.mapByTypeValue&lt;any|undefined, number>(myVar, {
    whenBoolean: (b: boolean) => (b) ? 1 : 0,
    whenNumber: (v: number) => Math.abs(v),
    whenInfinity: 0,
    whenNaN: 0,
    whenArrayLike: (a: ArrayLike&lt;AnyNilable>) => a.length,
    whenNull: 0,
    whenUndefined: -1,
    otherwise: -2
}, true);
// Returns number value or result of callback according to type of myVar.
```

### mapByDefined ###

** mapByDefined&lt;TSource, TResult>(target: TSource | undefined, whenTrue: MapFromValueCallback&lt;TSource, TResult> | TResult, otherwise: { (): TResult; } | TResult, thisObj?: any): TResult;

Gets a mapped value according to whether the object is defined and optionally by target object type.

When target type is not "undefined", the second argument determines the return value, which can either be an actual result value or a function that takes the defined value and returns the result value.

When the the target type is "Undefined", then the third argument determines the return value, which can either be an actual result value or a function that returns the result value.

```TypeScript
let b: boolean = JsTypeCommander.mapByDefined&lt;any, boolean>(myVar, (d: any) => d === null, false);
```

### mapByNotNull ###

** mapByNotNull&lt;TSource, TResult>(target: TSource, whenTrue: MapFromValueCallback&lt;TSource, TResult> | TResult, otherwise: { (): TResult; } | TResult, thisObj?: any): TResult;

Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.

```TypeScript
let s: string = JsTypeCommander.mapByNotNull&lt;any, string>(myVar, (d: any) => (typeof(d) === "undefined") ? "undefined" : d.toString(), "It is null!");
```

### mapByNotNil ###

** mapByNotNil&lt;TSource, TResult>(target: TSource | undefined, whenTrue: MapFromValueCallback&lt;TSource, TResult> | TResult, otherwise: MapFromValueCallback&lt;AnyNilable, TResult> | TResult, thisObj?: any): TResult;

Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.

```TypeScript
let s: string = JsTypeCommander.mapByNotNil&lt;any, string>(myVar, (d: any) => d.toString(), "It is null or undefined!");
```

### notDefined ###

** notDefined(obj?: TDefined): obj is undefined;

Determines whether an object is undefined.

```TypeScript
if (JsTypeCommander.notDefined(myVar)) {
    // handle undefined value
} else {
    // handle defined value
}
```

### isNull ###

** isNull(obj?: TDefined): obj is null;

Determines whether an object is null.

```TypeScript
if (JsTypeCommander.isNull(myVar)) {
    // handle null value
} else {
    // handle undefined or non-null value
}
```

### isNil ###

** isNil(obj?: TDefined): obj is null | undefined;

Determines wether an object is undefined or null.

```TypeScript
if (JsTypeCommander.isNil(myVar)) {
    // handle null or undefined value
} else {
    // handle defined value
}
```

### isString ###

** isString(obj?: TDefined): obj is string;

Determines whether a value is a string.

```TypeScript
if (JsTypeCommander.isString(myVar)) {
    // handle string value
} else {
    // handle non-string value
}
```

### isStringOrNull ###

** isStringOrNull(obj?: TDefined): obj is Nullable&lt;string>;

Determines whether a value is a string or null.

```TypeScript
if (JsTypeCommander.isStringOrNull(myVar)) {
    // handle string or null value
} else {
    // handle non-string, non-null value
}
```

### isStringIfDef ###

** isStringIfDef(obj?: TDefined): obj is string | undefined;

Determines whether a value is a string or undefined.

```TypeScript
if (JsTypeCommander.isStringIfDef(myVar)) {
    // handle string or undefined value
} else {
    // handle non-string, defined value
}
```

### isStringOrNil ###

** isStringOrNil(obj?: TDefined): obj is Nilable&lt;string>;

Determines whether a value is a string, null or undefined.

```TypeScript
if (JsTypeCommander.isStringOrNil(myVar)) {
    // handle string, null or undefined value
} else {
    // handle non-string, non-null, defined value
}
```

### isEmptyString ###

** isEmptyString(obj?: TDefined): obj is string;

Determines whether a value is an empty string.

```TypeScript
if (JsTypeCommander.isEmptyString(myVar)) {
    // handle empty string
} else {
    // handle non-empty string, non-string value
}
```

### isEmptyStringIfDef ###

** isEmptyStringIfDef(obj?: TDefined): obj is string | undefined;

Determines whether a value is an empty string or undefined.

```TypeScript
if (JsTypeCommander.isEmptyStringIfDef(myVar)) {
    // handle empty string or undefined value
} else {
    // handle non-empty string, non-string value
}
```

### isEmptyStringOrNull ###

** isEmptyStringOrNull(obj?: TDefined): obj is Nullable&lt;string>;

Determines whether a value is a empty string or null.

```TypeScript
if (JsTypeCommander.isEmptyStringOrNull(myVar)) {
    // handle empty string or null value
} else {
    // handle non-empty string, non-string value
}
```

### isEmptyStringOrNil ###

** isEmptyStringOrNil(obj?: TDefined): obj is Nilable&lt;string>;

Determines whether a value is an empty string, null or undefined.

```TypeScript
if (JsTypeCommander.isEmptyStringOrNil(myVar)) {
    // handle empty string, null or undefined value
} else {
    // handle non-empty string, non-string value
}
```

### isEmptyOrWhitespace ###

** isEmptyOrWhitespace(obj?: TDefined): obj is string;

Determines whether a value is an empty string or contains only whitespace characters.

```TypeScript
if (JsTypeCommander.isEmptyOrWhitespace(myVar)) {
    // handle empty string or whitespace-only string
} else {
    // handle string with at least one non-whitespace charactor or non-string value
}
```

### isEmptyOrWhitespaceIfDef ###

** isEmptyOrWhitespaceIfDef(obj?: TDefined): obj is string | undefined;

Determines whether a value is an empty string, contains only whitespace characters, or is undefined.

```TypeScript
if (JsTypeCommander.isEmptyOrWhitespaceIfDef(myVar)) {
    // handle empty string, whitespace-only string, or undefined value
} else {
    // handle string with at least one non-whitespace charactor or non-string value
}
```

### isNullOrWhitespace ###

** isNullOrWhitespace(obj?: TDefined): obj is Nullable&lt;string>;

Determines whether a value is an empty string, contains only whitespace characters, or is null.

```TypeScript
if (JsTypeCommander.isNullOrWhitespace(myVar)) {
    // handle empty string, whitespace-only string, or null value
} else {
    // handle string with at least one non-whitespace charactor or non-string value
}
```

### isNilOrWhitespace ###

** isNilOrWhitespace(obj?: TDefined): obj is Nilable&lt;string>;

Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.

```TypeScript
if (JsTypeCommander.isNilOrWhitespace(myVar)) {
    // handle empty string, whitespace-only string, null, or undefined value
} else {
    // handle string with at least one non-whitespace charactor or non-string value
}
```

### asString ###

** asString(obj?: TDefined, defaultValue?: Nullable&lt;string>, ifWhitespace?: boolean): Nilable&lt;string>;

Converts a value to a string.

### toString ###

** toString(obj?: TDefined, defaultValue?: Nullable&lt;string>, ifWhitespace?: boolean): string;

Forces a value to a string.

### trimStart ###

** trimStart(text: string): string;

Trims leading whitespace from text.

### trimEnd ###

** trimEnd(text: string): string;

Trims trailing whitespace from text.

### asNormalizedWs ###

** asNormalizedWs(text: string): string;

Normalizes whitespace in text.

### ucFirst ###

** ucFirst(text: string): string;

Capitalizes first letter in text.

### splitLines ###

** splitLines(text: string): string[];

Splits text by line separator character sequences.

### indentText ###

** indentText(text: string | string[], indent?: string): string;

Indents lines within text and trims trailing whitespace.

### indentLines ###

** indentLines(text: string[] | string, indent?: string): string[];

Indents lines of text and trim trailing whitespace.

### isBoolean ###

** isBoolean(obj?: TDefined): obj is boolean;

Determines whether a value is boolean.

```TypeScript
if (JsTypeCommander.isBoolean(myVar)) {
    // handle boolean value
} else {
    // handle non-boolean value
}
```

### isBooleanIfDef ###

** isBooleanIfDef(obj?: TDefined): obj is boolean | undefined;

Determines whether a value is boolean or undefined.

```TypeScript
if (JsTypeCommander.isBooleanIfDef(myVar)) {
    // handle boolean, or undefined value
} else {
    // handle non-null, non-boolean value
}
```

### isBooleanOrNull ###

** isBooleanOrNull(obj?: TDefined): obj is Nullable&lt;boolean>;

Determines whether a value is boolean or null.

```TypeScript
if (JsTypeCommander.isBooleanOrNull(myVar)) {
    // handle boolean, or null value
} else {
    // handle non-null, non-boolean value
}
```

### isBooleanOrNil ###

** isBooleanOrNil(obj?: TDefined): obj is Nilable&lt;boolean>;

Determines whether a value is boolean, null or undefined.

```TypeScript
if (JsTypeCommander.isBooleanOrNil(myVar)) {
    // handle boolean, null, or undefined value
} else {
    // handle non-null, defined, non-boolean value
}
```

### asBoolean ###

** asBoolean(obj?: TDefined, defaultValue?: Nullable&lt;boolean>): Nilable&lt;boolean>;

Converts a value to a boolean.

### toBoolean ###

** toBoolean(obj?: TDefined, defaultValue?: Nullable&lt;boolean>): boolean;

Forces a value to a boolean.

### isNumber ###

** isNumber(obj?: TDefined): obj is number;

Determines whether a value is a finite number (not including NaN).

```TypeScript
if (JsTypeCommander.isNumber(myVar)) {
    // handle number value
} else {
    // handle NaN or non-number value
}
```

### isNumberIfDef ###

** isNumberIfDef(obj?: TDefined): obj is number | undefined;

Determines whether a value is a finite number or undefined (not including NaN).

```TypeScript
if (JsTypeCommander.isNumberIfDef(myVar)) {
    // handle number, or undefined value
} else {
    // handle non-null, NaN, or non-number value
}
```

### isNumberOrNull ###

** isNumberOrNull(obj?: TDefined): obj is Nullable&lt;number>;

Determines whether a value is a finite number or null (not including NaN).

```TypeScript
if (JsTypeCommander.isNumberOrNull(myVar)) {
    // handle number, or null value
} else {
    // handle non-null, NaN, non-number value
}
```

### isNumberNaNorNull ###

** isNumberNaNorNull(obj?: TDefined): obj is Nullable&lt;number>;

Determines whether a value is a number or null (including NaN and Infinity).

```TypeScript
if (JsTypeCommander.isNumberNaNorNull(myVar)) {
    // handle number, NaN or null value
} else {
    // handle non-null, non-number value
}
```

### isNumberOrNil ###

** isNumberOrNil(obj?: TDefined): obj is Nilable&lt;number>;

Determines whether a value is a finite number, null or undefined (including NaN and Infinity).

```TypeScript
if (JsTypeCommander.isNumberOrNil(myVar)) {
    // handle number, NaN, null, or undefined value
} else {
    // handle non-null, defined, non-number value
}
```

### isInfinite ###

** isInfinite(obj?: TDefined): obj is number;

Determines whether a value is an infinite number.

```TypeScript
if (JsTypeCommander.isInfinite(myVar)) {
    // handle infinite number value
} else {
    // handle finite number, NaN, or non-number value
}
```

### asNumber ###

** asNumber(obj?: TDefined, defaultValue?: Nullable&lt;number>, allowNaN?: boolean): Nilable&lt;number>;

Converts a value to a number.

### toNumber ###

** toNumber(obj?: TDefined, defaultValue?: Nullable&lt;number>, allowNaN?: boolean): number;

Forces a value to a number.

### isFunction ###

** isFunction(obj?: TDefined): obj is Function;

Determines whether a value is a function.

```TypeScript
if (JsTypeCommander.isFunction(myVar)) {
    // handle function value
} else {
    // handle non-function value
}
```

### isFunctionIfDef ###

** isFunctionIfDef(obj?: TDefined): obj is Function | undefined;

Determines whether a value is function or undefined.

```TypeScript
if (JsTypeCommander.isFunctionIfDef(myVar)) {
    // handle function, or undefined value
} else {
    // handle non-null, non-function value
}
```

### isFunctionOrNull ###

** isFunctionOrNull(obj?: TDefined): obj is Nullable&lt;Function>;

Determines whether a value is function or null.

```TypeScript
if (JsTypeCommander.isFunctionOrNull(myVar)) {
    // handle function or null value
} else {
    // handle non-null, non-function value
}
```

### isFunctionOrNil ###

** isFunctionOrNil(obj?: TDefined): obj is Nilable&lt;Function>;

Determines whether a value is function, null or undefined.

```TypeScript
if (JsTypeCommander.isFunctionOrNil(myVar)) {
    // handle function, null, or undefined value
} else {
    // handle non-null, defined, non-function value
}
```

### isObjectType ###

** isObjectType(obj?: TDefined): obj is object;

Determines whether a value's type is "object" and it is not null.

### isObjectTypeIfDef ###

** isObjectTypeIfDef(obj?: TDefined): obj is object | undefined;

Determines whether a value is undefined or its type is "object" and it is not null.

### isObjectTypeOrNull ###

** isObjectTypeOrNull(obj?: TDefined): obj is Nullable&lt;object>;

Determines whether a value is null or its type is "object".

### isObjectTypeOrNil ###

** isObjectTypeOrNil(obj?: TDefined): obj is Nilable&lt;object>;

Determines whether a value is undefined, null, or its type is "object".

### isObject ###

** isObject(obj?: TDefined): obj is IStringKeyedObject;

Determines whether a value is an object and it is not null.

### isObjectIfDef ###

** isObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;

Determines whether a value undefined or it is an object and it is not null.

### isObjectOrNull ###

** isObjectOrNull(obj?: TDefined): obj is Nullable&lt;IStringKeyedObject>;

Determines whether a value null or it is an object.

### isObjectOrNil ###

** isObjectOrNil(obj?: TDefined): obj is Nilable&lt;IStringKeyedObject>;

Determines whether a value undefined, null, or it is an object.

### isNonArrayObject ###

** isNonArrayObject(obj?: TDefined): obj is IStringKeyedObject;

Determines whether a value is an object, but not an array.

### isNonArrayObjectIfDef ###

** isNonArrayObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;

Determines whether a value is an object or undefined, and not an array.

### isNonArrayObjectOrNull ###

** isNonArrayObjectOrNull(obj?: TDefined): obj is Nullable&lt;IStringKeyedObject>;

Determines whether a value is an object or null, and not an array.

### isNonArrayObjectOrNil ###

** isNonArrayObjectOrNil(obj?: TDefined): obj is Nilable&lt;IStringKeyedObject>;

Determines whether a value is an object, null or undefined, and not an array.

### isPlainObject ###

** isPlainObject(obj?: TDefined): obj is IStringKeyedObject;

Determines whether a value is an object, but not an array.

### isPlainObjectIfDef ###

** isPlainObjectIfDef(obj?: TDefined): obj is IStringKeyedObject | undefined;

Determines whether a value is an object or undefined, and not an array.

### isPlainObjectOrNull ###

** isPlainObjectOrNull(obj?: TDefined): obj is Nullable&lt;IStringKeyedObject>;

Determines whether a value is an object or null, and not an array.

### isPlainObjectOrNil ###

** isPlainObjectOrNil(obj?: TDefined): obj is Nilable&lt;IStringKeyedObject>;

Determines whether a value is an object, null or undefined, and not an array.

### isArray ###

** isArray(obj?: TDefined): obj is AnyNilable[];

Determines whether a value is an array.

### isArrayIfDef ###

** isArrayIfDef(obj?: TDefined): obj is AnyNilable[] | undefined;

Determines whether a value is an array or undefined.

### isArrayOrNull ###

** isArrayOrNull(obj?: TDefined): obj is Nullable&lt;AnyNilable[]>;

Determines whether a value is an array or null.

### isArrayOrNil ###

** isArrayOrNil(obj?: TDefined): obj is Nilable&lt;AnyNilable[]>;

Determines whether a value is an array, null or undefined.

### isEmptyArray ###

** isEmptyArray(obj?: TDefined): obj is AnyNilable[];

Determines whether a value is an empty array.

### isEmptyArrayIfDef ###

** isEmptyArrayIfDef(obj?: TDefined): obj is AnyNilable[] | undefined;

Determines whether a value is an empty array or undefined.

### isEmptyArrayOrNull ###

** isEmptyArrayOrNull(obj?: TDefined): obj is Nullable&lt;AnyNilable[]>;

Determines whether a value is an empty array or null.

### isEmptyArrayOrNil ###

** isEmptyArrayOrNil(obj?: TDefined): obj is Nilable&lt;AnyNilable[]>;

Determines whether a value is an empty array, null or undefined.

### isArrayLike ###

** isArrayLike(obj?: TDefined, checkElements?: boolean): obj is ArrayLike&lt;AnyNilable>;

Determines whether an object has properties which indiciates it behaves like an array.

### isArrayLikeIfDef ###

** isArrayLikeIfDef(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike&lt;AnyNilable> | undefined;

Determines whether an object has properties which indiciates it behaves like an array.

### isArrayLikeOrNull ###

** isArrayLikeOrNull(obj?: TDefined, simpleCheck?: boolean): obj is Nullable&lt;ArrayLike&lt;AnyNilable>>;

Determines whether an object has properties which indiciates it behaves like an array.

### isArrayLikeOrNil ###

** isArrayLikeOrNil(obj?: TDefined, simpleCheck?: boolean): obj is Nilable&lt;ArrayLike&lt;AnyNilable>>;

Determines whether an object has properties which indiciates it behaves like an array.

### toArray ###

** toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[];

Ensures that a value is a true array.

### derivesFrom ###

** derivesFrom&lt;T>(obj?: TDefined, classConstructor?: { new (...args: AnyNilable[]): T; }): obj is T;

Searches the value's inherited prototype chain for a matching constructor function.

### derivesFromIfDef ###

** derivesFromIfDef&lt;T>(obj?: TDefined, classConstructor?: { new (...args: AnyNilable[]): T; }): obj is T | undefined;

If defined, Searches the value's inherited prototype chain for a matching constructor function.

### derivesFromOrNull ###

** derivesFromOrNull&lt;T>(obj?: TDefined, classConstructor?: { new (...args: AnyNilable[]): T; }): obj is Nullable&lt;T>;

If not null, Searches the value's inherited prototype chain for a matching constructor function.

### derivesFromOrNil ###

** derivesFromOrNil&lt;T>(obj?: TDefined, classConstructor?: { new (...args: AnyNilable[]): T; }): obj is Nilable&lt;T>;

If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.

### isErrorLike ###

** isErrorLike(obj?: TDefined): obj is ErrorLike;

Determines if an object has properties similar to an Error object.

### asErrorLike ###

** asErrorLike(obj?: TDefined): Nilable&lt;ErrorLike>;

Creates an object with properties similar to an Error object.

### mapInto ###

** mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any;

Recursively maps an object or array.