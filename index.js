/*! Copyright (c) 2019 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

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
        'action option must be set either to \'encrypt\' or \'decrypt\''
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

      let encryptedObject = cryptObject[action].call(
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