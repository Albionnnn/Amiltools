/*
    Server NodeJS
*/

console.log('------------');
console.log('Create Server...');
console.log('------------');

//Create
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev')
const http = require('http')
const expressServer = new express()
const cors = require('cors')
const socketIo = require("socket.io");

expressServer.use(morgan)
expressServer.use(bodyParser.json({type: '*/*'}))
expressServer.use(bodyParser.urlencoded({ extended: true }))
expressServer.use(cors())

//Composant Configuration
const config = require('./config/config')
const router = require('./router')

//Listen
const server = http.createServer(expressServer)
server.listen(config.port, () => {
    console.log('------------');
    console.log('Server Start listen on  : ', config.port);
    console.log('Version : ', config.version)
    console.log('------------');
    router(expressServer)
})



//socket
const io = socketIo(server);

io.on('connection', socket => {
  console.log('New client connected')

  socket.on("cardAdd", id => {
    console.log("Add card")
    io.sockets.emit("cardsChange");
  })
  socket.on("cardDelete", id => {
    console.log("delete card" + id)
    io.sockets.emit("cardDelete", id);
  })
  socket.on("cardMoved", id => {
    console.log("moved card" + id)
    io.sockets.emit("cardChange", id);
  })
  socket.on("cardModif", id => {
    console.log("modified card" + id)
    io.sockets.emit("cardChange", id);
  })
  socket.on("laneMoved", id => {
    console.log("laneMoved")
    io.sockets.emit("lanesChange");
  })
  socket.on("laneModif", id => {
    console.log("laneModif")
    io.sockets.emit("lanesChange");
  })
  socket.on("disconnect", () => console.log("Client disconnected"));
});
