const axios = require("axios");
module.exports = {
	name: "doublestruck",
	description: "Doublestruck your text",
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
		const text = args[0].split(" ").join("+");
		const res = await axios.get(
			"https://api.popcatdev.repl.co/doublestruck?text=" + text,
		);
		const json = await res.json();
		interaction.followUp(json.text);
	},
};
