const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js')
module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Crea un ticket')
    .addStringOption((option) =>
      option
        .setName('razon_del_ticket')
        .setDescription('Escribe aqui la razon para crear el ticket')
        .setRequired(true)
    ),
  // .addSubcommand((comandoslash) =>
  //   comandoslash
  //     .setName('bugs')
  //     .setDescription('Envia un Ticket para reportar un Bug')
  //     .addStringOption((option) =>
  //       option
  //         .setName('descripcion')
  //         .setDescription('Escribe aquí la descripción del error')
  //         .setRequired(true)
  //     )
  // )
  async execute (client, interaction, prefix) {
    const Channel = client.channels.cache.get('1066939283103039528')
    // eslint-disable-next-line camelcase
    const Moderation_ticket = interaction.member.roles.cache.some(
      (role) => role.name === '『👨‍💻』| Staff'
    )

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('busg')
        .setLabel('Click Me')
        .setStyle(ButtonStyle.Primary)
    )
    const texto = interaction.options.getString('razon_del_ticket')

    const ticketOpen = new EmbedBuilder().setTitle('Ticket').setDescription(
      // eslint-disable-next-line camelcase
      'Espera un <@&1072028259618934814> <@&1066927217545842768> para que puedas solucionar tu error'
    )

    Channel.send({ content: texto, components: [row], embeds: [ticketOpen] })
  }
}
