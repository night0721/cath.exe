const { MessageEmbed } = require("discord.js");
const { bool } = require("cath");
module.exports = {
  name: "bet",
  usage: "(Number)",
  timeout: 5000,
  description: "Win double amount of coins or lose all coins",
  category: "Economy",
  options: [
    {
      type: 4,
      name: "cp",
      description: "The number of CP you want to bet",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const max = 100000;
    let amt = args[0];
    if (amt > max) amt = max;
    const winamt = amt * 2;
    if (args[0] < 100) {
      interaction.followUp({
        content: `You need to bet at least 100${client.currency}`,
      });
    } else if ((await client.bal(interaction.user.id)) < amt) {
      interaction.followUp({ content: "You don't have enough balance" });
    } else if (bool()) {
      const multi = (await client.multi(interaction)) / 10 + 1;
      await client.add(interaction.user.id, winamt, interaction);
      await client.ADDBWin(interaction.user.id);
      const abc = new MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTitle(`${interaction.user.username} wins a gamble game`)
        .addFields(
          {
            name: "Won",
            value: `**${Math.round(winamt * multi)}**${client.currency}`,
            inline: true,
          },
          {
            name: "New Balance",
            value: `**${Math.round(
              (await client.bal(interaction.user.id)) + winamt * multi
            )}**${client.currency}`,
            inline: true,
          },
          {
            name: "Multiplier",
            value: `x${2 + multi}`,
            inline: true,
          }
        );
      interaction.followUp({ embeds: [abc] });
    } else {
      await client.rmv(interaction.user.id, amt);
      const cba = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTitle(`${interaction.user.username} loses a gamble game`)
        .addFields(
          {
            name: "Lost",
            value: `**${amt}**${client.currency}`,
            inline: true,
          },
          {
            name: "New Balance",
            value: `**${
              parseInt(await client.bal(interaction.user.id)) - amt
            }**${client.currency}`,
            inline: true,
          }
        );
      interaction.followUp({ embeds: [cba] });
    }
  },
};
