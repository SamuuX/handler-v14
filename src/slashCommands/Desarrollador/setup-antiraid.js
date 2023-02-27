/* eslint-disable n/handle-callback-err */
const { SlashCommandBuilder } = require('discord.js')
const Schema = require('../../database/schemas/AntiRaids.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('setup_antiraid')
    .setDescription('Activa o desactiva el sistema de Anti-Raid en el servidor.')
    .addStringOption(option =>
      option.setName('modo')
        .setDescription('Selecciona si quieres activar o desactivar el sistema de Anti-Raid.')
        .setRequired(true)
        .addChoices({ name: 'Activar', value: 'on' })
        .addChoices({ name: 'Desactivar', value: 'off' })),
  execute: async (client, interaction) => {
    const modo = interaction.options.getString('modo')
    if (!['on', 'off'].includes(modo)) {
      return interaction.reply('El modo debe ser "on" o "off".')
    }

    if (modo === 'on') {
      Schema.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
        if (!data) {
          data = new Schema({
            GuildID: interaction.guild.id
          })
          data.save()
          return interaction.reply('El sistema de Anti-Raid se ha activado correctamente.')
        } else {
          return interaction.reply('El sistema de Anti-Raid ya estaba activado.')
        }
      })
    }

    if (modo === 'off') {
      Schema.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
        if (!data) {
          return interaction.reply('El sistema de Anti-Raid ya estaba desactivado.')
        } else {
          data.delete()
          return interaction.reply('El sistema de Anti-Raid se ha desactivado correctamente.')
        }
      })
    }
  }
}
