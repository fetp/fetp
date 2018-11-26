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
    plugins: pluginCommon(config).plugins,
    module: {
      rules: ruleCommon(config).rules
    }
  }
  return config
}
