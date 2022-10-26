const { EmbedBuilder } = require("discord.js");
const client = require("../..");
client.on("voiceStateUpdate", async (oldState, newState) => {
  const guildId = newState.guild.id;
  const player = client.manager.get(guildId);
  if (!player || player.state !== "CONNECTED") return;

  const stateChange = {};
  if (oldState.channel === null && newState.channel !== null) {
    stateChange.type = "JOIN";
  }
  if (oldState.channel !== null && newState.channel === null) {
    stateChange.type = "LEAVE";
  }
  if (oldState.channel !== null && newState.channel !== null) {
    stateChange.type = "MOVE";
  }
  if (oldState.channel === null && newState.channel === null) return;
  if (newState.serverMute == true && oldState.serverMute == false) {
    return player.pause(true);
  }
  if (newState.serverMute == false && oldState.serverMute == true) {
    return player.pause(false);
  }
  if (stateChange.type === "MOVE") {
    if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
    if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
  }
  if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;
  if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel) {
    return;
  }
  stateChange.members = stateChange.channel.members.filter(
    member => !member.user.bot
  );
  switch (stateChange.type) {
    case "JOIN":
      if (stateChange.members.size === 1 && player.paused) {
        const emb = new EmbedBuilder()
          .setAuthor(`Resumed`, client.user.displayAvatarURL())
          .setColor(client.config.color)
          .setDescription(
            `Resuming the player as somebody join the voice channel`
          );
        client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
        player.pause(false);
      }
      break;
    case "LEAVE":
      if (stateChange.members.size === 0 && !player.paused && player.playing) {
        player.pause(true);
        const emb = new EmbedBuilder()
          .setAuthor(`Paused`, client.user.displayAvatarURL())
          .setColor(client.config.color)
          .setDescription(
            `The player has been paused as nobody is in the voice channel`
          );
        client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
      }
      break;
  }
});
