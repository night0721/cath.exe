const common = require("../../util/functions/common");
const data = require("../../util/Data/data.json");
const { EmbedBuilder } = require("discord.js");

let currGun,
  currStats,
  currAttachments,
  currRecoilArr,
  currDRM,
  interpretion,
  recoilAvailable,
  chart,
  hasError;
module.exports = {
  name: "stats",
  description: "Check gun statistics",
  usage: "(Gun)",
  category: "CODM",
  options: [
    {
      type: 3,
      name: "gun_name",
      description: "Name of the gun",
      required: true,
      choices: [],
    },
    {
      type: 3,
      name: "1st_attchment",
      description: "First attachment",
    },
    {
      type: 3,
      name: "2nd_attchment",
      description: "Second attachment",
    },
    {
      type: 3,
      name: "3rd_attchment",
      description: "Third attachment",
    },
    {
      type: 3,
      name: "4th_attchment",
      description: "Forth attachment",
    },
    {
      type: 3,
      name: "5th_attchment",
      description: "Fifth attachment",
    },
  ],
  run: async (client, interaction, args) => {
    repEmb = null;
    recoilAvailable = false;
    hasError = false;
    if (args.length == 1)
      repEmb = statsHandler(args.join(" ").replace("\n", " "));
    else repEmb = statsHandler(args.join(" + ").replace("\n", " "));
    if (hasError) {
      interaction.followUp({
        content: `**${repEmb || "An error has occured"}**`,
      });
    } else {
      if (recoilAvailable) {
        repEmb.fields.push({
          name: "**Recoil Graph**",
          value:
            "```\nThe Recoil graph below is dynamic (change based on attachment equipped)```",
        });
        const recoilImageLink = await chart.getShortUrl();
        repEmb.image = { url: recoilImageLink };
      }
      interaction.followUp({ embeds: [new EmbedBuilder(repEmb)] });
    }
  },
};

function inpHandler(inpmsg) {
  statsHandler(inpmsg.split("+")[0]);
}

