const { Client, Message, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "migrate",
  usage: "(Server ID)",
  description: "Migrate all emojis from a server",
  category: "Config",
  run: async (client, message, args) => {
    try {
      const oldGuild = args[0];
      if (!oldGuild) return;
      old = client.guilds.cache.get(oldGuild);
      if (!old) return client.err(message, "Config", "migrate", 404);
      await old.emojis.cache.map(async e => {
        await message.guild.emojis.create(e.url, e.name);
      });
      return message.channel.send(`Created Emotes.`);
    } catch (e) {
      console.log(e);
    }
  },
};
