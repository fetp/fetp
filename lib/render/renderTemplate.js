const { resolve } = require('path')
const got = require('got')
const inquirer = require('inquirer')
const table = require('text-table')
const log = require('../utils/log')
const { fsExists } = require('../utils')
const downloadTemplate = require('./download').downloadTemplate
/** npmjs.com */
const request = got.extend({
  baseUrl: 'https://www.npmjs.com/search?q=rendertemplate%2Ffetp-template-',
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
        return [item.package.name.replace(/^@rendertemplate\/fetp-template-/g, ''), item.package.description]
      })
    })
}

module.exports = function (inputs) {
  // 获取模板名称
  const templateName = inputs[0]
  if (!templateName) {
    ;(async () => {
      try {
        const pkgs = await getTemplateList(templateName)
        console.log(table([['名称', '模板描述']]))
        log.beauity(table(pkgs))
      } catch (err) {
        log.error('网络错误！')
      }
    })()
    return log.warn('请指定生成的模板文件，指令格式: feq i <模板名称> [项目根路径]\n')
  }
  let projectName = inputs[1] || ''
  if (projectName && fsExists(projectName)) {
    // console.log('path', resolve(projectName), fsExists(projectName))
    inquirer
      .prompt([{
        type: 'confirm',
        message: `文件夹${projectName}存在,是否覆盖`,
        name: 'overwrite'
      }])
      .then(answer => {
        // console.log('ans', answer, resolve(projectName))
        if (answer.overwrite) {
          downloadTemplate(templateName, resolve(projectName))
        } else {
          process.exit(1)
        }
      })
  } else {
    downloadTemplate(templateName, resolve(projectName))
  }
}
