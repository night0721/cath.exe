module.exports = {
  name: "code",
  Owner: true,
  run: async (client, message, args) => {
    const encrypted = encrypt(args.slice(0).join(" "));
    message.channel.send(`\`\`\`${encrypted}\`\`\``);
	  message.channel.send(`\`\`\`${decrypt(encrypted)}\`\`\``);
	  const str;
    function encrypt(inp) {
      let str = inp.split(""),
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
      let str = inp.split(""),
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
