const { Schema, model } = require('mongoose')

const Ticket = new Schema({
  user: {
    type: String,
    required: true
  },

  razon_del_ticket: {
    type: String,
    required: true,
    default: 'sin razon'
  },
  usuario_reportado: {
    type: String,
    require: true
  }
})

module.exports = model('twitchSchema', Ticket)
