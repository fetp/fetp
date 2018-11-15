const { join } = require('path')
const got = require('got')
const inquirer = require('inquirer')
const table = require('text-table')
const log = require('../utils/log')
const { fsExists, tmpLocalLib, rm } = require('../utils')
const { downloadTemplate } = require('./download')

/** npmjs.com  search */
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
/**
 *  模板渲染
 *  @param inputs[0] <模板类型> basic vue
 *  @param inputs[1] [模板名称]
 *
*/
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
  // 获取项目名称
  let projectName = inputs[1] || ''
  // 项目路径
  let proLink = join(__dirname, projectName)
  // 本地模板路径
  let tmpLink = join(tmpLocalLib, templateName)
  console.log(proLink)
  if (proLink && fsExists(proLink)) {
    // console.log('path', resolve(projectName), fsExists(projectName))
    inquirer
      .prompt([{
        type: 'confirm',
        message: `${projectName} 目录已存在,是否覆盖？`,
        name: 'overwrite'
      }])
      .then(answer => {
        if (answer.overwrite) {
          rm(proLink)
          downloadTemplate(templateName, tmpLink, projectName)
        } else {
          process.exit(1)
        }
      })
  } else {
    downloadTemplate(templateName, tmpLink, projectName)
  }
}
