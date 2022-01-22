const URLClient = require("../../../client/URLClient");
module.exports = {
  name: "shorten-url",
  description: "Shorten a URL",
  options: [
    {
      type: 3,
      name: "short-name",
      description:
        "The short name that for the shorten-url (For example, https://url.cath.gq/youtube)",
      required: true,
    },
    {
      type: 3,
      name: "link",
      description:
        "The link for the shorten-url (For example, https://youtube.com)",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (!args[1].includes("https://")) {
      interaction.followUp({ content: "The link must contain 'https://'" });
    } else {
      const shortName = args[0];
      const targetURL = args[1];
      const cc = await URLClient.createShortURL(shortName, targetURL);
      if (!cc) {
        interaction.followUp({ content: `URL already exist` });
      } else {
        interaction.followUp({ content: `https://url.cath.gq/${cc}` });
      }
    }
  },
};
