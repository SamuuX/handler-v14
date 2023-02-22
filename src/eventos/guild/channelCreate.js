const { EmbedBuilder } = require('discord.js')

module.exports = (client, channel) => {
  const logsChannel = client.channels.cache.get('1072034594485960715')
  if (!logsChannel) return console.error('No se encontró el canal de logs.')
  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('**[CANAL CREADO]**')
    .setDescription(
      `**Canal creado**\nCanal: ${channel.name} (ID: ${channel.id})\nTipo: ${channel.type}\nPor: <@${channel.author.id}> (ID: ${channel.author.id})`
    )
    .addFields(
      { name: 'ID del canal', value: channel.id, inline: true },
      { name: 'Tipo de canal', value: channel.type, inline: true }
    )
    .setTimestamp()
    .setFooter(channel.guild.name, channel.guild.iconURL())

  logsChannel.send({
    content: `Ey, <@&1072028259618934814> un moderador/staff creo un Canal: ${channel.name} (ID: ${channel.id})\nTipo: ${channel.type} `,
    embeds: [embed]
  })
}
