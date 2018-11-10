# Transferbot

Bot that can send Messages from Telegram to Discord (and back)

I won't provide the bot on my own Server. So here is the **Setup Guide**

## Install Nodejs and npm

First install the nodejs and npm packages
```
sudo apt-get install nodejs && sudo apt-get install npm
```

then clone the git repos to your Server
```
git clone https://github.com/corusm/Transferbot.git
```

## Run the bot

Start:
```
npm start
```
Stop:
```
npm stop
```
Test:
```
npm test
```

## Documentation

### Telegram Commands:
Add your username to the System (so it gets your ID):
* **/auth nickname**

Send Message from Telegram to Discord:
* **/send channelName > message**

## Discord Commands:
Send Messages from Discord to Telegram:
with the nickname you just chose
* **!send nickname > message**
