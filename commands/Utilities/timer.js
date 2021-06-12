const ms = require("ms");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "timer",
  description: "Set a timer for yourself",
  usage: "(Time)",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return client.err(message, "Utilities", "timer", 19);
    }
    if (!args[0].endsWith("d")) {
      if (!args[0].endsWith("h")) {
        if (!args[0].endsWith("m")) {
          if (!args[0].endsWith("s")) {
            return client.err(message, "Utilities", "timer", 101);
          }
        }
      }
    }
    if (isNaN(args[0][0])) {
      return client.err(message, "Utilities", "timer", 101);
    }
    client.Timers.set(message.author.id + " G " + message.guild.name, {
      Guild: message.guild.name,
      Author: {
        Tag: message.author.tag,
        ID: message.author.id,
      },
      Time: ms(args[0]),
    });
    message.channel.send(
      `${message.author} you have set a timer for ${ms(ms(args[0]), {
        long: true,
      })}.`
    );
    setTimeout(() => {
      let Embed = new MessageEmbed()
        .setTitle(`Timer finished in ${message.guild.name}.`)
        .setDescription(
          `Your timer for ${ms(ms(args[0]), {
            long: true,
          })} has finished.`
        )
        .setURL(client.web)
        .setColor(`GREEN`);
      let embe = new MessageEmbed()
        .setTitle(`Timer finished.`)
        .setDescription(
          `Your timer for ${ms(ms(args[0]), {
            long: true,
          })} has finished.`
        )
        .setURL(client.web)
        .setColor(`GREEN`);
      message.channel.send(`${message.author}`, embe);
      message.author.send(Embed);
      client.Timers.delete(message.author.id + " G " + message.guild.name);
    }, ms(args[0]));
  },
};
