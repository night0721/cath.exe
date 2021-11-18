const { MessageAttachment } = require("discord.js");
module.exports = {
	name: "busted",
	description: "Bust someone",
	category: "Fun",
	options: [
		{
			type: 6,
			name: "user",
			description: "The user you want to use the effect",
			required: true,
		},
	],
	type: "CHAT_INPUT",
	run: async (client, interaction, args) => {
		const user = interaction.guild.members.cache.get(args[0]);
		const ima = new MessageAttachment(
			`${
				process.env.api
			}/api/v1/image/busted?image=${user.user.displayAvatarURL({
				format: "png",
				size: 2048,
			})}`,
		);
		interaction.followUp({ files: [ima] });
	},
};
