var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.json());

const PORT = 3000;

var Users = [];

function usernameTaken(username) {
  for (var u of Users) {
    if (u.username == username) return true;
  }
  return false;
}

app.post("/", function(req, res) {
  console.log(req.body);
  if (req.body.action == "register") {
    if (!req.body.username) {
      res.send({ success: false, reason: "Username cannot be empty." });
    } else if (!req.body.password) {
      res.send({ success: false, reason: "Password cannot be empty." });
    } else if (usernameTaken(req.body.username)) {
      res.send({ success: false, reason: "Username already taken." });
    } else {
      Users.push({ username: req.body.username, password: req.body.password });
      fs.writeFileSync("./users.json", JSON.stringify({ users: Users }));
      res.send({ success: true });
    }
  } else if (req.body.action == "delete") {
    let iToDelete = -1;
    Users.map((u, i) => {
      if (u.username == req.body.username) iToDelete = i;
    });
    if (iToDelete != -1) Users.splice(iToDelete, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users: Users }));
    res.send({ updatedUsers: Users });
  } else {
    res.send({ success: false, reason: "Invalid request." });
  }
});

app.get("/", function(req, res) {
  res.send(Users);
});

app.listen(PORT, function() {
  if (fs.existsSync("./users.json")) {
    let data = fs.readFileSync("./users.json");
    if (JSON.parse(data).users) {
      Users = JSON.parse(data).users;
    }
  }
  console.log("start serwera na porcie " + PORT);
});
