import { TypedJSON } from "./typed-json";

// After a `.is` function returns `true`,
// more specific descriptions of the types of a `TypedJSON` object can be provided.
// These interfaces are for the various `.is` functions.
// Note they do not have documentation comments,
// to avoid overriding the `TypedJSON` documentation comments.

export interface StringJSON extends TypedJSON {
    readonly value: string;
    isString(): true;
    string(): string;
    isNumber(): false;
    number(): undefined;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    array(): undefined;
    isObject(): false;
    object(): undefined;
    keys(): never[];
    values(): never[];
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface NumberJSON extends TypedJSON {
    readonly value: number;
    isString(): false;
    string(): undefined;
    isNumber(): true;
    number(): number;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    array(): undefined;
    isObject(): false;
    object(): undefined;
    keys(): never[];
    values(): never[];
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface BooleanJSON extends TypedJSON {
    readonly value: boolean;
    isString(): false;
    string(): undefined;
    isNumber(): false;
    number(): undefined;
    isBoolean(): true;
    boolean(): boolean;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    array(): undefined;
    isObject(): false;
    object(): undefined;
    keys(): never[];
    values(): never[];
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface NullJSON extends TypedJSON {
    readonly value: null;
    isString(): false;
    string(): undefined;
    isNumber(): false;
    number(): undefined;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): true;
    isUndefined(): false;
    isArray(): false;
    array(): undefined;
    isObject(): false;
    object(): undefined;
    keys(): never[];
    values(): never[];
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface UndefinedJSON extends TypedJSON {
    readonly value: undefined;
    isString(): false;
    string(): undefined;
    isNumber(): false;
    number(): undefined;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): false;
    isUndefined(): true;
    isArray(): false;
    array(): undefined;
    isObject(): false;
    object(): undefined;
    keys(): never[];
    values(): never[];
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface ArrayJSON extends TypedJSON {
    readonly value: any[];
    isString(): false;
    string(): undefined;
    isNumber(): false;
    number(): undefined;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): true;
    array(): any[];
    isObject(): false;
    object(): undefined;
    keys(): number[];
    values(): TypedJSON[];
    get(key: string, ...keys: (string | number)[]): UndefinedJSON;
}

export interface ObjectJSON extends TypedJSON {
    readonly value: { [key: string]: any; };
    isString(): false;
    string(): undefined;
    isNumber(): false;
    number(): undefined;
    isBoolean(): false;
    boolean(): undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    array(): undefined;
    isObject(): true;
    object(): { [key: string]: any; };
    keys(): string[];
    values(): TypedJSON[];
    get(key: number, ...keys: (string | number)[]): UndefinedJSON;
}
