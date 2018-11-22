const Webpack = require('webpack')
const { resolve } = require('path')
const { cwd } = require('../utils')
const WebpackDevServer = require('webpack-dev-server')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultDevConfig = {
  mode: 'development',
  entry: resolve(cwd, './test/index'),
  output: {
    path: resolve(cwd, './test')
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: resolve(cwd, './test/index.html')
    // }),
    new Webpack.HotModuleReplacementPlugin()
  ]
}
const devServerOptions = {
  port: 4000,
  contentBase: resolve(cwd, 'test'),
  hot: true,
  open: true
}
// const defaultProdConfig = {}
module.exports = class Service {
  constructor (mode) {
    this.mode = mode
  }
  init () {
    WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, devServerOptions)
    const compiler = Webpack(defaultDevConfig)
    const devServer = new WebpackDevServer(compiler, devServerOptions)
    devServer.listen(devServerOptions.port, 'localhost', () => console.log(`Starting server on http://localhost:${devServerOptions.port}`))
  }
  run () {
    this.init()
  }
}
