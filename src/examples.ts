import { JsTypeCommander } from '../dist/JsTypeCommander';

// interface RecursiveMapCallbackFn
let source: any[] = [{a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]];
function myCallback(current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) {
    if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
        return [];
    return (JsTypeCommander.isObject(current)) ? { } : current;
}
let deepClone = JsTypeCommander.mapInto(source, myCallback);

interface IMyThis { count: number }
let myOptions: JsTypeCommander.MapIntoOptions = { thisObj: <IMyThis> { count: 0 } };
function myCallback2(this: IMyThis, current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) {
    this.count++;
    if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
        return [];
    return (JsTypeCommander.isObject(current)) ? { } : current;
}
deepClone = JsTypeCommander.mapInto(source, myCallback2, myOptions);
// myOptions.thisObj.count == 9

// function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]
let myVar: any = 7;
let arrayObj = JsTypeCommander.toArray(myVar);
// returns: [7]
myVar = { 0: "a", 1: 7, length: 2 };
arrayObj = JsTypeCommander.toArray(myVar);
// returns: ["a", 7]
myVar = { 0: "a", 2: 7, length: 3 };
arrayObj = JsTypeCommander.toArray(myVar);
// returns: ["a", undefined, 7]
myVar = { 0: "a", 2: 7, length: 3 };
arrayObj = JsTypeCommander.toArray(myVar, true);
// returns: [{ 0: "a", 2: 7, length: 3 }]

// derivesFrom<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is T
let objToTest: any = new Error("My Error");
let result: boolean = JsTypeCommander.derivesFrom(objToTest, Error);
// returns true;
result = JsTypeCommander.derivesFrom(objToTest, RangeError);
// returns false;
objToTest = new RangeError();
result = JsTypeCommander.derivesFrom(objToTest, Error);
// returns true;
objToTest = { message: "My Error", name: "Error" };
result = JsTypeCommander.derivesFrom(objToTest, Error);
// returns false;

// function isErrorLike(obj?: TDefined): obj is ErrorLike
objToTest = new Error("My Error");
result = JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = new RangeError();
result = JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = { message: "My Error" };
result = JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = { message: "My Error", number: true };
result = JsTypeCommander.isErrorLike(objToTest);
// returns false;

