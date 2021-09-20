const { Client, Collection } = require("discord.js");
const config = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
require("dotenv").config();
class Cath extends Client {
  /**
   * @param {Client.options} options
   */
  constructor(options = {}) {
    super(options);
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.aliases = new Collection();
    this.esnipes = new Collection();
    this.hide = new Collection();
    this.snipes = new Collection();
    this.queue = new Map();
    this.Timers = new Map();
    this.config = config;
    this.function = require("../util/functions/function");
    this.data = require("../util/functions/mongoose");
    this.err = require("../util/dist/err");
    this.serr = require("../util/dist/slash");
    this.cat = this.config.ca;
    this.SuggestionLog = this.config.Suggestion;
    this.ReportLog = this.config.Report;
    this.DMLog = this.config.DMLog;
    this.CMDLog = this.config.CMDLog;
    this.ServerLog = this.config.ServerLog;
    this.ErrorLog = this.config.ErrorLog;
    this.color = this.config.color;
    this.author = "Cath Team";
    this.invite = "https://discord.gg/SbQHChmGcp";
    this.web = this.config.URL;
    this.owners = [
      "452076196419600394", //Night
      "766645910087139338", //chekseaa
      "755476040029306952", //Kałÿ
      "534027706325532694", //Cat drinking a cat
      "381442059111759883", //Thunder
      "556808365574193194", //chunchunmaru
    ];
    this.currency = "<:cp:840231933933387797>";
    this.path = [
      "614423108388126731",
      "767173194943168542",
      "783633408738721834",
      "718762019586572341",
      "784052348561522730",
      "840225563193114624",
      "800396461229080619",
    ];
    this.giveaways = new GiveawaysManager(this, {
      storage: "./util/Data/giveaways.json",
      updateCountdownEvery: 1000,
      default: {
        botsCanWin: false,
        embedColor: this.color,
        reaction: "🎉",
      },
    });
  }
  start() {
    this.data
      .connect(process.env.MONGO)
      .then(() => console.log("Connected to MongoDB!"))
      .catch(e => console.log(e));
    this.login(process.env.TOKEN);
  }
}

module.exports = Cath;
