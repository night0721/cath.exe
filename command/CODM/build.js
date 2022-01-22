const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const moment = require("moment");
module.exports = {
  name: "build",
  description: "Get gunsmith builds",
  type: "CHAT_INPUT",
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
              name: "AK117",
              value: "ak117",
            },
            {
              name: "M16",
              value: "m16",
            },
            {
              name: "Type 25",
              value: "type25",
            },
            {
              name: "AK-47",
              value: "ak47",
            },
            {
              name: "ASM10",
              value: "asm10",
            },
            {
              name: "M4",
              value: "m4",
            },
            {
              name: "BK57",
              value: "bk57",
            },
            {
              name: "LK24",
              value: "lk24",
            },
            {
              name: "Man-o-War",
              value: "manowar",
            },
            {
              name: "ICR-1",
              value: "icr1",
            },
            {
              name: "KN-44",
              value: "kn44",
            },
            {
              name: "HBRa3",
              value: "hbra3",
            },
            {
              name: "HVK-30",
              value: "hvk30",
            },
            {
              name: "DR-H",
              value: "drh",
            },
            {
              name: "Peacekeeper MK2",
              value: "peacekeepermk2",
            },
            {
              name: "FR .556",
              value: "fr556",
            },
            {
              name: "AS VAL",
              value: "asval",
            },
            {
              name: "CR-56 AMAX",
              value: "cr56amax",
            },
            {
              name: "M13",
              value: "m13",
            },
            {
              name: "Swordfish",
              value: "swordfish",
            }, // {
            //   name: "Kilo 141",
            //   value: "kilo",
            // },
          ],
        },
        {
          type: 3,
          name: "youtuber",
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
            }, // {
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
              value: "rus79u",
            },
            {
              name: "PDW-57",
              value: "pdw57",
            },
            {
              name: "Razorback",
              value: "razorback",
            },
            {
              name: "MSMC",
              value: "msmc",
            },
            {
              name: "HG40",
              value: "hg40",
            },
            {
              name: "Pharo",
              value: "pharo",
            },
            {
              name: "GKS",
              value: "gks",
            },
            {
              name: "Cordite",
              value: "cordite",
            },
            {
              name: "QQ9",
              value: "qq9",
            },
            {
              name: "Fennec",
              value: "fennec",
            },
            {
              name: "Chicom",
              value: "chicom",
            },
            {
              name: "AGR 556",
              value: "agr556",
            },
            {
              name: "QXR",
              value: "qxr",
            },
            {
              name: "PP19 Bizon",
              value: "pp19bizon",
            },
            {
              name: "MX9",
              value: "mx9",
            },
            {
              name: "CBR4",
              value: "cbr4",
            },
            {
              name: "PPSh 41",
              value: "ppsh",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
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
            {
              name: "Arctic .50",
              value: "arctic50",
            },
            {
              name: "M21 EBR",
              value: "m21ebr",
            },
            {
              name: "DL Q33",
              value: "dlq33",
            },
            {
              name: "Locus",
              value: "locus",
            },
            // {
            //   name: "XPR-50",
            //   value: "xpr50",
            // },
            // {
            //   name: "NA-45",
            //   value: "na45",
            // },
            {
              name: "Outlaw",
              value: "outlaw",
            },
            {
              name: "Rytec AMR",
              value: "rytecamr",
            },
            {
              name: "SVD",
              value: "svd",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            // {
            //   name: "little_b",
            //   value: "littleb",
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
              value: "s36",
            },
            {
              name: "UL736",
              value: "ul736",
            },
            {
              name: "RPD",
              value: "rpd",
            },
            {
              name: "M4 LMG",
              value: "m4lmg",
            },
            {
              name: "Chopper",
              value: "chopper",
            },
            {
              name: "Holger 26",
              value: "holger26",
            },
            {
              name: "Hades",
              value: "hades",
            },
            {
              name: "PKM",
              value: "pkm",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
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
              value: "hs2126",
            },
            {
              name: "BY15",
              value: "by15",
            },
            {
              name: "Striker",
              value: "striker",
            },
            {
              name: "KRM_262",
              value: "krm262",
            },
            {
              name: "Echo",
              value: "echo",
            },
            {
              name: "HS0405",
              value: "hs0405",
            },
            {
              name: "R9-0",
              value: "r90",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
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
              value: "kiloboltaction",
            },
            {
              name: "SKS",
              value: "sks",
            },
            {
              name: "SP-R 208",
              value: "spr208",
            },
            {
              name: "MK2",
              value: "mk2",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
          description: "Select a Content Creator",
          required: true,
          choices: [
            {
              name: "Path.exe",
              value: "path",
            },
            // {
            //   name: "Little_b",
            //   value: "littleb",
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
              value: "j358",
            },
            {
              name: "MW11",
              value: "mw11",
            },
            {
              name: ".50 GS",
              value: "gs50",
            },
            {
              name: "Renetti",
              value: "renetti",
            },
            {
              name: "Shorty",
              value: "shorty",
            },
            {
              name: "Crossbow",
              value: "crossbow",
            },
          ],
        },
        {
          type: 3,
          name: "youtuber",
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
              name: "Respawn",
              value: "respawn",
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const allguns = {
      ak117: "AK117",
      m16: "M16",
      type25: "Type 25",
      ak47: "AK-47",
      asm10: "ASM10",
      m4: "M4",
      bk57: "BK57",
      lk24: "LK24",
      manowar: "Man-O-War",
      icr1: "ICR-1",
      kn44: "KN-44",
      hbra3: "HBRa3",
      hvk30: "HVK-30",
      drh: "DR-H",
      peacekeepermk2: "Peacekeeper MK2",
      fr556: "FR .556",
      asval: "AS VAL",
      cr56amax: "CR-56 AMAX",
      m13: "M13",
      swordfish: "Swordfish",
      // kilo: "Kilo 141",

      j358: "J358",
      gs50: ".50 GS",
      mw11: "MW11",
      renetti: "Renetti",
      shorty: "Shorty",
      crossbow: "Crossbow",

      kiloboltaction: "Kilo Bolt-Action",
      sks: "SKS",
      spr208: "SP-R 208",
      mk2: "MK2",

      s36: "S36",
      ul736: "UL736",
      rpd: "RPD",
      m4lmg: "M4LMG",
      chopper: "Chopper",
      holger26: "Holger 26",
      hades: "Hades",
      pkm: "PKM",

      arctic50: "Arctic .50",
      m21ebr: "M21 EBR",
      dlq33: "DL Q33",
      locus: "Locus",
      // na45: "NA 45",
      // xpr50: "XPR-50",
      locus: "Locus",
      outlaw: "Outlaw",
      rytecamr: "Rytec AMR",
      svd: "SVD",

      hs2126: "HS2126",
      by15: "BY15",
      striker: "Striker",
      krm262: "KRM 262",
      echo: "Echo",
      hs0405: "HS0405",
      r90: "R9-0",

      rus79u: "RUS-79U",
      hg40: "HG-40",
      pdw57: "PDW-57",
      chicom: "Chicom",
      razorback: "Razorback",
      msmc: "MSMC",
      pharo: "Pharo",
      gks: "GKS",
      cordite: "Cordite",
      qq9: "QQ9",
      fennec: "Fennec",
      agr556: "AGR 556",
      qxr: "QXR",
      pp19bizon: "PP19 Bizon",
      mx9: "MX9",
      cbr4: "CBR4",
      ppsh: "PPSh-41",
    };
    const all = {
      assault_rifle: "Assault Rifle",
      sniper_rifle: "Sniper Rifle",
      marksman_rifle: "Marksman Rifle",
      shotgun: "Shotgun",
      light_machine_gun: "Light Machine Gun",
      sub_machine_gun: "Sub Machine Gun",

      path: "Path.exe",
      dhitman: "dHitman",
      jokesta: "Jokesta",
      sod: "Stats On Duty",
      // littleb:"Little B",

      aggressive: "Aggressive",
      passive: "Passive",
      snd: "Search And Destroy",
      respawn: "Respawn",
      ads: "ADS",
      hipfire: "Hipfire",
    };
    const gun = args[1];
    const cc = args[2];
    const tag = args[3];
    const data = await axios
      .get(
        `${process.env.api}/api/v1/codm/builds?name=${gun}&cc=${cc}&tag=${tag}`,
        {
          headers: {
            Authorization: "Gae",
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
          `${data.weaponName}(${data.weaponType})'s ${all[tag]} build from ${data.author}`
        )
        .setDescription(
          `<:nyx_description:897379659665264650> **Description** \`\`\`\n ${data.notes}\n\`\`\``
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
