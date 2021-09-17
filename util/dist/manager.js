const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const { MessageEmbed } = require("discord.js");
module.exports = async client => {
  try {
    const id = process.env.SPOTIFY_ID;
    const secret = process.env.SPOTIFY_SECRET;
    client.manager = new Manager({
      plugins: [
        new Spotify({
          clientID: id,
          clientSecret: secret,
        }),
      ],
      nodes: [
        {
          host: process.env.host,
          port: Number(process.env.port),
          password: process.env.password,
          retryDelay: 5000,
        },
      ],
      autoPlay: true,
      send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
      .on("nodeConnect", node =>
        console.log(`Node "${node.options.identifier}" has connected.`)
      )
      .on("nodeError", (node, error) =>
        console.log(
          `Node "${node.options.identifier}" encountered an error: ${error.message}.`
        )
      )
      .on("trackStart", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new MessageEmbed()
          .setColor("02023a")
          .setAuthor(
            `Now Playing`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setFooter(`Made by ${client.author}`)
          .setTimestamp()
          .setDescription(`[${track.title}](${track.uri})`)
          .addField(`Requested By : `, `${track.requester}`, true);
        channel.send({ embeds: [embed] });
      })
      .on("trackStuck", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new MessageEmbed()
          .setColor("02023a")
          .setAuthor(
            `Track Stuck`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setDescription(`${track.title}`)
          .setFooter(`Made by ${client.author}`)
          .setTimestamp();
        channel.send({ embeds: [embed] });
      })
      .on("queueEnd", player => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed2 = new MessageEmbed()
          .setColor("02023a")
          .setAuthor(
            `Queue has ended`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setFooter(`Made by ${client.author}`)
          .setTimestamp();
        channel.send({ embeds: [embed2] });
        player.destroy();
      });
  } catch (e) {
    console.log(e);
  }
};
