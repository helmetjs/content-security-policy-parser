interface PolicyResult {
  [key: string]: string[];
}

export = (policy: string): PolicyResult =>
  policy.split(';').reduce<PolicyResult>((result, directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);

    if (!directiveKey || Object.prototype.hasOwnProperty.call(result, directiveKey)) {
      return result;
    } else {
      return {
        ...result,
        [directiveKey]: directiveValue,
      };
    }
  }, {})

