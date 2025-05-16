const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "poll",
  category: "Utilities",
  description: "Creates a poll with many options",
  options: [
    {
      type: 3,
      name: "question",
      description: "The question of the poll",
      required: true,
    },
    {
      type: 3,
      name: "choice1",
      description: "Choice 1",
      required: true,
    },
    {
      type: 3,
      name: "choice2",
      description: "Choice 2",
      required: true,
    },
    {
      type: 3,
      name: "choice3",
      description: "Choice 3",
      required: false,
    },
    {
      type: 3,
      name: "choice4",
      description: "Choice 4",
      required: false,
    },
    {
      type: 3,
      name: "choice5",
      description: "Choice 5",
      required: false,
    },
    {
      type: 3,
      name: "choice6",
      description: "Choice 6",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const pollCreateEmbed = new EmbedBuilder()
      .setTitle(`📣 **${args[0]}**`)
      .setColor("Red")
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    let fields = [];
    for (let i = 0; i < args.length - 1; i++) {
      fields.push({
        name: "‎",
        value: `:regional_indicator_${String.fromCharCode(97 + i)}: ${
          args[i + 1]
        }
        `,
      });
    }
    pollCreateEmbed.addFields(fields);
    let embedMessage = await interaction.followUp({
      embeds: [pollCreateEmbed],
    });
    55356;
    for (let i = 0; i < args.length - 1; i++) {
      if (i === 0) embedMessage.react("\ud83c\udde6");
      if (i === 1) embedMessage.react("\ud83c\udde7");
      if (i === 2) embedMessage.react("\ud83c\udde8");
      if (i === 3) embedMessage.react("\ud83c\udde9");
      if (i === 4) embedMessage.react("\ud83c\uddea");
      if (i === 5) embedMessage.react("\ud83c\uddeb");
    }
  },
};
