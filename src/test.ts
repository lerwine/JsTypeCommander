import { expect } from 'chai';
import { assert } from 'chai';
//import * as JsTypeCommander from './dist/JsTypeCommander';
import { describe } from 'mocha';
import { JsTypeCommander } from '../dist/JsTypeCommander';
import { log, error, debug } from 'util';

function expectForNull(expected: any|null, result: any|null, message?: string): result is null {
    if (expected == null) {
        expect(result).to.a('null', message);
        return true;
    }
    expect(result).to.not.a('null', message);
    return false;
}

describe.skip("Testing module options settings", function() {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
    });
    describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            expect(result).to.a('string');
            expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\r\n");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.setDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).to.a('string');
            expect(result).to.equal("\n");
        });
    });
    describe("Testing JsTypeCommander.getPatternOptions()", function() {
        it('JsTypeCommander.getPatternOptions() should not return nil', function() {
            let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|null|undefined = JsTypeCommander.getPatternOptions();
            expect(regexOptionResult).to.not.a('undefined').and.to.not.a('null');
        });
    });
    describe("Checking JsTypeCommander.getPatternOptions() properties", function() {
        let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = JsTypeCommander.getPatternOptions(); } catch { regexOptionResult = undefined; }
        it('onlyWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.onlyWhitespace).to.not.a('undefined');
        });
        it('trimStart property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.trimStart).to.not.a('undefined');
        });
        it('trimEnd property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.trimEnd).to.not.a('undefined');
        });
        it('lineSeparator property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.lineSeparator).to.not.a('undefined');
        });
        it('booleanText property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.booleanText).to.not.a('undefined');
        });
        it('firstLetterLc property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.firstLetterLc).to.not.a('undefined');
        });
        it('abnormalWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
                expect(regexOptionResult.abnormalWhitespace).to.not.a('undefined');
        });
    });
    describe("Test JsTypeCommander.getPatternOptions() expressions", function() {
        let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = JsTypeCommander.getPatternOptions(); } catch { regexOptionResult = undefined; }
        let originals: JsTypeCommander.IJsTypeCommanderRegex;
        let testRe = /.*/;
        let testDataArr: {
            name: string,
            original: RegExp,
            getRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; }
            setRegexp: { (arg: JsTypeCommander.IJsTypeCommanderRegex, value: RegExp): void; }
        }[] = [
            { name: 'abnormalWhitespace', original: testRe, getRegexp: r => r.abnormalWhitespace, setRegexp: (r, v) => { r.abnormalWhitespace = v; } },
            { name: 'booleanText', original: testRe, getRegexp: r => r.booleanText, setRegexp: (r, v) => { r.booleanText = v; } },
            { name: 'lineSeparator', original: testRe, getRegexp: r => r.lineSeparator, setRegexp: (r, v) => { r.lineSeparator = v; } },
            { name: 'onlyWhitespace', original: testRe, getRegexp: r => r.onlyWhitespace, setRegexp: (r, v) => { r.onlyWhitespace = v; } },
            { name: 'trimEnd', original: testRe, getRegexp: r => r.trimEnd, setRegexp: (r, v) => { r.trimEnd = v; } },
            { name: 'trimStart', original: testRe, getRegexp: r => r.trimStart, setRegexp: (r, v) => { r.trimStart = v; } }
        ];
    
        testDataArr.forEach(d => {
            if (typeof(regexOptionResult) == "undefined")
                return;
            let r = d.getRegexp(regexOptionResult);
            if (typeof(r) !== "undefined")
            d.original = r;
        });

        testDataArr.forEach(testData => {
            it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function() {
                if (typeof(regexOptionResult) == "undefined")
                    this.skip();
                else {
                    let arg: JsTypeCommander.IJsTypeCommanderRegex = { };
                    testData.setRegexp(arg, /.*/);
                    let result: JsTypeCommander.IJsTypeCommanderRegex|undefined = JsTypeCommander.setPatternOptions(arg);
                    expect(result).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof(existing) == "undefined")
                            return;
                        if (d.name == testData.name) {
                            expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
                            expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
                        }
                        else {
                            expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
                            expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                        }
                    });
                    testData.setRegexp(arg, testData.original);
                    result = JsTypeCommander.setPatternOptions(arg);
                    expect(result).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof(existing) == "undefined")
                            return;
                        let originalRe = d.original;
                        if (d.name == testData.name)
                            expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
                        else
                            expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                    });
                }
            });
        });
        it('setPatternOptions() should return object with property values restored.', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else {
                let result: JsTypeCommander.IJsTypeCommanderRegex|undefined = JsTypeCommander.setPatternOptions();
                expect(result).to.not.a('undefined').and.to.not.a('null');
                testDataArr.forEach(d => {
                    if (typeof(result) == "undefined")
                        return;
                    let existing = d.getRegexp(result);
                    expect(existing).to.not.a('undefined').and.to.not.a('null');
                    if (typeof(existing) == "undefined")
                        return;
                    let originalRe = d.original;
                    expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
                });
            }
        });
    });
});

enum TypeMappingCondition {
    whenBoolean, whenFunction, whenInfinity, whenNaN, whenNumber, whenArray, whenArrayLike, whenNotArrayLike, whenString, whenSymbol, whenNull, whenUndefined, whenObject, otherwise
}
function typeMappingConditionToString(value: TypeMappingCondition): string {
    switch (value) {
        case TypeMappingCondition.whenBoolean:
            return "whenBoolean";
        case TypeMappingCondition.whenFunction:
            return "whenFunction";
        case TypeMappingCondition.whenInfinity:
            return "whenInfinity";
        case TypeMappingCondition.whenNaN:
            return "whenNaN";
        case TypeMappingCondition.whenNumber:
            return "whenNumber";
        case TypeMappingCondition.whenArray:
            return "whenArray";
        case TypeMappingCondition.whenArrayLike:
            return "whenArrayLike";
        case TypeMappingCondition.whenNotArrayLike:
            return "whenNotArrayLike";
        case TypeMappingCondition.whenString:
            return "whenString";
        case TypeMappingCondition.whenSymbol:
            return "whenSymbol";
        case TypeMappingCondition.whenNull:
            return "whenNull";
        case TypeMappingCondition.whenUndefined:
            return "whenUndefined";
        case TypeMappingCondition.whenObject:
            return "whenObject";
    }
    return "otherwise";
}
enum TypeGateNilHandling { notNil, allowUndefined, allowNull, allowNil }
enum JsTypeExt {
    Undefined = 0x0001,
    Boolean = 0x0002,
    FiniteNumber = 0x0004,
    String = 0x0008,
    Symbol = 0x0010,
    Function = 0x0020,
    NonArrayObject = 0x0040,
    Null = 0x0080,
    Array = 0x0100,
    NaN = 0x0200,
    Infinity = 0x0400
}
enum JsTypeExtMask {
    None = 0,
    Nil = JsTypeExt.Undefined | JsTypeExt.Null,
    NonNil = JsTypeExt.Boolean | JsTypeExt.FiniteNumber | JsTypeExt.Infinity | JsTypeExt.NaN | JsTypeExt.String | JsTypeExt.Symbol | JsTypeExt.Function | JsTypeExt.NonArrayObject |
        JsTypeExt.Array,
    NonNilObject = JsTypeExt.NonArrayObject | JsTypeExt.Array,
    JSONSerializable = JsTypeExt.Null | JsTypeExt.Boolean | JsTypeExt.FiniteNumber | JsTypeExt.String | JsTypeExt.NonArrayObject | JsTypeExt.Array,
    All = JsTypeExt.Undefined | JsTypeExt.Null | JsTypeExt.Boolean | JsTypeExt.FiniteNumber | JsTypeExt.Infinity | JsTypeExt.NaN | JsTypeExt.String | JsTypeExt.Symbol |
        JsTypeExt.Function | JsTypeExt.NonArrayObject | JsTypeExt.Array
}
enum JsType {
    Undefined = JsTypeExt.Undefined,
    Boolean = JsTypeExt.Boolean,
    Number = JsTypeExt.FiniteNumber,
    String = JsTypeExt.String,
    Symbol = JsTypeExt.Symbol,
    Function = JsTypeExt.Function,
    Object = JsTypeExt.NonArrayObject
}
enum JsTypeMask {
    None = 0,
    JSONSerializable = JsType.Boolean | JsType.Number | JsType.String | JsType.Object,
    All = JsType.Undefined | JsType.Boolean | JsType.Number | JsType.String | JsType.Symbol | JsType.Function | JsType.Object
}

const getClassNameSymbol: symbol = Symbol();

