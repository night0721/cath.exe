const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "nab",
  timeout: 15000,

  run: async (client, message, args) => {
    const NAB = [
      "stop being a nab, nab",
      "Lmao you a nab",
      "Biggest nab of all time",
      "You're just a nab",
      "Okay calm down nab",
      "**Stop** spamming this command you **nab**",
      "```I told you to stop spamming this command nab```",
      "Get rekt nab XD Jajajajajaja",
      "**N.A.B.**",
      "Better luck next time nab",
      "Ooooh look at me im better than you nab",
      "Whoever used C.nab, is a nab",
      "Stfu nab",
      "**you cant aim**",
      "*bonjour* nab",
      "u = <a:pepetriggered:804327257145081877>",
      "Go back to tiktok <a:frogcrazy:804327200659865610>",
    ];
    const NABIndex = NAB[Math.floor(Math.random() * NAB.length)];
    message.delete();
    message.channel.send(`${NABIndex}`);
  },
};
