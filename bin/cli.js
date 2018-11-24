#!/usr/bin/env node
// console.log('hello CLI')

const cac = require('cac')
const cli = cac()
const opn = require('opn')
const loudRejection = require('loud-rejection')
const updateNotifier = require('update-notifier')
const log = require('../lib/utils/log')
const pkg = require('../package.json')
updateNotifier({ pkg }).notify()

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
    desc: 'Display FETP Template Function'
  }, () => {
    cli.showHelp()
  })
cli
  .command('dev', {
    desc: 'development model',
    alias: 'd'
  }, createHandler('development'))

cli
  .command('watch', {
    desc: 'watch model',
    alias: 'w'
  }, createHandler('watch'))

// cli
//   .command('publish', {
//     desc: 'publish,
//     alias: 'p'
//   }, createHandler('publish'))

cli
  .command('output', {
    desc: 'production model',
    alias: 'o'
  }, createHandler('production'))

cli
  .command('init', {
    desc: 'generate a seed project',
    alias: 'i'
  }, createHandler('init'))

cli
  .command('help', {
    desc: 'Open Help Docs',
    alias: 'h'
  }, () => {
    log.warn('please use online help documents: https://fetp.github.io/fetp-docs')
    opn('https://fetp.github.io/fetp-docs')
    cli.showHelp()
  })

cli.parse()
