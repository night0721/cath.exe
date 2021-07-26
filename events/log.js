// const Discord = require("discord.js");
// const Guild = require("../models/guilds");
// const client = require("../bot");
// let types = {
//   text: "Text Channel",
//   voice: "Voice Channel",
//   null: "No Type",
//   news: "News Channel",
//   store: "Store Channel",
//   category: "Category",
// };
// client.on("channelCreate", async channel => {
//   send_log(
//     client,
//     channel.guild,
//     "GREEN",
//     "Channel Created",
//     `Channel Name: \`${channel.name}\`\nChannel ID: \`${
//       channel.id
//     }\`\nChannel Type: \`${types[channel.type]}\`\nChannel Position: \`${
//       channel.rawPosition
//     }\``
//   );
// });
// client.on("channelDelete", async channel => {
//   send_log(
//     client,
//     channel.guild,
//     "RED",
//     "Channel Deleted",
//     `Channel Name: \`${channel.name}\`\nChannel ID: \`${
//       channel.id
//     }\`\nChannel Type: \`${types[channel.type]}\`\nChannel Position: \`${
//       channel.rawPosition
//     }\``
//   );
// });
// client.on("channelPinsUpdate", async (channel, time) => {
//   send_log(
//     client,
//     channel.guild,
//     "YELLOW",
//     "Channel Pins Update",
//     `Channel Name: \`${channel.name}\`\nChannel ID: \`${
//       channel.id
//     }\`\nPinned at \`${time.toLocaleString()}\``,
//     "https://i.stack.imgur.com/d1JEp.png"
//   );
// });
// client.on("channelUpdate", function (oldChannel, newChannel) {
//   let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";
//   let guildChannel = newChannel.guild;
//   if (!guildChannel || !guildChannel.available) return;
//   if (oldChannel.name != newChannel.name) {
//     send_log(
//       client,
//       oldChannel.guild,
//       "YELLOW",
//       "Channel Updated - Name",
//       `Channel Name: \`${oldChannel.name}\`\nChannel Id: \`${oldChannel.id}\`\n\n` +
//         `Channel Name: \`${newChannel.name}\`\nChannel Id: \`${newChannel.id}\``
//     );
//   } else if (oldChannel.type != newChannel.type) {
//     send_log(
//       client,
//       oldChannel.guild,
//       "YELLOW",
//       "Channel Updated - Type",
//       `Channel Name: \`${oldChannel.name}\`\nChannel Id: \`${
//         oldChannel.id
//       }\`\nChannelTYPE: \`${types[oldChannel.type]}\`\n\n` +
//         `Channel Name: \`${newChannel.name}\`\nChannel Id: \`${
//           newChannel.id
//         }\`\nChannelTYPE: \`${types[newChannel.type]}\``
//     );
//   } else if (oldChannel.topic != newChannel.topic) {
//     send_log(
//       client,
//       oldChannel.guild,
//       "YELLOW",
//       "Channel UPDATED - TOPIC",
//       `Channel Name: \`${oldChannel.name}\`\nChannel Id: \`${oldChannel.id}\`\nChannelTOPIC: \`${oldChannel.topic}\`\n\n` +
//         `Channel Name: \`${newChannel.name}\`\nChannel Id: \`${newChannel.id}\`\nChannelTOPIC: \`${newChannel.topic}\``
//     );
//   }
// });
// client.on("emojiCreate", function (emoji) {
//   send_log(
//     client,
//     emoji.guild,
//     "GREEN",
//     "EMOJI CREATED",
//     `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`
//   );
// });
// client.on("emojiDelete", function (emoji) {
//   send_log(
//     client,
//     emoji.guild,
//     "RED",
//     "EMOJI DELETED",
//     `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`
//   );
// });

// client.on("emojiUpdate", function (oldEmoji, newEmoji) {
//   if (oldEmoji.name !== newEmoji.name) {
//     send_log(
//       client,
//       oldEmoji.guild,
//       "ORANGE",
//       "EMOJI NAME CHANGED",
//       `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``
//     );
//   }
// });

