const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "userinfo",
  aliases: ["whois"],
  description: "Check the info of a user",
  usage: "{User}",
  category: "Utilities",
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const flags = {
      DISCORD_EMPLOYEE: "Discord Staff<:staff:840231971526803467>",
      DISCORD_PARTNER: "Partnered Server Owner<:partner:840231939944480829>",
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
      VERIFIED_DEVELOPER:
        "Early Verified Bot Developer<:discord_bot_dev:840231906200387666>",
    };
    let status;
    switch (member.user.presence.status) {
      case "online":
        status = "<:online:840231921123721237>Online";
        break;
      case "dnd":
        status = "<:do_not_disturb:840231907715448842>Do Not Disturb";
        break;
      case "idle":
        status = "<:idle:840231935485149184>Idle";
        break;
      case "offline":
        status = "<:offline:840231954897305620>Offline";
        break;
    }
    let x = Date.now() - member.user.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    let created = Math.floor(x / 86400000);
    let joined = Math.floor(y / 86400000);
    const members = message.guild.member(member);
    let nickname =
      members.nickname !== undefined && members.nickname !== null
        ? members.nickname
        : "None";
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
    const userFlags = member.user.flags.toArray();
    let createdate = moment
      .utc(member.user.createdAt)
      .format("dddd, MMMM Do YYYY, HH:mm:ss");
    let joindate = moment
      .utc(member.joinedAt)
      .format("dddd, MMMM Do YYYY, HH:mm:ss");

    const infoembed = new MessageEmbed()
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ dynamic: true, size: 2048 })
      )
      .setTimestamp()
      .setColor(client.color)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor(member.displayHexColor || "BLUE")
      .addField("User", [
        `**❯ Username:** ${member.user.username}`,
        `**❯ Discriminator:** ${member.user.discriminator}`,
        `**❯ Nickname:** ${nickname}`,
        `**❯ ID:** ${member.id}`,
        `**❯ Flags:** ${
          userFlags.length
            ? userFlags.map(flag => flags[flag]).join(" **|** ")
            : "None"
        }`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
        })})`,
        `**❯ Time Created:** ${createdate} \nsince ${created} day(s) ago`,
        `**❯ Status:** ${status}`,
        `**❯ Game:** ${
          member.presence.activities[0]
            ? member.presence.activities[0].name
            : "None"
        }`,
        `\u200b`,
      ])
      .addField("Member", [
        `**❯ Highest Role:** ${
          member.roles.highest.id === message.guild.id
            ? "None"
            : member.roles.highest.name
        }`,
        `**❯ Server Join Date:** ${joindate} \nsince ${joined} day(s) ago`,
        //`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(" **|** ") : roles.length > 10 ? roles.join(" **|** ") : "None"}`,

        `\u200b`,
      ]);
    message.inlineReply(infoembed);
  },
};
