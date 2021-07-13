const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ascii",
  description: "Converts text into ASCII art",
  category: "Fun",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const figlet = require("figlet");
    if (!args[0]) return client.err(message, "Fun", "ascii", 12);
    let msg = args.slice(0).join(" ");
    figlet.text(msg, async (err, data) => {
      if (err) console.log(err);
      if (data.length > 2000) return client.err(message, "Fun", "ascii", 54);
      message.channel.send(`\`\`\`${data}\`\`\``);
    });
  },
};
