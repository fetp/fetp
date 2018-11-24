#!/usr/bin/env node
// console.log('hello CLI')

const cac = require('cac')
const cli = cac()
const loudRejection = require('loud-rejection')

loudRejection()

const createHandler = (mode) => {
  if (mode === 'init') {
    return input => {
      const runInit = require('../lib/render/renderTemplate')
      runInit(input)
    }
  }
  return _ => {
    const runService = require('../lib/service/runService')
    runService(mode)
  }
}

cli
  .command('*', {
    desc: '显示 fetp 模板功能'
  }, () => {
    cli.showHelp()
  })
cli
  .command('dev', {
    desc: '开发（development）模式',
    alias: 'd'
  }, createHandler('development'))

cli
  .command('watch', {
    desc: 'watch 模式',
    alias: 'w'
  }, createHandler('watch'))

// cli
//   .command('publish', {
//     desc: '发布（publish）项目',
//     alias: 'p'
//   }, createHandler('publish'))

cli
  .command('output', {
    desc: '生产（production）模式',
    alias: 'o'
  }, createHandler('production'))

cli
  .command('init', {
    desc: '生成种子项目',
    alias: 'i'
  }, createHandler('init'))

cli
  .command('help', {
    desc: '打开帮助文档',
    alias: 'h'
  }, () => {
    cli.showHelp()
  })

cli.parse()
