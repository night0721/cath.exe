const { MessageEmbed } = require("discord.js");
const block = "⬛";
const heart = "🟥";

module.exports = {
  name: "ship",
  description: "Ship an user to an user",
  usage: "(User) (User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "1stuser",
      description: "The user you want to ship",
      required: true,
    },
    {
      type: 6,
      name: "2nduser",
      description: "The user you want to ship",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user1 = interaction.guild.members.cache.get(args[0]).user.username;
    const user2 = interaction.guild.members.cache.get(args[1]).user.username;
    const loveEmbed = new MessageEmbed()
      .setColor("dd2e44")
      .setFooter(`Shipped by ${interaction.user.tag}`)
      .setTimestamp()
      .setTitle(`💘 | Shipping ${user1} and ${user2} | 💘`)
      .setDescription(`🔻 | ${user1} \n${ship()}\n🔺 | ${user2}`);
    interaction.followUp({ embeds: [loveEmbed] });
  },
};
function ship() {
  const hearts = Math.floor(Math.random() * 100);
  const hearte = hearts / 10;
  const str = `${heart.repeat(hearte)}${block.repeat(10 - hearte)} ${hearts}%`;
  return str;
}
