const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "profile",
  usage: "(User)",
  description: "Check an user economy profile",

  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const bjwin = await client.bjWin(user.user.id);
    const swin = await client.sWin(user.user.id);
    const bwin = await client.bWin(user.user.id);
    const cmdused = await client.cmdsUSED(user.user.id);
    const bal = await client.bal(user.user.id);
    const multi = await client.multi(interaction);
    const game = new EmbedBuilder()
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("7196ef")
      .setTitle(`${user.displayName}'s profile`)
      .setDescription(`Current Balance ${bal} ${client.currency}`)
      .setURL(client.web)
      .addFields(
        {
          name: "Basic",
          value: `
          Total Commands Used \`${cmdused}\`\n
          ${client.xp} Multiplier \`${`1.${multi}x`}\``,
          inline: true,
        },
        {
          name: "🎊 Wins",
          value: `Overall ❯ \`${bjwin + swin + bwin}\`
          🃏 Blackjack ❯ \`${bjwin}\`\n
          🎰 Slots ❯ \`${swin}\`\n
          🕹 Bets ❯ \`${bwin}\`\n`,
          inline: true,
        }
      );
    interaction.followUp({ embeds: [game] });
  },
};
