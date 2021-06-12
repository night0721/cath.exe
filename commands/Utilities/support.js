const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "support",
  description: "Get support server invite link",
  aliases: ["server"],
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.inlineReply(`https://discord.gg/SbQHChmGcp`);
  },
};
