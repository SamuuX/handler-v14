const { SlashCommandBuilder } = require('discord.js')
const WarnSchema = require('../../database/schemas/Warns.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('Elimina una advertencia de un usuario.')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('El usuario del que se eliminará la advertencia.')
        .setRequired(true))
    .addIntegerOption(option =>
      option
        .setName('advertencia')
        .setDescription('El número de advertencia que se eliminará.')
        .setRequired(true)),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const { guild, user: unwarnedUser, member: interactionMember } = interaction
    const unwarnedUserId = unwarnedUser.id
    const warnNumber = interaction.options.getInteger('advertencia')

    // Comprobar que el usuario que llama al comando tiene el rol de Staff o Moderador.
    const hasStaffRole = interactionMember.roles.cache.find(role => role.name === '『👨‍💻』| Staff')
    const hasModRole = interactionMember.roles.cache.find(role => role.name === '『⚙』 | Moderador')
    if (!hasStaffRole && !hasModRole) {
      return interaction.reply({
        content: 'No tienes permiso para usar este comando.',
        ephemeral: true
      })
    }

    // Comprobar que el usuario del que se eliminará la advertencia es un miembro del servidor.
    const member = guild.members.cache.get(unwarnedUserId)
    if (!member) {
      return interaction.reply({
        content: 'No se encontró al usuario especificado.',
        ephemeral: true
      })
    }

    // Obtener todas las advertencias del usuario de la base de datos.
    const warns = await WarnSchema.find({ guildId: guild.id, userId: unwarnedUserId })
    if (warns.length < 1) {
      return interaction.reply({
        content: `El usuario ${unwarnedUser.tag} no tiene advertencias registradas.`,
        ephemeral: true
      })
    }

    // Comprobar que la advertencia especificada existe.
    if (warnNumber < 1 || warnNumber > warns.length) {
      return interaction.reply({
        content: `La advertencia número ${warnNumber} no existe para el usuario ${unwarnedUser.tag}.`,
        ephemeral: true
      })
    }

    // Eliminar la advertencia de la base de datos.
    const warnToDelete = warns[warnNumber - 1]
    await warnToDelete.delete()

    // Responder al usuario.
    return interaction.reply({
      content: `Se ha eliminado la advertencia número ${warnNumber} del usuario ${unwarnedUser.tag}.`,
      ephemeral: true
    })
  }
}
