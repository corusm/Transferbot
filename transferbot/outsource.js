// Init FileSystem (Node.js)
var fs = require("fs");
// Init winston logger (logger.js)
var winston = require("./logger.js");
var logger = winston.logger;

var methods = {
  getToken: function(token) { // searches for token on tokens.json
      var contents = fs.readFileSync("./tokens.json");
      var jsonContent = JSON.parse(contents); // Parse to String
      return jsonContent[token]
  },
  addUsers: function(newUsername, newID, num) {
      var file1 = './users.json';
      var file2 = './discorduser.json'
      var fin;

      if (num === 1) {
        fin = file1;
      }
      if (num === 2) {
        fin = file2;
      }

      var file = require(fin)

      file[newUsername] = newID; // Adds new User to users.json
      fs.writeFile(fin, JSON.stringify(file), function (err) { // rewrites users.json File
          if (err) return console.log(err);
          logger.log("info", "Users updated: " + newUsername)
      });
  },
  getUsers: function(usernameOnList, num) { // searches for Users on users.json
    var file1 = './users.json';
    var file2 = './discorduser.json'
    var fin;

    if (num === 1) {
      fin = file1;
    }
    if (num === 2) {
      fin = file2;
    }
    var contents = fs.readFileSync(fin);
    var jsonContent = JSON.parse(contents); // Parse to String
    return jsonContent[usernameOnList]
  },
  listUsers: function(ctx, service) { // TODO: List users by File
    var contents = fs.readFileSync("./users.json");
    var jsonContent = JSON.parse(contents);
    var users = Object.entries(jsonContent);
    if (users.length === 0) {
      if (service === 0) {
        ctx.channel.send("The list is emty");
      } else if (service === 1) {
        ctx.reply("The list is emty");
      }
    }
    for (var i = 0; i < users.length; i++) {
      if (service === 0) {
        ctx.channel.send(users[i] + ";");
      }
      if (service === 1) {
        var out = users[i].toString();
        ctx.reply(out);
      }
    }
  }
}

module.exports = methods;
