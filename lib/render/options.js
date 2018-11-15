const { join, resolve } = require('path')
const { readFile } = require('fs')
const metadata = require('read-metadata')
const { fsExists, cwd, gitConfigPath } = require('../utils')
const home = require('user-home')

const _global = {
  templateName: '', // 模板名称
  projectName: '', // 项目名称
  tmpLink: '', // 模板路径
  proLink: '', // 项目路径
  gitUser: '',
  gitEmail: ''
}
exports.setGitInfo = function () {
  readFile(gitConfigPath(), (err, data) => {
    if (err) throw err
    let configList = data.toString().replace(/[\t]/g, '').split('\n')
    configList.forEach(conf => {
      let key = conf.split('=')[0].trim()
      let val = !conf.split('=')[1] ? '' : conf.split('=')[1].trim()
      if (key === 'name') {
        _global['gitUser'] = val
      } else if (key === 'email') {
        _global['gitEmail'] = val
      }
    })
  })
}

exports.setGlobal = function (key, val) {
  _global[key] = val
}
exports.getGlobal = function (key = '') {
  return key === '' ? _global : _global[key]
}

/**  ora 配置 */
exports.spinOpts = (type = 'dots') => {
  let opt = {
    'dots': {
      'interval': 80,
      'frames': [
        '⠋',
        '⠙',
        '⠹',
        '⠸',
        '⠼',
        '⠴',
        '⠦',
        '⠧',
        '⠇',
        '⠏'
      ]
    },
    'dots1': {
      'interval': 80,
      'frames': [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷'
      ]
    },
    'dots2': {
      'interval': 80,
      'frames': [
        '⠋',
        '⠙',
        '⠚',
        '⠞',
        '⠖',
        '⠦',
        '⠴',
        '⠲',
        '⠳',
        '⠓'
      ]
    }
  }[type]

  if (!opt) { console.log(opt) }
  return opt
}
/** 模板内容替换 */
const getOptionReg = function (k) {
  return {
    projectName: _global['projectName'] === '' ? cwd.substring(cwd.lastIndexOf('\\') + 1) : _global['projectName'],
    gitUser: _global['gitUser'],
    gitEmail: _global['gitEmail'],
    version: '0.0.1'
  }[k]
}

/** 本地模板库 */
exports.tmpLocalLib = join(home, '/.fetp-templates')
/** 获取模板内容 */
exports.getTemplateDefault = (questions, key) => {
  let k = (questions[key].default).match(/:(\S*):/)[1]
  return getOptionReg(k)
}

/** 获取模板配置项 */
const getOption = function (name, tmp) {
  return getMetaData(tmp)
}

/** 获取配置表信息 */
const getMetaData = function (tmp) {
  let opt
  const json = join(tmp, '/meta.json')
  const js = join(tmp, '/meta.js')
  if (fsExists(json)) {
    opt = metadata.sync(json)
  } else if (fsExists(js)) {
    opt = require(resolve(js))
    if (opt !== Object(opt)) {
      throw new Error('meta.js needs to expose an object')
    }
  } else {
    throw new Error('Not found a meta.js or meta.json')
  }
  return opt
}

exports.getOption = getOption
/** 添加附属属性 */
// const setAttribute = function (opt, key, val) {
//   const prompts = opt.prompts || (opt.prompts = {})
//   if (!prompts[key]) {

//   } else {

//   }
//   return prompts
// }
