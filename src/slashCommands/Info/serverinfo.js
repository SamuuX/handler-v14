const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription("Muestra información sobre el servidor en el que se ejecuta el bot."),
    
  async execute(client, interaction, prefix, GUILD_DATA) {
    if (interaction.guild) {
      let owner = await interaction.guild.members.fetch(interaction.guild.ownerId);
      const serverInfoEmbed = new EmbedBuilder()
        .setColor('White')
        .setTitle('**Información del servidor**')
        .addFields(
          { name: '**Nombre del servidor**', value: `${interaction.guild.name}` },
          { name: '**ID del servidor**', value: `${interaction.guild.id}` },
          { name: '**Miembros totales**', value: `${interaction.guild.memberCount}` },
          { name: '**Dueño**', value: `${owner.user.tag}` },
          { name: '**Fecha de creación**', value: `${moment(interaction.guild.createdTimestamp).locale('es').format('LT')} | ${moment(interaction.guild.createdTimestamp).locale('es').format('LL')} (${moment(interaction.guild.createdTimestamp).locale('es').fromNow()})` }, 
          { name: '**Roles**', value: `${interaction.guild.roles.cache.size}` },
          { name: '**Canales**', value: `${interaction.guild.channels.cache.size}` },
          { name: '**Emojis**', value: `${interaction.guild.emojis.cache.size}` },
          { name: '**Mejoras**', value: `${interaction.guild.premiumSubscriptionCount || '0'}` }
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp();
      interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true });
    }
  }
}
