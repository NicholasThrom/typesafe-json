import { TypedJSON } from "./typed-json";

// After a `.is` function returns true,
// more specific descriptions of the types of a TypedJSON can be provided.
// These interfaces are for the various `.is` functions.
// Note they do not have documentation comments,
// to avoid overriding the TypedJSON documentation comments.

export interface StringJSON extends TypedJSON {
    readonly value: string;
    isString(): true;
    readonly string: string;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    readonly array: undefined;
    isObject(): false;
    readonly object: undefined;
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface NumberJSON extends TypedJSON {
    readonly value: number;
    isString(): false;
    readonly string: undefined;
    isNumber(): true;
    readonly number: number;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    readonly array: undefined;
    isObject(): false;
    readonly object: undefined;
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface BooleanJSON extends TypedJSON {
    readonly value: boolean;
    isString(): false;
    readonly string: undefined;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): true;
    readonly boolean: boolean;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    readonly array: undefined;
    isObject(): false;
    readonly object: undefined;
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface NullJSON extends TypedJSON {
    readonly value: null;
    isString(): false;
    readonly string: undefined;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): true;
    isUndefined(): false;
    isArray(): false;
    readonly array: undefined;
    isObject(): false;
    readonly object: undefined;
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface UndefinedJSON extends TypedJSON {
    readonly value: undefined;
    isString(): false;
    readonly string: undefined;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): false;
    isUndefined(): true;
    isArray(): false;
    readonly array: undefined;
    isObject(): false;
    readonly object: undefined;
    get(...keys: (string | number)[]): UndefinedJSON;
}

export interface ArrayJSON extends TypedJSON {
    readonly value: any[];
    isString(): false;
    readonly string: undefined;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): true;
    readonly array: any[];
    isObject(): false;
    readonly object: undefined;
    get(key: string, ...keys: (string | number)[]): UndefinedJSON;
}

export interface ObjectJSON extends TypedJSON {
    readonly value: { [key: string]: any; };
    isString(): false;
    readonly string: undefined;
    isNumber(): false;
    readonly number: undefined;
    isBoolean(): false;
    readonly boolean: undefined;
    isNull(): false;
    isUndefined(): false;
    isArray(): false;
    readonly array: undefined;
    isObject(): true;
    readonly object: { [key: string]: any; };
    get(key: number, ...keys: (string | number)[]): UndefinedJSON;
}
