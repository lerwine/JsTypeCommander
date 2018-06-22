"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsTypeCommander_1 = require("../dist/JsTypeCommander");
// interface RecursiveMapCallbackFn
var source = [{ a: 1, b: 2 }, 3, 4, ["Eins", "Svein", "Drei"]];
function myCallback(current, key, source, target) {
    if (JsTypeCommander_1.JsTypeCommander.notDefined(source) || JsTypeCommander_1.JsTypeCommander.isArray(current))
        return [];
    return (JsTypeCommander_1.JsTypeCommander.isObject(current)) ? {} : current;
}
var deepClone = JsTypeCommander_1.JsTypeCommander.mapInto(source, myCallback);
var myOptions = { thisObj: { count: 0 } };
function myCallback2(current, key, source, target) {
    this.count++;
    if (JsTypeCommander_1.JsTypeCommander.notDefined(source) || JsTypeCommander_1.JsTypeCommander.isArray(current))
        return [];
    return (JsTypeCommander_1.JsTypeCommander.isObject(current)) ? {} : current;
}
deepClone = JsTypeCommander_1.JsTypeCommander.mapInto(source, myCallback2, myOptions);
// myOptions.thisObj.count == 9
// function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]
var myVar = 7;
var arrayObj = JsTypeCommander_1.JsTypeCommander.toArray(myVar);
// returns: [7]
myVar = { 0: "a", 1: 7, length: 2 };
arrayObj = JsTypeCommander_1.JsTypeCommander.toArray(myVar);
// returns: ["a", 7]
myVar = { 0: "a", 2: 7, length: 3 };
arrayObj = JsTypeCommander_1.JsTypeCommander.toArray(myVar);
// returns: ["a", undefined, 7]
myVar = { 0: "a", 2: 7, length: 3 };
arrayObj = JsTypeCommander_1.JsTypeCommander.toArray(myVar, true);
// returns: [{ 0: "a", 2: 7, length: 3 }]
// derivesFrom<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is T
var objToTest = new Error("My Error");
var result = JsTypeCommander_1.JsTypeCommander.derivesFrom(objToTest, Error);
// returns true;
result = JsTypeCommander_1.JsTypeCommander.derivesFrom(objToTest, RangeError);
// returns false;
objToTest = new RangeError();
result = JsTypeCommander_1.JsTypeCommander.derivesFrom(objToTest, Error);
// returns true;
objToTest = { message: "My Error", name: "Error" };
result = JsTypeCommander_1.JsTypeCommander.derivesFrom(objToTest, Error);
// returns false;
// function isErrorLike(obj?: TDefined): obj is ErrorLike
objToTest = new Error("My Error");
result = JsTypeCommander_1.JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = new RangeError();
result = JsTypeCommander_1.JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = { message: "My Error" };
result = JsTypeCommander_1.JsTypeCommander.isErrorLike(objToTest);
// returns true;
objToTest = { message: "My Error", number: true };
result = JsTypeCommander_1.JsTypeCommander.isErrorLike(objToTest);
// returns false;
