const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "rps",
  aliases: ["rockpapersscissors"],
  description: "Play a rock paper scissors game",
  category: "Fun",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setTitle("RPS GAME")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "```Add a reaction to one of these emojis to play the game!```"
      )
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`)
      .setTimestamp();
    let msg = await message.channel.send(embed);
    await msg.react("✊");
    await msg.react("✂");
    await msg.react("📄");
    const filter = (reaction, user) => {
      return (
        ["✊", "✂", "📄"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };
    const choices = ["✊", "✂", "📄"];
    const me = choices[Math.floor(Math.random() * choices.length)];
    msg
      .awaitReactions(filter, { max: 1, time: 60000, error: ["time"] })
      .then(async collected => {
        const reaction = collected.first();
        if (
          (me === "✊" && reaction.emoji.name === "✂") ||
          (me === "📄" && reaction.emoji.name === "✊") ||
          (me === "✂" && reaction.emoji.name === "📄")
        ) {
          const reaction = collected.first();
          let result = new MessageEmbed()
            .setTitle("You lost!")
            .setColor("RED")
            .setFooter(`Made by ${client.author}`)
            .setTimestamp()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField("Your choice", `${reaction.emoji.name}`)
            .addField("My choice", `${me}`);
          await msg.edit("", result);
        } else if (me === reaction.emoji.name) {
          const reaction = collected.first();
          let result = new MessageEmbed()
            .setTitle("Tie!")
            .setColor("GREY")
            .setFooter(`Made by ${client.author}`)
            .setTimestamp()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField("Your choice", `${reaction.emoji.name}`)
            .addField("My choice", `${me}`);
          await msg.edit("", result);
        } else {
          const reaction = collected.first();
          let result = new MessageEmbed()
            .setTitle("You won!")
            .setColor("GREEN")
            .setFooter(`Made by ${client.author}`)
            .setTimestamp()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField("Your choice", `${reaction.emoji.name}`)
            .addField("My choice", `${me}`);
          await msg.edit("", result);
        }
      })
      .catch(r => {
        console.log(r);
        message.inlineReply(
          "Your game has lost since you didn't response in time"
        );
      });
  },
};
