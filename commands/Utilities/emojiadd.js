const { Client, Message, MessageEmbed, Util } = require("discord.js");
module.exports = {
  name: "emojiadd",
  usage: "(Link/Photo) (Name)",
  aliases: ["addemoji"],
  description: "Show an emoji URL or add the emoji to the server",
  category: "Utilities",
  run: async (client, message, args) => {
    if (!args.length) return client.err(message, "Utilities", "emojiadd", 0);

    if (message.attachments) {
      message.attachments.map(m => {
        if (
          m.name.endsWith(".png") ||
          m.name.endsWith(".jpeg") ||
          m.name.endsWith(".jpeg") ||
          m.name.endsWith(".gif") ||
          m.name.endsWith(".webp")
        ) {
          try {
            if (message.attachments.map(u => u.size) > 256000)
              return client.err(message, "Utilities", "emojiadd", 50);
            if (args[0].length < 2 || args[0].match(/\W/))
              return client.err(message, "Utilities", "emojiadd", 49);
            message.attachments.map(u => {
              try {
                message.guild.emojis.create(u.url, args[0]).then(msg => {
                  const em = message.guild.emojis.cache.find(
                    a => a.name == args[0]
                  );
                  message.reply(`Added <:${em.name}:${em.id}> to the server`);
                });
              } catch (e) {
                console.log(e);
                return client.err(message, "Utilities", "emojiadd", 999);
              }
            });
          } catch (e) {
            console.log(e);
            return client.err(message, "Utilities", "emojiadd", 999);
          }
        } else return client.err(message, "Utilities", "emojiadd", 48);
      });
    }
    if (args[0].includes("https")) {
      try {
        if (args[1].length < 2 || args[1].match(/\W/))
          return client.err(message, "Utilities", "emojiadd", 49);
        message.guild.emojis.create(args[0], args[1]).then(msg => {
          const em = message.guild.emojis.cache.find(a => a.name == args[1]);
          message.reply(`Added <:${em.name}:${em.id}> to the server`);
        });
      } catch (e) {
        console.log(e);
        return client.err(message, "Utilities", "emojiadd", 999);
      }
    } else return client.err(message, "Utilities", "emojiadd", 101);
  },
};
