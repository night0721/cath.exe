const { MessageEmbed } = require("discord.js");
const tnd = require("../../util/Data/tnd.json");
module.exports = {
  name: "dare",
  description: "The maturity level of the topics the question can relate to",
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dyamic: true }),
      })
      .setTitle(dares[Math.round(Math.random() * tnd.dare.length - 1)])
      .setColor(client.color)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
