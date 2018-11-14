
const home = require('user-home')
const { resolve, join } = require('path')
const fs = require('fs')
/** 本地模板库 */
exports.tmpLocalLib = join(home, '/.fetp-templates')

exports.rm = require('rimraf').sync

const fsExists = function (path) {
  return fs.existsSync(resolve(path))
}

exports.fsExists = fsExists
exports.sleep = time => new Promise(resolve => setTimeout(resolve, time))
