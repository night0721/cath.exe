const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "getinvite",
  category: "Owner",
  usage: "(Guild)",
  description: "Generates an invitation to the server",
  Owner: true,
  run: async (client, message, args) => {
    let guild = null;
    if (!args[0]) return client.err(message, "Owner", "getinvite", 0);
    if (args[0]) {
      let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
      let found = client.guilds.cache.get(args[0]);
      if (!found) {
        if (fetched) {
          guild = fetched;
        }
      } else {
        guild = found;
      }
    } else {
      return message.reply("Invalid Name/ID!");
    }
    if (guild) {
      let tChannel = guild.channels.cache.find(
        ch =>
          ch.type == "text" &&
          ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE")
      );
      if (!tChannel) {
        return client.err(message, "Owner", "getinvite", 6);
      }
      let invite = await tChannel
        .createInvite({ temporary: false, maxAge: 0 })
        .catch(err => {
          return message.reply(`${err} has occured!`);
        });
      message.reply(invite.url);
    } else {
      return message.reply(`\`${args.join(" ")}\` - Bot is Not in this server`);
    }
  },
};
