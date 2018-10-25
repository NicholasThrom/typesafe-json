# Changelog

## next
\+ Add type information to `.is` checks.<br/>

### Breaking changes

All `.is` checks have been changed
from computed properties to methods.

Instead of
`.isString`, `.isNumber`, `.isBoolean`, `.isNull`, `.isUndefined`, `.isObject`, and `.isArray`,
use
`.isString()`, `.isNumber()`, `.isBoolean()`, `.isNull()`, `.isUndefined()`, `.isObject()`, and `.isArray()`.

Note that in some cases this change will _not_ cause a compiler error
(e.g. `if (typedJSON.isNumber)` always succeeds)
so each case should be checked by hand.

This was forced by the fact that computed properties
cannot return type information.

## 0.1.0
\+ Add TypedJSON class.<br/>
