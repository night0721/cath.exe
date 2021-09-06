const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "dm",
  category: "Owner",
  usage: "(User) (Message)",
  description: "DM a user",
  Owner: true,
  run: async (client, message, args) => {
    const user = client.users.cache.get(args[0]);
    if (!user) return message.reply("User?");
    if (!args.slice(1).join(" ")) return message.reply("Message?");
    try {
      await user
        .send(args.slice(1).join(" "))
        .then(() => message.channel.send(`Sent message.`));
    } catch (err) {
      message.author.send("That user can't be dmed");
    }
  },
};
