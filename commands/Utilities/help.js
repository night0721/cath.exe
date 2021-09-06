const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const ms = require("ms");

module.exports = {
  name: "help",
  aliases: ["h"],
  usage: "(Command/Category)",
  description: "Shows all available bot commands",
  category: "Utilities",
  run: async (client, message, args) => {
    const p = await client.prefix(message);
    const emoji = {
      CODM: "<a:AA99_codm_logo:840231960441257995>",
      Config: "<:staff:840231971526803467>",
      Economy: client.currency,
      Fun: "<a:lollll:804325253265621012>",
      Moderation: ":tools:",
      Utilities: ":gear:",
      Music: "<a:music:840231980692144130>",
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
        .setTitle(`**${client.user.username} commands**`)
        .addFields(categories)

        .addField(
          "**Invite Link**",
          `**Invite me to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands)**`
        )
        .addField(
          "**Support Server Invite**",
          "**Join the support server by clicking [here](https://discord.gg/SbQHChmGcp)**"
        )
        .addField(
          "**Premium**",
          "**You can either boost support server or subscribe to developer's team [Ko-fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team **"
        )
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
      return message.reply(
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
      return message.reply(
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
      return message.reply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:AA99_codm_logo:840231960441257995>**CODM Commands**<a:AA99_codm_logo:840231960441257995>"
          )
      );
    } else if (args[0] === "config") {
      const commandList = [];
      readdirSync(`./commands/Config`).forEach(file => {
        const pull = require(`../../commands/Config/${file}`);
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.reply(
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
      return message.reply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(`${client.currency}**Economy Commands**${client.currency}`)
      );
    } else if (args[0] === "fun") {
      const commandList = [];
      readdirSync(`./commands/Fun`).forEach(file => {
        const pull = require(`../../commands/Fun/${file}`);
        if (pull.hidden) return;
        const name = `\`${pull.name}\``;
        commandList.push(name);
      });
      return message.reply(
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
      return message.reply(
        new MessageEmbed()
          .setDescription(commandList.map(data => `${data}`).join(", "))
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setTitle(
            "<a:music:840231980692144130>**Music Commands**<a:music:840231980692144130>"
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
      return message.reply(
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
        if (command.UserPerm && Array.isArray(command.UserPerm)) {
          UserPermissions = command.UserPerm;
        } else UserPermissions = [command.UserPerm ? command.UserPerm : ""];
        if (command.BotPerm && Array.isArray(command.BotPerm)) {
          BotPermissions = command.BotPerm;
        } else BotPermissions = [command.BotPerm ? command.BotPerm : ""];
        const BotPerms = BotPermissions.map(x =>
          x
            .split("_")
            .map(y => y[0] + y.substring(1, y.length).toLowerCase())
            .join(" ")
        ).join(", ");
        const UserPerms = UserPermissions.map(x =>
          x
            .split("_")
            .map(y => y[0] + y.substring(1, y.length).toLowerCase())
            .join(" ")
        ).join(", ");
        const embed = new MessageEmbed()
          .setTitle(`"${command.name}" command details`)
          .addField(
            "**Command**:",
            command.name ? `\`${command.name}\`` : "N/A"
          );
        if (command.aliases) {
          embed.addField("**Aliases**:", `\`${command.aliases.join(", ")}\``);
        }
        if (command.usage) {
          embed.addField(
            "**Usage**:",
            `\`${p}${command.name} ${command.usage}\``
          );
        } else {
          embed.addField("**Usage**:", `\`${p}${command.name}\``);
        }
        if (command.description) {
          embed.addField("**Description**:", command.description);
        }
        if (command.timeout) {
          embed.addField("**Cooldown**:", ms(command.timeout, { long: true }));
        }
        if (command.UserPerm) {
          embed.addField("**Required User Permission**:", UserPerms);
        }
        if (command.BotPerm) {
          embed.addField("**Required Bot Permission**:", BotPerms);
        }
        embed
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color);
        message.reply(embed);
      }
    }
  },
};
