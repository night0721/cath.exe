const { getreddit } = require("cath");
const { MessageActionRow, MessageButton, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "nsfw",
  description: "NSFW command",
  run: async (client, interaction) => {
    const msg = await interaction.channel.send({ content: "Getting images" });
    async function embed() {
      if (!interaction.channel.nsfw) {
        const embed = new EmbedBuilder()
          .setTitle(`AYO Calm Yo Cheeks`)
          .setDescription("This command only works in NSFW Channels!")
          .setImage(
            "https://media.discordapp.net/attachments/851761493815853060/893777701599584266/warning.gif"
          )
          .setColor(client.color)
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp();
        interaction.followUp({ embeds: [embed] });
      }
      let subreddits = [
        "GodPussy",
        "peachlips",
        "vagina",
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
        "PushHerHead",
        "ThroatFuck",
      ];
      const reddit = subreddits[Math.round(Math.random() * subreddits.length)];
      let data = await getreddit(reddit);
      while (data.length === 0) {
        while (data.image.length === 0) {
          data = await getreddit(reddit);
        }
      }
      let embed1 = null;
      embed1 = new EmbedBuilder({
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
      });
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
        .setLabel("Reload")
        .setStyle("SECONDARY")
        .setDisabled(true)
    );
    await msg.delete();
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
      }).catch(null);

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
