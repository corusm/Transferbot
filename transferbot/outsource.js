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
  addUsers: function(newUsername, newID) {
      var fileName = './users.json';
      var file = require(fileName);

      file[newUsername] = newID; // Adds new User to users.json
      fs.writeFile(fileName, JSON.stringify(file), function (err) { // rewrites users.json File
          if (err) return console.log(err);
          logger.log("info", "Users updated: " + newUsername + " (" + newID + ")")
      });
  },
  getUsers: function(usernameOnList) { // searches for Users on users.json
      var contents = fs.readFileSync("./users.json");
      var jsonContent = JSON.parse(contents); // Parse to String
      return jsonContent[usernameOnList]
  },
  listUsers: function(ctx, service) {
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
