const express = require("express");
const app = express();
const path = require("path");
require("dotenv/config");
port = process.env.PORT || 8000;
//EXPRESS SPECIFIC
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("static"));
//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//SCORE AND TIME
let team1 = "England 0";
let team2 = "0 Italy";
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
app.get("/time", (req, res) => {
  res.send({ minutes, seconds });
});
app.get("/score", (req, res) => {
  res.send({ team1, team2 });
});
app.get("/iamadmin", (req, res) => {
  res.status(200).render("index", { admin: true });
});

app.post("/iamadmin", (req, res) => {
  console.log(req.body.team1);
  team1 = req.body.team1;
  team2 = req.body.team2;
  res.status(200).render("index", { admin: true });
});

app.listen(port, () => {});
