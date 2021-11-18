// const common = require("../../util/functions/common");
// const data = require("../../util/Data/data.json");
// const Discord = require("discord.js");

// // Ignore this for now, it's just a outline of what needs to be changed to fit the new data from Mongo

// var currGun,
//   currStats,
//   currAttachments,
//   currRecoilArr,
//   currDRM,
//   interpretion,
//   recoilAvailable,
//   chart,
//   hasError;
// var errMsg = "*Generic placeholder error message*";
// module.exports = {
//   name: "stats",
//   description: "Check gun stats",
//   usage: "(Gun)",
//   category: "CODM",
//   options: [
//     {
//       type: 3,
//       name: "gun_name",
//       description: "Name of the gun",
//       required: true,
//       choices: [],
//     },
//     {
//       type: 3,
//       name: "1st_attchment",
//       description: "First attachment",
//     },
//     {
//       type: 3,
//       name: "2nd_attchment",
//       description: "Second attachment",
//     },
//     {
//       type: 3,
//       name: "3rd_attchment",
//       description: "Third attachment",
//     },
//     {
//       type: 3,
//       name: "4th_attchment",
//       description: "Forth attachment",
//     },
//     {
//       type: 3,
//       name: "5th_attchment",
//       description: "Fifth attachment",
//     },
//   ],
//   run: async (client, interaction, args) => {
//     recoilAvailable = false;
//     hasError = false;
//     console.log(args);
//     var repEmb = statsHandler(args.join(" ").replace("\n", " "));
//     if (hasError) {
//       interaction.followUp({ embeds: [repEmb] });
//     }
//     if (recoilAvailable) {   //we will use the old recoil graphs untill we can find someone to help update it.
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
// };

// // Don't need (use: to split the input by + (which was used to add attachments before slash commands))
// function inpHandler(inpmsg) {
//   statsHandler(inpmsg.split("+")[0]);
// }

// function statsHandler(inpmsg) {
//     // Don't need here, use from json (will be easier to add stuff in future)
//   var statsNames = [
//       "Pellets",
//       "Detonation Range",
//       "Explosion Radius",
//       "Explosion Damage",
//       "Firing Mode",
//       "Rate of Fire",
//       "Bullet in Burst",
//       "Time Between Burst",
//       "Bullet Speed",
//       "Penetration Level",
//       "Bullet Spread",
//       "Idle Sway",
//       "Hipfire Pellet Spread",
//       "ADS Pellet Spread",
//       "ADS Time",
//       "Sprint-to-Fire Time",
//       "ADS Zoom",
//       "Magazine",
//       "Reserve",
//       "Reload Type",
//       "Cancel Reload Time",
//       "Reload Time",
//       "Full Reload Time",
//       "Drop Time",
//       "Raise Time",
//       "Sprinting Speed",
//       "Walking Speed",
//       "Straifing Speed",
//       "Damage per Tick",
//       "Number of Ticks",
//       "Time Between Ticks",
//       "Breath Hold Time",
//       "shouldNeverHappen0",
//       "shouldNeverHappen1",
//       "shouldNeverHappen2",
//       "shouldNeverHappen3",
//       "shouldNeverHappen4",
//     ],
//     out = [];   // This stores all the feilds

//   currGun = common.weaponIdentifier(inpmsg);  // inpMsg should be replaced by args[0] (i.e the gun name)
//   if (typeof currGun == "string") {
//     hasError = true;
//     return currGun;
//   }
//   currStats = currGun.stats;    // access stats using mongo
//   currDRM = currGun.drm[0];     // Same ^
//   currAttachments = [];
//   currAttachments = common.attachmentsIdentifier(
//     inpmsg,                     // this was supposed to be the full input msg, but we need to madify it so it just gets a attachment name and uses it so no need for isolator
//     currGun.aments,             //Sends the stats for all the attachment of that gun
//     currStats                   //sends the base stat of the gun for calculation
//   );
//   if (typeof currAttachments == "string") {
//     hasError = true;
//     return currAttachments;
//   }
//   currRecoilArr = [1, 1, currGun.stats[17]];
//   if (currAttachments.length != 0) {
//     var totalEffects = common.totaler(currAttachments);

