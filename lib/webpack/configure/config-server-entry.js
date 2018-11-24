const { resolve } = require('path')
const { cwd } = require('../../utils')
/** for webpack DevServer */
exports.serverEntry = () => {
  return resolve(cwd, './src/html')
}
/** for webpack Entry */
exports.webpackEntry = () => {
  return resolve(cwd, './src')
}
