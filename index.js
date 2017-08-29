module.exports = function (policy) {
  return policy.split(';').reduce(function (result, directive) {
    var trimmed = directive.trim()
    if (!trimmed) { return result }

    var split = directive.trim().split(/\s+/g)
    var key = split.shift()

    if (!result.hasOwnProperty(key)) {
      result[key] = split
    }

    return result
  }, {})
}
