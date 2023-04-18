const Discord = require("discord.js");
module.exports = {
  name: "help",
  usage: "(Command/Category)",
  description: "Shows all available bot commands",
  category: "Information",
  options: [
    {
      type: 3,
      name: "command",
      description: "The command you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args, utils) => {
    if (!args[0]) {
      await interaction.deleteReply();
      const emoji = {
        CODM: "<a:codm:897030768793104385>",
        Config: "<a:config:896990033561669762>",
        Economy: client.currency,
        Fun: "<a:fun:896889821816053790>",
        Moderation: "<:discordmod:897364105730617364>",
        Information: "<a:information:894962394932064346>",
        Utilities: "<a:utilites:897233087941988392>",
        Music: "<a:music:897017864085712936>",
        Giveaway: "<a:confetti:896763534682226758>",
        NSFW: "🍑",
      };
      const directories = [
        ...new Set(client.slashCommands.map(cmd => cmd.directory)),
      ];
      const categories = directories.map(dir => {
        if (dir == "Owner") return;
        const getCmds = client.slashCommands
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
        .setTitle(`**NYX's Commands**`)
        .setDescription(`Please choose a category in the dropdown menu`)
        .setColor(client.color)
        .setTimestamp()
        .addFields(
          {
            name: ":link: **Invite Me**",
            value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands)`,
            inline: true,
          },
          {
            name: "<:support1:867093614403256350> **Need Help ?**",
            value: `[Support Server](https://discord.gg/SbQHChmGcp)`,
            inline: true,
          },
          {
            name: "<:YouTube:841186450497339412> **Video Guide**",
            value: `[How to use Slash Coammands](https://youtu.be/YSKDu1gKntY)`,
            inline: true,
          },
          {
            name: `<:nyx_description:897379659665264650> Documentation`,
            value: `[Click here](${client.docs})`,
            inline: true,
          },
          {
            name: "<a:booster:896527475063025704> **Premium**",
            value: `You can either boost support server or subscribe to developer's team [Ko-Fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team.`,
            inline: false,
          }
        )
        .setURL(client.docs)
        .setThumbnail(
          "https://media.discordapp.net/attachments/896078559293104128/896392631565828146/nyx_logo_transparent.webp"
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
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

      const msg = await interaction.channel.send({
        embeds: [embed],
        components: components(false),
      });
      const filter = m => m.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        time: 60000,
      });
      collector.on("collect", async interaction => {
        const [directory] = interaction.values;
        const category = categories.find(u => u.directory === directory);
        const newembed = new Discord.MessageEmbed()
          .setTitle(
            `${emoji[directory]} ${directory} Commands ${emoji[directory]}`
          )
          .setTimestamp()
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
      const command = client.slashCommands.get(args[0].toLowerCase());
      if (!command) {
        interaction.followUp({
          content: `There isn't any command or category named "${args[0]}"`,
        });
      } else {
        if (command.UserPerms && Array.isArray(command.UserPerms)) {
          UserPermissions = command.UserPerms;
        } else {
          UserPermissions = [command.UserPerms ? command.UserPerms : ""];
        }
        if (command.BotPerms && Array.isArray(command.BotPerms)) {
          BotPermissions = command.BotPerms;
        } else {
          BotPermissions = [command.BotPerms ? command.BotPerms : ""];
        }
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
        if (command.usage) {
          embed.addField("**Usage**:", `\`/${command.name} ${command.usage}\``);
        } else {
          embed.addField("**Usage**:", `\`/${command.name}\``);
        }
        if (command.description) {
          embed.addField("**Description**:", command.description);
        }
        if (command.timeout) {
          embed.addField("**Cooldown**:", utils.timer(command.timeout));
        }
        if (command.UserPerms) {
          embed.addField("**Required User Permission**:", UserPerms);
        }
        if (command.BotPerms) {
          embed.addField("**Required Bot Permission**:", BotPerms);
        }
        embed
          .setFooter(
            `Requested by ${interaction.user.tag}`,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setURL(client.web)
          .setColor(client.color);
        interaction.followUp({ embeds: [embed] });
      }
    }
  },
};
