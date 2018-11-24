const { resolve } = require('path')
const { cwd } = require('../../utils')
exports.serverEntry = () => {
  return resolve(cwd, './test/src/html')
}
exports.webpackEntry = () => {
  return resolve(cwd, './test/src')
}
