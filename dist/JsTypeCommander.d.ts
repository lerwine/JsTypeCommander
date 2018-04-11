export declare namespace JsTypeCommander {
    type defined = any | null;
    type anyAtAll = any | null | undefined;
    interface ErrorMessageLike {
        message: string;
        name?: string;
        stack?: string;
    }
    interface IterateCallbackFn {
        (current: anyAtAll, key?: number | string): anyAtAll;
    }
    function isDefined(obj?: defined): obj is defined;
    function notDefined(obj?: defined): obj is undefined;
    function isNil(obj?: defined): obj is null | undefined;
    function isNull(obj?: defined): obj is null | undefined;
    function isString(obj?: defined): obj is string;
    function isStringIfDef(obj?: defined): obj is string | undefined;
    function isStringOrNull(obj?: defined): obj is string | null;
    function isStringOrNil(obj?: defined): obj is string | null | undefined;
    function isEmptyString(obj?: defined): obj is string;
    function isEmptyStringIfDef(obj?: defined): obj is string | undefined;
    function isEmptyStringOrNull(obj?: defined): obj is string | null;
    function isEmptyStringOrNil(obj?: defined): obj is string | null | undefined;
    function isEmptyOrWhitespace(obj?: defined): obj is string;
    function isEmptyOrWhitespaceIfDef(obj?: defined): obj is string | undefined;
    function isNullOrWhitespace(obj?: defined): obj is string | null;
    function isNilOrWhitespace(obj?: defined): obj is string | null | undefined;
    function toString(obj?: defined, defaultValue?: string | null, ifWhitespace?: boolean): string | null | undefined;
    function asString(obj?: defined, defaultValue?: string | null, ifWhitespace?: boolean): string;
    function isBoolean(obj?: defined): obj is boolean;
    function isBooleanIfDef(obj?: defined): obj is boolean | undefined;
    function isBooleanOrNull(obj?: defined): obj is boolean | null;
    function isBooleanOrNil(obj?: defined): obj is boolean | null | undefined;
    function toBoolean(obj?: defined, defaultValue?: boolean | null): boolean | null | undefined;
    function asBoolean(obj?: defined, defaultValue?: boolean): boolean;
    function isNumber(obj?: defined): obj is number;
    function isNumberIfDef(obj?: defined): obj is number | undefined;
    function isNumberOrNull(obj?: defined): obj is number | null;
    function isNumberNaNorNull(obj?: defined): obj is number | null;
    function isNumberOrNil(obj?: defined): obj is number | null | undefined;
    function toNumber(obj?: defined, defaultValue?: number | null): number | null | undefined;
    function asNumber(obj?: defined, defaultValue?: number | null): number;
    function isFunction(obj?: defined): obj is Function;
    function isFunctionIfDef(obj?: defined): obj is Function | undefined;
    function isFunctionOrNull(obj?: defined): obj is Function | null;
    function isFunctionOrNil(obj?: defined): obj is Function | null | undefined;
    function isObject(obj?: defined): obj is object;
    function isObjectIfDef(obj?: defined): obj is object | undefined;
    function isObjectOrNull(obj?: defined): obj is object | null;
    function isObjectOrNil(obj?: defined): obj is object | null | undefined;
    function isPlainObject(obj?: defined): obj is {
        [key: string]: any;
    };
    function isPlainObjectIfDef(obj?: defined): obj is {
        [key: string]: any;
    } | undefined;
    function isPlainObjectOrNull(obj?: defined): obj is {
        [key: string]: any;
    } | null;
    function isPlainObjectOrNil(obj?: defined): obj is {
        [key: string]: any;
    } | null | undefined;
    function isArray(obj?: defined): obj is anyAtAll[];
    function isArrayIfDef(obj?: defined): obj is anyAtAll[] | undefined;
    function isArrayOrNull(obj?: defined): obj is anyAtAll[] | null;
    function isArrayOrNil(obj?: defined): obj is anyAtAll[] | null;
    function isEmptyArray(obj?: defined): obj is anyAtAll[];
    function isEmptyArrayIfDef(obj?: defined): obj is anyAtAll[] | undefined;
    function isEmptyArrayOrNull(obj?: defined): obj is anyAtAll[] | null;
    function isEmptyArrayOrNil(obj?: defined): obj is anyAtAll[] | null;
    function asArray(obj?: defined): anyAtAll[];
    function derivesFrom<T>(obj?: defined, classConstructor?: Function): obj is T;
    function derivesFromIfDef<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | undefined;
    function derivesFromOrNull<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | null;
    function derivesFromOrNil<T>(obj?: defined, classConstructor?: {
        new (...args: anyAtAll[]): T;
    }): obj is T | null;
    function isErrorLike(obj?: defined): obj is ErrorMessageLike | Error;
    function toErrorLike(obj?: defined): ErrorMessageLike | null | undefined;
    function trimStart(text: string): string;
    function trimEnd(text: string): string;
    function asNormalizedWs(text: string): string;
    function ucFirst(text: string): string;
    function splitLines(text: string): string[];
    function indentText(text: string | string[], indent?: string): string;
    function indentLines(text: string[] | string, indent?: string): string[];
    function MapInto(obj: any, callbackfn: IterateCallbackFn, options?: {
        thisObj?: any;
        totalMaxItems?: number;
        maxItemsInArray?: number;
        maxDepth?: number;
    }): any;
}
