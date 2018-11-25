const internalIp = require('internal-ip')
// const { serverEntry } = require('./config-devserver-entry')
const { resolve } = require('path')
const { rootPath } = require('./config-base')

exports.devServerOptions = {
  contentBase: resolve(rootPath, './src/html/index.html'),
  open: false,
  port: 4000,
  host: internalIp.v4.sync(),
  quiet: true, // 静默模式
  disableHostCheck: true, // 绕过主机名检测
  useLocalIp: true, // 使用本机ip访问
  hot: true // hmr 使用热更新
}
