const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "choose",
  aliases: ["random", "8ball"],
  description: "Choose random things",
  usage: "(Choices)",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const split = args.join(" ").split(" ");
    if (!split) return client.err(message, "Utilities", "choose", 0);
    if (!split[1]) return client.err(message, "Utilities", "choose", 101);
    let choices = split[Math.floor(Math.random() * split.length)];
    message.channel.send(`I will choose - \`${choices}\``);
  },
};
