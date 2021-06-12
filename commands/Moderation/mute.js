const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "mute",
  description: "Mute an user.",
  usage: "(User) (Time) {Reason}",
  UserPerm: "MANAGE_MESSAGES",
  BotPerm: "MANAGE_ROLES",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let Member = message.mentions.members.first();
    const time = args[1];
    if (!Member) return client.err(message, "Moderation", "mute", 1);
    if (!time) {
      let reason = "No reason provided";
      const role = message.guild.roles.cache.find(x => x.name === "Muted");
      if (!role) {
        try {
          let muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              permissions: [],
            },
          });
          message.guild.channels.cache
            .filter(c => c.type === "text")
            .forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
        } catch (e) {
          console.log(e);
          return client.err(message, "Moderation", "mute", 999);
        }
      }
      let role2 = message.guild.roles.cache.find(x => x.name === "Muted");
      await Member.roles.add(role2);
      const embed = new MessageEmbed()
        .setTitle("User Muted")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", Member.user.tag, true)
        .addField("**Reason**", reason, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.inlineReply(embed);
    }
    if (!ms(time)) {
      let reason = args.slice(1).join(" ") || "No reason provided";
      const role = message.guild.roles.cache.find(x => x.name === "Muted");
      if (!role) {
        try {
          let muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              permissions: [],
            },
          });
          message.guild.channels.cache
            .filter(c => c.type === "text")
            .forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
        } catch (e) {
          console.log(err);
          return client.err(message, "Moderation", "mute", 999);
        }
      }
      let role2 = message.guild.roles.cache.find(x => x.name === "Muted");
      await Member.roles.add(role2);
      const embed = new MessageEmbed()
        .setTitle("User Muted")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", Member.user.tag, true)
        .addField("**Reason**", reason, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.inlineReply(embed);
      setTimeout(async () => {
        await Member.roles.remove(role2);
      }, ms(time));
    } else {
      let reason = args.slice(2).join(" ") || "No reason provided";
      const role = message.guild.roles.cache.find(x => x.name === "Muted");
      if (!role) {
        try {
          let muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              permissions: [],
            },
          });
          message.guild.channels.cache
            .filter(c => c.type === "text")
            .forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
        } catch (e) {
          console.log(e);
          return client.err(message, "Moderation", "mute", 999);
        }
      }
      let role2 = message.guild.roles.cache.find(x => x.name === "Muted");
      await Member.roles.add(role2);
      const embed = new MessageEmbed()
        .setTitle("User Muted")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", Member.user.tag, true)
        .addField("**Time**", ms(ms(time), { long: true }), true)
        .addField("**Reason**", reason, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.inlineReply(embed);
      setTimeout(async () => {
        await Member.roles.remove(role2);
      }, ms(time));
    }
  },
};
