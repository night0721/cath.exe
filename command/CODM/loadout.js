const { MessageEmbed } = require("discord.js");     //@night0721 You need to make this
const items = require("../../util/Data/loadout.json");
module.exports = {
  name: "class",
  description: "Generate A Random Loadout",
  category: "CODM",
  run: async (client, interaction) => {
    // const data = async () => {
    //   const d = await model.findOne({});
    //   const types = d.Categories;
    //   const names = d.Primary;
    //   const category = types[Math.floor(Math.random() * types.length)];
    //   const weapons = names[0][category];
    //   return `${weapons[Math.floor(Math.random() * weapons.length)]}`;
    // };
    // const primary_weapon = await data();
    // const primary = primary_weapon.replace(/[ -]/g, "_").replace(/\./g, "");
    // const slots = shuffle(Object.keys(Attachments[primary][0]));
    // const slot_1 = slots.next().value,
    //   slot_2 = slots.next().value,
    //   slot_3 = slots.next().value,
    //   slot_4 = slots.next().value,
    //   slot_5 = slots.next().value;
    const result = new MessageEmbed()
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`)
      .setURL(client.web)
      .setTitle(`🎲 A Randomly Generated Loadout 🎲`)
      .setDescription(
        `This loadout is a randomly generated, Also try, \`\`\`\`/class\`\`\`\` to get a randomally generated primary weapon gunsmith build`
      )
      .addFields(
        {
          name: `Secondary Weapon`,
          value: ``,
          inline: true,
        },
        {
          name: `Operator Skill`,
          value: ``,
          inline: true,
        },
        {
          name: `Scorestreak`, // 3 Scorestreaks
          value: ``,
          inline: true,
        },
        {
          name: `Red Perk`,
          value: ``,
          inline: true,
        },
        {
          name: `Green Perk`,
          value: ``,
          inline: true,
        },
        {
          name: `Blue Perk`,
          value: ``,
          inline: true,
        }
      )
      .setTimestamp();
    interaction.followUp({ embeds: [result] });

    // function* shuffle(array) {
    //   let i = array.length;
    //   while (i--) {
    //     yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    //   }
    // }
    // function getAttachment(gun, slot) {
    //   const ca = Attachments[gun][0][slot];
    //   return ca[Math.floor(Math.random() * ca.length)];
    // }
  },
};
