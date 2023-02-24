const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { stripIndent } = require('common-tags')
module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Sirve para banear a un user')
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers)
    // .addUserOption((option) =>
    //   option
    //     .setName('usuario')
    //     .setDescription('Menciona el usuario')
    //     .setRequired(true)
    // )
    // .addStringOption((option) =>
    //   option
    //     .setName('razon')
    //     .setDescription('Menciona la razón')
    //     .setRequired(false)
    // )
    .setName('ban')
    .addSubcommandGroup((group) =>
      group
        .setName('group_a')
        .setDescription('group a')
        .addSubcommand((subcommand) =>
          subcommand
            .setName('temp')
            .setDescription('Temporary bans a user')
            .addUserOption((option) =>
              option.setName('user').setDescription('user to be banned')
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('perma')
            .setDescription('Permanently bans a user')
            .addUserOption((option) =>
              option.setName('user').setDescription('user to be banned')
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName('b')
        .setDescription('group b')
        .addSubcommand((subcommand) =>
          subcommand.setName('soft').setDescription('soft ban')
        )
    ),

  execute (client, interaction, prefix, GUILD_DATA) {
    const { guild, options } = interaction
    const member = options.getMember('usuario')
    const razon = options.getString('razon') || 'Razón no específicada'
    const user = member.user.username
    member.ban({ reason: razon })
    const embed = new EmbedBuilder()
      .setTitle(':alarma: USUARIO BANEADO! :alarma:')
      .setDescription(
        `**🎈 Usuario: ${user}**\n\n**🚀En el servidor: ${guild.name}**\n\n**🧵Con la razon: ${razon}**`
      )
      .setColor('Green')
    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}
