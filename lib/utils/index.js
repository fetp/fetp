
const fs = require('fs')
const { resolve } = require('path')
/** git config */
exports.gitConfigPath = function (type = 'global') {
  return require('git-config-path')(type)
}
exports.rm = require('rimraf').sync
exports.fsExists = function (path) {
  return fs.existsSync(resolve(path))
}

exports.cwd = process.cwd()

exports.sleep = time => new Promise(resolve => setTimeout(resolve, time))
