const { EmbedBuilder, AuditLogEvent } = require('discord.js')

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'despedidas'
  )

  if (!channel) return
  if (member.user.bot) return

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
          // {
          //   name: 'Roles del Usuario',
          //   value: userRoles,
          //   inline: true
          // },
          {
            name: 'Se unio al Servidor en',
            value: member.partial ? '*No puede determinar*' : `<t:${Math.floor(member.joinedTimestamp / 1000)}> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
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

  const kickChannel = client.channels.cache.get('1078935528830943262')

  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.MemberKick
  })
  // Since there's only 1 audit log entry in this collection, grab the first one
  const kickLog = fetchedLogs.entries.first()
  const { executor: Moderador, target: Usuario, reason: razonKick } = kickLog

  if (kickLog) {
    kickChannel.send({
      content: `**${member.user.tag}** ha sido kickeado del servidor. por <@!${Moderador.id}> y Actualmente hay ${member.guild.memberCount} miembros en el servidor.`,
      embeds: [
        new EmbedBuilder()
          .setColor('#FF0000')
          .setThumbnail(
            member.user.avatarURL({ format: 'png', size: 1024, dynamic: true })
          )
          .setAuthor({
            name: member.user.username, iconURL: member.user.avatarURL({ format: 'png', size: 1024, dynamic: true })
          })
          .setFooter({ text: `Logs - Kicks ${member.guild.name}`, iconURL: member.guild.iconURL({ format: 'png', size: 2048, dynamic: true }) })
          .setDescription(`***${member.user.tag}** ha sido kickeado del servidor el <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)*`)
          .addFields(
            {
              name: 'Usuario Kickeado',
              value: `<@!${Usuario.id}> - ${Usuario.tag} - ${Usuario.id}`,
              inline: true
            },
            // {
            //   name: 'Roles del Usuario Kickeado',
            //   value: userRoles,
            //   inline: true
            // },
            {
              name: 'Se unio al Servidor en',
              value: member.partial ? '*No puede determinar*' : `<t:${Math.floor(member.joinedTimestamp / 1000)}> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
              inline: true
            },
            {
              name: 'Moderador responsable',
              value: Moderador ? Moderador.username : 'Desconocido',
              inline: true
            },
            // {
            //   name: 'Roles del Moderador',
            //   value: modRoles,
            //   inline: true
            // },
            {
              name: 'Razon del kick',
              value: `${razonKick || 'Sin rason'}`,
              inline: true
            }
          )
      ]
    })
  }
}
