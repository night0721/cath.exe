const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const axios = require("axios");
module.exports = {
  name: "github",
  description: `Get Github User Information`,
  options: [
    {
      type: 3,
      name: "username",
      description: "The username you want to search",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      axios
        .get(`https://api.github.com/users/${args[0]}`)
        .then(res => res.data)
        .then(body => {
          if (body.message)
            return interaction.followUp({ content: "User Not Found" });
          let {
            login,
            avatar_url,
            name,
            id,
            html_url,
            public_repos,
            followers,
            following,
            location,
            created_at,
            bio,
          } = body;
          const embed = new MessageEmbed()
            .setAuthor(`${login} Information`, avatar_url)
            .setColor(client.color)
            .setThumbnail(`${avatar_url}`)
            .setTimestamp()
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "None"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "None"}`)
            .addField(
              `Account Created`,
              moment.utc(created_at).format("dddd, MMMM, Do YYYY")
            )
            .setFooter(`Made by ${client.author}`);
          interaction.followUp({ embeds: [embed] });
        });
    } catch (error) {
      console.log(error);
    }
  },
};
