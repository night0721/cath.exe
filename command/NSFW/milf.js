const { MessageEmbed } = require("discord.js");
const { getreddit } = require("cath");
module.exports = {
  name: "milf",
  description: "Get some milf images",
  run: async (client, interaction) => {
    if (!interaction.channel.nsfw) {
      const embed = new MessageEmbed()
        .setTitle(`AYO Calm Yo Cheeks`)
        .setDescription("This command only works in NSFW Channels!")
        .setImage(
          "https://media.discordapp.net/attachments/851761493815853060/893777701599584266/warning.gif"
        )
        .setColor(client.color)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp();
      interaction.followUp({ embeds: [embed] });
    } else {
      const subreddits = ["milf", "OnlyHotMilfs", "realmoms"];
      const reddit = subreddits[Math.round(Math.random() * subreddits.length)];
      const data = await getreddit(reddit);
      interaction.followUp({
        embeds: [
          new MessageEmbed({
            title: data.title,
            url: data.url,
            image: { url: data.image },
            timestamp: Date.now(),
            footer: { text: data.footer },
            color: client.color,
            author: {
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          }),
        ],
      });
    }
  },
};
