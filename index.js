var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9945 });

var clients = []

wss.on('connection', function connection(ws) {
  clients.push(ws)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('connect');
});

app.use(bodyParser.text());

app.post('/launch',function(req,res){
  console.log(req.body)
  clients.forEach(function(client) {
     client.send(req.body);
   });
  res.send("ay")
});
app.listen(9944,function(){
  console.log("Started on PORT 9944");
})
