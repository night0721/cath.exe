const { MessageEmbed } = require("discord.js");
function rndint(max, min) {
  return Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
}
function toBool() {
  const num = Math.floor(Math.random() * 2);
  return num === 1;
}
function timer(timestamp) {
  const timeLeft = timestamp;
  const days = Math.floor(timeLeft / 86400000);
  const hours = Math.floor(timeLeft / 3600000) - days * 24;
  const minutes = Math.floor(timeLeft / 60000) - days * 1440 - hours * 60;
  const seconds =
    Math.floor(timeLeft / 1000) - days * 86400 - hours * 3600 - minutes * 60;
  const mseconds = timeLeft / 1000 - days * 86400 - hours * 3600 - minutes * 60;
  let string = "";
  if (days) string = string + `${days} ${days == 1 ? "day " : "days "}`;
  if (hours) string = string + `${hours} ${hours == 1 ? "hour " : "hours "}`;
  if (minutes)
    string = string + `${minutes} ${minutes == 1 ? "minute " : "minutes "}`;
  if (seconds)
    string = string + `${seconds} ${seconds == 1 ? "second " : "seconds "}`;
  if (!string.length) string = `${mseconds.toFixed(1)} second`;
  return string;
}
function sleep(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
function toHHMMSS(str) {
  var sec_num = parseInt(str, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
function fixPermissions(arr = Array) {
  const permissions = {
    ADMINISTRATOR: "Administrator",
    VIEW_AUDIT_LOG: "View Audit Log",
    VIEW_GUILD_INSIGHTS: "View Server Insights",
    MANAGE_GUILD: "Manage Server",
    MANAGE_ROLES: "Manage Roles",
    MANAGE_CHANNELS: "Manage Channels",
    KICK_MEMBERS: "Kick Members",
    BAN_MEMBERS: "Ban Members",
    CREATE_INSTANT_INVITE: "Create Invite",
    CHANGE_NICKNAME: "Change Nickname",
    MANAGE_NICKNAMES: "Manage Nicknames",
    MANAGE_EMOJIS_AND_STICKERS: "Manage Emojis and Stickers",
    MANAGE_WEBHOOKS: "Manage Webhooks",
    VIEW_CHANNEL: "Read Text Channels & See Voice Channels",
    SEND_MESSAGES: "Send Messages",
    SEND_TTS_MESSAGES: "Send TTS Messages",
    MANAGE_MESSAGES: "Manage Messages",
    EMBED_LINKS: "Embed Links",
    ATTACH_FILES: "Attach Files",
    READ_MESSAGE_HISTORY: "Read Message History",
    MENTION_EVERYONE: "Mention @everyone, @here, and All Roles",
    USE_EXTERNAL_EMOJIS: "Use External Emojis",
    ADD_REACTIONS: "Add Reactions",
    CONNECT: "Connect",
    SPEAK: "Speak",
    STREAM: "Video",
    MUTE_MEMBERS: "Mute Members",
    DEAFEN_MEMBERS: "Deafen Members",
    MOVE_MEMBERS: "Move Members",
    USE_VAD: "Use Voice Activity",
    PRIORITY_SPEAKER: "Priority Speaker",
    REQUEST_TO_SPEAK: "Request to Speak",
    MANAGE_THREADS: "Manage Threads",
    USE_PUBLIC_THREADS: "Use Public Threads",
    USE_PRIVATE_THREADS: "Use Private Threads",
    USE_EXTERNAL_STICKERS: "Use External Stickers",
    USE_APPLICATION_COMMANDS: "Use Application Commands",
  };
  const final = [];
  for (const perm in permissions) {
    if (arr.includes(perm)) final.push(`✔️ ${permissions[perm]}`);
    else final.push(`❌ ${permissions[perm]}`);
  }
  return `${`\`\`\`diff\n${final.join("\n")}\`\`\``}`;
}
function formatPerms(perm) {
  return perm
    .toLowerCase()
    .replace(/(^|"|_)(\S)/g, s => s.toUpperCase())
    .replace(/_/g, " ")
    .replace(/Guild/g, "Server")
    .replace(/Use Vad/g, "Use Voice Acitvity");
}
function trimArray(arr = []) {
  if (arr.length > 10) {
    const length = arr.length - 10;
    arr = arr.slice(0, 10);
    arr.push(`\n${length} more...`);
  }
  return arr.join(" **|** ");
}
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}
function format(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function fixFeatures(arr = []) {
  const all = {
    ANIMATED_ICON: "Animated Icon",
    BANNER: "Banner",
    COMMERCE: "Commerce",
    COMMUNITY: "Community",
    DISCOVERABLE: "Discoverable",
    FEATURABLE: "Featurable",
    INVITE_SPLASH: "Invite Splash",
    MEMBER_VERIFICATION_GATE_ENABLED: "Member Verification Gate Enabled",
    NEWS: "News",
    PARTNERED: "Partnered",
    PREVIEW_ENABLED: "Preview Enabled",
    VANITY_URL: "Vanity URL",
    VERIFIED: "Verified",
    VIP_REGIONS: "VIP Region",
    WELCOME_SCREEN_ENABLED: "Welcome Screen Enabled",
    TICKETED_EVENTS_ENABLED: "Ticketed Events Enabled",
    MONETIZATION_ENABLED: "Monetization Enabled",
    MORE_STICKERS: "More Stickers",
    THREE_DAY_THREAD_ARCHIVE: "Three Day Thread Archive",
    SEVEN_DAY_THREAD_ARCHIVE: "Seven Day Thread Archive",
    PRIVATE_THREADS: "Private Threads,",
  };
  const final = [];
  for (const feature in all) {
    if (arr.includes(feature)) final.push(`✅ ${all[feature]}`);
  }
  return `${final.join("\n")}`;
}
function cooldown(dbtime, defaults, msg) {
  const expiration_time = dbtime + defaults;
  const time_left = expiration_time - Date.now();
  const slow = [
    "Keep it slow...",
    "Calm down",
    "Stop it get some help",
    "Too fast",
    "Slow down little bit",
  ];
  const slowed = slow[Math.floor(Math.random() * slow.length)];
  return msg.channel.send({
    embeds: [
      new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setTitle(slowed)
        .setDescription(
          `Wait **${timer(
            time_left
          )}** to use the command again!\nThe default cooldown is **${timer(
            defaults
          )}**`
        ),
    ],
  });
}
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var mn = d * 30;
var w = d * 7;
var y = d * 365.25;

/**
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 */

function ms(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === "string" && val.length > 0) {
    return parse(val);
  } else if (type === "number" && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    "val is not a non-empty string or a valid number. val=" +
      JSON.stringify(val)
  );
}

/**
 * @param {String} str
 * @return {Number}
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mths|mn|years?|yrs?|y)?$/i.exec(
      str
    );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || "ms").toLowerCase();
  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "month":
    case "months":
    case "mth":
    case "mths":
      return n * mn;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= mn) {
    return Math.round(ms / mn) + "mo";
  }
  if (msAbs >= w) {
    return Math.round(ms / w) + "w";
  }
  if (msAbs >= d) {
    return Math.round(ms / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + "s";
  }
  return ms + "ms";
}

/**
 * @param {Number} ms
 * @return {String}
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= mn) {
    return plural(ms, msAbs, mn, "month");
  }
  if (msAbs >= w) {
    return plural(ms, msAbs, w, "week");
  }
  if (msAbs >= d) {
    return plural(ms, msAbs, d, "day");
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, "hour");
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, "minute");
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, "second");
  }
  return ms + " ms";
}
function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}
async function confirmation(message, author, validReactions, time = 60000) {
  try {
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;

    return message
      .awaitReactions({ filter, max: 1, time: time })
      .then(collected => collected.first() && collected.first().emoji.name);
  } catch (e) {
    console.log(e);
  }
}
function selectRandom(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}
function getAllTextFromEmbed(embed) {
  let text = "";
  function getTime(now) {
    const date = new Date(now);
    const escape = value => `0${value}`.slice(-2);
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${escape(
      date.getHours()
    )}:${escape(date.getMinutes())}:${escape(date.getSeconds())}${ampm}`;
  }

  if (embed.title)
    text += `**${embed.title
      .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
      .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**`;
  if (embed.description)
    text += `\n${embed.description
      .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
      .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
  if (embed.fields) {
    text += "\n";
    for (const field of embed.fields)
      text += `\n**${field.name
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**\n ${field.value
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
  }
  if (embed.footer) {
    let field = `\n\n**${embed.footer.text
      .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
      .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;

    if (embed.timestamp) {
      const time =
        embed.timestamp instanceof Date
          ? getTime(embed.timestamp.getTime())
          : embed.timestamp;
      field += `at ${time}`;
    }

    text += `${field}**`;
  }

  return text;
}
module.exports = {
  rndint,
  toBool,
  timer,
  sleep,
  toHHMMSS,
  fixPermissions,
  trimArray,
  formatPerms,
  checkDays,
  format,
  fixFeatures,
  cooldown,
  ms,
  confirmation,
  selectRandom,
  getAllTextFromEmbed,
};
