const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "timer",
	description: "Set a timer for yourself",
	usage: "(Time)",
	category: "Utilities",
	type: "CHAT_INPUT",
	options: [
		{
			type: 3,
			name: "time",
			description: "The time you want to set",
			required: true,
		},
	],
	run: async (client, interaction, args, utils) => {
		const time = args[0];
		const mss = utils.ms(args[0]);
		if (!time.endsWith("d")) {
			if (!time.endsWith("h")) {
				if (!time.endsWith("m")) {
					if (!time.endsWith("w")) {
						if (!time.endsWith("mo")) {
							if (!time.endsWith("s")) {
								return interaction.followUp({
									content: "You can only use valid time (Example: 3s)",
								});
							}
						}
					}
				}
			}
		}
		if (isNaN(time[0])) {
			return interaction.followUp({
				content: "You can only use valid time (Example: 3s)",
			});
		}
		client.Timers.set(interaction.user.id + " G " + interaction.guild.name, {
			Guild: interaction.guild.name,
			Author: {
				Tag: interaction.user.tag,
				ID: interaction.user.id,
			},
			Time: mss,
		});
		interaction.followUp({
			content: `${interaction.user} you have set a timer for ${utils.timer(
				mss,
			)}.`,
		});
		setTimeout(() => {
			const Embed = new MessageEmbed()
				.setTitle(`Timer finished in ${interaction.guild.name}.`)
				.setDescription(`Your timer for ${utils.timer(mss)} has finished.`)
				.setURL(client.web)
				.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
				.setTimestamp()
				.setColor(`GREEN`);
			const embe = new MessageEmbed()
				.setTitle(`Timer finished.`)
				.setDescription(`Your timer for ${utils.timer(mss)} has finished.`)
				.setURL(client.web)
				.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
				.setTimestamp()
				.setColor(`GREEN`);
			interaction.channel.send({
				content: `${interaction.user}`,
				embeds: [embe],
			});
			interaction.user.send({ embeds: [Embed] });
			client.Timers.delete(
				interaction.user.id + " G " + interaction.guild.name,
			);
		}, utils.ms(time));
	},
};
