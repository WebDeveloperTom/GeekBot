const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("I can't let you do that Dave.");
  //$tempmute @user 1s/m/h/d
  if (args[0] == "help") {
    message.reply("Usage: $tempmute <user> <1s/m/h/d> <reason>");
    return;
  }

  let mUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mUser) return message.reply("Couldnt find user.");
  if (mUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("They cannot be silenced!");
  let mReason = args.slice(2).join(" ");
  if (!mReason) return message.reply("Please supply a reason.");
  let muteRole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if (!muteRole) {
    try {
      muteRole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  //end of create roles
  let muteTime = args[1];
  if (!muteTime) {
    return message.reply("You didn't specify a time!");
  }
  // message.reply("You didnt specify a time!");
  await mUser.addRole(muteRole);
  message.reply(`${mUser} has been muted for ${ms(ms(muteTime))}`);
  let muteEmbed = new Discord.RichEmbed()
    .setDescription("Muted")
    .setColor("#15f153")
    .addField("Muted User", mUser)
    .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Reason", mReason);

  let warnchannel = message.guild.channels.find(`name`, "incidents");
  if (!warnchannel) {
    return message.channel.send("Couldn't find incidents channel.");
  }
  warnchannel.send(muteEmbed);
  setTimeout(function() {
    mUser.removeRole(muteRole);
    message.channel.send(`${mUser} has been unmuted!`);
  }, ms(muteTime));
};

module.exports.help = {
  name: "tempmute"
};