function statsHandler(inpmsg) {
  let statsNames = [
      "Pellets", //0
      "Detonation Range", //1
      "Explosion Radius", //2
      "Explosion Damage", //3
      "Firing Mode", //4
      "Rate of Fire", //5
      "Bullet in Burst", //6
      "Time Between Burst", //7
      "Bullet Speed", //8
      "Penetration Level", //9
      "Bullet Spread", //10
      "Idle Sway", //11
      "Hipfire Pellet Spread", //12
      "ADS Pellet Spread", //13
      "ADS Time", //14
      "Sprint-to-Fire Time", //15
      "ADS Zoom", //16
      "Magazine", //17
      "Reserve", //18
      "Reload Type", //19
      "Cancel Reload Time", //20
      "Reload Time", //21
      "Full Reload Time", //22
      "Drop Time", //23
      "Raise Time", //24
      "Sprinting Speed", //25
      "Walking Speed", //26
      "Straifing Speed", //27
      "Damage per Tick", //28
      "Number of Ticks", //29
      "Time Between Ticks", //30
      "Breath Hold Time", //31
      "shouldNeverHappen0",
      "shouldNeverHappen1",
      "shouldNeverHappen2",
      "shouldNeverHappen3",
      "shouldNeverHappen4",
    ],
    out = [];

  currGun = common.weaponIdentifier(inpmsg);
  if (typeof currGun == "string") {
    hasError = true;
    return currGun;
  }
  currStats = currGun.stats;
  currDRM = currGun.drm[0]; // base mag. currGun.drm[1] for more vairents
  currAttachments = [];
  currAttachments = common.attachmentsIdentifier(inpmsg, currGun);
  if (typeof currAttachments == "string") {
    hasError = true;
    return currAttachments;
  }
  currRecoilArr = [1, 1, currGun.stats[17]];
  if (currAttachments.length != 0) {
    const totalEffects = common.totaler(currAttachments);

    currStats = common.updateStatswithEffects(totalEffects, currStats);
    currRecoilArr = [totalEffects[2], totalEffects[3], currGun.stats[17]]; // must happen after currStats update
    currDRM = currGun.drm[totalEffects[37]];
    currDRM.range = currDRM.range.map(x =>
      Math.round(x * (1 + totalEffects[13] / 100))
    );
    out = common.attachmentHandler(totalEffects, currStats);
  }
  function statsWorker() {
    if (currStats[19] === 2) {
      currStats[21] =
        currStats[20] + currStats[21] * currStats[17] + currStats[22];
      currStats[20] = 0;
      currStats[22] = 0;
    }
    currStats[25] = (currStats[25] * currStats[26]) / 100;

    const outReady = currStats.map((x, i) =>
      x ? statsNames[i].padEnd(24) + ":".padEnd(3) + beautifier(i) : ""
    );
    out = [
      ...[
        "Basic Stats",
        "ADS Stats",
        "Bullet Stats",
        "Magazine",
        "Handling Stats",
        "Mobility Stats",
        "Miscellaneous Stats",
      ].map((x, i) =>
        fieldMaker(
          x,
          [
            [04, 05, 09],
            [14, 16, 11, 31],
            [00, 06, 07, 08, 10, 12, 13],
            [17, 18, 19, 20, 21, 22],
            [23, 24],
            [25, 26, 27, 15],
            [28, 29, 30, 01, 02, 03],
          ][i]
        )
      ),
      ...out,
    ];
    function fieldMaker(inpName, inpIndx) {
      inpIndx = inpIndx.filter(x => outReady[x]);
      return inpIndx.length
        ? {
            name: `**${inpName}**`,
            value: `\`\`\`\n${inpIndx.map(x => outReady[x]).join("\n")}\`\`\``,
          }
        : "";
    }
  }
  statsWorker();

  function beautifier(j) {
    switch (j) {
      case 04:
        return data.firingModes[currStats[j] - 1];
      case 09:
        return data.penetrationLevels[currStats[j] - 1];
      case 19:
        return data.reloadTypes[currStats[j] - 1];
      case 08:
        if (currStats[j] == -1) {
          return "Infinity";
        } else {
          return parseFloat(currStats[j].toFixed(2)).toString() + " m/s";
        }
      case 03:
        return parseFloat(currStats[j].toFixed(2))
          .toString()
          .replace(".", " ~ ");
      default:
        return parseFloat(currStats[j].toFixed(2)).toString() + addUnit(j);
    }

    function addUnit(j) {
      switch (j) {
        case 7:
        case 14:
        case 15:
        case 23:
        case 24:
        case 31:
          return " ms";
        case 25:
        case 26:
        case 27:
        case 28:
          return " m/s";
        case 20:
        case 21:
        case 22:
          return " s";
        case 16:
          return "%";
        case 6:
          return " Rounds";
        case 5:
          return " RPM";
        default:
          return "";
      }
    }
  }
  interpretion = currGun.gunname + common.interpretioner(currAttachments);
  if (currGun.recoil.hr.length > 2) {
    chart = common.recoilHandler(
      currGun.recoil.hr,
      currGun.recoil.vr,
      currRecoilArr[0],
      currRecoilArr[1],
      currRecoilArr[2]
    );
    recoilAvailable = true;
  } else recoilAvailable = false;

  if (chart == "none") recoilAvailable = false;
  if (chart == "err") hasError = true;

  const dmg =
    common.damageHandler(
      currDRM.damage,
      currDRM.range,
      1,
      100,
      60000 / currStats[5],
      currStats[7],
      currStats[6],
      currStats[0]
    ) || "```This should never happen```";
  out = [
    currGun.description
      ? {
          name: "**Description:**",
          value: `\`\`\`\n${currGun.description}\`\`\``,
        }
      : {},
    { name: "**Damage Profile:**", value: dmg },
    ...out,
  ];
  out = out.filter(x => x.value);
  return {
    title: interpretion,
    color: 5814783,
    fields: out,
    footer: {
      text: "[OUTDATED] All data courtesy of Project Lighthouse 2.0 and CoDM Research Crew",
      icon_url:
        "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png",
    },
  };
}
