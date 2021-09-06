const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "spider",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    for (var i = 0; i < 10; i++) {
      client.function.sleep(5000);
      message.channel.send(
        "https://media.discordapp.net/attachments/838006493361471508/864730147545284618/image0.gif"
      );
    }
  },
};
