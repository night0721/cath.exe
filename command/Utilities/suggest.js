const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "suggest",
  description: "Make a suggestion of the bot",
  category: "Utilities",
  options: [
    {
      type: 3,
      name: "suggestion",
      description: "The suggestion",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    client.channels.cache.get(client.config.Suggestion).send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle("New Suggestion")
          .setDescription(args[0])
          .setColor("Orange")
          .setTimestamp(),
      ],
    });
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle("SUCCESS!")
          .setDescription(
            "You have sent a suggestion.\nPlease wait for us to review it"
          )
          .setColor("Green")
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
