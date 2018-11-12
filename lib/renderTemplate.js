const ora = require('ora')
const options = require('./options')

module.exports = function (templates) {
  const spinner = ora('Loading unicorns').start('当前正在下载中...')
  spinner.spinner = options.spinOpts('dots')
  spinner.color = 'green'
  setTimeout(_ => {
    spinner.text = '加载完成...'
    // spinner.stop()
    spinner.succeed('成功')
    // spinner.fail('失败')
  }, 5000)
  // console.log(template)
  // const template = templates[0]
  // if(!)
}
