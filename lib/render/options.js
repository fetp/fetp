const { join, resolve } = require('path')
const metadata = require('read-metadata')
const { fsExists } = require('../utils')
/**  ora 配置 */
const spinOpts = (type = 'dots') => {
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
/** 获取模板配置项 */
const getOption = function (name, dir) {
  return getMetaData(dir)
}

/** 获取配置表信息 */
const getMetaData = function (dir) {
  let opt
  const json = join(dir, 'meta.json')
  const js = join(dir, 'meta.js')
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
/** 添加附属属性 */
// const setAttribute = function (opt, key, val) {
//   const prompts = opt.prompts || (opt.prompts = {})
//   if (!prompts[key]) {

//   } else {

//   }
//   return prompts
// }

module.exports = {
  spinOpts,
  getOption
}
