const { EmbedBuilder } = require("discord.js");
const model = require("../../models/weapons");
const Attachments = require("../../util/Data/attachments.json");
module.exports = {
  name: "class",
  description: "Generate random class in CODM",
  category: "CODM",
  run: async (client, interaction) => {
    const data = async () => {
      const d = await model.findOne({});
      const weapons = d.Primary[0][d.Categories.random()];
      return `${weapons.random()}`;
    };
    const primary_weapon = await data();
    const primary = primary_weapon.replace(/[ -]/g, "_").replace(/\./g, "");
    const slots = shuffle(Object.keys(Attachments[primary][0]));
    const slot_1 = slots.next().value,
      slot_2 = slots.next().value,
      slot_3 = slots.next().value,
      slot_4 = slots.next().value,
      slot_5 = slots.next().value;
    const result = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`🎲 A Randomly Generated Class for ${primary_weapon} 🎲`)
      .setDescription(
        `**Attachments**\n**${getAttachment(
          primary,
          slot_1
        )}**\n**${getAttachment(primary, slot_2)}**\n**${getAttachment(
          primary,
          slot_3
        )}**\n**${getAttachment(primary, slot_4)}**\n**${getAttachment(
          primary,
          slot_5
        )}**`
      )
      .setURL(client.web)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [result] });
    function* shuffle(array) {
      let i = array.length;
      while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
      }
    }
    function getAttachment(gun, slot) {
      const ca = Attachments[gun][0][slot];
      return ca.random();
    }
  },
};
