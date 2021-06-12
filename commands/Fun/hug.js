const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "hug",
  usage: "(User)",
  description: "Hug someone",
  category: "Fun",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const words = args.slice(1).join(" ");
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return client.err(message, "Fun", "hug", 1);
    }
    if (user.id === message.author.id) {
      return client.err(message, "Fun", "hug", 33);
    }
    const embed = new MessageEmbed();
    embed.setDescription(`${message.author} **hugs** ${user}`);
    if (words) {
      embed.addField("Words:", reason);
    }
    embed.setImage(
      `https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif`
    );
    embed.setColor(client.color);
    message.inlineReply(embed).then(msg => msg.react("💕"));
  },
};
