module.exports = function (policy) {
  return policy.split(';').reduce(function (result, directive) {
    var split = directive.trim().split(/\s+/g)

    var key = split.shift()

    if (key) {
      result[key] = split
    }

    return result
  }, {})
}
