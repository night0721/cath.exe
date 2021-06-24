const schema = require("../../models/modmail");

module.exports = {
  name: "modmail-role",
  UserPerm: "ADMINISTRATOR",
  description: "Add role for modmail in a server",
  usage: "(Role)",
  category: "Config",
  run: async (client, message, args) => {
    if (!args.length) return client.err(message, "Config", "modmail-role", 0);
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return client.err(message, "Config", "modmail-role", 404);
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Role = role.id;
        await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
      } else {
        new schema({
          Guild: message.guild.id,
          Role: role.id,
        }).save();
      }
    });
    return message.channel.send(`Updated **${role.name}** as the modmail role`);
  },
};
