import assert = require("node:assert/strict");
import parse = require("./index");

const test = (
  message: string,
  input: string,
  expected: Record<string, string[]>,
) => {
  assert.deepStrictEqual(parse(input), expected, message);
};

test("parsing the empty string", "", {});

test("parsing a string that just has spaces", "   ", {});

test("parsing a string with one empty directive", "default-src", {
  "default-src": [],
});

test(
  "parsing a string with one directive with one property",
  "default-src default.com",
  { "default-src": ["default.com"] },
);

test(
  "parsing a string with one directive with two properties",
  "default-src 'self' default.com",
  { "default-src": ["'self'", "default.com"] },
);

test(
  "parsing a string with multiple directives",
  "default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);

test("trailing semicolon", "default-src default.com;", {
  "default-src": ["default.com"],
});

test(
  "trailing semicolon with whitespace before semicolon",
  "default-src default.com ;",
  { "default-src": ["default.com"] },
);

test(
  "trailing semicolon with whitespace around semicolon",
  "default-src default.com ; ",
  { "default-src": ["default.com"] },
);

test(
  "gracefully handles extra semicolons",
  "default-src 'self'; script-src 'unsafe-eval' scripts.com; ; ; ;; object-src; style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);

test(
  "ignores an identical directive",
  "default-src 'self'; script-src scripts.com; default-src 'none'",
  {
    "default-src": ["'self'"],
    "script-src": ["scripts.com"],
  },
);

test(
  "ignores an identical directive, even when empty",
  "default-src 'self'; script-src scripts.com; default-src",
  {
    "default-src": ["'self'"],
    "script-src": ["scripts.com"],
  },
);

test(
  "parsing a string with multiple directives with no spaces between semicolons",
  "default-src 'self';script-src 'unsafe-eval' scripts.com;object-src;style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);
