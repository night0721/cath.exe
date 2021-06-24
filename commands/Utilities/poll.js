const { Client, Message, MessageEmbed } = require("discord.js");
const { Suggestion } = require("../../config.json");
module.exports = {
  name: "poll",
  description: "Join a poll for develop of this bot",
  category: "Utilities",
  run: async (client, message, args) => {
    const questions = [
      "Which statistic of gun you want to see?",
      //"question 2"
    ];
    let collectCounter = 0;
    let endCounter = 0;
    const filter = m => m.author.id === message.author.id;
    message.reply("check your dm.");
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
            .setDescription("You have joined the poll.")
            .setColor("GREEN")
        );
        collector.stop("fulfilled");
      }
    });

    const appsChannel = client.channels.cache.get(Suggestion);
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
            .setTitle("New Apllication")

            .setDescription(mapedResponses)
            .setColor("ORANGE")
            .setTimestamp()
        );
      }
    });
  },
};
