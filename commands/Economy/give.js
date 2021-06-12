const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "give",
  aliases: ["share"],
  timeout: 5000,
  usage: "(User) (Number)",
  description: "Give money to an user",
  category: "Economy",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return client.err(message, "Economy", "give", 1);
    const parsed = parseInt(args[1]);
    if (!args[1]) return client.err(message, "Economy", "give", 5);
    if (isNaN(parsed)) return client.err(message, "Economy", "give", 7);
    if (user.id === message.author.id)
      return client.err(message, "Economy", "give", 2);
    if (parsed > (await client.data.bal(message.author.id))) {
      return client.err(message, "Economy", "give", 20);
    }
    await client.data.rmv(message.author.id, parsed);
    await client.data.add(user.id, parsed);
    message.channel.send(
      new MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setDescription(
          `**${message.author.username}** has given **${
            user.username
          }** **${parsed.toLocaleString()}**${client.currrency}`
        )
    );
  },
};
