const Discord = require("discord.js");

module.exports = {
  name: "rockpaperscissors",
  description: "Play RPS with someone",
  usage: "(User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to play with",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args, utils) => {
    let user = interaction.guild.members.cache.get(args[0]);
    if (user.user.id == interaction.user.id)
      return await interaction.followUp("You can't play with yourself");
    if (user.user.bot)
      return await interaction.followUp("You can't play with bots");

    let embed = new Discord.MessageEmbed()
      .setDescription(`Wait for **${user.user.username}** to accept your game`)
      .setColor(client.color)
      .setTimestamp()
      .setFooter(`Made by ${client.author}`);

    let confirm = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Accept")
        .setStyle("SUCCESS")
        .setCustomId("accept")
        .setEmoji("808683134786863124"),
      new Discord.MessageButton()
        .setLabel("Decline")
        .setStyle("DANGER")
        .setCustomId("decline")
        .setEmoji("808683573544353792")
    );
    await interaction
      .followUp({
        content: `<@!${user.user.id}>`,
        embeds: [embed],
        components: [confirm],
      })
      .then(async m => {
        let filter = button => button.user.id == user.user.id;
        const collector = m.createMessageComponentCollector({
          filter,
          type: "BUTTON",
          time: 60000,
        });
        collector.on("collect", button => {
          if (button.customId == "decline") {
            button.deferUpdate();
            return collector.stop("decline");
          }
          button.deferUpdate();
          let pick = new Discord.MessageEmbed()
            .setTitle(`${interaction.user.username} VS ${user.user.username}`)
            .setColor(client.color)
            .setDescription("Choose either 🪨, 📄, or ✂️")
            .setTimestamp();
          let choices = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("rock")
              .setStyle("SECONDARY")
              .setEmoji("🪨"),
            new Discord.MessageButton()
              .setCustomId("paper")
              .setStyle("SECONDARY")
              .setEmoji("📄"),
            new Discord.MessageButton()
              .setCustomId("scissors")
              .setStyle("SECONDARY")
              .setEmoji("✂️")
          );
          m.edit({
            embeds: [pick],
            components: [choices],
          });
          collector.stop();
          let users = new Set();
          users.add(interaction.user.id);
          users.add(user.user.id);
          let ping, pong;
          let filter = b => users.has(b.user.id);
          const collect = m.createMessageComponentCollector({
            filter,
            type: "BUTTON",
            time: 60000,
          });
          collect.on("collect", async b => {
            users.delete(b.user.id);
            if (b.user.id == user.user.id) {
              ping = b.customId;
              await b.reply({
                content: `You have choosen **${utils.format(ping)}**`,
                ephemeral: true,
              });
            }
            if (b.user.id == interaction.user.id) {
              pong = b.customId;
              await b.reply({
                content: `You have choosen **${utils.format(pong)}**`,
                ephemeral: true,
              });
            }
            if (users.size == 0) return collect.stop();
          });
          collect.on("end", (c, reason) => {
            if (reason == "time") {
              let timeout = new Discord.MessageEmbed()
                .setTitle("Timeout")
                .setColor("RED")
                .setDescription(
                  "Game cancelled since a player didn't react in time"
                );
              m.edit({
                embeds: [timeout],
              });
            } else {
              const sit1 = ping == "rock" && pong == "scissors";
              const sit2 = ping == "scissors" && pong == "rock";
              const sit3 = ping == "scissors" && pong == "paper";
              const sit4 = ping == "paper" && pong == "scissors";
              const sit5 = ping == "paper" && pong == "rock";
              const sit6 = ping == "rock" && pong == "paper";
              if (sit1 || sit3 || sit5) {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${user.user.username} wins!`)
                  .setColor("GREEN")
                  .setFooter(`Made by ${client.author}`)
                  .addField(
                    `${user.user.username} choice`,
                    `${utils.format(ping)}`
                  )
                  .addField(
                    `${interaction.user.username} choice`,
                    `${utils.format(pong)}`
                  )
                  .setTimestamp();
                m.edit({
                  embeds: [embed],
                  components: [],
                });
              } else if (sit2 || sit4 || sit6) {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${interaction.user.username} wins!`)
                  .setColor("GREEN")
                  .setFooter(`Made by ${client.author}`)
                  .addField(
                    `${interaction.user.username} choice`,
                    `${utils.format(pong)}`
                  )
                  .addField(
                    `${user.user.username} choice`,
                    `${utils.format(ping)}`
                  )
                  .setTimestamp();
                m.edit({
                  embeds: [embed],
                  components: [],
                });
              } else {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`Tie!`)
                  .setColor("GREY")
                  .setFooter(`Made by ${client.author}`)
                  .addField(
                    `${interaction.user.username} choice`,
                    `${utils.format(pong)}`
                  )
                  .addField(
                    `${user.user.username} choice`,
                    `${utils.format(ping)}`
                  )
                  .setTimestamp();
                m.edit({ embeds: [embed], components: [] });
              }
            }
          });
        });
        collector.on("end", (collected, reason) => {
          if (reason == "time") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Timeout")
              .setColor("RED")
              .setDescription(
                `**${user.user.username}** did not confirm before 60 seconds of time`
              );
            m.edit({
              embeds: [embed],
              components: [],
            });
          }
          if (reason == "decline") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Declined")
              .setColor("RED")
              .setDescription(
                `**${user.user.username}** has declined your game of RPS`
              );
            m.edit({
              embeds: [embed],
              components: [],
            });
          }
        });
      });
  },
};
