const { MessageEmbed } = require("discord.js");
const truth = require("../../util/Data/truth.json");

module.exports = {
  name: "truth",
  description: "Gives a random question that has to be answered truthfully",
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        interaction.user.tag,
        interaction.user.displayAvatarURL({ dyamic: true })
      )
      .setTitle(truth[Math.round(Math.random() * truth.length)])
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
