const CodeClient = require("../../client/CodeClient");
module.exports = {
  name: "Create Code Bin",
  type: "MESSAGE",
  run: async (client, interaction) => {
    const msg = await interaction.channel.messages.fetch(interaction.targetId);
    if (!msg.content) {
      interaction.followUp({ content: "The message must have a content" });
    } else {
      const title = "Code";
      const description = msg.author.tag;
      const code = msg.content;
      const link = await CodeClient.createBin(title, description, code);
      interaction.followUp({ content: link });
    }
  },
};
