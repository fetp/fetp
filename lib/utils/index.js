const { resolve } = require('path')
const fs = require('fs')

exports.rm = require('rimraf').sync

const fsExists = function (path) {
  return fs.existsSync(resolve(path))
}

exports.fsExists = fsExists
exports.sleep = time => new Promise(resolve => setTimeout(resolve, time))
