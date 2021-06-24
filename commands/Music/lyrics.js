const { Client, Message, MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const splitlyrics = require("../../util/pagination/pagination");

module.exports = {
  name: "lyrics",
  description: "Get lyrics for the currently playing song",
  category: "Music",
  run: async (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return client.err(message, "Music", "lyrics", 34);
    let lyrics = null;
    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics)
        lyrics = `**No lyrics are found for ${queue.songs[0].title}.**`;
    } catch (error) {
      lyrics = `**No lyrics are found for ${queue.songs[0].title}.**`;
    }
    const splittedLyrics = splitlyrics.chunk(lyrics, 1024);

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(
        `${queue.songs[0].title} — Lyrics`,
        "https://i.imgur.com/qHPXWxN.gif"
      )
      .setThumbnail(queue.songs[0].img)
      .setColor("YELLOW")
      .setDescription(splittedLyrics[0])
      .setFooter(`Page 1 of ${splittedLyrics.length}.`)
      .setTimestamp();

    const lyricsMsg = await message.channel.send(lyricsEmbed);
    if (splittedLyrics.length > 1)
      await splitlyrics.pagination(lyricsMsg, message.author, splittedLyrics);
  },
};
