const inquirer = require('inquirer')
const { resolve } = require('path')
// const Metalsmith = require('metalsmith')
// const Handlebars = require('handlebars')
const getOption = require('./options').getOption

module.exports = function generate (name, projectName, done) {
  const opts = getOption(name, resolve(projectName), done)
  const questions = opts.prompts
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
      console.log(answer)
      done()
    })
  // const metalsmith = Metalsmith(join(dest, 'template'))
  // metalsmith
  //   .metadata()
}
