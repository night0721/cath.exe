const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "profile",
  usage: "(User)",
  description: "Check an user economy profile",
  category: "Economy",
  run: async (client, message, args, data, utils) => {
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
    const bjwin = await client.bjWin(message.author.id);
    const swin = await client.sWin(message.author.id);
    const bwin = await client.bWin(message.author.id);
    const cmdused = await client.cmdsUSED(message.author.id);
    const bal = await client.bal(message.author.id);
    const multi = await client.multi(message);
    const game = new MessageEmbed()
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 4096 })
      )
      .setColor("7196ef")
      .setTitle(`${user.displayName}'s profile`)
      .addField(
        "**Stats**\n",
        `🃏 Blackjack wins: \`${bjwin}\`\n` +
          `🎰 Slots wins: \`${swin}\`\n` +
          `🕹 Bet wins: \`${bwin}\`\n` +
          `⌨️Commands used: \`${cmdused}\`\n` +
          `Totalwins: \`${bjwin + swin + bwin}\``,
        true
      )
      .addField(
        "**Balance**\n",
        `💲CP: \`${bal}\`\n` + `➕Multiplier: \`${`1.${multi}x`}\``
      );
    message.reply(game);
  },
};
