const { resolve } = require('path')
exports.ruleCommon = function (config = {}) {
  if (!config.module) {
    config.module = {}
  }
  config.module.rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'vue-style-loader' },
        { loader: 'css-loader' },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: resolve(__dirname, './config') // 写到目录即可，文件名强制要求是postcss.config.js
            }
          }
        },
        'sass-loader' // compiles Sass to CSS, using Node Sass by default
      ]
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
  return config
}
