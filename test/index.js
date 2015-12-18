var parse = require('..')

var assert = require('assert')

describe('parser', function () {
  it('parses the empty string', function () {
    assert.deepEqual(parse(''), {})
  })

  it('parses a string that just has spaces', function () {
    assert.deepEqual(parse('   '), {})
  })

  it('parses a string with one empty directive', function () {
    assert.deepEqual(parse('default-src'), {
      'default-src': []
    })
  })

  it('parses a string with one directive with one property', function () {
    assert.deepEqual(parse('default-src default.com'), {
      'default-src': ['default.com']
    })
  })

  it('parses a string with one directive with two properties', function () {
    assert.deepEqual(parse("default-src 'self' default.com"), {
      'default-src': ["'self'", 'default.com']
    })
  })

  it('parses a string with multiple directives', function () {
    var policy = "default-src 'self'; script-src 'unsafe-eval' scripts.com; object-src; style-src styles.biz"

    assert.deepEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz']
    })
  })

  it('parses a string with multiple directives with no spaces between semicolons', function () {
    var policy = "default-src 'self';script-src 'unsafe-eval' scripts.com;object-src;style-src styles.biz"

    assert.deepEqual(parse(policy), {
      'default-src': ["'self'"],
      'script-src': ["'unsafe-eval'", 'scripts.com'],
      'object-src': [],
      'style-src': ['styles.biz']
    })
  })
})
