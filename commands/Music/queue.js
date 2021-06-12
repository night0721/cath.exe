const { Client, Message, MessageEmbed } = require("discord.js");
const util = require("../../util/pagination");
module.exports = {
  name: "queue",
  description: "To show the songs queue",
  aliases: ["q"],
  category: "Music",
  BotPerm: ["MANAGE_MESSAGES", "ADD_REACTIONS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return client.err(message, "Music", "queue", 34);
    const que = queue.songs.map(
      (t, i) => `\`${++i}.\` | [\`${t.title}\`](${t.url}) - [<@${t.req.id}>]`
    );
    const chunked = util.chunk(que, 10).map(x => x.join("\n"));
    const embed = new MessageEmbed()
      .setAuthor("Songs Queue", "https://i.imgur.com/qHPXWxN.gif")
      .setThumbnail(message.guild.iconURL())
      .setColor("client.color")
      .setDescription(chunked[0])
      .addField(
        "Now Playing",
        `[${queue.songs[0].title}](${queue.songs[0].url})`,
        true
      )
      .addField("Text Channel", queue.textChannel, true)
      .addField("Voice Channel", queue.voiceChannel, true)
      .setFooter(
        `Currently Server Volume is ${queue.volume} | Page 1 of ${chunked.length}.`
      );
    if (queue.songs.length === 1)
      embed.setDescription(
        `**No songs to play next. Add songs by \`\`${await client.prefix(
          message
        )}play <song_name>\`\`**`
      );

    try {
      const queueMsg = await message.channel.send(embed);
      if (chunked.length > 1)
        await util.pagination(queueMsg, message.author, chunked);
    } catch (e) {
      console.log(e);
      return client.err(message, "Music", "queue", 999);
    }
  },
};
