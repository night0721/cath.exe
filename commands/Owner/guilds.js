const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "guilds",
  category: "Owner",
  description: "Check top 10 guilds of the bot",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const guilds = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .first(10);
    const description = guilds
      .map((guild, index) => {
        return `${index + 1}) ${guild.name} -> ${guild.memberCount}members`;
      })
      .join("\n");
    let embed = new MessageEmbed()
      .setTitle("Guilds")
      .setDescription(description)
      .setColor(client.color)
      .setFooter(`Made by Cath Team`)
      .setTimestamp();
    message.channel.send(embed);
  },
};
