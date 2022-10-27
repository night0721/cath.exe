module.exports = {
  name: "emojify",
  description: "Emojify",
  options: [
    {
      type: 3,
      name: "word",
      description: "word",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const s = {
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
      "#": ":hash:",
      "*": ":asterisk:",
      "!": ":grey_exclamation:",
      "?": ":grey_question:",
      " ": "   ",
    };
    let ar = args
      .join(" ")
      .toLowerCase()
      .split("")
      .map(l => {
        if (/[a-z]/g.test(l)) {
          return `:regional_indicator_${l}:`;
        } else if (s[l]) {
          return `${s[l]}`;
        }
      })
      .join("");
    interaction.followUp({ content: ar });
  },
};
