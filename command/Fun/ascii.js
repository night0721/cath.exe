const axios = require("axios");
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
    const data = await axios
      .get(
        `https://artii.herokuapp.com/make?text=${encodeURIComponent(args[0])}`
      )
      .then(res => res.data);
    interaction.followUp(`\`\`\`${data}\`\`\``);
  },
};
