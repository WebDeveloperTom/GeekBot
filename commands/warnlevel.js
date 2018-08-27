const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("You don't have permission to do that.");
  }
  if (args[0] == "help") {
    message.reply("Usage: $warnlevel <user>");
    return;
  }
  let wUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!wUser) return message.reply("Cant find user.");
  let warnLevel = warns[wUser.id].warns;

  message.reply(`${wUser.id} has ${warnLevel} warnings.`);
};

module.exports.help = {
  name: "warnlevel"
};
