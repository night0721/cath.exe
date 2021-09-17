const schema = require("../../models/guilds");
const prefix = require("../../config.json").prefix;
module.exports = {
  name: "prefix-reset",
  aliases: ["pr"],
  description: 'Reset the prefix to "C." at the server',
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  run: async (client, message, args, utils) => {
    message.channel
      .send({ content: "**Do you want to reset your prefix?**" })
      .then(async msg => {
        const emoji = await utils.confirmation(
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
          message.channel.send({
            content: `The prefix has been reset to **${prefix}**`,
          });
        }
        if (emoji === "❌") {
          msg.delete();
          message.channel.send({ content: "Cancelled." });
        }
      });
  },
};
