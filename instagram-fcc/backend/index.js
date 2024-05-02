const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/config/express.config.js");

const http = require("http");
const server = http.createServer(app);
const server_new = server.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
