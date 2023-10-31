const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "report",
  description: "Report a bug of the bot",
  category: "Utilities",
  options: [
    {
      type: 3,
      name: "bug",
      description: "The bug you want to report",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle("SUCCESS!")
          .setDescription(
            "You have reported a bug.\nPlease wait for us to solve it"
          )
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp()
          .setColor("Green"),
      ],
    });
    client.channels.cache.get(client.config.Report).send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle("New Bug")
          .setDescription(args[0])
          .setColor("Orange")
          .setTimestamp(),
      ],
    });
  },
};
