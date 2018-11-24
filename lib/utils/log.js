const chalk = require('chalk')

function log (msg = '', label = '') {
  if (!label || label === '') {
    console.log(msg)
  } else {
    console.log(label, msg)
  }
}

exports.success = function (msg) {
  log(msg, chalk.green('success'))
}
exports.error = function (msg) {
  log(msg, chalk.red('error'))
}
exports.warn = function (msg) {
  log(msg, chalk.yellow('warn'))
}
exports.info = function (msg) {
  log(msg, chalk.cyan('info'))
}
exports.pure = function (msg) {
  log(msg)
}
exports.beauity = function (msg, color = 'cyan', params = '') {
  console.log(`${chalk[color](msg)} ${params}`)
}
