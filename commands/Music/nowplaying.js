const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "nowplaying",
  description: "To show the music which is currently playing in this server",
  category: "Music",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.err(message, "Music", "nowplaying", 34);
    let song = serverQueue.songs[0];
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", "https://i.imgur.com/qHPXWxN.gif")
      .setThumbnail(song.img)
      .setColor("client.color")
      .addField("Name:", `**${song.title}**`, true)
      .addField("Duration:", `**${song.duration}**`, true)
      .addField("Requested by:", `**${song.req.tag}**`, true)
      .setFooter(`Views:${song.views} | ${song.ago}`);
    return message.channel.send(thing);
  },
};
