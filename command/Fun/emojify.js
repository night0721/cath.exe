module.exports = {
  name: "emojify",
  usage: "(Word)",
  description: "Emojify a sentence",
  type: "CHAT_INPUT",
  category: "Fun",
  options: [
    {
      type: 3,
      name: "text",
      description: "The text you want to convert",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const mapping = {
      " ": "   ",
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      "!": ":grey_exclamation:",
      "?": ":grey_question:",
      "#": ":hash:",
      "*": ":asterisk:",
    };
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
      mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
    });
    await interaction.followUp(
      args[0]
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    );
  },
};
