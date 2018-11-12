const ora = require('ora')
const got = require('got')
const table = require('text-table')
const options = require('./options')
const log = require('./log')

const request = got.extend({
  baseUrl: 'https://www.npmjs.com/search?q=rendertemplate%2Ffetp-template',
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
  const template = templates[0]
  if (!template) {
    ;(async () => {
      try {
        const pkgs = await getTemplateList(template)
        console.log(table([['名称', '模板描述']]))
        log.beauity(table(pkgs))
      } catch (err) {
        log.error('网络错误啦！')
      }
    })()
    return log.warn('请指定生成的模板文件，指令格式: feq i <模板名称> [项目根路径]\n')
  }
  const spinner = ora('Loading unicorns\n').start()
  spinner.spinner = options.spinOpts('dots')
  spinner.color = 'green'

  setTimeout(_ => {
    spinner.text = '加载完成...'
    // spinner.stop()
    spinner.succeed('成功')
    // spinner.fail('失败')
  }, 5000)
  // console.log(template)
  // const template = templates[0]
  // if(!)
}
