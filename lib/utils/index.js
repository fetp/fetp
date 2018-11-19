const fs = require('fs')
const { resolve } = require('path')
const shell = require('shelljs')
const log = require('./log')
/** git config */
exports.gitConfigPath = function (type = 'global') {
  return require('git-config-path')(type)
}
exports.rm = require('rimraf').sync
const fsExists = function (path) {
  return fs.existsSync(resolve(path))
}
exports.fsExists = fsExists
/**
 * 获取CLI配置信息 ([name].config.js)
*/
exports.loadConfig = function ({ name }) {
  const configPath = resolve(cwd, `${name}.config.js`)
  if (fsExists(configPath)) {
    const config = require(configPath)
    return config
  } else {
    log.error('找不到fetp.config.js文件，请确认本项目为fetp工作目录.')
    shell.exit(1)
  }
}

const cwd = process.cwd()
exports.cwd = cwd
exports.sleep = time => new Promise(resolve => setTimeout(resolve, time))
