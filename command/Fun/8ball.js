const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "8ball",
  usage: "(Question)",
  description: "8ball an answer",
  category: "Fun",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "question",
      description: "The question you want to ask",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const data = await axios
      .get(`${process.env.api}/api/v1/fun/8ball`)
      .then(res => res.data.answer);
    const embed = new MessageEmbed()
      .setAuthor(
        `🎱 ${interaction.member.user.tag} asks`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(`**🎱Question:** \n${args[0]} \n**🎱Answer:** \n ${data}`)
      .setColor(client.color)
      .setTimestamp()
      .setURL(client.web)
      .setFooter(`Made by ${client.author}`);
    await interaction.followUp({ embeds: [embed] });
  },
};
