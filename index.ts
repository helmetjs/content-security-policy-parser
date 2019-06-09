interface PolicyResult {
  [key: string]: string[];
}

export = function (policy: string) {
  return policy.split(';').reduce<PolicyResult>((result, directive) => {
    const trimmed = directive.trim();
    if (!trimmed) {
      return result;
    }

    const split = trimmed.split(/\s+/g);
    const key = split.shift() as string;

    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = split;
    }

    return result;
  }, {});
}
