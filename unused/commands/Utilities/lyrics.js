const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { Pagination } = require("cath");
module.exports = {
  name: "lyrics",
  description: "Get lyrics for the currently playing song",
  category: "Music",
  usage: "(Song)",
  options: [
    {
      type: 3,
      name: "song",
      description: "The song to search",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const splitlyrics = new Pagination();
    const lyricsdata = await axios
      .get(
        `${process.env.api}/api/v1/lyrics?name=${encodeURIComponent(args[0])}`
      )
      .then(res => res.data);
    if (!lyricsdata?.lyrics) {
      interaction.followUp({
        content: `**No lyrics are found for ${args[0]}**`,
      });
    } else {
      const splittedLyrics = splitlyrics.chunk(lyricsdata.lyrics, 1024);
      const lyricsEmbed = new MessageEmbed()
        .setAuthor(`Lyrics`)
        .setColor("YELLOW")
        .addFields(
          { name: "Song Name", value: lyricsdata.title, inline: true },
          { name: "⠀", value: "⠀", inline: true },
          {
            name: "Full Lyrics",
            value: `${
              process.env.api
            }/api/v1/lyrics/full?name=${encodeURIComponent(args[0])}`,
            inline: true,
          }
        )
        .setDescription(splittedLyrics[0])
        .setFooter(`Page 1 of ${splittedLyrics.length}`)
        .setThumbnail(lyricsdata.image)
        .setTimestamp();
      const lyricsMsg = await interaction.followUp({ embeds: [lyricsEmbed] });
      if (splittedLyrics.length > 1) {
        await splitlyrics.pagination(
          lyricsMsg,
          interaction.user,
          splittedLyrics
        );
      }
    }
  },
};
