const client = require("..");
const { MessageEmbed } = require("discord.js");
const utils = require("../util/functions/function");
const scams = require("../util/Data/scam.json");
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
    const _ = new MessageEmbed()
      .addFields(
        {
          name: "Prefix/Usage",
          value: "Run `/help` to start using the bot",
          inline: true,
        },
        {
          name: ":link: **Invite Me**",
          value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands)`,
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
      .setTitle(client.user.username)

      .setThumbnail(client.user.displayAvatarURL())
      .setURL(client.web)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor(client.color);
    const m = await message.reply({
      embeds: [_],
      components: utils.buttons(client),
    });
    setTimeout(() => m.delete(), 15000);
  }
  if (data.User?.Blacklist) return;
  if (
    scams.includes(
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
    message.delete();
    message.channel.send({
      content: `**${message.author.tag}** has sent a scam link and I have deleted it to prevent spread`,
    });
  }
  if (
    message?.content.startsWith(data.Guild.Prefix) ||
    message?.content.startsWith("C.")
  ) {
    const embed = new MessageEmbed()
      .setTitle(`Message commands are now disabled`)
      .setDescription(
        `Please enable **Use Application Commands** in the channel settings to get access to slash commands, we have discontinued message commands\n\nUse \`/help\` to see more info`
      )
      .setColor(client.color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields(
        {
          name: ":link: **Invite Me**",
          value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands)`,
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
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      // .setThumbnail("../../util/assets/images/nyx_logo_transparent.webp")
      .setTimestamp();
    message.reply({
      embeds: [embed],
      components: utils.buttons(client),
    });
  }
});
client.on("messageCreate", async message => {
  if (message.channel.type === "DM" && !message.author.bot) {
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
        content: `\`${message.author.tag}(${message.author.id})\`: ${message.content}`,
      });
    }
  }
});
