const db = require("../../../models/warns");
const moment = require("moment");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "warn",
  UserPerms: ["MANAGE_MESSAGES"],
  description: "Add/remove/show warnings of an user",
  category: "Moderation",
  options: [
    {
      type: 1,
      name: "add",
      description: "Warn a user",
      options: [
        {
          type: 6,
          name: "user",
          description: "The user you want to warn",
          required: true,
        },
        {
          type: 3,
          name: "reason",
          description: "The reason you want to warn",
          required: false,
        },
      ],
    },
    {
      type: 1,
      name: "list",
      description: "Show a list of warnings of an user",
      options: [
        {
          type: 6,
          name: "user",
          description: "The user to show the list",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "remove",
      description: "Remove a latest warn for an user",
      options: [
        {
          type: 6,
          name: "user",
          description: "The user to remove warn",
          required: true,
        },
        {
          type: 4,
          name: "number",
          description: "The number of warn",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "clear",
      description: "Clear an user's warns",
      options: [
        {
          type: 6,
          name: "user",
          description: "The user to clear warns",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    try {
      if (args[0] == "add") {
        const user = interaction.guild.members.cache.get(args[1]);
        const reason = args[2] || "No reason provided";
        if (user.id === interaction.user.id) {
          interaction.followUp({ content: "You can't warn yourself" });
        }
        if (
          interaction.member.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({ content: "You don't have enough hierarchy" });
        }
        if (
          interaction.guild.me.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({
            content: "Bot doesn't have enough hierarchy",
          });
        }
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
        db.findOne(
          { Guild: interaction.guild.id, User: user.id },
          async (err, data) => {
            if (!data) {
              data = new db({
                Guild: interaction.guild.id,
                User: user.id,
                Warns: [
                  {
                    Reason: reason,
                    Moderator: interaction.user.id,
                    Timestamp: Date.now(),
                  },
                ],
              });
            } else {
              data.Warns.push({
                Reason: reason,
                Moderator: interaction.user.id,
                Timestamp: Date.now(),
              });
            }
            data.save();
          }
        );
        user
          .send({
            content: `You have been warned in **${interaction.guild.name}** for **${reason}**`,
          })
          .catch(e => {});
        const embed = new EmbedBuilder()
          .setTitle("User Warned")
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
      } else if (args[0] == "list") {
        const user = interaction.guild.members.cache.get(args[1]);
        db.findOne(
          { Guild: interaction.guild.id, User: user.id },
          async (err, data) => {
            if (data.Warns.map(e => e).length > 0) {
              interaction.followUp({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                      data.Warns.map(
                        (w, i) =>
                          `\`${i + 1}\` | Moderator: ${
                            interaction.guild.members.cache.get(w.Moderator) ||
                            "Unknown"
                          }\nReason: ${w.Reason}\nDate: ${moment(
                            w.Timestamp
                          ).format("MMMM Do YYYY")}`
                      ).join("\n\n")
                    )
                    .setFooter(
                      `Made by ${client.author}`,
                      client.user.displayAvatarURL()
                    )
                    .setTimestamp()
                    .setColor(client.color),
                ],
              });
            } else {
              interaction.followUp({
                content: `User doesn't have any warns`,
              });
            }
          }
        );
      } else if (args[0] == "remove") {
        const user = interaction.guild.members.cache.get(args[1]);
        if (
          interaction.member.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({ content: "You don't have enough hierarchy" });
        }
        if (
          interaction.guild.me.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({
            content: "Bot doesn't have enough hierarchy",
          });
        }
        db.findOne(
          { Guild: interaction.guild.id, User: user.id },
          async (err, data) => {
            if (err) throw err;
            if (data) {
              const number = args[2] - 1;
              data.Warns.splice(number, 1);
              const embed = new EmbedBuilder()
                .setTitle("Warn Removed")
                .addField("**Moderator**", interaction.user.tag, true)
                .addField("**User**", user.user.tag, true)
                .setFooter(
                  `Made by ${client.author}`,
                  client.user.displayAvatarURL()
                )
                .setTimestamp()
                .setThumbnail(
                  interaction.user.displayAvatarURL({ dynamic: true })
                )
                .setColor(client.color);
              interaction.followUp({ embeds: [embed] });
              data.save();
            } else {
              interaction.followUp({
                content: `User doesn't have any warns`,
              });
            }
          }
        );
      } else {
        const user = interaction.guild.members.cache.get(args[1]);
        if (
          interaction.member.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({ content: "You don't have enough hierarchy" });
        }
        if (
          interaction.guild.me.roles.highest.position <
          user.roles.highest.position
        ) {
          interaction.followUp({
            content: "Bot doesn't have enough hierarchy",
          });
        }
        db.findOne(
          { Guild: interaction.guild.id, User: user.id },
          async (err, data) => {
            if (data) {
              await db.findOneAndDelete({
                Guild: interaction.guild.id,
                User: user.id,
              });
              interaction.followUp({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`Warns Cleared`)
                    .addField("**Moderator**", interaction.user.tag, true)
                    .addField("**User**", user.user.tag, true)
                    .setFooter(
                      `Made by ${client.author}`,
                      client.user.displayAvatarURL()
                    )
                    .setTimestamp()
                    .setThumbnail(
                      interaction.user.displayAvatarURL({ dynamic: true })
                    )
                    .setColor(client.color),
                ],
              });
            } else {
              interaction.followUp({
                content: `User doesn't have any warns`,
              });
            }
          }
        );
      }
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
