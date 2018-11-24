const { resolve } = require('path')
const { cwd } = require('../utils')
const webpack = require('webpack')
const chalk = require('chalk')
const internalIp = require('internal-ip')
const WebpackDevServer = require('webpack-dev-server')
const log = require('../utils/log')
const { devServerOptions } = require('../webpack/plugins/config-devserver')

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

// const defaultProdConfig = {}
module.exports = class Service {
  constructor (mode) {
    this.mode = mode
  }
  init () {
    WebpackDevServer.addDevServerEntrypoints(config, devServerOptions)
    const compiler = webpack(config)
    const devServer = new WebpackDevServer(compiler, devServerOptions)
    return new Promise(resolve => {
      devServer.listen(devServerOptions.port, _ => {
      })
    })
  }
  run () {
    this.init()
    log.pure(`${chalk.blue('The current project is running:')} http://${internalIp.v4.sync()}:${devServerOptions.port}`)
  }
}
