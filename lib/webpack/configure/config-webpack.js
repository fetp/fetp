const { resolve } = require('path')
// const { webpackEntry } = require('./config-devserver-entry')
const { pluginCommon } = require('../plugins/plugin-common')
const { rootPath } = require('./config-base')

exports.webpackCommonConfig = {
  mode: 'development',
  entry: resolve(rootPath, './src/index.js'),
  output: {
    path: resolve(rootPath, './dist'),
    filename: 'index.js'
  },
  plugins: pluginCommon().plugins
}