// client.on("guildBanAdd", function (guild, user) {
//   send_log(
//     client,
//     guild,
//     "RED",
//     "USER BANNED",
//     `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
//     user.user.displayAvatarURL({ dynamic: true })
//   );
// });

// client.on("guildBanRemove", function (guild, user) {
//   send_log(
//     client,
//     guild,
//     "YELLOW",
//     "USER UNBANNED",
//     `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
//     user.user.displayAvatarURL({ dynamic: true })
//   );
// });

// client.on("guildMemberAdd", function (member) {
//   send_log(
//     member.guild,
//     client,
//     "GREEN",
//     "MEMBER JOINED",
//     `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
//     member.user.displayAvatarURL({ dynamic: true })
//   );
// });

// client.on("guildMemberRemove", function (member) {
//   send_log(
//     client,
//     member.guild,
//     "RED",
//     "MEMBER LEFT",
//     `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
//     member.user.displayAvatarURL({ dynamic: true })
//   );
// });

// client.on("guildMembersChunk", function (members, guild) {
//   send_log(
//     guild,
//     client,
//     "RED",
//     "MEMBER CHUNK / RAID - " + members.length + " Members",
//     members.map(
//       (user, index) => `${index}) - ${user} - ${user.tag} - \`${user.id}\``
//     )
//   );
// });

// client.on("guildMemberUpdate", function (oldMember, newMember) {
//   let options = {};

//   if (options[newMember.guild.id]) {
//     options = options[newMember.guild.id];
//   }

//   // Add default empty list
//   if (typeof options.excludedroles === "undefined")
//     options.excludedroles = new Array([]);
//   if (typeof options.trackroles === "undefined") options.trackroles = true;
//   const oldMemberRoles = oldMember.roles.cache.keyArray();
//   const newMemberRoles = newMember.roles.cache.keyArray();
//   const oldRoles = oldMemberRoles
//     .filter(x => !options.excludedroles.includes(x))
//     .filter(x => !newMemberRoles.includes(x));
//   const newRoles = newMemberRoles
//     .filter(x => !options.excludedroles.includes(x))
//     .filter(x => !oldMemberRoles.includes(x));
//   const rolechanged = newRoles.length || oldRoles.length;

//   if (rolechanged) {
//     let roleadded = "";
//     if (newRoles.length > 0) {
//       for (let i = 0; i < newRoles.length; i++) {
//         if (i > 0) roleadded += ", ";
//         roleadded += `<@&${newRoles[i]}>`;
//       }
//     }
//     let roleremoved = "";
//     if (oldRoles.length > 0) {
//       for (let i = 0; i < oldRoles.length; i++) {
//         if (i > 0) roleremoved += ", ";
//         roleremoved += `<@&${oldRoles[i]}>`;
//       }
//     }
//     let text = `${roleremoved ? `❌ ROLE REMOVED: \n${roleremoved}` : ""}${
//       roleadded ? `✅ ROLE ADDED:\n${roleadded}` : ""
//     }`;
//     send_log(
//       client,
//       oldMember.guild,
//       `${roleadded ? "GREEN" : "RED"}`,
//       "Member Roles Changed",
//       `Member: ${newMember.user}\nUser: \`${oldMember.user.tag}\`\n\n${text}`
//     );
//   }
// });

// client.on("messageDelete", function (message) {
//   if (message.channel.type !== "text") return;

//   send_log(
//     client,
//     message.guild,
//     "ORANGE",
//     "Message Deleted",
//     `
// **Author : ** <@${message.author.id}> - *${message.author.tag}*
// **Date : ** ${message.createdAt}
// **Channel : ** <#${message.channel.id}> - *${message.channel.name}*
// **Deleted Message : **
// \`\`\`
// ${message.content.replace(/`/g, "'")}
// \`\`\`
// **Attachment URL : **
// ${message.attachments.map(x => x.proxyURL)}
// `
//   );
// });

