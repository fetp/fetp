const merge = require('webpack-merge')
const { webpackCommonConfig } = require('./config-webpack-common')
const { pluginHtml } = require('../plugins/plugin-html')

exports.webpackDevConfig = function (config = {}) {
  const commonConf = webpackCommonConfig(config)
  config = merge(commonConf, {
    mode: config.mode,
    devtool: 'inline-source-map',
    plugins: pluginHtml().plugins
  })
  return config
}
