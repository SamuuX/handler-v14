const cron = require('node-cron')
const { EmbedBuilder } = require('discord.js')
module.exports = async (client) => {
  console.log(`Conectado como ${client.user.tag}`.green)
  if (client?.application?.commands) {
    client.application.commands.set(client.slashArray)
    console.log(`(/) ${client.slashCommands.size} Comandos Publicados!`.green)
  }
  //     const fetch = require('node-fetch');

  // setInterval(async function() {
  //     let user = "Samuu_X"

  //     const uptime = await fetch(`https://decapi.me/twitch/uptime/${user}`)
  //     const avatar = await fetch(`https://decapi.me/twitch/avatar/${user}`)
  //     const viewers = await fetch(`https://decapi.me/twitch/viewercount/${user}`)
  //     const title = await fetch(`https://decapi.me/twitch/title/${user}`)
  //     const game = await fetch(`https://decapi.me/twitch/game/${user}`)
  //     const twitch = require(`${process.cwd()}/src/database/schemas/twitchSchema`)
  //     let data = await twitch.findOne({ user: user, titulo: title.body })

  //     if (uptime.body !== `${user} is offline`) {
  //         const TwitchEmbed = new Discord.EmbedBuilder()
  //             .setAuthor({ "name": `${user}`, "iconURL": `${avatar.body}` })
  //             .setTitle(`${title.body}`)
  //             .setThumbnail(`${avatar.body}`)
  //             .setURL(`https://www.twitch.tv/${user}`)
  //             .addFields({ name: "Game", value: `${game.body}`, inline: true }, { name: "Viewers", value: `${viewers.body}`, inline: true })
  //             .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
  //             .setColor("BLURPLE")

  //         if (!data) {
  //             const newdata = new twitch({
  //                 user: user,
  //                 titulo: `${title.body}`
  //             })

  //             await client.channels.cache.get("1071947227519537183").send({ content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`, embeds: [TwitchEmbed] })

  //             return await newdata.save()
  //         }

  //         if (data.titulo === `${title.body}`) return;

  //         await client.channels.cache.get("1071947227519537183").send({ content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`, embeds: [TwitchEmbed] })

  //         await twitch.findOneAndUpdate({ user: user }, { titulo: title.body })
  //     }
  // }, 120000)
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
  cron.schedule('0 30 23 * * *', motivationTxt)
}
