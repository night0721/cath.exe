const { EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js");
const draws = require("../../../util/Data/draws.json");
module.exports = {
  name: "draw",
  description: "Buy a lucky draw",
  run: async (client, message, args, utils) => {
    const embed = new EmbedBuilder()
      .setTitle("**__Daily Lucky Draw__**")
      .setColor(client.color)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setDescription(
        "Welcome to the Lucky Draw,\nclick `Spin`, so that the draw spins and hits a random item.\nClick `Info` to find out how high the probability is\n that a particular item will be unlocked"
      )
      .addFields(
        draws[0].map(c => {
          return { name: c.name, value: c.emoji, inline: true };
        })
      );

    const button1 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("🔄")
      .setLabel("Spin")
      .setCustomId("spin");
    const button2 = new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("894962394932064346")
      .setLabel("Info")
      .setCustomId("spininfo");

    const row = new MessageActionRow().addComponents([button1, button2]);
    const msg = await message.channel.send({
      embeds: [embed],
      components: [row],
    });
    const filter = i =>
      ["spin", "spininfo"].includes(i.customId) &&
      i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({
      filter,
      time: 999999,
    });
    function select() {
      let pick = Math.floor(Math.random() * 100);
      for (const g in draws[0]) {
        pick -= draws[0][g].percent;
        if (pick <= 0) {
          return `You got **${draws[0][g].name}** with propability **${draws[0][g].percent}%**`;
        }
      }
    }
    console.log(utils.colorize("test").magenta);
    collector.on("collect", i => {
      if (i.customId === "spin") {
        i.reply({
          content: select(),
        });
      }
      if (i.customId === "spininfo") {
        i.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("**__Information Table__**")
              .addFields(
                draws[0].map(c => {
                  return {
                    name: `**${c.name}**`,
                    value: `Percentage: ${c.percent}%`,
                    inline: true,
                  };
                })
              )
              .addField("Name:", "**Item 1**")
              .addField("Percent:", "**69**")
              .addField("Emoji:", ":bughuntergold:"),
          ],
        });
      }
    });
  },
};
