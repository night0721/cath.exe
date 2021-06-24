const { Client, Message, MessageEmbed } = require("discord.js");

const answers = [
  "Maybe.",
  "Certainly not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope not.",
  "I hope so.",
  "Never!",
  "Fuhgeddaboudit.",
  "Ahaha! Really?!?",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say.",
  "Who cares?",
  "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!",
];

module.exports = {
  name: "8ball",
  usage: "(Question)",
  description: "8ball an answer",
  category: "Fun",
  run: async (client, message, args) => {
    if (!args.join(" ").endsWith("?"))
      return client.err(message, "Fun", "8ball", 101);
    else {
      const embed = new MessageEmbed()
        .setAuthor(
          `🎱 ${message.member.displayName} asks`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**🎱Question:** \n${args.join(" ")} \n**🎱Answer:** \n ${
            answers[Math.floor(Math.random() * answers.length)]
          }`
        )
        .setColor(client.color)
        .setTimestamp()
        .setURL(client.web)
        .setFooter(`Made by ${client.author}`);
      message.inlineReply(embed);
    }
  },
};
