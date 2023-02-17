const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const { stripIndent } = require('common-tags');
module.exports = {
	CMD: new SlashCommandBuilder()
		.setDescription('Sirve para banear a un user')
		.setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers)
		.addUserOption((option) =>
			option
				.setName('usuario')
				.setDescription('Menciona el usuario')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('razon')
				.setDescription('Menciona la razón')
				.setRequired(false),
		),

	execute(client, interaction, prefix, GUILD_DATA) {
		const { guild, options } = interaction;
		const member = options.getMember('usuario');
		const razon = options.getString('razon') || 'Razón no específicada';
		const user = member.user.username;
		member.ban({ reason: razon });
		const embed = new EmbedBuilder()
			.setTitle(':alarma: USUARIO BANEADO! :alarma:')
			.setDescription(
				`**🎈 Usuario: ${user}**\n\n**🚀En el servidor: ${guild.name}**\n\n**🧵Con la razon: ${razon}**`,
			)
			.setColor('Green');
		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
