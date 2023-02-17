const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Crea un ticket')
    .addStringOption(option =>
      option.setName('razon_del_ticket')
        .setDescription('Escribe aqui la razon para crear el ticket')
        .setRequired(true)
    ),

  async execute (client, interaction, prefix) {
    const Channel = client.channels.cache.get('1076137271708897365')

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Click Me')
          .setStyle(ButtonStyle.primary)
      )

    const texto = interaction.options.getString('razon_del_ticket')

    interaction.reply({ content: texto, components: [row] })
  }
}
