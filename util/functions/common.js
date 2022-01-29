const data = require("../Data/data.json");
const QuickChart = require("quickchart-js");
const nmDt = require("../Data/aliases.json");
const weaponActualName = nmDt.weaponActualName;
const weaponAlliasName = nmDt.weaponAlliasName;
Object.defineProperty(String.prototype, "Simplify", {
  // Function to remove all characters except 0-9 and a-z
  // Eg "AK-47" -> "ak47"
  value: function Simplify() {
    return this.toLowerCase().replace(/[^0-9a-z]/g, "");
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "IsPositive", {
  // Function to check the number is positive or not
  value: function IsPositive() {
    if (this > 0) return true;
    else return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "IsNegative", {
  // Function to check the number is negative or not
  value: function IsNegative() {
    if (this < 0) return true;
    else return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "ToBool", {
  // Function to check the number is one or not
  value: function ToBool() {
    if (this == 1) return true;
    else return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "PlusHL", {
  value: function PlusHL() {
    if (this.toString()[0] == "-") {
      return parseFloat(this.toFixed(2)).toString();
    }
    return `+${parseFloat(this.toFixed(2)).toString()}`;
  },
  writable: true,
  configurable: true,
});

/* Function to fix the input statement */
function inpFixer(inpmsg) {
  const parts = PartSpliter(inpmsg);
  // parts will be an array
  //eg: ["fennec", "akimbo, mono"]
  nmDt.attachmentAlliasName[0].map((x, i) =>
    // x is the content of each index, i is the number of each index
    x.map(y => {
      if (parts[0].startsWith(y + " ") || parts[0].endsWith(" " + y)) {
        inpmsg =
          parts[0].replace(y + " ", "").replace(" " + y, "") +
          (parts[1] ? ", " : " + ") +
          nmDt.attachmentActualName[0][i];
      }
    })
  );
  // so it fking only fix akimbo and stopping power wtf
  return inpmsg;
}
// Function to split weapon name and the attachments from the input statement
function PartSpliter(inpmsg) {
  if (inpmsg.includes(" + ")) {
    // If the input statement has multiple attachments joined by "+", split them and output them as an array of strings [0] is the weapon name, [1] is the attachments
    // Eg: "M4A1 + Silencer + Flashlight" -> ["M4A1", "Silencer + Flashlight"]
    const out = inpmsg
      .split(" + ")
      .map(x => x.split("+"))
      .flat();
    return [out.shift(), out.join(", ")];
  }
  // If there is only one attachment, output it as an array of strings [0] is the weapon name, [1] is the attachment
  // Eg: "M4A1 with Flashlight" -> ["M4A1", "Flashlight"]
  return inpmsg.split(" with ");
}

function hasAttachments(inpmsg) {
  inpmsg = inpFixer(inpmsg);
  // If the input statement has multiple attachments joined by "+" or "with", split them and output them as an array of strings [0] is the weapon name, [1] is the attachments
  if (
    inpmsg.split(" with ").filter(x => x.Simplify()).length > 1 ||
    inpmsg.split(" + ").filter(x => x.Simplify()).length > 1
  ) {
    return true;
  }
  return false;
}

function isolator(inpmsg) {
  return PartSpliter(inpFixer(inpmsg));
}
// identifying the weapon
function weaponIdentifier(inpmsg) {
  const inpWeaponName = isolator(inpmsg)[0];
  // ["ak", "mono"] -> inpWeaponName: "ak"
  // if weapon name is too short, return the error
  if (inpWeaponName.length < 2) {
    return inpmsg.trim().length
      ? `The name ${inpmsg.trim()} is too short.`
      : "There isn't any weapon name.";
  }
  let probableWeapons = [];
  // Loop through all the weapons to find the probable weapons
  // Eg: "ak"
  for (let i = 0; i < data.cguns.length; i++) {
    if (inpWeaponName.Simplify() == data.cguns[i].gunname.Simplify()) {
      // if the simplified name of the weapon is the same as the weapon name in the database, return the only one stats object
      return JSON.parse(JSON.stringify(data.cguns[i]));
    } else if (
      data.cguns[i].gunname.Simplify().includes(inpWeaponName.Simplify())
    ) {
      // If the weapon name is included in the actual name of the weapon
      // push the weapon to the probableWeapons array
      probableWeapons.push(i);
    }
  }
  // if there is only one probable weapon, mean the gun has already been identified
  if (probableWeapons.length == 1) {
    // if there is only one probable weapon, return the only one stats object
    return JSON.parse(JSON.stringify(data.cguns[probableWeapons[0]]));
  }
  // continue loop when there is no identified weapons or there are more than one identfied weaponds
  // detecting aliases
  // getting total number of weapons that had added aliases
  for (let i = 0; i < weaponAlliasName.length; i++) {
    // getting the number of aliases of each weapon
    for (let j = 0; j < weaponAlliasName[i].length; j++) {
      // weaponAliases[i][j] is the each alias of each weapon
      // finding if simplified alias is same as input weapon name
      if (weaponAlliasName[i][j].Simplify() == inpWeaponName.Simplify()) {
        // if simplified alias is same as input weapon name
        // eg "mow" == "mow", run the loop
        for (let i2 = 0; i2 < data.cguns.length; i2++) {
          if (weaponActualName[i] == data.cguns[i2].gunname) {
            // use the actual name of the weapon to find the weapon
            return JSON.parse(JSON.stringify(data.cguns[i2]));
          }
        }
      }
    }
  }
  // removing duplicates in the array
  probableWeapons = [...new Set(probableWeapons)];
  // if there is only one probable weapon, return the only one stats object
  if (probableWeapons.length == 1)
    return JSON.parse(JSON.stringify(data.cguns[probableWeapons[0]]));
  else if (probableWeapons.length > 1) {
    // reply with the question of probable weapons
    return `Did you mean ${probableWeapons
      .map(x => data.cguns[x].gunname)
      .reduce((out, x, i) =>
        [out, x].join(i === probableWeapons.length - 1 ? "` or `" : "`, `")
      )}
      ?`;
  } else return `Couldn't identify the weapon: "${inpWeaponName}"`;
}
// identifying attachments and return array or error
function attachmentsIdentifier(inpmsg, attachmentsData, inpStats) {
  if (!hasAttachments(inpmsg)) return [];
  // no need for isolator because using slash commands, we get individual attachment
  let inputAttachmentsNames = isolator(inpmsg)[1]
    .split(/ & |, |,| and /)
    .filter(x => x);
  const tooSmall = inputAttachmentsNames.filter(x => x.length < 3);
  inputAttachmentsNames = inputAttachmentsNames.filter(x => !(x.length < 3));
  let errorMsgs = "",
    errors = [],
    unidentifined = [];

  if (inputAttachmentsNames.length == 0)
    errorMsgs += "\nAttachments are missing!\n";

  if (inputAttachmentsNames.length >= 10) return "Cocaineeeeee";

  // Can directly use args[] to return, no need for isolator, partExtractor, inpFixer
  const splitAttachmentsDataName = [],
    outAttachments = [];

  for (let i = 0; i < attachmentsData.length; i++) {
    splitAttachmentsDataName.push([
      ...new Set(
        attachmentsData[i].name
          .split(" ")
          .filter(x => x)
          .map(x => x.trim())
      ),
    ]);
    if (Math.max(...splitAttachmentsDataName.map(x => x.length)) > 6) {
      return "Cocaineeeeee";
    }
    for (let j = 0; j < splitAttachmentsDataName[i].length; j++) {
      splitAttachmentsDataName[i][j] =
        splitAttachmentsDataName[i][j].Simplify();
    }
  }

  for (let i = 0; i < inputAttachmentsNames.length; i++) {
    var probables = [];
    var splitInputAttachmentsName = inputAttachmentsNames[i]
      .split(" ")
      .filter(x => x);

    function finder() {
      for (let j = 0; j < splitAttachmentsDataName.length; j++) {
        for (let i2 = 0; i2 < splitAttachmentsDataName[j].length; i2++) {
          for (let i3 = 0; i3 < splitInputAttachmentsName.length; i3++) {
            if (
              splitAttachmentsDataName[j][i2].includes(
                splitInputAttachmentsName[i3].Simplify()
              )
            ) {
              let probablePushed = false;
              for (let i4 = 0; i4 < probables.length; i4++) {
                if (!probables[i4].includes(j)) {
                  probables[i4].push(j);
                  probablePushed = true;
                  break;
                }
              }
              if (!probablePushed) {
                probables.push([j]);
              }
            }
          }
        }
      }
    }
    finder();
    if (
      (inputAttachmentsNames[i].includes(" rounds mag") ||
        inputAttachmentsNames[i].includes(" round mag")) &&
      inputAttachmentsNames[i].startsWith(
        inputAttachmentsNames[i].replace(/\D/g, "")
      )
    ) {
      var tmp1 = parseInt(inputAttachmentsNames[i]);
      const tmp2 = attachmentsData.filter(
        x =>
          x.type === 8 && x.effects[27] + x.effects[28] + inpStats[17] === tmp1
      );
      if (tmp2.length === 1) {
        outAttachments.push(tmp2[0]);
        continue;
      }
    }
    if (
      probables.length === 0 ||
      probables[probables.length - 1].length !== 1 ||
      probables.length < splitInputAttachmentsName.length
    ) {
      probables = [];
      splitInputAttachmentsName.map((x, i5) =>
        nmDt.attachmentAlliasName[1].map((y, i6) =>
          y.map(z => {
            if (x.Simplify() === z.Simplify()) {
              splitInputAttachmentsName[i5] = nmDt.attachmentActualName[1][i6];
            }
          })
        )
      );
      splitInputAttachmentsName = splitInputAttachmentsName
        .join(" ")
        .split(" ")
        .filter(x => x);
      finder();
      if (
        probables.length === 0 ||
        probables[probables.length - 1].length !== 1 ||
        probables.length < splitInputAttachmentsName.length
      ) {
        probables = [];
        splitInputAttachmentsName = inputAttachmentsNames[i]
          .split(" ")
          .filter(x => x);
        finder();
      }
    }

    if (probables.length === 0) {
      unidentifined.push(inputAttachmentsNames[i]);
      continue;
    }

    var curr = probables[probables.length - 1];
    const temp1 = probables[probables.length - 1].filter(
      x =>
        attachmentsData[x].name.Simplify() ==
        inputAttachmentsNames[i].Simplify()
    );
    const temp2 = probables[probables.length - 1].filter(
      x =>
        splitAttachmentsDataName[x].length == splitInputAttachmentsName.length
    );
    /**/ if (temp1.length === 1 && temp2.length !== 1) {
      probables.push([temp1]);
    } else if (temp1.length !== 1 && temp2.length === 1) {
      probables.push([temp2]);
    } else if (
      temp1.length === 1 &&
      temp2.length === 1 &&
      temp1[0] == temp2[0]
    ) {
      probables.push([temp1]);
    }
    if (
      probables[probables.length - 1].length != 1 ||
      probables.length < splitInputAttachmentsName.length
    ) {
      errors.push(
        "`" +
          curr
            .map(x => attachmentsData[x].name)
            .reduce((out, x, i) =>
              [out, x].join(i === curr.length - 1 ? "` or `" : "`, `")
            ) +
          '` by `"' +
          inputAttachmentsNames[i] +
          '"`'
      );
    }
    outAttachments.push(attachmentsData[probables[probables.length - 1][0]]);
  }
  const outAttachmentsTypes = outAttachments.map(x => x.type - 1),
    t1 = outAttachments
      .map(x => x.effects[35])
      .reduce((t, x) => t + x, 0)
      .toString()
      .padStart(11, "0")
      .toString()
      .split("")
      .map((x, i) =>
        parseInt(x) !== 0 && outAttachmentsTypes.includes(i) ? parseInt(i) : -1
      )
      .filter(x => x !== -1);

  errorMsgs += t1.length
    ? "Can't equip `" +
      t1
        .map(x => data.attachmentTypes[x])
        .reduce((out, x, i, a) =>
          [out, x].join(i === a.length - 1 ? "` or `" : "`, `")
        ) +
      "` with " +
      outAttachments
        .filter(x => x.effects[35])
        .map(x => x.name)
        .reduce((out, x, i, a) =>
          [out, x].join(i === a.length - 1 ? " and " : ", ")
        )
    : "";
  errorMsgs += errors.length ? `\nDid you mean ${errors.join(";\n")}?\n` : "";
  errorMsgs += unidentifined.length
    ? `\nCouldn't identify the attachment(${
        unidentifined.length === 1 ? "" : "s"
      }): \`"${unidentifined.join('"`, `"')}"\`\n`
    : "";
  errorMsgs +=
    outAttachments.length > 5 ? "\nCan't equip more than 5 attachments!\n" : "";
  errorMsgs += outAttachments.filter((x, i, a) => a.indexOf(x) !== i).length
    ? "\nMultiple of same attachments found!\n"
    : "";
  errorMsgs += outAttachments
    .map(x => x.type)
    .filter((x, i, a) => a.indexOf(x) !== i).length
    ? "\nMultiple of attachments the same type found!\n"
    : "";
  errorMsgs += tooSmall.length
    ? "\nThe name" +
      (tooSmall.length === 1 ? "" : "s") +
      ': `"' +
      tooSmall.reduce((out, x, i) =>
        [out, x].join(i === curr.length - 1 ? '"` and `"' : '"`, `"')
      ) +
      '"` ' +
      (tooSmall.length === 1 ? "is" : "are") +
      " too short\n"
    : "";
  return errorMsgs ? errorMsgs.trim() : outAttachments;
}
// console.log(attachmentsIdentifier("chopper with heavy handle, red sight, granulated", data.cguns[38].aments)); makeError();
// console.log(attachmentsIdentifier("ak + 5mw lazer", data.cguns[0].aments)); makeError();
// console.log(attachmentsIdentifier("117 + 40 round mag", data.cguns[0].aments, data.cguns[0].stats)); makeError();
// console.log(attachmentsIdentifier("117 + rtc muzzle brake, rubberized griptape, tac lazer sight, 40 round mag, no stock", data.cguns[1].aments)); makeError();

function damageHandler(
  currDmgs,
  currRngs,
  damageMulti,
  hp,
  tbs,
  tbb,
  bib,
  pellets
) {
  currDmgs = [...currDmgs];
  currRngs = [...currRngs];

  currRngs = currRngs.filter(x => x < 100).map(x => Math.round(x));
  currDmgs.length = currRngs.length + 1;
  currDmgs = currDmgs.map(x => Math.round(x * damageMulti));
  let currSTKs = currDmgs.map(x => stk(x)),
    currTTKs = currDmgs.map(x => ttk(x)),
    currPDmg = null,
    n = Math.max(...currTTKs.map(x => x.toString().length));
  n = n < 3 ? 3 : n;
  function worker1(inp) {
    return inp.map(x => x.toString().padStart(n)).join(" -- ") + "\n";
  }
  function worker2(inp) {
    return (
      "".padStart(n + 1) +
      inp.map(x => x.toString().padStart(2)).join("".padStart(n + 2)) +
      "\n"
    );
  }
  function stk(dmg) {
    let out;
    if (!pellets) {
      out = Math.ceil(hp / dmg);
    } else {
      out = Math.ceil(hp / (dmg * pellets));
    }
    out = out == Infinity ? "∞" : out;
    return out;
  }
  function ttk(dmg) {
    const stkVal = stk(dmg);
    if (stkVal == "∞") {
      return stkVal;
    }
    if (!bib) {
      return Math.round((stkVal - 1) * tbs);
    }
    let out = 0;
    if (dmg > 0) {
      if (stkVal % bib == 0) {
        for (var i = 0; i < Math.floor(stkVal / bib) - 1; i++) {
          out += tbs * (bib - 1) + tbb;
        }
        out = out + tbs * (bib - 1);
      } else if (stkVal % bib != 0) {
        for (var i = 0; i <= Math.floor(stkVal / bib) - 1; i++) {
          out += tbs * (bib - 1) + tbb;
        }
        for (var i = 0; i < (stkVal % bib) - 1; i++) {
          out += tbs;
        }
      }
      out = Math.round(out);
      if (out == Infinity) {
        return "∞";
      }
    } else {
      out = "No";
    }
    return out;
  }
  if (pellets) {
    currPDmg = currDmgs.map(x => x + "×" + pellets);
    n = Math.max(...currPDmg.map(x => x.toString().length));
  }
  return (
    "```swift\n" +
    "Damage : " +
    worker1(currPDmg || currDmgs) +
    (pellets ? "Total : " + worker1(currDmgs.map(x => x * pellets)) : "") +
    "STK    : " +
    worker1(currSTKs) +
    "TTK    : " +
    worker1(currTTKs) +
    "Range  : " +
    (currRngs.length ? worker2(currRngs) : worker1(["∞"])) +
    "```"
  );
}
// console.log(damageHandler([30, 25, 20], [10, 20], 1, 100, 60000 / 720, 0, 0));  makeError();
// console.log(damageHandler([ 33, 23 ], [ 39 ], 1, 100, 109.0909090909091, 0, 0 )); makeError();

function recoilHandler(
  xRecoil,
  yRecoil,
  xMultiplier,
  yMultiplier,
  bulletCount
) {
  if (xRecoil.length != yRecoil.length) {
    return "err";
  }
  const recoilLength = xRecoil.length;
  if (recoilLength == 0) {
    return "none";
  }
  const recoilPattern = [
    {
      x: 0,
      y: 0,
    },
  ];
  let recoilObj;
  for (let i = 0; i < bulletCount; i++) {
    const xContinuationVal =
      xRecoil[recoilLength - 1] - xRecoil[recoilLength - 2];
    const yContinuationVal =
      yRecoil[recoilLength - 1] - yRecoil[recoilLength - 2];
    if (i < recoilLength) {
      recoilObj = {
        x: xRecoil[i] * (1 + xMultiplier / 100),
        y: yRecoil[i] * (1 + yMultiplier / 100),
      };
    } else {
      recoilObj = {
        x:
          (recoilPattern[recoilPattern.length - 1].x + xContinuationVal) *
          xMultiplier,
        y:
          (recoilPattern[recoilPattern.length - 1].y + yContinuationVal) *
          yMultiplier,
      };
    }
    recoilPattern.push(recoilObj);
  }
  const chart = new QuickChart();
  chart
    .setConfig({
      type: "scatter",
      data: {
        datasets: [
          {
            data: recoilPattern,
            showLine: true,
            fill: false,
            pointRadius: 3,
            backgroundColor: "rgba(056,205,255,1.00)", // "#38CDFF" fully transparent
            borderColor: "rgba(056,205,255,0.75)", // "#38CDFF" 75% transparent
          },
        ],
      },
      options: {
        plugins: {
          backgroundImageUrl: "https://i.imgur.com/jFAFaWF.png",
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
                min: 0,
                max: 5050,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: false,
                min: -4495,
                max: 4495,
              },
            },
          ],
        },
      },
    })
    .setWidth(1780)
    .setHeight(1000);

  return chart;
}

function updateStatswithEffects(inpEffects, inpStats) {
  const l = inpStats[18] / inpStats[17];
  const outStats = [...inpStats];

  var inpStatsarr = [1, 2, 5, 11, 14, 15, 20, 21, 22, 26, 27, 31];
  var inpEfecsarr = [17, 18, 16, 19, 1, 10, 14, 14, 14, 6, 7, 42]; // Efecs is short for Effects
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] *= (inpEffects[inpEfecsarr[i]] + 100) / 100;
    }
  }
  var inpStatsarr = [3, 4, 16, 28, 29, 30];
  var inpEfecsarr = [20, 38, 0, 39, 40, 41];
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] = inpEffects[inpEfecsarr[i]];
    }
  }
  var inpStatsarr = [0, 17, 25];
  var inpEfecsarr = [29, 27, 9];
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] += inpEffects[inpEfecsarr[i]];
    }
  }

  if (inpEffects[4] != 0) {
    outStats[10] = 11 - (11 - inpStats[10]) * (1 + inpEffects[4] / 100); //
  }
  if (inpEffects[43] != 0 && inpStats[8] != -1) {
    outStats[8] *= (inpEffects[43] + 100) / 100;
  }
  if (inpEffects[16] != 0) {
    outStats[7] *= inpEffects[16] / -100 + 1;
  }
  outStats[18] = inpStats[17] * l;
  return outStats;
}

