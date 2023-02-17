const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Mira el ping del bot"),
    
    execute(client, interaction, prefix, GUILD_DATA){
        return interaction.reply({content: `\`${client.ws.ping}ms\``, ephemeral: true})
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/