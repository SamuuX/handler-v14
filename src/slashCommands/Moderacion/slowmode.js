const { SlashCommandBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Establece el modo lento en un canal de texto')
    .addStringOption(option => option.setName('time').setDescription('El tiempo para establecer el modo lento (ej: 1s, 5m, 2h)').setRequired(true)),

  async execute (client, interaction, GUILD_DATA) {
    const time = interaction.options.getString('time')
    if (!time) {
      await interaction.channel.setRateLimitPerUser(0)
      return interaction.reply({ content: '**El SlowMode ha sido removido.**', ephemeral: true })
    }
    const msTime = ms(time)
    if (isNaN(msTime)) return interaction.reply({ content: 'El tiempo ingresado es inválido, especifica un tiempo válido.', ephemeral: true })
    if (msTime < 1000) return interaction.reply({ content: 'El tiempo mínimo para el modo lento es 1 segundo.', ephemeral: true })
    await interaction.channel.setRateLimitPerUser(msTime / 1000)
    await interaction.reply({ content: `Se activó el modo lento en el canal con un tiempo de: ${ms(msTime, { long: true })}`, ephemeral: true })
  }
}
