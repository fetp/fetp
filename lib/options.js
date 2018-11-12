const spinOpts = (type = 'dots') => {
  let opt = {
    'dots': {
      'interval': 80,
      'frames': [
        '⠋',
        '⠙',
        '⠹',
        '⠸',
        '⠼',
        '⠴',
        '⠦',
        '⠧',
        '⠇',
        '⠏'
      ]
    },
    'dots1': {
      'interval': 80,
      'frames': [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷'
      ]
    },
    'dots2': {
      'interval': 80,
      'frames': [
        '⠋',
        '⠙',
        '⠚',
        '⠞',
        '⠖',
        '⠦',
        '⠴',
        '⠲',
        '⠳',
        '⠓'
      ]
    }
  }[type]

  if (!opt) { console.log(opt) }
  return opt
}
module.exports = {
  spinOpts
}
