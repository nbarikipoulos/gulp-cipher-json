# gulp-cipher-json

[![NPM version][npm-image]][npm-url]
[![JavaScript Style Guide][standard-image]][standard-url]

| :exclamation: THIS PACKAGE IS NOT LONGER MAINTAINED |
|-----------------------------------------|

| Package | gulp-cipher-value |
| ------- | ----------------- |
| Description | Gulp wrapper for [json-cipher-value](https://github.com/nbarikipoulos/json-cipher-value). (De)cipher values of json files remaining their types. |

## Install

```shell
npm install gulp-cipher-json --save-dev
```

## Usage

```js

const gulp = require('gulp')
const cipherJSON = require('gulp-cipher-json')

gulp.task('default', _ => gulp.src('src/data/*.json')
  .pipe(cipherJSON(
    'encrypt',
    'my secret password from anywhere'
  ))
  .pipe(gulp.dest('dist/data'))
)
```

## cipherJSON(action, secret, [options])

__action__: either 'encrypt' or 'decrypt'

__secret__: password

__options__: [json-cipher-value](https://github.com/nbarikipoulos/json-cipher-value) options. Note the default settings perform an aes-256-ctr ciphering.


## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

This module is MIT licensed. See [LICENSE](./LICENSE.md).

[npm-url]: https://www.npmjs.com/package/gulp-cipher-json
[npm-image]: https://img.shields.io/npm/v/gulp-cipher-json.svg
[standard-url]: https://standardjs.com
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
