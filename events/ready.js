const client = require("../index");
const config = require("../config.json");
const prefix = config.prefix;
const version = require("../package.json").version;
const { MessageEmbed } = require("discord.js");
client.on("ready", () => {
  var users = client.guilds.cache
    .reduce((a, b) => a + b.memberCount, 0)
    .toLocaleString();
  var playing = [
    `v${version} | ${prefix}help`,
    client.web,
    `with ${users} users`,
  ];
  var interval = setInterval(function () {
    var game = Math.floor(Math.random() * playing.length + 0);
    client.user.setActivity({
      name: playing[game],
      type: "STREAMING",
      url: "https://www.twitch.tv/thekiritosgaming",
    });
  }, 5000);
  console.log(`${client.user.username} ✅\nVersion: v${version}`);
  var embed = new MessageEmbed()
    .setColor(client.color)
    .setTitle(`${client.user.tag} is online`)
    .setDescription(`${client.user.username} ✅\nVersion: v${version}`)
    .setTimestamp()
    .setFooter(`${client.user.username}`);
  client.ReadyLog.send(embed);
});