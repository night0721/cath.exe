module.exports = {
  name: "getinvite",
  category: "Owner",
  usage: "(Guild)",
  description: "Generates an invitation to the server",
  Owner: true,
  options: [
    {
      type: 3,
      name: "guild",
      description: "The guild you want to get invite (Server ID/Name)",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let guild = null;
    const fetched =
      client.guilds.cache.find(g => g.name === args.join(" ")) ||
      client.guilds.cache.get(args[0]);
    guild = fetched;
    if (guild) {
      const tChannel = guild.channels.cache.find(
        ch =>
          ch.type == "GUILD_TEXT" &&
          ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE")
      );
      if (!tChannel) {
        interaction.followUp({
          content: `\`${args.join(
            " "
          )}\` - Bot can't get invite since it doesn't get enough permission`,
        });
      }
      const invite = await tChannel
        .createInvite({ temporary: false, maxAge: 0 })
        .catch(e => {
          console.log(e);
          interaction.followUp({ content: e.stack });
        });
      interaction.followUp({ content: invite.url });
    } else {
      interaction.followUp({
        content: `\`${args.join(" ")}\` - Bot isn't in that server`,
      });
    }
  },
};