//     currStats = common.updateStatswithEffects(totalEffects, currStats);
//     currRecoilArr = [totalEffects[2], totalEffects[3], currGun.stats[17]]; //must happen after currStats update
//     currDRM = currGun.drm[totalEffects[37]];
//     currDRM.range = currDRM.range.map(x =>
//       Math.round(x * (1 + totalEffects[13] / 100))
//     );
//     out = common.attachmentHandler(totalEffects, currStats);
//   }
//   function statsWorker() {
//     if (currStats[19] === 2) {
//       currStats[21] =
//         currStats[20] + currStats[21] * currStats[17] + currStats[22];
//       currStats[20] = 0;
//       currStats[22] = 0;
//     }
//     currStats[25] = (currStats[25] * currStats[26]) / 100;

//     var outReady = currStats.map((x, i) =>
//       x ? statsNames[i].padEnd(24) + ":".padEnd(3) + beautifier(i) : ""
//     );
//     out = [
//       ...[
//         "Basic Stats",
//         "ADS Stats",
//         "Bullet Stats",
//         "Magazine",
//         "Handling Stats",
//         "Mobility Stats",
//         "Miscellaneous Stats",
//       ].map((x, i) =>
//         fieldMaker(
//           x,
//           [
//             [04, 05, 09],
//             [14, 16, 11, 31],
//             [00, 06, 07, 08, 10, 12, 13],
//             [17, 18, 19, 20, 21, 22],
//             [23, 24],
//             [25, 26, 27, 15],
//             [28, 29, 30, 01, 02, 03],
//           ][i]
//         )
//       ),
//       ...out,
//     ];
//     function fieldMaker(inpName, inpIndx) {
//       inpIndx = inpIndx.filter(x => outReady[x]);
//       return inpIndx.length
//         ? {
//             name: "**" + inpName + "**",
//             value: "```\n" + inpIndx.map(x => outReady[x]).join("\n") + "```",
//           }
//         : "";
//     }
//   }
//   statsWorker();

//   function beautifier(j) {
//     switch (j) {
//       case 04:
//         return data.firingModes[currStats[j] - 1];
//       case 09:
//         return data.penetrationLevels[currStats[j] - 1];
//       case 19:
//         return data.reloadTypes[currStats[j] - 1];
//       case 08:
//         if (currStats[j] == -1) {
//           return "Infinity";
//         } else {
//           return parseFloat(currStats[j].toFixed(2)).toString() + " m/s";
//         }
//       case 03:
//         return parseFloat(currStats[j].toFixed(2))
//           .toString()
//           .replace(".", " ~ ");
//       default:
//         return parseFloat(currStats[j].toFixed(2)).toString() + addUnit(j);
//     }

//     function addUnit(j) { //Needs modification to match the new layout
//       switch (j) {
//         case 07:
//         case 14:
//         case 15:
//         case 23:
//         case 24:
//         case 31:
//           return " ms";
//         case 27:
//         case 28:
//         case 25:
//         case 26:
//           return " m/s";
//         case 20:
//         case 21:
//         case 22:
//           return " s";
//         case 16:
//           return "%";
//         case 06:
//           return " Rounds";
//         case 05:
//           return " RPM";
//         default:
//           return "";
//       }
//     }
//   }
//   interpretion = currGun.gunname + common.interpretioner(currAttachments);
//   if (currGun.recoil.hr.length > 2) {
//     chart = common.recoilHandler(
//       currGun.recoil.hr,
//       currGun.recoil.vr,
//       currRecoilArr[0],
//       currRecoilArr[1],
//       currRecoilArr[2]
//     );
//     recoilAvailable = true;
//   } else {
//     recoilAvailable = false;
//   }
//   if (chart == "none") {
//     recoilAvailable = false;
//   }
//   if (chart == "err" || currAttachments == "err") {
//     hasError = true;
//     return "Cocaineeee";
//   }
//   var dmg =
//     common.damageHandler(
//       currDRM.damage,
//       currDRM.range,
//       1,
//       100,
//       60000 / currStats[5],
//       currStats[7],
//       currStats[6],
//       currStats[0]
//     ) || "```This should never happen```";
//   out = [
//     currGun.description
//       ? {
//           name: "**Description:**",
//           value: "```\n" + currGun.description + "```",
//         }
//       : {},
//     { name: "**Damage Profile:**", value: dmg },
//     ...out,
//   ];
//   out = out.filter(x => x.value);
//   return {
//     title: interpretion,
//     color: 5814783,
//     fields: out,
//     footer: {
//       text: "All data courtesy of Round Table",
//       icon_url:
//         "", //update the icon later
//     },
//   };
// }
