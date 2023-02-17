module.exports = async (guild, user) => {
	if (!guild.me.permissions.has('VIEW_AUDIT_LOG')) return;

	const logs = await guild.fetchLogs({ type: 'MEMBER_BAN_ADD' });
	const entry = logs.entries.first();

	if (!entry) return;

	const { executor, target } = entry;

	const embed = new Discord.MessageEmbed()
		.setTitle('**[USUARIO BLOQUEADO]**')
		.setColor('RED')
		.setThumbnail(target.displayAvatarURL())
		.setDescription(`**Usuario bloqueado correctamente**\nUsuario bloqueado/baneado: <@${target.id}> (ID: ${target.id})\nPor: <@${executor.id}> (ID: ${executor.id})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL());

	const channel = guild.channels.cache.get('1074929289776078928');
	channel.send({ embeds: [embed] });
};