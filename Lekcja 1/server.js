var http = require("http");

var data = require("./data/data.json");

var server = http.createServer(function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // header konieczny aby korzystać z lokalnego adresu dla strony html
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(JSON.stringify(data, null, 4));
});
server.listen(3000, function() {
  console.log("zadanie 15 - serwer działa na porcie 3000");
});
