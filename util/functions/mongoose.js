const mongoose = require("mongoose");
const { GooseCache } = require("goosecache");
const cachegoose = new GooseCache(mongoose, {
  engine: "memory",
});
mongoose.set("useFindAndModify", false);
const u = require("../../models/users");
const g = require("../../models/guilds");
const m = require("../../models/bot");
const e = require("../../models/econ");
module.exports = {
  /**
   * @param {String} URI - Mongo Connection URI
   */
  async connect(URI) {
    if (!URI) throw new Error("Please provide a Mongoose URI");
    return mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  /**
   * @param {String} ID - Guild ID
   */
  async getGuild(ID) {
    if (!ID) throw new Error("Guild ID?");
    const guild = await g.findOne({ Guild: ID }).lean().cache(120);
    if (!guild) {
      const gg = new g({ Guild: ID });
      const {
        Guild,
        Prefix,
        Welcome,
        Goodbye,
        Log,
        Premium,
        Category,
        Commands,
        Level,
      } = gg;
      await gg.save().catch(error => console.log(error));
      return {
        Guild,
        Prefix,
        Welcome,
        Goodbye,
        Log,
        Premium,
        Category,
        Commands,
        Level,
      };
    } else {
      const Guild = guild.Guild;
      const Prefix = guild.Prefix;
      const Welcome = guild.Welcome;
      const Goodbye = guild.Goodbye;
      const Log = guild.Log;
      const Premium = guild.Premium;
      const Category = guild.Category;
      const Commands = guild.Commands;
      const Level = guild.Level;
      return {
        Guild,
        Prefix,
        Welcome,
        Goodbye,
        Log,
        Premium,
        Category,
        Commands,
        Level,
      };
    }
  },
  /**
   * @param {String} ID - User ID
   */
  async getUser(ID) {
    if (!ID) throw new Error("User ID?");
    const user = await u.findOne({ User: ID }).lean().cache(120);
    if (!user) {
      const ss = new u({ User: ID });
      const {
        User,
        AFK,
        AFKDate,
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
        CommandUsed,
      } = ss;
      await ss.save().catch(error => console.log(error));
      return {
        User,
        AFK,
        AFKDate,
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
        CommandUsed,
      };
    } else {
      const User = user.User;
      const AFK = user.AFK;
      const AFKDate = user.AFKDate;
      const Tier = user.Tier;
      const Premium = user.Premium;
      const Blacklist = user.Blacklist;
      const Blacklist_Reason = user.Blacklist_Reason;
      const PremiumServers = user.PremiumServers;
      const CommandUsed = user.CommandUsed;
      return {
        User,
        AFK,
        AFKDate,
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
        CommandUsed,
      };
    }
  },
  /**
   * @param {String} ID - User ID
   */
  async getUserEcon(ID) {
    if (!ID) throw new Error("User ID?");
    const user = await u.findOne({ User: ID }).lean().cache(120);
    if (!user) {
      const ss = new u({ User: ID });
      const { User, CP, BJWins, SlotsWins, BetWins } = ss;
      await ss.save().catch(error => console.log(error));
      return {
        User,
        CP,
        BJWins,
        SlotsWins,
        BetWins,
      };
    } else {
      const User = user.User;
      const CP = user.CP;
      const BJWins = user.BJWins;
      const SlotsWins = user.SlotsWins;
      const BetWins = user.BetWins;
      return {
        User,
        CP,
        BJWins,
        SlotsWins,
        BetWins,
      };
    }
  },
  /**
   * @param {String} ID - User ID
   * @param {String} Reason - AFK Reason
   */
  async AFK(ID, Reason) {
    if (!ID) throw new Error("User ID?");
    if (!Reason) throw new Error("AFK Reason?");
    const user = await u.findOne({ User: ID });
    if (!user) {
      const sss = new u({ User: ID });
      await sss.save().catch(error => console.log(error));
      return { Reason, Time };
    } else {
      user.User = ID;
      user.AFK = Reason;
      await user.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { Reason };
    }
  },
  /**
   * @param {String} ID - User ID
   */
  async DelAFK(ID) {
    if (!ID) throw new Error("User ID?");
    const user = await u.findOne({ User: ID });
    if (!user) {
      const sssss = new u({ User: ID });
      await sssss.save().catch(error => console.log(error));
      return { ID };
    } else {
      user.AFK = null;
      user.AFKDate = null;
      await user.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { ID };
    }
  },
  /**
   * @param {String} ID - ID of the User
   * @param {String} Toggle - Blacklist Toggle(true/false)
   * @param {String} Reason - Blacklist Reason
   */
  async BK(ID, Toggle, Reason) {
    if (!ID) throw new Error("User ID?");
    if (!Toggle) throw new Error("Blacklist Toggle?");
    if (!Reason) throw new Error("Blacklist Feason?");
    const user = await u.findOne({ User: ID });
    if (!user) {
      const sus = new u({ User: ID });
      if (Toggle == "true") {
        user.Blacklist = true;
        user.Blacklist_Reason = Reason;
      } else {
        user.Blacklist = false;
        user.Blacklist_Reason = null;
      }
      await sus.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { Reason };
    } else {
      if (Toggle == "true") {
        user.Blacklist = true;
        user.Blacklist_Reason = Reason;
      } else {
        user.Blacklist = false;
        user.Blacklist_Reason = null;
      }
      await user.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { Reason };
    }
  },
  /**
   * @param {String} ID - ID of the User
   * @param {Boolean} Toggle - Premium Toggle(true/false)
   * @param {Number} Tier - Tier
   */
  async Premium(ID, Toggle, Tier) {
    if (!ID) throw new Error("User ID?");
    if (!Toggle) throw new Error("Premium Toggle?");
    if (!Tier) throw new Error("Premium Feason?");
    const user = await u.findOne({ User: ID });
    if (!user) {
      const sus = new u({ User: ID });
      if (Toggle == "true") {
        user.Premium = true;
        user.Tier = Tier;
      } else {
        user.Premium = false;
        user.Tier = 0;
      }
      await sus.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { Tier };
    } else {
      if (Toggle == "true") {
        user.Premium = true;
        user.Tier = Tier;
      } else {
        user.Premium = false;
        user.Tier = 0;
      }
      await user.save().catch(error => console.log(error));
      cachegoose.clearCache();
      return { Tier };
    }
  },
  /**
   * @param {String} ID
   */
  async CreateGuild(ID) {
    await new g({ Guild: ID });
    return;
  },
  /**
   * @param {String} ID
   */
  async CreateBot(ID) {
    await new m({ Guild: ID });
    return;
  },
  /**
   * @param {String} ID - Guild ID
   */
  async DelGuild(ID) {
    await g.deleteMany({ Guild: ID });
    return;
  },
  /**
   * @param {String} ID - User ID
   * @param {String} Prefix - Guild Prefix
   */
  async setPrefix(ID, Prefix) {
    if (!ID) throw new Error("Guild ID?");
    if (!Prefix) throw new Error("Prefix?");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      await newU.save().catch(error => console.log(error));
      return { Prefix };
    }
    guild.Prefix = Prefix;
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return { Prefix };
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Channel - Welcome Channel
   */
  async setWelcome(ID, Channel) {
    if (!ID) throw new Error("Guild ID?");
    if (!Channel) throw new Error("Channel?");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      await newU.save().catch(error => console.log(error));
      return { Channel };
    }
    guild.Welcome = Channel;
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return { Channel };
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Channel - Goodbye Channel
   */
  async setGoodbye(ID, Channel) {
    if (!ID) throw new Error("Guild ID?");
    if (!Channel) throw new Error("Channel?");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      await newU.save().catch(error => console.log(error));
      return { Channel };
    }
    guild.Goodbye = Channel;
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return { Channel };
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Channel - Log Channel
   * @param {String} WebhookID - WebhookID
   * @param {String} WebhookToken - WebhookToken
   */
  async setLog(ID, Channel, WID, WToken) {
    if (!ID) throw new Error("Guild ID?");
    if (!Channel) throw new Error("Channel?");
    if (!WID) throw new Error("WebhookID?");
    if (!WToken) throw new Error("WebhookToken?");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      newU.LogChannel = Channel;
      newU.LogWebhookID = WID;
      newU.LogWebhookToken = WToken;
      await newU.save().catch(error => console.log(error));
      return { Channel };
    }
    guild.Log = Channel;
    guild.LogWebhookID = WID;
    guild.LogWebhookToken = WToken;
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return { Channel };
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Toggle - premium Toggle
   */
  async setPremium(ID, Toggle) {
    if (!ID) throw new Error("Please Provide a Guild ID");
    if (!Toggle) throw new Error("Please Provide a Toggle!");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      if (Toggle == "true") {
        guild.Premium = true;
      } else {
        guild.Premium = false;
      }
      await newU.save().catch(error => console.log(error));
      return;
    } else {
      if (Toggle == "true") {
        guild.Premium = true;
      } else {
        guild.Premium = false;
      }
    }
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
  /**
   * @param {String} User - User ID
   * @param {String} ID - Guild ID
   * @param {String} Method - Method
   */
  async pushGuild(User, ID, method) {
    if (!method) return new Error("Method?");
    u.findOne({ User: User }, async (err, data) => {
      if (err) throw err;
      if (!data) return new Error("User not found");
      if (method === "push") {
        await data.PremiumServers.push(ID);
        await data.save().catch(error => console.log(error));
        data.save();
      }
      if (method === "splice") {
        const index = data.PremiumServers.indexOf(ID);
        data.PremiumServers.splice(index, 1);
        data.save();
      }
      cachegoose.clearCache();
      return { User };
    });
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Type - Type
   * @param {String} Name - Name
   */
  async disable(ID, Type, Name) {
    if (!Name) throw new Error("Name?");
    if (!Type) throw new Error("Type?");
    if (!ID) throw new Error("Guild ID?");
    if (Type === "category") {
      const db = await g.findOne({ Guild: ID });
      if (!db) {
        const newdoc = await new g({ Guild: ID });
        await newdoc.save().catch(error => console.log(error));
      }
      await db.Category.push(Name);
      await db.save().catch(e => console.log(e));
    }
    if (Type === "command") {
      const db = await g.findOne({ Guild: ID });
      if (!db) {
        const newdoc = await new g({ Guild: ID });
        await newdoc.save().catch(error => console.log(error));
      }
      await db.Commands.push(Name);
      await db.save().catch(e => console.log(e));
    }
    cachegoose.clearCache();
    return { Name };
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Type - Type
   * @param {String} Name - Name
   */
  async enable(ID, Type, Name) {
    if (!ID) throw new Error("Guild ID?");
    if (!Name) throw new Error("Name?");
    if (!Type) throw new Error("Type?");
    if (Type === "category") {
      const db = await g.findOne({ Guild: ID });
      if (!db) {
        return false;
      }
      const index = db.Category.indexOf(Name.toLowerCase());
      await db.Category.splice(index, 1);
      await db.save().catch(e => console.log(e));
    }
    if (Type === "command") {
      const db = await g.findOne({ Guild: ID });
      if (!db) {
        return false;
      }
      const index = db.Commands.indexOf(Name);
      await db.Commands.splice(index, 1);
      await db.save().catch(e => console.log(e));
    }
    cachegoose.clearCache();
    return true;
  },
  /**
   * @param {String} ID - Bot ID
   * @param {String} Toggle - Maintenance Toggle
   */
  async maintenance(ID, Toggle) {
    if (!ID) throw new Error("Please Provide a ID!");
    if (!Toggle) throw new Error("Please Provide a Toggle!");
    const idk = await m.findOne({ Bot: ID });
    if (!idk) {
      const newdb = new m({ Bot: ID });
      if (Toggle === "true") {
        newdb.Status = "true";
      } else {
        newdb.Status = "false";
      }
      await newdb.save().catch(error => console.log(error));
      return;
    } else {
      if (Toggle === "true") {
        idk.Status = "true";
      } else {
        idk.Status = "false";
      }
    }
    await idk.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
  /**
   * @param {String} ID - Bot ID
   * @param {String} Guilds - Guilds Number
   * @param {String} Users - Users Number
   */
  async botcache(ID, Guild, User) {
    if (!ID) throw new Error("Please Provide a ID!");
    if (!Guild) throw new Error("Please Provide a Guild Number!");
    if (!User) throw new Error("Please Provide a User Number!");
    const idk = await m.findOne({ Bot: ID });
    if (!idk) {
      const newdb = new m({ Bot: ID });
      if (Guild && User) {
        newdb.Guilds = Guild;
        newdb.Users = User;
      } else {
        newdb.Guilds = Guild;
        newdb.Users = User;
      }
      await newdb.save().catch(error => console.log(error));
      return;
    } else {
      if (Guild && User) {
        idk.Guilds = Guild;
        idk.Users = User;
      } else {
        idk.Guilds = Guild;
        idk.Users = User;
      }
    }
    await idk.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
  /**
   * @param {String} ID - Bot ID
   * @param {String} Commands - Commands
   */
  async commands(ID, Cmds) {
    if (!ID) throw new Error("Please Provide a ID!");
    if (!Cmds) throw new Error("Please Provide Commands!");
    const idk = await m.findOne({ Bot: ID });
    if (!idk) {
      const newdb = new m({ Bot: ID });
      if (Cmds) {
        newdb.Commands = Cmds;
      } else {
        newdb.Commands = Cmds;
      }
      await newdb.save().catch(error => console.log(error));
      return;
    } else {
      if (Cmds) {
        idk.Commands = Cmds;
      } else {
        idk.Commands = Cmds;
      }
    }
    await idk.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
  /**
   * @param {String} ID - Guild ID
   * @param {String} Toggle - Level Toggle
   */
  async setGLevel(ID, Toggle) {
    if (!ID) throw new Error("Please Provide a Guild ID");
    if (!Toggle) throw new Error("Please Provide a Toggle!");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      if (Toggle == "true") {
        guild.Level = true;
      } else {
        guild.Level = false;
      }
      await newU.save().catch(error => console.log(error));
      return;
    } else {
      if (Toggle == "true") {
        guild.Level = true;
      } else {
        guild.Level = false;
      }
    }
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
};
