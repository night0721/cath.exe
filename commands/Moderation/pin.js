const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "pin",
  usage: "(Message ID)",
  description: "Pin a message in the server",
  BotPerm: "MANAGE_MESSAGES",
  UserPerm: "MANAGE_MESSAGES",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) return client.err(message, "Moderation", "pin", 27);
    try {
      const ch = message.guild.channels.cache.get(message.channel.id);
      const msgs = await ch.messages.fetch(args[0]);
      if (!msgs) return client.err(message, "Moderation", "pin", 52);
      await msgs.pin();
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "pin", 999);
    }
  },
};
