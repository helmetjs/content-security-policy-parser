# Content Security Policy parser

Take a Content Security Policy string and parse it.

Usage:

```javascript
const parse = require("content-security-policy-parser");

parse(
  "default-src 'self'; script-src 'unsafe-eval' scripts.example; object-src; style-src styles.example",
);
// => Map(X) {
//      "default-src" => ["'self'"],
//      "script-src" => ["'unsafe-eval'", "scripts.example"],
//      "object-src" => [],
//      "style-src" => ["styles.example"],
//    }
```

This module is considered "complete". I expect to continue maintenance if
needed, but I don't plan to add features or make breaking changes.
