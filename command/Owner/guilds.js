const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guilds",
  category: "Owner",
  description: "Check top 10 guilds of the bot",
  Owner: true,
  run: async (client, interaction, args) => {
    const guilds = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .first(10);
    const description = guilds
      .map((guild, index) => {
        return `${index + 1}) ${guild.name} -> ${guild.memberCount} members`;
      })
      .join("\n");
    let embed = new MessageEmbed()
      .setTitle("Guilds")
      .setDescription(description)
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`)
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
