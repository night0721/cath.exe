const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "mute",
  description: "Mute an user.",
  usage: "(User) (Time) {Reason}",
  UserPerms: ["MANAGE_MESSAGES"],
  BotPerms: ["MANAGE_ROLES"],
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to mute",
      required: true,
    },
    {
      type: 3,
      name: "reason",
      description: "The reason you want to mute",
      required: true,
    },
    {
      type: 3,
      name: "time",
      description: "The time you want to mute",
      required: false,
    },
  ],
  run: async (client, interaction, args, utils, data) => {
    try {
      const user = interaction.guild.members.cache.get(args[0]);
      const reason = args[1];
      const time = args[2] || "gg";
      const mutedrole = interaction.guild.roles.cache.get(data.Guild.Muterole);
      if (user.id === interaction.user.id) {
        interaction.followUp({ content: "You can't mute yourself" });
      }
      if (
        interaction.member.roles.highest.position < user.roles.highest.position
      ) {
        interaction.followUp({ content: "You don't have enough hierarchy" });
      }
      if (
        interaction.guild.me.roles.highest.position <
        user.roles.highest.position
      ) {
        interaction.followUp({ content: "Bot doesn't have enough hierarchy" });
      }
      if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
      if (!utils.ms(time)) {
        if (!mutedrole) {
          const newrole = await interaction.guild.roles.create({
            name: "Muted",
            reason: "For muted people",
            permissions: [],
          });
          await client.data.setMuterole(interaction.guild.id, newrole.id);
          interaction.guild.channels.cache
            .filter(c => c.type === "GUILD_TEXT")
            .forEach(async channel => {
              await channel.permissionOverwrites.create(newrole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
        } else {
          await user.roles.add(mutedrole.id);
          const embed = new EmbedBuilder()
            .setTitle("User Muted")
            .addField("**Moderator**", interaction.user.tag, true)
            .addField("**User**", user.user.tag, true)
            .addField("**Reason**", reason, true)
            .setFooter({
              text: `Made by ${client.author}`,
              iconURL: client.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color);
          interaction.followUp({ embeds: [embed] });
        }
      } else if (!mutedrole) {
        const newrole = await interaction.guild.roles.create({
          name: "Muted",
          reason: "For muted people",
          permissions: [],
        });
        await client.data.setMuterole(interaction.guild.id, newrole.id);
        interaction.guild.channels.cache
          .filter(c => c.type === "GUILD_TEXT")
          .forEach(async channel => {
            await channel.permissionOverwrites.create(newrole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
      } else {
        await user.roles.add(mutedrole.id);
        const embed = new EmbedBuilder()
          .setTitle("User Muted")
          .addField("**Moderator**", interaction.user.tag, true)
          .addField("**User**", user.user.tag, true)
          .addField("**Time**", utils.ms(utils.ms(time), { long: true }), true)
          .addField("**Reason**", reason, true)
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.color);
        interaction.followUp({ embeds: [embed] });
        setTimeout(async () => {
          await user.roles.remove(mutedrole.id);
        }, utils.ms(time));
      }
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
