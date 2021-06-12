const { Client, Message, MessageEmbed, Util } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("discord-ytdl-core");
const yts = require("yt-search");
const scdl = require("soundcloud-downloader").default;
const config = require("../../config.json");
module.exports = {
  name: "play",
  description: "Play songs",
  usage: "(YouTube_URL)/(Song Name)",
  aliases: ["p"],
  category: "Music",
  BotPerm: ["CONNECT", "SPEAK"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "play", 35);
    var searchString = args.join(" ");
    if (!searchString) return client.err(message, "Music", "play", 0);
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    var serverQueue = message.client.queue.get(message.guild.id);

    let songInfo;
    let song;
    if (
      url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)
    ) {
      try {
        songInfo = await ytdl.getInfo(url);
        if (!songInfo) return client.err(message, "Music", "play", 42);
        song = {
          id: songInfo.videoDetails.videoId,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0]
            .url,
          duration: songInfo.videoDetails.lengthSeconds,
          ago: songInfo.videoDetails.publishDate,
          views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
          req: message.author,
        };
      } catch (error) {
        console.log(e);
        return client.err(message, "Music", "play", 999);
      }
    } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
      try {
        songInfo = await scdl.getInfo(url);
        if (!songInfo) return client.err(message, "Music", "play", 43);
        song = {
          id: songInfo.permalink,
          title: songInfo.title,
          url: songInfo.permalink_url,
          img: songInfo.artwork_url,
          ago: songInfo.last_modified,
          views: String(songInfo.playback_count).padStart(10, " "),
          duration: Math.ceil(songInfo.duration / 1000),
          req: message.author,
        };
      } catch (e) {
        console.error(e);
        return client.err(message, "Music", "play", 999);
      }
    } else {
      try {
        var searched = await yts.search(searchString);
        if (searched.videos.length === 0)
          return client.err(message, "Music", "play", 44);
        songInfo = searched.videos[0];
        song = {
          id: songInfo.videoId,
          title: Util.escapeMarkdown(songInfo.title),
          views: String(songInfo.views).padStart(10, " "),
          url: songInfo.url,
          ago: songInfo.ago,
          duration: songInfo.duration.toString(),
          img: songInfo.image,
          req: message.author,
        };
      } catch (e) {
        console.error(e);
        return client.err(message, "Music", "play", 999);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
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

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return client.err(message, "Music", "play", 40);
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
              if (queue) {
                queue.songs.shift();
                play(queue.songs[0]);
                return client.err(message, "Music", "play", 999);
              }
            }
          });
        }
      } catch (error) {
        if (queue) {
          queue.songs.shift();
          play(queue.songs[0]);
        }
      }
      queue.connection.on("disconnect", () =>
        message.client.queue.delete(message.guild.id)
      );
      const dispatcher = queue.connection
        .play(stream, { type: streamType })
        .on("finish", () => {
          const shiffed = queue.songs.shift();
          if (queue.loop === true) {
            queue.songs.push(shiffed);
          }
          play(queue.songs[0]);
        });

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor(`Playing song`, "https://i.imgur.com/qHPXWxN.gif")
        .setThumbnail(song.img)
        .setColor("client.color")
        .addField("Name:", `**${song.title}**`, true)
        .addField("Duration:", `**${song.duration}**`, true)
        .addField("Requested by:", `**${song.req.tag}**`, true)
        .setFooter(`Views:${song.views} | ${song.ago}`);
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.log(e);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return client.err(message, "Music", "play", 39);
    }
  },
};
