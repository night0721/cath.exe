const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "kiss",
  description: "Kiss someone",
  category: "Fun",
  usage: "(User)",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to kiss",
      required: true,
    },
    {
      type: 3,
      name: "words",
      description: "The words you want to say",
      required: false,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user = interaction.guild.members.cache.get(args[0]);
    words = args[1];
    if (user.id === interaction.user.id) {
      return await interaction.followUp("You can't kiss yourself");
    }
    const embed = new MessageEmbed()
      .setDescription(`${interaction.user} **kisses** ${user}`)
      .setImage(
        `https://media.discordapp.net/attachments/814310468906123274/817656819416825896/image0.gif`
      )
      .setColor(client.color)
      .setTimestamp()
      .setFooter(`Made by ${client.author}`);
    if (words) {
      embed.addField("Words:", reason);
    }
    await interaction
      .followUp({ embeds: [embed] })
      .then(msg => msg.react("💕"));
  },
};
