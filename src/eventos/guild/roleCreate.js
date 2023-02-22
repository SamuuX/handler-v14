const { EmbedBuilder } = require('discord.js')
module.exports = async (client, role) => {
  const logsChannel = client.channels.cache.get('1072034594485960715')
  if (!logsChannel) return console.error('No se encontró el canal de logs.')

  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('**[ROL CREADO]**')
    .setDescription(`Se ha creado el rol **${role.name}** (ID: ${role.id})`)
    .addFields(
      {
        name: 'Mencionable',
        value: role.mentionable ? 'Sí' : 'No',
        inline: true
      },
      { name: 'Posición', value: role.position, inline: true },
      { name: 'Color', value: role.hexColor, inline: true }
    )
    .setTimestamp()
    .setFooter(role.guild.name, role.guild.iconURL())

  logsChannel.send({ embeds: [embed] })
}
