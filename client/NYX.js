const { Client, Collection, MessageEmbed } = require("discord.js");
const { Manager } = require("erela.js");
const config = require("../config");
const Spotify = require("erela.js-spotify");
const utils = require("../util/functions/function");
require("dotenv").config();

class NYX extends Client {
  /**
   * @param {Client.options} options
   */
  constructor(
    options = {
      presence: {
        activities: [
          {
            name: `/help`,
            type: "STREAMING",
            url: "https://www.youtube.com/watch?v=YSKDu1gKntY",
          },
        ],
      },
      shard: "auto",
      restTimeOffset: 0,
      partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
      intents: 24207,
    }
  ) {
    super(options);
    this.slashCommands = new Collection();
    this.hide = new Collection();
    this.esnipes = new Collection();
    this.snipes = new Collection();
    this.config = config;
    this.data = require("../util/functions/mongoose");
    this.color = config.color;
    this.author = "Team NYX";
    this.invite = "https://discord.gg/SbQHChmGcp";
    this.docs = "https://thunder75.gitbook.io/nyx/";
    this.web = config.URL;
    this.owners = [
      "452076196419600394", // Night
      "534027706325532694", // Cat drinking a cat
      "381442059111759883", // Thunder
      "556808365574193194", // chunchunmaru
      "746753527338238115", // mightyful
    ];
    this.currency = "<:cp:840231933933387797>"; // <a:pumpkin:898975476863877170>
    this.xp = "<:nyx_xp:900309007472926720>";
    this.path = [
      "614423108388126731", // Camper on Duty
      "767173194943168542", // Dark Bonker
      "718762019586572341", // NYX Nation
      "869583978108157972", // Lighthouse Community
      "840225563193114624", // Command Test
    ];
    const client = this;
    require("../util/functions/economy")(client);
    this.manager = new Manager({
      plugins: [
        new Spotify({
          clientID: process.env.SPOTIFY_ID,
          clientSecret: process.env.SPOTIFY_SECRET,
        }),
      ],
      nodes: [
        {
          host: config.Lavalink.Host,
          port: config.Lavalink.Port,
          password: config.Lavalink.Password,
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
        console.log(`Node "${node.options.identifier}" has connected`)
      )
      .on("nodeError", (node, error) =>
        console.log(
          `Node "${node.options.identifier}" encountered an error: ${error.message}`
        )
      )
      .on("trackStart", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new MessageEmbed()
          .setColor(config.color)
          .setAuthor(
            `Now Playing`,
            "https://cdn.discordapp.com/emojis/897017864085712936.gif"
          )
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setThumbnail(player.queue.current.displayThumbnail())
          .setDescription(`[${track.title}](${track.uri})`)
          .addField(
            "Duration",
            `\`${utils.prettyMs(track.duration, {
              colonNotation: true,
            })}\``,
            true
          );
        channel.send({ embeds: [embed] });
      })
      .on("queueEnd", player => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed2 = new MessageEmbed()
          .setColor(config.color)
          .setAuthor(
            `Queue has ended`,
            "https://cdn.discordapp.com/emojis/897017864085712936.gif"
          )
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp();
        channel.send({ embeds: [embed2] });
        // player.destroy(); Remove if 24/7
      });
  }
  start() {
    require("../util/dist/handler")(this);
    this.data
      .connect(process.env.MONGO)
      .then(() => console.log("Connected to MongoDB ✅"))
      .catch(e => console.log(e));
    this.login(process.env.TOKEN);
  }
  err(c, e) {
    const embed = new MessageEmbed()
      .setTitle("An Error Occured")
      .setColor("RED")
      .setDescription(`❌ | ${e}`)
      .setTimestamp()
      .setFooter(`Made by ${this.author}`, this.user.displayAvatarURL());
    c.followUp({ embeds: [embed] });
  }
  se(c, e) {
    const embed = new MessageEmbed()
      .setColor(this.color)
      .setDescription(e)
      .setTimestamp();
    c.followUp({ embeds: [embed] });
  }
}

module.exports = NYX;
