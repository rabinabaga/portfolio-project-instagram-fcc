const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/config/express.config.js");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });


//event connection of a client from the frontend
socketIO.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log("userdata", userData);
    socket.join(userData?._id);
    socket.emit("connected");
    
  });
  
  socket.on("userLikedPhoto", (data) => {
    console.log("data after user liked photo", data);
    socket.in(data.userId).emit("like received", data);
  });




});
const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
