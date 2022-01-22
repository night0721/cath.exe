const axios = require("axios");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "watermark",
  description: "Add a water to leaks",
  options: [
    {
      type: 3,
      name: "photo",
      description: "Link of photo",
      required: true,
    },
    {
      type: 3,
      name: "position",
      description: "Where you want to place the water mark",
      required: true,
      choices: [
        {
          name: "Middle",
          value: "middle",
        },
        {
          name: "ButtomRight",
          value: "buttomright",
        },
      ],
    },
    {
      type: 3,
      name: "opacity",
      description:
        "Opacity of watermark(50 - 100) Lower or higher will be ignored",
      required: true,
    },
    {
      type: 3,
      name: "logo",
      description: "The Logo you want to use",
      required: true,
      choices: [
        {
          name: "Discord Nicecat",
          value: "discord_nicecat",
        },
        {
          name: "NoLink Leakers",
          value: "nolink_leakers",
        },
        {
          name: "Discord Leakers",
          value: "discord_leakers",
        },
        {
          name: "DogeBeanie",
          value: "doge",
        },
        {
          name: "CODM N3W3",
          value: "n3w3",
        },
        {
          name: "Alyan Gaming",
          value: "alyan",
        },
        {
          name: "Murdablast",
          value: "murdablast",
        },
        {
          name: "Sasha",
          value: "sasha",
        },
        {
          name: "Umair Gamer",
          value: "umair",
        },
      ],
    },
    {
      type: 3,
      name: "password",
      description: "The password in order to use this command",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const data = await axios
      .get(
        `${process.env.api}/api/v1/codm/watermark?photo=${args[0]}&position=${args[1]}&opacity=${args[2]}&logo=${args[3]}&password=${args[4]}`
      )
      .then(res => res.data)
      .catch();
    if (!data) {
      interaction.followUp({
        content: "You have either wrong input or you are unauthorized",
      });
    } else {
      const ima = new MessageAttachment(
        `${process.env.api}/api/v1/codm/watermark?photo=${args[0]}&position=${args[1]}&opacity=${args[2]}&logo=${args[3]}&password=${args[4]}`,
        `${args[2]}.png`
      );
      interaction.followUp({ files: [ima] });
    }
  },
};
