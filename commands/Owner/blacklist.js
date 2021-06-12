const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "bk",
  category: "Owner",
  usage: "(User) (Toggle) (Reason)",
  description: "Blacklist someone from the bot",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = args[0];
    toggle = args[1];
    reason = args.slice(2).join(" ");
    if (toggle === "true") {
      await client.data.BK(user, toggle, reason);
      message.inlineReply(
        `**Blacklisted** ${message.guild.members.cache.get(
          user
        )}.\n**Reason: **${reason}`
      );
    } else {
      await client.data.BK(user, toggle, reason);
      message.inlineReply(
        `Removed blacklist from ${message.guild.members.cache.get(user)}`
      );
    }
  },
};
