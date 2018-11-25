const { resolve } = require('path')
const { webpackEntry } = require('./config-common-entry')
const { pluginCommon } = require('../plugins/plugin-common')
const { rootPath } = require('./config-base')

exports.webpackCommonConfig = (config) => {
  return {
    mode: 'development',
    entry: webpackEntry(config).entry, // resolve(rootPath, './src/index.js')
    output: {
      path: resolve(rootPath, './dist'),
      filename: 'index.js'
    },
    plugins: pluginCommon().plugins
  }
}
