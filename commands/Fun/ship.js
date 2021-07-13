const block = "⬛";
const heart = "🟥";
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ship",
  aliases: ["love", "loverate", "shipping"],
  description: "Ship to you an user",
  usage: "(Text) (Text)",
  category: "Fun",
  run: async (client, message, args) => {
    const msg = await message.channel.send("Shipping...");
    const user1 = args[0];
    const user2 = args[1];
    if (!user1) return client.err(message, "Fun", "ship", 12);
    if (!user2) return client.err(message, "Fun", "ship", 12);
    let loveEmbed = new MessageEmbed()
      .setColor("dd2e44")
      .setFooter(`Shipped by ${message.author.tag}`)
      .setTimestamp()
      .setTitle(`💘 | Shipping ${user1} and ${user2} | 💘`)
      .setDescription(`🔻 | ${user1} \n${ship()}\n🔺 | ${user2}`);
    msg.edit("", loveEmbed);
  },
};
function ship() {
  const hearts = Math.floor(Math.random() * 100);
  const hearte = hearts / 10;
  const str = `${heart.repeat(hearte)}${block.repeat(10 - hearte)} ${hearts}%`;
  return str;
}
