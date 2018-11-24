const webpack = require('webpack')
const opn = require('opn')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const log = require('../utils/log')
const { devServerOptions } = require('../webpack/plugins/devserver-plugin')
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
    devServer.listen(devServerOptions.port)
  }
  run () {
    this.init()
    opn(`http://${devServerOptions.host}:${devServerOptions.port}`)
    log.pure(`${chalk.blue('The current project is running:')} http://${devServerOptions.host}:${devServerOptions.port}`)
  }
}
