const express = require("express");
const app = express();
require("./mongodb.config");

const routes = require("../routes");
app.use("/", routes);
module.exports = app;
