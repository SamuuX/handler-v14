const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un miembro del servidor.')
    .addUserOption(option =>
      option.setName('miembro')
        .setDescription('El miembro que deseas expulsar.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('razón')
        .setDescription('La razón de la expulsión.')
        .setRequired(false)),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const member = interaction.options.getMember('miembro')
    const reason = interaction.options.getString('razón') || 'Sin razón especificada.'

    // Comprobar si el miembro tiene permisos para expulsar.
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply({
        content: 'No tienes permiso para expulsar miembros.',
        ephemeral: true
      })
    }

    // Comprobar si el miembro que se va a expulsar tiene permisos iguales o superiores a los del miembro que ejecuta el comando.
    if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply({
        content: 'No puedes expulsar a este miembro.',
        ephemeral: true
      })
    }

    try {
      // Expulsar al miembro.
      await member.kick(reason)

      // Enviar un mensaje de confirmación.
      return interaction.reply({
        content: `${member.user.tag} ha sido expulsado por ${interaction.user.tag} por la siguiente razón: ${reason}`,
        ephemeral: false
      })
    } catch (error) {
      console.error(error)
      return interaction.reply({
        content: 'Ha ocurrido un error al intentar expulsar a este miembro.',
        ephemeral: true
      })
    }
  }
}
