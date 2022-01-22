const builds = require("../util/Data/builds.json");
const guns = builds.Main;
const Discord = require("discord.js");
const nmDt = require("../util/Data/aliases.json");
const weaponActualName = nmDt.weaponActualName;
const weaponAlliasName = nmDt.weaponAlliasName;
module.exports = {
  name: "build",
  description: "Check gun builds",
  usage: "(Gun)",
  category: "CODM",
  status: false,
  Owner: true,
  run: async (client, message, args) => {
    const currGun = weaponIdentifier(args.join(" ").replace("\n", " "));
    if (!currGun) message.reply({ content: "Please specify a gun" });
    if (typeof currGun == "string") {
      message.reply({ embeds: [currGun] });
    } else {
      const attachNames = currGun.Attachments.map(
        x => `**${x.Name}** [${builds.AttachmentTypes[x.Type]}]`
      );
      const embed = new Discord.MessageEmbed()
        .setTitle(
          `Build for ${currGun.Name} (${builds.WeaponTypes[currGun.Type]})`
        )
        .setColor(16580400)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setURL(client.web)
        .setDescription(
          attachNames.reduce(
            (t, x, i, a) => t + (i < a.length - 1 ? "\n" : " \n") + x
          )
        )
        .setImage(currGun.URL);
      return message.reply({ embeds: [embed] });
    }
  },
};
function weaponIdentifier(inpWeaponName) {
  if (inpWeaponName.length < 2) {
    return "The name `" + inpWeaponName + "` is too short.";
  }
  let probableWeapons = [];
  for (let i = 0; i < guns.length; i++) {
    if (inpWeaponName.Simplify() == guns[i].Name.Simplify()) {
      return guns[i];
    } else if (guns[i].Name.Simplify().includes(inpWeaponName.Simplify())) {
      probableWeapons.push(i);
    }
  }

  if (probableWeapons.length == 1) {
    return guns[probableWeapons[0]];
  }

  for (let i = 0; i < weaponAlliasName.length; i++) {
    for (let j = 0; j < weaponAlliasName[i].length; j++) {
      if (weaponAlliasName[i][j].Simplify() == inpWeaponName.Simplify()) {
        for (let i2 = 0; i2 < guns.length; i2++) {
          if (weaponActualName[i].Simplify() == guns[i2].Name.Simplify()) {
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
        .map(x => guns[x].Name)
        .reduce((out, x, i) =>
          [out, x].join(i === probableWeapons.length - 1 ? "` or `" : "`, `")
        ) +
      "`?"
    );
  }
  return "Couldn't identify the weapon: `" + '"' + inpWeaponName + '"`';
}