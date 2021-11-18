const client = require("../");
const { MessageEmbed } = require("discord.js");
const db = require("../models/guilds");
client.on("guildCreate", guild => {
  client.channels.cache.get(client.config.ServerLog).send({
    embeds: [
      new MessageEmbed()
        .setTitle("New Server")
        .addField(
          "Server Info",
          `**>Server Name**: \n${guild.name}
          **>Server ID**: \n${guild.id}
          **>Server Member Count**: \n${guild.memberCount}`
        )
        .setFooter(
          `${client.user.username} Currently in ${client.guilds.cache.size} servers`,
          client.user.displayAvatarURL()
        )
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor("GREEN"),
    ],
  });
  const newdb = new db({
    Guild: guild.id,
    Prefix: client.config.prefix,
  });
  newdb.save();
});

client.on("guildDelete", async guild => {
  client.data.DelGuild(guild.id);
  client.channels.cache.get(client.config.ServerLog).send({
    embeds: [
      new MessageEmbed()
        .setTitle("Deleted Server")
        .addField(
          "Server Info",
          `**>Server Name**: \n${guild.name}
          **>Server ID**: \n${guild.id}
          **>Server Member Count**: \n${guild.memberCount}`
        )
        .setFooter(
          `${client.user.username} Currently in ${client.guilds.cache.size} servers`,
          client.user.displayAvatarURL()
        )
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor("RED"),
    ],
  });
});
client.prefix = async function (message) {
  let custom;
  if (!message.guild) return;
  const data = await db
    .findOne({ Guild: message.guild.id })
    .catch(err => console.log(err));
  if (data) custom = data.Prefix;
  else custom = client.config.prefix;
  return custom;
};
