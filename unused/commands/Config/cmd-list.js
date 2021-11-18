const schema = require("../../models/custom-commands");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "cc-list",
	UserPerm: "ADMINISTRATOR",
	description: "Check the custom commands in a server",
	category: "Config",
	run: async (client, message, args) => {
		const data = await schema.find({ Guild: message.guild.id });
		if (!!data === false) return client.err(messgae, "Config", "cmd-list", 10);
		message.channel.send(
			new MessageEmbed()
				.setColor(client.color)
				.setDescription(
					data.map((cmd, i) => `${i + 1}: ${cmd.Command}`).join("\n"),
				),
		);
	},
};