function attachmentHandler(currEffects, currStats) {
  const pos = [],
    neg = [],
    atr = [];
  if (currEffects[0] > currStats[16]) {
    pos.push(
      currEffects[0] +
        "% zoom (+" +
        (currEffects[0] - currStats[16]) +
        "% zoom)"
    );
  } else if (currEffects[0] != 0 && currEffects[0] != currStats[16]) {
    neg.push(
      currEffects[0] +
        "% zoom (-" +
        (currStats[16] - currEffects[0]) +
        "% zoom)"
    );
  }
  if (currEffects[0] != 0 && currStats[16] <= 110) {
    atr.push("Easier to Aim");
  }
  negGood1(1, "ADS time");
  negGood1(2, "Vertical Recoil");
  negGood1(3, "Horizontal Recoil");
  negGood1(4, "Bullet Spread");
  negGood1(5, "Moving Bullet Spread");
  posGood1(6, "Mobility");
  posGood1(7, "ADS Mobility");
  negGood1(8, "Recoil when Crouched or Prone");
  posGood1(9, "Sprint Mobility");
  negGood1(10, "Sprint to Fire Time");
  negGood1(11, "Flinch");
  negGood1(12, "Hipfire Spread");
  posGood1(13, "Damage Range");
  negGood1(14, "Reload Time");
  posGood1(15, "Headshot Damage");
  posGood1(16, "Rate of Fire");
  posGood1(17, "Detonation Range");
  posGood1(18, "Explosion Radius");
  negGood1(19, "Idle Sway");
  if (currEffects[20] > currStats[3]) {
    pos.push(
      currEffects[20].ToString().Replace(".", " ~ ") + " Explosion Damage"
    );
  } else if (currEffects[20] != 0 && currEffects[20] != currStats[3]) {
    neg.push(
      currEffects[20].ToString().Replace(".", " ~ ") + " Explosion Damage"
    );
  }
  atrPush3(21, "Visible Laser when not ADS-ed");
  atrPush3(22, "Visible Laser when ADS-ed");
  atrPush3(23, "Visible Laser");
  atrPush3(24, "Silenced Gunfire");
  atrPush3(25, "Hidden Muzzle Flash");
  posGood2(27, "Rounds/Mag");
  posGood2(28, "Rounds/Tube");
  posGood2(29, "Pellets per Shot");
  posGood2(30, "Damage Over Time");
  atrPush3(32, "Reworked ADS");
  atrPush3(33, "Faster Melee QTE");
  if (currEffects[35]) {
    atr.push(
      "Can Not use " +
        currEffects[35]
          .toString()
          .padStart(11, "0")
          .toString()
          .split("")
          .map((x, i) => (parseInt(x) !== 0 ? data.attachmentTypes[i] : 0))
          .filter(x => x)
    );
  }
  atrPush3(36, "Can't ADS");
  if (currEffects[37] != 0) {
    atr.push("New Lethality Profile");
  }
  if (currEffects[38] != 0 && currEffects[38] < currStats[4]) {
    pos.push("Turns to " + data.firingModes[currEffects[38] - 1]);
  } else if (currEffects[38] != 0 && currEffects[38] != currStats[4]) {
    neg.push("Turns to " + data.firingModes[currEffects[38] - 1]);
  }
  posGood2(39, "Tick Damage");
  posGood2(40, "Ticks");
  negGood2(41, "ms Tick Interval");
  posGood2(42, "Breath Holding Time");
  posGood1(43, "Bullet Speed");
  if (currEffects[44] == 1) {
    atr.push("Higher Penetraion Damage");
  } else if (currEffects[44] == -1) {
    atr.push("Lower Penetraion Damage");
  }
  posGood2(45, `Round ${currEffects[45] - 1 ? "s" : ""} in Reserve`);

  function posGood1(i, ext) {
    if (currEffects[i].IsPositive()) {
      pos.push(currEffects[i].PlusHL() + "% " + ext);
    } else if (currEffects[i].IsNegative()) {
      neg.push(currEffects[i].PlusHL() + "% " + ext);
    }
  }

  function negGood1(i, ext) {
    if (currEffects[i].IsNegative()) {
      pos.push(currEffects[i].PlusHL() + "% " + ext);
    } else if (currEffects[i].IsPositive()) {
      neg.push(currEffects[i].PlusHL() + "% " + ext);
    }
  }

  function posGood2(i, ext) {
    if (currEffects[i].IsPositive()) {
      pos.push(currEffects[i].PlusHL() + " " + ext);
    } else if (currEffects[i].IsNegative()) {
      neg.push(currEffects[i].PlusHL() + " " + ext);
    }
  }

  function negGood2(i, ext) {
    if (currEffects[i].IsNegative()) {
      pos.push(currEffects[i].PlusHL() + " " + ext);
    } else if (currEffects[i].IsPositive()) {
      neg.push(currEffects[i].PlusHL() + " " + ext);
    }
  }

  function atrPush3(i, ext) {
    if (currEffects[i].ToBool()) {
      atr.push(ext);
    }
  }
  // Return the attributes when there is and use algorithms to join them
  return [
    pos.length
      ? {
          name: "**Positives:**",
          value: `\`\`\`ini\n[${pos.join("]\n[")}]\n\`\`\``,
          inline: true,
        }
      : 0,
    neg.length
      ? {
          name: "**Negatives:**",
          value: `\`\`\`css\n[${neg.join("]\n[")}]\n\`\`\``,
          inline: true,
        }
      : 0,
    atr.length
      ? {
          name: "**Attributes:**",
          value: `\`\`\`fix\n[${atr.join("]\n[")}]\n\`\`\``,
        }
      : 0,
  ].filter(x => x);
}

function interpretioner(inpAttachments) {
  return inpAttachments.length
    ? " with " + inpAttachments.map(x => x.name).join(", ")
    : "";
}

function totaler(inpAttachments) {
  const totalEffects = inpAttachments[0].effects;
  for (let j = 1; j < inpAttachments.length; j++) {
    for (let i2 = 0; i2 < totalEffects.length; i2++) {
      totalEffects[i2] += inpAttachments[j].effects[i2];
    }
  }
  return totalEffects;
}

function makeError() {
  undefined.split("L");
}

module.exports = {
  weaponIdentifier,
  attachmentsIdentifier,
  recoilHandler,
  attachmentHandler,
  updateStatswithEffects,
  makeError,
  interpretioner,
  damageHandler,
  isolator,
  totaler,
  hasAttachments,
};
