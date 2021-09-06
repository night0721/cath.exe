const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "permission",
  usage: "(User)",
  description: "Show user's permission in server/channel",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 6,
      name: "user",
      description: "The use you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args, utils) => {
    const yes = "✔️";
    const no = "❌";
    const x = "```";
    const s = "📛";
    const c = "♨️";

    const permissions = [
      "CREATE_INSTANT_INVITE",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "ADMINISTRATOR",
      "MANAGE_CHANNELS",
      "MANAGE_GUILD",
      "ADD_REACTIONS",
      "VIEW_AUDIT_LOG",
      "PRIORITY_SPEAKER",
      "STREAM",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "VIEW_GUILD_INSIGHTS",
      "CONNECT",
      "SPEAK",
      "STREAM",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "MOVE_MEMBERS",
      "USE_VAD",
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS",
      "MANAGE_EMOJIS_AND_STICKER",
      "USE_VAD",
      "PRIORITY_SPEAKER",
      "REQUEST_TO_SPEAK",
      "MANAGE_THREADS",
      "USE_PUBLIC_THREADS",
      "USE_PRIVATE_THREADS",
      "USE_EXTERNAL_STICKERS",
      "USE_APPLICATION_COMMANDS",
    ];

    let user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    let userId = user.user.id;
    let description = `Server - ${s}\nCurrent channel - ${c}\n\n${s} | ${c}\n`;
    let embed = new MessageEmbed()
      .setTitle(`${user.user.username} Permissions`)
      .setColor(user.displayColor)
      .setURL(client.web);
    permissions.forEach(perm => {
      description += `${user.permissions.has(perm) ? yes : no} | ${
        interaction.channel.permissionsFor(userId).has(perm) ? yes : no
      } - ${perm
        .replace("CREATE_INSTANT_INVITE", "Create Invite")
        .replace("KICK_MEMBERS", "Kick Members")
        .replace("BAN_MEMBERS", "Ban Members")
        .replace("ADMINISTRATOR", "Administrator")
        .replace("MANAGE_CHANNELS", "Manage Channels")
        .replace("MANAGE_GUILD", "Manage Guild")
        .replace("ADD_REACTIONS", "Add Reactions")
        .replace("VIEW_AUDIT_LOG", "View Audit Log")
        .replace("PRIORITY_SPEAKER", "Priority Speaker")
        .replace("STREAM", "Video")
        .replace("VIEW_CHANNEL", "View Channel")
        .replace("SEND_MESSAGES", "Send Messages")
        .replace("SEND_TTS_MESSAGES", "Send TTS Messages")
        .replace("MANAGE_MESSAGES", "Manage Messages")
        .replace("EMBED_LINKS", "Embed Links")
        .replace("ATTACH_FILES", "Attach Files")
        .replace("READ_MESSAGE_HISTORY", "Read Message History")
        .replace("MENTION_EVERYONE", "Mention Everyone")
        .replace("USE_EXTERNAL_EMOJIS", "Use External Emojis")
        .replace("VIEW_GUILD_INSIGHTS", "View Guild Insights")
        .replace("CONNECT", "Connect")
        .replace("SPEAK", "Speak")
        .replace("MUTE_MEMBERS", "Mute Members")
        .replace("DEAFEN_MEMBERS", "Defean Members")
        .replace("MOVE_MEMBERS", "Move Members")
        .replace("USE_VAD", "Use VAD")
        .replace("CHANGE_NICKNAME", "Change Nickname")
        .replace("MANAGE_NICKNAMES", "Manage Nicknames")
        .replace("MANAGE_ROLES", "Manage Roles")
        .replace("MANAGE_WEBHOOKS", "Manage Webhooks")
        .replace("MANAGE_EMOJIS_AND_STICKER", "Manage Emojis and Sticker")
        .replace("MANAGE_THREADS", "Manage Threads")
        .replace("USE_PUBLIC_THREADS", "Use Public Threads")
        .replace("USE_PRIVATE_THREADS", "Use Private Threads")
        .replace("USE_EXTERNAL_STICKERS", "Use External Stickers")
        .replace("USE_APPLICATION_COMMANDS", "Use Application Commands")}\n`;
    });
    embed.setDescription(x + description + x);
    await interaction.followUp({ embeds: [embed] });
  },
};
