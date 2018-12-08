const { join } = require('path')
const shell = require('shelljs')
const got = require('got')
const inquirer = require('inquirer')
const chalk = require('chalk')
const table = require('text-table')
const log = require('../utils/log')
const { setGlobal, tmpLocalLib, setGitInfo } = require('./options')
const { fsExists, cwd, rm } = require('../utils')
const { downloadTemplate } = require('./download')

/** npmjs.com  search */
const request = got.extend({
  baseUrl: 'https://www.npmjs.com/search?q=fetp%2Ffetp-template-',
  headers: {
    'x-spiferack': 1
  }
})

function getTemplateList (template) {
  return request('', {
    json: true
  })
    .then(res => res.body)
    .then(data => {
      if (!data || !data.total || (data.objects && !data.objects.length)) {
        return Promise.reject(new Error('no data'))
      }
      return data.objects.map(item => {
        return [item.package.name.replace(/^@fetp\/fetp-template-/g, ''), `- ${item.package.description}`]
      }).filter(template => template[0] !== 'fetp')
    })
}
/**
 *  模板渲染
 *  @param inputs[0] <模板类型> basic vue
 *  @param inputs[1] [模板名称] 默认取当前目录名
 *
*/
module.exports = function (inputs) {
  // 获取模板名称
  const templateName = inputs[0]
  setGlobal('templateName', templateName)
  if (!templateName) {
    ;(async () => {
      try {
        const pkgs = await getTemplateList(templateName)
        log.pure(table([['templateName', 'Description']]))
        log.beauity(table(pkgs, {
          align: [ 'l', 'l' ]
        }))
      } catch (err) {
        log.error('Network Error!')
      }
    })()
    return log.info(`Please select a template, Format: ${chalk.green('fetp i <templateName> [directory]')}\n`)
  }
  // 获取项目名称
  let projectName = inputs[1] || ''
  setGlobal('projectName', projectName)
  // 项目路径
  let proLink = join(cwd, projectName)
  setGlobal('proLink', proLink)
  // 本地模板路径
  let tmpLink = join(tmpLocalLib, templateName)
  setGlobal('tmpLink', tmpLink)
  setGitInfo()
  if (proLink && fsExists(proLink)) {
    inquirer
      .prompt([{
        type: 'confirm',
        message: chalk.yellow(`${projectName} Directory already Exists, Are you sure Overwrite`),
        name: 'overwrite'
      }])
      .then(answer => {
        if (answer.overwrite) {
          rm(proLink)
          downloadTemplate(templateName, tmpLink, projectName)
        } else {
          shell.exit(1)
        }
      })
  } else {
    downloadTemplate(templateName, tmpLink, projectName)
  }
}
