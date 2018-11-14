# Transferbot

This bot that can send Messages from Telegram to Discord (and back)

# Documentation

## Install / Self Hosting

First install the nodejs and npm packages
```
sudo apt-get install nodejs && sudo apt-get install npm
```

then clone the git repos to your Server
```
git clone https://github.com/corusm/Transferbot.git
```


## Add Tokens
Add your discord and telegram bot token to the **tokens.json** file
```
{
  "discord": "placeYourToken",
  "telegram": "placeYourToken"
}
```

## Run the bot
Navigate to the directory where you have installed the bot (where the **node_modules** folder is located) and run these commands:

1. Start Bot: `npm start`
2. Stop Bot: `npm stop`
3. Test Bot: `npm test`

## Log
All the logs that you see in the shell also get logged in the **info.log** file.

# Commands

## Telegram Commands:
Add your username to the System (so it gets your ID):
* **/auth**

Add your group to the System:
* **/authgroup**

List Telegram users connected to the System:
* **/listusers**

Send Message from Telegram to Discord:
* **/send "channelName" > "message"**

## Discord Commands:
Send Messages from Discord to Telegram:
with the nickname you just chose
* **!send "nickname" > "message"**

List Telegram users connected to the System:
* **!listusers**
