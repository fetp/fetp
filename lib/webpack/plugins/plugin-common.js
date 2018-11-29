const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

exports.pluginCommon = function (config = {}) {
  config.plugins = [
    // https://vue-loader.vuejs.org/guide/#vue-cli
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
  return config
}
