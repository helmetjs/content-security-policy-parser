import { assertEquals } from "https://deno.land/std@0.215.0/assert/mod.ts";
import parse from "./mod.ts";

type TestCase = {
  inputs: string[];
  expected: Map<string, string[]> | Record<string, string[]>;
};

const ASCII_WHITESPACE_CHARS = ["\t", "\n", "\f", "\r", " "];

const testCases: Record<string, TestCase> = {
  "empty/blank strings": {
    inputs: [
      "",
      ...ASCII_WHITESPACE_CHARS,
      ...ASCII_WHITESPACE_CHARS.map((c) => c.repeat(3)),
    ],
    expected: {},
  },

  "one empty directive": {
    inputs: [
      "default-src",
      " default-src ",
      "default-src;",
      "default-src ;",
      ";;\t;default-src;\f;;",
    ],
    expected: { "default-src": [] },
  },

  "one directive, one value": {
    inputs: [
      "default-src default.example",
      "default-src \t\ndefault.example",
      ";default-src default.example;",
    ],
    expected: { "default-src": ["default.example"] },
  },

  "one directive, two values": {
    inputs: [
      "default-src 'self' default.example",
      "default-src\r'self'\tdefault.example",
    ],
    expected: { "default-src": ["'self'", "default.example"] },
  },

  "multiple directives": {
    inputs: [
      "default-src 'self'; script-src 'unsafe-eval' scripts.example; object-src; style-src styles.example",
      "default-src 'self';script-src 'unsafe-eval' scripts.example;object-src;style-src styles.example",
    ],
    expected: {
      "default-src": ["'self'"],
      "script-src": ["'unsafe-eval'", "scripts.example"],
      "object-src": [],
      "style-src": ["styles.example"],
    },
  },

  "non-ASCII directives": {
    inputs: [
      "default-src default.example;\u0080;style-src style.example",
      "default-src default.example;script-src \u0080;style-src style.example",
      "default-src default.example;\u0080 other.example;style-src style.example",
      // These are considered spaces by JavaScript but not by the CSP spec.
      "default-src default.example;\ufeff;style-src style.example",
      "default-src default.example;\u200a;style-src style.example",
      "default-src default.example;\u3000;style-src style.example",
    ],
    expected: {
      "default-src": ["default.example"],
      "style-src": ["style.example"],
    },
  },

  "vertical tabs": {
    inputs: ["\vdefault-src default1.example\vdefault2.example"],
    expected: { "\vdefault-src": ["default1.example\vdefault2.example"] },
  },

  "__proto__": {
    inputs: ["default-src 'self';__proto__ foo"],
    expected: new Map([
      ["default-src", ["'self'"]],
      ["__proto__", ["foo"]],
    ]),
  },

  "downcasing directive names": {
    inputs: [
      "DEFAULT-SRC DEFAULT.EXAMPLE",
      "default-SRC DEFAULT.EXAMPLE",
      "Default-Src DEFAULT.EXAMPLE",
    ],
    expected: { "default-src": ["DEFAULT.EXAMPLE"] },
  },

  "duplicate directive names": {
    inputs: [
      "default-src default.example; script-src script.example; script-src",
      "default-src default.example; script-src script.example; script-src script.example",
      "default-src default.example; script-src script.example; script-src ignored.example",
      "default-src default.example; script-src script.example; SCRIPT-SRC ignored.example",
    ],
    expected: {
      "default-src": ["default.example"],
      "script-src": ["script.example"],
    },
  },
};

Object.entries(testCases).forEach(
  ([testName, { inputs, expected: rawExpected }]) => {
    Deno.test(testName, () => {
      const expected = rawExpected instanceof Map
        ? rawExpected
        : new Map(Object.entries(rawExpected));
      for (const input of inputs) {
        const actual = parse(input);
        assertEquals(actual, expected, `Parsing ${input}`);
      }
    });
  },
);
