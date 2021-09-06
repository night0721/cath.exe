const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "howgae",
  description: "Check how gae is the user",
  usage: "(User)",
  Path: true,

  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    let simp = Math.floor(Math.random() * 100);
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${target.username}'s gae rate`)
          .setDescription(`You are ${simp}% gae`),
      ],
    });
  },
};
