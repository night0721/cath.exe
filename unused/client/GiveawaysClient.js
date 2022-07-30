const { GiveawaysClient } = require("cath");
const client = require("../..");
require("dotenv").config();
module.exports = new GiveawaysClient({
  client,
  MongooseConnectionURI: process.env.MONGO,
  GiveawayMessages: {
    dmWinner: true,
    giveaway: "🎉 **GIVEAWAY** 🎉",
    giveawayDescription:
      "🎁 Prize: **{award}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): `{winners}` \n🙏 Entrants: {totalParticipants} \n\n**Requirements:** {requirements}",
    endedGiveawayDescription:
      "🎁 Prize: **{award}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): {winners} \n🙏 Entrants: {totalParticipants}",
    giveawayFooterImage: "https://emoji.gg/assets/emoji/3461-giveaway.gif",
    winMessage:
      "Congratulations {winners}! You have won **{award}** from total `{totalParticipants}` entrants!",
    rerolledMessage: "Rerolled! {winner} is the new winner of the giveaway!",
    toParticipate: "**Click the `Enter` button to enter the giveaway!**",
    newParticipant:
      "You have successfully entered for this giveaway! There are total `{totalParticipants}` entrants",
    alreadyParticipated: "**You have already participated in this giveaway!**",
    noParticipants: "There isn't enough entrant in this giveaway!",
    noRole:
      "You don't have the required role(s)\n{requiredRoles}\n for the giveaway!",
    dmMessage:
      "You have won a giveaway in **{guildName}**!\nPrize: [{award}]({giveawayURL})",
    noWinner:
      "There isn't any winner in this giveaway due to not enough entrants",
    alreadyEnded: "The giveaway had already ended!",
    dropWin: "{winner} Won The Drop!!",
    noWeeklyExp:
      "you dont have the required minimum weekly xp to join this giveaway",
    noLevel: "You dont have the minimum required level to join this giveaway",
    nonoRole:
      "You do not have the {requiredRoles} role(s) which is required to join this giveaway",
    editParticipants: true,
  },
});
