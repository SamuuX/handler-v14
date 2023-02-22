const { EmbedBuilder } = require('discord.js')

function getMemberRoles (member, guild) {
  const roles = member.roles.cache
    .filter((r) => r.id !== guild.id)
    .sort((a, b) => b.position - a.position)
    .map((r) => r.toString())
  return roles.length > 0 ? roles.join(', ') : 'Sin rangos'
}
module.exports = async (guild, user) => {
  if (!guild.me.permissions.has('VIEW_AUDIT_LOG')) return
  const logs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' })
  const entry = logs.entries.first()
  if (!entry) return

  const executor = entry.executor
  const reason = entry.reason || 'No especificado'

  const embed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('**[BANEO]**')
    .setDescription(`El usuario **${user.tag}** ha sido baneado`)
    .addFields(
      { name: 'ID del usuario', value: user.id, inline: true },
      { name: 'Moderador', value: executor.tag, inline: true },
      {
        name: 'Rangos',
        value: `${getMemberRoles(executor, guild)}`,
        inline: false
      },
      { name: 'Motivo', value: reason, inline: true }
    )
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL())
    .setFooter(
      `Usuario baneado por ${executor.tag}`,
      executor.displayAvatarURL()
    )

  const logsChannel = guild.channels.cache.get('1074929289776078928')
  if (logsChannel) {
    logsChannel.send({
      content: `Ey, @here <@&1072028259618934814> hay un nuevo Baneo a **${user.tag}** por "**${reason}**"`,
      embeds: [embed]
    })
  }
}