abstract class BaseJsTypeInfo {
    private _jsType: JsType;
    private _type: JsTypeExt;
    get jsType(): JsType { return this._jsType; }
    get type(): JsTypeExt { return this._type; }
    get isNonNilObject(): boolean { return this._jsType == JsType.Object && this._type != JsTypeExt.Null; }
    get isNil(): boolean { return this._type == JsTypeExt.Null || this._type == JsTypeExt.Undefined; }
    constructor(type?: JsTypeExt) {
        if (typeof(type) == "undefined")
            type = JsTypeExt.Undefined;
        switch (type) {
            case JsTypeExt.Undefined:
                this._jsType = JsType.Undefined;
                break;
            case JsTypeExt.Boolean:
                this._jsType = JsType.Boolean;
                break;
            case JsTypeExt.FiniteNumber:
            case JsTypeExt.NaN:
            case JsTypeExt.Infinity:
                this._jsType = JsType.Number;
                break;
            case JsTypeExt.String:
                this._jsType = JsType.String;
                break;
            case JsTypeExt.Symbol:
                this._jsType = JsType.Symbol;
                break;
            case JsTypeExt.Function:
                this._jsType = JsType.Function;
                break;
            case JsTypeExt.NonArrayObject:
            case JsTypeExt.Null:
            case JsTypeExt.Array:
                this._jsType = JsType.Object;
                break;
            default:
                throw new RangeError("Invalid extended type value");
        }
        this._type = type;
    }
    protected _equals(type: BaseJsTypeInfo|JsTypeExt): boolean {
        if (typeof(type) == "object")
            return type._type == this._type;
        return type == this._type;
    }
    abstract equals(obj: BaseJsTypeInfo)
    objectMatchesJsType(obj?: any): boolean {
        switch (typeof(obj)) {
            case "undefined":
                return this._jsType == JsType.Undefined;
            case "boolean":
                return this._jsType == JsType.Boolean;
            case "number":
                return this._jsType == JsType.Number;
            case "string":
                return this._jsType == JsType.String;
            case "symbol":
                return this._jsType == JsType.Symbol;
            case "function":
                return this._jsType == JsType.Function;
            default:
                return this._jsType == JsType.Object;
        }
    }
    objectMatchesExtType(obj?: any): boolean {
        switch (typeof(obj)) {
            case "undefined":
                return this._type == JsTypeExt.Undefined;
            case "boolean":
                return this._type == JsTypeExt.Boolean;
            case "number":
                return this._type == ((isNaN(obj)) ? JsTypeExt.NaN : ((obj === Infinity || obj === !Infinity) ? JsTypeExt.Infinity : JsTypeExt.FiniteNumber));
            case "string":
                return this._type == JsTypeExt.String;
            case "symbol":
                return this._type == JsTypeExt.Symbol;
            case "function":
                return this._type == JsTypeExt.Function;
            default:
                return this._type == ((obj === null) ? JsTypeExt.Null : ((Array.isArray(obj)) ? JsTypeExt.Array : JsTypeExt.NonArrayObject));
        }
    }
    objectExtendsExtType(obj?: any): boolean {
        switch (typeof(obj)) {
            case "undefined":
                return this._type == JsTypeExt.Undefined;
            case "boolean":
                return this._type == JsTypeExt.Boolean;
            case "number":
                if (this._type == JsTypeExt.FiniteNumber)
                    return true;
                return (this._type == JsTypeExt.NaN) ? isNaN(obj) : (obj === Infinity || obj === !Infinity);
            case "string":
                return this._type == JsTypeExt.String;
            case "symbol":
                return this._type == JsTypeExt.Symbol;
            case "function":
                return this._type == JsTypeExt.Function;
            default:
                return (obj == null) ? this._type == JsTypeExt.Null : (this._type == JsTypeExt.NonArrayObject || Array.isArray(obj));
        }
    }
    jsTypeIsAnyOf(flags: number|number[], ...otherFlags: (number|number[])[]) {
        let i: number;
        if (typeof(flags) == "number") {
            if ((flags | this._jsType) != 0)
                return true;
        } else {
            for (i = 0; i < flags.length; i++) {
                if ((flags[i] | this._jsType) != 0)
                    return true;
            }
        }
        if (typeof(otherFlags) != "undefined" && otherFlags.length > 0) {
            for (var n: number = 0; n < otherFlags.length; n++) {
                let f: number|number[] = otherFlags[n];
                if (typeof(f) == "number") {
                    if ((f | this._jsType) != 0)
                        return true;
                } else {
                    for (i = 0; i < f.length; i++) {
                        if ((f[i] | this._jsType) != 0)
                            return true;
                    }
                }
            }
        }

        return false;
    }
    jsTypeExtIsAnyOf(flags: number|number[], ...otherFlags: (number|number[])[]) {
        let i: number;
        if (typeof(flags) == "number") {
            if ((flags | this._type) != 0)
                return true;
        } else {
            for (i = 0; i < flags.length; i++) {
                if ((flags[i] | this._type) != 0)
                    return true;
            }
        }
        if (typeof(otherFlags) != "undefined" && otherFlags.length > 0) {
            for (var n: number = 0; n < otherFlags.length; n++) {
                let f: number|number[] = otherFlags[n];
                if (typeof(f) == "number") {
                    if ((f | this._type) != 0)
                        return true;
                } else {
                    for (i = 0; i < f.length; i++) {
                        if ((f[i] | this._type) != 0)
                            return true;
                    }
                }
            }
        }

        return false;
    }
    static jsTypeToString(value: JsType): string|undefined {
        switch (value) {
            case JsType.Boolean:
                return "boolean";
            case JsType.Number:
                return "number";
            case JsType.String:
                return "string";
            case JsType.Function:
                return "function";
            case JsType.Object:
                return "object";
            case JsType.Symbol:
                return "symbol";
            case JsType.Undefined:
                return "undefined";
        }
    }
    static toJsType(value?: any): JsType|undefined {
        if (typeof(value) == "string") {
            switch (value) {
                case "boolean":
                    return JsType.Boolean;
                case "number":
                    return JsType.Number;
                case "string":
                    return JsType.String;
                case "function":
                    return JsType.Function;
                case "object":
                    return JsType.Object;
                case "symbol":
                    return JsType.Symbol;
                case "undefined":
                    return JsType.Undefined;
            }
        } else if (typeof(value) == "number") {
            switch (value) {
                case JsType.Boolean:
                case JsType.Number:
                case JsType.String:
                case JsType.Function:
                case JsType.Object:
                case JsType.Symbol:
                case JsType.Undefined:
                    return value;
            }
        } else if (typeof(value) == "object" && value !== null) {
            let obj: { [key: string]: JsTypeCommander.TAnythingAtAll } = <{ [key: string]: JsTypeCommander.TAnythingAtAll }>value;
            if (typeof(obj.jsType) == "number" || typeof(obj.jsType) == "string")
                return this.toJsType(obj.jsType);
        }
    }
    toString(): string {
        switch (this._type) {
            case JsTypeExt.Boolean:
                return "boolean";
            case JsTypeExt.FiniteNumber:
                return "number";
            case JsTypeExt.String:
                return "string";
            case JsTypeExt.Symbol:
                return "symbol";
            case JsTypeExt.Function:
                return "function";
            case JsTypeExt.Null:
                return "null";
            case JsTypeExt.Array:
                return "Array";
            case JsTypeExt.NaN:
                return "NaN";
            case JsTypeExt.Infinity:
                return "Infinity";
            default:
                return "undefined";
        }
    }
    static toJsTypeExt(value?: any): JsTypeExt|undefined {
        if (typeof(value) == "string") {
            switch (value) {
                case "boolean":
                    return JsTypeExt.Boolean;
                case "number":
                    return JsTypeExt.FiniteNumber;
                case "NaN":
                    return JsTypeExt.NaN;
                case "Infinity":
                    return JsTypeExt.Infinity;
                case "string":
                    return JsTypeExt.String;
                case "function":
                    return JsTypeExt.Function;
                case "Array":
                    return JsTypeExt.Array;
                case "null":
                    return JsTypeExt.Null;
                case "object":
                    return JsTypeExt.NonArrayObject;
                case "symbol":
                    return JsTypeExt.Symbol;
                case "undefined":
                    return JsTypeExt.Undefined;
            }
        } else if (typeof(value) == "number") {
            switch (value) {
                case JsTypeExt.Boolean:
                case JsTypeExt.FiniteNumber:
                case JsTypeExt.NaN:
                case JsTypeExt.Infinity:
                case JsTypeExt.String:
                case JsTypeExt.Function:
                case JsTypeExt.NonArrayObject:
                case JsTypeExt.Symbol:
                case JsTypeExt.Array:
                case JsTypeExt.Null:
                case JsTypeExt.Undefined:
                    return value;
            }
        } else if (typeof(value) == "object" && value !== null) {
            let obj: { [key: string]: JsTypeCommander.TAnythingAtAll } = <{ [key: string]: JsTypeCommander.TAnythingAtAll }>value;
            if (typeof(obj.typeExt) == "number" || typeof(obj.typeExt) == "string")
                return this.toJsTypeExt(obj.typeExt);
        }
    }
    toJSON(): { [key: string]: string } { return { jsType: BaseJsTypeInfo.jsTypeToString(this._jsType), typeExt: this.toString() }; }
}
abstract class BaseJsTypeFlags {
    private _jsFlags: number = 0;
    private _extFlags: number = 0;
    get jsFlags(): number { return this._jsFlags; }
    get extFlags(): number { return this._extFlags; }
    constructor(values: number|(number|BaseJsTypeInfo)[]) {
        if (typeof(values) != "object" || values == null || values.length == 0)
            return;

        values.forEach((i: number|BaseJsTypeInfo) => {
            let obj: BaseJsTypeInfo;
            if (typeof(i) == "number") {
                if (i == 0)
                    return;
                obj = new JsTypeInfo(i);
            } else
                obj = i;
            this._jsFlags |= obj.jsType;
            this._extFlags |= obj.type;
        });
    }
    hasJsType(type: JsType|JsType[], ...otherTypes: (JsType|JsType[])[]): boolean {
        if (this._jsFlags == JsTypeMask.None)
            return false;
        if (this._jsFlags == JsTypeMask.All)
            return true;
        let i: number;
        if (typeof(type) == "number") {
            if ((type & this._jsFlags) != JsTypeMask.None)
                return true;
        } else {
            for (i = 0; i < type.length; i++) {
                if ((type[i] & this._jsFlags) != JsTypeMask.None)
                    return true;
            }
        }
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0) {
            for (let n: number = 0; n < otherTypes.length; n++) {
                let t: JsType|JsType[] = otherTypes[n];
                if (typeof(t) == "number"){
                    if ((t & this._jsFlags) != JsTypeMask.None)
                        return true;
                } else {
                    for (i = 0; i < t.length; i++) {
                        if ((t[i] & this._jsFlags) != JsTypeMask.None)
                            return true;
                    }
                }
            }
        }
        return false;
    }
    atLeastJsType(type: JsType|JsType[], ...otherTypes: (JsType|JsType[])[]): boolean {
        if (this._jsFlags == JsTypeMask.None)
            return false;
        if (this._jsFlags == JsTypeMask.All)
            return true;
        let i: number;
        if (typeof(type) == "number") {
            if ((type & this._jsFlags) != type)
                return false;
        } else {
            for (i = 0; i < type.length; i++) {
                if ((type[i] & this._jsFlags) != type[i])
                    return false;
            }
        }
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0) {
            for (let n: number = 0; n < otherTypes.length; n++) {
                let t: JsType|JsType[] = otherTypes[n];
                if (typeof(t) == "number") {
                    if ((t & this._jsFlags) != t)
                        return true;
                } else {
                    for (i = 0; i < t.length; i++) {
                        if ((t[i] & this._jsFlags) != t[i])
                            return false;
                    }
                }
            }
        }
        return true;
    }
    atMostJsType(type: JsType|JsType[], ...otherTypes: (JsType|JsType[])[]): boolean {
        if (this._jsFlags == JsTypeMask.None)
            return true;
        if (this._jsFlags == JsTypeMask.All)
            return true;
        let flags: number;
        if (typeof(type) == "number")
            flags = type;
        else
            flags = type.reduce((p: number, c: number) => p | c, JsTypeMask.None);
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0)
            flags = otherTypes.reduce((v: number, i: JsType|JsType[]) => {
                if (typeof(i) == "number")
                    return v | i;
                return i.reduce((p: number, c: number) => p | c, v);
            }, flags);
        return (flags & this._jsFlags) == JsTypeMask.None;
    }
    hasJsTypeExt(type: JsTypeExt|JsTypeExt[], ...otherTypes: (JsTypeExt|JsTypeExt[])[]): boolean {
        if (this._extFlags == JsTypeExtMask.None)
            return false;
        if (this._extFlags == JsTypeExtMask.All)
            return true;
        let i: number;
        if (typeof(type) == "number") {
            if ((type & this._extFlags) != JsTypeExtMask.None)
                return true;
        } else {
            for (i = 0; i < type.length; i++) {
                if ((type[i] & this._extFlags) != JsTypeExtMask.None)
                    return true;
            }
        }
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0) {
            for (let n: number = 0; n < otherTypes.length; n++) {
                let t: JsTypeExt|JsTypeExt[] = otherTypes[n];
                if (typeof(t) == "number"){
                    if ((t & this._extFlags) != JsTypeExtMask.None)
                        return true;
                } else {
                    for (i = 0; i < t.length; i++) {
                        if ((t[i] & this._extFlags) != JsTypeExtMask.None)
                            return true;
                    }
                }
            }
        }
        return false;
    }
    atLeastJsTypeExt(type: JsTypeExt|JsTypeExt[], ...otherTypes: (JsTypeExt|JsTypeExt[])[]): boolean {
        if (this._jsFlags == JsTypeMask.None)
            return false;
        if (this._jsFlags == JsTypeMask.All)
            return true;
        let i: number;
        if (typeof(type) == "number") {
            if ((type & this._jsFlags) != type)
                return false;
        } else {
            for (i = 0; i < type.length; i++) {
                if ((type[i] & this._jsFlags) != type[i])
                    return false;
            }
        }
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0) {
            for (let n: number = 0; n < otherTypes.length; n++) {
                let t: JsTypeExt|JsTypeExt[] = otherTypes[n];
                if (typeof(t) == "number") {
                    if ((t & this._jsFlags) != t)
                        return true;
                } else {
                    for (i = 0; i < t.length; i++) {
                        if ((t[i] & this._jsFlags) != t[i])
                            return false;
                    }
                }
            }
        }
        return true;
    }
    atMostJsTypeExt(type: JsTypeExt|JsTypeExt[], ...otherTypes: (JsTypeExt|JsTypeExt[])[]): boolean {
        if (this._jsFlags == JsTypeExtMask.None)
            return true;
        if (this._jsFlags == JsTypeExtMask.All)
            return true;
        let flags: number;
        if (typeof(type) == "number")
            flags = type;
        else
            flags = type.reduce((p: number, c: number) => p | c, JsTypeExtMask.None);
        if (typeof(otherTypes) == "object" && otherTypes !== null && otherTypes.length > 0)
            flags = otherTypes.reduce((v: number, i: JsTypeExt|JsTypeExt[]) => {
                if (typeof(i) == "number")
                    return v | i;
                return i.reduce((p: number, c: number) => p | c, v);
            }, flags);
        return (flags & this._jsFlags) == JsTypeExtMask.None;
    }
}
class JsTypeFlags extends BaseJsTypeFlags {
    static isJsTypeFlags(obj: object): obj is JsTypeFlags { return obj[getClassNameSymbol] == "JsTypeFlags"; }
    [getClassNameSymbol]() { return "JsTypeFlags"; }
    constructor(values: number|(number|BaseJsTypeInfo)[]) { super(values); }
}
class JsTypeInfo extends BaseJsTypeInfo {
    static isJsTypeInfo(obj: BaseJsTypeInfo): obj is JsTypeInfo { return obj[getClassNameSymbol] == "JsTypeInfo"; }
    [getClassNameSymbol]() { return "JsTypeInfo"; }
    constructor(type?: JsTypeExt) { super(type); }
    equals(type: BaseJsTypeInfo|JsTypeExt): boolean { return this._equals(type); }
}
enum JsVariant {
    None = 0x0001,
    Empty = 0x0002,
    Whitespace = 0x0004,
    Zero = 0x0008,
    Float = 0x0010,
    AlmostArrayLike = 0x0020,
    ArrayLike = 0x0040,
    Error = 0x0080,
    InheritsError = 0x0100,
    ErrorLike = 0x0200,
    BaseObject = 0x0400,
    InheritedObject = 0x0800,
    MultiInheritanceObject = 0x1000
}
enum JsVariantFlags {
    Unspecified = 0x0000,
    EmptyOrNone = JsVariant.None | JsVariant.Empty,
    WhitespaceEmptyOrNone = JsVariant.None | JsVariant.Empty | JsVariant.Whitespace,
    AnyErrorLike = JsVariant.Error | JsVariant.InheritsError | JsVariant.ErrorLike,
    InheritsBaseObject = JsVariant.BaseObject | JsVariant.InheritedObject | JsVariant.MultiInheritanceObject,
    AnyInherited = JsVariant.InheritsError | JsVariant.InheritedObject | JsVariant.MultiInheritanceObject,
    InheritsInheritedObject = JsVariant.InheritedObject | JsVariant.MultiInheritanceObject,
    AnyArrayLike = JsVariant.None | JsVariant.Empty | JsVariant.ArrayLike,
    NonZeroFiniteNumber = JsVariant.None | JsVariant.Float,
    ArrayLikeOrAlmost = JsVariant.None | JsVariant.Empty | JsVariant.ArrayLike | JsVariant.AlmostArrayLike,
    All = JsVariant.None | JsVariant.Empty | JsVariant.Whitespace | JsVariant.Zero | JsVariant.Float | JsVariant.AlmostArrayLike | JsVariant.ArrayLike | JsVariant.Error |
        JsVariant.InheritsError | JsVariant.ErrorLike | JsVariant.BaseObject | JsVariant.InheritedObject | JsVariant.MultiInheritanceObject
}
class JsTypeVariant extends BaseJsTypeInfo {
    static IsJsTypeVariant(obj: BaseJsTypeInfo): obj is JsTypeVariant { return obj[getClassNameSymbol] == "JsTypeVariant"; }
    [getClassNameSymbol]() { return "JsTypeVariant"; }
    private _variant: JsVariant;
    get variant(): JsVariant { return this._variant; }
    constructor(type?: JsTypeExt|JsTypeInfo, variant?: JsVariant) {
        super((typeof(type) == "number") ? type : type.type);
        if (typeof(variant) == "undefined") {
            this._variant = JsVariant.None;
            return;
        }
        switch (this.type) {
            case JsTypeExt.Undefined:
            case JsTypeExt.Boolean:
            case JsTypeExt.Symbol:
            case JsTypeExt.Function:
            case JsTypeExt.Null:
            case JsTypeExt.NaN:
            case JsTypeExt.Infinity:
                if (variant !== JsVariant.None)
                    throw new RangeError("Invalid variant value for undefined extended type");
                break;
            case JsTypeExt.FiniteNumber:
                if (variant != JsVariant.None && variant != JsVariant.Zero && variant != JsVariant.Float)
                    throw new RangeError("Invalid variant value for number extended type");
                break;
            case JsTypeExt.String:
                if (variant != JsVariant.None && variant != JsVariant.Empty && variant != JsVariant.Whitespace)
                    throw new RangeError("Invalid variant value for string extended type");
                break;
            case JsTypeExt.Array:
                if (variant != JsVariant.None && variant != JsVariant.Empty)
                    throw new RangeError("Invalid variant value for array extended type");
                break;
            default:
                if (variant != JsVariant.None && variant != JsVariant.AlmostArrayLike && variant != JsVariant.ArrayLike && variant != JsVariant.Error &&
                        variant != JsVariant.InheritsError && variant != JsVariant.BaseObject && variant != JsVariant.InheritedObject && variant != JsVariant.MultiInheritanceObject)
                    throw new RangeError("Invalid variant value for object extended type");
                break;
        }
        this._variant = variant;
    }

