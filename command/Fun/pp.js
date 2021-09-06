const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "pp",
  description: "Check how long is the user",
  usage: "(User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const { user } =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    let embed = new MessageEmbed()
      .addField(
        `${user.username}\'s peepee`,
        `8${"=".repeat(Math.floor(Math.random() * 20))}D`
      )
      .setColor(client.color)
      .setTitle("Peepee size machine")
      .setTimestamp()
      .setFooter(`Made by ${client.author}`);
    await interaction.followUp({
      embeds: [embed],
    });
  },
};
