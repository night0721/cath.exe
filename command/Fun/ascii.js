const figlet = require("figlet");
module.exports = {
  name: "ascii",
  description: "Converts text into ASCII art",
  category: "Fun",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "text",
      description: "The text you want to convert",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const msg = args[0];
    figlet.text(msg, async (err, data) => {
      if (err) console.log(err);
      await interaction.followUp(`\`\`\`${data}\`\`\``);
    });
  },
};
