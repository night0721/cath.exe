const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "guilds",
  category: "Owner",
  description: "Check top 10 guilds of the bot",
  Owner: true,
  run: async (client, interaction) => {
    const guilds = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .first(10);
    const description = guilds
      .map((guild, index) => {
        return `**${index + 1}❯** ${guild.name} =❯ ${
          guild.memberCount
        } members`;
      })
      .join("\n");
    const embed = new EmbedBuilder()
      .setTitle("Guilds")
      .setDescription(description)
      .setColor(client.color)
      .addFields([
        {
          name: `Total Guilds`,
          value: client.guilds.cache.size
            ? client.guilds.cache.size.toString()
            : "0",
          inline: true,
        },
        {
          name: `Total Members`,
          value: client.users.cache.size
            ? client.users.cache.size.toString()
            : "0",
          inline: true,
        },
      ])
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
