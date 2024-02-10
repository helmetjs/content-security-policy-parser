type ParsedContentSecurityPolicy = Map<string, string[]>;

export default function parseContentSecurityPolicy(
  policy: string,
): ParsedContentSecurityPolicy {
  const result: ParsedContentSecurityPolicy = new Map();
  policy.split(";").forEach((directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
    if (
      directiveKey &&
      !result.has(directiveKey)
    ) {
      result.set(directiveKey, directiveValue);
    }
  });
  return result;
}
