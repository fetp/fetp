const chalk = require('chalk')
const { resolve } = require('path')
const { cwd } = require('../utils')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
// const Service = require('./service')

const config = {
  mode: 'development',
  entry: resolve(cwd, './test/index.js'),
  output: {
    path: resolve(cwd, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
const devServerOptions = {
  contentBase: resolve(cwd, './test'),
  open: true,
  quiet: true, // 静默模式
  disableHostCheck: true, // 绕过主机名检测
  useLocalIp: true, // 使用本机ip访问
  hot: true // hmr 使用热更新
}

module.exports = function (mode) {
  // 加载CLI配置
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV =
      mode === 'watch' ? 'development' : mode
  }
  console.log(`当前运行 FETP 版本为： ${chalk.green(require('../../package.json').version)}`)

  // 设置server配置文件
  // const service = new Service(process.env.NODE_ENV)
  // service.run()

  /**
   * 测试webpack
   */
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions)
  const compiler = webpack(config)
  const devServer = new WebpackDevServer(compiler, devServerOptions)
  devServer.listen(4000, () => {
    console.log('server is running.')
  })
}