    equals(type: JsTypeVariant|BaseJsTypeInfo|JsVariant): boolean {
        if (typeof(type) == "object")
            return (JsTypeVariant.IsJsTypeVariant(type)) ? type._variant == this._variant : type.equals(this);
        return type == this._variant;
    }

    static jsVariantToString(value: JsVariant) {
        switch (value) {
            case JsVariant.Empty:
                return "empty";
            case JsVariant.Whitespace:
                return "whitespace";
            case JsVariant.Zero:
                return "zero";
            case JsVariant.Float:
                return "float";
            case JsVariant.AlmostArrayLike:
                return "~ArrayLike";
            case JsVariant.ArrayLike:
                return "ArrayLike";
            case JsVariant.Error:
                return "Error";
            case JsVariant.InheritsError:
                return "extends Error";
            case JsVariant.BaseObject:
                return "custom class";
            case JsVariant.InheritedObject:
                return "inherited custom";
            case JsVariant.MultiInheritanceObject:
                return "multi-inherited custom";
            default:
                return "none";
        }
    }

    toString(): string {
        if (this._variant == JsVariant.None)
            return super.toString();
        return super.toString() + " [" + JsTypeVariant.jsVariantToString(this._variant) + "]";
    }

    toJSON(): { [key: string]: string } {
        let result: { [key: string]: string } = super.toJSON();
        result.variant = JsTypeVariant.jsVariantToString(this._variant);
        return result;
    }
}
class JsTypeVariantFlags extends BaseJsTypeFlags {
    private _variantFlags: number = 0;
    get variantFlags(): number { return this._variantFlags; }
    static isJsTypeVariantFlags(obj: object): obj is JsTypeVariantFlags { return obj[getClassNameSymbol] == "JsTypeVariantFlags"; }
    [getClassNameSymbol]() { return "JsTypeVariantFlags"; }
    readonly name: string = "JsTypeVariantFlags";
    constructor(types: number|JsTypeFlags|(number|BaseJsTypeInfo)[], variant?: JsVariant|JsVariant[], ...otherVariants: (JsVariant|JsVariant[])[]) {
        super((typeof(types) == "number") ? [types] : (Array.isArray(types)) ? types : [types.extFlags]);
        if (typeof(variant) == "number")
            this._variantFlags = variant;
        else if (typeof(variant) == "object" && variant !== null)
            this._variantFlags = variant.reduce((p: number, a: JsVariant) => p | a, JsVariantFlags.Unspecified);
        if (typeof(variant) == "object" && variant !== null && otherVariants.length > 0)
            this._variantFlags = otherVariants.reduce((n: number, v: JsVariant|JsVariant[]) => (typeof(v) == "number") ? v | n : v.reduce((p: number, a: JsVariant) => p | a, n),
                this._variantFlags);
    }
    hasJsTypeExtAndVariant(type: JsType|JsTypeInfo|(JsType|JsTypeInfo)[], variant: JsTypeVariant|JsTypeVariant[], ...otherVariants: (JsTypeVariant|JsTypeVariant[])[]): boolean {
        throw new Error("Not Implemented");
    }
    atLeastJsTypeExtAndVariant(type: JsType|JsTypeInfo|(JsType|JsTypeInfo)[], variant: JsTypeVariant|JsTypeVariant[], ...otherVariants: (JsTypeVariant|JsTypeVariant[])[]): boolean {
        throw new Error("Not Implemented");
    }
    atMostJsTypeExtAndVariant(type: JsType|JsTypeInfo|(JsType|JsTypeInfo)[], variant: JsTypeVariant|JsTypeVariant[], ...otherVariants: (JsTypeVariant|JsTypeVariant[])[]): boolean {
        throw new Error("Not Implemented");
    }
}
//type typeSpec = "undefined"|"null"|"emptyString"|"whitespace"|"nonWhitespace"|"boolean"|"zero"|"nonZero"|"float"|"NaN"|"Infinity"|"function"|"plainObject"|"almostArrayLike"|
//    "ArrayLike"|"Array"|"emptyArray"|"errorLike"|"Error"|"RangeError"|"ParentClass"|"InheritedClass"|"DeepInheritedClass";
type ExpectedRegexTestResult = { captures: (string|null)[], groupZero?: string }|(string|null)[]|boolean|null;
type RegexPatternTest = { input: string, expected: ExpectedRegexTestResult };
interface ModuleRegexPattern {
    name: string;
    getRegex: { (obj: JsTypeCommander.IJsTypeCommanderRegex): RegExp|undefined; };
    tests: RegexPatternTest[];
}

