const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");
const Utils = require("../../util/functions/function");
module.exports = {
  name: "userinfo",
  description: "Check the info of a user",
  usage: "{User}",
  category: "Information",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Utils} utils
   */
  run: async (client, interaction, args, utils) => {
    const member =
      interaction.guild.members.cache.get(args[0]) || interaction.member;

    const x = Date.now() - member.user.createdAt;
    const y =
      Date.now() - interaction.guild.members.cache.get(member.id).joinedAt;
    const created = Math.floor(x / 86400000);
    const joined = Math.floor(y / 86400000);
    const nickname =
      member.nickname !== undefined && member.nickname !== null
        ? member.nickname
        : "None";
    const roles = member.roles.cache
      .filter(r => r.id != interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
    const createDateFormatted = utils.parseDate(
      new Date(member.user.createdAt)
    );
    const joinDateFormatted = utils.parseDate(new Date(member.joinedAt));
    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true, size: 2048 }),
      })
      .setTimestamp()
      .setColor(member.displayHexColor || client.color)
      .setURL(client.web)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor(member.displayHexColor || client.color)
      .addFields([
        {
          name: "User",
          value: `**❯ Username:** ${member.user.username}
        **❯ Discriminator:** ${member.user.discriminator}
        **❯ Nickname:** ${nickname}
        **❯ User ID:** ${member.id}
        **❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
        })})
        **❯ Time Created:** ${createDateFormatted} \nSince ${created} day(s) ago
        \u200b`,
        },
        {
          name: "Member",
          value: `**❯ Highest Role:** ${
            member.roles.highest.id === interaction.guild.id
              ? "None"
              : member.roles.highest.name
          }
            **❯ Server Join Date:** ${joinDateFormatted} \nSince ${joined} day(s) ago
            **❯ Roles [${roles.length}]:** ${
            roles.length < 10
              ? roles.join(" **|** ")
              : roles.length > 10
              ? utils.trimArray(roles)
              : "None"
          }
            \u200b`,
        },
      ]);
    interaction.followUp({ embeds: [embed] });
  },
};
