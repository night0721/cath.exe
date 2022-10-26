const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "suggest",
  description: "Make a suggestion of the bot",
  category: "Utilities",

  run: async (client, interaction, args) => {
    const questions = [
      "Describe the suggestion",
      // "question 2"
    ];
    let collectCounter = 0;
    let endCounter = 0;
    const filter = m => m.author.id === interaction.user.id;
    interaction.followUp("Check your dm.");
    const appStart = await interaction.user.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor(
            interaction.user.username,
            interaction.user.displayAvatarURL()
          )
          .setDescription(questions[collectCounter++])
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp(),
      ],
    });
    const channel = appStart.channel;
    const collector = channel.createMessageCollector({ filter });
    collector.on("collect", () => {
      if (collectCounter < questions.length) {
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor(
                interaction.user.username,
                interaction.user.displayAvatarURL()
              )
              .setDescription(questions[collectCounter++])
              .setFooter({
                text: `Made by ${client.author}`,
                iconURL: client.user.displayAvatarURL(),
              })
              .setTimestamp(),
          ],
        });
      } else {
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("SUCCESS!")
              .setDescription(
                "You have sent a suggestion.\nPlease wait for us to review it"
              )
              .setColor("GREEN")
              .setFooter({
                text: `Made by ${client.author}`,
                iconURL: client.user.displayAvatarURL(),
              })
              .setTimestamp(),
          ],
        });
        collector.stop("fulfilled");
      }
    });
    const appsChannel = client.channels.cache.get(client.config.Config);
    collector.on("end", (collected, reason) => {
      if (reason === "fulfilled") {
        const mapedResponses = collected
          .map(msg => {
            return `${questions[endCounter++]}**\n->** ${msg.content}`;
          })
          .join("\n\n");

        appsChannel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor(
                interaction.user.tag,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setTitle("New Suggestion")
              .setDescription(mapedResponses)
              .setColor("ORANGE")
              .setTimestamp(),
          ],
        });
      }
    });
  },
};
