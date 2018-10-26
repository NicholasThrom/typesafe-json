import { assert } from "chai";
import "mocha";
import sinon = require("sinon");

import { TypedJSON } from "../src/typed-json";
import { ArrayJSON, BooleanJSON, NullJSON, NumberJSON, ObjectJSON, StringJSON, UndefinedJSON } from "../src/typed-json-interfaces";

describe("typed-json-interfaces.ts", function () {

    afterEach(function () {
        sinon.restore();
    });

    describe("StringJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON("any string");
            if (typedJSON.isString()) {
                const stringJSON: StringJSON = typedJSON;
                assert.exists(stringJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const anyString = "any string";
            const typedJSON = new TypedJSON(anyString);
            if (typedJSON.isString()) {
                const numberJSON: StringJSON = typedJSON;
                const isString: true = numberJSON.isString();
                const asString: string = numberJSON.string();
                const isNumber: false = numberJSON.isNumber();
                const asNumber: undefined = numberJSON.number();
                const isBoolean: false = numberJSON.isBoolean();
                const asBoolean: undefined = numberJSON.boolean();
                const isNull: false = numberJSON.isNull();
                const isUndefined: false = numberJSON.isUndefined();
                const isArray: false = numberJSON.isArray();
                const asArray: undefined = numberJSON.array();
                const isObject: false = numberJSON.isObject();
                const asObject: undefined = numberJSON.object();
                assert.isTrue(isString);
                assert.strictEqual(asString, anyString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isFalse(isNull);
                assert.isFalse(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("NumberJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON(0);
            if (typedJSON.isNumber()) {
                const numberJSON: NumberJSON = typedJSON;
                assert.exists(numberJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const anyNumber = 0;
            const typedJSON = new TypedJSON(anyNumber);
            if (typedJSON.isNumber()) {
                const numberJSON: NumberJSON = typedJSON;
                const isString: false = numberJSON.isString();
                const asString: undefined = numberJSON.string();
                const isNumber: true = numberJSON.isNumber();
                const asNumber: number = numberJSON.number();
                const isBoolean: false = numberJSON.isBoolean();
                const asBoolean: undefined = numberJSON.boolean();
                const isNull: false = numberJSON.isNull();
                const isUndefined: false = numberJSON.isUndefined();
                const isArray: false = numberJSON.isArray();
                const asArray: undefined = numberJSON.array();
                const isObject: false = numberJSON.isObject();
                const asObject: undefined = numberJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isTrue(isNumber);
                assert.strictEqual(asNumber, anyNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isFalse(isNull);
                assert.isFalse(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("BooleanJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON(true);
            if (typedJSON.isBoolean()) {
                const booleanJSON: BooleanJSON = typedJSON;
                assert.exists(booleanJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const anyBoolean = true;
            const typedJSON = new TypedJSON(anyBoolean);
            if (typedJSON.isBoolean()) {
                const booleanJSON: BooleanJSON = typedJSON;
                const isString: false = booleanJSON.isString();
                const asString: undefined = booleanJSON.string();
                const isNumber: false = booleanJSON.isNumber();
                const asNumber: undefined = booleanJSON.number();
                const isBoolean: true = booleanJSON.isBoolean();
                const asBoolean: boolean = booleanJSON.boolean();
                const isNull: false = booleanJSON.isNull();
                const isUndefined: false = booleanJSON.isUndefined();
                const isArray: false = booleanJSON.isArray();
                const asArray: undefined = booleanJSON.array();
                const isObject: false = booleanJSON.isObject();
                const asObject: undefined = booleanJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isTrue(isBoolean);
                assert.strictEqual(asBoolean, anyBoolean);
                assert.isFalse(isNull);
                assert.isFalse(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("NullJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON(null);
            if (typedJSON.isNull()) {
                const nullJSON: NullJSON = typedJSON;
                assert.exists(nullJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const typedJSON = new TypedJSON(null);
            if (typedJSON.isNull()) {
                const nullJSON: NullJSON = typedJSON;
                const isString: false = nullJSON.isString();
                const asString: undefined = nullJSON.string();
                const isNumber: false = nullJSON.isNumber();
                const asNumber: undefined = nullJSON.number();
                const isBoolean: false = nullJSON.isBoolean();
                const asBoolean: undefined = nullJSON.boolean();
                const isNull: true = nullJSON.isNull();
                const isUndefined: false = nullJSON.isUndefined();
                const isArray: false = nullJSON.isArray();
                const asArray: undefined = nullJSON.array();
                const isObject: false = nullJSON.isObject();
                const asObject: undefined = nullJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isTrue(isNull);
                assert.isFalse(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("UndefinedJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON(undefined);
            if (typedJSON.isUndefined()) {
                const undefinedJSON: UndefinedJSON = typedJSON;
                assert.exists(undefinedJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const typedJSON = new TypedJSON(undefined);
            if (typedJSON.isUndefined()) {
                const undefinedJSON: UndefinedJSON = typedJSON;
                const isString: false = undefinedJSON.isString();
                const asString: undefined = undefinedJSON.string();
                const isNumber: false = undefinedJSON.isNumber();
                const asNumber: undefined = undefinedJSON.number();
                const isBoolean: false = undefinedJSON.isBoolean();
                const asBoolean: undefined = undefinedJSON.boolean();
                const isNull: false = undefinedJSON.isNull();
                const isUndefined: true = undefinedJSON.isUndefined();
                const isArray: false = undefinedJSON.isArray();
                const asArray: undefined = undefinedJSON.array();
                const isObject: false = undefinedJSON.isObject();
                const asObject: undefined = undefinedJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isFalse(isNull);
                assert.isTrue(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("ArrayJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON([]);
            if (typedJSON.isArray()) {
                const arrayJSON: ArrayJSON = typedJSON;
                assert.exists(arrayJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const anyArray: any[] = [];
            const typedJSON = new TypedJSON(anyArray);
            if (typedJSON.isArray()) {
                const arrayJSON: ArrayJSON = typedJSON;
                const isString: false = arrayJSON.isString();
                const asString: undefined = arrayJSON.string();
                const isNumber: false = arrayJSON.isNumber();
                const asNumber: undefined = arrayJSON.number();
                const isBoolean: false = arrayJSON.isBoolean();
                const asBoolean: undefined = arrayJSON.boolean();
                const isNull: false = arrayJSON.isNull();
                const isUndefined: false = arrayJSON.isUndefined();
                const isArray: true = arrayJSON.isArray();
                const asArray: any[] = arrayJSON.array();
                const isObject: false = arrayJSON.isObject();
                const asObject: undefined = arrayJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isFalse(isNull);
                assert.isFalse(isUndefined);
                assert.isTrue(isArray);
                assert.strictEqual(asArray, anyArray);
                assert.isFalse(isObject);
                assert.isUndefined(asObject);
            } else {
                assert.fail();
            }
        });

    });

    describe("ObjectJSON", function () {

        it("is inferred for the correct type check", function () {
            const typedJSON = new TypedJSON({});
            if (typedJSON.isObject()) {
                const objectJSON: ObjectJSON = typedJSON;
                assert.exists(objectJSON);
            } else {
                assert.fail();
            }
        });

        it("allows correct type inference", function () {
            const anyObject = {};
            const typedJSON = new TypedJSON(anyObject);
            if (typedJSON.isObject()) {
                const objectJSON: ObjectJSON = typedJSON;
                const isString: false = objectJSON.isString();
                const asString: undefined = objectJSON.string();
                const isNumber: false = objectJSON.isNumber();
                const asNumber: undefined = objectJSON.number();
                const isBoolean: false = objectJSON.isBoolean();
                const asBoolean: undefined = objectJSON.boolean();
                const isNull: false = objectJSON.isNull();
                const isUndefined: false = objectJSON.isUndefined();
                const isArray: false = objectJSON.isArray();
                const asArray: undefined = objectJSON.array();
                const isObject: true = objectJSON.isObject();
                const asObject: { [key: string]: any; } = objectJSON.object();
                assert.isFalse(isString);
                assert.isUndefined(asString);
                assert.isFalse(isNumber);
                assert.isUndefined(asNumber);
                assert.isFalse(isBoolean);
                assert.isUndefined(asBoolean);
                assert.isFalse(isNull);
                assert.isFalse(isUndefined);
                assert.isFalse(isArray);
                assert.isUndefined(asArray);
                assert.isTrue(isObject);
                assert.strictEqual(asObject, anyObject);
            } else {
                assert.fail();
            }
        });

    });

});
