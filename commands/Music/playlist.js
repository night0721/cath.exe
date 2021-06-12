const { Client, Message, MessageEmbed, Util } = require("discord.js");
const yts = require("yt-search");
const ytdlDiscord = require("discord-ytdl-core");
var ytpl = require("ytpl");
const scdl = require("soundcloud-downloader").default;
const config = require("../../config.json");
module.exports = {
  name: "playlist",
  description: "Play songs",
  usage: "(YouTube Playlist URL)/(Playlist Name)",
  category: "Music",
  BotPerm: ["CONNECT", "SPEAK"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "playlist", 35);
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    var searchString = args.join(" ");
    if (!searchString || !url)
      return client.err(message, "Music", "playlist", 0);
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      try {
        const playlist = await ytpl(url.split("list=")[1]);
        if (!playlist) return client.err(messgae, "Music", "playlist", 404);
        const videos = await playlist.items;
        for (const video of videos) {
          await handleVideo(video, message, channel, true);
        }
        return message.channel.send({
          embed: {
            color: "GREEN",
            description: `✅  **|**  Playlist: **\`${videos[0].title}\`** has been added to the queue`,
          },
        });
      } catch (e) {
        console.error(e);
        return client.err(message, "Music", "playlist", 999);
      }
    } else {
      try {
        var searched = await yts.search(searchString);
        if (searched.playlists.length === 0)
          return client.err(message, "Music", "playlist", 38);
        var songInfo = searched.playlists[0];
        let listurl = songInfo.listId;
        const playlist = await ytpl(listurl);
        const videos = await playlist.items;
        for (const video of videos) {
          // eslint-disable-line no-await-in-loop
          await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
        }
        let thing = new MessageEmbed()
          .setAuthor(
            "Playlist has been added to queue",
            "https://i.imgur.com/qHPXWxN.gif"
          )
          .setThumbnail(songInfo.thumbnail)
          .setColor("GREEN")
          .setDescription(
            `✅  **|**  Playlist: **\`${songInfo.title}\`** has been added \`${songInfo.videoCount}\` video to the queue.`
          );
        return message.channel.send(thing);
      } catch (e) {
        console.log(e);
        return client.err(message, "Music", "playlist", 999);
      }
    }
    async function handleVideo(video, message, channel, playlist = false) {
      const serverQueue = message.client.queue.get(message.guild.id);
      const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        views: video.views ? video.views : "-",
        ago: video.ago ? video.ago : "-",
        duration: video.duration,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        img: video.thumbnail,
        req: message.author,
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: channel,
          connection: null,
          songs: [],
          volume: 80,
          playing: true,
          loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
          var connection = await channel.join();
          queueConstruct.connection = connection;
          play(message.guild, queueConstruct.songs[0]);
        } catch (e) {
          console.log(e);
          message.client.queue.delete(message.guild.id);
          return client.err(message, "Music", "playlist", 39);
        }
      } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        let thing = new MessageEmbed()
          .setAuthor(
            "Song has been added to queue",
            "https://i.imgur.com/qHPXWxN.gif"
          )
          .setThumbnail(song.img)
          .setColor("YELLOW")
          .addField("Name:", `**${song.title}**`, true)
          .addField("Duration:", `**${song.duration}**`, true)
          .addField("Requested by:", `**${song.req.tag}**`, true)
          .setFooter(`Views:${song.views} | ${song.ago}`);
        return message.channel.send(thing);
      }
      return;
    }

    async function play(guild, song) {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!song) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return client.err(message, "Music", "playlist", 40);
      }
      let stream;
      let streamType;

      try {
        if (song.url.includes("soundcloud.com")) {
          try {
            stream = await scdl.downloadFormat(
              song.url,
              scdl.FORMATS.OPUS,
              config.soundcloud
            );
          } catch (error) {
            stream = await scdl.downloadFormat(
              song.url,
              scdl.FORMATS.MP3,
              config.soundcloud
            );
            streamType = "unknown";
          }
        } else if (song.url.includes("youtube.com")) {
          stream = await ytdlDiscord(song.url, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25,
            opusEncoded: true,
          });
          streamType = "opus";
          stream.on("error", function (er) {
            if (er) {
              if (serverQueue) {
                serverQueue.songs.shift();
                play(serverQueue.songs[0]);
                return client.err(message, "Music", "playlist", 999);
              }
            }
          });
        }
      } catch (error) {
        if (serverQueue) {
          console.log(error);
          serverQueue.songs.shift();
          play(serverQueue.songs[0]);
        }
      }
      serverQueue.connection.on("disconnect", () =>
        message.client.queue.delete(message.guild.id)
      );
      const dispatcher = serverQueue.connection
        .play(stream, { type: streamType })
        .on("finish", () => {
          const shiffed = serverQueue.songs.shift();
          if (serverQueue.loop === true) {
            serverQueue.songs.push(shiffed);
          }
          play(guild, serverQueue.songs[0]);
        });

      dispatcher.setVolume(serverQueue.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor("Playing music", "https://i.imgur.com/qHPXWxN.gif")
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name:", `**${song.title}**`, true)
        .addField("Duration:", `**${song.duration}**`, true)
        .addField("Requested by:", `**${song.req.tag}**`, true)
        .setFooter(`Views:${song.views} | ${song.ago}`);
      serverQueue.textChannel.send(thing);
    }
  },
};
