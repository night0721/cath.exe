const { MessageEmbed } = require("discord.js");
const { Pagination } = require("cath");
const items = require("../../util/Data/item.json");
module.exports = {
  name: "shop",
  description: "Check the items from the shop",
  category: "Economy",
  options: [
    {
      type: 3,
      name: "item",
      description: "The item you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args, utils, data) => {
    if (!args[0]) {
      const util = new Pagination();
      const list = items.map(value => {
        return `**${value.emoji} ${
          value.name
        } — [${value.price.toLocaleString()} ${
          client.currency
        }](https://www.youtube.com/watch?v=YSKDu1gKntY)**\n\`Aliases:\` **${value.aliases.join(
          ", "
        )}**\n\`Type:\` **${value.type}**`;
      });
      const c = util.chunk(list, 5).map(x => x.join("\n\n"));
      const embed = new MessageEmbed()
        .setTitle("**NYX Shop**")
        .setTimestamp()
        .setDescription(c[0])
        .setColor(client.color)
        .setFooter(`Page 1 of ${c.length}`);
      try {
        const msg = await interaction.followUp({ embeds: [embed] });
        if (list.length > 5) await util.pagination(msg, interaction.user, c);
      } catch (e) {
        console.log(e);
      }
    } else {
      const itemToSearch = args[0].toLowerCase();
      const validItem = !!items.find(item =>
        item.aliases.includes(itemToSearch)
      );
      if (!validItem) {
        interaction.followUp({
          content:
            "The item is not valid\nIf you want to get information about the item, use `/shop`",
        });
      } else {
        const theitem = items.find(i => i.aliases.includes(itemToSearch));
        const all = new MessageEmbed()
          .setTitle(`${theitem.emoji} ${theitem.name}`)
          .setDescription(
            `
            **Owns** - ${
              data.UserEcon.Inventory?.[theitem.dbname]
                ? data.UserEcon.Inventory?.[theitem.dbname]
                : 0
            }
            **Cost Price** - ${client.currency} ${theitem.price}\n
            **Sell Price** - ${client.currency} ${
              theitem.sellable ? theitem.sell : "Unable to sell"
            }\n
            **Aliases** - \`${theitem.aliases.join(", ")}\`\n\n`
          )
          .setColor(client.color)
          .setFooter(
            `Made by ${client.author}`,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();
        interaction.followUp({ embeds: [all] });
      }
    }
  },
};
