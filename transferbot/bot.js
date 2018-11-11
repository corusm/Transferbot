// Niklas Leinz
//--------------

// Init FileSystem (Node.js)
var fs = require("fs");

//------------------------
// GETTING THE BOT RUNNING
//------------------------
// Init Telegram Bot
const Telegraf = require('telegraf')
const bot = new Telegraf("addYourTokenHere")
bot.start((ctx) => ctx.reply('Welcome')) //Bot first Join

// Init Discord Bot
const Discord = require('discord.js');
const client = new Discord.Client();

console.log("-------------------------")
console.log("------ BOT RUNNING ------")
console.log("-------------------------")

// Winston
let winston = require('winston')
let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'info.log'})
    ]
});

//-------------------------------------
//-------------------------------------
// Sourcecode

// Discord.js Listeners
// Syntax: !send nickname > yourText || nickname must be listed on users.json
client.on('message', msg => {
    let from = msg.author
    var str = msg.content
    const subText = str.split(" ") // Splits up the messages into the word devided by spaces
    userNameID = readUsers(subText[1]) // Read Users from Users.json (readUsers() Method)
    if (str.includes("!send")) { // Send Messages from Discord to Telegram
        const finalMessage = str.split(">")
        bot.telegram.sendMessage(userNameID, from + ": " + finalMessage[1]) //Send Message to TelegramUser
        logger.log("info", "[DISCORD>>TELEGRAM] Message from " + from + " to " + subText[1])
    }
});

// User verifies himself and his ID will be added to users.json
// Syntax: /auth nickname
bot.command('/auth', (ctx) => {
    let input = ctx.message["text"]
    const subText = input.split(" ")
    let userID = ctx.from["id"] // get UserID
    addUsers(subText[1], userID) // logged in addUsers()
})

// Send messages from Telegram to Discord
// Syntax: /send yourChannelName yourText
bot.command('/send', (ctx) => {
    let input = ctx.message["text"]
    const subText = input.split(" ")
    const channel = client.channels.find('name', subText[1])
    const finalMessage = input.split(">")
    channel.send(ctx.from["username"] + ": " + finalMessage[1])
    logger.log("info", "[TELEGRAM>>DISCORD] Meesage from " + ctx.from["username"] + " to " + subText[1])
})

bot.catch((err) => { // Catches Error
  logger.log("error", err)
})

// Adds Users to users.json
function addUsers(newUsername, newID) {
    var fileName = './users.json';
    var file = require(fileName);

    file[newUsername] = newID; // Adds new User to users.json
    fs.writeFile(fileName, JSON.stringify(file), function (err) { // rewrites users.json File
        if (err) return console.log(err);
        logger.log("info", "Users updated: " + newUsername + " (" + newID + ")")
    });
}

function readUsers(usernameOnList) { // searches for Users on users.json
    var contents = fs.readFileSync("./users.json");
    var jsonContent = JSON.parse(contents); // Parse to String
    return jsonContent[usernameOnList]
}

//----------------
//RUNNING THE BOT
bot.startPolling() //executes telegram bot
client.login('addYourTokenHere'); //login into discord bot (Token)
