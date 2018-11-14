module.exports = {
  prompts: {
    name: {
      message: '项目名字？',
      default: ':folderName:'
    },
    description: {
      message: '项目描述？',
      default: ':folderName:'
    },
    mobile: {
      message: '手机移动端项目？',
      type: 'confirm',
      default: false,
      store: true
    },
    username: {
      message: `你的名字？`,
      default: ':gitUser:',
      store: true
    },
    email: {
      message: `你的 Email？`,
      default: ':gitEmail:',
      store: true
    }
  },
  filters: {
    'src/html/partials/flexible.hbs': 'mobile'
  },
  move: {
    'gitignore': '.gitignore'
  },
  showTip: true,
  yarnInstall: true
}
