const inquirer = require('inquirer')
const { resolve, join } = require('path')
const Metalsmith = require('metalsmith')
// const Handlebars = require('handlebars')
const getOption = require('./options').getOption

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
      .then(answer => {
        resolve({
          metadata: {
            answer
          }
        })
      })
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
    .build(err => {
      console.log(err)
    })
}
