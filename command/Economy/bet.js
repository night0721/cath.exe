const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "gamble",
  usage: "(Number)",
  timeout: 5000,
  description: "Win double amount of coins or lose all coins",
  category: "Economy",
  options: [
    {
      type: 10,
      name: "cp",
      description: "The number of CP you want to bet",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils, data) => {
    const max = 1000000;
    const amt = args[0];
    if ((await client.bal(interaction.user.id)) < amt) {
      return client.serr(interaction, "Economy", "bet", 20);
    }
    if (amt > max) {
      return client.serr(interaction, "Economy", "bet", 101);
    }
    if (utils.toBool() === true) {
      const winamt = amt * 1;
      await client.add(interaction.user.id, winamt, interaction);
      await client.ADDBWin(interaction.user.id);
      const abc = new MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setTitle(`${interaction.user.username} wins a gamble game`)
        .setDescription(
          `You win\n**${winamt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(interaction.user.id)) + amt
          }**${client.currency}`
        );
      await interaction.followUp({ embeds: [abc] });
    } else {
      await client.rmv(interaction.user.id, amt);
      const cba = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setTitle(`${interaction.user.username} loses a gamble game`)
        .setDescription(
          `You lost\n**${amt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(interaction.user.id)) - amt
          }**${client.currency}`
        );
      await interaction.followUp({ embeds: [cba] });
    }
  },
};
