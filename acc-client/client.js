var boxX = 0;
var boxY = 0;
var speed = 50;
var velX = 0;
var velY = 0;

addEventListener("DOMContentLoaded", () => {
  var box = document.getElementById("box");
  var ws = new WebSocket("ws://192.168.1.77:1337");
  ws.onmessage = ev => {
    let { x, y, z } = JSON.parse(ev.data);
    console.log(x, y, z);
    boxX += x * speed;
    boxY += y * speed;
    console.log(boxX, boxY);
    box.style.left = `${boxX}px`;
    box.style.top = `${boxY}px`;
  };
});
