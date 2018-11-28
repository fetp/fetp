
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
