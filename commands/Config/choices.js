const schema = require("../../models/modmail");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "choices",
  UserPerm: "ADMINISTRATOR",
  description: "Add choices for modmail in a server",
  usage: "(add/list/rmv) (Emoji) {Text}",
  category: "Config",
  run: async (client, message, args) => {
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) return;
      else {
        new schema({
          Guild: message.guild.id,
        }).save();
      }
    });
    if (args[0].toLowerCase() === "add") {
      if (!args[1]) return client.err(message, "Config", "choices", 11);
      if (!args[2]) return client.err(message, "Config", "choices", 12);
      if (!args.slice(2).join(" ").length > 100)
        return client.err(message, "Config", "choices", 13);
      const config = await schema.findOne({ Guild: message.guild.id });
      if (
        !config ||
        !config.Choices ||
        !Object.entries(config.Choices).length
      ) {
        const choices = {
          0: {
            emoji: args[1],
            text: args.slice(2).join(" "),
          },
        };
        schema.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (data) {
            if (data.Choices) {
              data.Choices = choices;
              await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else if (data.Guild) {
              data.Choices = choices;
              await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
              new schema({
                Guild: message.guild.id,
                Choices: choices,
              }).save();
            }
          }
        });
        return message.channel.send(
          `${message.author.tag} has added ${args[1]} as a modmail choice`
        );
      } else {
        const choices = Object.entries(config.Choices);
        if (choices.length >= 5)
          return client.err(message, "Config", "choices", 14);
        const last = choices[choices.length - 1];
        const parsed = config.Choices;
        parsed[(parseInt(last[0]) + 1).toString()] = {
          emoji: args[1],
          text: args.slice(2).join(" "),
        };
        schema.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (data) {
            data.Choices = parsed;
            await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
          } else {
            new schema({
              Guild: message.guild.id,
              Choices: parsed,
            }).save();
          }
        });
        return message.channel.send(
          `${message.author.tag} has added ${args[1]} as a modmail choice`
        );
      }
    }
    if (args[0].toLowerCase() === "list") {
      const Data = await schema.findOne({ Guild: message.guild.id });
      if (!Data || !Data.Choices || !Object.entries(Data.Choices).length)
        return client.err(message, "Config", "choices", 10);
      else
        return message.channel.send(
          Object.entries(Data.Choices)
            .map(value => {
              return `${value[1].emoji}: ${value[1].text}`;
            })
            .join("\n")
        );
    }
    if (args[0].toLowerCase() === "rmv") {
      if (!args[1]) return client.err(message, "Config", "choices", 11);
      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data || !data.Choices || !Object.entries(data.Choices).length)
          return client.err(message, "Config", "choices", 10);
        const choices = Object.entries(data.Choices);
        const found = choices.find(value => value[1].emoji == args[1]);
        if (!found) return client.err(message, "Config", "choices", 15);
        const filtered = choices.filter(value => value[1].emoji != args[1]);
        const parsed = {};
        filtered.map(value => {
          parsed[value[0]] = {
            emoji: value[1].emoji,
            text: value[1].text,
          };
        });
        if (data) {
          data.Choices = parsed;
          await schema.findOneAndUpdate({ Guild: message.guild.id }, data);
        } else {
          new schema({
            Guild: message.guild.id,
            Choices: parsed,
          }).save();
        }
      });
      return message.channel.send(`${args[1]} is removed from choices.`);
    }
  },
};
