const glob = require('glob')
const log = require('../../utils/log')
const { basename, join } = require('path')
const { rootPath } = require('./config-base')

/** for webpack DevServer */
exports.serverEntry = (config) => {
  if (typeof config !== 'object') {
    config = {}
  }
  config.serverEntry = join(rootPath, 'dist')
  return config.serverEntry
}
/** for webpack Entry */
exports.webpackEntry = (config = {}) => {
  if (typeof config !== 'object') {
    config = {}
  }
  config.entry = {}
  glob.sync(join(rootPath, '/src/*.js')).forEach(filePath => {
    const path = basename(filePath, '.js')
    config.entry[path] = filePath
  })
  const path = Object.keys(config.entry)
  if (!path.length) {
    log.error(`Not Found Entry File, PATH: ${join(rootPath, '/src/')}(*.js)`)
    process.exit(1)
  }
  return join(rootPath, '/src')
}
