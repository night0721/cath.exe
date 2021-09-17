const { MessageEmbed } = require("discord.js");
const util = require("../../util/pagination/pagination");
const items = require("../../util/dist/item");
module.exports = {
  name: "shop",
  description: "Check the items from the shop",
  category: "Economy",
  run: async (client, interaction, args) => {
    const list = items.map((value, index) => {
      return `**${value.item}** — ${value.price.toLocaleString()}${
        client.currency
      }\nID: \`${value.id}\``;
    });
    const c = util.chunk(list, 5).map(x => x.join("\n\n"));
    const embed = new MessageEmbed()
      .setTitle("**cath.exe shop**")
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
  },
};
