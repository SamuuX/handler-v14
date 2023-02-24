const axios = require('axios')
const cron = require('node-cron')
const { EmbedBuilder } = require('discord.js')
module.exports = async (client) => {
  console.log(`Conectado como ${client.user.tag}`.green)
  if (client?.application?.commands) {
    client.application.commands.set(client.slashArray)
    console.log(`(/) ${client.slashCommands.size} Comandos Publicados!`.green)
  }

  const guild = client.guilds.cache.get('1066925479522730015')

  const Admins = guild.roles.cache.find(
    (role) => role.name === '『🎩』| Administrador'
  )

  const staff = guild.roles.cache.find((role) => role.name === '『👨‍💻』| Staff')

  const memberRole = guild.roles.cache.find(
    (role) => role.name === '『👤』| Miembro'
  )

  const totalMembers = guild.members.cache.filter(
    (member) => !member.user.bot
  ).size

  const totalBots = guild.members.cache.filter((member) => member.user.bot).size

  const totalAdmins = guild.members.cache.filter((member) =>
    member.roles.cache.has(Admins.id)
  ).size

  const totalStaff = guild.members.cache.filter((member) =>
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

  function actualizarConteoDeMiembros () {
    // // Obtiene el número de miembros que tienen el rol 'Admin' y están conectados
    // const adminsConectados = guild.members.cache.filter(
    //   (member) =>
    //     member.roles.cache.has('1067139050328301638') &&
    //     member.presence.status !== 'offline'
    // ).size

    // // Obtiene el número de miembros que tienen el rol 'Staff' y están conectados
    // const staffConectados = guild.members.cache.filter(
    //   (member) =>
    //     member.roles.cache.has('1072028259618934814') &&
    //     member.presence.status !== 'offline'
    // ).size

    // // Actualiza el nombre del canal de texto correspondiente con los nuevos valores
    // client.channels.cache
    //   .get('1078536013045059624')
    //   .setName(`『🎩』Admins on: ${adminsConectados}`)
    // client.channels.cache
    //   .get('1078539338347982848')
    //   .setName(`『🛡️』Staff on: ${staffConectados}`)

    client.channels.cache
      .get('1078499717345972284')
      .setName(
        `🟢: ${
          guild.members.cache.filter((m) => m.presence?.status === 'online')
            .size
        } 🌙: ${
          guild.members.cache.filter((m) => m.presence?.status === 'idle').size
        } ⛔: ${
          guild.members.cache.filter((m) => m.presence?.status === 'dnd').size
        } 🌑: ${
          guild.members.cache.filter(
            (m) => m.presence?.status === 'offline' || !m.presence
          ).size
        }`
      )
    // client.channels.cache.get('1078536013045059624').setName(`『🎩』| Admins Conectdos: ${}`)
    // client.channels.cache.get('1078539338347982848').setName(`『🛡️』| Staff Conectdos: ${}`)
  }
  actualizarConteoDeMiembros()

  async function TwitchFunction () {
    const user = 'Samuu_X'

    const [uptime, avatar, viewers, title, game] = await Promise.all([
      axios.get(`https://decapi.me/twitch/uptime/${user}`),
      axios.get(`https://decapi.me/twitch/avatar/${user}`),
      axios.get(`https://decapi.me/twitch/viewercount/${user}`),
      axios.get(`https://decapi.me/twitch/title/${user}`),
      axios.get(`https://decapi.me/twitch/game/${user}`)
    ])

    const Twitch = require(`${process.cwd()}/src/database/schemas/twitchSchema.js`)
    const data = await Twitch.findOne({ user, titulo: title.data })

    if (uptime.data !== `${user} is offline`) {
      const TwitchEmbed = new EmbedBuilder()
        .setAuthor({ name: `${user}`, iconURL: `${avatar.data}` })
        .setTitle(`${title.data}`)
        .setThumbnail(`${avatar.data}`)
        .setURL(`https://www.twitch.tv/${user}`)
        .addFields(
          { name: 'Game', value: `${game.data}`, inline: true },
          { name: 'Viewers', value: `${viewers.data}`, inline: true }
        )
        .setImage(
          `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`
        )
        .setColor('BLURPLE')

      if (!data) {
        const newdata = new Twitch({
          user,
          titulo: `${title.data}`
        })

        await client.channels.cache.get('1071947227519537183').send({
          content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`,
          embeds: [TwitchEmbed]
        })

        return await newdata.save()
      }

      if (data.titulo === `${title.data}`) return

      await client.channels.cache.get('1071947227519537183').send({
        content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`,
        embeds: [TwitchEmbed]
      })

      await Twitch.findOneAndUpdate({ user }, { titulo: title.data })
    }
  }

  function motivationTxt () {
    const frase = [
      // estas son las fraces motivadoras, las puedes personalizar a tu gusto
      'La vida es una aventura emocionante, ¡asegúrate de vivirla al máximo!',
      'Nunca es demasiado tarde para ser lo que quieres ser',
      'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito',
      'La vida es un regalo, ¡no lo dejes pasar!',
      'La perseverancia es la madre de todas las cualidades',
      'El fracaso es simplemente la oportunidad de comenzar de nuevo con más experiencia',
      'La vida es como andar en bicicleta. Para mantener el equilibrio, debes seguir adelante',
      'No te rindas, el fracaso es solo una oportunidad para comenzar de nuevo con más experiencia'
    ]

    // console.log(Quote.getQuote({ author: false }))
    const img = [
      // estas son las imagenes motivadoras, las puedes personalizar a tu gusto
      'https://pm1.narvii.com/6573/7a48fd580cfcee796669d1414e055247502f5eb2_hq.jpg',
      'https://wc.wallpaperuse.com/wallp/46-465576_s.jpg',
      'https://i.pinimg.com/originals/9b/27/95/9b27958bad64aaf2de043b0ebdf63310.jpg',
      'https://pm1.narvii.com/6626/a73df3afb14a61710b50015847507037988d9a52_hq.jpg',
      'https://i.pinimg.com/originals/49/fe/c8/49fec86beb14058b401afddf41d12877.jpg',
      'https://www.todofondos.net/wp-content/uploads/1920x1200-Mujeres-Agua-Nubes-Paisajes-Arboles-Arte-de-Fantasia.jpg'
    ]

    const frases = frase[Math.floor(Math.random() * frase.length)] // con esto creamos la funcion de enviar frases aleatorias
    const imagenes = img[Math.floor(Math.random() * img.length)] // con esto creamos la funcion de enviar imagenes aleatorias

    const MotivationalTxt = new EmbedBuilder()
      .setAuthor({
        name: 'Frace motivadora!',
        iconURL:
          'https://cdn.discordapp.com/attachments/1044696367433527311/1064738776057905152/d20d172af361678d811812f14154b004.png'
      }) // Este es el titulo superior del mensaje
      .setDescription(`\`\`\`${frases}\`\`\``) // Aca van las frases motivadoras que se enviaran
      .setImage(`${imagenes}`) // Aca van las imagenes motivadoras que se enviaran
      .setColor('e60ad4') // Esto es opcional tambien, si quieres le puedes poner un color pero siempre todo en mayuscula y que sea en ingles el color, o tambien puedes poner un Hexcolor //para que le salga la hora que lo ejecuto
    client.channels.cache.get('1069840143994863686').send({
      content: '🔴 Nueva Frace para la gente <@&1072028278140981288>',
      embeds: [MotivationalTxt]
    })
  }

  cron.schedule('*/2 * * * *', actualizarConteoDeMiembros)
  cron.schedule('0 14 * * *', motivationTxt)
  cron.schedule('30 15 * * 1-5', TwitchFunction)
}
