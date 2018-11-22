module.exports = class Service {
  constructor (context) {
    this.context = context
  }
  init (mode) {}
  run () {
    console.log('service is running.')
  }
}
