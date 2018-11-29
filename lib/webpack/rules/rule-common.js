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
        { loader: 'css-loader' }
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
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: { // 压缩JPEG图像
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: { // 压缩PNG图像
              enabled: false
            },
            pngquant: { // 压缩PNG图像
              quality: '65-90',
              speed: 4
            },
            gifsicle: { // 压缩GIF图像
              interlaced: false
            }
            // the webp option will enable WEBP
            // webp: { // 将JPG和PNG图像压缩为WEBP
            //   quality: 75
            // }
          }
        }
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
