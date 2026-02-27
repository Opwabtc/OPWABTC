# Changelog

## [9.0.0](https://github.com/vansergen/rpc-request/compare/v8.0.1...v9.0.0) (2025-05-04)

### ⚠ BREAKING CHANGES

- use the native fetch function

### Features

- use the native fetch function ([1a92d71](https://github.com/vansergen/rpc-request/commit/1a92d712f8f24fca33fc811c5b8fa151675d6a82))

## [8.0.1](https://github.com/vansergen/rpc-request/compare/v8.0.0...v8.0.1) (2025-05-04)

### Dependencies

- bump undici from 7.1.0 to 7.8.0 ([fb5cd10](https://github.com/vansergen/rpc-request/commit/fb5cd1060f1764db2a480de1d79b1dfcee57ee8b))

## [8.0.0](https://github.com/vansergen/rpc-request/compare/v7.1.12...v8.0.0) (2024-12-08)

### ⚠ BREAKING CHANGES

- drop `Node.js<22` support

### Performance Improvements

- drop `Node.js<22` support ([bbb4394](https://github.com/vansergen/rpc-request/commit/bbb439487a0e85c09608e95e1af931a7cb927d3d))

## [7.1.12](https://github.com/vansergen/rpc-request/compare/v7.1.11...v7.1.12) (2024-12-08)

### Dependencies

- bump undici from 6.19.0 to 7.1.0 ([1045b8d](https://github.com/vansergen/rpc-request/commit/1045b8d67cb97c05ffd6ee295efbbd89b29c601a))

## [7.1.11](https://github.com/vansergen/rpc-request/compare/v7.1.10...v7.1.11) (2024-06-17)

### Dependencies

- bump undici from 6.9.0 to 6.19.0 ([37c5e42](https://github.com/vansergen/rpc-request/commit/37c5e4273d6c6d6f07dabfb7a21e8d69cc211832))

## [7.1.10](https://github.com/vansergen/rpc-request/compare/v7.1.9...v7.1.10) (2024-03-15)

### Dependencies

- bump undici from 6.2.1 to 6.9.0 ([a56a200](https://github.com/vansergen/rpc-request/commit/a56a20066a864695998f8df31a258fa5987d5951))

## [7.1.9](https://github.com/vansergen/rpc-request/compare/v7.1.8...v7.1.9) (2023-12-29)

### Dependencies

- bump undici from 5.27.2 to 6.2.1 ([49db668](https://github.com/vansergen/rpc-request/commit/49db668635cb71d5cc2e0b1498760d349da2baa4))

## [7.1.8](https://github.com/vansergen/rpc-request/compare/v7.1.7...v7.1.8) (2023-11-13)

### Dependencies

- bump undici from 5.25.2 to 5.27.2 ([727787e](https://github.com/vansergen/rpc-request/commit/727787e244172315be61e14b3eeca29ea2d7f0cb))

## [7.1.7](https://github.com/vansergen/rpc-request/compare/v7.1.6...v7.1.7) (2023-09-25)

### Dependencies

- bump undici from 5.25.1 to 5.25.2 ([aedd6b8](https://github.com/vansergen/rpc-request/commit/aedd6b8bdb05358c139bda91e5911a1b17280d73))

## [7.1.6](https://github.com/vansergen/rpc-request/compare/v7.1.5...v7.1.6) (2023-09-21)

### Dependencies

- bump undici from 5.24.0 to 5.25.1 ([befd865](https://github.com/vansergen/rpc-request/commit/befd8652a8d8965d0b558fd7719d01f649458bd9))

## [7.1.5](https://github.com/vansergen/rpc-request/compare/v7.1.4...v7.1.5) (2023-09-13)

### Dependencies

- bump undici from 5.23.0 to 5.24.0 ([3ba8e93](https://github.com/vansergen/rpc-request/commit/3ba8e93c46273e6991a2aebdcca1d4f8d1f8a6d9))

## [7.1.4](https://github.com/vansergen/rpc-request/compare/v7.1.3...v7.1.4) (2023-08-12)

### Dependencies

- bump undici from 5.22.1 to 5.23.0 ([0067a26](https://github.com/vansergen/rpc-request/commit/0067a26d6901d854527ad96d79a22afdd13520aa))

## [7.1.3](https://github.com/vansergen/rpc-request/compare/v7.1.2...v7.1.3) (2023-05-23)

### Dependencies

- bump undici from 5.19.1 to 5.22.1 ([46221cf](https://github.com/vansergen/rpc-request/commit/46221cf19966714a99b2ac6ab2c64648362e721e))

## [7.1.2](https://github.com/vansergen/rpc-request/compare/v7.1.1...v7.1.2) (2023-02-14)

### Dependencies

- bump undici from 5.15.0 to 5.19.1 ([35fddc3](https://github.com/vansergen/rpc-request/commit/35fddc33dd1e450a7333ba88248b887bafc23f89))

## [7.1.1](https://github.com/vansergen/rpc-request/compare/v7.1.0...v7.1.1) (2023-01-19)

### Dependencies

- bump undici from 5.14.0 to 5.15.0 ([0c3edee](https://github.com/vansergen/rpc-request/commit/0c3edee7ac08361bf110c9baeb04ee193d679dda))

## [7.1.0](https://github.com/vansergen/rpc-request/compare/v7.0.0...v7.1.0) (2023-01-09)

### Features

- allow to rewrite the default options ([c1e44b3](https://github.com/vansergen/rpc-request/commit/c1e44b338d601ceb7e4e121d30401ccd74c804db))

## [7.0.0](https://github.com/vansergen/rpc-request/compare/v6.0.2...v7.0.0) (2022-12-26)

### ⚠ BREAKING CHANGES

- drop `Node.js` `<18.12.1` support
- merge constructor options
- rename `fetchOptions` to `init`
- update the `constructor` options
- remove the `.trace()` method

### Features

- add `formData` to transform types ([6283c1b](https://github.com/vansergen/rpc-request/commit/6283c1b118d1083d46be722321fb918888d64389))
- the `.head()` method returns `Response` ([0b4535d](https://github.com/vansergen/rpc-request/commit/0b4535d68c3ae34dd20b2309f65b30ff678779ec))

### Performance Improvements

- add generics to public methods instead of the class ([18f8d76](https://github.com/vansergen/rpc-request/commit/18f8d7643d0ca391c575d2e92717d63e9345d01b))
- drop `Node.js` `<18.12.1` support ([9180063](https://github.com/vansergen/rpc-request/commit/9180063ee76d8e1680b39a164463e8d88d92b3e7))
- merge constructor options ([8876d29](https://github.com/vansergen/rpc-request/commit/8876d29487929ed5eb7998321dbd3bfbd5962f73))

### Code Refactoring

- remove the `.trace()` method ([9ec8f24](https://github.com/vansergen/rpc-request/commit/9ec8f249d06db4b5f59144fd62e1ca10a9fe0086))
- rename `fetchOptions` to `init` ([f43e1c5](https://github.com/vansergen/rpc-request/commit/f43e1c52e1f021109168907078f2addb749056c5))
- update the `constructor` options ([6cd6863](https://github.com/vansergen/rpc-request/commit/6cd68636cf63e98cbe1491360ccb1bf170069667))

### Dependencies

- bump `node-fetch` from `3.2.6` to `3.2.10` ([654eac9](https://github.com/vansergen/rpc-request/commit/654eac9624d9686546a580a936dccae522071e80))
- upgrade `undici` from `5.10.0` to `5.14.0` ([6551dae](https://github.com/vansergen/rpc-request/commit/6551dae7265f50886c4ea1053f6d1b724635a6db))
- use the `fetch` API provided by the `undici` module ([d25aa67](https://github.com/vansergen/rpc-request/commit/d25aa673429a9751472cd6c728a39f535fac4c71))

### [6.0.2](https://github.com/vansergen/rpc-request/compare/v6.0.1...v6.0.2) (2022-06-24)

### Dependencies

- upgrade `node-fetch` to `v3.2.6` ([28dcf2b](https://github.com/vansergen/rpc-request/commit/28dcf2b79397a5308c4137b6918a2597e8f05158))

### [6.0.1](https://github.com/vansergen/rpc-request/compare/v6.0.0...v6.0.1) (2022-05-15)

### Dependencies

- upgrade `node-fetch` to `v3.2.4` ([0439157](https://github.com/vansergen/rpc-request/commit/04391576380e650707350bbeb291043afa36d43a))

## [6.0.0](https://github.com/vansergen/rpc-request/compare/v5.0.3...v6.0.0) (2021-09-21)

### ⚠ BREAKING CHANGES

- drop Node `<16.9.1` support
- change package type to `module`

### Performance Improvements

- change package type to `module` ([b42e412](https://github.com/vansergen/rpc-request/commit/b42e412177d76cbdba436bda4f644f66af1c4756))
- drop Node `<16.9.1` support ([6bac8f5](https://github.com/vansergen/rpc-request/commit/6bac8f5611c8342843cd7d27ef4b06fd253c6436))

### Dependencies

- remove `domexception` ([e5c0402](https://github.com/vansergen/rpc-request/commit/e5c0402fd0a91cbd2c4e5f7fbaa0914634e8f14c))
- upgrade `node-fetch` to `v3.0.0` ([5c010af](https://github.com/vansergen/rpc-request/commit/5c010af57d3767498ae1e4d6fa87072aee8d8baf))

### [5.0.3](https://github.com/vansergen/rpc-request/compare/v5.0.2...v5.0.3) (2021-03-07)

### Dependencies

- upgrade `@types/node` to `v14.14.31` ([757c8c0](https://github.com/vansergen/rpc-request/commit/757c8c05efa64a5aefabc1432792b381a2800414))

### [5.0.2](https://github.com/vansergen/rpc-request/compare/v5.0.1...v5.0.2) (2021-02-14)

### Dependencies

- upgrade `@types/node` to `v14.14.27` ([ab1021f](https://github.com/vansergen/rpc-request/commit/ab1021f14bf42352627ff74534dc26ba328049ca))
- upgrade `semantic-release` to `v17.3.9` ([1b588f6](https://github.com/vansergen/rpc-request/commit/1b588f64863a40e7ec8e4272964daf67f07396fe))

### [5.0.1](https://github.com/vansergen/rpc-request/compare/v5.0.0...v5.0.1) (2020-12-19)

### Bug Fixes

- allow to append headers ([56205c4](https://github.com/vansergen/rpc-request/commit/56205c4e6224d929ee8547a224af52037994819f))

### Dependencies

- update `@types/node` to `v14.14.14` ([0ce993c](https://github.com/vansergen/rpc-request/commit/0ce993c67141c4c01732605739d2bf22ddb077f3))

## [5.0.0](https://github.com/vansergen/rpc-request/compare/v4.0.10...v5.0.0) (2020-12-12)

### ⚠ BREAKING CHANGES

- drop node `<12.20.0` support
- export the `FetchClient` class

### Features

- export the `FetchClient` class ([baaa51c](https://github.com/vansergen/rpc-request/commit/baaa51cbbe309c0a1d5f1a075a83773235ef7fee))
- export the `UnsuccessfulFetch` class ([fd7301c](https://github.com/vansergen/rpc-request/commit/fd7301c5d1d514eb46756735cc71944af9066111))

### Dependencies

- add @types/node ([1d750b0](https://github.com/vansergen/rpc-request/commit/1d750b0b3d5ffa25a70ee025380542d76193480f))
- add domexception ([96b9777](https://github.com/vansergen/rpc-request/commit/96b9777a50d5a7cddf234a301126cabf1e3617b4))
- add node-fetch ([a745ddd](https://github.com/vansergen/rpc-request/commit/a745ddd6a3fbd15131197c3d0f855ed1c8a43a78))
- remove request ([3fcca4c](https://github.com/vansergen/rpc-request/commit/3fcca4c57cdf50e4af01af0433185f8194b22ef7))

### Miscellaneous Chores

- drop node `<12.20.0` support ([e7ebbb3](https://github.com/vansergen/rpc-request/commit/e7ebbb3c4a27dfd8a7b6266ae3ad085d3016ec74))
