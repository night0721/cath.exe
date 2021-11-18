const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "play",
  description: "Plays your favourite music from YouTube or Spotify",
  usage: "(Song/Song URL)",
  category: "Music",
  options: [
    {
      type: 3,
      name: "song",
      description: "Play song or a playlist in the voice channel",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils) => {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      client.err(
        interaction,
        "**You must be in a voice channel to use this command**"
      );
    } else {
      const player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: voiceChannel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
        volume: 100,
      });
      if (player.state != "CONNECTED") await player.connect();
      const search = args[0];
      let res;
      try {
        res = await player.search(search, interaction.user);
        if (res.loadType === "LOAD_FAILED") {
          if (!player.queue.current) player.destroy();
          client.err(interaction, "**There was an error while searching**");
        }
      } catch {
        client.err(interaction, "**There was an error while searching**");
      }
      switch (res.loadType) {
        case "NO_MATCHES":
          if (!player.queue.current) player.destroy();
          client.err(interaction, "**No results were found**");
          break;
        case "TRACK_LOADED":
          player.queue.add(res.tracks[0]);
          if (!player.playing && !player.paused && !player.queue.length) {
            player.play();
          }
          const SongAddedEmbed = new MessageEmbed()
            .setAuthor(`Added to queue`, client.user.displayAvatarURL())
            .setThumbnail(res.tracks[0].displayThumbnail())
            .setColor(client.color)
            .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`)
            .addField(
              "Duration",
              `\`${utils.prettyMs(res.tracks[0].duration, {
                colonNotation: true,
              })}\``,
              true
            );
          if (player.queue.totalSize > 1) {
            SongAddedEmbed.addField(
              "Position in queue",
              `${player.queue.size - 0}`,
              true
            );
          }
          interaction.followUp({ embeds: [SongAddedEmbed] });
          break;
        case "PLAYLIST_LOADED":
          player.queue.add(res.tracks);
          await player.play();
          const SongAdded = new MessageEmbed()
            .setAuthor(
              `Playlist added to queue`,
              client.user.displayAvatarURL()
            )
            .setThumbnail(res.tracks[0].displayThumbnail())
            .setColor(client.color)
            .setDescription(`[${res.playlist.name}](${args[0]})`)
            .addField("Enqueued", `\`${res.tracks.length}\` songs`, false)
            .addField(
              "Playlist duration",
              `\`${utils.prettyMs(res.playlist.duration, {
                colonNotation: true,
              })}\``,
              false
            );
          interaction.followUp({ embeds: [SongAdded] });
          break;
        case "SEARCH_RESULT":
          const track = res.tracks[0];
          player.queue.add(track);
          if (!player.playing && !player.paused && !player.queue.length) {
            const SongAddedEmbed = new MessageEmbed()
              .setAuthor(`Added to queue`, client.user.displayAvatarURL())
              .setThumbnail(track.displayThumbnail())
              .setColor(client.color)
              .setDescription(`[${track.title}](${track.uri})`)
              .addField(
                "Duration",
                `\`${utils.prettyMs(track.duration, {
                  colonNotation: true,
                })}\``,
                true
              );
            if (player.queue.totalSize > 1) {
              SongAddedEmbed.addField(
                "Position in queue",
                `${player.queue.size - 0}`,
                true
              );
            }
            player.play();
            interaction.followUp({ embeds: [SongAddedEmbed] });
          } else {
            const SongAddedEmbed = new MessageEmbed()
              .setAuthor(`Added to queue`, client.user.displayAvatarURL())
              .setThumbnail(track.displayThumbnail())
              .setColor(client.color)
              .setDescription(`[${track.title}](${track.uri})`)
              .addField(
                "Duration",
                `\`${utils.prettyMs(track.duration, {
                  colonNotation: true,
                })}\``,
                true
              );
            if (player.queue.totalSize > 1) {
              SongAddedEmbed.addField(
                "Position in queue",
                `${player.queue.size - 0}`,
                true
              );
            }
            interaction.followUp({ embeds: [SongAddedEmbed] });
            break;
          }
      }
    }
  },
};
