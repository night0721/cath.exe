const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "give",
  aliases: ["share"],
  timeout: 5000,
  usage: "(User) (Number)",
  description: "Give money to an user",
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
    if (!user) return client.err(message, "Economy", "give", 1);
    const parsed = parseInt(args[1]);
    if (!args[1]) return client.err(message, "Economy", "give", 5);

    if (args[1].toLowerCase() === "all" && isNaN(parsed)) {
      await client.add(user.id, await client.bal(message.author.id), message);
      user
        .send(
          `**${message.author.tag}** gave you **${(
            await client.bal(message.author.id)
          ).toLocaleString()}**${client.currency} in **${message.guild.name}**`
        )
        .catch(e => {
          console.log(e);
        });
      await client.rmv(message.author.id, await client.bal(message.author.id));
      message.reply(
        `**${message.author.username}** gave **${user.username}** **${(
          await client.bal(message.author.id)
        ).toLocaleString()}**${client.currency}, you now have **0**${
          client.currency
        } and they have **${(await client.bal(user.id)).toLocaleString()}**${
          client.currency
        }`
      );
    } else if (args[1].toLowerCase() === "half" && isNaN(parsed)) {
      await client.add(
        user.id,
        Math.round((await client.bal(message.author.id)) / 2),
        message
      );
      user
        .send(
          `**${message.author.tag}** gave you **${(
            await client.bal(message.author.id)
          ).toLocaleString()}**${client.currency} in **${message.guild.name}**`
        )
        .catch(e => {
          console.log(e);
        });
      await client.rmv(
        message.author.id,
        Math.round((await client.bal(message.author.id)) / 2)
      );
      message.reply(
        `**${message.author.username}** gave **${user.username}** **${(
          (await client.bal(message.author.bal)) / 2
        ).toLocaleString()}**${client.currency}, you now have **${(
          (await client.bal(message.author.id)) -
          (await client.bal(message.author.bal)) / 2
        ).toLocaleString()}**${client.currency} and they have **${(
          (await client.bal(user.id)) +
          (await client.bal(message.author.bal)) / 2
        ).toLocaleString()}**${client.currency}`
      );
    } else if (
      isNaN(parsed) &&
      !["all", "half"].includes(args[1].toLowerCase())
    ) {
      return client.err(message, "Economy", "give", 101);
    } else {
      if (user.id === message.author.id)
        return client.err(message, "Economy", "give", 2);
      if (parsed > (await client.bal(message.author.id))) {
        return client.err(message, "Economy", "give", 20);
      }
      await client.rmv(message.author.id, parsed);
      await client.add(user.id, parsed, message);
      message.reply(
        `**${message.author.username}** gave **${
          user.username
        }** **${parsed.toLocaleString()}** coins, you now have **${(
          (await client.bal(message.author.id)) - parsed
        ).toLocaleString()}**${client.currency} and they have **${(
          (await client.bal(user.id)) + parsed
        ).toLocaleString()}**${client.currency}`
      );
      user
        .send(
          `**${
            message.author.tag
          }** gave you **${parsed.toLocaleString()}** coins in **${
            message.guild.name
          }**`
        )
        .catch(e => {
          console.log(e);
        });
    }
  },
};
