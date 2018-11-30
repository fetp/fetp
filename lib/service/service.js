const webpack = require('webpack')
const opn = require('opn')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const log = require('../utils/log')
const { getAvailablePort } = require('../utils/get-available-port')
const { devServerOptions } = require('../webpack/configure/config-devserver')
// const { webpackCommonConfig } = require('../webpack/configure/config-webpack-common')
const { webpackDevConfig } = require('../webpack/configure/config-webpack-dev')

// const defaultProdConfig = {}
module.exports = class Service {
  constructor (mode = 'development') {
    this.mode = mode
  }
  init (config = {}) {
    config.mode = this.mode
    if (this.mode === 'development') {
      // create devServer
      const wewbpackconfig = webpackDevConfig(config)
      console.log('----------------------wewbpackconfig', wewbpackconfig)
      console.log('----------------------module', wewbpackconfig.module)
      console.log('----------------------devServerOptions', devServerOptions)
      WebpackDevServer.addDevServerEntrypoints(wewbpackconfig, devServerOptions)
      const compiler = webpack(wewbpackconfig)
      const devServer = new WebpackDevServer(compiler, devServerOptions)
      try {
        devServer.listen(devServerOptions.port)
      } catch (err) {
        log.error('err', err)
      }
    }
  }
  async run () {
    // checkout port avaliable
    devServerOptions.port = await getAvailablePort(devServerOptions.port)
    this.init()
    const url = `http://${devServerOptions.host}:${devServerOptions.port}`
    opn(url)
    log.pure(`${chalk.blue('The current project is running:')} ${url}`)
  }
}
