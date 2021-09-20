const Discord = require("discord.js");
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
      Moderation: "🔨",
      Utilities: "⚙",
      Music: "<a:music:840231980692144130>",
      Giveaway: "<a:DankCat:798963811902160896>",
      Information: "ℹ",
    };
    if (!args[0]) {
      const directories = [
        ...new Set(client.commands.map(cmd => cmd.directory)),
      ];
      const categories = directories.map(dir => {
        if (dir == "Owner") return;
        const getCmds = client.commands
          .filter(c => c.directory == dir)
          .map(cmd => {
            return {
              name: cmd.name || "No command name",
            };
          });
        return {
          directory: dir,
          commands: getCmds,
        };
      });
      const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} commands**`)
        .setDescription(`Please choose a category in the dropdown menu`)
        .setColor(client.color)
        .setTimestamp()
        .setAuthor(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
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
        );
      const components = state => [
        new Discord.MessageActionRow().addComponents(
          new Discord.MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder(`Please select a category`)
            .setDisabled(state)
            .addOptions(
              categories.map(cmd => {
                return {
                  label: cmd.directory,
                  value: cmd.directory,
                  description: `Commands from ${cmd.directory} category`,
                  emoji: emoji[cmd.directory] || null,
                };
              })
            )
        ),
      ];

      const msg = await message.channel.send({
        embeds: [embed],
        components: components(false),
      });
      const filter = m => m.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        time: 60000,
      });
      collector.on("collect", async interaction => {
        const [directory] = interaction.values;
        const category = categories.find(u => u.directory === directory);
        const newembed = new Discord.MessageEmbed()
          .setTitle(
            `${emoji[directory]}${directory} Commands${emoji[directory]}`
          )
          .setAuthor(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Please use /help (Command Name) for more details`)
          .setDescription(
            category.commands
              .map(cmd => {
                return [`\`${cmd.name}\``];
              })
              .join(", ")
          );
        interaction.reply({ embeds: [newembed] });
      });
      collector.on("end", () => msg.edit({ components: components(true) }));
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          c => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        message.channel.send({
          content: `There isn't any command named "${args[0]}"`,
        });
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
        const embed = new Discord.MessageEmbed()
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
          embed.addField(
            "**Cooldown**:",
            utils.ms(command.timeout, { long: true })
          );
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
        message.reply({ embeds: [embed] });
      }
    }
  },
};
