const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "slots",
  usage: "(Number)",
  timeout: 5000,
  description: "Win more coins by slots",
  category: "Economy",
  options: [
    {
      type: 4,
      name: "cp",
      description: "The number of CP you want to slots",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const max = 100000;
    const slots = [
      "<:blushca:852174555513618502>",
      "<:abusecat:853501068074942464>",
      "<:dumbcat:855462498550415362>",
    ];
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    const slotfour = slots[Math.floor(Math.random() * slots.length)];
    const slotfive = slots[Math.floor(Math.random() * slots.length)];
    const slotsix = slots[Math.floor(Math.random() * slots.length)];
    const slotseven = slots[Math.floor(Math.random() * slots.length)];
    const sloteight = slots[Math.floor(Math.random() * slots.length)];
    const slotnine = slots[Math.floor(Math.random() * slots.length)];
    const ar = [1.3, 1.5, 1.7, 1.9, 2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5];
    const r = ar[Math.floor(Math.random() * ar.length)];
    let amt = args[0];
    if (amt > max) amt = max;
    if (amt < 100) {
      interaction.followUp({
        content: `You need to slot at least 100${client.currency}`,
      });
    } else if ((await client.bal(interaction.user.id)) < amt) {
      interaction.followUp({ content: "You don't have enough balance" });
    } else if (
      (slotOne === slotTwo && slotOne === slotThree) ||
      (slotfour === slotfive && slotfour === slotsix) ||
      (slotseven === sloteight && slotseven === slotnine)
    ) {
      const winamt = Math.round(r * amt);
      const multi = (await client.multi(interaction)) / 10 + 1;
      await client.add(interaction.user.id, winamt, interaction);
      await client.ADDSWin(interaction.user.id);
      const won = new MessageEmbed()
        .setColor("GREEN")
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .addField(
          "|-----|-----|----|",
          `|  ${slotfour} | ${slotfive} | ${slotsix}  |`
        )
        .addField(
          "|-----|-----|----|",
          `|  ${slotOne} | ${slotTwo} | ${slotThree}  |`
        )
        .addField(
          "|-----|-----|----|",
          `|  ${slotseven} | ${sloteight} | ${slotnine}  |`
        )
        .setTitle(`${interaction.user.username} wins a slots game`)
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
            value: `x${r + multi}`,
            inline: true,
          }
        );
      interaction.followUp({ embeds: [won] });
    } else {
      await client.rmv(interaction.user.id, amt);
      const lost = new MessageEmbed()
        .setColor("RED")
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .addField(
          "|-----|-----|----|",
          `|  ${slotfour} | ${slotfive} | ${slotsix}  |`
        )
        .addField(
          "|-----|-----|----|",
          `|  ${slotOne} | ${slotTwo} | ${slotThree}  |`
        )
        .addField(
          "|-----|-----|----|",
          `|  ${slotseven} | ${sloteight} | ${slotnine}  |`
        )
        .setTitle(`${interaction.user.username} loses a slots game`)
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
      interaction.followUp({ embeds: [lost] });
    }
  },
};
