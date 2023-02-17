const { EmbedBuilder } = require('discord.js');

module.exports = async (client, member) => {
	const { user, guild } = member;
	const channel = member.guild.channels.cache.get(''); // AQUÍ VA LA ID DE TU CANAL DE BIENVENIDAS

	channel.send({
		embeds: [
			new EmbedBuilder()
				.setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
				.setTitle('¡Hola!')
				.setDescription('Bienvenid@ a mi servidor de Roleplay')
				.setThumbnail(`${member.user.avatarURL({ forceStatic: false })}`) // AQUÍ VA EL AVATAR DEL USUARIO QUE ENTRÓ
				.setImage('https://media.tenor.com/990MomrAHwEAAAAd/welcome-new-members-senko-san.gif') // EL GIF O FOTO QUE QUIERAS
				.setFooter({
					text: 'Texto que quieras, qsy',
				})
				.setColor('#ffffff'),
		],
	});
};