describe("Testing regular expressions", function() {
    let patternDefinitions: ModuleRegexPattern[] = [
        {
            name: 'onlyWhitespace', getRegex: regexOptions => regexOptions.onlyWhitespace, tests: [
                { input: " ", expected: true }, { input: " \t\r\n ", expected: true }, { input: " \t\r\n ", expected: true }, { input: "", expected: false },
                { input: ".", expected: false }, { input: "0", expected: false }, { input: "X", expected: false }, { input: ". \t\r\n ", expected: false },
                { input: " \t.\r\n ", expected: false }, { input: " \t\r\n .", expected: false }
            ]
        }, {
            name: 'trimStart', getRegex: regexOptions => regexOptions.trimStart, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: false }, { input: "0\t\r\n", expected: false }, { input: ".", expected: false }, { input: ".\t\r\n", expected: false },
                { input: "\t\r\n0", expected: { captures: ["0"], groupZero: "\t\r\n0" } },
                { input: "\t\r\n0\t\r\n", expected: { captures: ["0\t\r\n"], groupZero: "\t\r\n0\t\r\n" } },
                { input: "\t\r\n.", expected: { captures: ["."], groupZero: "\t\r\n." } },
                { input: "\t\r\n.\t\r\n", expected: { captures: [".\t\r\n"], groupZero: "\t\r\n.\t\r\n" } }
            ]
        }, {
            name: 'trimEnd', getRegex: regexOptions => regexOptions.trimEnd, tests: [
                { input: "", expected: false }, { input: " \t\r\n ", expected: false }, { input: " \t\r\n ", expected: false },
                { input: "0", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } },
                { input: "0\t\r\n", expected: { captures: ["0"], groupZero: "0" } }, { input: "\t\r\n0\t\r\n", expected: { captures: ["\t\r\n0"], groupZero: "\t\r\n0" } },
                { input: ".\t\r\n", expected: { captures: ["."], groupZero: "." } }, { input: "\t\r\n.\t\r\n", expected: { captures: ["\t\r\n."], groupZero: "\t\r\n." } }
            ]
        }, {
            name: 'lineSeparator', getRegex: regexOptions => regexOptions.lineSeparator, tests: [
                { input: "", expected: false }, { input: " ", expected: false }, { input: ".", expected: false }, { input: "0", expected: false },
                { input: "\r", expected: true }, { input: "\r\n", expected: true }, { input: "\n", expected: true },
                { input: "x \t\r\n\r\nz ", expected: { captures: [], groupZero: "\r\n" } }, { input: " \t\n\r\r\n ", expected: { captures: [], groupZero: "\n" } },
                { input: "x \t\r\r\r\nz ", expected: { captures: [], groupZero: "\r" } }
            ]
        }, {
            name: 'booleanText', getRegex: regexOptions => regexOptions.booleanText, tests: (function() {
                let results: RegexPatternTest[] = [
                    { input: "true", expected: ["true", null] }, { input: "True", expected: ["True", null] }, { input: "tRuE", expected: ["tRuE", null] }, 
                    { input: "false", expected: [null, "false"] }, { input: "False", expected: [null, "False"] }, { input: "fAlSe", expected: [null, "fAlSe"] },
                    { input: "t", expected: ["t", null] }, { input: "f", expected: [null, "f"] }, { input: "T", expected: ["T", null] }, { input: "F", expected: [null, "F"] },
                    { input: "yes", expected: ["yes", null] }, { input: "Yes", expected: ["Yes", null] }, { input: "yEs", expected: ["yEs", null] },
                    { input: "no", expected: [null, "no"] }, { input: "No", expected: [null, "No"] }, { input: "nO", expected: [null, "nO"] },
                    { input: "y", expected: ["y", null] }, { input: "n", expected: [null, "n"] }, { input: "Y", expected: ["Y", null] }, { input: "N", expected: [null, "N"] },
                    { input: "1", expected: ["1", null] }, { input: "0", expected: [null, "0"] }, { input: "-1", expected: ["-1", null] }, { input: "-0", expected: [null, "-0"] },
                    { input: "1.00", expected: ["1.00", null] }, { input: "0.00", expected: [null, "0.00"] }, { input: "-1.00", expected: ["-1.00", null] },
                    { input: "-0.00", expected: [null, "-0.00"] }, { input: "0.005", expected: ["0.005", null] }, { input: "-0.005", expected: ["-0.005", null] },
                    { input: "-001.00", expected: ["-001.00", null] }, { input: "001.5", expected: ["001.5", null] }, { input: "", expected: false }, { input: " ", expected: false },
                    { input: "nes", expected: false }, { input: "ro", expected: false }, { input: "frue", expected: false }, { input: "talse", expected: false }
                ];
                let l: number = results.length;
                for (let i: number = 0; i < l; i++) {
                    let p: RegexPatternTest = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    let input: string = "\t\r\n" + p.input + "\t\r\n";
                    if (typeof(p.expected) == "boolean")
                        results.push({ input: input, expected: false });
                    else if (Array.isArray(p.expected))
                        results.push({ input: input, expected: <ExpectedRegexTestResult>{ captures: p.expected, groupZero: input }});
                    else if (p.expected !== null)
                        results.push({ input: input, expected: <ExpectedRegexTestResult>{ captures: p.expected.captures, groupZero: input }});
                }
                l = results.length;
                let leadNumRe = /^\d/;
                let trainNumRe = /\d$/;
                for (let i: number = 0; i < l; i++) {
                    let p: RegexPatternTest = results[i];
                    if (p.input.trim().length == 0)
                        continue;
                    ["true", "t", "false", "f", "yes", "y", "."].forEach(si => {
                        results.push({ input: si + p.input, expected: false });
                        results.push({ input: p.input + si, expected: false });
                    });
                    ["1", "0"].forEach(si => {
                        if (!leadNumRe.test(p.input))
                            results.push({ input: si + p.input, expected: false });
                        if (!trainNumRe.test(p.input))
                            results.push({ input: p.input + si, expected: false });
                    });
                }
                return results;
            }())
        }, {
            name: 'firstLetterLc', getRegex: regexOptions => regexOptions.firstLetterLc, tests: [
                { input: "test", expected: [null, "t", "est"] }, { input: "t", expected: [null, "t", null] },
                { input: "\r\n.test", expected: ["\r\n.", "t", "est"] }, { input: "\r\n.t", expected: ["\r\n.", "t", null] },
                { input: "Test", expected: false }, { input: "T", expected: false }, { input: " Test", expected: false }, { input: " T", expected: false },
                { input: "0test", expected: false }, { input: "0t", expected: false }, { input: "\r\n.0test", expected: false }, { input: "\r\n.0t", expected: false }
            ]
        }, {
            name: 'abnormalWhitespace', getRegex: regexOptions => regexOptions.abnormalWhitespace, tests: [
                { input: "  ", expected: { captures: [], groupZero: "  " } }, { input: " \t\r\n ", expected: { captures: [], groupZero: " \t\r\n " } },
                { input: " Test this  string   ", expected: { captures: [], groupZero: "  " } },
                { input: " Test\tthis  string   ", expected: { captures: [], groupZero: "\t" } },
                { input: " Test this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "   \t\r\n " } },
                { input: "\tTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\t" } },
                { input: "\r\nTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\r\n" } },
                { input: "\n\r\t\rTest this   \t\r\n string   \t\r\n  ", expected: { captures: [], groupZero: "\n\r\t\r" } }
            ]
        }
    ];
    let regexOptionResult: JsTypeCommander.IJsTypeCommanderRegex = (function() {
        let r: JsTypeCommander.IJsTypeCommanderRegex|undefined;
        try { r = JsTypeCommander.getPatternOptions(); } catch { r = undefined; }
        if (typeof(r) == "undefined")
            return { };
        return r;
    })();
    patternDefinitions.forEach(pattern => {
        describe('Testing ' + pattern.name + ' pattern', function() {
            let regex = pattern.getRegex(regexOptionResult);
            pattern.tests.forEach(testData => {
                let expectedGroups: (string|null)[]|null = null;
                if (typeof(testData.expected) == "boolean") {
                    if (testData.expected)
                        expectedGroups = [testData.input];
                } else if (testData.expected !== null) {
                    if (Array.isArray(testData.expected))
                        expectedGroups = (<(string|null)[]>[(testData.expected.length == 0) ? testData.input : testData.expected.join("")]).concat(testData.expected);
                    else
                        expectedGroups = (<(string|null)[]>[(typeof(testData.expected.groupZero) == "string") ? testData.expected.groupZero : ((testData.expected.captures.length == 0) ? testData.input : testData.expected.captures.join(""))]).concat(testData.expected.captures);
                }

                it('regexOptions.' + pattern.name + '.exec(' + JSON.stringify(testData.input) + ') should return ' + JSON.stringify(expectedGroups), function() {
                    let name: string = pattern.name;
                    let input: string = testData.input;
                    if (typeof(regex) == "undefined")
                        this.skip();
                    else {
                        let result: RegExpExecArray|null = regex.exec(input);
                        if (expectForNull(expectedGroups, result, 'Unexpected match result') || expectedGroups === null)
                            return;
                        expect(result.length).to.equal(expectedGroups.length, 'Length mismatch');
                        for (let i: number = 0; i < expectedGroups.length; i++) {
                            let msg: string = 'Result group mismatch at index ' + i;
                            if (typeof(expectedGroups[i]) == "string") {
                                expect(result[i]).to.a('string', msg);
                                expect(JSON.stringify(result[i])).to.equal(JSON.stringify(expectedGroups[i]), msg);
                            } else
                                expect(result[i]).to.not.a('string', msg);
                        }
                    }
                });
            }, this);
        });
    }, this);
});

