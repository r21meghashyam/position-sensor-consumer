const net = require("net");
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path");
const events = require('events');

const em = new events.EventEmitter();

//Socket
const socketServer = net.createServer((socket) => {
    console.log("App connected");
    socket.on('data', (data) => {
        try{
        let json = JSON.parse(data.toString());
        em.emit("data",json);
        }
        catch(err){

        }
      });
  });
socketServer.listen(5500,()=>{
    console.log("Socket server is running at port 5500")
});

//Web socket
io.on("connection",(socket)=>{
    console.log("Web connected");
    em.on('data', (data)=>{
        socket.emit("data",data)
    });
})

//Web page
app.get("/",(req,res,next)=>{
    res.sendFile(path.resolve("index.html"));
})
app.use(express.static("node_modules/socket.io/client-dist/"));

http.listen(5501,()=>{
    console.log("Webpage: http://localhost:5501")
});