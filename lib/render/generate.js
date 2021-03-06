const inquirer = require('inquirer')
const { resolve, join } = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const { getOption, getTemplateDefault } = require('./options')
const { cwd } = require('../utils')
const log = require('../utils/log')

const ask = function (questions, done) {
  return new Promise(resolve => {
    // meta信息
    const queryList = Object.keys(questions).map(key => {
      return {
        name: questions[key].name,
        message: questions[key].message,
        default: getTemplateDefault(questions, key)
      }
    })
    // 问询
    inquirer
      .prompt(queryList)
      .then(answer => resolve(answer))
  })
}

/**
 * 模板生成器
 * @param templateName: 模板类型
 * @param tmp: 本地模板库路径
 * @param destination: 项目路径
 * @param done: callback Func
*/
module.exports = async function generate (templateName, tmp, destination, done) {
  const opts = getOption(templateName, tmp, done)
  const questions = opts.prompts

  const metadata = await ask(questions, done)
  const templatePath = join(tmp, 'template')
  const dest = resolve(cwd, destination)
  const metalsmith = Metalsmith(dest)
  done()
  metalsmith
    .metadata(metadata)
    .source(templatePath)
    .clean(true)
    .destination(dest)
    .use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
      // log.pure('meta', meta)
      Object.keys(files).forEach(filename => {
        // 处理 package.json
        if (/package\.json*$/.test(filename)) {
          const template = files[filename].contents.toString()
          files[filename].contents = Buffer.from(Handlebars.compile(template)(meta))
        }
        // 处理 README.md
        if (/README\.md*$/.test(filename)) {
          const template = files[filename].contents.toString()
          files[filename].contents = Buffer.from(Handlebars.compile(template)(meta))
        }
      })
      done()
    })
    .build(err => {
      if (err) {
        log.error(err)
        throw new Error(err)
      }
      log.success()
    })
}
