const common = require("../../util/functions/common");
let currGun = {},
	currStats = [],
	currAttachments = {},
	currDRM = {},
	totalEffects = [],
	interpretion = "",
	hasError = false;
const errMsg = "*Generic placeholder error message*";

module.exports = {
	name: "damage",
	description: "Check gun damage",
	usage: "(Gun)",
	category: "CODM",
	run: async (client, message, args) => {
		const repEmb = dmg(args.join(" ").replace("\n", " "));
		if (hasError) {
			message.reply({ embeds: [repEmb] });
		}
		else {
			message.channel.send({ embeds: [repEmb] });
		}
	},
};

function dmg(inpmsg) {
	currGun = common.weaponIdentifier(inpmsg);
	if (typeof currGun == "string") {
		hasError = true;
		return currGun;
	}
	currDRM = currGun.drm[0];
	currStats = currGun.stats;
	currAttachments = common.attachmentsIdentifier(
		inpmsg,
		currGun.aments,
		currStats,
	);
	if (typeof currAttachments == "string") {
		hasError = true;
		return currAttachments;
	}
	if (currAttachments.length) {
		totalEffects = common.totaler(currAttachments);
		currDRM = currGun.drm[totalEffects[37]];
		currDRM.range = currDRM.range.map(
			x => (x * (totalEffects[13] + 100)) / 100,
		);
		currStats = common.updateStatswithEffects(totalEffects, currStats);
	}
	const mn = [
			"Head",
			"Neck",
			"Upper Chest",
			"Lower Chest",
			"Shoulders",
			"Upper Arms",
			"Lower Arms",
			"Stomach",
			"Belly Button",
			"Crotch",
			"Thighs",
			"Calf Muscles",
			"Feet",
		],
		m1 = currDRM.bodymultiplier,
		m2 = [...new Set(m1)], // [1.2, 1, 0.9]
		m3 = m1.map(x => m2.indexOf(x)), // [0, 1, 1, 1, 1, 1, 2, 2, 2]
		m4 = m2
			.map(x =>
				m3
					.map((y, i) => {
						if (x === m2[y]) {
							return mn[i];
						}
					})
					.filter(y => y),
			)
			.map(x =>
				x.length === m1.length
					? ["All"]
					: x.length === m1.length - 1
						? ["Others"]
						: x,
			);
	interpretion = currGun.gunname + common.interpretioner(currAttachments);
	return {
		title: "**" + interpretion + "**",
		color: 4849497,
		fields: m4.map((x, i) => {
			return {
				name: x.join(", ") + ":",
				value: common.damageHandler(
					currDRM.damage,
					currDRM.range,
					m2[i],
					100,
					60000 / currStats[5],
					currStats[7],
					currStats[6],
					currStats[0],
				),
			};
		}),
		footer: {
			text: "All the stats courtesy of Project Lighthouse",
			icon_url:
        "https://media.discordapp.net/attachments/735590814662656102/806960573753327657/cc.png?width=638&height=638",
		},
	};
}
// console.log(dmg("47 + mono"));
/* console.log(dmg("47"));
console.log(dmg("striker + choke"));
console.log(dmg("striker + choke"));
console.log(dmg("striker"));
common.makeError();*/
