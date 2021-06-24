const { Client, Message, MessageEmbed } = require("discord.js");
require("../../inlinereply");

module.exports = {
  name: "report",
  description: "Report a bug of the bot",
  category: "Utilities",
  run: async (client, message, args) => {
    const questions = [
      "Describe the bug",
      //"question 2"
    ];

    let collectCounter = 0;
    let endCounter = 0;

    const filter = m => m.author.id === message.author.id;
    message.inlineReply("Check your dm.");
    const appStart = await message.author.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(questions[collectCounter++])
        .setFooter(client.user.username)
        .setTimestamp()
    );
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);

    collector.on("collect", () => {
      if (collectCounter < questions.length) {
        channel.send(
          new MessageEmbed()
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL()
            )
            .setDescription(questions[collectCounter++])
            .setFooter(client.user.username)
            .setTimestamp()
        );
      } else {
        channel.send(
          new MessageEmbed()
            .setTitle("SUCCESS!")
            .setDescription(
              "You have reported a bug.\nPlease wait for us to solve it"
            )
            .setColor("GREEN")
        );
        collector.stop("fulfilled");
      }
    });

    const appsChannel = client.channels.cache.get(client.ReportLog);
    collector.on("end", (collected, reason) => {
      if (reason === "fulfilled") {
        let index = 1;
        const mapedResponses = collected
          .map(msg => {
            return `${questions[endCounter++]}**\n->** ${msg.content}`;
          })
          .join("\n\n");

        appsChannel.send(
          new MessageEmbed()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTitle("New Bug")
            .setDescription(mapedResponses)
            .setColor("ORANGE")
            .setTimestamp()
        );
      }
    });
  },
};
