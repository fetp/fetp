#!/usr/bin/env node
// console.log('hello CLI')

const program = require('commander')

// program
//   .version('0.1.0')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv)

// console.log('you ordered a pizza with:')
// if (program.peppers) console.log('  - peppers')
// if (program.pineapple) console.log('  - pineapple')
// if (program.bbqSauce) console.log('  - bbq')
// console.log('  - %s cheese', program.cheese)

program
  .command('create <type> [name] [otherParas]')
  .alias('c')
  .description('Create new template')
  .action(function (type, name, other) {
    console.log('type', type)
    console.log('name', name)
    console.log('other', other)
  })

program.parse(process.argv)
