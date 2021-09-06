const { Canvas } = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "triggered",
  usage: "{User}",
  description: "Have a trigger effect on a user's avatar",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to use the effect",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user = interaction.guild.members.cache.get(args[0]);
    const ava = user.user.displayAvatarURL({ format: "png", size: 2048 });
    const imga = await Canvas.trigger(ava);
    await interaction.followUp({
      files: [new MessageAttachment(imga, "image.gif")],
    });
  },
};
