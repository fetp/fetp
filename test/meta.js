module.exports = {
  prompts: {
    name: {
      name: 'projectName',
      message: '项目名字？',
      default: ':folderName:'
    },
    description: {
      name: 'projectDesc',
      message: '项目描述？',
      default: ':folderName:'
    },
    username: {
      name: 'yourname',
      message: `你的名字？`,
      default: ':gitUser:'
    },
    email: {
      name: 'youremail',
      message: `你的 Email？`,
      default: ':gitEmail:'
    }
  },
  filters: {
  }
}
