const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "stats",
  description: "Check Stats of a Weapon by SOD",
  usage: "[Weapon Name]",
  category: "CODM",
  options: [
    {
      type: 1,
      name: "assault_rifle",
      description: "Get a Stats for Assault Rifle",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
    {
      type: 1,
      name: "sub_machine_gun",
      description: "Get a Stats for Sub Machine Gun",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
    {
      type: 1,
      name: "sniper_rifle",
      description: "Get a Stats for Sniper Rifle",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
    {
      type: 1,
      name: "light_machine_gun",
      description: "Get a Stats for Light Machine Gun",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
    {
      type: 1,
      name: "shotgun",
      description: "Get a Stats for Shotgun",
      options: [
        {
          type: 3,
          name: "Weapon",
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
              name: "KRM_262",
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
            {
              name: "JAK-12",
              value: "E08",
            },
          ],
        },
      ],
    },
    {
      type: 1,
      name: "marksman_rifle",
      description: "Get a Stats for Marksman Rifle",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
    {
      type: 1,
      name: "pistol",
      description: "Get a Stats for Pistol",
      options: [
        {
          type: 3,
          name: "Weapon",
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
      ],
    },
  ],
  // It's not complete, Still work in progress.
  run: async (client, interaction, args, utils) => {
    const cwts = args[1];
    const data = await axios
      .get(`${process.env.api}/api/v1/codm/builds?cwts=${cwts}`, {
        headers: {
          Authorization: process.env.CODM_API_KEY,
        },
      })
      .then(res => res.data)
      .catch(e => null);

    if (!data?.ID) {
      const embed = new EmbedBuilder()
        .setDescription(
          `<:nyx_not_available:897378400031879188> Sorry, We currently don't have Stats for this Weapon`
        )
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`${data.author} Statistical Breakdown`)
        .setColor(16580400)
        .setImage(data.imageUrl)
        .setFooter({ text: `Stats Curtosy of Round Table` })
        // .setFooter(
        //   `Stats Curtosy of Stats on Duty`,
        // )
        .setDescription(
          `<:nyx_description:897379659665264650> **Description** \n${data.description}`
        )
        .addFields(
          {
            name: ":id: CWTS:",
            value: `\`\`\`\n${data.cwts}\n\`\`\``,
            inline: true,
          },
          {
            name: "<a:lastupdate:897381474330873887> Last Updated:",
            value: `\`\`\`\n${utils.parseShortDate(
              new Date(data.lastUpdate)
            )}\n\`\`\``,
            inline: true,
          },
          {
            name: "Basic Stats",
            value: `\`\`\`\n
            BSA Score: ${data.bsa_score}
            Hipfire Score: ${data.hipfire_score}
            Rate of Fire\t\t\t\t: ${data.rof}
            Penetration Level\t\t: ${data.penetration}
            Firing Mode\t\t\t\t\t: Full Auto

            \n\`\`\``,
            inline: false,
          },
          {
            name: "Handling & Mobility",
            value: `\`\`\`\n
            Drop Time               :  416.6 ms
            Raise Time              :  650 ms
            Sprinting Speed         :  6.09 m/s
            Walking Speed           :  4.51 m/s
            Sprint-to-Fire Time     :  165 ms
            \n\`\`\``,
            inline: false,
          },
          {
            name: "Ammunation Stats",
            value: `\`\`\`\n
            Magazine                :  30
            Reserve                 :  120
            Reload Type             :  Magazine
            Cancel Reload Time      :  1.9 s
            Reload Time             :  2.3 s
            Full Reload Time        :  3.2 s
            \n\`\`\``,
            inline: false,
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
      interaction.followUp({ embeds: [embed] });
    }
  },
};

// @night0721 Damage profile will be avalable by different command

//     recoilAvailable = false;
//     hasError = false;
//     console.log(args);
//     const repEmb = statsHandler(args.join(" ").replace("\n", " "));
//     if (hasError) {
//       interaction.followUp({ embeds: [repEmb] });
//     }
//     if (recoilAvailable) {
//       repEmb.fields.push({
//         name: "**Recoil Graph**",
//         value:
//           "```\nThe Recoil graph below is dynamic (change based on attachment equipped)```",
//       });
//       const recoilImageLink = await chart.getShortUrl();
//       repEmb.image = { url: recoilImageLink };
//     }
//     interaction.followUp({ embeds: [repEmb] });
//   },
// }

// run: async (client, interaction, args) => {
//   recoilAvailable = false;
//   hasError = false;
//   console.log(args);
//   const repEmb = statsHandler(args.join(" ").replace("\n", " "));
//   if (hasError) {
//     interaction.followUp({ embeds: [repEmb] });
//   }
//   if (recoilAvailable) {
//     repEmb.fields.push({
//       name: "**Recoil Graph**",
//       value:
//         "```\nThe Recoil graph below is dynamic (change based on attachment equipped)```",
//     });
//     const recoilImageLink = await chart.getShortUrl();
//     repEmb.image = { url: recoilImageLink };
//   }
//   interaction.followUp({ embeds: [repEmb] });
// },
// };

// function inpHandler(inpmsg) {
// statsHandler(inpmsg.split("+")[0]);
// }

// function statsHandler(inpmsg) {
// let statsNames = [
//     "Pellets",
//     "Detonation Range",
//     "Explosion Radius",
//     "Explosion Damage",
//     "Firing Mode",
//     "Rate of Fire",
//     "Bullet in Burst",
//     "Time Between Burst",
//     "Bullet Speed",
//     "Penetration Level",
//     "Bullet Spread",
//     "Idle Sway",
//     "Hipfire Pellet Spread",
//     "ADS Pellet Spread",
//     "ADS Time",
//     "Sprint-to-Fire Time",
//     "ADS Zoom",
//     "Magazine",
//     "Reserve",
//     "Reload Type",
//     "Cancel Reload Time",
//     "Reload Time",
//     "Full Reload Time",
//     "Drop Time",
//     "Raise Time",
//     "Sprinting Speed",
//     "Walking Speed",
//     "Straifing Speed",
//     "Damage per Tick",
//     "Number of Ticks",
//     "Time Between Ticks",
//     "Breath Hold Time",
//     "shouldNeverHappen0",
//     "shouldNeverHappen1",
//     "shouldNeverHappen2",
//     "shouldNeverHappen3",
//     "shouldNeverHappen4",
//   ],
//   out = [];

// currGun = common.weaponIdentifier(inpmsg);
// if (typeof currGun == "string") {
//   hasError = true;
//   return currGun;
// }
// currStats = currGun.stats;
// currDRM = currGun.drm[0];
// currAttachments = [];
// currAttachments = common.attachmentsIdentifier(
//   inpmsg,
//   currGun.aments,
//   currStats
// );
// if (typeof currAttachments == "string") {
//   hasError = true;
//   return currAttachments;
// }
// currRecoilArr = [1, 1, currGun.stats[17]];
// if (currAttachments.length != 0) {
//   const totalEffects = common.totaler(currAttachments);

//   currStats = common.updateStatswithEffects(totalEffects, currStats);
//   currRecoilArr = [totalEffects[2], totalEffects[3], currGun.stats[17]]; // must happen after currStats update
//   currDRM = currGun.drm[totalEffects[37]];
//   currDRM.range = currDRM.range.map(x =>
//     Math.round(x * (1 + totalEffects[13] / 100))
//   );
//   out = common.attachmentHandler(totalEffects, currStats);
// }
// function statsWorker() {
//   if (currStats[19] === 2) {
//     currStats[21] =
//       currStats[20] + currStats[21] * currStats[17] + currStats[22];
//     currStats[20] = 0;
//     currStats[22] = 0;
//   }
//   currStats[25] = (currStats[25] * currStats[26]) / 100;

//   const outReady = currStats.map((x, i) =>
//     x ? statsNames[i].padEnd(24) + ":".padEnd(3) + beautifier(i) : ""
//   );
//   out = [
//     ...[
//       "Basic Stats",
//       "ADS Stats",
//       "Bullet Stats",
//       "Magazine",
//       "Handling Stats",
//       "Mobility Stats",
//       "Miscellaneous Stats",
//     ].map((x, i) =>
//       fieldMaker(
//         x,
//         [
//           [04, 05, 09],
//           [14, 16, 11, 31],
//           [00, 06, 07, 08, 10, 12, 13],
//           [17, 18, 19, 20, 21, 22],
//           [23, 24],
//           [25, 26, 27, 15],
//           [28, 29, 30, 01, 02, 03],
//         ][i]
//       )
//     ),
//     ...out,
//   ];
//   function fieldMaker(inpName, inpIndx) {
//     inpIndx = inpIndx.filter(x => outReady[x]);
//     return inpIndx.length
//       ? {
//           name: "**" + inpName + "**",
//           value: "```\n" + inpIndx.map(x => outReady[x]).join("\n") + "```",
//         }
//       : "";
//   }
// }
// statsWorker();

// function beautifier(j) {
//   switch (j) {
//     case 04:
//       return data.firingModes[currStats[j] - 1];
//     case 09:
//       return data.penetrationLevels[currStats[j] - 1];
//     case 19:
//       return data.reloadTypes[currStats[j] - 1];
//     case 08:
//       if (currStats[j] == -1) {
//         return "Infinity";
//       } else {
//         return parseFloat(currStats[j].toFixed(2)).toString() + " m/s";
//       }
//     case 03:
//       return parseFloat(currStats[j].toFixed(2))
//         .toString()
//         .replace(".", " ~ ");
//     default:
//       return parseFloat(currStats[j].toFixed(2)).toString() + addUnit(j);
//   }

//   function addUnit(j) {
//     switch (j) {
//       case 07:
//       case 14:
//       case 15:
//       case 23:
//       case 24:
//       case 31:
//         return " ms";
//       case 27:
//       case 28:
//       case 25:
//       case 26:
//         return " m/s";
//       case 20:
//       case 21:
//       case 22:
//         return " s";
//       case 16:
//         return "%";
//       case 06:
//         return " Rounds";
//       case 05:
//         return " RPM";
//       default:
//         return "";
//     }
//   }
// }
// interpretion = currGun.gunname + common.interpretioner(currAttachments);
// if (currGun.recoil.hr.length > 2) {
//   chart = common.recoilHandler(
//     currGun.recoil.hr,
//     currGun.recoil.vr,
//     currRecoilArr[0],
//     currRecoilArr[1],
//     currRecoilArr[2]
//   );
//   recoilAvailable = true;
// } else {
//   recoilAvailable = false;
// }
// if (chart == "none") {
//   recoilAvailable = false;
// }
// if (chart == "err" || currAttachments == "err") {
//   hasError = true;
//   return "Cocaineeee";
// }
// const dmg =
//   common.damageHandler(
//     currDRM.damage,
//     currDRM.range,
//     1,
//     100,
//     60000 / currStats[5],
//     currStats[7],
//     currStats[6],
//     currStats[0]
//   ) || "```This should never happen```";
// out = [
//   currGun.description
//     ? {
//         name: "**Description:**",
//         value: "```\n" + currGun.description + "```",
//       }
//     : {},
//   { name: "**Damage Profile:**", value: dmg },
//   ...out,
// ];
// out = out.filter(x => x.value);
// return {
//   title: interpretion,
//   color: 5814783,
//   fields: out,
//   footer: {
//     text: "[OUTDATED] All data courtesy of Project Lighthouse 2.0 and CoDM Research Crew",
//     icon_url:
//       "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png",
//   },
// };
