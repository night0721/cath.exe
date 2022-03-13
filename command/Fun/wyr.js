const { MessageEmbed } = require("discord.js");
const questions = require("../../util/Data/wyr.json");
module.exports = {
  name: "wyr",
  description: "Send some would-you rather questions",
  run: async (client, interaction, args) => {
    const messagetext = questions[Math.floor(Math.random() * questions.length)];
    const question = messagetext.split("Would you rather ")[1];
    const q = question.split(" or ");
    const Option1 = q[0];
    const Option2 = q[1];
    const embed = new MessageEmbed()
      .setTitle("Would You Rather")
      .setDescription(
        `🇦 ${Option1} \n\n **OR** \n\n :regional_indicator_b: ${Option2}`
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dyamic: true }),
      })
      .setColor(client.color)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    wyrmessage = await interaction.followUp({ embeds: [embed] });
    wyrmessage.react("🇦");
    wyrmessage.react("🇧");
  },
};
