const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "queue",
  description: "To show the songs queue",
  aliases: ["q"],
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "queue", 34);
    const queue = player.queue;
    const embed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Queue for ${message.guild.name}`)
      .setTimestamp()
      .setColor("RANDOM");
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
    const end = page * multiple;
    const start = end - multiple;
    const tracks = queue.slice(start, end);
    if (queue.current)
      embed.addField(
        "Current",
        `[${queue.current.title}](${queue.current.uri})`
      );

    if (!tracks.length)
      embed.setDescription(
        `No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`
      );
    else
      embed.setDescription(
        tracks
          .map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`)
          .join("\n")
      );
    const maxPages = Math.ceil(queue.length / multiple);
    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
    return message.reply(embed);
  },
};
