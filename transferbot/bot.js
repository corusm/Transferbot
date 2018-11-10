//Niklas Leinz
//--------------

//Init FileSystem (Node.js)
var fs = require("fs");

//------------------------
//GETTING THE BOT RUNNING
//------------------------
//Init Telegram Bot
const Telegraf = require('telegraf')
const bot = new Telegraf("642526643:AAG_ywVhNVR2G-9vA8Gye9vac5hiYQs0jqI")
bot.start((ctx) => ctx.reply('Welcome')) //Bot first Join

//Init Discord Bot
const Discord = require('discord.js');
const client = new Discord.Client();

//-------------------------------------
//-------------------------------------
//Sourcecode

//Discord.js Listeners
//Syntax: !send nickname yourText || nickname must be listed on users.json
client.on('message', msg => {
    var str = msg.content
    const subText = str.split(" ") //Splits up the messages into the word devided by spaces
    userNameID = readUsers(subText[1]) //Read Users from Users.json (readUsers() Method)
    if (str.includes("!send")) { //Send Messages from Discord to Telegram
        bot.telegram.sendMessage(userNameID, subText[2]) //Send Message to TelegramUser
    }
});

//User verifies himself and his ID will be added to users.json
//Syntax: /init nickname
bot.command('/init', (ctx) => {
    let input = ctx.message["text"]
    const subText = input.split(" ")
    let userID = ctx.from["id"] //get UserID
    addUsers(subText[1], userID)
    console.log(subText[1] + " has been added as new user")
})

//Send messages from Telegram to Discord
//Syntax: /send yourChannelName yourText
bot.command('/send', (ctx) => {
    let input = ctx.message["text"]
    const subText = input.split(" ")
    const channel = client.channels.find('name', subText[1])
    const finalMessage = input.split(">")
    channel.send(finalMessage[1])
})

bot.catch((err) => { //Catches Error
  console.log('Ooops', err)
})

//Adds Users to users.json
function addUsers(newUsername, newID) {
    var fileName = './users.json';
    var file = require(fileName);

    file[newUsername] = newID; //Adds new User to users.json

    fs.writeFile(fileName, JSON.stringify(file), function (err) { //rewrites users.json File
        if (err) return console.log(err);
        console.log(JSON.stringify(file)); //File to String
        console.log('Users updated');
    });
}

function readUsers(usernameOnList) { //searches for Users on users.json
    var contents = fs.readFileSync("./users.json");
    var jsonContent = JSON.parse(contents); //Parse to String
    return jsonContent[usernameOnList]
}

//----------------
//RUNNING THE BOT
bot.startPolling() //executes telegram bot
client.login('NTA5NjUyOTQ0NzQ5MzMwNDQ1.DsXBzg.K94bXavM8t4_WwlX2MCw9nTq_mc'); //loggin into discord bot (Token)