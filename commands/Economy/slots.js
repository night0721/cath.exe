const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "slots",
  usage: "(Number)",
  timeout: 5000,
  description: "Win more coins by slots",
  category: "Economy",
  run: async (client, message, args) => {
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
    if (!args[0]) return client.err(message, "Economy", "slots", 5);
    if (isNaN(args[0])) return client.err(message, "Economy", "slots", 7);
    const amt = parseInt(args[0]);
    if (amt > max) return client.err(message, "Economy", "slots", 101);
    if ((await client.bal(message.author.id)) < amt) {
      return client.err(message, "Economy", "slots", 20);
    }
    if (
      (slotOne === slotTwo && slotOne === slotThree) ||
      (slotfour === slotfive && slotfour === slotsix) ||
      (slotseven === sloteight && slotseven === slotnine)
    ) {
      const winamt = Math.floor(Math.random() * 2 * amt);
      await client.add(message.author.id, winamt, message);
      await client.ADDSWin(message.author.id);
      const won = new MessageEmbed()
        .setColor("GREEN")
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
        .setTitle(`${message.author.username} wins a slots game`)
        .setDescription(
          `You win\n**${winamt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.reply(won);
    } else {
      await client.rmv(message.author.id, amt);
      const lost = new MessageEmbed()
        .setColor("RED")
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
        .setTitle(`${message.author.username} loses a slots game`)
        .setDescription(
          `You lost\n**${amt}**${client.currency}\nYou now have **${
            parseInt(await client.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.reply(lost);
    }
  },
};
