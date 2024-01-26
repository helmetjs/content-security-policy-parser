interface PolicyResult {
  [key: string]: string[];
}

export = (policy: string): PolicyResult => {
  const result: PolicyResult = {};
  policy.split(";").forEach((directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
    if (directiveKey && !Object.hasOwn(result, directiveKey)) {
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
