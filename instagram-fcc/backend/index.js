const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/config/express.config.js");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });
const users = {};

//event connection of a client from the frontend
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
socket.on("loggedIn",(data)=>{
  console.log("data in loggedin ",data);
})

  socket.on("userLikedPhoto", (data) => {
    users[data.userId] = socket.id;
    users[data.photoUserId] = data.socketID
    console.log("userLikedPhoto",data);
    console.log(users);
    socket.to(users[data.photoUserId]).emit("notification", "your photo has been liked");
  });
  // io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});
const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
