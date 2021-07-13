const { Client, Message, MessageEmbed } = require("discord.js");
const inventory = require("../../models/econ");
const items = require("../../util/dist/item");
module.exports = {
  name: "purchase",
  aliases: ["buy"],
  usage: "(Item)",
  description: "Buy something from the shop",
  category: "Economy",
  run: async (client, message, args) => {
    if (!args[0]) {
      return client.err(message, "Economy", "buy", 21);
    }
    const itemToBuy = args[0];
    const validItem = !!items.find(
      item => item.alias.toLowerCase() === itemToBuy
    );
    if (!validItem) {
      return client.err(message, "Economy", "buy", 22);
    }
    const itemName = items.find(
      item => item.alias.toLowerCase() === itemToBuy
    ).item;
    const itemPrice = items.find(
      item => item.alias.toLowerCase() === itemToBuy
    ).price;
    if ((await client.bal(message.author.id)) < itemPrice)
      return client.err(message, "Economy", "buy", 20);
    const params = {
      User: message.author.id,
    };
    inventory.findOne(params, async (err, data) => {
      if (data.Inventory) {
        const hasItem = Object.keys(data.Inventory).includes(itemName);
        if (!hasItem) {
          data.Inventory[itemName] = 1;
        } else {
          data.Inventory[itemName]++;
        }
        await inventory.findOneAndUpdate(params, data);
      } else if (data.CP) {
        data.Inventory = {
          [itemName]: 1,
        };
        await inventory.findOneAndUpdate(params, data);
      } else {
        new inventory({
          User: message.author.id,
          Inventory: {
            [itemName]: 1,
          },
        }).save();
      }
      message.inlineReply(
        new MessageEmbed()
          .setTimestamp()
          .setDescription(
            `**${message.author.username}** buys **${itemName}** for **${itemPrice}**${client.currency}`
          )
          .setColor("GREEN")
          .setURL(client.web)
      );
      await client.rmv(message.author.id, itemPrice);
    });
  },
};
