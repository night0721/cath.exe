const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "grab",
  description: "Saves the current song to your Direct Messages",
  run: async (client, interaction, args, utils) => {
    const player = await client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel.id;
    if (!channel) {
      client.err(
        interaction,
        "**You must be in a voice channel to use this command.**"
      );
    }
    if (player.voiceChannel !== channel) {
      client.err(
        interaction,
        "**You must be in the same voice channel as me to use this command**"
      );
    }
    if (!player) client.err(interaction, "**Nothing is playing right now**");
    try {
      const embed = new EmbedBuilder()
        .setAuthor(
          `Song saved: `,
          "https://cdn.discordapp.com/emojis/897017864085712936.gif"
        )
        .setThumbnail(
          `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
        )
        .setURL(player.queue.current.uri)
        .setColor(client.color)
        .setTimestamp()
        .setTitle(`**${player.queue.current.title}**`)
        .addField(
          `⌛ Duration: `,
          `\`${utils.prettyMs(player.queue.current.duration, {
            colonNotation: true,
          })}\``,
          true
        )
        .addField(`🎵 Author: `, `\`${player.queue.current.author}\``, true)
        .addField(`▶ Play it:`, `\`${player.queue.current.uri}\``)
        .addField(`🔎 Saved in:`, `<#${interaction.channel.id}>`)
        .setFooter({
          text: `Made by ${client.author}`,
          iconURL: client.user.displayAvatarURL(),
        });
      interaction.user.send({ embeds: [embed] });
    } catch (e) {
      console.log(e);
      return client.err(interaction, "**Your DM are disabled**");
    }
    client.se(interaction, "✅ | **Check your DM**");
  },
};
