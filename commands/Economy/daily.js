const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "daily",
  description: "Earns daily money",
  category: "Economy",
  timeout: 1000 * 60 * 60 * 24,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var money;
    const user = await client.data.getUser(message.author.id);
    if (user) {
      if (user.Premium == true) {
        money = 20000;
        let pre_embed = new MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dyanmic: true })
          )
          .setDescription(
            `**Here is your daily ${money}${client.currency}!\nThanks for supporting Cath!**`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by Cath Team`)
          .setTimestamp();
        await client.data.add(message.author.id, money);
        return message.inlineReply(pre_embed);
      } else {
        money = 10000;
        let norm_embed = new MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dyanmic: true })
          )
          .setDescription(
            `Here is your daily ${money}${client.currency}!\nBe [premium](https://discord.gg/SbQHChmGcp) user, you can get more coins everyday!`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by Cath Team`)
          .setTimestamp();
        await client.data.add(message.author.id, money);
        return message.inlineReply(norm_embed);
      }
    }
  },
};
