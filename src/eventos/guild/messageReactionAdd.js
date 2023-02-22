// const { EmbedBuilder } = require('discord.js')

module.exports = async (client, reaction, user) => {
  if (
    reaction.message.id === 'ID_DEL_MENSAJE_DE_BIENVENIDA' &&
    user.id !== client.user.id &&
    reaction.emoji.name === '✅'
  ) {
    const member = reaction.message.guild.members.cache.get(user.id)
    const verificationRole = reaction.message.guild.roles.cache.find(
      (role) => role.name === 'ROL_DE_VERIFICACION'
    )
    await member.roles.add(verificationRole)
    reaction.message.channel.send(
      `¡${member.displayName} ha sido verificado correctamente!`
    )
  }
}
