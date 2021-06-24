const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "volume",
  description: "To change the server song queue volume",
  usage: "(Number)",
  aliases: ["vol"],
  category: "Music",
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "volume", 35);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.err(message, "Music", "volume", 34);
    if (!serverQueue.connection)
      return client.err(message, "Music", "volume", 34);
    if (!args[0])
      return message.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    if (isNaN(args[0])) return client.err(message, "Music", "volume", 101);
    if (parseInt(args[0]) > 150 || args[0] < 0)
      return client.err(message, "Music", "volume", 101);
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`Tuned the volume to: **${args[0] / 1}/100**`)
      .setAuthor("Server Volume Manager", "https://i.imgur.com/qHPXWxN.gif")
      .setColor("client.color");
    return message.channel.send(xd);
  },
};
