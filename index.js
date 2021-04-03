const express = require("express");
const app = express();
const path = require("path");

//EXPRESS SPECIFIC
app.use("/static", express.static("static"));
//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//SCORE AND TIME
let seconds = 0;
let minutes = 0;
setInterval(() => {
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
  seconds++;
}, 1000);

//END POINTS
app.get("/", (req, res) => {
  res.render("index", { minutes, seconds });
});
app.get("/score", (req, res) => {
  res.send({ minutes, seconds });
});

app.listen(80, () => {});
