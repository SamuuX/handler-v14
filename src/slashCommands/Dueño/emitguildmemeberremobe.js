const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('emitguildmemberremove')
    .setDescription('Emite el evento guildMemberRemove'),

  async execute (client, interaction, prefix, GUILD_DATA) {
    // Obtener la instancia del canal de registro de salida (salida de registros).
    const logChannel = client.channels.cache.get('1066939280674537562')

    // Verificar si el canal de registro de salida existe.
    if (!logChannel) {
      return interaction.reply({
        content: 'El canal de registro de salida no está configurado.',
        ephemeral: true
      })
    }

    // Emitir el evento "guildMemberRemove".
    client.emit('guildMemberRemove', interaction.member)

    // Enviar un mensaje al canal de registro de salida.
    logChannel.send(`${interaction.member} ha dejado el servidor.`)

    // Responder a la interacción.
    return interaction.reply({
      content: 'Evento guildMemberRemove emitido con éxito.',
      ephemeral: true
    })
  }
}
