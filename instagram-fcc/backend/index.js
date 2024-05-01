const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/config/express.config.js");
const http = require('http').Server(app);
const socketIO = require('socket.io')(http,{cors:{origin: "*   " }});



//event connection of a client from the frontend
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', data);
  });
// io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
}
);
const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
