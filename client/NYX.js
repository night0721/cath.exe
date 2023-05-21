const {
  Client,
  Collection,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const config = require("../config");
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
            type: 1,
            url: "https://www.youtube.com/watch?v=YSKDu1gKntY",
          },
        ],
      },
      shards: "auto",
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
      ],
      intents: [
        GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMembers,
        // GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
      ],
    }
  ) {
    super(options);
    this.slashCommands = new Collection();
    this.hide = new Collection();
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
      "687622268037365774", // Tac Shadow
      "309681798957498368", // Sideload
      "707177879984668673", // Random rock
      "757530324686340197", // Madhav
      "804712098625486848", // hcs
      "1078015817184182414", // gaba
      "774390900411465769" // Alphaus
    ];
    this.currency = "<:nyx_currency:918584872333893703>";
    this.xp = "<:nyx_xp:900309007472926720>";
    this.dev = "<:discord_bot_dev:840231906200387666>"
    this.path = [
      "614423108388126731", // Camper on Duty
      "767173194943168542", // Dark Bonker
      "718762019586572341", // NYX Nation
      "840225563193114624", // Command Test
    ];
  }

  start() {
    require("../util/dist/handler")(this);
    this.login(
      process.argv[2] == "--dev" ? process.env.DEV : process.env.TOKEN
    );
    this.data
      .connect(process.env.MONGO)
      .then(() => console.log("Connected to MongoDB ✅"))
      .catch(e => console.log(e));
  }
  err(interaction, error) {
    const embed = new EmbedBuilder()
      .setTitle("An Error Occured")
      .setColor("Red")
      .setDescription(`❌ | ${error}`)
      .setTimestamp()
      .setFooter({
        text: `Made by ${this.author}`,
        iconURL: this.user.displayAvatarURL({ dynamic: true }),
      });
    interaction.channel.send({ embeds: [embed] });
    this.channels.cache.get(this.config.ErrorLog).send({ embeds: [embed] });
  }
}

module.exports = NYX;
