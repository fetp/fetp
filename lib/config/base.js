
module.exports = async function (mode) {
  return {
    mode,
    dist: '',
    staticFolder: '',
    filename: {},
    hash: '',
    sourceMap: false,
    hmr: false,
    define: {
      __DEV__: false,
      __PRO__: false
    },
    devServer: {}
  }
}
