const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "afk",
  description: "Tell someone you are AFK.",
  usage: "{Status}",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let uuser = message.guild.members.cache.get(message.author.id);
    const content = args.join(" ") || "No status provided.";
    uuser.setNickname(`[AFK]${message.author.username}`);
    await client.data.AFK(message.author.id, content);
    const embed = new MessageEmbed()
      .setDescription(
        `${message.author.username} is set into AFK.\nStatus : ${content}`
      )
      .setTimestamp()
      .setFooter(`Made by Cath Team`)
      .setColor(client.color)
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setURL(client.web);
    message.channel.send(embed);
  },
};
