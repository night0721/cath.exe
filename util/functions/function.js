const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
/**
 * Returns a random element from an array
 * @returns {any}
 */
Array.prototype.random = function () {
  return this[~~(Math.random() * this.length)];
};

function rndint(max, min) {
  return Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseDate(date) {
  let dow = date.getDate().toString();
  return `${date.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${months[date.getMonth()]} ${
    dow.endsWith("1")
      ? `${dow}st`
      : dow.endsWith("2")
      ? `${dow}nd`
      : dow.endsWith("3")
      ? `${dow}rd`
      : `${dow}th`
  } ${date.getFullYear()}, ${date.toLocaleTimeString()}`;
}

function parseShortDate(date) {
  let dow = date.getDate().toString();
  return `${months[date.getMonth()]} ${
    dow.endsWith("1")
      ? `${dow}st`
      : dow.endsWith("2")
      ? `${dow}nd`
      : dow.endsWith("3")
      ? `${dow}rd`
      : `${dow}th`
  } ${date.getFullYear()}`;
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
  if (minutes) {
    string = string + `${minutes} ${minutes == 1 ? "minute " : "minutes "}`;
  }
  if (seconds) {
    string = string + `${seconds} ${seconds == 1 ? "second " : "seconds "}`;
  }
  if (!string.length) string = `${mseconds.toFixed(1)} second`;
  return string;
}
function sleep(ms) {
  new Promise(resolve => setTimeout(resolve, ms));
}
function toHHMMSS(str) {
  const sec_num = parseInt(str, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;
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
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);
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
    "Stop it. Get some help.",
    "Too fast",
    "Slow down little bit",
  ];
  const slowed = slow[Math.floor(Math.random() * slow.length)];
  return msg.followUp({
    embeds: [
      new EmbedBuilder()
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
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const mn = d * 30;
const w = d * 7;
const y = d * 365.25;

/**
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 */

function ms(val, options) {
  options = options || {};
  const type = typeof val;
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
  const match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mths|mn|years?|yrs?|y)?$/i.exec(
      str
    );
  if (!match) {
    return;
  }
  const n = parseFloat(match[1]);
  const type = (match[2] || "ms").toLowerCase();
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
  const msAbs = Math.abs(ms);
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
  const msAbs = Math.abs(ms);
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
function plural(ms, msAbs, nz, name) {
  const isPlural = msAbs >= nz * 1.5;
  return Math.round(ms / nz) + " " + name + (isPlural ? "s" : "");
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

  if (embed.title) {
    text += `**${embed.title
      .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
      .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**`;
  }
  if (embed.description) {
    text += `\n${embed.description
      .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
      .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
  }
  if (embed.fields) {
    text += "\n";
    for (const field of embed.fields) {
      text += `\n**${field.name
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**\n ${field.value
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
    }
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
function clean(text) {
  if (typeof text === "string") {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}
function tips(interaction, client) {
  const all = [
    "You can report bugs by using `/report` and send a suggestion by `/suggest` !",
    "If a gun isn't there, please be paitent and wait for the us to get the stats",
    "We all recruiting for Javascript bot developers (Total: 4) Please DM the bot for more info",
  ];
  const ran = Math.floor(Math.random() * 50) + 2;
  const rTip = all[Math.floor(Math.random() * all.length)];
  if (ran <= 11) {
    interaction.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Tips")
          .setColor(client.color)
          .setDescription(`**💡 Did you know**\n${rTip}`)
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp()
          .setURL(client.web),
      ],
    });
  }
}
function inviteLink(client_id) {
  return `https://discord.com/oauth2/authorize?client_id=${client_id}&permissions=1512097384560&scope=bot%20applications.commands`;
}
function buttons(client) {
  const invite = new ButtonBuilder()
    .setLabel("Invite the bot!")
    .setStyle(ButtonStyle.Link)
    .setEmoji("896527406100283462")
    .setURL(inviteLink(client.user.id));
  const support = new ButtonBuilder()
    .setLabel("Support Server")
    .setStyle(ButtonStyle.Link)
    .setEmoji("867093614403256350")
    .setURL(client.invite);
  const website = new ButtonBuilder()
    .setLabel("Website")
    .setStyle(ButtonStyle.Link)
    .setEmoji("🖥")
    .setURL(client.web);
  const youtube = new ButtonBuilder()
    .setLabel("YouTube")
    .setStyle(ButtonStyle.Link)
    .setEmoji("841186450497339412")
    .setURL("https://youtube.com/Kirito01");
  const kofi = new ButtonBuilder()
    .setLabel("Ko-fi")
    .setStyle(ButtonStyle.Link)
    .setEmoji("900590344364757013")
    .setURL("https://ko-fi.com/cathteam");
  const row = new ActionRowBuilder().addComponents(
    invite,
    support,
    website,
    youtube,
    kofi
  );
  return [row];
}
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(" ")}`,
  red: `\x1b[31m${args.join(" ")}`,
  green: `\x1b[32m${args.join(" ")}`,
  yellow: `\x1b[33m${args.join(" ")}`,
  blue: `\x1b[34m${args.join(" ")}`,
  magenta: `\x1b[35m${args.join(" ")}`,
  cyan: `\x1b[36m${args.join(" ")}`,
  white: `\x1b[37m${args.join(" ")}`,
  bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
});
const leven = (te, t) => {
  if (!te.length) return t.length;
  if (!t.length) return te.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= te.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (te[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][te.length];
};
function chunk(arr, size) {
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    arr.slice(i * size, i * size + size);
    return arr;
  });
}
function progressBar(value, maxValue, size) {
  const percentage = value / maxValue;
  const progress = Math.round(size * percentage);
  const emptyProgress = size - progress;
  const progressText = "▇".repeat(progress);
  const emptyProgressText = "—".repeat(emptyProgress);
  const percentageText = Math.round(percentage * 100) + "%";

  const Bar = progressText + emptyProgressText;
  return { Bar, percentageText };
}
function prettyMs(milliseconds, options = {}) {
  const pluralize = (word, count) => (count === 1 ? word : `${word}s`);
  const SECOND_ROUNDING_EPSILON = 0.0000001;
  if (!Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number");
  }

  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }

  if (options.compact) {
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }

  const result = [];

  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(
      value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON
    );
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };

  const add = (value, long, short, valueString) => {
    if (
      (result.length === 0 || !options.colonNotation) &&
      value === 0 &&
      !(options.colonNotation && short === "m")
    ) {
      return;
    }

    valueString = (valueString || value || "0").toString();
    let prefix;
    let suffix;
    if (options.colonNotation) {
      prefix = result.length > 0 ? ":" : "";
      suffix = "";
      const wholeDigits = valueString.includes(".")
        ? valueString.split(".")[0].length
        : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString =
        "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      prefix = "";
      suffix = options.verbose ? " " + pluralize(long, value) : short;
    }

    result.push(prefix + valueString + suffix);
  };

  const parsed = parseMilliseconds(milliseconds);

  add(Math.trunc(parsed.days / 365), "year", "y");
  add(parsed.days % 365, "day", "d");
  add(parsed.hours, "hour", "h");
  add(parsed.minutes, "minute", "m");

  if (
    options.separateMilliseconds ||
    options.formatSubMilliseconds ||
    (!options.colonNotation && milliseconds < 1000)
  ) {
    add(parsed.seconds, "second", "s");
    if (options.formatSubMilliseconds) {
      add(parsed.milliseconds, "millisecond", "ms");
      add(parsed.microseconds, "microsecond", "µs");
      add(parsed.nanoseconds, "nanosecond", "ns");
    } else {
      const millisecondsAndBelow =
        parsed.milliseconds +
        parsed.microseconds / 1000 +
        parsed.nanoseconds / 1e6;

      const millisecondsDecimalDigits =
        typeof options.millisecondsDecimalDigits === "number"
          ? options.millisecondsDecimalDigits
          : 0;

      const roundedMiliseconds =
        millisecondsAndBelow >= 1
          ? Math.round(millisecondsAndBelow)
          : Math.ceil(millisecondsAndBelow);

      const millisecondsString = millisecondsDecimalDigits
        ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
        : roundedMiliseconds;

      add(
        Number.parseFloat(millisecondsString, 10),
        "millisecond",
        "ms",
        millisecondsString
      );
    }
  } else {
    const seconds = (milliseconds / 1000) % 60;
    const secondsDecimalDigits =
      typeof options.secondsDecimalDigits === "number"
        ? options.secondsDecimalDigits
        : 1;
    const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
    const secondsString = options.keepDecimalsOnWholeSeconds
      ? secondsFixed
      : secondsFixed.replace(/\.0+$/, "");
    add(Number.parseFloat(secondsString, 10), "second", "s", secondsString);
  }

  if (result.length === 0) {
    return "0" + (options.verbose ? " milliseconds" : "ms");
  }

  if (options.compact) {
    return result[0];
  }

  if (typeof options.unitCount === "number") {
    const separator = options.colonNotation ? "" : " ";
    return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
  }

  return options.colonNotation ? result.join("") : result.join(" ");
}
function parseMilliseconds(milliseconds) {
  if (typeof milliseconds !== "number") {
    throw new TypeError("Expected a number");
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
  };
}
const default_opts = {
  hoursPerDay: 24,
  daysPerWeek: 7,
  weeksPerMonth: 4,
  monthsPerYear: 12,
  daysPerYear: 365.25,
};
const UNIT_MAP = {
  ms: ["ms", "milli", "millisecond", "milliseconds"],
  s: ["s", "sec", "secs", "second", "seconds"],
  m: ["m", "min", "mins", "minute", "minutes"],
  h: ["h", "hr", "hrs", "hour", "hours"],
  d: ["d", "day", "days"],
  w: ["w", "week", "weeks"],
  mth: ["mon", "mth", "mths", "month", "months"],
  y: ["y", "yr", "yrs", "year", "years"],
};

/**
 * Parse a timestring
 *
 * @param   {string} string
 * @param   {string} returnUnit
 * @param   {Object} opts
 * @returns {number}
 */

function parseTimestring(string, returnUnit, opts) {
  opts = Object.assign({}, default_opts, opts || {});

  let totalSeconds = 0;
  const unitValues = getUnitValues(opts);
  const groups = string
    .toLowerCase()
    .replace(/[^.\w+-]+/g, "")
    .match(/[-+]?[0-9.]+[a-z]+/g);

  if (groups === null) {
    throw new Error(`The string [${string}] could not be parsed by timestring`);
  }

  groups.forEach(group => {
    const value = group.match(/[0-9.]+/g)[0];
    const unit = group.match(/[a-z]+/g)[0];

    totalSeconds += getSeconds(value, unit, unitValues);
  });

  if (returnUnit) {
    return convert(totalSeconds, returnUnit, unitValues);
  }

  return totalSeconds;
}
function getUnitValues(opts) {
  const unitValues = {
    ms: 0.001,
    s: 1,
    m: 60,
    h: 3600,
  };

  unitValues.d = opts.hoursPerDay * unitValues.h;
  unitValues.w = opts.daysPerWeek * unitValues.d;
  unitValues.mth = (opts.daysPerYear / opts.monthsPerYear) * unitValues.d;
  unitValues.y = opts.daysPerYear * unitValues.d;

  return unitValues;
}
function getUnitKey(unit) {
  for (const key of Object.keys(UNIT_MAP)) {
    if (UNIT_MAP[key].indexOf(unit) > -1) {
      return key;
    }
  }
  throw new Error(`The unit [${unit}] is not supported by timestring`);
}
function getSeconds(value, unit, unitValues) {
  return value * unitValues[getUnitKey(unit)];
}
function convert(value, unit, unitValues) {
  return value / unitValues[getUnitKey(unit)];
}

module.exports = {
  rndint,
  parseDate,
  parseShortDate,
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
  clean,
  tips,
  inviteLink,
  buttons,
  colorize,
  leven,
  chunk,
  progressBar,
  parseTimestring,
  prettyMs,
};
