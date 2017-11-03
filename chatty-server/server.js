// server.js

const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid');
const querystring = require('querystring');




let userCount = 0;
// Set the port to 3001
const PORT = 3001;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({
    server
});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === SocketServer.OPEN) {
                client.send(data);
            }
        });
    };
   wss.sendUserCount = function sendUserCount(userCount){
      let outData = { type : "updateUserCount",
                      userCount : userCount
                    };

        outData = JSON.stringify(outData);
        wss.broadcast(outData);
   };

   wss.sendRandomColour = function sendRandomColour(ws){
      let randomColour = getRandomColor();
      let outData = { type : "updateUserColour",
                      colour : randomColour
                    };
      outData = JSON.stringify(outData);
      ws.send(outData);
   };

wss.on('connection', (ws) => {
    console.log('Client connected');

wss.sendUserCount(++userCount);
wss.sendRandomColour(ws);
console.log("connection");
console.log(userCount);
    ws.on('message', (data) => {
        dataJSON = JSON.parse(data);
        dataJSON.key = uuid();


        switch(dataJSON.type){
          case 'postMessage':
            dataJSON.type = 'incomingMessage';
            if(matches = dataJSON.content.match(/^http.*\.jpg|^http.*\.png|^http.*\.gif/)){
                console.log(matches);
                dataJSON.content = `<img src="${dataJSON.content}" alt="" style=" max-width: 60%"/>`;
            }
            break;
          case 'postNotification':
            dataJSON.type ='incomingNotification';
            break;
          default:
            break;
        }


        outData = JSON.stringify(dataJSON);
        wss.broadcast(outData);
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => { console.log('Client disconnected')
wss.sendUserCount(--userCount);
console.log("close");
console.log(userCount);
});

});