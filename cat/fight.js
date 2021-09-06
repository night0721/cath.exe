const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "fight",
  description: "Goooooooooooooooolag!",
  timeout: 15000,

  run: async (client, message, args) => {
    const gaes = [
      "Gae",
      "Super Gae",
      "Ultra Gae",
      "Snow Gae",
      "Ultimate Gae",
      "Terminal Gae",
      "Akimbo Gae",
      "Dead(extended timer)",
      "Mega Gae",
      "Cheez Gae",
      "Gath Gae",
      "Koosun Gae",
      "KDR Gae",
      "Gaezer Gae",
      "Big Gae",
      "Horni Gae",
      "Zero Gae",
      "Gae beyond repair",
      "Dead×2(extended timer)",
      "Not Gae",
      "Animus Gae",
      "Dust Gae",
      "Orcus Gae",
      "Gulag Cleaner",
      "Kedar Gae",
      "Smol Gae",
      "Meta Gae",
      "Mono Gae",
      "Stippled Gae",
      "BSA Gae",
      "Oreo Gae",
      "Random Gae",
      "Tortol Gae",
      "Amogus Gae",
      "Gae×2",
      "Dan Gae",
      "Real Gae©®™",
      "Mastered Ultra Instinct Gae",
      "Bamboozled",
      "More Gae",
      "Morrre Gae",
      "Most Gae",
      "Undisputable Gae",
      "Gae Prince of Horni",
      "Gae with Y",
      "Phatopenisis Gae",
      "Gathophile",
      "a Bot",
      "locknload with 200 round RPD gae",
      "ros gae",
      "Cath Gae",
      "Cat drinking a cat gae",
      "Night Gae",
    ];
    const gae = gaes[Math.floor(Math.random() * gaes.length)];
    const embed = new MessageEmbed()
      .setTitle("**Gulag Fight**")
      .setDescription(
        `**${message.author} has taken a chance at redemption in The Gulag. \nYou fight only to find out that you're \`${gae}\`. If you somehow turned out to not be gae, DM an admin to get your timer halved ||only if your mute is less than 69m||**`
      )
      .setColor(5198940);
    message.channel.send({ embeds: [embed] });
  },
};
