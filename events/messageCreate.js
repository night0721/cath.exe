const client = require("..");
const { EmbedBuilder, ChannelType } = require("discord.js");
const Utils = require("../util/functions/function");
const domains = require("../util/Data/domains.json");
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;
  const data = {};
  const guildDB = await client.data.getGuild(message.guild.id);
  if (!guildDB) return;
  const userDB = await client.data.getUser(message.author?.id);
  if (!userDB) return;
  data.Guild = guildDB;
  data.User = userDB;
  if (!guildDB) await client.data.CreateGuild(message.guild.id);
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const _ = new EmbedBuilder()
      .addFields(
        {
          name: "Prefix/Usage",
          value: "Run `/help` to start using the bot",
          inline: true,
        },
        {
          name: ":link: **Invite Me**",
          value: `[Click Here](${Utils.inviteLink(client)})`,
          inline: true,
        },
        {
          name: "<:support1:867093614403256350> **Need Help ?**",
          value: `Join our [Support Server](https://discord.gg/SbQHChmGcp)`,
          inline: true,
        },
        {
          name: "<:YouTube:841186450497339412> **Video Guide**",
          value: `[How to use Slash Coammands](https://youtu.be/YSKDu1gKntY)`,
          inline: true,
        },
        {
          name: `<:nyx_description:897379659665264650> Documentation`,
          value: `[Click here](${client.docs})`,
          inline: true,
        },
        {
          name: "<a:donate:896985486260846614> **Support us**",
          value: `[KoFi](https://ko-fi.com/cathteam)`,
          inline: true,
        },
        {
          name: "<a:booster:896527475063025704> **Premium**",
          value: `You can either boost the support server or subscribe to developer's team [Ko-Fi](https://ko-fi.com/cathteam).\n Another option would be to gift a nitro subscription to one of the developers.`,
          inline: false,
        }
      )
      .setTitle(client.user.username)

      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setURL(client.web)
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(client.color);
    try {
      const m = await message.reply({
        embeds: [_],
        components: Utils.buttons(client),
      });
      setTimeout(() => m.delete(), 15000);
    } catch (_) {}
  }
  if (data.User?.Blacklist) return;
  try {
    if (
      domains.iplogger.includes(
        message.content
          .toLowerCase()
          .match(
            /(https|http):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+~-]*[\w.,@?^=%&:/~+~-])+/g
          )?.[0]
          .replace(/(https|http):\/\/+/g, "")
          .match(/\s*([^)]+?)\s*\/+/g, "")[0]
          .slice(0, -1)
      ) ||
      domains.scam.includes(
        message.content
          .toLowerCase()
          .match(
            /(https|http):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+~-]*[\w.,@?^=%&:/~+~-])+/g
          )?.[0]
          .replace(/(https|http):\/\/+/g, "")
          .match(/\s*([^)]+?)\s*\/+/g, "")[0]
          .slice(0, -1)
      ) ||
      domains.ngrok.includes(
        message.content
          .toLowerCase()
          .match(
            /(https|http):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+~-]*[\w.,@?^=%&:/~+~-])+/g
          )?.[0]
          .replace(/(https|http):\/\/+/g, "")
          .match(/\s*([^)]+?)\s*\/+/g, "")[0]
          .slice(0, -1)
      )
    ) {
      const _ = new EmbedBuilder()
        .setTitle(`Scam/IP Grabber detected`)
        .setTimestamp()
        .setColor(client.color)
        .addFields(
          {
            name: "User",
            value: `${message.author.tag} (${message.author.id})`,
            inline: true,
          },
          {
            name: "Scam/IP Logger URL",
            value: `||https://${message.content
              .toLowerCase()
              .match(
                /(https|http):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+~-]*[\w.,@?^=%&:/~+~-])+/g
              )?.[0]
              .replace(/(https|http):\/\/+/g, "")
              .match(/\s*([^)]+?)\s*\/+/g, "")[0]
              .slice(0, -1)}||`,
            inline: true,
          }
        )
        .setFooter({
          text: `Tactical Protection by ${client.author}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        });
      message.channel.send({
        embeds: [_],
      });
      client.channels.cache.get(client.config.ScamLinkLog).send({
        embeds: [
          _.addFields(
            {
              name: "Message",
              value: message.content,
              inline: false,
            },
            {
              name: "Guild",
              value: message.guild ? message.guild.name : "None",
              inline: true,
            }
          ),
        ],
      });
      message.delete().catch(() => {});
    }
  } catch (_) {}

  if (
    message?.content.startsWith(data.Guild.Prefix) ||
    message?.content.toLowerCase().startsWith("c.")
  ) {
    const embed = new EmbedBuilder()
      .setTitle(`Message commands are now disabled`)
      .setDescription(
        `Please enable **Use Application Commands** in the channel settings to get access to slash commands, we have discontinued message commands\n\nUse \`/help\` to see more info`
      )
      .setColor(client.color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields(
        {
          name: ":link: **Invite Me**",
          value: `[Click Here](${Utils.inviteLink(client.user.id)})`,
          inline: true,
        },
        {
          name: "<:support1:867093614403256350> **Need Help ?**",
          value: `Join our [Support Server](https://discord.gg/SbQHChmGcp)`,
          inline: true,
        },
        {
          name: "<:YouTube:841186450497339412> **Video Guide**",
          value: `[How to use Slash Coammands](https://youtu.be/YSKDu1gKntY)`,
          inline: true,
        },
        {
          name: `<:nyx_description:897379659665264650> Documentation`,
          value: `[Click here](${client.docs})`,
          inline: true,
        },
        {
          name: "<a:donate:896985486260846614> **Support us**",
          value: `[KoFi](https://ko-fi.com/cathteam)`,
          inline: true,
        },
        {
          name: "<a:booster:896527475063025704> **Premium**",
          value: `You can either boost support server or subscribe to developer's team [Ko-Fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team.`,
          inline: false,
        }
      )
      .setURL(client.web)
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(
        "https://raw.githubusercontent.com/night0721/cath.exe/main/util/assets/images/nyx_logo_transparent.webp"
      )
      .setTimestamp();
    message.reply({
      embeds: [embed],
      components: Utils.buttons(client),
    });
  }
});
client.on("messageCreate", async message => {
  if (message.channel.type === ChannelType.DM && !message.author.bot) {
    if (message.attachments && message?.content) {
      message.attachments.map(e =>
        client.channels.cache.get(client.config.DMLog).send({
          content: `\`${message.author.tag}(${message.author.id})\`: ${
            message.content + e.url
          }`,
        })
      );
    } else {
      message.attachments.map(e =>
        client.channels.cache.get(client.config.DMLog).send({
          content: `\`${message.author.tag}(${message.author.id})\`: ${e.url}`,
        })
      );
    }
    if (message.content) {
      client.channels.cache.get(client.config.DMLog).send({
        embeds: [
          new EmbedBuilder()
            .setDescription(message.content)
            .setColor(client.color)
            .setAuthor({
              name: message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            }),
        ],
      });
    }
  }
});
