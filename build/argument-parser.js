'use strict'
const path = require('path')
const minimist = require('minimist')

module.exports = (env) => {
  if (!env) {
    env = {}
  }

  const args = {}
  args.host = env.host || process.env.HOST
  args.port = (env.port && Number(env.port)) || (process.env.PORT && Number(process.env.PORT))
  args.baseUrl = env.base || minimist(process.argv.slice(2)).base || '/'
  args.network = env.network || minimist(process.argv.slice(2)).network || 'mainnet'
  args.networkConfig = require(path.resolve(__dirname, `../networks/${args.network}.json`))
  args.routerMode = env.routerMode || (minimist(process.argv.slice(2)).history ? 'history' : 'hash')

  const argsPrint = []
  for(const argKey in args) {
    const argValue = args[argKey];
    if (typeof argValue === 'object') {
      continue;
    }
    argsPrint.push(`${argKey}: '${argValue || '-'}'`)
  }
  console.log(`Will use the arguments: ${argsPrint.join(', ')}`)
  return args
}
