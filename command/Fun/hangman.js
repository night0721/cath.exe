const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const playing = new Set();
module.exports = {
  name: "hangman",
  description: "Play a hangman game",
  category: "Fun",
  run: async (client, interaction) => {
    await interaction.deleteReply();
    if (playing.has(interaction.channel.id)) {
      return interaction.followUp({
        content: "Only one game may be occurring per channel.",
      });
    }
    playing.add(interaction.channel.id);
    try {
      const data = await axios
        .get(`${process.env.api}/api/v1/fun/hangman`)
        .then(res => res.data);
      const word = data.word;
      let points = 0;
      let displayText = null;
      let guessed = false;
      const confirmation = [];
      const incorrect = [];
      const display = new Array(word.length).fill("◯");
      while (word.length !== confirmation.length && points < 6) {
        const embed = new MessageEmbed()
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setTitle("Hangman game").setDescription(`
					${displayText === null ? "Here we go!" : displayText ? "Good job!" : "Nope!"}
					\`${display.join(" ")}\`. Which letter do you choose?
					Incorrect Tries: ${incorrect.join(", ") || "None"}
					\`\`\`
				 . ┌─────┐
				 . ┃      ┋
				 . ┃      ${points > 0 ? "O" : ""}
				 . ┃     ${points > 2 ? "/" : " "}${points > 1 ? "|" : ""}${
          points > 3 ? "\\" : ""
        }
				 . ┃     ${points > 4 ? "/" : ""}${points > 5 ? "\\" : ""}
				  =============
					\`\`\`
				`);
        await interaction.channel.send({ embeds: [embed] });
        const filter = res => {
          const choice = res.content.toLowerCase();
          return (
            res.author.id === interaction.user.id &&
            !confirmation.includes(choice) &&
            !incorrect.includes(choice)
          );
        };
        const guess = await interaction.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000,
        });
        if (!guess.size) {
          await interaction.channel.send({ content: "Sorry, time is up!" });
          break;
        }
        const choice = guess.first().content.toLowerCase();
        if (choice === "end") break;
        if (choice.length > 1 && choice === word) {
          guessed = true;
          break;
        } else if (word.includes(choice)) {
          displayText = true;
          for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
            confirmation.push(word.charAt(i));
            display[i] = word.charAt(i);
          }
        } else {
          displayText = false;
          if (choice.length === 1) incorrect.push(choice);
          points++;
        }
      }
      playing.delete(interaction.channel.id);
      if (word.length === confirmation.length || guessed) {
        return interaction.channel.send({
          content: `You won. The word is **${word}**!`,
        });
      }
      return interaction.channel.send({
        content: `You lost. The word is **${word}**.`,
      });
    } catch (err) {
      console.log(err);
      playing.delete(interaction.channel.id);
    }
  },
};
