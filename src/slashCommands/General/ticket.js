const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Crea un ticket')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('reporte')
        .setDescription('Envia un Ticket para reportar un Usuario')
        .addStringOption((option) =>
          option
            .setName('descripcion')
            .setDescription(
              'Escribe aquí la descripción del comportamiento del Usuario y el usuario'
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('bugs')
        .setDescription('Envia un Ticket para reportar un Bug')
        .addStringOption((option) =>
          option
            .setName('descripcion')
            .setDescription('Escribe aquí la descripción del error')
            .setRequired(true)
        )
    ),
  async execute (client, interaction, prefix) {
    const { member: interactionMember } = interaction
    const user = interaction.user
    const moderationTicket = interaction.guild.members.cache.get(user.id).roles.cache.some(
      (role) => role.name === '『👨‍💻』| Staff' ||
            role.name === '【📄】Ticket_Support' ||
            role.name === '『⚙』 | Moderador' ||
            role.name === '『🎩』| Administrador'
    )
    console.log('🚀 ~ file: ticket.js:32 ~ execute ~ moderationTicket:', moderationTicket)

    if (!moderationTicket) {
      return interaction.reply({
        content: 'No tienes permisos para Claimear este Report',
        ephemeral: true
      })
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('bug')
        .setLabel('Notificar resolución')
        .setStyle(ButtonStyle.Success)
    )

    const subcommand = interaction.options.getSubcommand()
    const descripcion = interaction.options.getString('descripcion')

    if (subcommand === 'bugs') {
      const bugReport = new EmbedBuilder()
        .setTitle('Reporte de bug')
        .setDescription(descripcion)
        .setAuthor({
          name: `${user.tag} - ${user.id}`,
          iconURL: user.displayAvatarURL({ dynamic: true })
        })
        .setFooter({
          text: `Reporte de ${user.tag}`,
          iconURL: user.displayAvatarURL({ dynamic: true })
        })

      // Crear el canal para el ticket
      // const cacheCategoryIDBUG = interaction.guild.channels.fetch('1079188799042617474')
      // console.log('🚀 ~ file: ticket.js:72 ~ execute ~ cacheCategoryIDBUG:', cacheCategoryIDBUG)
      const categoryBUG = await interaction.guild.channels.fetch('1079188799042617474')
      console.log('🚀 ~ file: ticket.js:73 ~ execute ~ categoryBUG:', categoryBUG.id)

      // Buscar todos los canales de texto que comiencen con el prefijo "ticket-"
      const ticketChannels = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT' && c.name.startsWith('ticket-'))

      console.log('🚀 ~ file: ticket.js:76 ~ execute ~ ticketChannels:', ticketChannels)

      // Ordenar los canales por orden alfabético inverso
      const sortedTicketChannels = ticketChannels.sort((a, b) => b.name.localeCompare(a.name))
      console.log('🚀 ~ file: ticket.js:79 ~ execute ~ sortedTicketChannels:', sortedTicketChannels)

      // Obtener el número del último ticket creado
      const lastTicketNumber = ticketChannels.size > 0 ? parseInt(ticketChannels.first().name.match(/\d+/g)[0]) : 0

      console.log('🚀 ~ file: ticket.js:82 ~ execute ~ lastTicketNumber:', lastTicketNumber)

      // Generar el número para el nuevo ticket
      const ticketNumber = lastTicketNumber + 1

      console.log('🚀 ~ file: ticket.js:85 ~ execute ~ ticketNumber:', ticketNumber)

      // Crear el nombre del nuevo canal de texto
      const username = interaction.user.username.replace(/[^a-zA-Z0-9]/g, '')
      const channelName = `ticket-${ticketNumber}-${username}`

      console.log('🚀 ~ file: ticket.js:88 ~ execute ~ username:', username)

      console.log('🚀 ~ file: ticket.js:90 ~ execute ~ channelName:', channelName)
      await interaction.reply({ content: 'Creando tu ticket... Porfavor espere' })
      // Crear el canal de texto para el ticket
      const hasRoleAdministration = interactionMember.roles.cache.find(role => role.name === '『👨‍💻』| Staff')
      console.log('🚀 ~ file: ticket.js:107 ~ execute ~ hasRoleAdministration:', hasRoleAdministration)

      let ticketChannel
      try {
        ticketChannel = await interaction.guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: categoryBUG.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: interaction.member.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks]
            },
            {
              id: hasRoleAdministration.id,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.EmbedLinks,
                PermissionsBitField.Flags.AttachFiles,
                PermissionsBitField.Flags.ReadMessageHistory,
                PermissionsBitField.Flags.ManageRoles,
                PermissionsBitField.Flags.AddReactions
              ],
              deny: [PermissionsBitField.Flags.SendMessages]
            }
          ]
        })

        console.log(`Se ha creado el canal ${ticketChannel.name} con éxito!`)
      } catch (error) {
        console.error(`Ha ocurrido un error al crear el canal y dio el error:\n ${error}`)
      }

      console.log('🚀 ~ file: ticket.js:104 ~ execute ~ ticketChannel:', ticketChannel)
      // Enviar el mensaje del ticket
      const msg = await ticketChannel.send({
        content: `Ticket iniciado por ${user} - ${user.id}`,
        embeds: [bugReport],
        components: [row]
      })
      console.log('🚀 ~ file: ticket.js:129 ~ execute ~ msg:', msg)

      // Agregar la reacción para cerrar el ticket
      await msg.react('🔒')
      await msg.react('🎫')

      // Crear el collector para la reacción
      const filter = (reaction, user) => {
        return reaction.emoji.name === '🔒' && !user.bot
      }
      const collector = msg.createReactionCollector({
        filter,
        time: 60 * 60 * 1000 // 1 hora
      })

      collector.on('collect', async (reaction, user) => {
        // Quitar la reacción
        await reaction.users.remove(user.id)

        // Cerrar el ticket
        const categoryBUG = await interaction.guild.channels.fetch('1079188799042617474')
        const logChannel = interaction.guild.channels.cache.find(
          (c) => c.name === 'logs' && c.type === ChannelType.GuildText
        )

        await ticketChannel.setParent(categoryBUG.id)
        await ticketChannel.permissionOverwrites.delete(user.id)
        await ticketChannel.permissionOverwrites.delete('1066927217545842768')
        await ticketChannel.permissionOverwrites.create(user.id, {
          ViewChannel: false
        })
        await ticketChannel.permissionOverwrites.create('1066927217545842768', {
          ViewChannel: true
        })

        const closedEmbed = new EmbedBuilder()
          .setTitle('Ticket cerrado')
          .setDescription(`El ticket ha sido cerrado por ${user} - <@&${hasRoleAdministration.id}>`)
          .setAuthor({
            name: `${user.tag} - ${user.id}`,
            iconURL: user.displayAvatarURL({ dynamic: true })
          })
          .setFooter({
            text: `Ticket cerrado por ${user.tag}`,
            iconURL: user.displayAvatarURL({ dynamic: true })
          })

        await logChannel.send({ embeds: [closedEmbed] })

        collector.stop()
      })
      // ???? donde esta esto? dentro o fuera del collection? XD
      return interaction.editReply({
        content: `Ticket creado en ${ticketChannel}`,
        ephemeral: true
      })
    } else if (subcommand === 'reporte') {
      // Por implementar
      interaction.reply('Lo siento, esta opción aún no está disponible')
    }
  }
}
