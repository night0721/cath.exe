const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "slots",
  usage: "(Number)",
  timeout: 5000,
  description: "Win more coins by slots",
  category: "Economy",
  options: [
    {
      type: 10,
      name: "cp",
      description: "The number of CP you want to bet",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const max = 1000000;
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
    const amt = args[0];
    if (amt > max) return client.serr(interaction, "Economy", "bet", 101);
    if ((await client.bal(interaction.user.id)) < amt) {
      return client.serr(interaction, "Economy", "bet", 20);
    }
    if (
      (slotOne === slotTwo && slotOne === slotThree) ||
      (slotfour === slotfive && slotfour === slotsix) ||
      (slotseven === sloteight && slotseven === slotnine)
    ) {
      const winamt = Math.floor(Math.random() * 2 * amt);
      await client.add(interaction.user.id, winamt, interaction);
      await client.ADDSWin(interaction.user.id);
      const won = new MessageEmbed()
        .setColor("GREEN")
        .setFooter(`Made by ${client.author}`)
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
        .setDescription(
          `You win\n**${winamt + amt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(interaction.user.id)) - amt
          }**${client.currency}`
        );
      interaction.followUp({ embeds: [won] });
    } else {
      await client.rmv(interaction.user.id, amt);
      const lost = new MessageEmbed()
        .setColor("RED")
        .setFooter(`Made by ${client.author}`)
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
        .setDescription(
          `You lost\n**${amt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(interaction.user.id)) - amt
          }**${client.currency}`
        );
      interaction.followUp({ embeds: [lost] });
    }
  },
};
