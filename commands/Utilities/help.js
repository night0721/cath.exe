const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { ca } = require("../../config.json");
const ms = require("ms");
require("../../inlinereply");

module.exports = {
  name: "help",
  aliases: ["h"],
  usage: "(Command/Category)",
  description: "Shows all available bot commands",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const p = await client.prefix(message);
    const emoji = {
      CODM: "<a:AA99_codm_logo:821348295045283880>",
      Config: "<:staff:829718501224480788>",
      Economy: client.currency,
      Fun: "<a:lollll:804325253265621012>",
      Moderation: ":tools:",
      Utilities: ":gear:",
      Music: "<a:music:824231520993935370>",
      Giveaway: "<a:DankCat:798963811902160896>",
    };
    if (!args[0]) {
      let categories = [];
      readdirSync("./commands/").forEach(dir => {
        const category = ["Owner"];
        if (category.includes(dir)) return;
        const edited = `${emoji[dir]} ${dir}`;
        let data = new Object();
        data = {
          name: edited,
          value: `\`${p}help ${dir.toLowerCase()}\``,
          inline: true,
        };
        categories.push(data);
      });
      const embed = new MessageEmbed()
        .setTitle("**cath.exe commands**")
        .addFields(categories)
        .setDescription(`Links:${ca}`)
        .setURL(client.web)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(client.color);
      return message.channel.send(embed);
    } else if (args[0] === "moderation") {
      const commandList = [];
      readdirSync(`./commands/Moderation`).forEach(file => {
        const pull = require(`../../commands/Moderation/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(":tools:**Moderation Commands**:tools:")
      );
    } else if (args[0] === "utilities") {
      const commandList = [];
      readdirSync(`./commands/Utilities`).forEach(file => {
        const pull = require(`../../commands/Utilities/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(":gear:**Utiltiies Commands**:gear:")
      );
    } else if (args[0] === "codm") {
      const commandList = [];
      readdirSync(`./commands/CODM`).forEach(file => {
        const command = readdirSync(`./commands/CODM`);
        const pull = require(`../../commands/CODM/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:AA99_codm_logo:821348295045283880>**CODM Commands**<a:AA99_codm_logo:821348295045283880>"
          )
      );
    } else if (args[0] === "config") {
      const commandList = [];
      readdirSync(`./commands/Config`).forEach(file => {
        const pull = require(`../../commands/Config/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<:staff:829718501224480788>**Config Commands**<:staff:829718501224480788>"
          )
      );
    } else if (args[0] === "economy") {
      const commandList = [];
      readdirSync(`./commands/Economy`).forEach(file => {
        const pull = require(`../../commands/Economy/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:BigManRich:815137721084674048>**Economy Commands**<a:BigManRich:815137721084674048>"
          )
      );
    } else if (args[0] === "fun") {
      const commandList = [];
      readdirSync(`./commands/Fun`).forEach(file => {
        const pull = require(`../../commands/Fun/${file}`);
        if (pull.hidden) return;
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:lollll:804325253265621012>**Fun Commands**<a:lollll:804325253265621012>"
          )
      );
    } else if (args[0] === "music") {
      const commandList = [];
      readdirSync(`./commands/Music`).forEach(file => {
        const pull = require(`../../commands/Music/${file}`);
        if (pull.hidden) return;
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:music:824231520993935370>**Music Commands**<a:music:824231520993935370>"
          )
      );
    } else if (args[0] === "giveaway") {
      const commandList = [];
      readdirSync(`./commands/Giveaway`).forEach(file => {
        const pull = require(`../../commands/Giveaway/${file}`);
        if (pull.hidden) return;
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.inlineReply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:DankCat:798963811902160896>**Giveaway Commands**<a:DankCat:798963811902160896>"
          )
      );
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          c => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        message.channel.send(
          `There isn't any command or category named "${args[0]}"`
        );
      } else {
        let BotPerm;
        let UserPerm;
        const UserPermissions = [command.UserPerm ? command.UserPerm : ""];
        const BotPermissions = [command.BotPerm ? command.BotPerm : ""];
        BotPermissions.forEach(perm => {
          if (BotPermissions.includes(command.BotPerm))
            BotPerm = `${perm
              .replace("CREATE_INSTANT_INVITE", "Create Invite")
              .replace("KICK_MEMBERS", "Kick Members")
              .replace("BAN_MEMBERS", "Ban Members")
              .replace("ADMINISTRATOR", "Administrator")
              .replace("MANAGE_CHANNELS", "Manage Channels")
              .replace("MANAGE_GUILD", "Manage Guild")
              .replace("ADD_REACTIONS", "Add Reactions")
              .replace("VIEW_AUDIT_LOG", "View Audit Log")
              .replace("PRIORITY_SPEAKER", "Priority Speaker")
              .replace("STREAM", "Stream")
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
              .replace("MANAGE_EMOJIS", "Manage Emojis")}\n`;
        });
        UserPermissions.forEach(perm => {
          if (UserPermissions.includes(command.UserPerm))
            UserPerm = `${perm
              .replace("CREATE_INSTANT_INVITE", "Create Invite")
              .replace("KICK_MEMBERS", "Kick Members")
              .replace("BAN_MEMBERS", "Ban Members")
              .replace("ADMINISTRATOR", "Administrator")
              .replace("MANAGE_CHANNELS", "Manage Channels")
              .replace("MANAGE_GUILD", "Manage Guild")
              .replace("ADD_REACTIONS", "Add Reactions")
              .replace("VIEW_AUDIT_LOG", "View Audit Log")
              .replace("PRIORITY_SPEAKER", "Priority Speaker")
              .replace("STREAM", "Stream")
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
              .replace("MANAGE_EMOJIS", "Manage Emojis")}\n`;
        });
        const embed = new MessageEmbed()
          .setTitle(`"${command.name}" command details`)
          .addField(
            "**Command**:",
            command.name ? `\`${command.name}\`` : "N/A"
          )
          .addField(
            "**Aliases**:",
            command.aliases ? `\`${command.aliases.join(", ")}\`` : "N/A"
          )
          .addField(
            "**Usage**:",
            command.usage
              ? `\`${p}${command.name} ${command.usage}\``
              : `\`${p}${command.name}\``
          )
          .addField(
            "**Description**:",
            command.description ? command.description : "N/A"
          )
          .addField(
            "**Cooldown**:",
            command.timeout ? ms(command.timeout, { long: true }) : "N/A"
          )
          .addField(
            "**Required User Permission**:",
            UserPerm ? UserPerm : "N/A"
          )
          .addField("**Required Bot Permission**:", BotPerm ? BotPerm : "N/A")
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color);
        message.inlineReply(embed);
      }
    }
  },
};