enum MapCallbackId {
    whenBoolean = 0x0001,
    whenFunction = 0x0002,
    whenInfinity = 0x0004,
    whenNaN = 0x0008,
    whenNumber = 0x0010,
    whenArray = 0x0020,
    whenArrayLike = 0x0040,
    whenNotArrayLike = 0x0080,
    whenString = 0x0100,
    whenSymbol = 0x0200,
    whenNull = 0x0400,
    whenUndefined = 0x0800,
    whenObject = 0x1000,
    otherwise = 0x2000
}

type MapCallbackName = "whenBoolean"|"whenFunction"|"whenInfinity"|"whenNaN"|"whenNumber"|"whenArray"|"whenArrayLike"|"whenNotArrayLike"|"whenString"|"whenSymbol"|"whenNull"|
    "whenUndefined"|"whenObject"|"otherwise";

function mapCallbackIdToName(id: MapCallbackId): MapCallbackName {
    switch (id) {
        case MapCallbackId.whenBoolean:
            return 'whenBoolean';
        case MapCallbackId.whenFunction:
            return 'whenFunction';
        case MapCallbackId.whenInfinity:
            return 'whenInfinity';
        case MapCallbackId.whenNaN:
            return 'whenNaN';
        case MapCallbackId.whenNumber:
            return 'whenNumber';
        case MapCallbackId.whenArray:
            return 'whenArray';
        case MapCallbackId.whenArrayLike:
            return 'whenArrayLike';
        case MapCallbackId.whenNotArrayLike:
            return 'whenNotArrayLike';
        case MapCallbackId.whenString:
            return 'whenString';
        case MapCallbackId.whenSymbol:
            return 'whenSymbol';
        case MapCallbackId.whenNull:
            return 'whenNull';
        case MapCallbackId.whenUndefined:
            return 'whenUndefined';
        case MapCallbackId.whenObject:
            return 'whenObject';
    }
    return 'otherwise';
}

interface ArgumentDescriptor { display: string, getValue: { (): JsTypeCommander.TAnythingAtAll; } }
interface MapByTypeOptions { omit?: MapCallbackName[]|MapCallbackName; checkElements?: boolean; expected: MapCallbackId }
interface MapByTypeTest {
    arg: ArgumentDescriptor[]|ArgumentDescriptor;
    opt: MapByTypeOptions[]|MapByTypeOptions;
}
interface MapByTypeInputType {
    type: string;
    test: MapByTypeTest[]|MapByTypeTest
}
interface MapByNilArguments extends ArgumentDescriptor {
    type: "notNil"|"null"|"undefined";
}
interface MapByNilFunction {
    name: string,
    callback: Function,
    allowUndefined: boolean,
    allowNull: boolean
}
class MapByTypeHelper implements JsTypeCommander.TypeGuardResultSpecs<JsTypeCommander.TAnythingAtAll, MapCallbackId> {
    private _isOmmitted: { [key: string]: boolean } = { };
    private _invokeFlags: number = 0;
    private _callCount: number = 0;
    private _lastArg: JsTypeCommander.TAnythingAtAll = undefined;
    private _onInvoked(key: MapCallbackId, value: JsTypeCommander.TAnythingAtAll): MapCallbackId {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    }
    private _whenBoolean(value: boolean): MapCallbackId { return this._onInvoked(MapCallbackId.whenBoolean, value); }
    private _whenFunction(value: Function): MapCallbackId { return this._onInvoked(MapCallbackId.whenFunction, value); }
    private _whenInfinity(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenInfinity, value); }
    private _whenNaN(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNaN, value); }
    private _whenNumber(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNumber, value); }
    private _whenArray(value: JsTypeCommander.TAnythingAtAll[]): MapCallbackId { return this._onInvoked(MapCallbackId.whenArray, value); }
    private _whenArrayLike(value: ArrayLike<JsTypeCommander.TAnythingAtAll>): MapCallbackId { return this._onInvoked(MapCallbackId.whenArrayLike, value); }
    private _whenNotArrayLike(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); }
    private _whenString(value: string): MapCallbackId { return this._onInvoked(MapCallbackId.whenString, value); }
    private _whenSymbol(value: symbol): MapCallbackId { return this._onInvoked(MapCallbackId.whenSymbol, value); }
    private _whenNull(value: null): MapCallbackId { return this._onInvoked(MapCallbackId.whenNull, value); }
    private _whenUndefined(value: undefined): MapCallbackId { return this._onInvoked(MapCallbackId.whenUndefined, value); }
    private _whenObject(value: JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenObject, value); }
    private _invokeThis<T>(name: string, func: JsTypeCommander.MapFromValueCallback<T, MapCallbackId>) : JsTypeCommander.MapFromValueCallback<T, MapCallbackId>|undefined {
        if (this._isOmmitted[name])
            return;
        let thisObj = this;
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        return function(arg: T) { return func.call(thisObj, arg); };
    }
    constructor(omit?: MapCallbackId|MapCallbackName|(MapCallbackId|MapCallbackName)[], ...omitOther: (MapCallbackId|MapCallbackName)[]) {
        if (Array.isArray(omit))
            omit.forEach(n => {
                if (typeof(n) == "number") {
                    if (n != MapCallbackId.otherwise)
                        this._isOmmitted[mapCallbackIdToName(n)] = true;
                } else if (n != "otherwise")
                    this._isOmmitted[n] = true;
            }, this);
        else if (typeof(omit) == "number") {
            if (omit != MapCallbackId.otherwise)
                this._isOmmitted[mapCallbackIdToName(omit)] = true;
        } else if (typeof(omit) != "undefined" && omit != "otherwise")
            this._isOmmitted[omit] = true;
        if (!Array.isArray(omitOther))
            return;
        omitOther.forEach(n => {
            if (typeof(n) == "number") {
                if (n != MapCallbackId.otherwise)
                    this._isOmmitted[mapCallbackIdToName(n)] = true;
            } else if (n != "otherwise")
                this._isOmmitted[n] = true;
        }, this);
    }
    get invokeFlags(): number { return this._invokeFlags; }
    get callCount(): number { return this._callCount; }
    get lastArg(): JsTypeCommander.TAnythingAtAll { return this._lastArg; }
    get thisObj(): MapByTypeHelper { return this; }
    get whenBoolean(): JsTypeCommander.MapFromValueCallback<boolean, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<boolean>("whenBoolean", this._whenBoolean); }
    get whenFunction(): JsTypeCommander.MapFromValueCallback<Function, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<Function>("whenFunction", this._whenFunction); }
    get whenInfinity(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenInfinity", this._whenInfinity); }
    get whenNaN(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNaN", this._whenNaN); }
    get whenNumber(): JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNumber", this._whenNumber); }
    get whenArray(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.TAnythingAtAll[], MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.TAnythingAtAll[]>("whenArray", this._whenArray); }
    get whenArrayLike(): JsTypeCommander.MapFromValueCallback<ArrayLike<JsTypeCommander.TAnythingAtAll>, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<ArrayLike<JsTypeCommander.TAnythingAtAll>>("whenArrayLike", this._whenArrayLike); }
    get whenNotArrayLike(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenNotArrayLike", this._whenNotArrayLike); }
    get whenString(): JsTypeCommander.MapFromValueCallback<string, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<string>("whenString", this._whenString); }
    get whenSymbol(): JsTypeCommander.MapFromValueCallback<symbol, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<symbol>("whenSymbol", this._whenSymbol); }
    get whenNull(): JsTypeCommander.MapFromValueCallback<null, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<null>("whenNull", this._whenNull); }
    get whenUndefined(): JsTypeCommander.MapFromValueCallback<undefined, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<undefined>("whenUndefined", this._whenUndefined); }
    get whenObject(): JsTypeCommander.MapFromValueCallback<JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<JsTypeCommander.IStringKeyedObject>("whenObject", this._whenObject); }
    otherwise(value: JsTypeCommander.TAnythingAtAll): MapCallbackId { return this._onInvoked(MapCallbackId.otherwise, value); }
    toJSON(): { [key: number]: boolean|undefined } {
        let allIds: MapCallbackId[] = [ MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject ];
        let result: { [key: string]: boolean|undefined } = { };
        allIds.forEach(i => {
            let n: MapCallbackName = mapCallbackIdToName(i);
            if (this._isOmmitted[n])
                result[n] = false
        })
        return result;
    }
}
class MapByNilHelper {
    private _whenTrueInvoked: boolean = false;
    private _otherwiseInvoked: boolean = false;
    private _callCount: number = 0;
    private _lastArg: JsTypeCommander.TAnythingAtAll = undefined;
    private _trueNum: number;
    private _otherwiseNum: number;
    get whenTrueInvoked(): boolean { return this._whenTrueInvoked; }
    get otherwiseInvoked(): boolean { return this._otherwiseInvoked; }
    get callCount(): number { return this._callCount; }
    get trueNum(): number { return this._trueNum; }
    get otherwiseNum(): number { return this._otherwiseNum; }
    whenTrue(arg: JsTypeCommander.TAnythingAtAll): number {
        this._callCount++;
        this._whenTrueInvoked = true;
        this._lastArg = arg;
        return this._trueNum;
    }
    otherwise(arg?: any): number {
        this._callCount++;
        this._otherwiseInvoked = true;
        this._lastArg = arg;
        return this._otherwiseNum;
    }
    constructor() {
        this._trueNum = Math.floor(Math.random() * 100);
        this._otherwiseNum = Math.floor(Math.random() * 100);
        while (this._trueNum == this._otherwiseNum)
            this._otherwiseNum = Math.floor(Math.random() * 100);
    }
}

