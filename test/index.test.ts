import parse = require('..');

describe('parser', () => {
  it('parses the empty string', () => {
    expect(parse('')).toStrictEqual({});
  });

  it('parses a string that just has spaces', () => {
    expect(parse('   ')).toStrictEqual({});
  });

  it('parses a string with one empty directive', () => {
    expect(parse('default-src')).toStrictEqual({
      'default-src': [],
    });
  });

  it('parses a string with one directive with one property', () => {
    expect(parse('default-src default.com')).toStrictEqual({
      'default-src': ['default.com'],
    });
  });

  it('parses a string with one directive with two properties', () => {
    expect(parse("default-src 'self' default.com")).toStrictEqual({
      'default-src': ["'self'", 'default.com'],
    });
  });

  it('parses a string with multiple directives', () => {
    const policy = "default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz";

    expect(parse(policy)).toStrictEqual({
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz'],
    });
  });

  it('handles trailing semicolons', () => {
    const expected = {
      'default-src': ['default.com'],
    };

    expect(parse('default-src default.com;')).toStrictEqual(expected);
    expect(parse('default-src default.com ;')).toStrictEqual(expected);
    expect(parse('default-src default.com ; ')).toStrictEqual(expected);
  });

  it('gracefully handles extra semicolons', () => {
    const policy = "default-src 'self'; script-src 'unsafe-eval' scripts.com; ; ; ;; object-src; style-src styles.biz";

    expect(parse(policy)).toStrictEqual({
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz'],
    });
  });

  it('ignores an identical directive', () => {
    const policy = "default-src 'self'; script-src scripts.com; default-src 'none'";

    expect(parse(policy)).toStrictEqual({
      'default-src': ["'self'"],
      'script-src': ['scripts.com'],
    });
  });

  it('ignores an identical directive, even when empty', () => {
    const policy = "default-src 'self'; script-src scripts.com";

    expect(parse(policy)).toStrictEqual({
      'default-src': ["'self'"],
      'script-src': ['scripts.com'],
    });
  });

  it('parses a string with multiple directives with no spaces between semicolons', () => {
    const policy = "default-src 'self';script-src 'unsafe-eval' scripts.com;object-src;style-src styles.biz";

    expect(parse(policy)).toStrictEqual({
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz'],
    });
  });
});
