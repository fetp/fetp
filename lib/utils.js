const { resolve } = require('path')
const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const options = require('./options')
const log = require('./log')

exports.fsExists = (path) => {
  return fs.existsSync(resolve(path))
}

exports.downloadTemplate = function (templateName, destination = '') {
  // 下载目录
  const spinner = ora(`${log.beauity(`CLI create ${templateName} template`, 'green')}`)
  spinner.spinner = options.spinOpts('dots')
  log.beauity('Downloading ...')
  spinner.color = 'green'
  spinner.start(`> Installing ${templateName} start\n`)
  download(`yang657850144/fetp-template-${templateName}`, destination, { clone: false }, (err) => {
    if (err) {
      log.error(`${err}`)
      process.exit(1)
    }
    spinner.stop()
    log.success()
  })
}
