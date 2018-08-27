const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Nice try guy!");

  if (args[0] == "help") {
    message.reply("Usage: $kick <user> <reason>");
    return;
  }

  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kUser) return message.channel.send("Couldn't find user.");
  let kReason = args.join(" ").slice(22); //slice(22) gets rid of User ID
  if (kUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("They're my boss...");
  let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField(
      "Kicked By",
      `<@${message.author.id}> with ID ${message.author.id}`
    )
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if (!kickChannel)
    return message.channel.send("Couldn't find incidents channel.");
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
};

module.exports.help = {
  name: "kick"
};
