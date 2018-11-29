const { resolve } = require('path')
const { webpackEntry } = require('./config-entry')
const { pluginCommon } = require('../plugins/plugin-common')
const { ruleCommon } = require('../rules/rule-common')
const { rootPath } = require('./config-base')

exports.webpackCommonConfig = (config) => {
  config = {
    mode: 'development',
    entry: webpackEntry(config).entry, // resolve(rootPath, './src/index.js')
    output: {
      path: resolve(rootPath, './dist'),
      filename: 'index.js'
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.scss', '.css', '.json']
    },
    plugins: pluginCommon(config).plugins,
    module: {
      rules: ruleCommon(config).module.rules
    }
  }
  return config
}
