const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const axios = require("axios");
module.exports = {
  name: "build",
  description: "Get gunsmith builds",
  type: "CHAT_INPUT",
  usage: "[Weapon Name] [Author] [Tag]",
  category: "CODM",
  options: [
    {
      type: "SUB_COMMAND",
      name: "assault_rifle",
      description: "Get a gunsmith build for a Assault Rifle",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "Type 25",
              value: "A01",
            },
            {
              name: "M16",
              value: "A02",
            },
            {
              name: "AK117",
              value: "A03",
            },
            {
              name: "AK-47",
              value: "A04",
            },
            {
              name: "ASM10",
              value: "A05",
            },
            {
              name: "M4",
              value: "A06",
            },
            {
              name: "BK57",
              value: "A07",
            },
            {
              name: "LK24",
              value: "A08",
            },
            {
              name: "ICR-1",
              value: "A09",
            },
            {
              name: "Man-o-War",
              value: "A10",
            },
            {
              name: "KN-44",
              value: "A11",
            },
            {
              name: "HBRa3",
              value: "A12",
            },
            {
              name: "HVK-30",
              value: "A13",
            },
            {
              name: "DR-H",
              value: "A14",
            },
            {
              name: "Peacekeeper MK2",
              value: "A15",
            },
            {
              name: "FR .556",
              value: "A16",
            },
            {
              name: "AS VAL",
              value: "A17",
            },
            {
              name: "CR-56 AMAX",
              value: "A18",
            },
            {
              name: "M13",
              value: "A19",
            },
            {
              name: "Swordfish",
              value: "A20",
            },
            {
              name: "Kilo 141",
              value: "A21",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            {
              name: "Jokesta",
              value: "jokesta",
            },
            // {
            //   name: "Stats On Duty",
            //   value: "sod",
            // },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Aggressive",
              value: "aggressive",
            },
            {
              name: "Passive",
              value: "passive",
            },
            {
              name: "Search & Destroy",
              value: "snd",
            },
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "sub_machine_gun",
      description: "Get a gunsmith build for a Sub Machine Gun",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "RUS-79u",
              value: "D01",
            },
            {
              name: "Chicom",
              value: "D02",
            },
            {
              name: "PDW-57",
              value: "D03",
            },
            {
              name: "Razorback",
              value: "D04",
            },
            {
              name: "MSMC",
              value: "D05",
            },
            {
              name: "HG40",
              value: "D06",
            },
            {
              name: "Pharo",
              value: "D07",
            },
            {
              name: "GKS",
              value: "D08",
            },
            {
              name: "Cordite",
              value: "D09",
            },
            {
              name: "QQ9",
              value: "D10",
            },
            {
              name: "Fennec",
              value: "D11",
            },
            {
              name: "AGR 556",
              value: "D12",
            },
            {
              name: "QXR",
              value: "D13",
            },
            {
              name: "PP19 Bizon",
              value: "D14",
            },
            {
              name: "MX9",
              value: "D15",
            },
            {
              name: "CBR4",
              value: "D16",
            },
            {
              name: "PPSh 41",
              value: "D17",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            {
              name: "Jokesta",
              value: "jokesta",
            },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Aggressive",
              value: "aggressive",
            },
            {
              name: "Passive",
              value: "passive",
            },
            {
              name: "Search & Destroy",
              value: "snd",
            },
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "sniper_rifle",
      description: "Get a gunsmith build for a Sniper Rifle",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            // {
            //   name: "XPR-50",
            //   value: "B01",
            // },
            {
              name: "Arctic .50",
              value: "B02",
            },
            {
              name: "M21 EBR",
              value: "B03",
            },
            {
              name: "DL Q33",
              value: "B04",
            },
            {
              name: "Locus",
              value: "B05",
            },
            // {
            //   name: "NA-45",
            //   value: "B06",
            // },
            {
              name: "Outlaw",
              value: "B07",
            },
            {
              name: "Rytec AMR",
              value: "B08",
            },
            {
              name: "SVD",
              value: "B09",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Aggressive",
              value: "aggressive",
            },
            {
              name: "Passive",
              value: "passive",
            },
            {
              name: "Search & Destroy",
              value: "snd",
            },
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "light_machine_gun",
      description: "Get a gunsmith build for a Light Machine Gun",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "S36",
              value: "C01",
            },
            {
              name: "UL736",
              value: "C02",
            },
            {
              name: "RPD",
              value: "C03",
            },
            {
              name: "M4 LMG",
              value: "C04",
            },
            {
              name: "Chopper",
              value: "C05",
            },
            {
              name: "Holger 26",
              value: "C06",
            },
            {
              name: "Hades",
              value: "C07",
            },
            {
              name: "PKM",
              value: "C08",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Aggressive",
              value: "aggressive",
            },
            {
              name: "Passive",
              value: "passive",
            },
            {
              name: "Search & Destroy",
              value: "snd",
            },
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "shotgun",
      description: "Get a gunsmith build for a Shotgun",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "HS2126",
              value: "E01",
            },
            {
              name: "BY15",
              value: "E02",
            },
            {
              name: "HS0405",
              value: "E03",
            },
            {
              name: "Striker",
              value: "E04",
            },
            {
              name: "KRM 262",
              value: "E05",
            },
            {
              name: "Echo",
              value: "E06",
            },
            {
              name: "R9-0",
              value: "E07",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            {
              name: "dHitman",
              value: "dhitman",
            },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "ADS",
              value: "ads",
            },
            {
              name: "Hipfire",
              value: "hipfire",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "marksman_rifle",
      description: "Get a gunsmith build for a Marksman Rifle",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "Kilo Bolt-Action",
              value: "F01",
            },
            {
              name: "SKS",
              value: "F02",
            },
            {
              name: "SP-R 208",
              value: "F03",
            },
            {
              name: "MK2",
              value: "F04",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            // {
            //   name: "Stats On Duty",
            //   value: "sod",
            // },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Aggressive",
              value: "aggressive",
            },
            {
              name: "Passive",
              value: "passive",
            },
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "pistol",
      description: "Get a gunsmith build for a Pistol",
      options: [
        {
          type: 3,
          name: "name",
          description: "Name of the Gun",
          required: true,
          choices: [
            {
              name: "J358",
              value: "G01",
            },
            {
              name: "MW11",
              value: "G02",
            },
            {
              name: ".50 GS",
              value: "G03",
            },
            {
              name: "Renetti",
              value: "G04",
            },
            {
              name: "Shorty",
              value: "G05",
            },
            {
              name: "Crossbow",
              value: "G06",
            },
          ],
        },
        {
          type: 3,
          name: "Author",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            // {
            //   name: "Stats On Duty",
            //   value: "sod",
            // },
          ],
        },
        {
          type: 3,
          name: "tag",
          description: "Playstyle/game mode of the build",
          required: true,
          choices: [
            {
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const cwts = args[1];
    const cc = args[2];
    const tag = args[3];
    const data = await axios
      .get(
        `${process.env.api}/api/v1/codm/builds?cwts=${cwts}&cc=${cc}&tag=${tag}`,
        {
          headers: {
            Authorization: process.env.CODM_API_KEY,
          },
        }
      )
      .then(res => res.data)
      .catch(e => null);

    if (!data?.ID) {
      const embed = new MessageEmbed()
        .setDescription(
          `<:nyx_not_available:897378400031879188> We don't have a ${all[tag]} **${allguns[gun]}** gunsmith build by **${all[cc]}**, Please try another tag or a differnt content creator`
        )
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    } else {
      const arr = [];
      data.attachments.map((e, i) => {
        return arr.push(`**${i + 1}:** ${e}`);
      });
      const embed = new MessageEmbed()
        .setTitle(
          `${all[tag]} build for ${data.weaponName} from ${data.author}`
        )
        .setDescription(
          `<:nyx_description:897379659665264650> **Description** \`\`\`\n${data.notes} \n\`\`\``
        )
        .setColor(16580400)
        .setImage(data.imageUrl)
        .setFooter(
          `Builds Aggregated by ${client.author}`,
          client.user.displayAvatarURL()
        )
        .setTimestamp()
        .addFields(
          {
            name: "<:nyx_author:897379080549314601> Author:",
            value: `\`\`\`\n${data.author}\n\`\`\``,
            inline: true,
          },
          {
            name: "<a:lastupdate:897381474330873887> Last Updated:",
            value: `\`\`\`\n${moment(Date.parse(data.lastUpdate)).format(
              "MMMM Do YYYY"
            )}\n\`\`\``,
            inline: true,
          },
          {
            name: ":id: CWTS:",
            value: `\`\`\`\n${data.cwts}\n\`\`\``,
            inline: true,
          },
          {
            name: ":paperclip: Attachments:",
            value: arr.join("\n"),
          },
          {
            name: "<a:tags:897034924140404776> Tags",
            value: data.tags.join(", "),
          }
        )
        .setURL(client.web);
      interaction.followUp({
        embeds: [embed],
      });
    }
  },
};
