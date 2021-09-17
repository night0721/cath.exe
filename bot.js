const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const config = require("./config.json");
const version = require("./package.json").version;
require("dotenv").config();
const client = new Client({
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  presence: {
    activities: [
      {
        name: `v${version} | ${config.prefix}help`,
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=_D5xG7XoF88",
      },
    ],
  },
  restTimeOffset: 0,
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
  intents: [
    Intents.FLAGS.GUILDS,
    //Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    //Intents.FLAGS.GUILD_PRESENCES,
  ],
});
module.exports = client;
require("./util/functions/economy")(client);
require("./util/dist/manager")(client);
require("./util/dist/handler")(client);
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.esnipes = new Collection();
client.hide = new Collection();
client.snipes = new Array();
client.queue = new Map();
client.Timers = new Map();
client.config = config;
client.function = require("./util/functions/function");
client.data = require("./util/functions/mongoose");
client.err = require("./util/dist/err");
client.serr = require("./util/dist/slash");
client.cat = client.config.ca;
client.SuggestionLog = client.config.Suggestion;
client.ReportLog = client.config.Report;
client.DMLog = client.config.DMLog;
client.CMDLog = client.config.CMDLog;
client.ServerLog = client.config.ServerLog;
client.ErrorLog = client.config.ErrorLog;
client.color = client.config.color;
client.author = "Cath Team";
client.invite = "https://discord.gg/SbQHChmGcp";
client.web = client.config.URL;
client.data
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(e => console.log(e));
client.owners = [
  "452076196419600394", //Night
  "766645910087139338", //chekseaa
  "755476040029306952", //Kałÿ
  "534027706325532694", //Cat drinking a cat
  "381442059111759883", //Thunder
  "556808365574193194", //chunchunmaru
];
client.currency = "<:cp:840231933933387797>";
client.path = [
  "614423108388126731",
  "767173194943168542",
  "783633408738721834",
  "718762019586572341",
  "784052348561522730",
  "840225563193114624",
  "800396461229080619",
];
client.giveaways = new GiveawaysManager(client, {
  storage: "./util/Data/giveaways.json",
  updateCountdownEvery: 1000,
  default: {
    botsCanWin: false,
    embedColor: client.color,
    reaction: "🎉",
  },
});
process.on("unhandledRejection", async err => {
  if (client.user) {
    if (client.user.id === client.user.id) {
      const embed = new MessageEmbed()
        .setTitle("UnhandledRejection Error")
        .setDescription(`\`\`\`ini\n${err.stack}\`\`\``)
        .setTimestamp()
        .setColor(client.color)
        .setFooter(client.user.username);
      client.channels.cache.get(client.ErrorLog).send({ embeds: [embed] });
    }
  }
  return console.log(err);
});
client.login(process.env.TOKEN);
