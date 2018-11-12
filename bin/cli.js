#!/usr/bin/env node
// console.log('hello CLI')

const cac = require('cac')
const cli = cac()

const createHandler = (mode) => {
  if (mode === 'init') {}
  return input => {
    // console.log(input, mode)
    const runInit = require('../lib/renderTemplate')
    runInit(input)
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
  .command('publish', {
    desc: '发布（publish）项目',
    alias: 'p'
  }, createHandler('publish'))

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
    console.log('help')
  })

cli.parse()
