const { Util } = require("discord.js");
module.exports = {
  name: "say",
  description: "Pretend a bot to say",
  usage: "(Words)",
  category: "Fun",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "words",
      description: "The words to say",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    await interaction.deleteReply();
    interaction.channel.send(Util.cleanContent(args[0], interaction.channel));
  },
};
