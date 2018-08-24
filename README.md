# typesafe-json

An easy, typesafe way to handle JSON.

Accessing JSON in TypeScript (or safely in JavaScript) is a nuisance.
You need to check for undefined every step of the way
and check the type is correct before you can use it.
This module is designed to reduce that boilerplate,
making it more concise, readable, and reliable.

## Example

```ts
const json = `{"a":[0,{"b":["c","d"]}]}`;

let c = TypedJSON.parse(json).get("a", 1, "b", 0).string;
if (c !== undefined) {
    // c is guaranteed to be a string
}

let e = TypedJSON.parse(json).get("z", 99, "x", 12).number;
if (e === undefined) {
    // No errors are thrown
}
```

## Installation

Run `npm i typesafe-json` in your project.

Type information is included automatically,
`npm i @types/typesafe-json` is neither needed nor possible.

## Use

```ts
// Importing in TypeScript
import { TypedJSON } from "typesafe-json";
// or in JavaScript
const TypedJSON = require("typesafe-json").TypedJSON;

// A TypedJSON object can be parsed from JSON,
const typedJSON1 = TypedJSON.parse(`{"a":[0,{"b":["c","d"]}]}`);
// or from any JavaScript value.
const typedJSON2 = new TypedJSON({a:[0,{b:["c","d"]}]});
const typedJSON3 = new TypedJSON(12);

// .get returns another TypedJSON object.
const typedJSON4 = typedJSON1.get("a", 1, "b");
const typedJSON5 = typedJSON4.get(0);

// The value of a TypedJSON object can be accessed like so.
// Accessors return `undefined` if the TypedJSON object
// does not contain the correct type.
const number = typedJSON5.number; // undefined
const string = typedJSON5.string; // "c"
const boolean = typedJSON5.boolean; // undefined
// .object and .array also exist, but are not recommended.
// Instead, use .get().

// Checks exists to check the type without getting the value:
const isNumber = typedJSON5.isNumber // false
const isString = typedJSON5.isString // true
const isBoolean = typedJSON5.isBoolean // false
const isArray = typedJSON5.isArray // false
const isObject = typedJSON5.isObject // false
const isNull = typedJSON5.isNull // false
const isUndefined = typedJSON5.isUndefined // false

// Invalid operations return either `undefined`
// or a TypedJSON containing `undefined.
const invalidJSON = TypedJSON.parse("invalid json");
invalidJSON.isUndefined // true
invalidJSON.get("a", 1, "b", 2).isUndefined // true
invalidJSON.number // undefined
invalidJSON.stringify() // undefined

// .stringify() returns the JSON representation string
// of the TypedJSON object, or undefined if it cannot.
// .value is the underlying value of the TypedJSON object,
// and usually should not be used.
```

More detailed documentation can be found in documentation comments.

## Links

[Repository](https://github.com/NicholasThrom/typesafe-json)<br/>
[Issues](https://github.com/NicholasThrom/typesafe-json/issues)<br/>
[Changelog](https://github.com/NicholasThrom/typesafe-json/blob/master/CHANGELOG.md)<br/>
