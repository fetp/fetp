
const { resolve } = require('path')
const { cwd } = require('../../utils')
// devServer root path
exports.rootPath = resolve(cwd, './test')

exports.getBaseConfig = () => {
  return Object.assign({}, {
    mode: 'development',
    entry: '',
    output: {},
    module: {
      rules: []
    },
    resolve: {
    },
    plugins: []
  })
}
