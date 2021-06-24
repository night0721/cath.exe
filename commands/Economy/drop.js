const { Client, Message, MessageEmbed } = require("discord.js");
require("../../inlinereply");
module.exports = {
  name: "drop",
  usage: "{Channel} (Number)",
  description: "Drops money to a channel",
  category: "Economy",
  run: async (client, message, args) => {
    const p = await client.prefix(message);
    const channel = message.mentions.channels.first() || message.channel;
    const coinsAmount = args[0];
    if (!coinsAmount) {
      return client.err(message, "Economy", "drop", 5);
    }
    if ((await client.data.bal(message.author.id)) < coinsAmount) {
      return client.err(message, "Economy", "drop", 20);
    }
    const filter = msg =>
      msg.guild.id === message.guild.id && msg.content === `${p}claim`;
    message.channel.send("The drop has started in " + channel.toString());
    channel.send(
      `${message.author.username} has dropped a ${client.currency} bomb! Use ${p}claim to claim ${client.currency}!!`
    );
    client.data.rmv(message.author.id, parseInt(coinsAmount));
    channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async msg => {
      const id = msg.first().author.id;
      const coinsToClaim = parseInt(coinsAmount);
      await client.data.add(id, coinsToClaim);
      msg
        .first()
        .inlineReply(
          `Congratultions! You have claimed **${coinsToClaim}** ${client.currency}!`
        );
    });
  },
};
