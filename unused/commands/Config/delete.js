const schema = require("../../models/custom-commands");

module.exports = {
	name: "cc-delete",
	UserPerm: "ADMINISTRATOR",
	usage: "(command)",
	description: "Delete a custom command for a server",
	category: "Config",
	run: async (client, message, args) => {
		const name = args[0];
		if (!name) return client.err(message, "Config", "cc-delete", 47);
		const data = await schema.findOne({
			Guild: message.guild.id,
			Command: name,
		});
		if (!data) return client.err(message, "Config", "cc-delete", 404);
		await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
		message.reply(`Removed **${name}** from custom commands.`);
	},
};
