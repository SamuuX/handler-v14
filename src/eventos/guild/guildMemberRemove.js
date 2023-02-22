const { EmbedBuilder } = require('discord.js')

module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'despedidas'
  )

  if (!channel) return

  const { user } = member

  channel.send({
    content: `**${member.user.tag}** ha abandonado el servidor. ¡Esperamos verte de nuevo pronto! Actualmente hay ${member.guild.memberCount} miembros en el servidor.`,
    embeds: [
      new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('¡Hasta la vista!')
        .setDescription(
          `**${member.user.username}** ha abandonado el servidor.`
        )
        .addFields(
          {
            name: 'Nombre del usuario',
            value: user.username,
            inline: true
          },
          {
            name: 'ID del Usuario',
            value: user.id,
            inline: true
          },
          {
            name: 'Fecha de ingreso',
            value: member.joinedAt.toUTCString(),
            inline: true
          }
        )
        .setThumbnail(
          member.user.avatarURL({ format: 'png', size: 1024, dynamic: true })
        )
        .setTimestamp()
    ]
  })
}
