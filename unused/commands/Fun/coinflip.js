const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "coinflip",
	description: "Flip a coin",
	category: "Fun",
	run: async (client, interaction, args) => {
		const HT = ["Heads!", "Tails!"];
		const pick = HT[Math.floor(Math.random() * HT.length)];
		const embed = new MessageEmbed()
			.setColor(client.color)
			.setTitle("CoinFilp Game")
			.setTimestamp()
			.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
			.setDescription(pick);
		interaction.followUp({ embeds: [embed] });
	},
};
