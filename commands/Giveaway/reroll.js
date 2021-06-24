const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "reroll",
  aliases: ["greroll"],
  usage: "(Message ID)",
  description: "Reroll a giveaway",
  UserPerm: "MANAGE_MESSAGES",
  run: async (client, message, args) => {
    if (!args[0]) return client.err(message, "Giveaway", "reroll", 27);
    const giveaway = client.giveaways.giveaways.find(
      g => g.messageID === args[0]
    );
    if (!giveaway) return client.err(message, "Giveaway", "reroll", 26);
    client.giveaways.reroll(giveaway.messageID);
  },
};
