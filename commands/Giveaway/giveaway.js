const ms = require("ms");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "giveaway",
  aliases: ["gstart"],
  description: "Start a giveaway",
  usage: "(Channel) (Time) (Winners(Number)) (Prize)",
  UserPerm: "MANAGE_MESSAGES",
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
    if (!channel) return client.err(message, "Giveaway", "giveaway", 28);
    const duration = args[1];
    if (!duration) return client.err(message, "Giveaway", "giveaway", 29);
    const winners = parseInt(args[2]);
    if (!winners) return client.err(message, "Giveaway", "giveaway", 30);
    if (isNaN(winners)) return client.err(message, "Giveaway", "giveaway", 31);
    const prize = args.slice(3).join(" ");
    if (!prize) return client.err(message, "Giveaway", "giveaway", 32);
    client.giveaways.start(channel, {
      time: ms(duration),
      prize: prize,
      winnerCount: winners,
      hostedBy: message.author,
      messages: {
        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: "Time Remaining **{duration}**!",
        inviteToParticipate: "React with 🎉 to enter!",
        winMessage: `Congratulations {winners}! You won the **${prize}**!`,
        noWinner: "Could not determine a winner!",
        embedFooter: `Made by ${client.author}`,
        hostedBy: "Hosted by: {user}",
        winners: "Winner(s)",
        messageURL: "",
        endedAt: "Ends at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false,
        },
      },
    });
    message.inlineReply(`Giveaway is started in ${channel}`);
  },
};
