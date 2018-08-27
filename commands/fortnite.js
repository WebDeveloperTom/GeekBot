const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const Fortnite = require("fortnite");
const ft = new Fortnite(botconfig.fKey);
const fs = require("fs");

// Get the stats of an Xbox player by the name of Number1Swifty
// ft.user('ThatLegendTom', 'xbl').then(console.log);
// xb1, pc, ps4
//GET https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}

module.exports.run = async (bot, message, args) => {
  if (args[0] == "help") {
    message.reply("Usage: $fortnite <EPIC games name> <xbl/ps4/pc>");
    return;
  }
  await message.delete();
  //!fortnite {user} {platform}
  let username = args[0];
  let platform = args[1] || "pc";
  if (!username) return message.reply("Please provide an EPIC account name.");
  let data = ft
    .user(username, platform)
    .then(data => {
      let stats = data.stats.lifetime;
      let kills = stats[10].Kills;
      let kd = stats[11]["K/d"];
      let mPlayed = stats[7]["Matches Played"];
      let wins = stats[8].Wins;
      let winPer = stats[9]["Win%"];

      let embed = new Discord.RichEmbed()
        .setTitle(`Fortnite Stats (${platform})`)
        .setAuthor(data.username)
        .setColor("#551A8B")
        .addField("Wins", wins)
        .addField("Kills", kills)
        .addField("KD", kd)
        .addField("Matches Played", mPlayed)
        .addField("Win %", winPer);

      message.channel.send(embed);
    })
    .catch(e => {
      console.log(e);
      message.channel.send("Doh! An error has occured. Please try again.");
    });
};

module.exports.help = {
  name: "fortnite"
};
