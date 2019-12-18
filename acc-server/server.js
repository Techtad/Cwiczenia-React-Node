const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1337 }, () => {
  console.log("ws startuje na porcie 1337");
});

//reakcja na podłączenie klienta i odesłanie komunikatu

var LastController = 0;

wss.on("connection", (ws, req) => {
  //adres ip klienta

  const clientip = req.connection.remoteAddress;

  //reakcja na komunikat od klienta

  ws.on("message", message => {
    let data = JSON.parse(message);
    if (data.action == "registerController") {
      ws.send(JSON.stringify({ ControllerId: LastController /* ++ */ }));
    } else if (data.action == "accdata") {
      sendToAllButMe(message, ws);
    }
    console.log("serwer odbiera z klienta " + clientip + ": ", message);
  });
});

sendToAllButMe = (data, ws) => {
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
