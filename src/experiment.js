var map = new Map([[1, 2], [3, 4]]);
var wm = new WeakMap();
var error = new RangeError();
var p = Object.getPrototypeOf(Object.getPrototypeOf(error));
console.log(map instanceof WeakMap);