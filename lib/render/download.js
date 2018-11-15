
const ora = require('ora')
const download = require('download-git-repo')
const generate = require('./generate')
const { spinOpts } = require('./options')
const log = require('../utils/log')

/**
 * 下载远程模板库
 * @param templateName 模板类型
 * @param tmp 本地模板库路径
 * @param destination 项目路径
 * @param removeTmp 是否删除本地缓存模板 default: true
 */
exports.downloadTemplate = function (templateName, tmp, destination = '') {
  // 下载目录
  const templateLink = `yang657850144/fetp-template-${templateName}`
  log.beauity(`CLI create ${templateName} template`, 'green')
  const spinner = ora(`> Installing ${templateName} start\n`).start()
  spinner.spinner = spinOpts('dots')
  // templateLink: 模板链接  tmp: 本地模板库 destination: 项目地址
  download(templateLink, tmp, { clone: false }, (err) => {
    if (err) {
      log.error(`模板下载失败 ${err}`)
      process.exit(1)
    }
    spinner.succeed(`${templateName.toUpperCase()} Template is Download.`)
    generate(templateName, tmp, destination, err => {
      if (err) log.error(err)
      spinner.succeed(`${templateName.toUpperCase()} Template is Generated.`)
      spinner.stop()
    })
  })
}
