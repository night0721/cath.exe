const topics = require("../../../util/Data/topics.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "topic",
  description: "Generate topics",
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.username} picked a topic`)
      .setDescription(`${topics[Math.floor(Math.random() * topics.length)]}`)
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp()
      .setThumbnail(
        "https://media.discordapp.net/attachments/896078559293104128/896392631565828146/nyx_logo_transparent.webp"
      );
    interaction.followUp({ embeds: [embed] });
  },
};
