# gulp-cipher-json
[![NPM version][npm-image]][npm-url]

| Package | gulp-cipher-value |
| ------- | ----------------- |
| Description | Gulp wrapper for [json-cipher-value](https://github.com/nbarikipoulos/json-cipher-value). (Un)cipher values of json files retaining their types. |

## Install

```shell
npm install gulp-cipher-json --save-dev
```

## Usage

```js

const gulp = require('gulp');
const cipherJSON = require('gulp-cipher-json');

gulp.task('default', () => gulp.src('src/data/*.json')
  .pipe(cipherJSON(
    'decrypt',
    'my secret password from anywhere'
  ))
  .pipe(gulp.dest('dist/data'))
);
```

## cipherJSON(action, secret, [options])

__action__: either 'encrypt' or 'decrypt'

__secret__: password

__options__: [json-cipher-value](https://github.com/nbarikipoulos/json-cipher-value) options. Note the default settings perform an aes-256-ctr ciphering.


## Credits

- Nikolaos Barikipoulos ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

This module is MIT licensed. See [LICENSE](./LICENSE.md).

[npm-url]: https://www.npmjs.com/package/gulp-cipher-json
[npm-image]: https://img.shields.io/npm/v/gulp-cipher-json.svg