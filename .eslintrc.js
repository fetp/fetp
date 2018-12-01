// todo: eslint 插件化
module.exports = {
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  parserOptions:{
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures ": {
      "jsx": true,
      "modules": true
    }
  }
}