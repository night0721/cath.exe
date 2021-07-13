const {
  Client,
  Collection,
  WebhookClient,
  MessageEmbed,
} = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const fs = require("fs");
const config = require("./config.json");
require("dotenv").config();
const client = new Client({
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  restTimeOffset: 0,
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
});
module.exports = client;
client.color = config.color;
client.author = "Cath Team";
client.invite = "https://discord.gg/SbQHChmGcp";
client.web = config.URL;
require("./util/dist/cmds").cmds();
require("./inlinereply");
require("./util/functions/economy")(client);
require("./util/dist/manager")(client);
client.CMDLog = new WebhookClient(
  process.env.CMDLogID,
  process.env.CMDLogToken
);
client.ReadyLog = new WebhookClient(
  process.env.ReadyLogID,
  process.env.ReadyLogToken
);
client.ServerLog = new WebhookClient(
  process.env.ServerLogID,
  process.env.ServerLogToken
);
client.ErrorLog = new WebhookClient(
  process.env.ErrorLogID,
  process.env.ErrorLogToken
);
process.on("unhandledRejection", async err => {
  if (client.user) {
    if (client.user.id === client.user.id) {
      const embed = new MessageEmbed()
        .setTitle("UnhandledRejection Error")
        .setDescription(`\`\`\`ini\n${err.stack}\`\`\``)
        .setTimestamp()
        .setColor(client.color)
        .setFooter(client.user.username);
      client.ErrorLog.send(embed);
    }
  }
  return console.log(err);
});
client.SuggestionLog = config.Suggestion;
client.ReportLog = config.Report;
client.DMLog = config.DM;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.snipes = [];
client.esnipes = new Collection();
client.hide = new Collection();
client.queue = new Map();
client.Timers = new Map();
client.cat = config.ca;
client.function = require("./util/functions/function");
client.data = require("./util/functions/mongoose");
client.err = require("./util/dist/err");
client.data
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(e => console.log(e));
client.owners = [
  "452076196419600394",
  "749692825402212494",
  "766645910087139338",
  "755476040029306952",
  "534027706325532694",
  "381442059111759883",
  "556808365574193194",
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
client.categories = fs.readdirSync("./commands/");
client.paths = fs.readdirSync("./cat/");
["command"].forEach(handler => {
  require(`./util/command-handler`)(client);
});
client.login(process.env.TOKEN);
