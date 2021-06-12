const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "slots",
  usage: "(Number)",
  timeout: 5000,
  description: "Win more coins by slots",
  category: "Economy",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const max = 1000000;
    const slots = [
      "<:dumbcat:818913965353730068>",
      "<:nicecat:740978278055280722>",
      "<:wah:836951911729987597>",
      "<:startledcat:836619417550061580>",
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
    if ((await client.data.bal(message.author.id)) < amt) {
      return client.err(message, "Economy", "slots", 20);
    }
    if (
      (slotOne === slotTwo && slotOne === slotThree) ||
      (slotfour === slotfive && slotfour === slotsix) ||
      (slotseven === sloteight && slotseven === slotnine)
    ) {
      const winamt = Math.floor(Math.random() * 2 * amt);
      await client.data.add(message.author.id, winamt);
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
            parseInt(await client.data.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.inlineReply(won);
      console.log(`Coins: ${await client.data.bal(message.author.id)}`);
    } else {
      await client.data.rmv(message.author.id, amt);
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
          `You lose\n**${amt}**${client.currency}\nYou now have **${
            parseInt(await client.data.bal(message.author.id)) - amt
          }**${client.currency}`
        );
      message.inlineReply(lost);
      console.log(`Coins: ${await client.data.bal(message.author.id)}`);
    }
  },
};
