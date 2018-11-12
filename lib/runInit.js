const ora = require('ora')

module.exports = function (templates) {
  const spinner = ora('Loading unicorns').start()
  setTimeout(_ => {
    spinner.color = 'yellow'
    spinner.text = '当前正在加载中...'
  }, 5000)
  // console.log(template)
  // const template = templates[0]
  // if(!)
}
