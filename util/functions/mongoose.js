const mongoose = require("mongoose");
const { GooseCache } = require("goosecache");
const cachegoose = new GooseCache(mongoose, {
  engine: "memory",
});
mongoose.set("useFindAndModify", false);
const u = require("../../models/users");
const g = require("../../models/guilds");
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
      const { Guild, Prefix, Premium, Category, Commands, Tips } = gg;
      await gg.save().catch(error => console.log(error));
      return {
        Guild,
        Prefix,
        Premium,
        Category,
        Commands,
        Tips,
      };
    } else {
      const Guild = guild.Guild;
      const Prefix = guild.Prefix;
      const Premium = guild.Premium;
      const Category = guild.Category;
      const Commands = guild.Commands;
      const Tips = guild.Tips;
      return {
        Guild,
        Prefix,
        Premium,
        Category,
        Commands,
        Tips,
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
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
      } = ss;
      await ss.save().catch(error => console.log(error));
      return {
        User,
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
      };
    } else {
      const User = user.User;
      const Tier = user.Tier;
      const Premium = user.Premium;
      const Blacklist = user.Blacklist;
      const Blacklist_Reason = user.Blacklist_Reason;
      const PremiumServers = user.PremiumServers;
      return {
        User,
        Tier,
        Premium,
        Blacklist,
        Blacklist_Reason,
        PremiumServers,
      };
    }
  },
  /**
   * @param {String} ID - ID of the User
   * @param {String} Toggle - Blacklist Toggle(true/false)
   * @param {String} Reason - Blacklist Reason
   */
  async BK(ID, Toggle, Reason) {
    if (!ID) throw new Error("User ID?");
    // if (!Toggle) throw new Error("Blacklist Toggle?");
    if (!Reason) throw new Error("Blacklist Feason?");
    const user = await u.findOne({ User: ID });
    if (!user) {
      const sus = new u({ User: ID });
      if (Toggle == true) {
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
      if (Toggle == true) {
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
    } else if (Toggle == "true") {
      guild.Premium = true;
    } else {
      guild.Premium = false;
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
   * @param {String} ID - Guild ID
   * @param {String} Toggle - Level Toggle
   */
  async setTips(ID, Toggle) {
    if (!ID) throw new Error("Please Provide a Guild ID");
    if (!Toggle) throw new Error("Please Provide a Toggle!");
    const guild = await g.findOne({ Guild: ID });
    if (!guild) {
      const newU = new g({ Guild: ID });
      if (Toggle == "true") {
        guild.Tips = true;
      } else {
        guild.Tips = false;
      }
      await newU.save().catch(error => console.log(error));
      return;
    } else if (Toggle == "true") {
      guild.Tips = true;
    } else {
      guild.Tips = false;
    }
    await guild.save().catch(error => console.log(error));
    cachegoose.clearCache();
    return;
  },
};
