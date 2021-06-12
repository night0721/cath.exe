const { Client, Message, MessageEmbed } = require("discord.js");
const client = require("../index");
async function createApiMessage(interaction, content) {
  const apiMessage = await APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  )
    .resolveData()
    .resolveFiles();
  return { ...apiMessage.data, files: apiMessage.files };
}
client.on("ready", async () => {
  const a = client.api.applications(client.user.id);
  a.commands.post({
    data: {
      name: "help",
      description: "Get some support!",
    },
  });
});
client.ws.on("INTERACTION_CREATE", async (interaction) => {
  let command = interaction.data.name.toLowerCase();
  let args = interaction.data.options;
  if (command === "help") {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content:
            "Website: https://cath.gq/\n Support: https://discord.gg/SbQHChmGcp",
        },
      },
    });
  }
});
