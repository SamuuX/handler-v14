const { EmbedBuilder } = require('discord.js')

module.exports = async (client, ban) => {
  const guild = ban.guild

  if (!guild.me.permissions.has('VIEW_AUDIT_LOG')) return

  const logs = await guild.fetchAuditLogs({
    type: 'MEMBER_BAN_REMOVE',
    limit: 1
  })
  const entry = logs.entries.first()

  if (!entry) return

  const { executor, target } = entry
  const usuario = target

  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('**[USUARIO DESBANEADO]**')
    .setDescription(`**Usuario:** ${usuario.tag} (ID: ${usuario.id})`)
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL())

  if (!entry) {
    embed.addFields({
      name: 'Moderador desconocido',
      value: 'No se pudo encontrar una entrada en el registro de auditoría'
    })
  } else {
    const { executor, target } = entry

    embed.addFields(
      {
        name: 'Moderador',
        value: `${executor.tag} (ID: ${executor.id})`,
        inline: true
      },
      {
        name: 'Usuario desbaneado',
        value: `${target.tag} (ID: ${target.id})`,
        inline: true
      }
    )
  }

  const logsChannel = guild.channels.cache.find((c) => c.name === 'logs')
  if (!logsChannel) return console.error('No se encontró el canal de logs.')
  logsChannel.send({
    content: `¡@here <@&1072028259618934814> ${executor.tag} ha desbaneado a **${usuario.tag}**!`,
    embeds: [embed]
  })
}
