const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
  GuildId: String
})

module.exports = model('Guilds-AntiLinks', guildSchema)
