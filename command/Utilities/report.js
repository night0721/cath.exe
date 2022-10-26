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
    const bug = args[0];
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle("SUCCESS!")
          .setDescription(
            "You have reported a bug.\nPlease wait for us to solve it"
          )
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp()
          .setColor("GREEN"),
      ],
    });
    const ch = client.channels.cache.get(client.config.Report);
    ch.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setTitle("New Bug")
          .setDescription(bug)
          .setColor("ORANGE")
          .setTimestamp(),
      ],
    });
  },
};
