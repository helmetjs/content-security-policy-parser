interface PolicyResult {
  [key: string]: string[];
}

export = (policy: string): PolicyResult => {
  const result: PolicyResult = {};
  policy.split(";").forEach((directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
    if (directiveKey && !Object.hasOwn(result, directiveKey)) {
      result[directiveKey] = directiveValue;
    }
  });
  return result;
};
