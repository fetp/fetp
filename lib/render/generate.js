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
      Object.keys(files).forEach(filename => {
        const template = files[filename].contents.toString()
        files[filename].contents = Buffer.from(Handlebars.compile(template)(meta))
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
