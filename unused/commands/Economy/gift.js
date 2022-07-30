const { MessageEmbed } = require("discord.js");
const inventory = require("../../models/econ");
const items = require("../../util/Data/item.json");
module.exports = {
  name: "gift",
  timeout: 5000,
  usage: "(User) (Item)",
  description: "Gift item to an user",
  category: "Economy",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to gift",
      required: true,
    },
    {
      type: 3,
      name: "item",
      description: "The item to gift",
      required: true,
    },
    {
      type: 4,
      name: "amount",
      description: "The amount to gift",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.guild.members.cache.get(args[0]);
    if (user.id === interaction.user.id) {
      interaction.followUp({ content: "You can't gift yourself items" });
    }
    const itemToGift = args[1].toLowerCase();
    const number = args[2];
    const validItem = !!items.find(item => item.aliases.includes(itemToGift));
    if (number < 0) {
      interaction.followUp({
        content: `You need to gift at least 1 item`,
      });
    } else if (!validItem) {
      interaction.followUp({
        content:
          "The item is not valid\nIf you want to get information about the item, use `/shop`",
      });
    } else {
      const params = {
        User: interaction.user.id,
      };
      const param = {
        User: user.id,
      };
      const itemName = items.find(item =>
        item.aliases.includes(itemToGift)
      ).name;
      const dbName = items.find(item =>
        item.aliases.includes(itemToGift)
      ).dbname;
      const itemEmoji = items.find(item =>
        item.aliases.includes(itemToGift)
      ).emoji;
      inventory.findOne(params, async (err, data) => {
        if (data.Inventory) {
          const hasItem = Object.keys(data.Inventory).includes(dbName);
          if (hasItem) {
            if (data.Inventory[dbName] <= number) {
              interaction.followUp({
                content: `You don't have enough items to gift`,
              });
            } else {
              data.Inventory[dbName] -= number;
              interaction.followUp({
                embeds: [
                  new MessageEmbed()
                    .setColor(client.color)
                    .setAuthor(
                      interaction.user.tag,
                      interaction.user.displayAvatarURL({ dynamic: true })
                    )
                    .setFooter(
                      `Made by ${client.author}`,
                      client.user.displayAvatarURL()
                    )
                    .setTimestamp()
                    .setDescription(
                      `**${interaction.user.username}** has given **${
                        user.user.username
                      } ${number.toLocaleString()} ${itemEmoji}${itemName}**`
                    ),
                ],
              });
              user
                .send({
                  content: `**${
                    interaction.user.tag
                  }** has given you **${number.toLocaleString()} ${itemEmoji}${itemName}** in **${
                    interaction.guild.name
                  }**`,
                })
                .catch(e => {});
              await inventory.findOneAndUpdate(params, data);
            }
          } else {
            interaction.followUp({
              content: `You don't have enough items to gift`,
            });
          }
        } else {
          interaction.followUp({
            content: `You don't have enough items to gift`,
          });
        }
      });
      inventory.findOne(param, async (err, data) => {
        if (data?.Inventory) {
          const hasItem = Object.keys(data.Inventory).includes(dbName);
          if (!hasItem) {
            data.Inventory[dbName] += number;
          } else {
            data.Inventory[dbName] += number;
          }
          await inventory.findOneAndUpdate(param, data);
        } else {
          new inventory({
            User: user.id,
            CP: 0,
            Inventory: {
              [dbName]: number,
            },
          }).save();
        }
      });
    }
  },
};
