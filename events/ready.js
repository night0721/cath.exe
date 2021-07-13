const client = require("../bot");
const config = require("../config.json");
const prefix = config.prefix;
const version = require("../package.json").version;
const { MessageEmbed } = require("discord.js");
const m = require("../models/bot");
const test = require("../util/dist/cmds").cmds();
client.on("ready", async () => {
  client.manager.init(client.user.id);
  var users = client.guilds.cache
    .reduce((a, b) => a + b.memberCount, 0)
    .toLocaleString();
  var guilds = client.guilds.cache.size.toString();
  await client.data.botcache(client.user.id, guilds, users);
  await client.data.commands(client.user.id, test);
  var playing = [`v${version} | ${prefix}help`, client.web, `${users} users`];
  async function find() {
    const statusdb = await m.findOne({
      Status: "true",
    });
    if (statusdb && statusdb.Status == "true") {
      client.user.setPresence({
        activity: [
          {
            name: "Under Maintenance",
            type: "WATCHING",
          },
        ],
        status: "dnd",
      });
      // client.user.setPresence({
      //   activity: [
      //     {
      //       name: "Under Maintenance",
      //       type: "STREAMING",
      //       url: "https://twtich.tv/thekiritosgaming",
      //     },
      //   ],
      //   status: "dnd",
      // });
    } else {
      setInterval(function () {
        var game = Math.floor(Math.random() * playing.length + 0);
        client.user.setActivity({
          name: playing[game],
          type: "STREAMING",
          url: "https://twitch.tv/thekiritosgaming",
          //status: "online",
        });
      }, 5000);
    }
  }
  find();
  console.log(`${client.user.username} ✅\nVersion: v${version}`);
  var embed = new MessageEmbed()
    .setColor(client.color)
    .setTitle(`${client.user.tag} is online`)
    .setDescription(`${client.user.username} ✅\nVersion: v${version}`)
    .setTimestamp()
    .setFooter(`${client.user.username}`);
  client.ReadyLog.send(embed);
});
