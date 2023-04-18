const { MessageEmbed } = require("discord.js");
const dares = require("../../util/Data/dares.json");

module.exports = {
  name: "dare",
  description: "The maturity level of the topics the question can relate to",
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setAuthor(
        interaction.user.tag,
        interaction.user.displayAvatarURL({ dyamic: true })
      )
      .setTitle(dares[Math.round(Math.random() * (dares.length - 1))])
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
