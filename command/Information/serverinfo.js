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
        .setThumbnail(g.iconURL({ dynamic: true, size: 1024 }))
        .addField(`🎫 Name of server:`, g.name, true)
        .addField(`🆔 ID of server`, g.id, true)
        .addField(`🔗 Vanity Link`, `${vanityInvite}`, true)
        .addField("👩‍💻 Owner", `${owner}`, true)
        .addField("👩‍💻 Owner ID", `\`${owner.id}\``, true)
        .addField(`👥 No. of Members`, g.memberCount.toString(), true)
        .addField(
          `🤖 No. of Bots:`,
          members.filter(member => member.user.bot).size.toString(),
          true
        )
        .addField(
          `🚶 Humans:`,
          members.filter(member => !member.user.bot).size.toString(),
          true
        )
        .addField(
          "🧷 Channels",
          `#️⃣ ${textChannel} **Text** Channels\n 🔊 ${voiceChannel} **Voice** Channels\n 📁 ${categoryChannel} **Categories**`,
          true
        )
        .addField(`😗 Emojis:`, g.emojis.cache.size.toString(), true)
        .addField(
          `👻 Animated Emoji\'s:`,
          g.emojis.cache.filter(emoji => emoji.animated).size.toString(),
          true
        )
        .addField(
          `👔 Roles [${roles.length}]`,
          roles.length < 10
            ? roles.join(" **|** ")
            : roles.length > 10
            ? `${roles.slice(0, 10).join(" **|** ")}\n+${
                roles.length - 10
              } roles...`
            : "None",
          true
        )
        .addField(`📃 Description`, g.description || "No Description", true)
        .addField(
          `♨ Boost`,
          `Tier: ${
            g.premiumTier == "TIER_3"
              ? "3"
              : g.premiumTier == "TIER_2"
              ? "2"
              : g.premiumTier == "TIER_1"
              ? "1"
              : "0"
          }\nCount: ${g.premiumSubscriptionCount || "0"}`,
          true
        )
        .addField(
          "💢 Explicit Filter",
          filterLevels[g.explicitContentFilter],
          true
        )
        .addField(
          `🚧 Verification Level`,
          verificationLevels[g.verificationLevel],
          true
        )
        .addField(
          "🗺 Community Features",
          utils.fixFeatures(g.features) || "No Community Features",
          true
        )
        .addField("👨🏻‍🤝‍👨🏻 Partnered", g.partnered ? "Yes" : "No", true)
        .addField("✅ Verified", g.verified ? "Yes" : "No", true)
        .addField(
          `📅 Created at`,
          `${moment(g.createdTimestamp).format("LL")} ${moment(
            g.createdTimestamp
          ).format("LTS")} (${moment(g.createdTimestamp).fromNow()})`,
          true
        )
        .setURL(client.web)
        .setFooter(`Made by ${client.author}`);
      await interaction.followUp({ embeds: [embed] });
    } catch (e) {
      console.log(e);
    }
  },
};
