const { EmbedBuilder } = require("discord.js");
const inventory = require("../../models/econ");
const items = require("../../util/Data/item.json");
module.exports = {
  name: "buy",
  usage: "(Item)",
  description: "Buy something from the shop",
  category: "Economy",
  options: [
    {
      type: 3,
      name: "item",
      description: "The item to buy",
      required: true,
    },
    {
      type: 4,
      name: "amount",
      description: "The amount to buy",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const itemToBuy = args[0].toLowerCase();
    const validItem = !!items.find(item => item.aliases.includes(itemToBuy));
    const num = args[1];
    if (num < 0) {
      interaction.followUp({
        content: `You need to buy at least 1 item`,
      });
    } else if (!validItem) {
      interaction.followUp({
        content:
          "The item is not valid\nIf you want to get information about the item, use `/shop`",
      });
    } else {
      const itemName = items.find(item =>
        item.aliases.includes(itemToBuy)
      ).name;
      const dbName = items.find(item =>
        item.aliases.includes(itemToBuy)
      ).dbname;
      const itemPrice = items.find(item =>
        item.aliases.includes(itemToBuy)
      ).price;
      const itemEmoji = items.find(item =>
        item.aliases.includes(itemToBuy)
      ).emoji;
      const buyable = items.find(item =>
        item.aliases.includes(itemToBuy)
      ).buyable;
      if ((await client.bal(interaction.user.id)) < itemPrice * num) {
        interaction.followUp({ content: "You don't have enough balance" });
      } else if (!buyable) {
        interaction.followUp({ content: `That item isn't buyable` });
      } else {
        const params = { User: interaction.user.id };
        inventory.findOne(params, async (err, data) => {
          if (data) {
            const hasItem = Object.keys(data.Inventory).includes(dbName);
            if (!hasItem) {
              data.Inventory[dbName] += num;
            } else {
              data.Inventory[dbName] += num;
            }
            await inventory.findOneAndUpdate(params, data);
          } else {
            new inventory({
              User: interaction.user.id,
              Inventory: {
                [dbName]: num,
              },
            }).save();
          }
        });
        interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTimestamp()
              .setDescription(
                `**${
                  interaction.user.username
                }** buys ** ${num} ${itemEmoji}${itemName}** for **${
                  itemPrice * num
                }**${client.currency}`
              )
              .setColor("GREEN")
              .setURL(client.web)
              .setAuthor(
                interaction.user.tag,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setFooter({
                text: `Made by ${client.author}`,
                iconURL: client.user.displayAvatarURL(),
              }),
          ],
        });
        await client.rmv(interaction.user.id, itemPrice * num);
      }
    }
  },
};
