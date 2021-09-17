const { Client, Message, MessageEmbed, Util } = require("discord.js");
const Schema = require("../../models/reaction");
module.exports = {
  name: "rr-add",
  UserPerm: "ADMINISTRATOR",
  description: "Create reaction role for server",
  usage: "(Role) (emoji(Must be in server)",
  category: "Config",
  run: async (client, message, args) => {
    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(r => r.name == args[0]);
    let [, emoji] = args;
    if (!emoji) return client.err(message, "Config", "rr-add", 11);
    const parsedEmoji = Util.parseEmoji(emoji);
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Roles[parsedEmoji.name] = [
          role.id,
          {
            id: parsedEmoji.id,
            raw: emoji,
          },
        ];
        await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
      } else {
        new Schema({
          Guild: message.guild.id,
          Message: 0,
          Roles: {
            [parsedEmoji.name]: [
              role.id,
              {
                id: parsedEmoji.id,
                raw: emoji,
              },
            ],
          },
        }).save();
      }
      message.channel.send(`Added ${role.name}.`);
    });
  },
};
