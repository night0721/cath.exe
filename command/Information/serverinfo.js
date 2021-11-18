const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydeny: "Sydeny",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
};

module.exports = {
  name: "serverinfo",
  description: "Check the info of the server",
  category: "Information",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "server",
      description: "The server you want to see (Paste Server ID)",
      required: false,
    },
  ],
  run: async (client, interaction, args, utils) => {
    try {
      const g = client.guilds.cache.get(args[0]) || interaction.guild;
      const vanityCode = g.vanityURLCode;
      let vanityInvite = `https://discord.gg/${vanityCode}`;
      if (vanityCode === null) vanityInvite = "No custom URL";
      const members = g.members.cache;
      const roles = g.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString());
      const owner = await g.fetchOwner();
      const voiceChannel = g.channels.cache.filter(
        ch => ch.type === "GUILD_VOICE"
      ).size;
      const textChannel = g.channels.cache.filter(
        ch => ch.type === "GUILD_TEXT"
      ).size;
      const categoryChannel = g.channels.cache.filter(
        ch => ch.type === "GUILD_CATEGORY"
      ).size;
      const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle("**Server Information**")
        .setAuthor(`${g.name}`, g.iconURL({ dynamic: true }))
        .setColor(client.color)
        .setDescription(g.description || "No Description")
        .setThumbnail(g.iconURL({ dynamic: true, size: 1024 }))
        .addFields(
          {
            name: `<:nyx_owner:897418259433943120> Owner Info`,
            value: `
          **Owner ❯** ${owner}
          🆔 **Owner ID ❯** \`${owner.id}\`
          `,
            inline: true,
          },
          {
            name: `Misc Info`,
            value: `
          **🆔 Server ID ❯** \`${g.id}\`
          **🌐 Region ❯** ${regions[g.regions]}
          **🔗 Vanity Link ❯** [${vanityCode}](${vanityInvite})
          `,
            inline: true,
          },
          {
            name: `<a:nyx_last_update:897381474330873887> Creation Date`,
            value: `
          ${moment(g.createdTimestamp).format("LL")} ${moment(
              g.createdTimestamp
            ).format("LTS")} (${moment(g.createdTimestamp).fromNow()})`,
            inline: true,
          },
          // Row 2
          {
            name: `<:4chanluv:836623612689121320> Emojies ${g.emojis.cache}`,
            value: `
          **Static ❯** ${g.emojis.cache.size.toString()}
          **Animated ❯** ${g.emojis.cache
            .filter(emoji => emoji.animated)
            .size.toString()}`,
            inline: true,
          },
          {
            name: `Member Statistics`,
            value: `
          👥 **Total❯** ${g.memberCount.toString()}
          🚶 **Users❯** ${members
            .filter(member => !member.user.bot)
            .size.toString()}
          🤖 **Bots❯** ${members
            .filter(member => member.user.bot)
            .size.toString()}`,
            inline: true,
          },
          {
            name: `Channel Info`,
            value: `
          📁 **Categories ❯** ${categoryChannel}
          #️⃣ **Text❯** ${textChannel}
          🔊 **Voice❯** ${voiceChannel}`,
            inline: true,
          },
          // Row 3
          {
            name: `Server Specification`,
            value: `
          **<:partner:840231939944480829> Partnered ❯** ${
            g.partnered
              ? "<a:nyx_checkmark:897240322411724841>"
              : "<a:nyx_cross:897244999211696198>"
          }
          **<:verifiedserver:897410018234728449> Verified ❯** ${
            g.verified
              ? "<a:nyx_checkmark:897240322411724841>"
              : "<a:nyx_cross:897244999211696198>"
          }
          **🚥 Verification Level ❯** ${verificationLevels[g.verificationLevel]}
          **💢 Explicit Filter ❯** ${filterLevels[g.explicitContentFilter]}
          **Tier ❯** ${
            g.premiumTier == "TIER_3"
              ? "3 <:nyx_tier3:897406181511946261>"
              : g.premiumTier == "TIER_2"
              ? "2 <:nyx_tier2:897406181541281792>"
              : g.premiumTier == "TIER_1"
              ? "1 <:nyx_tier1:897406181558067210>"
              : "0"
          }
          **Count ❯** ${g.premiumSubscriptionCount || "0"}`,
            inline: true,
          },
          {
            name: `<a:nyx_community:897419330478825512> Community Features`,
            value: `${
              utils.fixFeatures(g.features) || "No Community Features"
            }`,
            inline: true,
          },
          {
            name: `👔 Role Info [${roles.length}]`,
            value: `${
              roles.length < 10
                ? roles.join(" **|** ")
                : roles.length > 10
                ? `${roles.slice(0, 10).join(" **|** ")}\n+${
                    roles.length - 10
                  } roles...`
                : "None"
            }`,
            inline: true,
          }
        )
        .setURL(vanityCode ? vanityInvite : "https://cath.gq/")
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL());
      interaction.followUp({ embeds: [embed] });
    } catch (e) {
      console.log(e);
    }
  },
};
