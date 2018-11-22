const chalk = require('chalk')
const Service = require('./service')

module.exports = function (mode) {
  // 加载CLI配置
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV =
      mode === 'watch' ? 'development' : mode
  }
  console.log(`当前运行 FETP 版本为： ${chalk.green(require('../../package.json').version)}`)
  // 设置server配置文件
  const service = new Service(process.env.NODE_ENV)
  service.run()
}
