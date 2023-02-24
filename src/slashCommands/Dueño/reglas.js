const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    // .setName('reglas')
    .setDescription('Manda las reglas del Servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addStringOption((option) => option
      .setName('reglas')
      .setDescription('Crea y manda las reglas del servidor')
      .addChoices(
        {
          name: 'Cosas Permitidas',
          value: 'check_permit_rules'
        },
        {
          name: 'Cosas que no se puede hacer',
          value: 'check_warn_rules'
        }
      )
    )
    .addChannelOption(option => option
      .setName('channel')
      .setDescription('Menciona un canal para enviar las reglas')
    ),
  execute (interaction) {
    return interaction.reply({ content: '', ephemeral: true })
  }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
