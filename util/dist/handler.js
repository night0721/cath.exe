const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
/**
 * @param {Client} client
 */
module.exports = async client => {
  const commands = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commands.map(value => {
    if (!value.includes("Owner")) {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      if (file.name) {
        const properties = { directory, ...file };
        client.commands.set(file.name, properties);
      }
    }
  });
  const events = await globPromise(`${process.cwd()}/events/*.js`);
  events.map(value => require(value));
  const paths = await globPromise(`${process.cwd()}/cat/*.js`);
  paths.map(value => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    if (file.name) {
      const properties = { directory, ...file };
      client.hide.set(file.name, properties);
    }
  });
  const cmds = [];
  const scommands = await globPromise(`${process.cwd()}/command/*/*.js`);
  scommands.map(value => {
    if (!value.includes("Owner")) {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      if (file.name) {
        const properties = { directory, ...file };
        client.slashCommands.set(file.name, properties);
      }
      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
      if (file.userPerms) file.defaultPermission = false;
      cmds.push(file);
    }
  });
  const ownercmds = [];
  const owners = await globPromise(`${process.cwd()}/command/Owner/*.js`);
  owners.map(value => {
    const file = require(value);
    client.hide.set(file.name, file);
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    if (file.userPerms) file.defaultPermission = false;
    ownercmds.push(file);
  });
  client.on("ready", async () => {
    const g = client.guilds.cache.get("840225563193114624");
    await g.commands.set(ownercmds);
    await client.application.commands.set(cmds).then(async cmd => {
      const getroles = name => {
        const perms = cmds.find(n => n.name == name).userPerms;
        if (!perms) return null;
        return g.roles.cache.filter(
          z => z.permissions.has(perms) && !z.managed
        );
      };
      const fullPermissions = cmd.reduce((accumulator, v) => {
        const roles = getroles(v.name);
        if (!roles) return accumulator;
        const permissions = roles.reduce((a, w) => {
          return [...a, { id: w.id, type: "ROLE", permission: true }];
        }, []);
        return [...accumulator, { id: v.id, permissions }];
      }, []);
      client.guilds.cache.forEach(g =>
        g.commands.permissions.set({ fullPermissions })
      );
    });
  });
};
