const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "hack",
  description: "Hack a user",
  usage: "(User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to hack",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    let answers = [
      "@yousuck.noob",
      "@hesnoob.haha",
      "@thisguy.suck",
      "@paypal.removed",
      "@noob.haha",
      "@hacked.xyz",
      "@susmate.com",
      "@gmail.sus",
      "@why-im.withyou",
      "@someone-end.me",
      "@isnoob.io",
      "@username-is.noob",
      "@hahaget.lost",
      "@yahoo.sus",
      "@botmail.zip",
      "@gmail.com",
      "@yahoo.com",
    ];
    let passwords = [
      "Disb****",
      "disc******",
      "pass**********",
      "get****",
      "mails***",
      "endm****",
      "gamer***********",
      "asegeio*********",
      "whys*******",
      "Brot******",
      "imwith*******",
      "luckyyougotthispasswordlolnocencor",
      "starb*******",
      "egghunt2***",
      "secr*****",
    ];
    let ips = [
      "10.313.523.502.00.1",
      "25.537.753.462.29.2",
      "21.175.866.974.07.08",
      "32.653.587.825.35.5",
      "12.172.764.781.22.8",
      "91.723.242.452.09.3",
      "92.743.116.896.85.6",
      "84.091.000.853.54.7",
      "51.071.124.129.12.0",
    ];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    const passwrd = passwords[Math.floor(Math.random() * passwords.length)];
    const ip = ips[Math.floor(Math.random() * ips.length)];
    const taggedUser = interaction.guild.members.cache.get(args[0]);
    await interaction.deleteReply();
    interaction.channel
      .send(`Hacking  ${taggedUser.user.username}...`)
      .then(async msg => {
        client.function.sleep(100);
        msg.edit("Status: ■□□□□□□□□□□ 0%");
        client.function.sleep(100);
        msg.edit("Status: ■■□□□□□□□□□ 7%: Hacking Email...");
        client.function.sleep(600);
        msg.edit(
          `Status: ■■■□□□□□□□□ 8%:\n \`Email: ${taggedUser.user.username}@yousuck.noob\`\n \`Password: ${passwrd}\` `
        );
        client.function.sleep(600);
        msg.edit("Status: ■■□□□□□□□□□ 9%: Logging in to the Email...");
        client.function.sleep(2000);
        msg.edit("Status: ■■■□□□□□□□□ 12%: Turning off the antivirus");
        client.function.sleep(1000);
        msg.edit("Status: ■■■■□□□□□□ 14%: Downloading SYNAPSE X");
        client.function.sleep(100);
        msg.edit("Status: ■■■□□□□□□□□ 17%: Deleting Captcha...");
        client.function.sleep(100);
        msg.edit("Status: ■■□□□□□□□□□ 20%: Deleting Paypal account...");
        client.function.sleep(10);
        msg.edit("Status: ■■■□□□□□□□□ 21%");
        client.function.sleep(12);
        msg.edit("Status: ■■■■□□□□□□□ 22%");
        client.function.sleep(100);
        msg.edit("Status: ■■■■■□□□□□□ 24%: Paypal account deleted");
        client.function.sleep(1000);
        msg.edit("Status: ■■■■□□□□□□ 29%: Hacking is almost ready...");
        client.function.sleep(80);
        msg.edit("Status: ■■■□□□□□□□□ 31%");
        client.function.sleep(80);
        msg.edit("Status: ■■■■□□□□□□□ 36%");
        client.function.sleep(40);
        msg.edit("Status: ■■■■■□□□□□□ 41%");
        client.function.sleep(60);
        msg.edit("Status: ■■■■□□□□□□□ 47%");
        client.function.sleep(50);
        msg.edit("Status: ■■■■■■□□□□□ 53%");
        client.function.sleep(3000);
        msg.edit(
          `Status: ■■■■■■■□□□□ 58%: Email password changed so ${taggedUser.user.username} can not login`
        );
        client.function.sleep(500);
        msg.edit("Status: ■■■■■■□□□□□ 66%");
        client.function.sleep(60);
        msg.edit("Status: ■■■■■□□□□□□ 74%");
        client.function.sleep(20);
        msg.edit(`Status: ■■■■■□□□□□□ 79%: IP address found: ${ip}`);
        client.function.sleep(83);
        msg.edit("Status: ■■■■■■□□□□ 80%");
        client.function.sleep(50);
        msg.edit("Status: ■■■■■■■□□□ 85%");
        client.function.sleep(14);
        msg.edit("Status: ■■■■■■■■■□□ 93%");
        client.function.sleep(70);
        msg.edit("Status: ■■■■■■■■■■□ 97%");
        client.function.sleep(90);
        msg.edit("Status: ■■■■■■■■■■■ 100%");
        const embed = new MessageEmbed()
          .setDescription(`${taggedUser} has been hacked!`)
          .addField("Email", `${taggedUser.user.username}${answer}`)
          .addField("Password", `${passwrd}`)
          .addField("IP address", `${ip}`)
          .setFooter(`Made by ${client.author}`)
          .setColor("02023a");
        await msg.edit({ embeds: [embed] });
      });
  },
};
