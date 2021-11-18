const db = require("../../models/econ");
const { MessageEmbed } = require("discord.js");
const { bool } = require("cath");
module.exports = {
  name: "rob",
  description: "Rob money from an user",
  usage: "(User)",
  category: "Economy",
  timeout: 120000,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to rob",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils) => {
    const s = new Set();
    const tryrob = interaction.guild.members.cache.get(args[0]);
    if (tryrob.id === interaction.user.id) {
      interaction.followUp({ content: "You can't rob yourself" });
    } else if (s.has(tryrob.user.tag)) {
      interaction.followUp({
        content:
          "That user has already been robbed within three minutes, be kind!",
      });
    } else {
      await db.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
          if (!data.CP) {
            data.CP = 0;
            data.save();
            interaction.followUp({ content: "You don't have enough balance" });
          } else {
            await db.findOne({ User: tryrob.id }, async (err1, data1) => {
              const coins = Math.floor(Math.random() * data.CP);
              const coins1 = Math.floor(Math.random() * data1?.CP);
              if (!data1) {
                client.createProfile(tryrob.id);
                interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setFooter(
                        `Made by ${client.author}`,
                        client.user.displayAvatarURL()
                      )
                      .setTimestamp()
                      .setAuthor(
                        interaction.user.tag,
                        interaction.user.displayAvatarURL({ dynamic: true })
                      )
                      .setColor("RED")
                      .setDescription(
                        `They don't have any ${client.currency}. Be kind!`
                      ),
                  ],
                });
              } else if (data1) {
                if (data1.CP <= 0 || !data1.CP) {
                  interaction.followUp({
                    embeds: [
                      new MessageEmbed()
                        .setFooter(
                          `Made by ${client.author}`,
                          client.user.displayAvatarURL()
                        )
                        .setTimestamp()
                        .setAuthor(
                          interaction.user.tag,
                          interaction.user.displayAvatarURL({ dynamic: true })
                        )
                        .setColor("RED")
                        .setDescription(
                          `They don't have any ${client.currency}. Be kind!`
                        ),
                    ],
                  });
                }
                if (bool()) {
                  data.CP += coins1;
                  data.save();
                  data1.CP -= coins1;
                  data1.save();
                  s.add(tryrob.user.tag);
                  setTimeout(function () {
                    s.delete(tryrob.user.tag);
                  }, 1000 * 60 * 3);
                  tryrob
                    .send(
                      `**${
                        interaction.user.tag
                      }** has robbed you **${coins1.toLocaleString()}** coins in **${
                        interaction.guild.name
                      }**`
                    )
                    .catch(e => {});
                  interaction.followUp({
                    embeds: [
                      new MessageEmbed()
                        .setFooter(
                          `Made by ${client.author}`,
                          client.user.displayAvatarURL()
                        )
                        .setTimestamp()
                        .setAuthor(
                          interaction.user.tag,
                          interaction.user.displayAvatarURL({ dynamic: true })
                        )
                        .setColor("GREEN")
                        .setDescription(
                          `You robbed **${tryrob.user.tag}**! And you got \`${coins1}\`${client.currency}`
                        ),
                    ],
                  });
                } else {
                  data.CP -= coins;
                  data.save();
                  data1.CP += coins;
                  data1.save();
                  interaction.followUp({
                    embeds: [
                      new MessageEmbed()
                        .setFooter(
                          `Made by ${client.author}`,
                          client.user.displayAvatarURL()
                        )
                        .setTimestamp()
                        .setAuthor(
                          interaction.user.tag,
                          interaction.user.displayAvatarURL({ dynamic: true })
                        )
                        .setColor("RED")
                        .setDescription(
                          `You failed on robbing **${tryrob.user.tag}**! And you had to pay him/her \`${coins}\`${client.currency}`
                        ),
                    ],
                  });
                }
              }
            });
          }
        }
        if (!data) {
          client.createProfile(interaction.user.id);
          interaction.followUp({ content: "You don't have enough balance" });
        }
      });
    }
  },
};
