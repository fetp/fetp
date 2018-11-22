const Webpack = require('webpack')
const { resolve } = require('path')
const { cwd } = require('../utils')
const WebpackDevServer = require('webpack-dev-server')

const defaultDevConfig = {
  mode: 'development',
  entry: resolve(cwd, './test/index'),
  output: {
    path: resolve(cwd, './test/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(cwd, 'test')
  }
}
// const defaultProdConfig = {}
module.exports = class Service {
  constructor (mode) {
    this.mode = mode
  }
  init () {
    const compiler = Webpack(defaultDevConfig)
    const devServerOptions = defaultDevConfig.devServer
    const devServer = new WebpackDevServer(compiler, devServerOptions)
    devServer.listen(8080, 'localhost', () => console.log('Starting server on http://localhost:8080'))
  }
  run () {
    this.init()
    console.log('service is running.')
  }
}
