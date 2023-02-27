const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un miembro del servidor.')
    .addUserOption(option =>
      option.setName('miembro')
        .setDescription('El miembro que deseas banear.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('razón')
        .setDescription('La razón del ban.')
        .setRequired(false)),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const member = interaction.options.getMember('miembro')
    const reason = interaction.options.getString('razón') || 'Sin razón especificada.'

    // Comprobar si el miembro tiene permisos para banear.
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({
        content: 'No tienes permiso para banear miembros.',
        ephemeral: true
      })
    }

    // Comprobar si el miembro que se va a banear tiene permisos iguales o superiores a los del miembro que ejecuta el comando.
    if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({
        content: 'No puedes banear a este miembro.',
        ephemeral: true
      })
    }

    try {
      // Banear al miembro.
      await member.ban({ reason })

      // Enviar un mensaje de confirmación.
      return interaction.reply({
        content: `${member.user.tag} ha sido baneado por ${interaction.user.tag} por la siguiente razón: ${reason}`,
        ephemeral: false
      })
    } catch (error) {
      console.error(error)
      return interaction.reply({
        content: 'Ha ocurrido un error al intentar banear a este miembro.',
        ephemeral: true
      })
    }
  }
}
