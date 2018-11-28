const { resolve } = require('path')
const { webpackEntry } = require('./config-entry')
// const { pluginCommon } = require('../plugins/plugin-common')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const { ruleCommon } = require('../rules/rule-common')
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
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
  return config
}
