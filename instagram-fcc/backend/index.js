const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/config/express.config.js");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });

//event, connection of a client from the frontend
socketIO.on("connection", (socket) => {
  console.log("a user is connected");
socketIO.emit("chat", "test message");
   socket.on("disconnect", () => {
     console.log("user disconnected");
   });
});

const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
