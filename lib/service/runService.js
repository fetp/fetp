const { loadConfig } = require('../utils')

module.exports = function (mode) {
  // 加载CLI配置
  const config = loadConfig({ name: 'fetp' })
  config.extendWebpack({ fetp: 'fetp' })
}
