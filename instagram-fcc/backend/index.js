const config = require("./config/config.js");
const app = require("./src/config/express.config.js");
console.log(config);

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });

//event connection of a client from the frontend
socketIO.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData?._id + "connected successfully");
    socket.join(userData?._id);
  });

  socket.on("userLikedPhoto", (data) => {
    console.log("data after user liked photo", data);
    console.log(data.userDocId._id);
    socketIO.to(data?.userDocId?._id).emit("likeReceived", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
