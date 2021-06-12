const schema = require("../../models/guilds");
const prefix = require("../../config.json").prefix;
const { confirmation } = require("@reconlx/discord.js");
module.exports = {
  name: "prefix-reset",
  aliases: ["pr"],
  description: 'Reset the prefix to "C." at the server',
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message) => {
    message.channel
      .send("**Do you want to reset your prefix?**")
      .then(async msg => {
        const emoji = await confirmation(
          msg,
          message.author,
          ["✅", "❌"],
          10000
        );
        if (emoji === "✅") {
          msg.delete();
          schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
              data.Prefix = prefix;
              await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            }
          });
          message.channel.send(`The prefix has been reset to **${prefix}**`);
        }
        if (emoji === "❌") {
          msg.delete();
          message.channel.send("Cancelled.");
        }
      });
  },
};
