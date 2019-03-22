'use strict'

const debug = require('debug')('smpmall:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'Esto destruira tu base de datos, esta seguro?'
    }

  ])
  if (!answer.setup) {
    return console.log('Nothing Happened :)')
  }
  const config = {
    database: process.env.DB_NAME || 'smpmall',
    username: process.env.DB_USER || 'smpnode',
    password: process.env.DB_PASS || 'smp',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)
  console.log('Sucess')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('Error en Setup: ')}${chalk.yellow(err.message)}`)
  console.error(`${chalk.red('Error en Setup: ')}${chalk.yellow(err.stack)}`)
  process.exit(1)
}
setup()
