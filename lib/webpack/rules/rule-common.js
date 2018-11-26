
exports.ruleCommon = function (config = {}) {
  config.rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
  return config
}
