const { resolve } = require('path')
const { cwd } = require('../../utils')
exports.serverEntry = resolve(cwd, './test')
