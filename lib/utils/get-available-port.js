
const detect = require('detect-port')
const chalk = require('chalk')
const log = require('./log')

exports.getAvailablePort = async function (port) {
  const _port = await detect(port)
  if (port !== _port) {
    log.warn(`port: ${chalk.yellow(port)} was occupied, try port: ${chalk.green(_port)}`)
    port = _port
  }
  return _port
}