// client.on("messageDeleteBulk", function (message) {
//   send_log(
//     client,
//     message.guild,
//     "RED",
//     message.length + "  Message Deleted BULK",
//     `${message.length} Messages delete in: ${message.channel}`
//   );
// });

// client.on("messageUpdate", function (oldMessage, newMessage) {
//   if (oldMessage.author.bot) return;
//   if (oldMessage.channel.type !== "text") return;
//   if (newMessage.channel.type !== "text") return;

//   if (oldMessage.content === newMessage.content) return;
//   send_log(
//     client,
//     oldMessage.guild,
//     "YELLOW",
//     "Message Updated",
//     `
// **Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
// **Date : ** ${newMessage.createdAt}
// **Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*
// **Orignal Message : **
// \`\`\`
// ${oldMessage.content.replace(/`/g, "'")}
// \`\`\`
// **Updated Message : **
// \`\`\`
// ${newMessage.content.replace(/`/g, "'")}
// \`\`\``
//   );
// });

// client.on("roleCreate", function (role) {
//   send_log(
//     client,
//     role.guild,
//     "GREEN",
//     "ROLE CREATED"`ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`
//   );
// });

// client.on("roleDelete", function (role) {
//   send_log(
//     client,
//     role.guild,
//     "RED",
//     "ROLE DELETED"`ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`
//   );
// });

// client.on("roleUpdate", function (oldRole, newRole) {
//   let perms = {
//     1: "CREATE_INSTANT_INVITE",
//     2: "KICK_MEMBERS",
//     4: "BAN_MEMBERS",
//     8: "ADMINISTRATOR",
//     16: "MANAGE_CHANNELS",
//     32: "MANAGE_GUILD",
//     64: "ADD_REACTIONS",
//     128: "VIEW_AUDIT_LOG",
//     256: "PRIORITY_SPEAKER",
//     1024: "VIEW_CHANNEL",
//     1024: "READ_MESSAGES",
//     2048: "SEND_MESSAGES",
//     4096: "SEND_TTS_MESSAGES",
//     8192: "MANAGE_MESSAGES",
//     16384: "EMBED_LINKS",
//     32768: "ATTACH_FILES",
//     65536: "READ_MESSAGE_HISTORY",
//     131072: "MENTION_EVERYONE",
//     262144: "EXTERNAL_EMOJIS",
//     262144: "USE_EXTERNAL_EMOJIS",
//     1048576: "CONNECT",
//     2097152: "SPEAK",
//     4194304: "MUTE_MEMBERS",
//     8388608: "DEAFEN_MEMBERS",
//     16777216: "MOVE_MEMBERS",
//     33554432: "USE_VAD",
//     67108864: "CHANGE_NICKNAME",
//     134217728: "MANAGE_NICKNAMES",
//     268435456: "MANAGE_ROLES",
//     268435456: "MANAGE_ROLES_OR_PERMISSIONS",
//     536870912: "MANAGE_WEBHOOKS",
//     "1073741824 ": "MANAGE_EMOJIS",
//     CREATE_INSTANT_INVITE: "CREATE_INSTANT_INVITE",
//     KICK_MEMBERS: "KICK_MEMBERS",
//     BAN_MEMBERS: "BAN_MEMBERS",
//     ADMINISTRATOR: "ADMINISTRATOR",
//     MANAGE_CHANNELS: "MANAGE_CHANNELS",
//     MANAGE_GUILD: "MANAGE_GUILD",
//     ADD_REACTIONS: "ADD_REACTIONS",
//     VIEW_AUDIT_LOG: "VIEW_AUDIT_LOG",
//     PRIORITY_SPEAKER: "PRIORITY_SPEAKER",
//     VIEW_CHANNEL: "VIEW_CHANNEL",
//     READ_MESSAGES: "READ_MESSAGES",
//     SEND_MESSAGES: "SEND_MESSAGES",
//     SEND_TTS_MESSAGES: "SEND_TTS_MESSAGES",
//     MANAGE_MESSAGES: "MANAGE_MESSAGES",
//     EMBED_LINKS: "EMBED_LINKS",
//     ATTACH_FILES: "ATTACH_FILES",
//     READ_MESSAGE_HISTORY: "READ_MESSAGE_HISTORY",
//     MENTION_EVERYONE: "MENTION_EVERYONE",
//     EXTERNAL_EMOJIS: "EXTERNAL_EMOJIS",
//     USE_EXTERNAL_EMOJIS: "USE_EXTERNAL_EMOJIS",
//     CONNECT: "CONNECT",
//     SPEAK: "SPEAK",
//     MUTE_MEMBERS: "MUTE_MEMBERS",
//     DEAFEN_MEMBERS: "DEAFEN_MEMBERS",
//     MOVE_MEMBERS: "MOVE_MEMBERS",
//     USE_VAD: "USE_VAD",
//     CHANGE_NICKNAME: "CHANGE_NICKNAME",
//     MANAGE_NICKNAMES: "MANAGE_NICKNAMES",
//     MANAGE_ROLES: "MANAGE_ROLES",
//     MANAGE_ROLES_OR_PERMISSIONS: "MANAGE_ROLES_OR_PERMISSIONS",
//     MANAGE_WEBHOOKS: "MANAGE_WEBHOOKS",
//     MANAGE_EMOJIS: "MANAGE_EMOJIS",
//   };
//   if (oldRole.name !== newRole.name) {
//     send_log(
//       client,
//       oldRole.guild,
//       "ORANGE",
//       "ROLE NAME CHANGED",
//       `__ROLE: ${oldRole}__ \n\n**Before:** \`${oldRole.name}\`
//         **After:** \`${newRole.name}\`
//         **Role ID:** \`${newRole.id}\``
//     );
//   } else if (oldRole.color !== newRole.color) {
//     send_log(
//       client,
//       oldRole.guild,
//       "ORANGE",
//       "ROLE COLOR CHANGED",
//       `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`
//           **After:** \`${newRole.color.toString(16)}\`
//           **ROLE ID:** \`${newRole.id}\``
//     );
//   } else {
//     send_log(
//       client,
//       oldRole.guild,
//       "RED",
//       "ROLE PERMISSIONS CHANGED",
//       `__ROLE: ${newRole}__ \n**THE PERMISSIONS CHANGED PLEASE CHECK!!!**OLD PERMISSIONS: ${oldRole.permissions.bitfield}
//       NEW PERMISSIONS: ${newRole.permissions.bitfield}
// **Role ID:** \`${newRole.id}\``
//     );
//   }
// });

