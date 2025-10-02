# Description

> auttaja
> : helper, auxiliary, helpmate, helpmeet

Auttaja is a collection of small functions and classes that I commonly use in
my personal projects.  Purely a convenience library, nothing here should be
particularily noteworthy.

# Install

The library is available on npm.

```
npm add @ctwiebe23/auttaja
```

# Functions

## byId

```js
byId(id)
```

Alias for `document.getElementById`.

## runSafe

```js
runSafe(main)
```

Waits to run the given function until the webpage has loaded.  Used to call
main functions.

# Classes

## Attempt

Inverse of rust's `Result` monad.  I lack a concise explanation.

# See Also

- [Github](https://github.com/ctwiebe23/auttaja)
- [Online README](https://ctwiebe23.github.io/auttaja)
- [Changelog](https://ctwiebe23.github.io/auttaja/changelog)
