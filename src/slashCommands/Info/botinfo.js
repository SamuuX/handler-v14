const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const os = require('os')

module.exports = {
  CMD: new SlashCommandBuilder().setDescription(
    'Muestra información del entorno'
  ),

  execute (client, interaction, prefix, GUILD_DATA) {
    const uptime = process.uptime()
    const days = Math.trunc(uptime / 86400)
    const hours = Math.trunc(uptime / 3600) % 24
    const minutes = Math.trunc(uptime / 60) % 60
    const seconds = Math.trunc(uptime % 60)
    const uptimeString = `${days} día(s), ${hours} hora(s), ${minutes} minuto(s), y ${seconds} segundo(s)`

    let osName
    switch (os.type()) {
      case 'Linux':
        osName = '🐧 Linux'
        break
      case 'Windows_NT':
        osName = '💻 Windows'
        break
      case 'Darwin':
        osName = '🍎 Mac'
        break
      default:
        osName = os.type()
    }

    const cpuUsage = os.loadavg()[0]
    // eslint-disable-next-line no-unused-vars
    const cpuUsageString = `${cpuUsage.toFixed(2)}%`

    const embed = new EmbedBuilder()
      .setTitle('Informacion del bot')
      .addFields([
        { name: 'Versión de Node.js', value: process.version },
        { name: 'Versión de Discord.js', value: require('discord.js').version },
        { name: 'Sistema Operativo', value: osName },
        { name: 'Ping', value: `${client.ws.ping} ms` },
        { name: 'Uptime', value: uptimeString },
        { name: 'Uso del cpu', value: `${cpuUsage.toFixed(2)}%` }
      ])
      .setColor('White')
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    })
  }
}