// client.on("userUpdate", async (oldUser, newUser) => {
//   if (oldUser.username !== newUser.username) {
//     send_log(
//       client,
//       oldUser.guild,
//       "BLACK",
//       "Member Username Changed",
//       `Member: ${newUser}\nOld Username: \`${oldUser.username}\`\nNew Username: \`${newUser.username}\` `
//     );
//   }
// });
// async function send_log(client, guild, color, title, description, thumb) {
//   try {
//     const LogEmbed = new Discord.MessageEmbed()
//       .setColor(color ? color : client.color)
//       .setDescription(description ? description.substr(0, 2048) : "\u200b")
//       .setTitle(title ? title.substr(0, 256) : "\u200b")
//       .setTimestamp()
//       .setThumbnail(
//         thumb ? thumb : client.user.displayAvatarURL({ format: "png" })
//       )
//       .setFooter(
//         "Made by Cath Team",
//         client.user.displayAvatarURL({ format: "png" })
//       );
//     const db = await Guild.findOne({ Guild: guild.id }, (err, guild) => {
//       if (err) throw err;
//     });
//     if (!db) return;
//     const ch = db.Log;
//     const logger = await client.channels.fetch(ch);
//     if (!logger) throw new Error("Error 404 - Channel Not Found");
//     try {
//       const hook = new Discord.WebhookClient(
//         db.LogWebhookID,
//         db.LogWebhookToken
//       );
//       hook.send({
//         username: guild.name,
//         avatarURL: client.user.displayAvatarURL({ format: "png" }),
//         embeds: [LogEmbed],
//       });
//     } catch {
//       return;
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }