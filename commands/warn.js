const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  // !warn @user <reason>
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.reply("Sorry Dave, I can't let you do that.");
  if (args[0] == "help") {
    message.reply("Usage: $warn <user> <reason>");
    return;
  }
  let wUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!wUser) return message.reply("Cant find user.");
  if (wUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Talk to my Boss about doing this.");
  let reason = args.join(" ").slice(22);
  let muteRole = message.guild.roles.find(`name`, "muted");

  if (!warns[wUser.id]) {
    warns[wUser.id] = {
      warns: 0
    };
  }
  warns[wUser.id].warns++;
  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#15f153")
    .addField("Warned User", wUser)
    .addField("Warned By", `${message.author} with ID: ${message.author.id}`)
    .addField("Warned in", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "incidents");
  if (!warnchannel) {
    return message.channel.send("Couldn't find incidents channel.");
  }
  warnchannel.send(warnEmbed);
  if (warns[wUser.id].warns === 2) {
    if (!muteRole) {
      return message.reply("That role needs to be created");
    }
    if (wUser.roles.has(muteRole.id)) {
      message.reply(`${wUser.id} has already been muted for another reason.`);
    } else {
      let mutetime = "15m";
      await wUser.addRole(muteRole.id);
      message.channel.send(`${wUser} has been temporarily muted`);
      setTimeout(function() {
        wUser.removeRole(muteRole.id);
        message.reply(`${wUser} has been unmuted`);
      }, ms(mutetime));
    }
  }
  if (warns[wUser.id].warns === 3) {
    if (wUser.roles.has(muteRole.id)) {
      wUser.removeRole(muterole.id);
    }
    await wUser.addRole(muteRole.id);
    message.channel.send(`${wUser}, the Admins will be in touch.`);
  }
};

module.exports.help = {
  name: "warn"
};
