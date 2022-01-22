const { MessageEmbed } = require("discord.js");
const { CODMClient } = require("cath");
const c = new CODMClient("Gae");
module.exports = {
  name: "scorestreak",
  description: "Get Scorestreak stats",
  type: "CHAT_INPUT",
  usage: "{Scorestreak}",
  category: "CODM",
  options: [
    {
      type: "SUB_COMMAND",
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
              name: "XS1 Goliath",
              value: "xs1goliath",
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
      type: "SUB_COMMAND",
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
    const embed = new MessageEmbed()
      .setTitle(d.scorestreak)
      .setURL(d.preview_video)
      .setDescription(`\`\`\`${d.description}\`\`\``)
      .addFields(
        {
          name: "Cost",
          value: `\`\`\`${d.cost}\`\`\``,
          inline: true
        },
        {
          name: "Lethal",
          value: `
          ${d.lethal == true 
            ? "<a:nyx_checkmark:897240322411724841> Yes"
            : "<a:nyx_cross:897244999211696198> No"}`,
          inline: true
        },
        {
          name: "AI-Assisted",
          value: `
          ${d.manual == false 
            ? "<a:nyx_checkmark:897240322411724841> Yes"
            : "<a:nyx_cross:897244999211696198> No"}`,
          inline: true
        },
        {
          name: "More Info",
          value: `\`\`\`${d.special}\`\`\``,
          inline: false
        }
      )
      .setThumbnail(`${d.preview}`)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setColor(
        d.type == "lethal"
          ? "FF2222"
          : d.type == "support"
          ? "22FF4A"
          : client.color
      )
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
