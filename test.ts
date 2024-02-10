import { assertEquals } from "https://deno.land/std@0.215.0/assert/mod.ts";
import parse from "./mod.ts";

const parserTest = (
  testName: string,
  input: string,
  expected: Record<string, string[]>,
) => {
  Deno.test(testName, () => {
    assertEquals(parse(input), new Map(Object.entries(expected)));
  });
};

parserTest("parsing the empty string", "", {});

parserTest("parsing a string that just has spaces", "   ", {});

parserTest("parsing a string with one empty directive", "default-src", {
  "default-src": [],
});

parserTest(
  "parsing a string with one directive with one property",
  "default-src default.com",
  { "default-src": ["default.com"] },
);

parserTest(
  "parsing a string with one directive with two properties",
  "default-src 'self' default.com",
  { "default-src": ["'self'", "default.com"] },
);

parserTest(
  "parsing a string with multiple directives",
  "default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);

parserTest("trailing semicolon", "default-src default.com;", {
  "default-src": ["default.com"],
});

parserTest(
  "trailing semicolon with whitespace before semicolon",
  "default-src default.com ;",
  { "default-src": ["default.com"] },
);

parserTest(
  "trailing semicolon with whitespace around semicolon",
  "default-src default.com ; ",
  { "default-src": ["default.com"] },
);

parserTest(
  "gracefully handles extra semicolons",
  "default-src 'self'; script-src 'unsafe-eval' scripts.com; ; ; ;; object-src; style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);

parserTest(
  "ignores an identical directive",
  "default-src 'self'; script-src scripts.com; default-src 'none'",
  {
    "default-src": ["'self'"],
    "script-src": ["scripts.com"],
  },
);

parserTest(
  "ignores an identical directive, even when empty",
  "default-src 'self'; script-src scripts.com; default-src",
  {
    "default-src": ["'self'"],
    "script-src": ["scripts.com"],
  },
);

parserTest(
  "parsing a string with multiple directives with no spaces between semicolons",
  "default-src 'self';script-src 'unsafe-eval' scripts.com;object-src;style-src styles.biz",
  {
    "default-src": ["'self'"],
    "script-src": ["'unsafe-eval'", "scripts.com"],
    "object-src": [],
    "style-src": ["styles.biz"],
  },
);

Deno.test("parsing __proto__ as a directive", () => {
  const actual = parse("default-src 'self';__proto__ foo");

  const expected = new Map([
    ["default-src", ["'self'"]],
    ["__proto__", ["foo"]],
  ]);

  assertEquals(actual, expected);
});
