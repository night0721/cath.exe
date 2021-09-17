const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "profile",
  usage: "(User)",
  description: "Check an user economy profile",
  type: "CHAT_INPUT",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args, data, utils) => {
    const user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const bjwin = await client.bjWin(user.user.id);
    const swin = await client.sWin(user.user.id);
    const bwin = await client.bWin(user.user.id);
    const cmdused = await client.cmdsUSED(user.user.id);
    const bal = await client.bal(user.user.id);
    const multi = await client.multi(interaction);
    const game = new MessageEmbed()
      .setFooter(
        `Requested by ${user.user.tag}`,
        user.user.displayAvatarURL({ dynamic: true, size: 4096 })
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
    await interaction.followUp({ embeds: [game] });
  },
};
