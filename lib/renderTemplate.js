const ora = require('ora')
const got = require('got')
const table = require('text-table')
const options = require('./options')

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
        return [item.package.name.replace(/^@rendertemplate\/fetp-template-/g, ''), item.package.description, item.package.version]
      })
    })
}

module.exports = function (templates) {
  const template = templates[0]
  const spinner = ora('Loading unicorns').start('当前正在下载中...')
  spinner.spinner = options.spinOpts('dots')
  spinner.color = 'green'
  ;(async () => {
    try {
      const pkgs = await getTemplateList(template)
      let tpkgs = table(pkgs)
      console.log('package', tpkgs)
    } catch (err) {
      console.log('err', err)
    }
  })()

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
