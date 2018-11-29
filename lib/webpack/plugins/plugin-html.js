const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath } = require('../configure/config-base')

exports.pluginHtml = function (config = {}) {
  config.plugins = [
    new HtmlWebpackPlugin({
      template: resolve(rootPath, './src/html/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
  return config
}
