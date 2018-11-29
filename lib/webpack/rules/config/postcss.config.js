module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 75, // 用于 750px 宽度的设计稿
      unitPrecision: 2, // 转换成rem后保留的小数点位数
      propList: ['*'],
      selectorBlackList: [], // 对css选择器进行过滤的数组
      replace: true,
      mediaQuery: false,
      minPixelValue: 1 // 所有小于1px的样式都不被转换
    }),
    require('autoprefixer')({
      browsers: [
        // 加这个后可以出现额外的兼容性前缀
        '> 0.01%'
      ]
    })
  ]
}
