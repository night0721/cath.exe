const { Client, Message, MessageEmbed } = require("discord.js");
const inv = require("../../models/econ");
const util = require("../../util/pagination/pagination");
module.exports = {
  name: "inventory",
  aliases: ["inv"],
  description: "Check the inventory of an user",
  usage: "{User}",
  category: "Economy",
  timeout: 5000,
  run: async (client, message, args) => {
    const p = await client.prefix(message);
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    inv.findOne({ User: user.id }, async (err, data) => {
      if (data) {
        if (!data.Inventory)
          return client.err(message, "Economy", "inv", 25);
        if (data.Inventory === undefined) return client.err(message, "Economy", "inv", 25)
        const mappedData = Object.keys(data.Inventory).map(key => {
          if (data.Inventory[key] == 0) {
            return;
          }
          return `\n**${key}** — ${data.Inventory[key]}`;
        });

        if (mappedData.length == 0) {
          return client.err(message, "Economy", "inv", 25);
        }
        const c = util.chunk(mappedData, 5).map(x => x.join("\n"));
        const embed = new MessageEmbed()
          .setTimestamp()
          .setTitle(`${user.displayName}'s inventory`)
          .setColor("client.color")
          .setDescription(c[0])
          .setFooter(`Page 1 of ${c.length}`);
        try {
          const msg = await message.channel.send(embed);
          if (mappedData.length > 5)
            await util.pagination(msg, message.author, c);
        } catch (e) {
          console.log(e);
        }
      }
      else return client.err(message, "Economy", "inv", 25);
    });
  }
}