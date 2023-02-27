const { Schema, model } = require('mongoose')

const warnSchema = new Schema({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  warnsCount: { type: Number, default: 0 },
  maxWarns: { type: Number, default: 3 },
  reason: { type: String, required: true },
  moderatorId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

module.exports = model('Warn', warnSchema)
