const { resolve } = require('path')
const merge = require('webpack-merge')
const { webpackCommonConfig } = require('./config-webpack-common')
const { pluginHtml } = require('../plugins/plugin-html')
const { rootPath } = require('./config-base')

exports.webpackDevConfig = function (config = {}) {
  const commonConf = webpackCommonConfig(config)
  config = merge(commonConf, {
    mode: config.mode,
    resolve: {
      alias: {
        '@': resolve(rootPath, './src'), // for .(js|vue)
        '~@': resolve(rootPath, './src') // for .css
      }
    },
    devtool: 'inline-source-map',
    plugins: pluginHtml().plugins
  })
  return config
}
