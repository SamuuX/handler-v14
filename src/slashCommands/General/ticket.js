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
    // .addStringOption((option) =>
    //   option
    //     .setName('razon_del_ticket')
    //     .setDescription('Escribe aqui la razon para crear el ticket')
    //     .setRequired(true)
    // ),
    .addSubcommand((comandoslash) =>
      comandoslash
        .setName('report')
        .setDescription('Envia un Ticket para reportar un Usuario')
        .addStringOption((option) =>
          option
            .setName('descripcion')
            .setDescription(
              'Escribe aquí la descripción del Comportamiento del Usuario y el usuario'
            )
            .setRequired(true)
        )
    )
    .addSubcommand((comandoslash) =>
      comandoslash
        .setName('bugs')
        .setDescription('Envia un Ticket para reportar un Bug')
        .addStringOption((option) =>
          option
            .setName('descripcion')
            .setDescription('Escribe aquí la descripción del error')
            .setRequired(true)
        )
    ),
  async execute (client, interaction, prefix) {
    const Channel = client.channels.cache.get('1066939280674537562')
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
    const texto = interaction.options.getString('bugs')
    const texto2 = interaction.options.getString('report')

    const report = new EmbedBuilder()
      .setTitle('Report a Bug')
      .setAuthor(
        `Reporte ${interaction.user.tag}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .addFields(
        {
          name: 'Caso de ',
          value: `${interaction.user.tag} - ${interaction.user.displayName} - ${interaction.user.id}`,
          inline: true
        },
        {
          name: 'Razon del Ticket',
          value: 'ds',
          inline: false
        },
        {
          name: 'sdasd',
          value: 'eadade',
          inline: false
        }
      )
      .setFooter({
        text: `Reporte de ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })

    Channel.send({ content: texto2, components: [row], embeds: [report] })
  }
}
