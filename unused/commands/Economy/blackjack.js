const Discord = require("discord.js");
module.exports = {
  name: "blackjack",
  usage: "(Number)",
  description: "Play a blackjack game to win money",
  category: "Economy",
  timeout: 10000,
  options: [
    {
      type: 4,
      name: "cp",
      description: "The number of CP you want to give",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let money = args[0];
    const max = 100000;
    if (money > max) money = max;
    const user = interaction.user;
    if (money < 100) {
      interaction.followUp({
        content: `You need to blackjack at least 100 ${client.currency}`,
      });
    } else if ((await client.bal(user.id)) < money) {
      interaction.followUp({ content: "You don't have enough balance" });
    } else {
      let numCardsPulled = 0;
      let gameOver = false;
      const player = {
        cards: [],
        score: 0,
      };
      const dealer = {
        cards: [],
        score: 0,
      };
      function getCardsValue(a) {
        let cardArray = [],
          sum = 0,
          i = 0,
          dk = 10.5,
          doubleking = "QQ",
          aceCount = 0;
        cardArray = a;
        for (i; i < cardArray.length; i += 1) {
          if (
            cardArray[i].rank === "J" ||
            cardArray[i].rank === "Q" ||
            cardArray[i].rank === "K"
          ) {
            sum += 10;
          } else if (cardArray[i].rank === "A") {
            sum += 11;
            aceCount += 1;
          } else if (cardArray[i].rank === doubleking) {
            sum += dk;
          } else {
            sum += cardArray[i].rank;
          }
        }
        while (aceCount > 0 && sum > 21) {
          sum -= 10;
          aceCount -= 1;
        }
        return sum;
      }

      const deck = {
        deckArray: [],
        initialize: function () {
          let suitArray, rankArray, s, r, n;
          suitArray = ["b", "d", "g", "s"];
          rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
          n = 13;

          for (s = 0; s < suitArray.length; s += 1) {
            for (r = 0; r < rankArray.length; r += 1) {
              this.deckArray[s * n + r] = {
                rank: rankArray[r],
                suit: suitArray[s],
              };
            }
          }
        },
        shuffle: function () {
          let temp, i, rnd;
          for (i = 0; i < this.deckArray.length; i += 1) {
            rnd = Math.floor(Math.random() * this.deckArray.length);
            temp = this.deckArray[i];
            this.deckArray[i] = this.deckArray[rnd];
            this.deckArray[rnd] = temp;
          }
        },
      };
      deck.initialize();
      deck.shuffle();
      async function bet(outcome) {
        if (outcome === "win") {
          await client.add(user.id, money, interaction);
          await client.ADDBJWin(interaction.user.id);
        }
        if (outcome === "lose") {
          await client.rmv(user.id, money);
        }
      }

      function endMsg(f, msg, cl, dealerC) {
        let cardsMsg = "";
        player.cards.forEach(function (card) {
          const emAR = ["♥", "♦", "♠", "♣"];
          const t = emAR[Math.floor(Math.random() * emAR.length)];
          cardsMsg += "[`" + t + card.rank.toString();
          if (card.suit == "d1") cardsMsg += "♥";
          if (card.suit == "d2") cardsMsg += "♦";
          if (card.suit == "d3") cardsMsg += "♠";
          if (card.suit == "d4") cardsMsg += "♣";
          cardsMsg += "`](https://cath.gq/) ";
        });
        cardsMsg += " > " + player.score.toString();

        let dealerMsg = "";
        if (!dealerC) {
          const emAR = ["♥", "♦", "♠", "♣"];
          const t = emAR[Math.floor(Math.random() * emAR.length)];
          dealerMsg = "[`" + t + dealer.cards[0].rank.toString();
          if (dealer.cards[0].suit == "d1") dealerMsg += "♥";
          if (dealer.cards[0].suit == "d2") dealerMsg += "♦";
          if (dealer.cards[0].suit == "d3") dealerMsg += "♠";
          if (dealer.cards[0].suit == "d4") dealerMsg += "♣";
          dealerMsg += " ? ?`](https://cath.gq/)";
        } else {
          dealerMsg = "";
          dealer.cards.forEach(function (card) {
            const emAR = ["♥", "♦", "♠", "♣"];
            const t = emAR[Math.floor(Math.random() * emAR.length)];
            dealerMsg += "[`" + t + card.rank.toString();
            if (card.suit == "d1") dealerMsg += "♥";
            if (card.suit == "d2") dealerMsg += "♦";
            if (card.suit == "d3") dealerMsg += "♠";
            if (card.suit == "d4") dealerMsg += "♣";
            dealerMsg += "`](https://cath.gq/) ";
          });
          dealerMsg += " > " + dealer.score.toString();
        }

        const gambleEmbed = new Discord.EmbedBuilder()
          .setColor(cl || client.color)
          .setTimestamp()
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTitle(interaction.user.username + `'s Blackjack game`)
          .addField("You", cardsMsg, true)
          .addField("NYX", dealerMsg, true)
          .addField(f, msg);
        interaction.followUp({ embeds: [gambleEmbed] });
      }

      async function endGame() {
        if (player.score === 21) {
          bet("win");
          gameOver = true;
          await endMsg(
            `Win! You got 21!`,
            `NYX had ${dealer.score.toString()}`,
            `GREEN`
          );
        }
        if (player.score > 21) {
          bet("lose");
          gameOver = true;
          await endMsg(
            `Lost! You reached over 21!`,
            `NYX had ${dealer.score.toString()}`,
            `RED`
          );
        }
        if (dealer.score === 21) {
          bet("lose");
          gameOver = true;
          await endMsg(
            `Lost! The dealer got 21!`,
            `NYX had ${dealer.score.toString()}`,
            `RED`
          );
        }
        if (dealer.score > 21) {
          bet("win");
          gameOver = true;
          await endMsg(
            `Win! NYX reached over 21!`,
            `NYX had ${dealer.score.toString()}`,
            `GREEN`
          );
        }
        if (
          dealer.score >= 17 &&
          player.score > dealer.score &&
          player.score < 21
        ) {
          bet("win");
          gameOver = true;
          await endMsg(
            `Win! You defeated NYX!`,
            `NYX had ${dealer.score.toString()}`,
            `GREEN`
          );
        }
        if (
          dealer.score >= 17 &&
          player.score < dealer.score &&
          dealer.score < 21
        ) {
          bet("lose");
          gameOver = true;
          await endMsg(
            `Lost! NYX won!`,
            `NYX had ${dealer.score.toString()}`,
            `RED`
          );
        }
        if (
          dealer.score >= 17 &&
          player.score === dealer.score &&
          dealer.score < 21
        ) {
          gameOver = true;
          await endMsg(`Tie!`, `NYX had ${dealer.score.toString()}`, `RED`);
        }
      }

      function dealerDraw() {
        dealer.cards.push(deck.deckArray[numCardsPulled]);
        dealer.score = getCardsValue(dealer.cards);
        numCardsPulled += 1;
      }

      function newGame() {
        hit();
        hit();
        dealerDraw();
        endGame();
      }

      function hit() {
        player.cards.push(deck.deckArray[numCardsPulled]);
        player.score = getCardsValue(player.cards);

        numCardsPulled += 1;
        if (numCardsPulled > 2) {
          endGame();
        }
      }

      function stand() {
        while (dealer.score < 17) {
          dealerDraw();
        }
        endGame();
      }
      newGame();
      async function loop() {
        if (gameOver) return;

        endMsg(
          "To hit type `h`, for stand type `s`",
          `GoodLuck ;)`,
          client.color
        );

        const filter = m => m.author.id === interaction.user.id;
        interaction.channel
          .awaitMessages({ filter, max: 1, time: 1200000, errors: ["time"] })
          .then(interaction => {
            interaction = interaction.first();
            if (
              interaction.content.toLowerCase() === "h" ||
              interaction.content.toLowerCase() === "hit"
            ) {
              hit();
              loop();
              return;
            } else if (
              interaction.content.toLowerCase() === "s" ||
              interaction.content.toLowerCase() === "stand"
            ) {
              stand();
              loop();
              return;
            } else {
              bet("lose");
              endMsg("Invalid response", `You lost ${money}`, "RED");
              return;
            }
          })
          .catch(_ => {
            interaction.channel.send({ content: "Lost!!" });
            bet("lose");
            return;
          });
      }
      await loop();
    }
  },
};
