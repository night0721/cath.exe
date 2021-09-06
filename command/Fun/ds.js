const fetch = require("node-fetch");
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
    let text = args[0].split(" ").join("+");
    let res = await fetch(
      "https://api.popcatdev.repl.co/doublestruck?text=" + text
    );
    let json = await res.json();
    await interaction.followUp(json.text);
  },
};
