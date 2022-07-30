const m = require("../../models/econ");
module.exports = {
  name: "give",
  timeout: 5000,
  usage: "(User) (Number)",
  description: "Give money to an user",
  category: "Economy",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to give",
      required: true,
    },
    {
      type: 4,
      name: "cp",
      description: "The number of CP you want to give",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const max = 300000;
    const user = interaction.guild.members.cache.get(args[0]);
    let parsed = args[1];
    if (parsed > max) parsed = max;
    if (parsed < 100) {
      interaction.followUp({
        content: `You need to give at least 100 ${client.currency}`,
      });
    } else if (user.id === interaction.user.id) {
      interaction.followUp({ content: "You can't give yourself money" });
    } else if (parsed > (await client.bal(interaction.user.id))) {
      interaction.followUp({ content: "You don't have enough balance" });
    } else {
      m.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
          data.CP -= parsed;
          data.save();
        } else {
          client.createProfile(interaction.user.id);
        }
      });
      m.findOne({ User: user.id }, async (err, data) => {
        if (data) {
          data.CP += parsed;
          data.save();
        } else {
          new m({ CP: parsed });
        }
      });
      interaction.followUp({
        content: `**${interaction.user.username}** gave **${
          user.user.username
        }** **${parsed.toLocaleString()}** coins, you now have **${(
          (await client.bal(interaction.user.id)) - parsed
        ).toLocaleString()}** ${client.currency} and they have **${(
          (await client.bal(user.id)) + parsed
        ).toLocaleString()}** ${client.currency}`,
      });
      user
        .send({
          content: `**${
            interaction.user.tag
          }** gave you **${parsed.toLocaleString()}** coins in **${
            interaction.guild.name
          }**`,
        })
        .catch();
    }
  },
};
