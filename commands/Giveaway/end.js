const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "gend",
  UserPerm: "MANAGE_MESSAGES",
  usage: "(Message ID)",
  description: "End a giveaway",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) return client.err(message, "Giveaway", "end", 27);
    const giveaway = client.giveaways.giveaways.find(
      g => g.messageID === args.join(" ")
    );
    if (!giveaway) return client.err(message, "Giveaway", "end", 26);
    client.giveaways.edit(giveaway.messageID, {
      setEndTimestamp: Date.now(),
    });
  },
};
