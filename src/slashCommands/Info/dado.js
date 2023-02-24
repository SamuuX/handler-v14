const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder().setDescription('Tira Un Dado Aleatorio'),

  execute (client, interaction, prefix, GUILD_DATA) {
    const dados = ['1', '2', '3', '4', '5', '6']

    const dadosFinal = dados[Math.floor(Math.random() * dados.length)]

    const embed = new EmbedBuilder()
      .setTitle(' Dado ')
      .addFields([
        {
          name: ' El Numeró Que Salió Fue:',
          value: `\`\`\`${dadosFinal}\`\`\``
        }
      ])
      .setColor('#FFF195')

    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}
