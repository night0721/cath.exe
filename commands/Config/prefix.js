const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/guilds");
module.exports = {
  name: "prefix",
  usage: "(Prefix)",
  description: "Set the prefix at the server",
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  run: async (client, message, args) => {
    const res = args.join(" ");
    if (!res) return client.err(message, "Config", "prefix", 46);
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        schema.findOne({ Guild: message.guild.id }, async (err, data) => {
          data.Prefix = res;
          await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
        });
        message.channel.send(`Your prefix has been updated to **${res}**`);
      } else {
        data = new schema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send(
          `Custom prefix in this server is now set to **${res}**`
        );
      }
    });
  },
};
