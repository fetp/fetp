const inquirer = require('inquirer')
const { resolve, join } = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const getOption = require('./options').getOption
const log = require('../utils/log')

const ask = function (questions, done) {
  return new Promise(resolve => {
    const queryList = Object.keys(questions).map(key => {
      return {
        name: questions[key].name,
        message: questions[key].message,
        default: questions[key].default
      }
    })
    inquirer
      .prompt(queryList)
      .then(answer => resolve(answer))
  })
}

module.exports = async function generate (name, projectName, done) {
  const opts = getOption(name, resolve(projectName), done)
  const questions = opts.prompts

  const metadata = await ask(questions, done)
  const metalsmith = Metalsmith(join(resolve(projectName), 'template'))
  metalsmith
    .metadata(metadata)
    .clean(false)
    .source(join(resolve(projectName), 'template'))
    .destination(resolve(projectName))
    .use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
      Object.keys(files).forEach(filename => {
        const template = files[filename].contents.toString()
        console.log(meta)
        files[filename].contents = Buffer.from(Handlebars.compile(template)({ 'name': 'charles', 'username': 'yangxin' }))
      })
      done()
    })
    .build(err => {
      if (err) {
        log.error(err)
        throw new Error(err)
      }
      log.success('')
    })
}
