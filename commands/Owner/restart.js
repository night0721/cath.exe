const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "restart",
  category: "Owner",
  description: "Restart the bot",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel
      .send("Restarting...")
      .then(message => client.destroy())
      .then(() => client.login(process.env.TOKEN));
    message.channel.send("Restarted");
  },
};
