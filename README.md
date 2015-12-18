Content Security Policy parser
==============================
[![Build Status](https://travis-ci.org/helmetjs/content-security-policy-parser.svg?branch=master)](https://travis-ci.org/helmetjs/content-security-policy-parser)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Take a Content Security Policy string and parse it.

Usage:

```javascript
var parse = require('content-security-policy-parser')

parse("default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz")
/*
{
  'default-src': ["'self'"],
  'script-src': ["'unsafe-eval'", 'scripts.com'],
  'object-src': [],
  'style-src': ['styles.biz']
}
*/
```
