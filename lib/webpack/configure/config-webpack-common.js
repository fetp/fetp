const { resolve, join } = require('path')
// const { webpackEntry } = require('./config-entry')
const { pluginCommon } = require('../plugins/plugin-common')
const { ruleCommon } = require('../rules/rule-common')
const { rootPath } = require('./config-base')

console.log('rootPath', rootPath, resolve(rootPath, './src'), join(rootPath, './src'))

exports.webpackCommonConfig = (config) => {
  config = {
    mode: 'development',
    entry: resolve(rootPath, './src/index.js'), // resolve(rootPath, './src/index.js') webpackEntry(config).entry
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
