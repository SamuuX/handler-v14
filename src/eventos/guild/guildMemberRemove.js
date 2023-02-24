const { EmbedBuilder } = require('discord.js')

module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'despedidas'
  )

  if (!channel) return

  const { user } = member

  const Admins = member.guild.roles.cache.find(
    (role) => role.name === '『🎩』| Administrador'
  )

  const staff = member.guild.roles.cache.find(
    (role) => role.name === '『👨‍💻』| Staff'
  )

  const memberRole = member.guild.roles.cache.find(
    (role) => role.name === '『👤』| Miembro'
  )

  const totalMembers = member.guild.members.cache.filter(
    (member) => !member.user.bot
  ).size

  const totalBots = member.guild.members.cache.filter(
    (member) => member.user.bot
  ).size

  const totalAdmins = member.guild.members.cache.filter((member) =>
    member.roles.cache.has(Admins.id)
  ).size

  const totalStaff = member.guild.members.cache.filter((member) =>
    member.roles.cache.has(staff.id)
  ).size

  client.channels.cache
    .get('1066925480474857621')
    .setName(`👥 Total users - ${totalMembers}`)
  client.channels.cache
    .get('1066925480785231942')
    .setName(`👤 Miembros - ${memberRole.members.size}`)
  client.channels.cache
    .get('1066925480785231943')
    .setName(`🤖 Bots - ${totalBots}`)
  client.channels.cache
    .get('1076317793584152627')
    .setName(`『🎩』| Admins - ${totalAdmins}`)
  client.channels.cache
    .get('1078485813530198148')
    .setName(`『🛡️』| Staff - ${totalStaff}`)

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
