const ora = require('ora')
const got = require('got')
const { resolve } = require('path')
const download = require('download-git-repo')
const table = require('text-table')
const options = require('./options')
const log = require('./log')

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

module.exports = function (templates) {
  // 获取模板名称
  const template = templates[0]
  if (!template) {
    ;(async () => {
      try {
        const pkgs = await getTemplateList(template)
        console.log(table([['名称', '模板描述']]))
        log.beauity(table(pkgs))
      } catch (err) {
        log.error('网络错误！')
      }
    })()
    return log.warn('请指定生成的模板文件，指令格式: feq i <模板名称> [项目根路径]\n')
  }
  if (template) {
    console.log('暂停')
    return
  }
  // 下载目录
  const destination = resolve(__dirname, '../source')
  const spinner = ora(`${log.beauity(`CLI create ${template} template`, 'green')}`)
  spinner.spinner = options.spinOpts('dots')
  log.beauity('Downloading ...')
  spinner.color = 'green'
  spinner.start(`> Installing ${template} start`)
  download(`yang657850144/fetp-template-${template}`, destination, { clone: false }, (err) => {
    spinner.stop()
    if (err) log.error(`${err}`)
    log.success('')
  })
}
