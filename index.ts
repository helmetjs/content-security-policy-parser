interface PolicyResult {
  [key: string]: string[];
}

export = (policy: string): PolicyResult => {
  const result: PolicyResult = {};
  // Directive values are split with 1 or more ASCII whitespace characters.
  // https://w3c.github.io/webappsec-csp/#framework-infrastructure
  const asciiWhitespaceGreedy = /[\t\n\f\r ]+/g;
  policy.split(";").forEach((directive) => {
    // Trim trailing and leading ASCII whitespace, and split directives.
    const [directiveKey, ...directiveValue] = directive
      .replace(/^[\t\n\f\r ]+/, "")
      .replace(/[\t\n\f\r ]+$/, "")
      .split(asciiWhitespaceGreedy);
    if (
      directiveKey &&
      !Object.prototype.hasOwnProperty.call(result, directiveKey)
    ) {
      if (directiveKey === "__proto__") {
        Object.defineProperty(result, directiveKey, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: directiveValue,
        });
      } else {
        result[directiveKey] = directiveValue;
      }
    }
  });
  return result;
};
