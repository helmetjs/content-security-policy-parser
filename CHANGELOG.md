# Changelog

## 0.6.0 - 2024-02-10

### Changed

- **Breaking:** Parse into a `Map` instead of an object
- **Breaking:** Follow
  [the CSP parser spec](https://w3c.github.io/webappsec-csp/#parse-serialized-policy)
  more closely. See
  [#12](https://github.com/helmetjs/content-security-policy-parser/pull/12)

## 0.5.0 - 2024-01-26

### Fixed

- Fix prototype pollution bug when parsing `__proto__`. See
  [#11](https://github.com/helmetjs/content-security-policy-parser/issues/11)

### Removed

- **Breaking:** Drop support for old Node versions. Node 18+ is now required

## 0.4.1 - 2022-03-23

### Changed

- Shrink package size slightly

## 0.4.0 - 2020-12-22

### Changed

- Minor performance improvement

## 0.3.0 - 2019-09-02

### Changed

- Dropped support for Node <8

## 0.2.0 - 2019-06-15

### Added

- Added TypeScript type definitions. See
  [#3](https://github.com/helmetjs/content-security-policy-parser/pull/3)

### Changed

- Excluded some files from npm package

The changelog was started in the 0.2.0 release.
