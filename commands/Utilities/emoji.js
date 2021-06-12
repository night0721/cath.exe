const { Client, Message, MessageEmbed, Util } = require("discord.js");
module.exports = {
  name: "emoji",
  aliases: ["se", "stealemoji"],
  usage: "(Emoji)",
  description: "Show an emoji URL",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args.length) return client.err(message, "Utilities", "emoji", 11);
    for (const rawEmoji of args) {
      const parsedEmoji = Util.parseEmoji(rawEmoji);
      if (parsedEmoji.id) {
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${
          parsedEmoji.id + extension
        }`;
        message.channel.send(`Emoji URL:\n${url}`);
      }
    }
  },
};
