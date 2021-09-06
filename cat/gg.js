const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "gg",
  timeout: 15000,

  run: async (client, message, args) => {
    const GG = [
      "**GIT GUD**",
      "Git gud kid",
      "good game *question mark*",
      "gg l0ser",
      "delet cod gg",
      "*ggwp*",
      "I was lagging doe",
      "```Stop using this command```",
      "<a:partyy:804324497531863060> ez pz <a:partyy:804324497531863060>",
      "<a:REEEE:804324566259204107>",
      "**GOOD GAME WELL PLAYED**",
      "<a:greenflame:804325192330641408> get rektd <a:greenflame:804325192330641408>",
      "<a:lollll:804325253265621012><a:lollll:804325253265621012><a:lollll:804325253265621012><a:lollll:804325253265621012><a:lollll:804325253265621012>",
    ];
    const GGIndex = GG[Math.floor(Math.random() * GG.length)];
    message.delete();
    message.channel.send(`${GGIndex}`);
  },
};
