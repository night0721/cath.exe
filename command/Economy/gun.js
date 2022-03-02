const { MessageEmbed } = require("discord.js");
const e = require("../../models/econ");
const list = require("../../util/Data/gun.json");
module.exports = {
  name: "gun",
  description: "Configure Weapon Master System settings",
  options: [
    {
      type: "SUB_COMMAND",
      name: "select",
      description: "Select the gun for the game",
      options: [
        {
          name: "gun",
          description: "The gun you want to select",
          type: 3,
          required: true,
          choices: [
            {
              name: "kuk69",
              value: "kuku69",
            },
            {
              name: "nani45",
              value: "nani45",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "list",
      description: "See the information for the guns",
      options: [],
    },
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "See the stats of your gun",
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0] === "list") {
      const lists = list.map(value => {
        return `**${value.emoji} ${value.name}**\n**Description**: ${value.description}`;
      });
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(lists.join("\n\n"));
      interaction.followUp({ embeds: [embed] });
    } else if (args[0] === "select") {
      if (args[1] == "kuku69") {
        await e.findOne({ User: interaction.user.id }, async (err, data) => {
          if (!data) {
            new e({
              User: interaction.user.id,
              Gun: {
                Name: "kuku69",
                Rank: "Iron",
                Kills: 0,
                XP: 0,
                Level: 1,
              },
            });
          } else {
            data.Gun.Name = "kuku69";
            await data.save();
          }
        });
        interaction.followUp({ content: "**Your current gun:\nkuku69**" });
      }
      if (args[1] == "nani45") {
        await e.findOne({ User: interaction.user.id }, async (err, data) => {
          if (!data) {
            new e({
              User: interaction.user.id,
              Gun: {
                Name: "nani45",
                Rank: "Iron",
                Kills: 0,
                XP: 0,
                Level: 1,
              },
            });
          } else {
            data.Gun.Name = "nani45";
            await data.save();
          }
        });
        interaction.followUp({ content: "**Your current gun:\nnani45**" });
      }
    } else if (args[0] === "info") {
      await e.findOne({ User: interaction.user.id }, async (err, data) => {
        if (!data?.Gun.Name) {
          interaction.followUp({
            content:
              "You don't have a gun yet! Please use `/gun select` to select your gun!",
          });
        } else {
          const link = list.find(a => a.name === data.Gun.Name).link;
          const embed = new MessageEmbed()
            .setThumbnail(link)
            .setTimestamp()
            .setColor(client.color)
            .setFooter(
              `Made by ${client.author}`,
              client.user.displayAvatarURL()
            )
            .addField("Name", data.Gun.Name, true)
            .addField("Rank", data.Gun.Rank, true)
            .addField("XP", data.Gun.XP.toString(), true);
          interaction.followUp({ embeds: [embed] });
        }
      });
    }
  },
};
