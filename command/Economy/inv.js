const { MessageEmbed } = require("discord.js");
const inv = require("../../models/econ");
const util = require("../../util/pagination/pagination");
module.exports = {
  name: "inventory",
  description: "Check the inventory of an user",
  usage: "{User}",
  category: "Economy",
  timeout: 5000,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args, data, utils) => {
    const user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    inv.findOne({ User: user.id }, async (err, data) => {
      if (data) {
        if (!data.Inventory)
          return interaction.followUp({
            content: `User doesn't have any data`,
          });
        const mappedData = Object.keys(data.Inventory).map(key => {
          if (data.Inventory[key] == 0) {
            return;
          }
          return `\n**${key}** — ${data.Inventory[key]}`;
        });
        if (mappedData.length == 0) {
          return interaction.followUp({
            content: `User doesn't have any data`,
          });
        }
        const c = util.chunk(mappedData, 5).map(x => x.join("\n"));
        const embed = new MessageEmbed()
          .setTimestamp()
          .setTitle(`${user.displayName}'s inventory`)
          .setColor(client.color)
          .setDescription(c[0])
          .setFooter(`Page 1 of ${c.length}`);
        try {
          const msg = await interaction.followUp({ embeds: [embed] });
          if (mappedData.length > 5)
            await util.pagination(msg, interaction.user, c);
        } catch (e) {
          console.log(e);
        }
      } else
        return interaction.followUp({ content: `User doesn't have any data` });
    });
  },
};
