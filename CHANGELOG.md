# Changelog

## next
\+ Add type information to `.is` checks.<br/>
\+ Add `.toString()`.<br/>
\* Replaced computed properties with methods.<br/>
\* Improve documentation.<br/>

### Breaking changes

All computed properties are now methods.

Instead of
`.isString`, `.isNumber`, `.isBoolean`, `.isNull`, `.isUndefined`, `.isObject`, `.isArray`,
`.string`, `.number`, `.boolean`, `.object`, and `.array`
use
`.isString()`, `.isNumber()`, `.isBoolean()`, `.isNull()`, `.isUndefined()`, `.isObject()`, `.isArray()`,
`.string()`, `.number()`, `.boolean()`, `.object()`, and `.array()`.

Note that in some cases this change will _not_ cause a compiler error
(e.g. `if (typedJSON.isNumber)` always succeeds)
so be sure to check every use.

This was forced by the fact that computed properties
cannot return type information,
and encouraged by the fact that computed properties
are not very compatible.

## 0.1.0
\+ Add TypedJSON class.<br/>
