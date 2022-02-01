const common = require("../../util/functions/common");
const data = require("../../util/Data/data.json");

let currGun, currAttachments, interpretion, hasError;
const errMsg = "*Generic placeholder error message*";

module.exports = {
  name: "effects",
  description: "Check gun effects",
  usage: "(Gun)",
  category: "CODM",
  options: [
    {
      type: 7,
      name: "gun",
      description: "Gun name",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const repEmb = attachments(args[0].replace("\n", " "));
    if (hasError) {
      interaction.followUp({ embeds: [repEmb] });
    } else {
      interaction.followUp({ embeds: [repEmb] });
    }
  },
};

function attachments(inpmsg) {
  const out = "",
    at = data.attachmentTypes.map(x => (x.slice(-1) === "s" ? x : x + "s"));
  if (inpmsg.includes("+") && inpmsg.includes(":")) {
    hasError = true;
    return "Bro, can u liek, not do that?";
  }
  if (inpmsg.includes(":")) {
    const inpAll = inpmsg
        .split(":")
        .map(x => x.trim())
        .filter(x => x),
      inpType = inpAll.length === 2 ? inpAll[1] : null;
    if (!inpType) {
      hasError = true;
      return inpAll.length < 2
        ? "Empty " + (inpAll[0] ? "" : "weapon name and ") + "attachment type"
        : "Multiple `:`s detected";
    }
    currGun = common.weaponIdentifier(inpAll[0]);
    if (typeof currGun == "string") {
      hasError = true;
      return currGun;
    }
    let currAttachmentsType = at.filter(x => simplify(x) == simplify(inpType));
    currAttachmentsType = currAttachmentsType.length
      ? currAttachmentsType
      : at.filter(
          x => simplify(x.substring(0, x.length - 1)) == simplify(inpType)
        );
    currAttachmentsType = currAttachmentsType.length
      ? currAttachmentsType
      : at.filter(x => simplify(x).includes(simplify(inpType)));
    if (currAttachmentsType.length === 0) {
      hasError = true;
      return "Couldn't identify `" + inpType + "`";
    } else if (currAttachmentsType.length === 1) {
      currAttachmentsType = at.indexOf(currAttachmentsType[0]);
    } else {
      hasError = true;
      return (
        "Did you mean `" +
        currAttachmentsType.reduce((out, x, i) =>
          [out, x].join(
            i === currAttachmentsType.length - 1 ? "` or `" : "`, `"
          )
        ) +
        "`"
      );
    }
    return {
      title: currGun.gunname,
      color: 11348938,
      fields: [
        {
          name:
            "**" +
            currGun.gunname +
            "** has the following " +
            at[currAttachmentsType],
          value:
            "```\n" +
            currGun.aments
              .filter(x => x.type - 1 === currAttachmentsType)
              .map(x => x.name)
              .join("\n") +
            "```",
        },
      ],
      footer: {
        text: "All the stats courtesy of Project Lighthouse",
        icon_url:
          "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png?width=638&height=638",
      },
    };
    function simplify(v) {
      return v.toLowerCase().replace(/[^0-9a-z]/g, "");
    }
  }
  currGun = common.weaponIdentifier(inpmsg);
  if (typeof currGun == "string") {
    hasError = true;
    return currGun;
  }
  hasAttachments = common.hasAttachments(inpmsg);
  currAttachments = [];
  if (hasAttachments) {
    currAttachments = common.attachmentsIdentifier(inpmsg, currGun);
    if (typeof currAttachments == "string") {
      hasError = true;
      return currAttachments;
    }
    return {
      title: currGun.gunname + common.interpretioner(currAttachments),
      color: 11348938,
      fields: common.attachmentHandler(
        common.totaler(currAttachments),
        currGun.stats
      ),
      footer: {
        text: "All the stats courtesy of Project Lighthouse",
        icon_url:
          "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png?width=638&height=638",
      },
    };
  } else {
    const availableAttachmentTypes = [
      ...new Set(currGun.aments.map(x => x.type)),
    ];
    return {
      title: currGun.gunname,
      color: 11348938,
      fields: [
        {
          name:
            "**" + currGun.gunname + "** has the following attachment types:",
          value:
            "```\n" +
            availableAttachmentTypes.map(x => at[x - 1]).join(",\n") +
            "```",
        },
      ],
      footer: {
        text: "All the stats courtesy of Project Lighthouse",
        icon_url:
          "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png?width=638&height=638",
      },
    };
  }
}
// console.log(attachments("Peacekeeper:muzzle")); //common.makeError();
/* console.log(attachments(":")); //common.makeError();
console.log(attachments("47:optics")); //common.makeError();
console.log(attachments("47")); //common.makeError();
console.log(attachments("47 + ")); //common.makeError();
console.log(attachments("47 + :")); //common.makeError();
console.log(attachments("47 + red dot")); common.makeError();*/
