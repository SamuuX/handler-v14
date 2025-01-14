const secureSchema = require('../../database/schemas/Antilinks.js')
const ms = require('ms')
const { EmbedBuilder } = require('discord.js')
module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return
  const GUILD_DATA = await client.db.getGuildData(message.guild.id)

  if (!message.content.startsWith(GUILD_DATA.prefix)) return

  const ARGS = message.content
    .slice(GUILD_DATA.prefix.length)
    .trim()
    .split(/ +/)
  const CMD = ARGS?.shift()?.toLowerCase()

  const COMANDO =
    client.commands.get(CMD) ||
    client.commands.find((c) => c.ALIASES && c.ALIASES.includes(CMD))

  if (COMANDO) {
    if (COMANDO.OWNER) {
      if (!process.env.OWNER_IDS.split(' ').includes(message.author.id)) {
        return message.reply(
          `❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(
            ' '
          ).map((OWNER_ID) => `<@${OWNER_ID}>`)}`
        )
      }
    }

    if (COMANDO.BOT_PERMISSIONS) {
      if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) {
        return message.reply(
          `❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${COMANDO.BOT_PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(', ')}`
        )
      }
    }

    if (COMANDO.PERMISSIONS) {
      if (!message.member.permissions.has(COMANDO.PERMISSIONS)) {
        return message.reply(
          `❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${COMANDO.PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(', ')}`
        )
      }
    }

    try {
      // ejecutar el comando
      COMANDO.execute(client, message, ARGS, GUILD_DATA.prefix, GUILD_DATA)
    } catch (e) {
      message.reply(
        `**Ha ocurrido un error al ejecutar el comando \`${COMANDO.NAME}\`**\n*Mira la consola para más detalle.*`
      )
      console.log(e)
    }
  }
  const secureData = await secureSchema.findOne({ GuildId: message.guild.id })
  if (secureData) {
    if (
      message.content.match('https://') ||
      message.content.match('discord.gg') ||
      message.content.match('www.') ||
      message.content.match('.com')
    ) {
      if (message.member.permissions.has('ManageGuild')) return; if (message.member.permissions.has('Administrator')) return
      message.delete()
      const tiempo = 600000
      const time = ms(tiempo)
      const razon = 'Tu mensaje contiene un Links!'
      await message.member.timeout(tiempo, razon)
      const E = new EmbedBuilder()
        .setTitle('<a:AlertBotLuna:1016752635249950750> ANTI-LINKS <a:AlertBotLuna:1016752635249950750>')
        .setTimestamp()
        .setColor('Red')
        .setDescription(`Hey!!, <@${message.author.id}> **El Sistema de AntiLinks esta activado.**\nNo esta permitido enviar Links aqui.\nHas sido aislado temporalmente por **${time}** minutos.`)
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({ embeds: [E] })
    }
  }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
