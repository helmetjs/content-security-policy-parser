# Content Security Policy parser

Take a Content Security Policy string and parse it via
[the spec](https://w3c.github.io/webappsec-csp/#parse-serialized-policy).

Usage:

```javascript
import parseContentSecurityPolicy from "content-security-policy-parser";

parseContentSecurityPolicy(
  "default-src 'self'; script-src 'unsafe-eval' scripts.example; object-src; style-src styles.example",
);
// => Map(4) {
//      "default-src" => ["'self'"],
//      "script-src" => ["'unsafe-eval'", "scripts.example"],
//      "object-src" => [],
//      "style-src" => ["styles.example"],
//    }
```

This module is considered "complete". I expect to continue maintenance if
needed, but I don't plan to add features or make breaking changes.
