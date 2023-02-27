const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('usa el sistema de anuncios'),

  async  execute (client, interaction, prefix, GUILD_DATA) {
    const canal = client.channels.cache.get('1066925480474857615')

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: '❌ **Cjjaja! ¡Tienes que ser administrador para usar mi sistema de tickets!**', ephemeral: true }).then(() => {
        setTimeout(() => {
          interaction.deleteReply()
        }, 11000)
      })
    }

    const modal = new Discord.ModalBuilder()
      .setCustomId('modal')
      .setTitle('Anuncio')

    const titu = new Discord.TextInputBuilder()
      .setCustomId('titulo')
      .setLabel('Titulo da mensaje')
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder('Introduzca el título del anuncio.')
      .setRequired(true)

    const desc = new Discord.TextInputBuilder()
      .setCustomId('descripcion')
      .setLabel('Descripción del mensaje')
      .setStyle(Discord.TextInputStyle.Paragraph)
      .setPlaceholder('Introduzca la descripción del anuncio.')
    const titulo = new Discord.ActionRowBuilder().addComponents(titu)
    const descripcion = new Discord.ActionRowBuilder().addComponents(desc)

    modal.addComponents(titulo, descripcion)

    await interaction.showModal(modal)

    const modalInteraction = await interaction.awaitModalSubmit({ filter: i => i.user.id === interaction.user.id, time: 1200000_000 })

    const titul = modalInteraction.fields.getTextInputValue('titulo')
    const descs = modalInteraction.fields.getTextInputValue('descripcion')

    const embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setTitle(`${titul}`)
      .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setTimestamp()
      .setDescription(`${descs}`)

    canal.send({ content: 'Ey <@&1069108816827908126>, Mira el anuncio que se publico', embeds: [embed], ephemeral: true })

    await modalInteraction.deferUpdate()
  }
}
