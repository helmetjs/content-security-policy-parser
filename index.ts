interface PolicyResult {
  [key: string]: string[];
}

export = (policy: string): PolicyResult => {
  const result: PolicyResult = {};
  policy.split(";").forEach((directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
    if (
      directiveKey &&
      !Object.prototype.hasOwnProperty.call(result, directiveKey)
    ) {
      result[directiveKey] = directiveValue;
    }
  });
  return result;
};
