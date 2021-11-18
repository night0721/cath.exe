const { MessageEmbed, MessageAttachment } = require("discord.js");
const axios = require("axios");

module.exports = {
	name: "hexcolor",
	usage: "(Hex Color Code)",
	description: "Get Hex and RGB info of a color",
	category: "Utilities",
	type: "CHAT_INPUT",
	options: [
		{
			type: 3,
			name: "code",
			description: "Color code you want to see (Example: #FF0000)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		let color;
		if (args[0]) {
			if (/(#|0x)([0-9A-F]{6})/i.test(args[0])) {
				color = args[0].match(/(#|0x)([0-9A-F]{6})/i)[2];
			}
			else {
				return interaction.followUp({
					content: "Please give a valid Hex Color Code (Example: #FF0000)",
				});
			}
		}
		else {
			color = interaction.member.displayHexColor.replace("#", "", "0x", "");
		}
		const colour = await axios
			.get(`${process.env.api}/api/v1/hexcolor/${color}`)
			.then(res => res.data);
		const rightpic = new MessageAttachment(colour.image, "wea.jpg");
		const attachment = new MessageAttachment(colour.row, "color.jpg");
		const embed = new MessageEmbed()
			.setColor(colour.hex)
			.setDescription(
				`\`HEX: ${colour.hex}} RGB: ${colour.rgb}}\`\n🔽Color Scheme🔽`,
			)
			.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
			.setTimestamp()
			.setTitle("Color Information (Click here for more info)")
			.setURL(`https://www.colorhexa.com/${colour.clean}`)
			.setImage("attachment://color.jpg")
			.setThumbnail("attachment://wea.jpg");
		interaction.followUp({
			embeds: [embed],
			files: [attachment, rightpic],
		});
	},
};
