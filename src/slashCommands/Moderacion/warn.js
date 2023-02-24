const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Aisla a un miembro del servidor.')
    .addUserOption(option => option.setName('miembro').setDescription('El miembro que será aislado.').setRequired(true))
    .addStringOption(option => option.setName('tiempo').setDescription('El tiempo por el que el miembro estará aislado.').setRequired(true))
    .addStringOption(option => option.setName('razón').setDescription('La razón por la que el miembro será aislado.').setRequired(true)),

  async execute (client, interaction, prefix, GUILD_DATA) {
    const user = interaction.options.getUser('miembro')
    const tiempo = interaction.options.getString('tiempo')
    const razon = interaction.options.getString('razon')

    // const permisos = interaction.member.permissions.has('MANAGE_MESSAGES')
    // if (!permisos) return interaction.reply(':x: **| Permisos insuficientes**')

    const member = await interaction.guild.members.fetch(user.id)

    if (member.isCommunicationDisabled()) return interaction.reply('**Ese miembro ya está aislado**')

    const time = ms(tiempo)

    await member.timeout(time, razon)

    const TimeoutSlashCommandembed = new EmbedBuilder()
      .setTitle(`${user.tag} ha sido aislado correctamente`)
      .setDescription(`**Tiempo:** ${tiempo}\n\n**Razón:** ${razon}`)
      .setColor('#4D00FF')
      .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    interaction.reply({ embeds: [TimeoutSlashCommandembed] })
  }
}
