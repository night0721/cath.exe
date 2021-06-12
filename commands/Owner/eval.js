const { Client, Message, MessageEmbed } = require("discord.js");
const util = require("util");
module.exports = {
  name: "eval",
  category: "Owner",
  aliases: ["e"],
  usage: "(Code)",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let code = args.join(" ");
    const embed = new MessageEmbed();
    if (!code) {
      return client.err(message, "Owner", "eval", "Missing 'Code' argument");
    }
    try {
      let evaled = await eval(code),
        output;
      if (evaled.constructor.name === `Promise`) {
        output = `📤 Output (Promise)`;
      } else {
        output = `📤 Output`;
      }
      if (evaled.length > 800) {
        evaled = evaled.substring(0, 800) + `...`;
      }
      embed
        .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
        .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
        .setColor(client.color)
        .addField(`Status`, `\`\`\`diff\n+ Success\`\`\``);
      return message.channel.send(embed);
    } catch (e) {
      console.log(e.stack);
      embed
        .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
        .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
        .addField(`Status`, `\`\`\`diff\n- Failed\`\`\``)
        .setColor(client.color);
      return message.channel.send(embed);
    }
  },
};
