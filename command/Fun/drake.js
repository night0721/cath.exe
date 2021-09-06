const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "drake",
  description: "Drake meme",
  usage: "(Text) (Text)",
  category: "Fun",
  options: [
    {
      type: 3,
      name: "first",
      description: "The first text",
      required: true,
    },
    {
      type: 3,
      name: "second",
      description: "The second text",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const res = await fetch(
      `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${args[0]}&text2=${args[1]}`,
      {}
    );
    let i = await res.buffer();
    const drake = new MessageAttachment(i);
    await interaction.followUp({ files: [drake] });
  },
};
