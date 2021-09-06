const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "auth",
  run: async (client, message, args) => {
    const random = client.function.rndint(100000, 999999);
    let ed;
    const questions = [
      `Please enter the following code to authenicate\n\n\`${random}\``,
    ];
    let collectCounter = 0;
    let endCounter = 0;
    const filter = m => m.author.id === message.author.id;
    message.reply("Please check your DM.");
    try {
      const appStart = await message.author.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle("One-Time Password")
          .setDescription(questions[collectCounter++])
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`)
          .setTimestamp()
      );
      const channel = appStart.channel;
      const collector = channel.createMessageCollector(filter);
      collector.on("collect", () => {
        collector.stop("fulfilled");
      });

      collector.on("end", (collected, reason) => {
        if (reason === "fulfilled") {
          const msss = collected.map(msg => {
            if (msg.content === `${random}`) {
              message.author.send(
                new MessageEmbed()
                  .setDescription(`Success`)
                  .setTimestamp()
                  .setColor("GREEN")
                  .setFooter(`Made by ${client.author}`)
              );
            } else {
              message.author.send(
                new MessageEmbed()
                  .setDescription(`Failed\nPlease try again.`)
                  .setTimestamp()
                  .setColor("RED")
                  .setFooter(`Made by ${client.author}`)
              );
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
