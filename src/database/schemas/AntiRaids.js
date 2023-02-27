const { Schema, model } = require('mongoose')

const Setup = new Schema({
  GuildID: String
})

module.exports = model('Setups-AntiRaids-Guilds', Setup)
