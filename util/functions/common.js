const data = require("../Data/data.json");
const guns = data.cguns;
const QuickChart = require("quickchart-js");
const nmDt = require("../Data/aliases.json");
var weaponActualName = nmDt.weaponActualName;
var weaponAlliasName = nmDt.weaponAlliasName;
Object.defineProperty(String.prototype, "Simplify", {
  value: function Simplify() {
    return this.toLowerCase().replace(/[^0-9a-z]/g, "");
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "IsPositive", {
  value: function IsPositive() {
    if (this > 0) {
      return true;
    }
    return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "IsNegative", {
  value: function IsNegative() {
    if (this < 0) {
      return true;
    }
    return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "ToBool", {
  value: function ToBool() {
    if (this == 1) {
      return true;
    }
    return false;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Number.prototype, "PlusHL", {
  value: function PlusHL() {
    if (this.toString()[0] == "-") {
      return parseFloat(this.toFixed(2)).toString();
    }
    return "+" + parseFloat(this.toFixed(2)).toString();
  },
  writable: true,
  configurable: true,
});

function weaponIdentifier(inpmsg) {
  var inpWeaponName = isolator(inpmsg)[0];
  if (inpWeaponName.length < 2) {
    return inpmsg
      ? "The name `" + inpmsg + "` is too short."
      : "Empty weapon name";
  }
  var probableWeapons = [];
  for (let i = 0; i < guns.length; i++) {
    if (inpWeaponName.Simplify() == guns[i].gunname.Simplify()) {
      return guns[i];
    } else if (guns[i].gunname.Simplify().includes(inpWeaponName.Simplify())) {
      probableWeapons.push(i);
    }
  }

  if (probableWeapons.length == 1) {
    return guns[probableWeapons[0]];
  }

  for (let i = 0; i < weaponAlliasName.length; i++) {
    for (let j = 0; j < weaponAlliasName[i].length; j++) {
      /*if (weaponAlliasName[i][j].Simplify().includes(inpWeaponName.Simplify())) {
        for (let i2 = 0; i2 < guns.length; i2++) {
          if (weaponActualName[i].Simplify() == guns[i2].gunname.Simplify()) {
            probableWeapons.push(i2);
          }
        }
      }*/
      if (weaponAlliasName[i][j].Simplify() == inpWeaponName.Simplify()) {
        for (let i2 = 0; i2 < guns.length; i2++) {
          if (weaponActualName[i].Simplify() == guns[i2].gunname.Simplify()) {
            return guns[i2];
          }
        }
      }
    }
  }
  probableWeapons = [...new Set(probableWeapons)];
  if (probableWeapons.length == 1) {
    return guns[probableWeapons[0]];
  }
  if (probableWeapons.length > 1) {
    return (
      "Did you mean `" +
      probableWeapons
        .map(x => guns[x].gunname)
        .reduce((out, x, i) =>
          [out, x].join(i === probableWeapons.length - 1 ? "` or `" : "`, `")
        ) +
      "`?"
    );
  }
  return "Couldn't identify the weapon: `" + '"' + inpWeaponName + '"`';
}

function isolator(inpmsg) {
  if (inpmsg.includes(" + ")) {
    var out = inpmsg
      .split(" + ")
      .map(x => x.split("+"))
      .flat();
    return [out.shift(), out.join(", ")];
  }
  return inpmsg.split(" with ");
}

function hasAttachments(inpmsg) {
  if (
    inpmsg.split(" with ").filter(x => x.Simplify()).length > 1 ||
    inpmsg.split(" + ").filter(x => x.Simplify()).length > 1
  ) {
    return true;
  }
  return false;
}

function attachmentsIdentifier(inpmsg, attachmentsData) {
  var inpmsg1 = inpmsg,
    inpmsg3 = inpmsg.split(" ").filter(x => x),
    inpmsg2 = inpmsg3.shift().toLowerCase(),
    inpmsg5 = inpmsg3.join(" ");
  inpmsg =
    inpmsg2 == "akim" || inpmsg2 == "akimbo"
      ? inpmsg5 + (hasAttachments(inpmsg) ? " + " : ", ") + "akimbo"
      : inpmsg;
  /*var replacer = [
    'Stopping Power',
    'Laser'
  ].map(x => x.Simplify());

  var replacee = [
    ['SP'],
    ['Lazer']
  ].map(x => x.Simplify());
  replacee.map(x => x.filter(y => inpmsg.includes(y)));*/
  //console.log(inpmsg);
  /*console.log(JSON.stringify(inpmsg));
  var g1 = [];
  g1 = inpmsg.split(/ with | + /);
  console.log(JSON.stringify(g1));
  var givenAttachmentsNames = g1.split(/ & | , /);*/

  if (!hasAttachments(inpmsg)) {
    return [];
  }

  var inputAttachmentsNames = isolator(inpmsg)[1]
    .split(/ & |, |,| and /)
    .filter(x => x);
  var tooSmall = inputAttachmentsNames.filter(x => x.length < 3);
  inputAttachmentsNames = inputAttachmentsNames.filter(x => !(x.length < 3));
  var errorMsgs = "",
    errors = [],
    unidentifined = [];

  if (inputAttachmentsNames.length == 00) {
    errorMsgs += "\nAttachments are missing!\n";
  }
  if (inputAttachmentsNames.length >= 10) {
    return "Cocaineeeeee";
  }

  var splitAttachmentsDataName = [],
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
    var splitInputAttachmentsName = inputAttachmentsNames[i].split(" ");

    for (let j = 0; j < splitAttachmentsDataName.length; j++) {
      for (let i2 = 0; i2 < splitAttachmentsDataName[j].length; i2++) {
        for (let i3 = 0; i3 < splitInputAttachmentsName.length; i3++) {
          if (
            splitAttachmentsDataName[j][i2].includes(
              splitInputAttachmentsName[i3].Simplify()
            )
          ) {
            var probablePushed = false;
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
    if (probables.length == 0) {
      unidentifined.push(inputAttachmentsNames[i]);
      continue;
    }

    var curr = probables[probables.length - 1];
    var temp1 = probables[probables.length - 1].filter(
      x =>
        attachmentsData[x].name.Simplify() ==
        inputAttachmentsNames[i].Simplify()
    );
    var temp2 = probables[probables.length - 1].filter(
      x =>
        splitAttachmentsDataName[x].length == splitInputAttachmentsName.length
    );
    if (temp1.length === 1 && temp2.length !== 1) {
      probables.push([temp1]);
    }
    if (temp1.length !== 1 && temp2.length === 1) {
      probables.push([temp2]);
    }
    if (temp1.length === 1 && temp2.length === 1 && temp1[0] == temp2[0]) {
      probables.push([temp1]);
    }
    //console.log(probables[probables.length - 1].length);
    if (
      probables[probables.length - 1].length != 1 ||
      probables.length < splitInputAttachmentsName.length
    ) {
      //errors.push(probables[probables.length - 1]);
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
  //console.log(JSON.stringify(errors));
  /*if (errors.length && unidentifined.length) {
    return "Couldn't identify the attachment" + (unidentifined.length === 1 ? "" : "s") + ': `"' + unidentifined.join('"`, `"') + '"`\n\nDid you mean `' + errors.map((p, j) => p.map(x => attachmentsData[x].name).reduce((out, x, i) => [out, x].join(i === p.length - 1 ? '` or `' : '`, `')) + '` by `"' + inputAttachmentsNames[j + unidentifined.length] + '"`').join(";\n`") + "?";
  }
  if (errors.length) {
    //return "Did you mean " + errors.map((p, j) => p.map(x => attachmentsData[x].name).reduce((out, x, i) => [out, x].join(i === p.length - 1 ? '` or `' : '`, `')) + '` by `"' + inputAttachmentsNames[j] + '"`').join(";\n") + "?";
    return "\nDid you mean " + errors.join(";\n") + "?\n";
  }
  if (unidentifined.length) {
    return "\nCouldn't identify the attachment" + (unidentifined.length === 1 ? "" : "s") + ': `"' + unidentifined.join('"`, `"') + '"`\n';
  }*/

  /*var sameAttachments = outAttachments.filter((x,i,a)=> a.indexOf(x)!==i);
  if (sameAttachments.length) {
    sameAttachments = [...sameAttachments, ...new Set(sameAttachments.map((x, i) => outAttachments.indexOf(x)))];
  }
  inputAttachmentsNames.filter();*/

  var t1 = outAttachments.map(x => x.effects[35]);
  var t2 = outAttachments.map(x => x.effects[36] + x.effects[32]);

  errorMsgs +=
    t1.indexOf(1) !== -1
      ? "Can't equip Muzzle with `" +
        '"' +
        outAttachments[t1.indexOf(1)].name +
        '"`'
      : "";
  errorMsgs +=
    t2.indexOf(1) !== -1
      ? "Can't equip Optics with `" +
        '"' +
        outAttachments[t2.indexOf(1)].name +
        '"`'
      : "";
  errorMsgs += errors.length
    ? "\nDid you mean " + errors.join(";\n") + "?\n"
    : "";
  errorMsgs += unidentifined.length
    ? "\nCouldn't identify the attachment" +
      (unidentifined.length === 1 ? "" : "s") +
      ': `"' +
      unidentifined.join('"`, `"') +
      '"`\n'
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
//console.log(attachmentsIdentifier("ak with mag, red sight, red dot, ll", data.cguns[0].aments));// makeError();
//console.log(attachmentsIdentifier("ak with mdfgt, skjs", data.cguns[0].aments)); makeError();
//console.log(attachmentsIdentifier("117 + 40 round mag", data.cguns[0].aments)); makeError();
//console.log(attachmentsIdentifier("117 + rtc muzzle brake, rubberized griptape, tac lazer sight, 40 round mag, no stock", data.cguns[1].aments)); makeError();

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
  //console.log([currDmgs, currRngs, damageMulti, hp, tbs, tbb, bib, pellets]);
  //tbs = timeBetweenShots
  //tbb = timeBetweenBurst
  //bib = bulletsInBurst

  currRngs = currRngs.filter(x => x < 100).map(x => Math.round(x));
  currDmgs.length = currRngs.length + 1;
  currDmgs = currDmgs.map(x => Math.round(x * damageMulti));
  var currSTKs = currDmgs.map(x => stk(x)),
    currTTKs = currDmgs.map(x => ttk(x)),
    currPDmg = null,
    n = Math.max(...currTTKs.map(x => x.toString().length));
  n = n < 3 ? 3 : n;
  //console.log()
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
    var out;
    if (!pellets) {
      out = Math.ceil(hp / dmg);
    } else {
      out = Math.ceil(hp / (dmg * pellets));
    }
    out = out == Infinity ? "∞" : out;
    return out;
  }
  function ttk(dmg) {
    var stkVal = stk(dmg);
    if (stkVal == "∞") {
      return stkVal;
    }
    if (!bib) {
      return Math.round((stkVal - 1) * tbs);
    }
    var out = 0;
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
    currPDmg = currDmgs.map(x => x + " x" + pellets);
    n = Math.max(...currPDmg.map(x => x.toString().length));
  }
  return (
    "```Damage   : " +
    worker1(currPDmg || currDmgs) +
    (pellets ? "Total    : " + worker1(currDmgs.map(x => x * pellets)) : "") +
    "STK      : " +
    worker1(currSTKs) +
    "TTK      : " +
    worker1(currTTKs) +
    "Range    : " +
    (currRngs.length ? worker2(currRngs) : worker1(["∞"])) +
    "```"
  );
}
//console.log(damageHandler([30, 25, 20], [10, 20], 1, 100, 60000 / 720, 0, 0));  makeError();
//console.log(damageHandler([ 33, 23 ], [ 39 ], 1, 100, 109.0909090909091, 0, 0 )); makeError();

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
  var recoilLength = xRecoil.length;
  if (recoilLength == 0) {
    return "none";
  }
  var recoilPattern = [
    {
      x: 0,
      y: 0,
    },
  ];
  var recoilObj;
  for (let i = 0; i < bulletCount; i++) {
    var xContinuationVal =
      xRecoil[recoilLength - 1] - xRecoil[recoilLength - 2];
    var yContinuationVal =
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
  var chart = new QuickChart();
  chart
    .setConfig({
      type: "scatter",
      data: {
        datasets: [
          {
            data: recoilPattern,
            showLine: true,
            fill: false,
            borderColor: "rgba(0, 200, 0, 1)",
          },
        ],
      },
      options: {
        /*plugins: {
         backgroundImageUrl: 'https://www.codmdatabase.ml/display.png'
        },*/
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
  //console.log(inpStats.toString());
  var l = inpStats[18] / inpStats[17];
  var outStats = inpStats;
  /*if (inpEffects[09] != 0) { inpStats[25] += inpEffects[09]; }
  if (inpEffects[29] != 0) { inpStats[00] += inpEffects[29]; }
  inpStats[17] += inpEffects[27];*/
  var inpStatsarr = [01, 02, 05, 10, 11, 14, 15, 20, 21, 22, 26, 27, 31];
  var inpEfecsarr = [17, 18, 16, 04, 19, 01, 10, 14, 14, 14, 06, 07, 42]; //Efecs is short for Effects
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] *= (inpEffects[inpEfecsarr[i]] + 100) / 100;
    }
  }
  var inpStatsarr = [03, 04, 16, 28, 29, 30];
  var inpEfecsarr = [20, 38, 00, 39, 40, 41]; //Efecs is short for Effects
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] = inpEffects[inpEfecsarr[i]];
    }
  }
  var inpStatsarr = [00, 17, 25];
  var inpEfecsarr = [29, 27, 09]; //Efecs is short for Effects
  for (let i = 0; i < inpEffects.length; i++) {
    if (inpEffects[inpEfecsarr[i]] != 0) {
      outStats[inpStatsarr[i]] += inpEffects[inpEfecsarr[i]];
    }
  }

  if (inpEffects[43] != 0 && inpStats[08] != -1) {
    outStats[08] *= (inpEffects[43] + 100) / 100;
  }
  if (inpEffects[16] != 0) {
    outStats[07] *= inpEffects[16] / -100 + 1;
  }
  outStats[18] = inpStats[17] * l;

  outStats[25] = (inpStats[26] * inpStats[25]) / 100; //must occur after inpStats[26]
  //no 06, 09, 12, 13, 19, 23, 24
  return outStats;
}

function attachmentHandler(currEffects, currStats) {
  //console.log(JSON.stringify(currEffects));
  var pos = [],
    neg = [];
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
    pos.push("Easier to Aim");
  }
  negGood1(01, "ADS time");
  negGood1(02, "Vertical Recoil");
  negGood1(03, "Horizontal Recoil");
  negGood1(04, "Bullet Spread");
  negGood1(05, "Moving Bullet Spread");
  posGood1(06, "Mobility");
  posGood1(07, "ADS Mobility");
  negGood1(08, "Recoil when Crouched or Prone");
  posGood1(09, "Sprint Mobility");
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
  negGood3(21, "+Visible Laser when not ADS-ed");
  negGood3(22, "+Visible Laser when ADS-ed");
  negGood3(23, "+Visible Laser");
  posGood3(24, "+Silenced Gunfire");
  posGood3(25, "-Muzzle Flash");
  posGood3(26, "Reworked Damage");
  posGood2(27, "Rounds/Mag");
  posGood2(28, "Rounds/Tube");
  posGood2(29, "Pellets per Shot");
  posGood2(30, "Damage Over Time");
  posGood3(31, "Damage per Shot");
  posGood3(32, "Reworked ADS");
  posGood3(33, "-Melee QTE Time");
  if (currEffects[34] == 1) {
    pos.push("+Damage per Pellet");
  } else if (currEffects[34] == -1) {
    neg.push("-Damage per Pellet");
  }
  negGood3(35, "Can Not use Muzzle");
  negGood3(36, "Can Not ADS");
  if (currEffects[37] != 0) {
    pos.push("New Leathality Profile");
  }
  if (currEffects[38] != 0 && currEffects[38] < currStats[4]) {
    pos.push(
      "Turns to " +
        ["Full Auto", "Burst", "Semi Auto", "Pump Action", "Bolt Action"][
          currEffects[38] - 1
        ]
    );
  } else if (currEffects[38] != 0 && currEffects[38] != currStats[4]) {
    neg.push(
      "Turns to " +
        ["Full Auto", "Burst", "Semi Auto", "Pump Action", "Bolt Action"][
          currEffects[38] - 1
        ]
    );
  }
  posGood2(39, "Tick Damage");
  posGood2(40, "Ticks");
  negGood2(41, "ms Tick Interval");
  posGood2(42, "Breath Holding Time");
  posGood1(43, "Bullet Speed");
  if (currEffects[44] == 1) {
    pos.push("+Penetraion Damage");
  } else if (currEffects[44] == -1) {
    neg.push("-Penetraion Damage");
  }
  posGood2(45, "Round" + (currEffects[45] - 1 ? "s" : "") + " in Reserve");

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

  function posGood3(i, ext) {
    if (currEffects[i].ToBool()) {
      pos.push(ext);
    }
  }

  function negGood3(i, ext) {
    if (currEffects[i].ToBool()) {
      neg.push(ext);
    }
  }
  return (
    "\nPositives :\n```ini\n[" +
    pos.join("]\n[") +
    "]```\nNegatives :\n```css\n[" +
    neg.join("]\n[") +
    "]\n```"
  );
}
/*
console.log("Full directory     : " + __filename);
console.log("Current file       : " + __filename.split("/").pop());
console.log("Without extenstion : " + __filename.split("/").pop().split(".")[0]);
*/

function interpretioner(inpAttachments) {
  return inpAttachments.length
    ? " with " + inpAttachments.map(x => x.name).join(", ")
    : "";
}

function totaler(inpAttachments) {
  var totalEffects = inpAttachments[0].effects;
  for (let j = 1; j < inpAttachments.length; j++) {
    for (let i2 = 0; i2 < totalEffects.length; i2++) {
      totalEffects[i2] += inpAttachments[j].effects[i2];
    }
  }
  return totalEffects;
}

function makeError() {
  var m;
  m.split("L");
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
};
