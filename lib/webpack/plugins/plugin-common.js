const VueLoaderPlugin = require('vue-loader/lib/plugin')

exports.pluginCommon = function (config = {}) {
  config.plugins = [
    // https://vue-loader.vuejs.org/guide/#vue-cli
    new VueLoaderPlugin()
  ]
  return config
}
