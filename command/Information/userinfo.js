const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

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

  run: async (client, interaction, args, utils) => {
    const member =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const flags = {
      DISCORD_EMPLOYEE: "Discord Staff<:staff:840231971526803467>",
      PARTNERED_SERVER_OWNER:
        "Partnered Server Owner<:partner:840231939944480829>",
      BUGHUNTER_LEVEL_1: "Discord Bug Hunter<:bughunter:840231967600803920>",
      BUGHUNTER_LEVEL_2: "Discord Bug Hunter<:bughunterlv2:840231970017771571>",
      HYPESQUAD_EVENTS: "HypeSquad Events<:HypeSquad:840231908599922721>",
      HOUSE_BRAVERY: "HypeSquad Bravery<:bravery:840231941974655007>",
      HOUSE_BRILLIANCE: "HypeSquad Brilliance<:brilliance:840231943764443136>",
      HOUSE_BALANCE: "HypeSquad Balance<:balance:840231925876523018>",
      EARLY_SUPPORTER: "Early Supporter<:earlysupporter:840231983216984085>",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot<:VerifiedBot:840231982054375425>",
      EARLY_VERIFIED_BOT_DEVELOPER:
        "Early Verified Bot Developer<:discord_bot_dev:840231906200387666>",
      DISCORD_CERTIFIED_MODERATOR: "Discord Certified Moderator",
    };
    // let status;
    // switch (member.presence.status) {
    //   case "online":
    //     status = "<:online:840231921123721237>Online";
    //     break;
    //   case "dnd":
    //     status = "<:do_not_disturb:840231907715448842>Do Not Disturb";
    //     break;
    //   case "idle":
    //     status = "<:idle:840231935485149184>Idle";
    //     break;
    //   case "offline":
    //     status = "<:offline:840231954897305620>Offline";
    //     break;
    // }
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
    const userFlags = member.user.flags.toArray();
    const createdate = moment(member.user.createdAt).format(
      "dddd, MMMM Do YYYY, HH:mm:ss"
    );
    const joindate = moment(member.joinedAt).format(
      "dddd, MMMM Do YYYY, HH:mm:ss"
    );
    // let activities;
    // if (member.presence.activities[0] && member.presence.activities[1]) {
    //   activities = member.presence.activities[1].name;
    // } else if (
    //   member.presence.activities[0] &&
    //   !member.presence.activities[1]
    // ) {
    //   activities = "None";
    // } else activities = "None";
    const embed = new EmbedBuilder()
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ dynamic: true, size: 2048 })
      )
      .setTimestamp()
      .setColor(member.displayHexColor || client.color)
      .setURL(client.web)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor(member.displayHexColor || client.color)
      .addField(
        "User",
        `**❯ Username:** ${member.user.username}
        **❯ Discriminator:** ${member.user.discriminator}
        **❯ Nickname:** ${nickname}
        **❯ User ID:** ${member.id}
        **❯ Badge:** ${
          userFlags.length
            ? userFlags.map(flag => flags[flag]).join(" **|** ")
            : "None"
        }
        **❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
        })})
        **❯ Time Created:** ${createdate} \nSince ${created} day(s) ago
        \u200b`
      ) //* *❯ Status:** ${status}* *❯ Game:** ${activities}
      .addField(
        "Member",
        `**❯ Highest Role:** ${
          member.roles.highest.id === interaction.guild.id
            ? "None"
            : member.roles.highest.name
        }
          **❯ Server Join Date:** ${joindate} \nSince ${joined} day(s) ago
          **❯ Roles [${roles.length}]:** ${
          roles.length < 10
            ? roles.join(" **|** ")
            : roles.length > 10
            ? utils.trimArray(roles)
            : "None"
        }
          \u200b`
      );
    interaction.followUp({ embeds: [embed] });
  },
};
