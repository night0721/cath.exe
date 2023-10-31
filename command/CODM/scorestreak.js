const { EmbedBuilder } = require("discord.js");
const c = require("../../client/CODMClient");
module.exports = {
  name: "scorestreak",
  description: "Get Scorestreak stats",
  usage: "{Scorestreak}",
  category: "CODM",
  options: [
    {
      type: 1,
      name: "lethal",
      description: "Lethal Scorestreak",
      options: [
        {
          type: 3,
          name: "scorestreak",
          description: "Select a lethal scorestreak",
          required: true,
          choices: [
            {
              name: "Shield Turret",
              value: "shieldturret",
            },
            {
              name: "Hunter Killer Drone",
              value: "hunterkillerdrone",
            },
            {
              name: "MQ-27 Dragonfire",
              value: "mq27dragonfire",
            },
            {
              name: "Predator Missile",
              value: "predatormissile",
            },
            {
              name: "Hawk X3",
              value: "hawkx3",
            },
            {
              name: "Sentry Gun",
              value: "sentrygun",
            },
            {
              name: "Lightning Strike",
              value: "lightningstrike",
            },
            {
              name: "Orbital Laser",
              value: "orbitallaser",
            },
            {
              name: "XS1 Goliath",
              value: "xs1goliath",
            },
            {
              name: "Cluster Strike",
              value: "clusterstrike",
            },
            {
              name: "Chopper Gunner",
              value: "choppergunner",
            },
            {
              name: "Stealth Chopper",
              value: "stealthchopper",
            },
            {
              name: "Swarm",
              value: "swarm",
            },
            {
              name: "Napalm",
              value: "napalm",
            },
            {
              name: "VTOL",
              value: "vtol",
            },
          ],
        },
      ],
    },
    {
      type: 1,
      name: "support",
      description: "Support Scorestreak",
      options: [
        {
          type: 3,
          name: "scorestreak",
          description: "Select a Support Scorestreak",
          required: true,
          choices: [
            {
              name: "UAV",
              value: "uav",
            },
            {
              name: "Shock RC",
              value: "shockrc",
            },
            {
              name: "Care Package",
              value: "carepackage",
            },
            {
              name: "Counter UAV",
              value: "cuav",
            },
            {
              name: "SAM Turret",
              value: "samturret",
            },
            {
              name: "Advance UAV",
              value: "auav",
            },
            {
              name: "EMP Systems",
              value: "empsystems",
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const val = args[1];
    const d = await c.getscorestreak(val);
    const embed = new EmbedBuilder()
      .setTitle(d.name)
      .setURL(d.preview_video)
      .setDescription(
        `<:nyx_description:897379659665264650> **Description** \`\`\`\n${d.description}\`\`\``
      )
      .addFields(
        {
          name: "Cost",
          value: `${d.cost}`,
          inline: true,
        },
        {
          name: "AI-Assisted",
          value: `
          ${
            d.manual
              ? "<a:nyx_cross:897244999211696198> No"
              : "<a:nyx_checkmark:897240322411724841> Yes"
          }`,
          inline: true,
        }
      )
      .setThumbnail(d.preview)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(
        d.type == "lethal"
          ? "FF2222"
          : d.type == "assist"
          ? "22FF4A"
          : client.color
      )
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
