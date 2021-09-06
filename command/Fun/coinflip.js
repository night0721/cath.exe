const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "coinflip",
  description: "Flip a coin",
  category: "Fun",
  run: async (client, interaction, args) => {
    let HT = ["Heads!", "Tails!"];
    let pick = HT[Math.floor(Math.random() * HT.length)];
    let embed = new MessageEmbed()
      .setColor(client.color)
      .setTitle("CoinFilp Game")
      .setTimestamp()
      .setFooter(`Made by ${client.author}`)
      .setDescription(pick);
    await interaction.followUp({ embeds: [embed] });
  },
};
