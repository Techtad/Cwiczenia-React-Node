var express = require("express");

var app = express();

app.use(express.json());

const PORT = 3000;

app.post("/", function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, function() {
  console.log("start serwera na porcie " + PORT);
});
