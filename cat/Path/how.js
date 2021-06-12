const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "howgae",
  description: "Check how gae is the user",
  usage: "(User)",
  Path: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    if (target.id === "366562874039992331") {
      message.channel.send(
        new MessageEmbed()
          .setTitle(`${target.username}'s gae rate`)
          .setDescription(`You are 69420% gae`)
      );
    } else {
      let simp = Math.floor(Math.random() * 100);
      message.channel.send(
        new MessageEmbed()
          .setTitle(`${target.username}'s gae rate`)
          .setDescription(`You are ${simp}% gae`)
      );
    }
  },
};
