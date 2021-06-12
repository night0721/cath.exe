const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  description: "Flip a coin",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let HT = ["Heads!", "Tails!"];
    let pick = HT[Math.floor(Math.random() * HT.length)];
    let embed = new MessageEmbed()
      .setColor(client.color)
      .setTitle("CoinFilp Game")
      .setTimestamp()
      .setFooter(`Made by Cath Team`)
      .setDescription(pick);
    message.inlineReply(embed);
  },
};
