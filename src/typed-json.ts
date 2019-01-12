import {
    ArrayJSON,
    BooleanJSON,
    NullJSON,
    NumberJSON,
    ObjectJSON,
    StringJSON,
    UndefinedJSON,
} from "./typed-json-interfaces";

/**
 * A type-safe representation of JSON data.
 *
 * This class helps avoid having to repeated type-check every step of the way
 * when accessing a value nested in JSON.
 *
 * For example,
 * ```ts
 *  const key = TypedJSON.parse(json).get("secrets", 3, "key").string;
 *  if (key) {
 *      // go
 *  }
 * ```
 *
 * This can also be used to access other values of type `any` in a typesafe way.
 */
export class TypedJSON {

    /**
     * Parses the passed `json` to produce a TypedJSON object.
     *
     * If `json` is not valid JSON,
     * returns a TypedJSON object containing `undefined`.
     *
     * For example
     * ``TypedJSON.parse(`{ "a": [{ "b": "c" }] }`).get("a", 0, "b").string === "c";``
     *
     * @param json The JSON `string` to parse.
     */
    public static parse(json: string) {
        try {
            return new TypedJSON(JSON.parse(json));
        } catch {
            return new TypedJSON(undefined);
        }
    }

    /**
     * Constructs a new TypedJSON object with the specified `value`.
     *
     * If `value` is a `string`, it is **not** parsed.
     * Use `TypedJSON.parse` for that.
     */
    public constructor(value: any) {
        this.value = value;
    }

    /**
     * The raw JS object underlying this value.
     *
     * Should be of type `unknown`,
     * but is of type `any` for backwards compatibility reasons.
     *
     * Prefer to access it through other methods,
     * unless you have some reason to access it directly.
     */
    public readonly value: any;

    /**
     * `true` if this TypedJSON object represents a `string`.
     */
    public isString(): this is StringJSON {
        return typeof this.value === "string";
    }

    /**
     * The value of this TypedJSON object as a `string`,
     * or `undefined` if it is not a `string`.
     */
    public string() {
        if (this.isString()) { return this.value as string; }
    }

    /**
     * `true` if this TypedJSON object represents a `number`.
     */
    public isNumber(): this is NumberJSON {
        return typeof this.value === "number";
    }

    /**
     * The value of this TypedJSON object as a `number`,
     * or `undefined` if it is not a `number`.
     */
    public number() {
        if (this.isNumber()) { return this.value as number; }
    }

    /**
     * `true` if this TypedJSON object represents a `boolean`.
     */
    public isBoolean(): this is BooleanJSON {
        return typeof this.value === "boolean";
    }

    /**
     * The value of this TypedJSON object as a `boolean`,
     * or `undefined` if it is not a `boolean`.
     */
    public boolean() {
        if (this.isBoolean()) { return this.value as boolean; }
    }

    /**
     * `true` if this TypedJSON object represents a `null`.
     *
     * There is no `.null`
     * since there is only one possible `null` value.
     */
    public isNull(): this is NullJSON {
        return this.value === null;
    }

    /**
     * `true` if this TypedJSON object is `undefined`.
     *
     * There is no `.undefined`
     * since there is only one possible `undefined` value.
     */
    public isUndefined(): this is UndefinedJSON {
        return this.value === undefined;
    }

    /**
     * `true` if this TypedJSON object is a array.
     */
    public isArray(): this is ArrayJSON {
        return Array.isArray(this.value);
    }

    /**
     * The value of this TypedJSON object as an array,
     * or `undefined` if it is not an array.
     *
     * Prefer using `.get` for access,
     * instead of using the array directly.
     */
    public array() {
        if (this.isArray()) { return this.value as any[]; }
    }

    /**
     * `true` if this TypedJSON object is an object.
     */
    public isObject(): this is ObjectJSON {
        return !this.isArray() && !this.isNull() && typeof this.value === "object";
    }

    /**
     * The value of this TypedJSON object as an object,
     * or `undefined` if it is not an object.
     *
     * Prefer using `.get` for access,
     * instead of using the object directly.
     */
    public object() {
        if (this.isObject()) { return this.value as { [key: string]: any }; }
    }

