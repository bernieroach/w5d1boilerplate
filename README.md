
WK5 LHL Project - Chatty App
=====================

A simple app that allows multiple client to send messages to each other via a websocket server. Each client/user is assigned a random colour upon connecting to the websocket server.

There is a chatbar where the user can enter/change their name/alias as well as type a message and send it by typing ENTER.

The user can also send image links which will display as images

A lightweight webpack dev server is setup to update React and a small WebSockets server is set up to handle communiation between it and connected clients.

The number of online users is displayed as well as notification messages when a user changes their name


### Usage

The Webpack server is setup and then listens to localhost 3000. This is hardcoded.

The WebSocket server is setup and then listens to localhost 3001. This is also hardcoded




### Dependencies

For Webpack Server:
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


For WebSocket Server:

* Express 4.16.2
* UUID: 3.1.0
* WS 3.2.0
=======

