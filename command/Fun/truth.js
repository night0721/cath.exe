const { MessageEmbed } = require("discord.js");
const tnd = require("../../util/Data/tnd.json");
module.exports = {
  name: "truth",
  description: "Gives a random question that has to be answered truthfully",
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dyamic: true }),
      })
      .setTitle(tnd.truth[Math.round(Math.random() * tnd.truth.length - 1)])
      .setColor(client.color)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
