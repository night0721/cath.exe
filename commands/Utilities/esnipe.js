const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "editsnipe",
  category: "Utilities",
  aliases: ["esnipe"],
  usage: "{Channel}",
  description: "Snipe an edited message",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel,
      snipes = client.esnipes.get(channel.id),
      page = 0,
      reactions = ["◀️", "⏪", "⏩", "▶️"];
    if (!snipes)
      return message.reply(
        `No snipes have been found for the channel \`${channel.name}\``
      );

    let users = await Promise.all(
      snipes.map(snipe =>
        client.users.fetch(
          snipe.author === "No author found??" ? client.user.id : snipe.author
        )
      )
    );
    if (args[0] === "--history") {
      let embed = new MessageEmbed()
        .addField("Channel:", `${channel} (${channel.name})`)
        .addField(
          "History",
          `${
            snipes.length > 20
              ? `${snipes
                  .map(
                    (snipe, c) =>
                      `${users[c].tag} | ${moment
                        .utc(snipe.date)
                        .fromNow()} | snipe **${c + 1}**`
                  )
                  .slice(0, 20)
                  .join("\n")}\n ${snipes.length - 20} more...`
              : `${snipes
                  .map(
                    (snipe, c) =>
                      `${users[c].tag} | ${moment
                        .utc(snipe.date)
                        .fromNow()} | snipe **${c + 1}**`
                  )
                  .slice(0, 20)
                  .join("\n")}`
          }`
        );
      let msg = await message.channel.send(embed);

      await Promise.all(reactions.map(r => msg.react(r)));
      const backwardsFilter = (reaction, user) =>
        user.id === message.author.id &&
        reactions.includes(reaction.emoji.name);
      const backwards = msg.createReactionCollector(backwardsFilter);
      backwards.on("collect", r => {
        switch (r.emoji.name) {
          case "⏪":
            page = 0;
            break;
          case "⏩":
            page = snipes.length;
            break;
          case "◀️":
            page === 1
              ? (page = 0)
              : page === 0
              ? (page = snipes.length)
              : page--;
            break;
          case "▶️":
            page === snipes.length ? (page = 1) : page++;
            break;
        }
        if (page === 0) {
          let embed = new MessageEmbed()
            .addField("Channel:", `${channel} (${channel.name})`)
            .addField(
              "History",
              `${snipes.length
                .map(
                  (snipe, c) =>
                    `${users[c].tag} | ${moment
                      .utc(snipe.date)
                      .fromNow()} | snipe **${c + 1}**`
                )
                .slice(0, 20)
                .join("\n")}`
            );
          msg.edit(embed);
        } else {
          let newembed = new MessageEmbed()
            .setAuthor(
              `${client.users.cache.get(snipes[page - 1].author).tag}`,
              `${client.users.cache
                .get(snipes[page - 1].author)
                .displayAvatarURL({ format: "png", dynamic: true })}`
            )
            .addField("Channel:", `${channel} (${channel.name})`)
            .addField("When:", `${moment.utc(snipes[page - 1].date).fromNow()}`)
            .addField(
              "Content:",
              snipes[page - 1].content || "No content could be found"
            )
            .addField(
              "New content:",
              snipes[page - 1].newContent || "No new content could be found"
            )
            .setFooter(`${page}/${snipes.length}`);
          snipes[page - 1].image !== null
            ? newembed.setImage(snipes[page - 1].image)
            : "";
          msg.edit(newembed);
        }
      });
    } else {
      let num = isNaN(args[0])
        ? 0
        : !args[0]
        ? 0
        : args[0] < snipes.length && args[0] > 0
        ? args[0]
        : 0;
      let embed = new MessageEmbed()
        .setAuthor(
          `${
            client.users.cache.get(snipes[num].author)
              ? client.users.cache.get(snipes[num].author).tag
              : "no"
          }`,
          `${client.users.cache
            .get(snipes[num].author)
            .displayAvatarURL({ format: "png", dynamic: true })}`
        )
        .addField("Channel:", `${channel} (${channel.name})`)
        .addField("When:", `${moment.utc(snipes[num].date).fromNow()}`)
        .addField(
          "Content:",
          snipes[num].content || "No content could be found"
        )
        .addField(
          "New content:",
          snipes[num].newContent || "No new content could be found"
        )
        .setFooter(`Showing snipe ${parseInt(num) + 1}`);
      snipes[0].image !== null ? embed.setImage(snipes[num].image) : "";
      await message.channel.send(embed);
    }
  },
};
