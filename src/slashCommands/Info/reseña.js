const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const Discord = require("discord.js")
 
 
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Envia una reseña para el bot")
        .addStringOption(a => a.setName("reseña").setDescription("Eescribe la reseña para el bot").setRequired(true))
    .addStringOption(a => a.setName("calificacion").setDescription("manda una calificacion ejemplo: 10/10").setRequired(true)),
 
  async execute(client, interaction, prefix, GUILD_DATA){
 
  const reseña = interaction.options.getString("reseña")
    const calificacion = interaction.options.getString("calificacion")
 
const embed1 = new Discord.EmbedBuilder()
 .setTitle(":valoracion: !Nueva Reseña¡")
 .addFields(
            {name: "> Reseña", value: `${reseña}`},
            {name: "> calificacion", value: `${calificacion}/10`},
         )
         .setColor("Green")
          .setFooter({ text: `Reseña de ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
 
let mensaje = await client.channels.cache.get("1066939280674537562").send({ embeds: [embed1], fetchReply: true })

         interaction.reply({ content: ":bien: tu reseña fue enviada correctamente", ephemeral: true })
  }
}