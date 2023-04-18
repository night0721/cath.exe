const { MessageEmbed, MessageAttachment } = require("discord.js");
const { random8ball } = require("cath");
module.exports = {
  name: "fun",
  description: "Fun commands",
  options: [
    {
      type: 1,
      name: "8ball",
      description: "8ball an answer",
      options: [
        {
          type: 3,
          name: "question",
          description: "The question you want to ask",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "rickroll",
      description: "Rickroll?",
    },
    {
      type: 1,
      name: "emojify",
      description: "Emojify a sentence",
      options: [
        {
          type: 3,
          name: "text",
          description: "The text you want to convert",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "pp",
      description: "Check how long is the user",
      options: [
        {
          type: 6,
          name: "user",
          description: "The user you want to see",
          required: false,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0] == "8ball") {
      const data = await random8ball();
      const embed = new MessageEmbed()
        .setAuthor(
          `🎱 ${interaction.user.tag} asks`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**🎱Question:** \n${args[1]} \n**🎱Answer:** \n ${data}`
        )
        .setColor(client.color)
        .setTimestamp()
        .setURL(client.web)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL());
      interaction.followUp({ embeds: [embed] });
    } else if (args[0] === "rickroll") {
      const roll = [
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
      ];
      const rick = roll[Math.floor(Math.random() * roll.length)];
      interaction.followUp({
        content: `**${rick}**`,
        files: [
          new MessageAttachment(
            "https://i.pinimg.com/originals/88/82/bc/8882bcf327896ab79fb97e85ae63a002.gif"
          ),
        ],
      });
    } else if (args[0] === "emojify") {
      const mapping = {
        " ": "   ",
        0: ":zero:",
        1: ":one:",
        2: ":two:",
        3: ":three:",
        4: ":four:",
        5: ":five:",
        6: ":six:",
        7: ":seven:",
        8: ":eight:",
        9: ":nine:",
        "!": ":grey_exclamation:",
        "?": ":grey_question:",
        "#": ":hash:",
        "*": ":asterisk:",
      };
      "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
      });
      interaction.followUp(
        args[1]
          .split("")
          .map(c => mapping[c] || c)
          .join("")
      );
    } else if (args[0] === "pp") {
      const { user } =
        interaction.guild.members.cache.get(args[1]) || interaction.member;
      const embed = new MessageEmbed()
        .addField(
          `${user.username}'s peepee`,
          `8${"=".repeat(Math.floor(Math.random() * 20))}D`
        )
        .setColor(client.color)
        .setTitle("Peepee size machine")
        .setTimestamp()
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL());
      interaction.followUp({
        embeds: [embed],
      });
    }
  },
};
