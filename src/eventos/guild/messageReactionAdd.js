// const { EmbedBuilder } = require('discord.js')

module.exports = async (client, reaction, user) => {
  if (
    reaction.message.id === '1078641091806498967' &&
    user.id !== client.user.id &&
    reaction.emoji.name === '✅'
  ) {
    const member = reaction.message.guild.members.cache.get(user.id)
    const verificationRole = reaction.message.guild.roles.cache.find(
      (role) => role.name === 'Verified'
    )
    const noverificationRole = reaction.message.guild.roles.cache.find((roles) => roles.name === 'No Verificado')
    await member.roles.remove(noverificationRole)
    await member.roles.add(verificationRole)
    reaction.message.channel.send(
      { content: `¡${member.displayName} ha sido verificado correctamente!`, ephemeral: true }
    )
  }
}
