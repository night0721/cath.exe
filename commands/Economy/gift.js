const { Client, Message, MessageEmbed } = require("discord.js");
const inventory = require("../../models/econ");
const items = require("../../util/dist/item");
module.exports = {
  name: "gift",
  timeout: 5000,
  usage: "(User) (Item)",
  description: "Gift item to an user",
  category: "Economy",
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return client.err(message, "Economy", "gift", 1);
    if (user.id === message.author.id)
      return client.err(message, "Economy", "gift", 21);
    /*
    const number = args[1];
    if (!number)
      return error(
        message,
        message.author,
        p,
        "gift",
        "(User) **(Number)** (Item)",
        `Missing 'Number' argument`
      );
    if (isNaN(number))
      return error(
        message,
        message.author,
        p,
        "gift",
        "(User) **(Number)** (Item)",
        `'Number' argument must be a number`
      );
      */
    const itemToGift = args[1];
    if (!itemToGift) return client.err(message, "Economy", "gift", 21);
    const validItem = !!items.find(
      item => item.alias.toLowerCase() === itemToGift
    );
    if (!validItem) return client.err(message, "Economy", "gift", 22);
    const itemName = items.find(
      item => item.alias.toLowerCase() === itemToGift
    ).item;
    const params = {
      User: message.author.id,
    };
    const param = {
      User: user.id,
    };
    inventory.findOne(params, async (err, data) => {
      if (data.Inventory) {
        const hasItem = Object.keys(data.Inventory).includes(itemName);
        if (hasItem) {
          if (data.Inventory[itemName] <= 0) {
            return client.err(message, "Economy", "gift", 23);
          } else {
            data.Inventory[itemName]--;
            message.channel.send(
              new MessageEmbed()
                .setColor(client.color)
                .setTimestamp()
                .setDescription(
                  `**${message.author.username}** has given **${user.username}** a **${itemName}**`
                )
            );
            await inventory.findOneAndUpdate(params, data);
          }
        } else return client.err(message, "Economy", "gift", 24);
      } else return client.err(message, "Economy", "gift", 24);
    });
    inventory.findOne(param, async (err, data) => {
      if (data.Inventory) {
        const hasItem = Object.keys(data.Inventory).includes(itemName);
        if (!hasItem) {
          data.Inventory[itemName] = 1;
        } else {
          data.Inventory[itemName]++;
        }
        await inventory.findOneAndUpdate(param, data);
      } else {
        new inventory({
          User: user.id,
          Inventory: {
            [itemName]: 1,
          },
        }).save();
      }
    });
  },
};
