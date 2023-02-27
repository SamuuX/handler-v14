const { EmbedBuilder } = require('discord.js')
const WarnSchema = require('../database/schemas/Warns.js')
const config = require(`${process.cwd()}/config.json`)

module.exports = async function addWarn (client, member, reason, interaction) {
  const currentWarns = await WarnSchema.findOne({ userId: member.id })
  const warnsCount = currentWarns ? currentWarns.warnsCount + 1 : 1
  const maxWarns = (await WarnSchema.findOne({ guildId: member.guild.id }))?.maxWarns ?? config.maxWarns
  const Moderador = await WarnSchema.find({ moderatorId: interaction.user.id })
  const guild = await WarnSchema.findOne({ guildID: member.guild.id })
  const UsuarioObj = guild.members.cache.get(currentWarns)

  const warnsChannel = client.channels.cache.get('1079023421494677524')

  if (warnsCount > maxWarns) {
    const embed = new EmbedBuilder()
      .setTitle('Usuario warneado')
      .setDescription(`${member} ha sido warneado y superó el límite de warns. Será temporalmente baneado.`)
      .addFields({ name: 'Razón', value: reason })
      .addField('Moderador', Moderador)
      .setColor('RED')
    try {
      await guild.member.ban(UsuarioObj, { reason })
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

  const newWarn = new WarnSchema({
    guildId: member.guild.id,
    userId: member.id,
    warnsCount,
    maxWarns,
    reason,
    moderatorId: interaction.user.id
  })
  await newWarn.save()

  const warnEmbed = new EmbedBuilder()
    .setTitle('Usuario warneado')
    .setDescription(`${member} ha sido warneado.`)
    .addField('Warns', `${warnsCount}/${maxWarns}`)
    .addField('Razón', reason)
    .addField('Moderador', Moderador)
    .setColor('ORANGE')

  member.roles.add(config.warnRoles[warnsCount])
  member.send(warnEmbed)
  warnsChannel.send({ embeds: [warnEmbed] })
}
