module.exports = {
  name: "drop",
  usage: "{Channel} (Number)",
  description: "Drops money to a channel",
  category: "Economy",
  options: [
    {
      type: 7,
      name: "channel",
      description: "The channel you want to drop",
      required: true,
      channelTypes: ["GUILD_TEXT"],
    },
    {
      type: 4,
      name: "cp",
      description: "The amount of CP to drop",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const channel = interaction.guild.channels.cache.get(args[0]);
    const coinsAmount = args[1];
    if (coinsAmount < 100) {
      interaction.followUp({
        content: `You need to drop at least 100 ${client.currency}`,
      });
    } else if ((await client.bal(interaction.user.id)) < coinsAmount) {
      interaction.followUp({ content: "You don't have enough balance" });
    } else {
      const filter = msg =>
        msg.guild.id === interaction.guild.id && msg.content === `claim`;
      interaction.followUp({
        content: "The drop has started in " + channel.toString(),
      });
      channel.send({
        content: `${interaction.user.username} has dropped a ${client.currency} bomb! Type \`claim\` to claim ${client.currency}!!`,
      });
      client.rmv(interaction.user.id, parseInt(coinsAmount));
      channel.awaitMessages({ filter, max: 1, time: 60000 }).then(async msg => {
        const id = msg.first().author.id;
        const coinsToClaim = parseInt(coinsAmount);
        await client.add(id, coinsToClaim, interaction);
        msg.first().reply({
          content: `Congratultions! You have claimed **${coinsToClaim}** ${client.currency}!`,
        });
      });
    }
  },
};
