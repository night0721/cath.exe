const {
  EmbedBuilder,
  Client,
  CommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ComponentType,
} = require("discord.js");
const Utils = require("../../util/functions/function");
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
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Utils} utils
   */
  run: async (client, interaction, args, utils) => {
    if (!args[0]) {
      await interaction.deleteReply();
      const emoji = {
        CODM: "<a:codm:897030768793104385>",
        APEX: "🎆",
        Config: "<a:config:896990033561669762>",
        Information: "<a:information:894962394932064346>",
        Utilities: "<a:utilites:897233087941988392>",
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
      const embed = new EmbedBuilder()
        .setTitle(`**NYX's Commands**`)
        .setDescription(`Please choose a category in the dropdown menu`)
        .setColor(client.color)
        .setTimestamp()
        .addFields(
          {
            name: ":link: **Invite Me**",
            value: `[Click Here](${utils.inviteLink(client.user.id)})`,
            inline: true,
          },
          {
            name: "<:support1:867093614403256350> **Need Help ?**",
            value: `[Support Server](${client.invite})`,
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
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });
      const components = state => [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
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
        componentType: ComponentType.StringSelect,
        time: 60000,
      });
      collector.on("collect", async interaction => {
        const [directory] = interaction.values;
        const category = categories.find(u => u.directory === directory);
        const newembed = new EmbedBuilder()
          .setTitle(
            `${emoji[directory]} ${directory} Commands ${emoji[directory]}`
          )
          .setTimestamp()
          .setColor(client.color)
          .setFooter({
            text: `Please use /help (Command Name) for more details`,
          })
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
        interaction.editReply({
          content: `There isn't any command named "${args[0]}"`,
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
        const fields = [];
        const embed = new EmbedBuilder()
          .setTitle(`"${command.name}" command details`)
          .addFields([
            {
              name: "**Command**:",
              value: command.name ? `\`${command.name}\`` : "N/A",
            },
          ]);
        if (command.usage)
          fields.push({
            name: "**Usage**:",
            value: `\`/${command.name} ${command.usage}\``,
          });
        else
          fields.push({
            name: "**Usage**:",
            value: `\`/${command.name}\``,
          });

        if (command.description)
          fields.push({
            name: "**Description**:",
            value: command.description,
          });

        if (command.timeout)
          fields.push({
            name: "**Cooldown**:",
            value: utils.timer(command.timeout),
          });

        if (command.UserPerms)
          fields.push({
            name: "**Required User Permission**:",
            value: UserPerms,
          });

        if (command.BotPerms)
          fields.push({
            name: "**Required Bot Permission**:",
            value: BotPerms,
          });
        embed
          .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp()
          .addFields(fields)
          .setURL(client.web)
          .setColor(client.color);
        interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
