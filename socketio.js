const http     = require("http");
const express  = require("express");
const path     = require("path");
const {Server} = require("socket.io");


const port    = 9000;


const app    = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing. Restrict this in production.
    methods: ["GET", "POST"],
  },
});



//socket io handleling
io.on('connection', (socket) => { 
  socket.on("User_message",(message)=>{
    console.log(message);
    socket.emit("Received_message",message);
  })


});





app.use(express.static (path.resolve("./public")));

app.get("/" , (req ,res)=>{
  return sendFile('../public/index.js');
});




server.listen(port , () => {console.log(`sever started at port ${port} !`)})