    /**
     * Gets the TypedJSON object under the specified chain of keys,
     * or a TypedJSON object containing `undefined` if it is not available.
     *
     * For example,
     * ```ts
     * new TypedJSON({ a: [{ b: "c" }] }).get("a", 0, "b").string === "c";
     * ```
     *
     * Only `string` keys can be used on TypedJSON objects with `.isObject`,
     * and only `number` keys can be used on TypedJSON objects with `.isArray`.
     *
     * Note that `({ 1: 1 })["1"] === 1`,
     * so number-keyed objects can still be accessed via strings.
     *
     * @param keys The chain of keys to the value to return.
     */
    public get(...keys: (string | number)[]): TypedJSON {
        let current: TypedJSON = this;
        for (const key of keys) {
            current = current._getSingle(key);
            if (current.isUndefined()) { break; }
        }
        return current;
    }

    /**
     * Prefer `.get`.
     *
     * Gets the TypedJSON object under the specified `key`,
     * or a TypedJSON object containing `undefined` if it is not available.
     *
     * For example,
     * ```ts
     * TypedJSON.parse("[0, 1, 2]")._getSingle(1) === 1;
     * TypedJSON.parse(`{ a: "a", b: "b" }`)._getSingle("a").string === "a";
     * ```
     *
     * Only `string` keys can be used if this TypedJSON object `.isObject`,
     * and only `number` keys can be used if this TypedJSON object `.isArray`.
     *
     * Note that `({ 1: 1 })["1"] === 1`,
     * so number-keyed objects can still be accessed via strings.
     *
     * @param key The key of the value to return.
     */
    private _getSingle(key: string | number) {
        if (typeof key === "string") {
            const object = this.object();
            if (object) { return new TypedJSON(object[key]); }
        } else {
            const array = this.array();
            if (array) { return new TypedJSON(array[key]); }
        }

        return new TypedJSON(undefined);
    }

    /**
     * Returns an array of the keys of this TypedJSON object.
     *
     * This array is a `string[]` if this TypedJSON is an `object`,
     * a `number[]` if this TypedJSON is an array,
     * or an empty array if this TypedJSON is anything else.
     *
     * If this TypedJSON's value is an array
     * with some `string` or `Symbol` keys,
     * these keys are ignored.
     *
     * If this TypedJSON's value is an object
     * with some `Symbol` keys,
     * these keys are ignored.
     *
     * The type is `(string | number)[]`
     * instead of `string[] | number[]`
     * because functions such as `sort` and `map`
     * have difficulties with `string[] | number[]`.
     *
     * Useful for iterating through TypedJSON objects.
     * For example,
     * ```ts
     *  for (const key of typedJSON.keys()) {
     *      const value = typedJSON.get(value);
     *      // Do something with `key` and `value`
     *  }
     * ```
     *
     * Use `.values()` to get an array of only values
     * if only values are needed instead.
     */
    public keys(): (string | number)[] {
        const asObject = this.object();
        if (asObject) {
            return Object.keys(asObject);
        }

        const asArray = this.array();
        if (asArray) {
            return Object.keys(asArray)
                .map((key) => {
                    return parseInt(key, 10);
                })
                .filter((key) => !isNaN(key))
                .sort((a, b) => a - b);
        }

        return [];
    }

    /**
     * Returns an array TypedJSON objects
     * containing the values of this TypedJSON.
     *
     * If this TypedJSON is an `object`,
     * it returns the values of the `object` wrapped in TypedJSON objects.
     * If this TypedJSON is an `array`,
     * it returns the values of the `array` wrapped in TypedJSON objects.
     * Otherwise, it returns an empty array.
     *
     * If this TypedJSON holds an array with nonnumeric keys,
     * those values are omitted.
     *
     * Useful for iterating through TypedJSON objects.
     * For example,
     * ```ts
     *  for (const value of typedJSON.value()) {
     *      // Do something with the `value`
     *  }
     * ```
     *
     * Use `.keys()` if the keys are needed instead of the values.
     */
    public values(): TypedJSON[] {
        return this.keys().map((key) => this.get(key));
    }

    /**
     * Returns a JSON string representing this TypedJSON object,
     * or undefined, if it is not a valid JSON object.
     */
    public stringify() {
        try {
            return JSON.stringify(this.value);
        } catch {
            return undefined;
        }
    }

    /**
     * Returns a string representation of this TypedJSON object.
     *
     * This will **not** return JSON.
     * It is for debug purposes only,
     * and should not be parsed.
     *
     * To get JSON, use `.stringify()`.
     */
    public toString() {
        return `TypedJSON <${this.stringify()}>`;
    }

}

export {
    ArrayJSON,
    BooleanJSON,
    NullJSON,
    NumberJSON,
    ObjectJSON,
    StringJSON,
    UndefinedJSON,
} from "./typed-json-interfaces";
