const db = require("../../models/econ");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "steal",
  description: "Steal money from an user",
  usage: "(User)",
  aliases: ["rob"],
  category: "Economy",
  timeout: 120000,
  run: async (client, message, args) => {
    var tryrob =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );
    if (!tryrob || !args[0]) {
      return client.err(message, "Economy", "steal", 1);
    }
    if (tryrob.id === message.author.id) {
      return client.err(message, "Economy", "steal", 2);
    }
    await db.findOne({ User: message.author.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (!data.CP) {
          data.CP = 0;
          data.save();
          return client.err(message, "Economy", "steal", 20);
        }
      }
      if (!data) {
        new db({
          User: message.author.id,
          CP: 0,
          Inventory: {},
        }).save();
        return client.err(message, "Economy", "steal", 20);
      } else if (data) {
        await db.findOne({ User: tryrob.id }, async (err1, data1) => {
          const coins = Math.floor(Math.random() * data.CP) + 1;
          const coins1 = Math.floor(Math.random() * data1.CP) + 1;
          if (err1) throw err1;
          if (!data1) {
            new db({
              User: tryrob.id,
              CP: 0,
              Inventory: {},
            }).save();
            return message.inlineReply(
              new MessageEmbed()
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("RED")
                .setDescription(
                  `They don't have any ${client.currency}. Be kind!`
                )
            );
          } else if (data1) {
            if (data1.CP <= 0 || !data1.CP) {
              return message.inlineReply(
                new MessageEmbed()
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setColor("RED")
                  .setDescription(
                    `They don't have any ${client.currency}. Be kind!`
                  )
              );
            }
            if (client.function.random() === true) {
              data.CP += coins1;
              data.save();
              data1.CP -= coins1;
              data1.save();
              return message.inlineReply(
                new MessageEmbed()
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setColor("GREEN")
                  .setDescription(
                    `You robbed ${tryrob}! And you got \`${coins}\`${client.currency}`
                  )
              );
            } else {
              data.CP -= coins;
              data.save();
              data1.CP += coins;
              data1.save();
              return message.inlineReply(
                new MessageEmbed()
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setColor("RED")
                  .setDescription(
                    `You failed on robbing ${tryrob}! And you had to pay him/her \`${coins}\`${client.currency}`
                  )
              );
            }
          }
        });
      }
    });
  },
};
