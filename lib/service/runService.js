const chalk = require('chalk')
const configPoi = require('../plugins/config-poi')
// const { loadConfig } = require('../utils')

module.exports = function (mode) {
  // 加载CLI配置
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV =
      mode === 'watch' ? 'development' : mode
  }
  console.log(`当前运行 FETP 版本为： ${chalk.green(require('../../package.json').version)}`)
  console.log('env', process.env.NODE_ENV)
  // 读取poi配置文件
  const config = configPoi(mode)
  console.log('config', config)
}
