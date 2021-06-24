const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "simprate",
  aliases: ["simp"],
  description: "Check how simp is the user",
  usage: "(@User)",
  category: "Fun",
  run: async (client, message, args) => {
    let simp = Math.floor(Math.random() * 100);
    if (message.mentions.users.first()) {
      let target = message.mentions.users.first();
      message.inlineReply(
        new MessageEmbed()
          .setTitle(`${target.username}'s simp rate`)
          .setDescription(`${target.username} is a ${simp}% simp`)
      );
    } else {
      const target = message.author;
      message.inlineReply(
        new MessageEmbed()
          .setTitle(`${target.username}'s simp rate`)
          .setDescription(`You are a ${simp}% simp`)
      );
    }
  },
};
