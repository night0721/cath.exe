const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const splitlyrics = require("../../util/pagination/pagination");
module.exports = {
  name: "lyrics",
  description: "Get lyrics for the currently playing song",
  category: "Music",
  usage: "(Song)",
  run: async (client, message, args) => {
    let lyrics = null;
    try {
      lyrics = await lyricsFinder(args.slice(0).join(" "), "");
      if (!lyrics)
        lyrics = `**No lyrics are found for ${args.slice(0).join(" ")}.**`;
    } catch (error) {
      lyrics = `**No lyrics are found for ${args.slice(0).join(" ")}.**`;
    }
    const splittedLyrics = splitlyrics.chunk(lyrics, 1024);
    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`Lyrics`)
      .setColor("YELLOW")
      .setDescription(splittedLyrics[0])
      .setFooter(`Page 1 of ${splittedLyrics.length}.`)
      .setTimestamp();

    const lyricsMsg = await message.channel.send(lyricsEmbed);
    if (splittedLyrics.length > 1)
      await splitlyrics.pagination(lyricsMsg, message.author, splittedLyrics);
  },
};
