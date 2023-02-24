const { EmbedBuilder } = require('discord.js')

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'bienvenidas'
  ) // reemplaza 'nombre-del-canal' con el nombre del canal donde quieres enviar el mensaje
  if (!channel) return

  const { user } = member
  // Obtener el rol que quieres darle al usuario
  const role = member.guild.roles.cache.find(
    (role) => role.name === '『👤』| Miembro'
  )

  //
  const gifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNThjZTQ3MWU4YTdiMTI4YTcwMDM1ODAwZGEyYWFhYmZmMmI1NDMyMCZjdD1n/xAdtMyM5YEcRq/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmUxYWFlMmZjYzc4OTIxZjc0YmQ4YzdmMDczMzFmODk0MDg0NDY4NCZjdD1n/mCldW0Rs4jQ3e/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDA1YjMzZGM1YTljYTc4Zjk1OGVjMmQ1M2U3YjZjMDQ1MmE0OGMxMCZjdD1n/74xVEuCoCYbAs/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJlYzAzN2E0OWE0ZDY4NzY5NjA2MTY3NjQ2ZDczOTE4ZTc5ZWFlZCZjdD1n/CLjDObrNKaYus/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzU0ODhiMWZlYjM2OTQxNGJjNjY1ZDc2MzVhZDhjMTcxNmExMGQ5MSZjdD1n/ji8gaEYQpvxKQTrnsJ/giphy.gif'
  ]
  const randomIndex = Math.floor(Math.random() * gifs.length)
  const randomGif = gifs[randomIndex]

  // Si el rol existe, agregarlo al usuario
  if (role) {
    member.roles
      .add(role)
      .then(() =>
        console.log(
          `Se ha agregado el rol ${role.name} a ${member.displayName}`
        )
      )
      .catch(console.error)
  } else {
    console.log(`No se ha encontrado el rol ${role.name}`)
  }

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
    content: `『🔔』| Nuevo Miembro del servidor ${user.username} - <@!${user.id}> - ${client.users.cache.size} usuarios.`,
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: channel.guild.name,
          iconURL: channel.guild.iconURL()
        })
        .setTitle('¡Hola!')
        .setDescription('Bienvenid@ a mi servidor de Roleplay')
        .setThumbnail(`${member.user.avatarURL({ forceStatic: false })}`) // AQUÍ VA EL AVATAR DEL USUARIO QUE ENTRÓ
        .setImage(randomGif) // EL GIF O FOTO QUE QUIERAS
        .setFooter({
          text: `Bienvenidas de ${channel.guild.name}`
        })
        .setColor('#ffffff')
    ]
  })
}
