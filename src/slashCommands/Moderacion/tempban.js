const { SlashCommandBuilder } = require('discord.js')
const moment = require('moment')
const ms = require('ms')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('tempban')
    .setDescription('Banea a un usuario temporalmente.')
    .addUserOption((option) =>
      option
        .setName('usuario')
        .setDescription('El usuario que deseas banear temporalmente.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('duración')
        .setDescription('La duración del ban (ejemplo: 1d, 2h, 30m).')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('razón')
        .setDescription('La razón del ban.')
    ),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const { guild, user } = interaction
    const member = guild.members.cache.get(user.id)
    const userToBan = interaction.options.getUser('usuario')
    const durationStr = interaction.options.getString('duración')
    const reason = interaction.options.getString('razón') || 'No especificado'

    // Comprobar permisos.
    if (!member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({
        content: 'No tienes permiso para usar este comando.',
        ephemeral: true
      })
    }

    // Obtener el objeto de usuario a banear.
    const userToBanId = userToBan.id
    const userToBanObj = guild.members.cache.get(userToBanId)

    // Comprobar si el usuario a banear está en el servidor.
    if (!userToBanObj) {
      return interaction.reply({
        content: 'No se ha encontrado al usuario en el servidor.',
        ephemeral: true
      })
    }

    // Comprobar si el usuario a banear tiene permisos de administrador.
    if (userToBanObj.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({
        content: 'No puedes banear a un administrador.',
        ephemeral: true
      })
    }

    // Analizar la duración.
    const durationMs = ms(durationStr)
    if (!durationMs || durationMs < 1000) {
      return interaction.reply({
        content: 'Debes especificar una duración válida.',
        ephemeral: true
      })
    }

    // Calcular la fecha y hora de finalización del ban.
    const banEnd = moment().add(durationMs, 'ms').toDate()

    // Banear al usuario.
    try {
      await guild.members.ban(userToBanObj, { reason })
    } catch (err) {
      console.error(err)
      return interaction.reply({
        content: 'Ha ocurrido un error al intentar banear al usuario.',
        ephemeral: true
      })
    }

    // Enviar mensaje de confirmación.
    const formattedBanEnd = moment(banEnd).format('DD/MM/YYYY HH:mm:ss')
    await interaction.reply({
      content: `El usuario ${userToBan.tag} ha sido baneado por ${durationStr}.\nRazón: ${reason}\nEl ban finaliza el ${formattedBanEnd}.`,
      ephemeral: true
    })

    // Esperar a que termine el tiempo del ban y desbanear al usuario.
    setTimeout(async () => {
      try {
        await guild.members.unban(userToBanId)
      } catch (err) {
        console.error(err)
      }
    }, durationMs)
  }
}
