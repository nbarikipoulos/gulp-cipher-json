/*!
 * (The MIT License)
 *
 * Copyright (c) 2019 N. Barikipoulos <nikolaos.barikipoulos@outlook.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict'

const through = require('through2');
const PluginError = require('plugin-error');

const createCryptObject = require('json-cipher-value');

const PLUGIN_NAME = 'gulp-cipher-json';

module.exports = (action, secret, options) => {
  return through.obj( (file, enc, cb) => {

    if (file.isNull()) {
      // Do nothing
      return cb(null, file);
    }

    if (file.isStream()) {
      cb(new PluginError(
        PLUGIN_NAME,
        'Streams not supported!'
      ));
    }

    // Validation of args

    if ( action !== 'encrypt' && action !=='decrypt' ) {
      cb(new PluginError(
        PLUGIN_NAME,
        'action option must be set either to \'crypt\' or \'encrypt\''
      ));
    }
    if ( undefined === secret ) {
      cb(new PluginError(
        PLUGIN_NAME,
        'A secret phrase is required'
      ));
    }

    //
    // Main job
    //

    if (file.isBuffer()) { // Other cas possible?

      let cryptObject = createCryptObject(secret, options);

      let encryptedObject = cryptObject[`${action}`].call(
        cryptObject,
        JSON.parse(file.contents.toString())
      );

      file.contents = Buffer.from(JSON.stringify(
        encryptedObject,
        null,
        2
      ));

      return cb(null, file);
    }
  });
};