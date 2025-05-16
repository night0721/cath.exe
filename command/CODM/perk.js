const { EmbedBuilder } = require("discord.js");
const c = require("../../client/CODMClient");
module.exports = {
  name: "perk",
  description: "Get perk stats",

  usage: "{Perk}",
  category: "CODM",
  options: [
    {
      type: 1,
      name: "red",
      description: "Red Perk",
      options: [
        {
          type: 3,
          name: "perk",
          description: "Perk",
          required: true,
          choices: [
            {
              name: "Fast Recover",
              value: "fastrecover",
            },
            {
              name: "Persistence",
              value: "persistence",
            },
            {
              name: "Flak Jacket",
              value: "flakjacket",
            },
            {
              name: "Skulker",
              value: "skulker",
            },
            {
              name: "Agile",
              value: "agile",
            },
            {
              name: "Lightweight",
              value: "lightweight",
            },
            {
              name: "Restock",
              value: "restock",
            },
            {
              name: "Tactician",
              value: "tactician",
            },
            {
              name: "Overclock",
              value: "overclock",
            },
            {
              name: "Martydom",
              value: "martydom",
            },
            {
              name: "Iron Lungs",
              value: "ironlungs",
            },
          ],
        },
      ],
    },
    {
      type: 1,
      name: "green",
      description: "Green Perk",
      options: [
        {
          type: 3,
          name: "perk",
          description: "Perk",
          required: true,
          choices: [
            {
              name: "Vulture",
              value: "vulture",
            },
            {
              name: "Toughness",
              value: "toughness",
            },
            {
              name: "Tracker",
              value: "tracker",
            },
            {
              name: "Ghost",
              value: "ghost",
            },
            {
              name: "Cold Blooded",
              value: "coldblooded",
            },
            {
              name: "Hardwired",
              value: "hardwired",
            },
            {
              name: "Quick Fix",
              value: "quickfix",
            },
            {
              name: "Amped",
              value: "amped",
            },
            {
              name: "Recon",
              value: "recon",
            },
            {
              name: "Gung Ho",
              value: "gungho",
            },
          ],
        },
      ],
    },
    {
      type: 1,
      name: "blue",
      description: "Blue Perk",
      options: [
        {
          type: 3,
          name: "perk",
          description: "Perk",
          required: true,
          choices: [
            {
              name: "Hardline",
              value: "hardline",
            },
            {
              name: "Demo Expert",
              value: "demoexpert",
            },
            {
              name: "Tactical Mask",
              value: "tacticalmask",
            },
            {
              name: "Alert",
              value: "alert",
            },
            {
              name: "Engineer",
              value: "engineer",
            },
            {
              name: "Dead Silence",
              value: "deadsilence",
            },
            {
              name: "Shrapnel",
              value: "shrapnel",
            },
            {
              name: "High Alert",
              value: "highalert",
            },
            {
              name: "Launcher Plus",
              value: "launcherplus",
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const val = args[1];
    const d = await c.getperk(val);
    const embed = new EmbedBuilder()
      .setColor(
        d.type == "green"
          ? "09654a"
          : d.type == "red"
          ? "8a0a0a"
          : d.type == "blue"
          ? "1047a4"
          : client.color
      )
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setTitle(d.perk)
      .addFields({ name: "Effects", value: d.effects });
    interaction.followUp({ embeds: [embed] });
  },
};
