const webpack = require('webpack')
const opn = require('opn')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const log = require('../utils/log')
const { devServerOptions } = require('../webpack/configure/config-common-devserver')
const { webpackCommonConfig } = require('../webpack/configure/config-common-webpack')

// const defaultProdConfig = {}
module.exports = class Service {
  constructor (mode) {
    this.mode = mode
  }
  init () {
    // create devServer
    WebpackDevServer.addDevServerEntrypoints(webpackCommonConfig, devServerOptions)
    const compiler = webpack(webpackCommonConfig)
    const devServer = new WebpackDevServer(compiler, devServerOptions)
    try {
      devServer.listen(devServerOptions.port)
    } catch (err) {
      console.log('assda', err)
    }
  }
  run () {
    this.init()
    const url = `http://${devServerOptions.host}:${devServerOptions.port}`
    opn(url)
    log.pure(`${chalk.blue('The current project is running:')} ${url}`)
  }
}
