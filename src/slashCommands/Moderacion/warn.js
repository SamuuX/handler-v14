const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const WarnSchema = require('../../database/schemas/Warns.js')
const addWarn = require('../../utils/addWarn.js')
const config = require(`${process.cwd()}/config.json`)

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Añade una advertencia a un usuario.')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('El usuario al que se le añadirá la advertencia.')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('razón')
        .setDescription('La razón de la advertencia.')
        .setRequired(true)),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const { guild, user: warnedUser, member: interactionMember } = interaction
    const reason = interaction.options.getString('razón')
    const warnedUserId = warnedUser.id
    const Moderador = await WarnSchema.find({ moderatorId: interaction.user.id })
    const currentWarns = await WarnSchema.findOne({ userId: interactionMember.id })
    const warnsCount = currentWarns ? currentWarns.warnsCount + 1 : 1
    const maxWarns = (await WarnSchema.findOne({ guildId: interactionMember.guild.id }))?.maxWarns ?? config.maxWarns
    const UsuarioObj = guild.members.cache.get(currentWarns)

    const warnsChannel = client.channels.cache.get('1079023421494677524')
    // Comprobar que el usuario que llama al comando tiene permisos para hacerlo.
    const hasStaffRole = interactionMember.roles.cache.find(role => role.name === '『👨‍💻』| Staff')
    const hasModRole = interactionMember.roles.cache.find(role => role.name === '『⚙』 | Moderador')
    if (!hasStaffRole && !hasModRole) {
      return interaction.reply({
        content: 'No tienes permiso para usar este comando.',
        ephemeral: true
      })
    }

    // Comprobar que el usuario que se va a warnear es un miembro del servidor.
    const member = guild.members.cache.get(warnedUserId)
    if (!member) {
      return interaction.reply({
        content: 'No se encontró al usuario especificado.',
        ephemeral: true
      })
    }

    // Buscar el número actual de advertencias del usuario.
    const currentWarnCount = await WarnSchema.countDocuments({ guildId: guild.id, userId: warnedUserId })

    // Si el usuario ya alcanzó el límite de advertencias, responder con un mensaje y no crear una nueva advertencia.
    if (warnsCount > maxWarns) {
      const embed = new EmbedBuilder()
        .setTitle('Usuario warneado')
        .setDescription(`${member} ha sido warneado y superó el límite de warns. Será temporalmente baneado.`)
        .addFields({ name: 'Razón', value: reason })
        .addField('Moderador', Moderador)
        .setColor('RED')
      try {
        await guild.member.ban(member, { reason })
      } catch (error) {
        console.log(error)
        return interaction.reply({
          content: 'Ha ocurrido un error al intentar banear al usuario.',
          ephemeral: true
        })
      }
      member.roles.add(process.env.mutedRoleId)
      setTimeout(() => {
        member.roles.add(config.warnRoles[warnsCount])
        guild.members.unban(UsuarioObj, 'Finalizó el baneo temporal.')
        member.roles.remove(process.env.mutedRoleId)
      }, process.env.tempbanDuration ? config.tempbanDuration : 259200000)

      return warnsChannel.send(embed)
    }

    // Crear la advertencia en la base de datos.
    const newWarn = new WarnSchema({
      guildId: guild.id,
      userId: warnedUserId,
      warnsCount: currentWarnCount + 1,
      reason,
      moderatorId: interaction.user.id
    })
    await newWarn.save()

    // Responder al usuario.
    return interaction.reply({
      content: `Se ha añadido una advertencia al usuario ${warnedUser.tag} por la siguiente razón: ${reason}.`,
      ephemeral: true
    })
  }
}
