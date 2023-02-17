const { glob } = require('glob')
const { promisify } = require('util')
const proGlob = promisify(glob)
const logst = require('broly-logs')

module.exports = class BotUtils {
  constructor (client) {
    this.client = client
    logst(client)
  }

  async loadFiles (dirName) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, '/')}/${dirName}/**/*.{js,json}`)
    Files.forEach((file) => delete require.cache[require.resolve(file)])
    return Files
  }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
