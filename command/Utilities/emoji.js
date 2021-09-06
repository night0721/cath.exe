const { Util } = require("discord.js");
module.exports = {
  name: "emoji",
  usage: "(Emoji)",
  description: "Show an emoji URL",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "first",
      description: "The first emoji",
      required: true,
    },
    {
      type: 3,
      name: "second",
      description: "The second emoji",
      required: false,
    },
    {
      type: 3,
      name: "third",
      description: "The third emoji",
      required: false,
    },
    {
      type: 3,
      name: "forth",
      description: "The forth emoji",
      required: false,
    },
    {
      type: 3,
      name: "fifth",
      description: "The fifth emoji",
      required: false,
    },
    {
      type: 3,
      name: "sixth",
      description: "The sixth emoji",
      required: false,
    },
    {
      type: 3,
      name: "seventh",
      description: "The seventh emoji",
      required: false,
    },
    {
      type: 3,
      name: "eighth",
      description: "The eighth emoji",
      required: false,
    },
    {
      type: 3,
      name: "ninth",
      description: "The ninth emoji",
      required: false,
    },
    {
      type: 3,
      name: "tenth",
      description: "The tenth emoji",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    await interaction.deleteReply();
    for (const rawEmoji of args) {
      const parsedEmoji = Util.parseEmoji(rawEmoji);
      if (parsedEmoji.id) {
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${
          parsedEmoji.id + extension
        }`;
        await interaction.channel.send({ content: `Emoji URL:\n${url}` });
      }
    }
  },
};
