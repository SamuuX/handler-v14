module.exports = async client => {
	console.log(`Conectado como ${client.user.tag}`.green);
	if (client?.application?.commands) {
		client.application.commands.set(client.slashArray);
		console.log(`(/) ${client.slashCommands.size} Comandos Publicados!`.green);
	}
	//     const fetch = require('node-fetch');

	// setInterval(async function() {
	//     let user = "Samuu_X"

	//     const uptime = await fetch(`https://decapi.me/twitch/uptime/${user}`)
	//     const avatar = await fetch(`https://decapi.me/twitch/avatar/${user}`)
	//     const viewers = await fetch(`https://decapi.me/twitch/viewercount/${user}`)
	//     const title = await fetch(`https://decapi.me/twitch/title/${user}`)
	//     const game = await fetch(`https://decapi.me/twitch/game/${user}`)
	//     const twitch = require(`${process.cwd()}/src/database/schemas/twitchSchema`)
	//     let data = await twitch.findOne({ user: user, titulo: title.body })

	//     if (uptime.body !== `${user} is offline`) {
	//         const TwitchEmbed = new Discord.EmbedBuilder()
	//             .setAuthor({ "name": `${user}`, "iconURL": `${avatar.body}` })
	//             .setTitle(`${title.body}`)
	//             .setThumbnail(`${avatar.body}`)
	//             .setURL(`https://www.twitch.tv/${user}`)
	//             .addFields({ name: "Game", value: `${game.body}`, inline: true }, { name: "Viewers", value: `${viewers.body}`, inline: true })
	//             .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
	//             .setColor("BLURPLE")

	//         if (!data) {
	//             const newdata = new twitch({
	//                 user: user,
	//                 titulo: `${title.body}`
	//             })

	//             await client.channels.cache.get("1071947227519537183").send({ content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`, embeds: [TwitchEmbed] })

	//             return await newdata.save()
	//         }

	//         if (data.titulo === `${title.body}`) return;

	//         await client.channels.cache.get("1071947227519537183").send({ content: `🔴 @everyone ${user} está en directo. __**¡Corre a verlo!**__ 🔴\n\nhttps://www.twitch.tv/${user}`, embeds: [TwitchEmbed] })

	//         await twitch.findOneAndUpdate({ user: user }, { titulo: title.body })
	//     }
	// }, 120000)

};