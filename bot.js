const { MessageEmbed, Intents } = require("discord.js");
const Cath = require("./client/Cath");
const version = require("./package.json").version;
const config = require("./config.json");
const client = new Cath({
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
    //Intents.FLAGS.GUILD_MEMBERS,
    //Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
module.exports = client;
require("./util/functions/economy")(client);
require("./util/dist/manager")(client);
require("./util/dist/handler")(client);
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
  return console.error(err);
});
client.start();
