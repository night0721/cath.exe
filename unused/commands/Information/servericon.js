const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "servericon",
	description: "View the icon of the server",
	category: "Information",
	type: "CHAT_INPUT",
	run: async (client, interaction, args) => {
		const Embed = new MessageEmbed()
			.setTitle(`Icon of ${interaction.guild.name}`)
			.setURL(client.web)
			.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
			.setTimestamp()
			.setImage(interaction.guild.iconURL({ dynamic: true, size: 2048 }));
		interaction.followUp({ embeds: [Embed] });
	},
};