describe("Testing type map functions", function() {
    describe("Testing mapByTypeValue function", function() {
        let inputTypeArr: MapByTypeInputType[] = [
            {
                type: 'nil',
                test: [
                    {
                        arg: { display: 'undefined', getValue: () => undefined },
                        opt: [
                            { expected: MapCallbackId.whenUndefined },
                            { omit: "whenUndefined", expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'null', getValue: () => null },
                        opt: [
                            { expected: MapCallbackId.whenNull },
                            { omit: "whenNull", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'boolean',
                test: {
                    arg: [ { display: 'true', getValue: () => true }, { display: 'false', getValue: () => false } ],
                    opt: [
                        { expected: MapCallbackId.whenBoolean },
                        { omit: "whenBoolean", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'number',
                test: [
                    {
                        arg: [
                            { display: 'Number.POSITIVE_INFINITY', getValue: () => Number.POSITIVE_INFINITY },
                            { display: 'Number.NEGATIVE_INFINITY', getValue: () => Number.NEGATIVE_INFINITY },
                            { display: 'Infinity', getValue: () => Infinity }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenInfinity },
                            { omit: "whenInfinity", expected: MapCallbackId.whenNumber },
                            { omit: ["whenInfinity", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'NaN', getValue: () => NaN },
                        opt: [
                            { expected: MapCallbackId.whenNaN },
                            { omit: "whenNaN", expected: MapCallbackId.whenNumber },
                            { omit: ["whenNaN", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [ { display: '0', getValue: () => 0 }, { display: '-1', getValue: () => -1 }, { display: '0.0001', getValue: () => 0.0001 }, { display: '10', getValue: () => 10 } ],
                        opt: [
                            { expected: MapCallbackId.whenNumber },
                            { omit: "whenNumber", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'Array',
                test: {
                    arg: [ { display: '[]', getValue: () => [] }, { display: '[undefined]', getValue: () => [undefined] }, { display: '[false]', getValue: () => [false] } ],
                    opt: [
                        { expected: MapCallbackId.whenArray },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                        { expected: MapCallbackId.whenArray, checkElements: false },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false },
                        { expected: MapCallbackId.whenArray, checkElements: true },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                    ]
                }
            }, {
                type: 'ArrayLike',
                test: [
                    {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike, checkElements: true },
                            { omit: "whenArrayLike", checkElements: true, expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], checkElements: true, expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'not ArrayLike',
                test: [
                    {
                        arg: { display: '{ }', getValue: () => { return { } } },
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: false },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: false },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false }
                        ]
                    }, {
                        arg: [
                            { display: '{ }', getValue: () => { return { } } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                        ],
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: true },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: true },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                        ]
                    }
                ]
            }, {
                type: 'string',
                test: {
                    arg: [ { display: '""', getValue: () => "" }, { display: '"false"', getValue: () => "false" } ],
                    opt: [
                        { expected: MapCallbackId.whenString },
                        { omit: "whenString", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'symbol',
                test: {
                    arg: { display: 'Symbol.iterator', getValue: () => Symbol.iterator },
                    opt: [
                        { expected: MapCallbackId.whenSymbol },
                        { omit: "whenSymbol", expected: MapCallbackId.otherwise }
                    ]
                }
            }
        ];
        let dataIterationIndex: number = 0;
        inputTypeArr.forEach(inputType => {
            describe('Testing ' + inputType.type + " values", function() {
                let tests: MapByTypeTest[] = (Array.isArray(inputType.test)) ? inputType.test : [inputType.test];
                tests.forEach(mapByTypeTest => {
                    let args: ArgumentDescriptor[] = (Array.isArray(mapByTypeTest.arg)) ? mapByTypeTest.arg : [mapByTypeTest.arg];
                    let optArr: MapByTypeOptions[] = (Array.isArray(mapByTypeTest.opt)) ? mapByTypeTest.opt : [mapByTypeTest.opt];
                    optArr.forEach(opt => {
                        let omit: MapCallbackName[] = (typeof(opt.omit) == "undefined") ? [] : ((typeof(opt.omit) == "string") ? [opt.omit] : opt.omit);
                        args.forEach(argInfo => {
                            let tgh: MapByTypeHelper = new MapByTypeHelper(omit);
                            it('JsTypeCommander.mapByTypeValue(' + argInfo.display + ', ' + JSON.stringify(tgh.toJSON()) + ((typeof(opt.checkElements) == "boolean") ? ", " +
                                    opt.checkElements : "") + ') should return ' + opt.expected + " (calling " + mapCallbackIdToName(opt.expected) + ")", function() {
                                let result: JsTypeCommander.TAnythingAtAll = (typeof(opt.checkElements) == "boolean") ?
                                    JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh, opt.checkElements) :
                                    JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh);
                                dataIterationIndex++;
                                expect(result).to.a("number", "at dataIterationIndex " + dataIterationIndex);
                                expect(result).to.equal(opt.expected, mapCallbackIdToName(result) + " called, insteaat dataIterationIndex " + dataIterationIndex);
                            });
                        }, this);
                    }, this);
                }, this);
            });
        }, this);
    });

    let mapByNilFunctionArr: MapByNilFunction[] = [
        { name: 'mapByDefined', callback: JsTypeCommander.mapByDefined, allowUndefined: false, allowNull: true },
        { name: 'mapByNotNull', callback: JsTypeCommander.mapByNotNull, allowUndefined: true, allowNull: false },
        { name: 'mapByNotNil', callback: JsTypeCommander.mapByNotNil, allowUndefined: false, allowNull: false }
    ];
    let mapByNilArguments: MapByNilArguments[] = [
        { display: 'undefined', type: 'undefined', getValue: () => undefined },
        { display: 'null', type: 'null', getValue: () => null },
        { display: 'NaN', type: 'notNil', getValue: () => NaN },
        { display: '0', type: 'notNil', getValue: () => 0 },
        { display: 'false', type: 'notNil', getValue: () => false },
        { display: '""', type: 'notNil', getValue: () => "" },
        { display: '[]', type: 'notNil', getValue: () => [] },
        { display: '[undefined', type: 'notNil', getValue: () => [undefined] },
        { display: '{}', type: 'notNil', getValue: () => { return {}; } },
        { display: 'Symbol.iterator', type: 'notNil', getValue: () => Symbol.iterator }
    ];
    mapByNilFunctionArr.forEach(mapByNilFunction => {
        describe("Testing " + mapByNilFunction.name + " function", function() {
            mapByNilArguments.forEach(argInfo => {
                let whenTrue: boolean = (argInfo.type == "notNil" || ((argInfo.type == "null") ? mapByNilFunction.allowNull : mapByNilFunction.allowUndefined));
                let mapByNilHelper: MapByNilHelper = new MapByNilHelper();
                let expected: number = (whenTrue) ? mapByNilHelper.trueNum : mapByNilHelper.otherwiseNum;
                it(mapByNilFunction.name + "(" + argInfo.display + ", fn(v) => " + mapByNilHelper.trueNum + ', fn' + ((mapByNilFunction.name == "mapByNotNil") ? '(v)' : '()') +
                        ' => ' + mapByNilHelper.otherwiseNum + ') should return ' + expected + ' (' + ((whenTrue) ? 'whenTrue' : 'otherwise') + ')', function() {
                    let result: JsTypeCommander.TAnythingAtAll = mapByNilFunction.callback(argInfo.getValue(), mapByNilHelper.whenTrue, mapByNilHelper.otherwise, mapByNilHelper);
                    expect(result).to.a('number').and.to.equal(expected);
                    expect(mapByNilHelper.callCount).to.not.equal(0, 'Callback not invoked');
                    expect(mapByNilHelper.callCount).to.equal(1, 'Callback invoked more than once');
                    if (whenTrue)
                        expect(mapByNilHelper.whenTrueInvoked).to.equal(true, 'Wrong callback invoked');
                    else
                        expect(mapByNilHelper.otherwiseInvoked).to.equal(true, 'Wrong callback invoked');
                });
            }, this);
        });
    }, this);
});

type TypeVariantSpec = JsTypeVariant|JsTypeExt|JsTypeInfo|{ type: JsTypeExt|JsTypeInfo, variant?: JsVariant; };
type TypeVariantFlagSpec = JsTypeVariantFlags|JsVariant|JsVariant[];

interface TypeGuardTestArgument {
    value?: ArgumentDescriptor;
    type: TypeVariantSpec;
}
interface TypeGuardTargetType {
    description: string;
    functions: TypeGuardFunction[];
}
interface TypeGuardFunction {
    name: string;
    callback: Function;
    allowed: (TypeVariantFlagSpec|{
        isGeneric?: boolean;
        types: TypeVariantFlagSpec;
        arg?: ArgumentDescriptor;
    })[]|TypeVariantFlagSpec;
}

class ExampleBaseClass {
    get (key: string): number { return parseInt(key); }
}
class ExampleChildClass extends ExampleBaseClass {
    length: string = "0";
}
class ExampleNestedClass extends ExampleChildClass {
    count: number = 0;
}

describe("Testing type guard functions", function() {
    let typeGuardTestArgumentArr: TypeGuardTestArgument[] = [
        { type: JsTypeExt.Undefined },
        { type: JsTypeExt.Undefined, value: { display: 'undefined', getValue: () => undefined } },
        { type: JsTypeExt.Null, value: { display: 'null', getValue: () => null } },
        { type: { type: JsTypeExt.String, variant: JsVariant.Empty }, value: { display: '""', getValue: () => "" } },
        { type: { type: JsTypeExt.String, variant: JsVariant.Whitespace }, value: { display: '" "', getValue: () => " " } },
        { type: { type: JsTypeExt.String, variant: JsVariant.Whitespace }, value: { display: '"\\n\\r\\t"', getValue: () => "\n\r\t" } },
        { type: JsTypeExt.String, value: { display: '"."', getValue: () => "" } },
        { type: JsTypeExt.String, value: { display: '" . "', getValue: () => " . " } },
        { type: JsTypeExt.String, value: { display: '"\\n\\r . \\t"', getValue: () => "\n\r . \t" } },
        { type: JsTypeExt.Boolean, value: { display: 'true', getValue: () => true } },
        { type: JsTypeExt.Boolean, value: { display: 'false', getValue: () => false } },
        { type: JsTypeExt.FiniteNumber, value: { display: '1', getValue: () => 1 } },
        { type: JsTypeExt.FiniteNumber, value: { display: '123', getValue: () => 123 } },
        { type: JsTypeExt.FiniteNumber, value: { display: '-1', getValue: () => -1 } },
        { type: { type: JsTypeExt.FiniteNumber, variant: JsVariant.Zero }, value: { display: '0', getValue: () => 0 } },
        { type: { type: JsTypeExt.FiniteNumber, variant: JsVariant.Float }, value: { display: '0.0001', getValue: () => 0.0001 } },
        { type: JsTypeExt.NaN, value: { display: 'NaN', getValue: () => NaN } },
        { type: JsTypeExt.Infinity, value: { display: 'Infinity', getValue: () => Infinity } },
        { type: JsTypeExt.Function, value: { display: 'function() { return false };', getValue: () => { return function() { return false }; } } },
        { type: JsTypeExt.NonArrayObject, value: { display: '{ }', getValue: () => { return { }; } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.AlmostArrayLike }, value: { display: '{ length: 1 }', getValue: () => { return { length: 1 }; } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.AlmostArrayLike }, value: { display: '{ length: 2, [0]: "1", [2]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[2] = "2" } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.ArrayLike }, value: { display: '{ length: 0 }', getValue: () => { return { length: 1 }; } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.ArrayLike }, value: { display: '{ length: 2, [0]: "1", [1]: "2" }', getValue: () => { let aa: { length: number, [key: number]: string } = { length: 2 }; aa[0] = "1"; aa[1] = "2" } } },
        { type: { type: JsTypeExt.Array, variant: JsVariant.Empty }, value: { display: '[]', getValue: () => [] } },
        { type: JsTypeExt.Array, value: { display: '[undefined]', getValue: () => [undefined] } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.Error }, value: { display: '[undefined]', getValue: () => {
            try { throw new Error("Thrown for test"); }
            catch (e) { return e; }
        } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.InheritsError }, value: { display: '[undefined]', getValue: () => {
            try { throw new RangeError("Out of range for a test"); }
            catch (e) { return e; }
        } } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.BaseObject }, value: { display: 'new ExampleBaseClass()', getValue: () => new ExampleBaseClass() } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.InheritedObject }, value: { display: 'new ExampleChildClass()', getValue: () => new ExampleChildClass() } },
        { type: { type: JsTypeExt.NonArrayObject, variant: JsVariant.MultiInheritanceObject }, value: { display: 'new ExampleNestedClass()', getValue: () => new ExampleNestedClass() } }
    ];
    let typeGuardTargetTypeArr: TypeGuardTargetType[] = [
        {
            description: 'Testing nil type guard functions',
            functions: [
                { name: 'notDefined', callback: JsTypeCommander.notDefined, allowed: "undefined" },
                { name: 'isNull', callback: JsTypeCommander.isNull, allowed: "null" },
                { name: 'isNil', callback: JsTypeCommander.isNil, allowed: ["undefined", "null"] }
            ]
        }, {
            description: 'Testing string type guard functions',
            functions: [
                { name: 'isString', callback: JsTypeCommander.isString, allowed: ["emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringIfDef', callback: JsTypeCommander.isStringIfDef, allowed: ["undefined", "emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringOrNull', callback: JsTypeCommander.isStringOrNull, allowed: ["null", "emptyString", "whitespace", "nonWhitespace"] },
                { name: 'isStringOrNil', callback: JsTypeCommander.isStringOrNil, allowed: ["undefined", "null", "emptyString", "whitespace", "nonWhitespace"] }
            ]
        }, {
            description: 'Testing empty string type guard functions',
            functions: [
                { name: 'isEmptyString', callback: JsTypeCommander.isEmptyString, allowed: ["emptyString", "whitespace"] },
                { name: 'isEmptyStringIfDef', callback: JsTypeCommander.isEmptyStringIfDef, allowed: ["undefined", "emptyString", "whitespace"] },
                { name: 'isEmptyStringOrNull', callback: JsTypeCommander.isEmptyStringOrNull, allowed: ["null", "emptyString", "whitespace"] },
                { name: 'isEmptyStringOrNil', callback: JsTypeCommander.isEmptyStringOrNil, allowed: ["undefined", "null", "emptyString", "whitespace"] },
                { name: 'isEmptyOrWhitespace', callback: JsTypeCommander.isEmptyOrWhitespace, allowed: ["emptyString", "whitespace"] },
                { name: 'isEmptyOrWhitespaceIfDef', callback: JsTypeCommander.isEmptyOrWhitespaceIfDef, allowed: ["undefined", "emptyString", "whitespace"] },
                { name: 'isNullOrWhitespace', callback: JsTypeCommander.isNullOrWhitespace, allowed: ["null", "emptyString", "whitespace"] },
                { name: 'isNilOrWhitespace', callback: JsTypeCommander.isNilOrWhitespace, allowed: ["undefined", "null", "emptyString", "whitespace"] }
            ]
        }, {
            description: 'Testing boolean type guard functions',
            functions: [
                { name: 'isBoolean', callback: JsTypeCommander.isBoolean, allowed: "boolean" },
                { name: 'isBooleanIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: ["undefined", "boolean"] },
                { name: 'isBooleanOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: ["null", "boolean"] },
                { name: 'isBooleanOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: ["undefined", "null", "boolean"] }
            ]
        }, {
            description: 'Testing number type guard functions',
            functions: [
                { name: 'isNumber', callback: JsTypeCommander.isNumber, allowed: ["zero", "nonZero", "float"] },
                { name: 'isNumberIfDef', callback: JsTypeCommander.isNumberIfDef, allowed: ["undefined", "zero", "nonZero", "float"] },
                { name: 'isNumberOrNull', callback: JsTypeCommander.isNumberOrNull, allowed: ["null", "zero", "nonZero", "float"] },
                { name: 'isNumberNaNorNull', callback: JsTypeCommander.isNumberOrNull, allowed: ["null", "zero", "nonZero", "float", 'NaN'] },
                { name: 'isNumberOrNil', callback: JsTypeCommander.isNumberOrNil, allowed: ["undefined", "null", "zero", "nonZero", "float"] },
                { name: 'isInfinite', callback: JsTypeCommander.isInfinite, allowed: "Infinity" }
            ]
        }, {
            description: 'Testing function type guard functions',
            functions: [
                { name: 'isFunction', callback: JsTypeCommander.isBoolean, allowed: "function" },
                { name: 'isFunctionIfDef', callback: JsTypeCommander.isBooleanIfDef, allowed: ["undefined", "function"] },
                { name: 'isFunctionOrNull', callback: JsTypeCommander.isBooleanOrNull, allowed: ["null", "function"] },
                { name: 'isFunctionOrNil', callback: JsTypeCommander.isBooleanOrNil, allowed: ["undefined", "null", "function"] }
            ]
        }, {
            description: 'Testing object type guard functions',
            functions: [
                { name: 'isObject', callback: JsTypeCommander.isObject, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObject', callback: JsTypeCommander.isPlainObject, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectType', callback: JsTypeCommander.isObjectType, allowed: ["plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObject', callback: JsTypeCommander.isNonArrayObject, allowed: [
                    {
                        types: ["plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArray', callback: JsTypeCommander.isArray, allowed: ["Array", "emptyArray"] },
                { name: 'isEmptyArray', callback: JsTypeCommander.isEmptyArray, allowed: "emptyArray" },
                { name: 'isArrayLike', callback: JsTypeCommander.isArrayLike, allowed: [
                    {
                        types: ["almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectIfDef', callback: JsTypeCommander.isObjectIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectIfDef', callback: JsTypeCommander.isPlainObjectIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeIfDef', callback: JsTypeCommander.isObjectTypeIfDef, allowed: ["undefined", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectIfDef', callback: JsTypeCommander.isNonArrayObjectIfDef, allowed: [
                    {
                        types: ["undefined", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArrayIfDef', callback: JsTypeCommander.isArrayIfDef, allowed: ["undefined", "Array", "emptyArray"] },
                { name: 'isEmptyArrayIfDef', callback: JsTypeCommander.isEmptyArrayIfDef, allowed: ["undefined", "emptyArray"] },
                { name: 'isArrayLikeIfDef', callback: JsTypeCommander.isArrayLikeIfDef, allowed: [
                    {
                        types: ["undefined", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectOrNull', callback: JsTypeCommander.isObjectOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectOrNull', callback: JsTypeCommander.isPlainObjectOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeOrNull', callback: JsTypeCommander.isObjectTypeOrNull, allowed: ["null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectOrNull', callback: JsTypeCommander.isNonArrayObjectOrNull, allowed: [
                    {
                        types: ["null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["null", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                ] },
                { name: 'isArrayOrNull', callback: JsTypeCommander.isArrayOrNull, allowed: ["null", "Array", "emptyArray"] },
                { name: 'isEmptyArrayOrNull', callback: JsTypeCommander.isEmptyArrayOrNull, allowed: ["null", "emptyArray"] },
                { name: 'isArrayLikeOrNull', callback: JsTypeCommander.isArrayLikeOrNull, allowed: [
                    {
                        types: ["null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["null", "ArrayLike", "Array", "emptyArray"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                    }
                ] },
                { name: 'isObjectOrNil', callback: JsTypeCommander.isObjectOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isPlainObjectOrNil', callback: JsTypeCommander.isPlainObjectOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike"] },
                { name: 'isObjectTypeOrNil', callback: JsTypeCommander.isObjectTypeOrNil, allowed: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                { name: 'isNonArrayObjectOrNil', callback: JsTypeCommander.isNonArrayObjectOrNil, allowed: [
                    {
                        types: ["undefined", "null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'true', getValue: () => true },
                        types: ["undefined", "null", "plainObject", "errorLike", "almostArrayLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }, {
                        arg: { display: 'false', getValue: () => false },
                        types: ["undefined", "null", "plainObject", "errorLike", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"]
                    }
                 ] },
                 { name: 'isArrayOrNil', callback: JsTypeCommander.isArrayOrNil, allowed: ["undefined", "null", "Array", "emptyArray"] },
                 { name: 'isEmptyArrayOrNil', callback: JsTypeCommander.isEmptyArrayOrNil, allowed: ["undefined", "null", "emptyArray"] },
                 { name: 'isArrayLikeOrNil', callback: JsTypeCommander.isArrayLikeOrNil, allowed: [
                     {
                         types: ["undefined", "null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                     }, {
                         arg: { display: 'true', getValue: () => true },
                         types: ["undefined", "null", "ArrayLike", "Array", "emptyArray"]
                     }, {
                         arg: { display: 'false', getValue: () => false },
                         types: ["undefined", "null", "almostArrayLike", "ArrayLike", "Array", "emptyArray"]
                     }
                  ] }
            ]
        }, {
            description: 'Testing derrivation type guard functions',
            functions: [
                {
                    name: 'derivesFrom', callback: JsTypeCommander.derivesFrom, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromIfDef', callback: JsTypeCommander.derivesFromIfDef, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["undefined", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["undefined", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["undefined", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["undefined", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["undefined", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromOrNull', callback: JsTypeCommander.derivesFromOrNull, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["null", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["null", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["null", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["null", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["null", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'derivesFromOrNil', callback: JsTypeCommander.derivesFromOrNil, allowed: [
                        { isGeneric: true, arg: { display: 'Error', getValue: () => Error }, types: ["undefined", "null", "Error", "RangeError"] },
                        { isGeneric: true, arg: { display: 'ExampleBaseClass', getValue: () => ExampleBaseClass }, types: ["undefined", "null", "ParentClass", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleChildClass', getValue: () => ExampleChildClass }, types: ["undefined", "null", "InheritedClass", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'ExampleNestedClass', getValue: () => ExampleNestedClass }, types: ["undefined", "null", "DeepInheritedClass"] },
                        { isGeneric: true, arg: { display: 'Object', getValue: () => Object }, types: ["undefined", "null", "emptyString", "whitespace", "nonWhitespace", "boolean", "zero", "nonZero", "float", "NaN", "Infinity", "function", "plainObject", "errorLike", "almostArrayLike", "ArrayLike", "Array", "emptyArray", "Error", "RangeError", "ParentClass", "InheritedClass", "DeepInheritedClass"] }
                    ]
                }, {
                    name: 'isErrorLike', callback: JsTypeCommander.isErrorLike, allowed: ["Error", "RangeError", "errorLike"]
                }
            ]
        }
    ];
    typeGuardTargetTypeArr.forEach(targetType => {
        describe(targetType.description, function() {
            targetType.functions.forEach(typeGuardFunction => {
                describe('Testing ' + typeGuardFunction.name + ' function', function() {
                    let allowSetArr: { isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[];
                    if (typeof(typeGuardFunction.allowed) == "string")
                        allowSetArr = [{ types: [typeGuardFunction.allowed] }];
                    else
                        allowSetArr = <{ isGeneric?: boolean; types: typeSpec[]; arg?: ArgumentDescriptor; }[]>typeGuardFunction.allowed.map(a => (typeof(a) == "string") ? { types: [a] } : ((Array.isArray(a)) ? { types: a } : a));
                    allowSetArr.forEach(allowSet => {
                        typeGuardTestArgumentArr.forEach(tga => {
                            let args = [];
                            let description: string = typeGuardFunction.name;
                            if (typeof(tga.value) == "undefined") {
                                if (typeof(allowSet.arg) != "undefined")
                                    return;
                                description += "(";
                            } else {
                                args.push(tga.value.getValue());
                                if (typeof(allowSet.arg) != "undefined") {
                                    if (allowSet.isGeneric)
                                        description += "<" + allowSet.arg.display + ">(" + tga.value.display;
                                    else
                                        description += "(" + tga.value.display + ", " + allowSet.arg.display;
                                    args.push(allowSet.arg.getValue());
                                }
                                else
                                    description += "(" + tga.value.display;
                            }
                            let expected: boolean = allowSet.types.filter(t => t == tga.type).length > 0;
                            it(description + ") should return " + expected, function() {
                                let result: JsTypeCommander.TAnythingAtAll = typeGuardFunction.callback.apply(this, args);
                                expect(result).to.a('boolean');
                                expect(result).to.equal(expected);
                                });
                        }, this);
                    }, this);
                });
            }, this);
        });
    }, this);
});

interface TypeConversionTargetType {

}
describe("Testing type conversion functions", function() {
    describe("Testing string conversion functions", function() {
        describe("Testing asString", function() {
    
        });
        describe("Testing toString", function() {
    
        });
        describe("Testing trimStart", function() {
    
        });
        describe("Testing trimEnd", function() {
    
        });
        describe("Testing asNormalizedWs", function() {
    
        });
        describe("Testing ucFirst", function() {
    
        });
        describe("Testing splitLines", function() {
    
        });
        describe("Testing indentText", function() {
    
        });
        describe("Testing indentLines", function() {
    
        });
    });
    describe("Testing boolean conversion functions", function() {
        describe("Testing asBoolean", function() {
    
        });
        describe("Testing toBoolean", function() {
    
        });
    });
    describe("Testing number conversion functions", function() {
        describe("Testing asNumber", function() {
    
        });
        describe("Testing toNumber", function() {
    
        });
    });
    describe("Testing Array conversion functions", function() {
        describe("Testing toArray", function() {
    
        });
        describe("Testing mapInto", function() {
    
        });
    });
    describe("Testing asErrorLike", function() {

    });
});