/* eslint-disable new-cap */
/* eslint-disable n/handle-callback-err */
const secureSchema = require('../../database/schemas/Antilinks.js')
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('setup_antilinks')
    .setDescription('Para configurar el sistema de AntiLinks')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute (client, interaction) {
    const coloraleatorio =
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    const R = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('help_menu')
          .setMaxValues(1)
          .setPlaceholder('Lista de configuraciónes')
          .addOptions([
            {
              value: 'setup',
              label: 'Activar Anti-Links',
              description: 'Activas el sistema de Anti-Links en el servidor.',
              emoji: '✅'
            },
            {
              value: 'delete',
              label: 'Desactivar Anti-Links',
              description: 'Desactivas el sistema de Anti-Links en el servidor.',
              emoji: '🗑️'
            },
            {
              value: 'cans',
              label: 'Cancelar',
              description: 'Cancelas el setup-Anti-Links.',
              emoji: '❌'
            }
          ])
      )
    const E = new EmbedBuilder()
      .setTitle('📑 SETUP-ANTILINKS')
      .setColor(coloraleatorio)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        'Para configurar el sistema de AntiLinks.\nPor favor usa el menu desplegable del ese mensaje Embed.'
      )
    const SystemAntilink0ff = new EmbedBuilder().setColor(coloraleatorio).setTitle('✅ | Sistema de AntiLinks se ha Desactivado correctamente!')
    const SystemAntilinkOn = new EmbedBuilder().setColor(coloraleatorio).setTitle('✅ | Sistema de AntiLinks se ha Activado correctamente!')
    const C = new EmbedBuilder().setColor(coloraleatorio).setTitle('✅ | Se ha cancelado la configuración del sistema AntiLinks!')

    await interaction.reply({ embeds: [E], components: [R] })

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 15000,
      max: 1
    })

    collector.on('collect', async (suge) => {
      if (suge.values[0] === 'delete') {
        await suge.deferUpdate()
        secureSchema.findOne({ GuildId: interaction.guild.id }, async (_err, data) => {
          if (!data) {
            return interaction.editReply({ embeds: [SystemAntilink0ff], components: [R] })
          } else {
            data.delete()
          }
        })
        interaction.editReply({ embeds: [SystemAntilink0ff], components: [R] })
      }
    })

    collector.on('collect', async (suge) => {
      if (suge.values[0] === 'setup') {
        secureSchema.findOne({ GuildId: interaction.guild.id }, async (err, data) => {
          if (data) {
            data.GuildId = interaction.guild.id
            data.save()
          } else {
            console.log(`[${client.user.tag}] = Setups-AntiLinks-Guilds Asegurados`.green)
            new secureSchema({
              GuildId: interaction.guild.id
            }).save()
          }
        })
        await suge.deferUpdate()
        interaction.editReply({ embeds: [SystemAntilinkOn], components: [R] })
      }
    })
    collector.on('collect', async suge => {
      if (suge.values[0] === 'cans') {
        await suge.deferUpdate()
        return suge.editReply({ embeds: [C], components: [] })
      }
    })
  }
}
