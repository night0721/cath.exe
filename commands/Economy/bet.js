const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "gamble",
  aliases: ["bet"],
  usage: "(Number)",
  timeout: 5000,
  description: "Win double amount of coins or lose all coins",
  category: "Economy",
  run: async (client, message, args) => {
    const max = 1000000;
    if (!args[0]) {
      return client.err(message, "Economy", "bet", 5);
    }
    if (isNaN(args[0])) {
      return client.err(message, "Economy", "bet", 7);
    }
    const amt = parseInt(args[0]);
    if ((await client.bal(message.author.id)) < amt) {
      return client.err(message, "Economy", "bet", 20);
    }
    if (amt > max) {
      return client.err(message, "Economy", "bet", 101);
    }
    if (client.function.random() === true) {
      const winamt = amt * 1;
      await client.add(message.author.id, winamt, message);
      await client.ADDBWin(message.author.id);
      const abc = new MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setTitle(`${message.author.username} wins a gamble game`)
        .setDescription(
          `You win\n**${winamt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.reply(abc);
    } else {
      await client.rmv(message.author.id, amt);
      const cba = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setTitle(`${message.author.username} loses a gamble game`)
        .setDescription(
          `You lost\n**${amt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.reply(cba);
    }
  },
};
