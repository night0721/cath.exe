const Schema = require("../../models/reaction");
module.exports = {
	name: "rr-rmv",
	UserPerm: "ADMINISTRATOR",
	description: "Remove reaction role for server",
	category: "Config",
	run: async (client, message, args, utils) => {
		message.channel
			.send({ content: "**Do you want to remove the reaction roles?**" })
			.then(async msg => {
				Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
					if (err) throw err;
					if (!data) return client.err(message, "Config", "rr-rmv", 10);
				});
				const emoji = await utils.confirmation(
					msg,
					message.author,
					["✅", "❌"],
					10000,
				);
				if (emoji === "✅") {
					msg.delete();
					await Schema.findOneAndDelete({ Guild: message.guild.id });
					message.channel.send({
						content: `Removed reaction roles for this server.`,
					});
				}
				if (emoji === "❌") {
					msg.delete();
					message.channel.send({ content: "Cancelled." });
				}
			});
	},
};
