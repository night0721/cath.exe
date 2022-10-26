const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "nowplaying",
  description: "Show now playing music info",
  category: "Music",
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
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setAuthor(
            `Current song playing:`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .addField(
            "🕰️ Duration: ",
            `${
              utils.progressBar(
                player.position,
                player.queue.current.duration,
                15
              ).Bar
            } \`${utils.prettyMs(player.position, {
              colonNotation: true,
            })} / ${utils.prettyMs(player.queue.current.duration, {
              colonNotation: true,
            })}\``
          )
          .setThumbnail(player.queue.current.displayThumbnail())
          .setURL(player.queue.current.uri)
          .setColor(client.color)
          .setTitle(`🎶 **${player.queue.current.title}** 🎶`)
          .addField(`🎼 Song By: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `🔢 Queue length: `,
            `\`${player.queue.length} Songs\``,
            true
          )
          .setFooter(
            `Requested by: ${player.queue.current.requester.tag}`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          ),
      ],
    });
  },
};
