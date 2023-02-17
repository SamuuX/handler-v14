const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Elimina los mensajes indicados del canal')
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.MANAGE_MESSAGES)
    .addNumberOption(option =>
      option.setName('mensajes')
        .setDescription('Número de mensajes a eliminar')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addUserOption(option =>
      option.setName('objetivo')
        .setDescription('Indica a quien se desea eliminar los mensajes')
    ),
  async execute (client, interaction, prefix) {
    const valor = interaction.options.getNumber('mensajes')
    const user = interaction.options.getUser('objetivo')

    const channelMessages = await interaction.channel.messages.fetch()

    if (user) {
      let i = 0
      const messagesToDelete = []
      // eslint-disable-next-line array-callback-return
      channelMessages.filter((message) => {
        if (message.author.id === user.id && valor > i) {
          messagesToDelete.push(message)
          i++
        }
      })
      interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
        const ClearCommandembed = new EmbedBuilder()
          .setTitle('🧹 __CLEAR__ 🧹')
          .setColor(process.env.COLOR)
          .setDescription(`Se han eliminado una cantidad de \`${messages.size}\` mensajes de \`${user.username}\``)

        interaction.reply({ embeds: [ClearCommandembed] })
        setTimeout(() => interaction.deleteReply(), 10000)
      })
    } else {
      interaction.channel.bulkDelete(valor, true).then((messages) => {
        const ClearCommandembed = new EmbedBuilder()
          .setTitle('🧹 __CLEAR__ 🧹')
          .setColor(process.env.COLOR)
          .setDescription(`Se han eliminado una cantidad de \`${messages.size}\` mensajes`)

        interaction.reply({ embeds: [ClearCommandembed] })
        setTimeout(() => interaction.deleteReply(), 10000)
      })
    }
  }
}
