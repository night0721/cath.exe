const axios = require("axios");

module.exports = {
	name: "superscript",
	description: "Superscript your text",
	usage: "(text)",
	category: "Fun",
	type: "CHAT_INPUT",
	options: [
		{
			type: 3,
			name: "text",
			description: "The text you want to convert",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		const text = args[0];
		if (text.includes("@")) {
			return interaction.followUp({
				content: "Text cannot includes '@'",
			});
		}
		const data = await axios
			.get(`${process.env.api}/api/v1/fun/superscript?text=${text}`)
			.then(res => res.data.text);
		interaction.followUp({ content: data });
	},
};
