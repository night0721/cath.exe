module.exports = {
  name: "dinochrome",
  category: "Fun",
  description: "Dinosaur in Chrome",
  run: async (client, interaction, args) => {
    await interaction.deleteReply();
    let msg = await interaction.channel.send(`---------------🦖`);
    let time = 1 * 1000;
    setTimeout(function () {
      msg.edit(`-----------🦖----`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----------🦖------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`--------🦖--------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`------🦖-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-------🦖-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🌵-----🦖---------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🌵-🦖-------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🦖\n ---🌵--------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`------🦖---🌵--------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----🦖-----🌵----------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-🌵🌵-----🦖-------🌵--------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----🌵🌵-🦖----------🌵------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🦖\n ---🌵🌵-------------🌵---`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-----🦖---🌵🌵-------------🌵--`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-------🦖-----🌵🌵-------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🎂----🦖--------🌵🌵-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🎂--🦖----------🌵🌵---------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`**Ⓜⓘⓢⓢⓘⓞⓝ Ⓒⓞⓜⓟⓛⓔⓣⓔⓓ !**\n ---🎂🦖----------🌵🌵-------------`);
    }, time);
  },
};
