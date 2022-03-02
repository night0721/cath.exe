const { MessageEmbed } = require("discord.js"); //@night0721 You need to make this
const items = require("../../util/Data/loadout.json");
module.exports = {
  name: "loadout",
  description: "Generate A Random Loadout",
  category: "CODM",
  run: async (client, interaction) => {
    const secondary =
      items.secondary[Math.floor(Math.random() * items.secondary.length)];
    const red = items.perk_1[Math.floor(Math.random() * items.perk_1.length)];
    const green = items.perk_2[Math.floor(Math.random() * items.perk_2.length)];
    const blue = items.perk_3[Math.floor(Math.random() * items.perk_3.length)];
    const operator =
      items.operator_skill[
        Math.floor(Math.random() * items.operator_skill.length)
      ];
    const slots = shuffle(items.scorestreak);
    const slot_1 = slots.next().value,
      slot_2 = slots.next().value,
      slot_3 = slots.next().value;
    const result = new MessageEmbed()
      .setColor(client.color)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setURL(client.web)
      .setTitle(`🎲 A Randomly Generated Loadout 🎲`)
      .setDescription(
        `This loadout is a randomly generated, Also try, \`\`\`/class\`\`\` to get a randomally generated primary weapon gunsmith build`
      )
      .addFields(
        {
          name: "Secondary Weapon",
          value: secondary,
          inline: true,
        },
        {
          name: "Operator Skill",
          value: operator,
          inline: true,
        },
        {
          name: "Scorestreak",
          value: `${slot_1}\n${slot_2}\n${slot_3}`,
          inline: true,
        },
        {
          name: "Red Perk",
          value: red,
          inline: true,
        },
        {
          name: "Green Perk",
          value: green,
          inline: true,
        },
        {
          name: "Blue Perk",
          value: blue,
          inline: true,
        }
      )
      .setTimestamp();
    interaction.followUp({ embeds: [result] });

    function* shuffle(array) {
      let i = array.length;
      while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
      }
    }
  },
};
