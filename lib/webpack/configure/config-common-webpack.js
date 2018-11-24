const { resolve } = require('path')
const webpack = require('webpack')
const { cwd } = require('../../utils')
const { webpackEntry } = require('./config-server-entry')

exports.webpackCommonConfig = {
  mode: 'development',
  entry: webpackEntry(),
  output: {
    path: resolve(cwd, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
