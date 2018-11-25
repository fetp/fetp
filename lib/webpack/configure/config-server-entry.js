const glob = require('glob')
const { basename, resolve, join } = require('path')
const { cwd } = require('../../utils')
const log = require('../../utils/log')
const rootPath = resolve(cwd, './test')

/** for webpack DevServer */
exports.serverEntry = (config) => {
  if (typeof config !== 'object') {
    config = {}
  }
  config.serverEntry = {}
  glob.sync(join(rootPath, '/src/html/*.html')).forEach(filePath => {
    const path = basename(filePath, '.html')
    config.serverEntry[path] = filePath
  })
  return join(rootPath, '/src/html')
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
