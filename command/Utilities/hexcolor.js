const Canvas = require("canvas");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "hexcolor",
  usage: "(Hex Color Code)",
  description: "Get Hex and RGB info of a color",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "code",
      description: "Color code you want to see (Example: #FF0000)",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let color;
    if (args[0]) {
      if (/(#|0x)([0-9A-F]{6})/i.test(args[0])) {
        color = args[0].match(/(#|0x)([0-9A-F]{6})/i)[2];
      } else {
        return await interaction.followUp({
          content: "Please give a valid Hex Color Code",
        });
      }
    } else {
      color = interaction.member.displayHexColor;
    }
    try {
      const aa = color.replace("#", "", "0x", "");
      const colour = await axios.get(
        `https://www.thecolorapi.com/scheme?hex=${aa}`
      );
      const canvas = Canvas.createCanvas(200, 200);
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(0, 0, 200, 200);
      ctx.fillStyle = `${colour.data.seed.hex.value}`;
      ctx.fill();
      const rightpic = new MessageAttachment(canvas.toBuffer(), "wea.jpg");
      const canvasx = Canvas.createCanvas(500, 100);
      const ctxt = canvasx.getContext("2d");
      let y = canvasx.height / 2;
      ctxt.font = "12px Roboto";
      ctxt.textAlign = "center";
      let addup = 0;
      for (let i = 0; i < 5; i++) {
        ctxt.beginPath();
        ctxt.rect(addup, 0, 100, 100);
        ctxt.fillStyle = `${colour.data.colors[i].hex.value}`;
        ctxt.fill();
        addup = addup + 100;
        ctxt.beginPath();
        ctxt.rect(addup - 80, y - 15, 60, 30);
        ctxt.fillStyle = `black`;
        ctxt.fill();
        ctxt.fillStyle = `white`;
        ctxt.fillText(
          `${colour.data.colors[i].hex.value}`,
          addup - 51,
          y + 4.3
        );
      }
      const attachment = new MessageAttachment(canvasx.toBuffer(), "color.jpg");
      const embed = new MessageEmbed()
        .setColor(`0x${colour.data.seed.hex.value}`)
        .setDescription(
          `\`HEX: ${colour.data.seed.hex.value} RGB: ${colour.data.seed.rgb.value}\`\n🔽Color Scheme🔽`
        )
        .setTitle("Color Information (Click here for more info)")
        .setURL(`https://www.colorhexa.com/${colour.data.seed.hex.clean}`)
        .setImage("attachment://color.jpg")
        .setThumbnail("attachment://wea.jpg");
      await interaction.followUp({
        embeds: [embed],
        files: [attachment, rightpic],
      });
    } catch (e) {
      console.log(e);
    }
  },
};
