const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "announce",
	UserPerms: ["MANAGE_MESSAGES"],
	BotPerms: ["MANAGE_MESSAGES"],
	usage: "{Channel} (Message)",
	description: "Announce a message to a channel.",
	category: "Moderation",
	options: [
		{
			type: 7,
			name: "channel",
			description: "The channel to announce",
			required: true,
			channelTypes: ["GUILD_TEXT"],
		},
		{
			type: 3,
			name: "message",
			description: "The message to announce",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		const channel = interaction.guild.channels.cache.get(args[0]);
		if (channel.type !== "GUILD_TEXT") {
			return interaction.followUp({
				content: "Please provide a text channel",
			});
		}
		try {
			channel.send({
				embeds: [
					new MessageEmbed()
						.setAuthor(
							`Sent by ${interaction.member.displayName}`,
							interaction.user.displayAvatarURL({ dynamic: true }),
						)
						.setDescription(args[1])
						.setTimestamp()
						.setColor(client.color),
				],
			});
			interaction.followUp({
				embeds: [
					new MessageEmbed()
						.setTitle(`Message Announced`)
						.addField("**Moderator**", interaction.user.tag, true)
						.setFooter(
							`Made by ${client.author}`,
							client.user.displayAvatarURL(),
						)
						.setTimestamp()
						.setColor(client.color),
				],
			});
		}
		catch (e) {
			console.log(e);
			interaction.followUp({ content: `**Error**: ${e.message}` });
		}
	},
};
