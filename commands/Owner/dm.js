const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "dm",
  category: "Owner",
  usage: "(User) (Message)",
  description: "DM a user",
  Owner: true,
  /**
   * @param {Client}client
   * @param {Message}message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = client.users.cache.get(id);
    if (!user) return message.inlineReply("User?");
    if (!args.slice(1).join(" ")) return message.inlineReply("Message?");
    try {
      await user
        .send(args.slice(1).join(" "))
        .then(() => message.channel.send(`Sent message.`));
    } catch (err) {
      message.author.send("That user can't be dmed");
    }
  },
};
