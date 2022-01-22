const fetch = require("node-fetch");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  CommandInteraction,
} = require("discord.js");
module.exports = {
  name: "nsfw",
  description: "nsfw command",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    async function embed() {
      if (!interaction.channel.nsfw) {
        const embed = new MessageEmbed()
          .setTitle(`AYO Calm Yo Cheeks`)
          .setDescription("This command only works in NSFW Channels!")
          .setImage(
            "https://media.discordapp.net/attachments/851761493815853060/893777701599584266/warning.gif"
          )
          .setColor("#02023a");

        interaction.followUp({ embeds: [embed] });
        return;
      }
      let subreddits = [
        "GoneWild",
        "WorkGoneWild",
        "GoneWild30Plus",
        "hentai",
        "HentaiAnime",
        "nekogirls",
        "ass",
        "BestBooties",
        "BootyGIFs",
        "booty_queens",
        "BlowJob",
        "blowjobs",
        "blowjobgifs",
        "OralSex",
        "boobs",
        "GrabHerTitties",
        "titfuck",
        "milf",
        "OnlyHotMilfs",
        "realmoms",
        "thighs",
        "PerfectThighs",
        "thickthighs",
      ];
      let reddit =
        subreddits[Math.round(Math.random() * (subreddits.length - 1))];

      let embed1 = null;
      await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res =>
        res.json().then(url => {
          embed1 = new MessageEmbed()
            .setAuthor(
              interaction.user.tag,
              interaction.user.displayAvatarURL({ dynamic: true })
            )
            .setTitle(`${url.title}`)
            .setImage(`${url.url}`)
            .setTimestamp()
            .setColor("RED")
            .setFooter(`${url.ups} 👍`);
        })
      );
      return embed1;
    }

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("reload")
        .setLabel("Reload")
        .setStyle("SUCCESS")
    );
    const disabled = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("reload")
        .setLabel("Reload Meme")
        .setStyle("SECONDARY")
        .setDisabled(true)
    );

    let m = await interaction.followUp({
      embeds: [await embed()],
      components: [row],
    });

    const collector = m.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 120000,
    });
    collector.on("collect", async i => {
      if (i.user.id === interaction.user.id) {
        i.deferUpdate();
        await update(m);
        collector.stop();
      } else {
        i.reply({
          content: `These buttons aren't for you!`,
          ephemeral: true,
        });
      }
    });
    collector.on("end", (mes, r) => {
      if (r == "time") {
        m.edit({
          components: [disabled],
        });
      }
    });

    async function update(m) {
      m.edit({
        embeds: [await embed()],
      }).catch(e => console.log(e.requestData.json.embeds));

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async i => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });
    }
  },
};
