const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "balance",
  aliases: ["bal"],
  usage: "(User)",
  category: "Economy",
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const bal = await client.bal(user.id);
    let embed = new MessageEmbed()
      .addField(`${client.currency} Balance`, `**${bal}**`)
      .setColor(client.color)
      .setURL(client.web)
      .setTitle(`${user.displayName}'s Balance`)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`);
    message.inlineReply(embed);
  },
};
