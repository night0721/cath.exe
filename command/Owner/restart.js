module.exports = {
  name: "restart",
  category: "Owner",
  description: "Restart the bot",
  Owner: true,
  run: async (client, interaction, args) => {
    await interaction.deleteReply();
    const msg = await interaction.channel.send(
      "<a:config:896990033561669762> Restarting "
    );
    await client.destroy();
    await client.login(process.env.TOKEN);
    await msg.delete();
    await interaction.channel.send(
      "<a:nyx_checkmark:897240322411724841> Restarted"
    );
  },
};
