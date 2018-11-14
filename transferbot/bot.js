// Niklas Leinz
//--------------

// Init winston logger (logger.js)
var penis = require("./logger.js");
var logger = penis.logger;

var methods = require("./outsource.js");
//------------------------
// GETTING THE BOT RUNNING
//------------------------
// Init Telegram Bot
const Telegraf = require('telegraf');
const bot = new Telegraf(methods.getToken('telegram'));
bot.startPolling(); //executes telegram bot
bot.start((ctx) => ctx.reply('Welcome')); //Bot first Join

// Init Discord Bot
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(methods.getToken("discord")); //login into discord bot (Token)

//-------------------------------------
// Bot started
console.log("-------------------------");
logger.log("info", "BOT RUNNING");
console.log("-------------------------");

// Sourcecode

// Discord.js Listeners
// Syntax: !send nickname > yourText || nickname must be listed on users.json
// Syntax: !listusers || lists all users registered to users.json
// Syntax: !help || Shows all functions
client.on('message', msg => {
  let str = msg.content;
  const subText = str.split(" "); // Splits up the messages into the word devided by spaces
   if (subText[0] === '!send') { // Send Messages from Discord to Telegram
     userNameID = methods.getUsers(subText[1], 1); // Read Users from Users.json (methods.getUsers() Method)
     const finalMessage = str.split("-");
     bot.telegram.sendMessage(userNameID, msg.author.username + ": " + finalMessage[1]); //Send Message to TelegramUser
     logger.log("info", "[DISCORD>>TELEGRAM] Message from " + msg.author.username + " to " + subText[1]);
  }
  if (msg.content === '!listusers') { // Send Messages from Discord to Telegram
    methods.listUsers(msg, 0);
    logger.log("info", "Discord users listed (users.json) by " + msg.author.username);
  }
  if (msg.content === '!help') {
    msg.channel.send("Commands: \n [!]send {nickname} > {yourText} -- Send text to user from Telegram \n [!]listusers -- Lists all Telegram users registered to the bot");
    logger.log("info", "Help request by " + msg.author.username);
  }
  if (msg.content === '!auth') {
    methods.addUsers(msg.author.username, msg.author.id, 2)
    msg.channel.send(msg.author.username + " has been registered!");
    logger.log("info", msg.author.username + " has been registered!");
  }
});

bot.help((ctx) => {
  ctx.reply("Commands: \n /auth -- Authenticate your Telegram ID \n /authgroup {nickname} \n /send {channelName} > {message} -- Message to discord channel \n /listusers -- List authenticated users");
  logger.log("info", "Help request by " + ctx.from["username"]);
});

// User verifies himself and his ID will be added to users.json
// Syntax: /auth
bot.command('/auth', (ctx) => {
    let userID = ctx.from["id"]; // get UserID
    methods.addUsers(ctx.from["username"], userID, 1); // logged in addUsers()
    ctx.reply("User " + ctx.from["username"] + " has been added!");
})

// Syntax: /authgroup {groupname}
bot.command('/authgroup', (ctx) => {
    let userID = ctx.chat["id"]; // get UserID
    let input = ctx.message["text"];
    let subText = input.split(" ");
    methods.addUsers(subText[1], userID, 1); // logged in addUsers()
    ctx.reply("The group " + ctx.chat["title"] + " has been added as " + subText[1] + "!");
    logger.log("info", "The group " + ctx.chat["title"] + " has been added as " + subText[1] + "!")
})

// Send messages from Telegram to Discord
// Syntax: /send yourChannelName yourText
bot.command('/send', (ctx) => {
    let input = ctx.message["text"];
    const subText = input.split(" ");
    const channel = client.channels.find('name', subText[1]);
    const finalMessage = input.split("-");
    if (channel === null) {
      client.users.get(methods.getUsers(subText[1], 2)).send(ctx.from["username"] + ": " +finalMessage[1]);
      logger.log("info", "DM Message send to: " + subText[1]);
    }
    channel.send(ctx.from["username"] + ": " + finalMessage[1]);
    logger.log("info", "[TELEGRAM>>DISCORD] Meesage from " + ctx.from["username"] + " to " + subText[1]);
})

bot.command('/listusers', (ctx) => {
    methods.listUsers(ctx, 1);
    logger.log("info", "Telegram users listed (users.json)");
})

bot.catch((err) => { // Catches Error
  logger.log("error", err);
})
