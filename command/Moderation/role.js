const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "role",
  UserPerms: ["MANAGE_ROLES"],
  BotPerms: ["MANAGE_ROLES"],
  usage: "(Role) (User)",
  description: "Add/Remove a role for an user",
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The person you want to add/remove role",
      required: true,
    },
    {
      type: 8,
      name: "role",
      description: "The role you want to add/remove",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      const target = interaction.guild.members.cache.get(args[0]);
      const role = interaction.guild.roles.cache.get(args[1]);
      if (role.managed) {
        interaction.followUp({ content: "You must provide a non bot role" });
      } else if (target.roles.cache.has(role.id)) {
        const embed = new MessageEmbed()
          .setTitle("Role Removed")
          .addField("**Moderator**", interaction.user.tag, true)
          .addField("**User**", target.user.tag, true)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.color);
        interaction
          .followUp({ embeds: [embed] })
          .then(await target.roles.remove(role.id));
      } else {
        const embed = new MessageEmbed()
          .setTitle("Role Added")
          .addField("**Moderator**", interaction.user.tag, true)
          .addField("**User**", target.user.tag, true)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.color);
        interaction
          .followUp({ embeds: [embed] })
          .then(await target.roles.add(role.id));
      }
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
