const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserRoutes");
const app = express();
const course = require("./routes/CourseRoutes");
const modules = require("./routes/ModulesRoutes");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", user);
app.use("/api/courses", course);
app.use("/api/modules", modules);

module.exports = app;
