const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Crea un ticket")
    .addStringOption(option => 
        option.setName("razon_del_ticket")
        .setDescription("Escribe aqui la razon para crear el ticket")
        .setRequired(true)
    ),

    async execute(client, interaction,prefix){
        let Channel = client.channels.cache.get("1076137271708897365")

        let texto = interaction.options.getString('razon_del_ticket')

        interaction.reply({ content: texto })

    }
}