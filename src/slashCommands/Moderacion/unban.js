const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Desbanea a un miembro del servidor.')
    .addStringOption(option =>
      option.setName('miembro')
        .setDescription('El ID o la mención del miembro que se va a desbanear.')
        .setRequired(true)
    ),

  async execute (client, interaction, prefix, GUILD_DATA) {
    // Comprobar si el miembro tiene permisos para ejecutar el comando.
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({
        content: 'No tienes permiso para desbanear miembros en el servidor.',
        ephemeral: true
      })
    }

    // Obtener el miembro que se va a desbanear.
    const bannedMember = interaction.options.get('miembro').value

    try {
      // Desbanear al miembro por ID o por mención.
      await interaction.guild.members.unban(bannedMember)

      // Enviar un mensaje que indica que el miembro ha sido desbaneado.
      return interaction.reply({
        content: `El miembro ${bannedMember} ha sido desbaneado del servidor.`,
        ephemeral: false
      })
    } catch (error) {
      console.error(error)
      return interaction.reply({
        content: 'Ha ocurrido un error al intentar desbanear al miembro del servidor.',
        ephemeral: true
      })
    }
  }
}
