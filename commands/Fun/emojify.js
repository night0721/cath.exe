module.exports = {
  name: "emojify",
  usage: "(Word)",
  description: "Emojify a sentence",
  run: async (client, message, args) => {
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

    if (!args[0]) {
      return client.err(message, "Fun", "emojify", 12);
    }
    message.channel.send(
      args
        .slice(0)
        .join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    );
  },
};
