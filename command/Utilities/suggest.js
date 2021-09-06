const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "suggest",
  description: "Make a suggestion of the bot",
  category: "Utilities",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const questions = [
      "Describe the suggestion",
      //"question 2"
    ];
    let collectCounter = 0;
    let endCounter = 0;
    const filter = m => m.author.id === interaction.user.id;
    await interaction.followUp("Check your dm.");
    const appStart = await interaction.user.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            interaction.user.username,
            interaction.user.displayAvatarURL()
          )
          .setDescription(questions[collectCounter++])
          .setFooter(client.user.username)
          .setTimestamp(),
      ],
    });
    const channel = appStart.channel;
    const collector = channel.createMessageCollector(filter);
    collector.on("collect", () => {
      if (collectCounter < questions.length) {
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                interaction.user.username,
                interaction.user.displayAvatarURL()
              )
              .setDescription(questions[collectCounter++])
              .setFooter(client.user.username)
              .setTimestamp(),
          ],
        });
      } else {
        channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("SUCCESS!")
              .setDescription(
                "You have sent a suggestion.\nPlease wait for us to review it"
              )
              .setColor("GREEN")
              .setFooter(`Made by ${client.author}`)
              .setTimestamp(),
          ],
        });
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

        appsChannel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                interaction.member.user.tag,
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
