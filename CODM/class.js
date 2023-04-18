const { MessageEmbed } = require("discord.js");
const model = require("../../models/weapons");
const Attachments = require("../../util/Data/attachments.json");
module.exports = {
	name: "class",
	description: "Generate random class in CODM",
	category: "CODM",
	run: async (client, message, args) => {
		const data = async () => {
			const d = await model.findOne({});
			const types = d.Categories;
			const names = d.Primary;
			const category = types[Math.floor(Math.random() * types.length)];
			const weapons = names[0][category];
			return `${weapons[Math.floor(Math.random() * weapons.length)]}`;
		};
		const primary_weapon = await data();
		const primary = primary_weapon.replace(/[ -]/g, "_").replace(/\./g, "");
		const slots = shuffle(Object.keys(Attachments[primary][0]));
		const slot_1 = slots.next().value,
			slot_2 = slots.next().value,
			slot_3 = slots.next().value,
			slot_4 = slots.next().value,
			slot_5 = slots.next().value;
		const result = new MessageEmbed()
			.setColor(client.color)
			.setTitle(`🎲Random Class of ${primary_weapon}🎲`)
			.setDescription(
				`**Attachments**\n**${getAttachment(
					primary,
					slot_1,
				)}**\n**${getAttachment(primary, slot_2)}**\n**${getAttachment(
					primary,
					slot_3,
				)}**\n**${getAttachment(primary, slot_4)}**\n**${getAttachment(
					primary,
					slot_5,
				)}**`,
			)
			.setURL(client.web)
			.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
			.setTimestamp();
		message.reply({ embeds: [result] });
		function* shuffle(array) {
			let i = array.length;
			while (i--) {
				yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
			}
		}
		function getAttachment(gun, slot) {
			const ca = Attachments[gun][0][slot];
			return ca[Math.floor(Math.random() * ca.length)];
		}
	},
};
