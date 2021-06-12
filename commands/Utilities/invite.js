const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get bot invite link",
  aliases: ["bot"],
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.inlineReply(
      `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands`
    );
  },
};
