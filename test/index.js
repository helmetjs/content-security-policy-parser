var parse = require('..')

var assert = require('assert')

describe('parser', function () {
  it('parses the empty string', function () {
    assert.deepStrictEqual(parse(''), {})
  })

  it('parses a string that just has spaces', function () {
    assert.deepStrictEqual(parse('   '), {})
  })

  it('parses a string with one empty directive', function () {
    assert.deepStrictEqual(parse('default-src'), {
      'default-src': []
    })
  })

  it('parses a string with one directive with one property', function () {
    assert.deepStrictEqual(parse('default-src default.com'), {
      'default-src': ['default.com']
    })
  })

  it('parses a string with one directive with two properties', function () {
    assert.deepStrictEqual(parse("default-src 'self' default.com"), {
      'default-src': ["'self'", 'default.com']
    })
  })

  it('parses a string with multiple directives', function () {
    var policy = "default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz"

    assert.deepStrictEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz']
    })
  })

  it('handles trailing semicolons', function () {
    var expected = {
      'default-src': ['default.com']
    }

    assert.deepStrictEqual(parse('default-src default.com;'), expected)
    assert.deepStrictEqual(parse('default-src default.com ;'), expected)
    assert.deepStrictEqual(parse('default-src default.com ; '), expected)
  })

  it('gracefully handles extra semicolons', function () {
    var policy = "default-src 'self'; script-src 'unsafe-eval' scripts.com; ; ; ;; object-src; style-src styles.biz"

    assert.deepStrictEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz']
    })
  })

  it('ignores an identical directive', function () {
    var policy = "default-src 'self'; script-src scripts.com; default-src 'none'"

    assert.deepStrictEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ['scripts.com']
    })
  })

  it('ignores an identical directive, even when empty', function () {
    var policy = "default-src 'self'; script-src scripts.com"

    assert.deepStrictEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ['scripts.com']
    })
  })

  it('parses a string with multiple directives with no spaces between semicolons', function () {
    var policy = "default-src 'self';script-src 'unsafe-eval' scripts.com;object-src;style-src styles.biz"

    assert.deepStrictEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz']
    })
  })
})
