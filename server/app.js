const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/UserRoutes");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", user);

module.exports = app;
