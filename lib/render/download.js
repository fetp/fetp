const { resolve } = require('path')
const { fsExists, rm } = require('../utils')
const ora = require('ora')
const download = require('download-git-repo')
const generate = require('./generate')
const options = require('./options')
const log = require('../utils/log')

exports.downloadTemplate = function (templateName, destination = '') {
  // 下载目录
  const templateFullName = `yang657850144/fetp-template-${templateName}`
  log.beauity(`CLI create ${templateName} template`, 'green')
  const spinner = ora(`> Installing ${templateName} start\n`).start()
  spinner.spinner = options.spinOpts('dots')

  if (fsExists(resolve(destination))) rm(resolve(destination))
  download(templateFullName, resolve(destination), { clone: false }, (err) => {
    if (err) {
      log.error(`模板下载失败 ${err}`)
      process.exit(1)
    }
    spinner.succeed(`${templateName.toUpperCase()} Template is Download.`)
    generate(templateFullName, destination, err => {
      if (err) log.error(err)
      spinner.succeed(`${templateName.toUpperCase()} Template is Generated.`)
      spinner.stop()
    })
  })
}
