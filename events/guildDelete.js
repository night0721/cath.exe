const client = require("../index");
const db = require("../models/guilds");
const { prefix, Log } = require("../config.json");
const { MessageEmbed } = require("discord.js");

client.on("guildDelete", async guild => {
  client.data.DelGuild(guild.id).then(() => console.log("Deleted Data"));
  client.ServerLog.send(
    new MessageEmbed()
      .setTitle("Deleted from server")
      .addField("Server Info", [
        `**>**Server Name: ${guild.name}`,
        `**>**Server ID: ${guild.id}`,
        `**>**Server Member Count: ${guild.memberCount}`,
      ])
      .addField("Owner Info", [
        `Owner Tag: ${guild.owner.user.tag}`,
        `Owner ID: ${guild.owner.id}`,
      ])
      .setFooter(`Currently in ${client.guilds.cache.size} servers`)
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("RED")
  );
});

/**
 * @param {Client} client
 */
client.prefix = async function (message) {
  let custom;
  if (!message.guild) return;
  const data = await db
    .findOne({ Guild: message.guild.id })
    .catch(err => console.log(err));
  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};
