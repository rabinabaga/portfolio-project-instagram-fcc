const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
require("./mongodb.config");


const routes = require("../routes");
app.use("/api/v1", routes);
module.exports = app;
