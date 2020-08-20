/*! Copyright (c) 2019-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const stream = require('stream')
const PluginError = require('plugin-error')

const createCipherObject = require('json-cipher-value')

const PLUGIN_NAME = 'gulp-cipher-json'

module.exports = (action, secret, options) => {
  const transform = new stream.Transform({ objectMode: true })
  transform._transform = (file, enc, cb) => {
    if (file.isNull()) {
      // Do nothing
      return cb(null, file)
    }

    if (file.isStream()) {
      cb(new PluginError(
        PLUGIN_NAME,
        'Streams not supported!'
      ))
    }

    // Validation of args

    if (action !== 'encrypt' && action !== 'decrypt') {
      cb(new PluginError(
        PLUGIN_NAME,
        'action option must be set either to \'encrypt\' or \'decrypt\''
      ))
    }
    if (undefined === secret) {
      cb(new PluginError(
        PLUGIN_NAME,
        'A secret phrase is required'
      ))
    }

    //
    // Main job
    //

    if (file.isBuffer()) {
      const cipherObject = createCipherObject(secret, options)

      const content = JSON.parse(file.contents.toString())
      const result = cipherObject.perform(action, content)

      file.contents = Buffer.from(JSON.stringify(result, null, 2))

      return cb(null, file)
    }
  }
  return transform
}
