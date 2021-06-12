const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "code",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const encrypted = encrypt(args.slice(0).join(" "));
    message.channel.send(`\`\`\`${encrypted}\`\`\``);
    message.channel.send(`\`\`\`${decrypt(encrypted)}\`\`\``);
    function encrypt(inp) {
      var str = inp.split(""),
        out = "";
      str.forEach((c, i) => {
        if (c == " ") {
          out += " ";
        } else if (i % 3 == 0) {
          out += String.fromCharCode(c.charCodeAt(0) + 3);
        } else {
          out += String.fromCharCode(c.charCodeAt(0) - 2);
        }
      });
      return out;
    }

    function decrypt(inp) {
      var str = inp.split(""),
        out = "";
      str.forEach((c, i) => {
        if (c == " ") {
          out += " ";
        } else if (i % 3 == 0) {
          out += String.fromCharCode(c.charCodeAt(0) - 3);
        } else {
          out += String.fromCharCode(c.charCodeAt(0) + 2);
        }
      });
      return out;
    }
  },
};
