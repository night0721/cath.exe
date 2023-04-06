const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "settings",
  description: "Configure settings for the server",
  UserPerms: ["ADMINISTRATOR"],
  category: "Config",
  options: [
    {
      type: 1,
      name: "prefix",
      description: "Configure prefix settings for the server",
      options: [
        {
          type: 3,
          name: "prefix",
          description: "The prefix for the server",
          required: true,
          choices: [],
        },
      ],
    },
    {
      type: 2,
      name: "enable",
      description: "Enable commands/category for the server",
      options: [
        {
          type: 1,
          name: "command",
          description: "To enable commands",
          options: [
            {
              type: 3,
              name: "name",
              description: "The command name to be enabled",
              required: true,
            },
          ],
        },
        {
          type: 1,
          name: "category",
          description: "To enable categories",
          options: [
            {
              type: 3,
              name: "name",
              description: "The category name to be enabled",
              required: true,
              choices: [
                {
                  name: "codm",
                  value: "CODM",
                },
                {
                  name: "config",
                  value: "Config",
                },
                {
                  name: "economy",
                  value: "Economy",
                },
                {
                  name: "fun",
                  value: "Fun",
                },
                {
                  name: "information",
                  value: "Information",
                },
                {
                  name: "moderation",
                  value: "Moderation",
                },
                {
                  name: "utilities",
                  value: "Utilities",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 2,
      name: "disable",
      description: "Disable commands/category for the server",
      options: [
        {
          type: 1,
          name: "command",
          description: "To disable commands",
          options: [
            {
              type: 3,
              name: "name",
              description: "The command name to be disabled",
              required: true,
            },
          ],
        },
        {
          type: 1,
          name: "category",
          description: "To disable categories",
          options: [
            {
              type: 3,
              name: "name",
              description: "The category name to be disabled",
              required: true,
              choices: [
                {
                  name: "codm",
                  value: "CODM",
                },
                {
                  name: "config",
                  value: "Config",
                },
                {
                  name: "economy",
                  value: "Economy",
                },
                {
                  name: "fun",
                  value: "Fun",
                },
                {
                  name: "information",
                  value: "Information",
                },
                {
                  name: "moderation",
                  value: "Moderation",
                },
                {
                  name: "utilities",
                  value: "Utilities",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 1,
      name: "tips",
      description: "Configure tips settings for the server",
      options: [
        {
          type: 5,
          name: "choice",
          description: "Set whether tips system is activated for the server",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "overall",
      description: "See overall settings for the server",
      options: [],
    },
  ],
  run: async (client, interaction, args, utils, data) => {
    if (args[0].toLowerCase() === "prefix") {
      await client.data.setPrefix(interaction.guild.id, args[1]);
      interaction.followUp({ content: `Saved \`${args[2]}\` as the prefix` });
    } else if (args[0].toLowerCase() === "tips") {
      if (args[1]) {
        await client.data.setTips(interaction.guild.id, "true");
        interaction.followUp({
          content: `Tips is enabled in this server now.`,
        });
      } else {
        await client.data.setTips(interaction.guild.id, "false");
        interaction.followUp({
          content: `Tips is disabled in this server now.`,
        });
      }
    } else if (args[0].toLowerCase() === "enable") {
      const type = args[1].toLowerCase();
      const name = args[2].toLowerCase();
      if (type === "command") {
        if (!!client.slashCommands.get(name) === false) {
          interaction.followUp({
            content: `There isn't any command/category named \`${name}\``,
          });
        } else if (!data.Guild.Commands.includes(name)) {
          interaction.followUp({
            content: `\`${args[2]}\` command had already been enabled`,
          });
        } else if (
          data.Guild.Commands.includes(name) &&
          !!client.slashCommands.get(name) === true
        ) {
          await client.data.enable(interaction.guild.id, "command", name);
          interaction.followUp({
            content: `\`${args[2]}\` command is now enabled`,
          });
        }
      }
      if (type === "category") {
        const category = fs.readdirSync("./command");
        if (!data.Guild.Category.includes(args[2])) {
          interaction.followUp({
            content: `\`${args[2]}\` category had already been enabled`,
          });
        }
        if (
          data.Guild.Category.includes(args[2]) &&
          category.includes(args[2])
        ) {
          await client.data.enable(interaction.guild.id, "category", args[2]);
          interaction.followUp({
            content: `\`${args[2]}\` category is now enabled`,
          });
        }
      }
    } else if (args[0].toLowerCase() === "disable") {
      const type = args[1].toLowerCase();
      const name = args[2].toLowerCase();
      if (type === "command") {
        if (!!client.slashCommands.get(name) === false) {
          interaction.followUp({
            content: `There isn't any command/category named \`${name}\``,
          });
        } else if (data.Guild.Commands.includes(name)) {
          interaction.followUp({
            content: `\`${args[2]}\` command had already been disabled`,
          });
        } else if (
          !data.Guild.Commands.includes(name) &&
          !!client.slashCommands.get(name) === true
        ) {
          await client.data.disable(interaction.guild.id, "command", name);
          interaction.followUp({
            content: `\`${args[2]}\` command is now disabled`,
          });
        }
      }
      if (type === "category") {
        const category = fs.readdirSync("./command");
        if (data.Guild.Category.includes(args[2])) {
          interaction.followUp({
            content: `\`${args[2]}\` category had already been disabled`,
          });
        }
        if (
          !data.Guild.Category.includes(args[2]) &&
          category.includes(args[2])
        ) {
          await client.data.disable(interaction.guild.id, "category", args[2]);
          interaction.followUp({
            content: `\`${args[2]}\` category is now disabled`,
          });
        }
      }
    } else {
      const d = `
      **Prefix**: ${data.Guild.Prefix ? data.Guild.Prefix : "C."}
      **Tips**: ${data.Guild.Tips ? "Enable" : "Disabled"}
      **Disabled Commands**: ${
        data.Guild.Commands.length ? data.Guilds.Commands.join(",") : "None"
      }
      **Disabled Categories**: ${
        data.Guild.Category.length ? data.Guilds.Category.join(",") : "None"
      }
      `;
      const embed = new EmbedBuilder()
        .setTitle(`**${interaction.guild.name}** Settings`)
        .setColor(client.color)
        .setFooter({
          text: `Made by ${client.author}`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp()
        .setDescription(d);
      interaction.followUp({ embeds: [embed] });
    }
  },
};
