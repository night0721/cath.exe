const { Client, Message, MessageEmbed } = require("discord.js");
const supr = require("superscript-text");
module.exports = {
  name: "superscript",
  aliases: ["sr"],
  description: "Superscript your text",
  usage: "(text)",
  category: "Fun",
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text) return client.err(message, "Fun", "sr", 12);
    if (text.includes("@")) return client.err(message, "Fun", "sr", 101);
    message.inlineReply(supr(text));
  },
};
