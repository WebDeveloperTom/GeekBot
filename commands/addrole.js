const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //$addrole @user PC Boy
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.reply("You can't do that");
  if (args[0] == "help") {
    message.reply("Usage: $addrole <user> <role name>");
    return;
  }
  let rUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!rUser) return message.reply("Couldnt find user.");

  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  let sRole = message.guild.roles.find(`name`, role);
  if (!sRole) return message.reply("Couldnt find that role.");

  if (rUser.roles.has(sRole.id))
    return message.reply("They already have that role.");
  await rUser.addRole(sRole.id);
  try {
    await rUser.send(`Congrats, you have been given the role ${sRole.name}`);
  } catch (e) {
    message.channel.send(
      `Congrats to ${rUser.id}, they have been given the role ${
        sRole.name
      }. We tried to DM them, but their DMs are locked.`
    );
  }
};

module.exports.help = {
  name: "addrole"
};
