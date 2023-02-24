const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Haz una encuesta en el servidor')
    .addChannelOption((o) =>
      o
        .setName('canal')
        .setDescription('el canal donde enviaras la encuesta')
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName('pregunta')
        .setDescription('la pregunta de la encuesta')
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName('opcion1')
        .setDescription('opcion de encuenta')
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName('opcion2')
        .setDescription('opcion de encuenta')
        .setRequired(true)
    ),

  /**
   *
   *@param {Discord.Client} client
   *@param {Discord.CommandInteraction} interaction
   */
  async execute (client, interaction, prefix, GUILD_DATA) {
    const pregunta = interaction.options.getString('pregunta')
    const op1 = interaction.options.getString('opcion1')
    const op2 = interaction.options.getString('opcion2')
    const canal = interaction.options.getChannel('canal')

    const embed = new Discord.EmbedBuilder()
      .setTitle('Encuesta')
      .setDescription(`**Pregunta:** \`${pregunta}\``)
      .addFields(
        {
          name: '1️⃣',
          value: `${op1}`
        },
        {
          name: '2️⃣',
          value: `${op2}`
        }
      )
      // .setColor("RANDOM")
      .setFooter({
        text: `Encuesta realizada por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp()

    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({
        content: 'No tengo tienes permisos',
        ephemeral: true
      })
    }

    const m = await canal.send({ embeds: [embed] })

    if (op1) m.react('1️⃣')
    if (op2) m.react('2️⃣')

    interaction.reply({
      content: `Encuesta creada en ${canal}!`,
      ephemeral: true
    })
  }
}
