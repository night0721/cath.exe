const Levels = require("discord-xp");
const Canvas = require("canvas"),
  Discord = require(`discord.js`);
const { registerFont } = require("canvas");
registerFont("./util/assets/fonts/Poppins-Regular.ttf", {
  family: "Poppins-Regular",
});
registerFont("./util/assets/fonts/Poppins-SemiBold.ttf", {
  family: "Poppins-Bold",
});
module.exports = {
  name: "rank",
  description: "Shows an image of someone's ranking",
  type: "CHAT_INPUT",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const badges = [1, 8];
    for (let i = badges[0]; i <= badges[1]; i++) client[`badge${i}`] = null;
    setBadge = function (variable, value) {
      const number = Number(variable);
      for (let i = badges[0]; i <= badges[1]; i++)
        if (number === i) {
          client[`badge${number}`] = value;
          break;
        }
      return client;
    };

    const member =
      interaction.guild.members.cache.get(args[0]) || interaction.member;

    const user = await Levels.fetch(member.id, interaction.guild.id);
    console.log(user);
    const canvas = Canvas.createCanvas(1080, 400),
      ctx = canvas.getContext("2d");

    let BackgroundRadius = "50", //50 | 0 if u want no rounded background | 50 if u want a very rounded background
      BackGroundImg = "https://images7.alphacoders.com/109/1092420.jpg",
      AttachmentName = "rank.png",
      Username = member.user.username,
      AvatarRoundRadius = "50", // 30 if u want squared round Avatar | 100 IF u want rounded
      DrawLayerColor = "#000000",
      DrawLayerOpacity = "0.4",
      BoxColor = "#6eaedb", //Lvl and REP Box COlor
      LevelBarFill = "#ffffff", //
      LevelBarBackground = "#ffffff",
      Rank = user.position,
      TextEXP = "20XP",
      TextReputation = "+ 2.18k rep",
      BarRadius = "15",
      TextXpNeded = "{current}/{needed}",
      CurrentXP = user.xp,
      NeededXP = Levels.xpFor(parseInt(user.level) + 1);

    //SET BADGES
    //setBadge("1", "Bronze") // .png | file name need to be Number_Name in this case is "1_bronze"
    //setBadge("2", "Gold") // .png | file name need to be Number_Name in this case is "2_Gold"
    //SET BADGES

    //BackGround
    ctx.beginPath();
    ctx.moveTo(0 + Number(BackgroundRadius), 0);
    ctx.lineTo(0 + 1080 - Number(BackgroundRadius), 0);
    ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(BackgroundRadius));
    ctx.lineTo(0 + 1080, 0 + 400 - Number(BackgroundRadius));
    ctx.quadraticCurveTo(
      0 + 1080,
      0 + 400,
      0 + 1080 - Number(BackgroundRadius),
      0 + 400
    );

    ctx.lineTo(0 + Number(BackgroundRadius), 0 + 400);
    ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(BackgroundRadius));
    ctx.lineTo(0, 0 + Number(BackgroundRadius));
    ctx.quadraticCurveTo(0, 0, 0 + Number(BackgroundRadius), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1080, 400);
    let background = await Canvas.loadImage(BackGroundImg);
    ctx.drawImage(background, 0, 0, 1080, 400);
    ctx.restore();

    //Layer
    ctx.fillStyle = DrawLayerColor;
    ctx.globalAlpha = DrawLayerOpacity;
    ctx.fillRect(40, 0, 240, canvas.height);
    ctx.globalAlpha = 1;

    //RoundedBox Function
    function RoundedBox(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    //Avatar
    let avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ dynamic: true, format: "png" })
    );
    ctx.save();
    RoundedBox(ctx, 40 + 30, 30, 180, 180, Number(AvatarRoundRadius));
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 40 + 30, 30, 180, 180);
    ctx.restore();
    //Avatar

    //Reputation
    ctx.save();
    RoundedBox(ctx, 40 + 30, 30 + 180 + 30, 180, 50, 10);
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = BoxColor;
    ctx.globalAlpha = "1";
    ctx.fillRect(40 + 30, 30 + 180 + 30, 180, 50, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '32px "Poppins-Bold"';
    ctx.textAlign = "center";
    ctx.fillText(TextReputation, 40 + 30 + 180 / 2, 30 + 180 + 30 + 38);
    ctx.restore();
    //Reputation

    //EXP
    ctx.save();
    RoundedBox(ctx, 40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50, 10);
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = BoxColor;
    ctx.globalAlpha = "1";
    ctx.fillRect(40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '32px "Poppins-Bold"';
    ctx.textAlign = "center";
    ctx.fillText(TextEXP, 40 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
    ctx.restore();
    //EXP

    //ctx.save()
    //ctx.textAlign = "left";
    //ctx.fillStyle = "#ffffff";
    //ctx.shadowColor = '#000000';
    //ctx.font = '15px "Poppins-Bold"'
    //ctx.fillText(member.user.username, 390, 200);
    //ctx.restore()

    //Username
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '39px "Poppins-Bold"';
    ctx.fillText(Username, 390, 80);
    ctx.restore();
    //Username

    //Rank
    ctx.save();
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '55px "Poppins-Bold"';
    ctx.fillText("#" + Rank, canvas.width - 50 - 5, 80);
    ctx.restore();

    //Rank Name
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '30px "Poppins-Bold"';
    ctx.fillText("Diamond Nature", 390, 120);
    ctx.restore();

    //Badges
    ctx.save();
    RoundedBox(ctx, 390, 305, 660, 70, Number(15));
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = "0.2";
    ctx.fillRect(390, 305, 660, 70);
    ctx.restore();
    const badgeNames = ["1", "2", "3", "4", "5", "6", "7", "8"];
    for (let index = 0; index < badgeNames.length; index++) {
      let badge = `badge${index + 1}`;
      if (!client[badge]) {
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = "0.2";
        ctx.textAlign = "center";
        ctx.font = '90px "Poppins-Bold"';
        ctx.fillText(".", 75 * index + 450, 345);
      } else {
        ctx.globalAlpha = 1;
        let badgeImg = await Canvas.loadImage(
          ["bronze", "silver", "gold", "diamond"].includes(
            client[badge].toLowerCase()
          )
            ? `${__dirname}/${badgeNames[index]}_${client[
                badge
              ].toLowerCase()}.png`
            : client[badge]
        );
        ctx.drawImage(badgeImg, 75 * index + 420, 315, 50, 50);
      }
    }
    //Badges

    //Level Bar
    ctx.save();
    RoundedBox(ctx, 390, 145, 660, 50, Number(BarRadius));
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = LevelBarBackground;
    ctx.globalAlpha = "0.2";
    ctx.fillRect(390, 145, 660, 50, 50);
    ctx.restore();

    const percent = (100 * CurrentXP) / NeededXP;
    const progress = (percent * 660) / 100;

    ctx.save();
    RoundedBox(ctx, 390, 145, progress, 50, Number(BarRadius));
    ctx.strokeStyle = "#BFC85A22";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = LevelBarFill;
    ctx.globalAlpha = "0.5";
    ctx.fillRect(390, 145, progress, 50, 50);
    ctx.restore();

    //Next Rank
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = "0.8";
    ctx.font = '30px "Poppins-Bold"';
    ctx.fillText("Next Rank: " + "None", 390, 230);
    ctx.restore();

    const latestXP = Number(CurrentXP) - Number(NeededXP);
    const textXPEdited = TextXpNeded.replace(/{needed}/g, NeededXP)
      .replace(/{current}/g, CurrentXP)
      .replace(/{latest}/g, latestXP);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 1;
    ctx.font = '30px "Poppins-Bold"';
    ctx.fillText(textXPEdited, 730, 180);
    //Level Bar

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      AttachmentName
    );
    await interaction.followUp({ files: [attachment] });
  },
};
