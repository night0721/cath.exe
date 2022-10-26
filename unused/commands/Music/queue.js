const { EmbedBuilder } = require("discord.js");
const { Pagination } = require("cath");
module.exports = {
  name: "queue",
  description: "To show the songs queue",
  category: "Music",
  run: async (client, interaction, args, utils) => {
    const pagination = new Pagination();
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
    if (!player.queue || !player.queue.length || player.queue === 0) {
      const QueueEmbed = new EmbedBuilder()
        .setAuthor(
          "Currently playing",
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.color)
        .setDescription(
          `[${player.queue.current.title}](${player.queue.current.uri})`
        )
        .addField("Requested by", `${player.queue.current.requester}`, true)
        .addField(
          "Duration",
          `${
            utils.progressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${utils.prettyMs(player.position, {
            colonNotation: true,
          })} / ${utils.prettyMs(player.queue.current.duration, {
            colonNotation: true,
          })}]\``
        )
        .setTimestamp()
        .setThumbnail(player.queue.current.displayThumbnail());
      interaction.followUp({ embeds: [QueueEmbed] });
    }
    const queue = player.queue.map((t, i) => {
      t.index = i;
      return t;
    });
    const mapped = queue.map((t, i) => {
      if (i == 0) {
        return `**Up Next:** \n\`${t.index + 1}:\` [${t.title}](${
          t.uri
        }) \n\`${utils.prettyMs(t.duration, {
          colonNotation: true,
        })}\` **|** Requested by: ${t.requester}\n`;
      } else {
        return `\n\`${t.index + 1}:\` [${t.title}](${
          t.uri
        }) \n\`${utils.prettyMs(t.duration, {
          colonNotation: true,
        })}\` **|** Requested by: ${t.requester}\n`;
      }
    });

    const c = pagination.chunk(mapped, 10).map(x => x.join("\n"));
    const embed = new EmbedBuilder()
      .setAuthor(
        `Queue for ${interaction.guild.name}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setColor(client.color)
      .setDescription(c[0])
      .addField("Total songs: \n", `\`${player.queue.totalSize - 1}\``, true)
      .addField(
        "Total length: \n",
        `\`${utils.prettyMs(player.queue.duration, {
          colonNotation: true,
        })}\``,
        true
      )
      .addField("Requested by:", `${player.queue.current.requester}`, true)
      .addField(
        "Current song duration:",
        `${
          utils.progressBar(player.position, player.queue.current.duration, 15)
            .Bar
        } \`[${utils.prettyMs(player.position, {
          colonNotation: true,
        })} / ${utils.prettyMs(player.queue.current.duration, {
          colonNotation: true,
        })}]\``
      )
      .addField(
        "**Currently Playing:**",
        `[${player.queue.current.title}](${player.queue.current.uri})`,
        true
      )
      .setTimestamp()
      .setFooter({ text: `Page 1 of ${c.length}` })
      .setThumbnail(player.queue.current.displayThumbnail());
    const msg = await interaction.followUp({
      embeds: [embed],
    });
    pagination.pagination(msg, interaction.user, c);
  },
};
