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
     * If the `json` is not valid JSON,
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
     * Prefer to access it through other methods,
     * unless you have some reason to access it directly.
     */
    public readonly value: any;

    /**
     * `true` if this TypedJSON object represents a `string`.
     */
    public get isString() {
        return typeof this.value === "string";
    }

    /**
     * The value of this TypedJSON object as a `string`,
     * or `undefined` if it is not a `string`.
     */
    public get string() {
        if (this.isString) { return this.value as string; }
    }

    /**
     * `true` if this TypedJSON object represents a `number`.
     */
    public get isNumber() {
        return typeof this.value === "number";
    }

    /**
     * The value of this TypedJSON object as a `number`,
     * or `undefined` if it is not a `number`.
     */
    public get number() {
        if (this.isNumber) { return this.value as number; }
    }

    /**
     * `true` if this TypedJSON object represents a `boolean`.
     */
    public get isBoolean() {
        return typeof this.value === "boolean";
    }

    /**
     * The value of this TypedJSON object as a `boolean`,
     * or `undefined` if it is not a `boolean`.
     */
    public get boolean() {
        if (this.isBoolean) { return this.value as boolean; }
    }

    /**
     * `true` if this TypedJSON object represents a `null`.
     *
     * There is no `.null`
     * since there is only one possible `null` value.
     */
    public get isNull() {
        return this.value === null;
    }

    /**
     * `true` if this TypedJSON object is `undefined`.
     */
    public get isUndefined() {
        return this.value === undefined;
    }

    /**
     * `true` if this TypedJSON object is a `JSONArray`.
     */
    public get isArray() {
        return Array.isArray(this.value);
    }

    /**
     * The value of this TypedJSON object as a `JSONArray`,
     * or `undefined` if it is not a `JSONArray`.
     *
     * Prefer using `.get` for access,
     * instead of accessing the `array` directly.
     */
    public get array() {
        if (this.isArray) { return this.value as any[]; }
    }

    /**
     * `true` if this TypedJSON object is a `JSONObject`.
     */
    public get isObject() {
        return !this.isArray && !this.isNull && typeof this.value === "object";
    }

    /**
     * The value of this TypedJSON object as a `JSONObject`,
     * or `undefined` if it is not a `JSONObject`.
     *
     * Prefer using `.get` for access,
     * instead of accessing the `JSONObjects` directly.
     */
    public get object() {
        if (this.isObject) { return this.value as { [key: string]: any }; }
    }

    /**
     * Gets the TypedJSON object under the specified chain of keys,
     * or the undefined TypedJSON object if it is not available.
     *
     * See `._getSingle` for
     *
     * For example,
     * ```ts
     * new TypedJSON({ a: [{ b: "c" }] }).get("a", 0, "b").string === "c";
     * ```
     * @param keys The chain of keys to the value to return.
     */
    public get(...keys: (string | number)[]) {
        let current: TypedJSON = this;
        for (const key of keys) {
            current = current._getSingle(key);
            if (current.isUndefined) { break; }
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
            const object = this.object;
            if (object) { return new TypedJSON(object[key]); }
        } else {
            const array = this.array;
            if (array) { return new TypedJSON(array[key]); }
        }

        return new TypedJSON(undefined);
    }

    /**
     * Returns a JSON `string` representing this TypedJSON object,
     * or undefined, if it is not a valid JSON object.
     */
    public stringify() {
        try {
            return JSON.stringify(this.value);
        } catch {
            return undefined;
        }
    }

}
