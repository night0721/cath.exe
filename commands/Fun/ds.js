const fetch = require("node-fetch");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ds",
  aliases: ["doublestruck"],
  description: "Doublestruck your text",
  usage: "(text)",
  category: "Fun",
  run: async (client, message, args) => {
    let text = args.join("+");
    if (!text) return client.err(message, "Fun", "ds", 12);
    let res = await fetch(
      "https://api.popcatdev.repl.co/doublestruck?text=" + text
    );
    let json = await res.json();
    message.inlineReply(json.text);
  },
};
