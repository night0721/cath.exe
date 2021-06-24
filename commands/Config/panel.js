const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require("../../models/reaction");

module.exports = {
  name: "panel",
  description: "Reaction-Role Panel",
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.channel;
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return client.err(message, "Config", "panel", 10);
      const mapped = Object.keys(data.Roles)
        .map((value, index) => {
          const role = message.guild.roles.cache.get(data.Roles[value][0]);
          return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`;
        })
        .join("\n\n");
      channel.send(new MessageEmbed().setDescription(mapped)).then(msg => {
        data.Message = msg.id;
        data.save();

        const reactions = Object.values(data.Roles).map(val => val[1].id); // ?? val[1].raw);
        reactions.map(emoji => msg.react(emoji));
      });
    });
  },
};
