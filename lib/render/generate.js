const getOption = require('./options').getOption
module.exports = function generate (name, dest, done) {
  done()
  getOption(name, dest, done)
}
