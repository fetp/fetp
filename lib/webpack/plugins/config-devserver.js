const { resolve } = require('path')
const { cwd } = require('../../utils')
const internalIp = require('internal-ip')

exports.devServerOptions = {
  contentBase: resolve(cwd, './test'),
  open: true,
  port: 4000,
  host: internalIp.v4.sync(),
  quiet: true, // 静默模式
  disableHostCheck: true, // 绕过主机名检测
  useLocalIp: true, // 使用本机ip访问
  hot: true // hmr 使用热更新
}
