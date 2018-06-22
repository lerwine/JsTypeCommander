/// <reference types="mocha" />
import { JsTypeCommander } from '../dist/JsTypeCommander';
export declare class TestLengthProp {
    private _length;
    readonly length: number;
    constructor(n?: number);
}
export declare class TestArrayLike<T> extends TestLengthProp implements ArrayLike<T> {
    [key: number]: T;
    constructor(n?: number, ...value: (T | T[])[]);
}
export declare class AlmostArrayLike<T> extends TestArrayLike<T> {
    constructor(value: T | T[], ...otherValues: T[]);
}
export declare class TestErrorLike {
    message: string;
    readonly name: string;
}
export declare class TestErrorLike2 extends TestErrorLike {
    number: number;
    readonly name: string;
}
export declare class TestErrorLike3 extends TestErrorLike2 implements JsTypeCommander.ErrorLike {
    description?: string;
    fileName?: string;
    lineNumber?: number;
    stack?: string;
    readonly name: string;
}
export interface IFunctionDefinition {
    name: string;
    signature: string;
    callback: Function;
    expectations: (IExpectEquals | IExpectIs)[];
    _type: "FunctionDefinition";
}
export interface IArgSet {
    display: string;
    getArgs: {
        (): (any | null | undefined)[];
    };
    message?: string;
    _type: "ArgSet";
}
export interface IExpectEquals {
    display: string;
    getExpectedValue: {
        (): any | null | undefined;
    };
    argSets: IArgSet[];
    _type: "ExpectEquals";
}
export interface IExpectIs {
    display: string;
    expectedType: string;
    argSets: IArgSet[];
    _type: "ExpectIs";
}
export interface IExpectationSet {
    description?: string;
    expectations: (IExpectEquals | IExpectIs)[];
    functions: IFunctionDefinition[];
    getGenericArgs?: {
        (): (any | null | undefined)[];
    };
    _type: "ExpectationSet";
}
export interface IFunctionGroup {
    description?: string;
    expectations: (IExpectEquals | IExpectIs)[];
    sets: IExpectationSet[];
    _type: "FunctionGroup";
}
export interface IFunctionTypeGroup {
    type: string;
    expectations: (IExpectEquals | IExpectIs)[];
    groups: IFunctionGroup[];
    _type: "TypeGroup";
}
export declare function argSet(getArgs: {
    (): (any | null | undefined)[];
}, display: string, message?: string): IArgSet;
export declare function expectEqualTo(display: string, getExpectedValue: {
    (): any | null | undefined[];
}, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals;
export declare function expectIsA(type: string, argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectIs;
export declare function expectEqualToFalse(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals;
export declare function expectEqualToTrue(argSet: IArgSet, ...otherArgSets: IArgSet[]): IExpectEquals;
export declare function testFunction(callback: Function, name: string, signature: string, ...expectations: (IExpectEquals | IExpectIs)[]): IFunctionDefinition;
export declare function expectationDescription(description: string, content: IFunctionDefinition | IExpectEquals | IExpectIs, ...moreContents: (IFunctionDefinition | IExpectEquals | IExpectIs)[]): IExpectationSet;
export declare function expectationSet(content: IFunctionDefinition | IExpectEquals | IExpectIs, ...moreContents: (IFunctionDefinition | IExpectEquals | IExpectIs)[]): IExpectationSet;
export declare function functionGroup(description: string, content: IExpectationSet | IFunctionDefinition | IExpectEquals | IExpectIs, ...moreContents: (IExpectationSet | IFunctionDefinition | IExpectEquals | IExpectIs)[]): IFunctionGroup;
export declare function genericFunctionGroup(description: string, getGenericArgs: {
    (): (any | null | undefined)[];
}, content: IExpectationSet | IFunctionDefinition | IExpectEquals | IExpectIs, ...moreContents: (IExpectationSet | IFunctionDefinition | IExpectEquals | IExpectIs)[]): IFunctionGroup;
export declare function functionTypeGroup(type: string, content: IExpectationSet | IFunctionGroup | IFunctionDefinition | IExpectEquals | IExpectIs, ...moreContents: (IExpectationSet | IFunctionGroup | IFunctionDefinition | IExpectEquals | IExpectIs)[]): IFunctionTypeGroup;
export declare function describeTestFunction(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals | IExpectIs)[], funcDef: IFunctionDefinition, getGenericArgs?: {
    (): any | null | undefined;
}): void;
export declare function describeExpectationSet(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals | IExpectIs)[], expectationSet: IExpectationSet): void;
export declare function describeFunctionGroups(this: Mocha.ISuiteCallbackContext, expectations: (IExpectEquals | IExpectIs)[], functionGrp: IFunctionGroup): void;
export declare function describeFunctionTypeGroups(functionTypeGroups: IFunctionTypeGroup[]): void;
