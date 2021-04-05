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

//SCORE , TIME and MatchStarted
let team1 = "England";
let team2 = "Italy";
let team1Score = 0;
let team2Score = 0;
let team1Players = ["Qavi"];
let team2Players = ["Qavi"];
let seconds = 0;
let minutes = 0;
let matchStarted = 0;
let matchIsRunning = 1;
let secondHalf = 0;
let players1 = "qavi";
let players2 = "Saddar";
let team1Logo = "barcelona";
let team2Logo = "real-madrid";

setInterval(() => {
  if (secondHalf == 1) {
    matchStarted = 0;
  }
  if (matchStarted == 1) {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
  }
}, 1000);

//END POINTS
app.get("/", (req, res) => {
  try {
    res.render("index", {
      isMatch: true,
      team1Players,
      team2Players,
      news: "England vs Italy",
      team1Logo,
      team2Logo,
    });
    r;
  } catch (error) {
    res.send("some Error Occured");
  }
});
app.get("/time", (req, res) => {
  res.send({ minutes, seconds, matchStarted, matchIsRunning, secondHalf });
});
app.get("/score", (req, res) => {
  res.send({ team1, team2, team1Score, team2Score, team1Logo, team2Logo });
});
app.get("/players", (req, res) => {
  res.send({ players1, players2 });
});

app.get("/iamadmin", (req, res) => {
  res.status(200).render("admin", { admin: true });
});

app.post("/iamadmin/setscore", async (req, res) => {
  try {
    team1 = req.body.t1;
    team2 = req.body.t2;
    team1Score = req.body.t1Score;
    team2Score = req.body.t2Score;
    team1Logo = team1.toLowerCase().replace(/ /g, "-");
    team2Logo = team2.toLowerCase().replace(/ /g, "-");
  } catch (error) {
    console.log("set score error");
  }
});
app.post("/iamadmin/settime", async (req, res) => {
  try {
    matchStarted = req.body.matchStarted;
    if (matchStarted == 1) {
      minutes = req.body.minutes;
      seconds = req.body.seconds;
      matchIsRunning = req.body.matchIsRunning;
      secondHalf = req.body.secondHalf;
    }
  } catch (error) {
    console.log("Set time: ERROR");
  }
});

app.post("/iamadmin/setplayers", async (req, res) => {
  try {
    players1 = JSON.parse(req.body.t1);
    players2 = JSON.parse(req.body.t2);
    team1Players = [];
    team2Players = [];
    for (const key in players1) {
      if (Object.hasOwnProperty.call(players1, key)) {
        team1Players.push(players1[key]);
      }
    }
    for (const key in players2) {
      if (Object.hasOwnProperty.call(players2, key)) {
        team2Players.push(players2[key]);
      }
    }
  } catch (error) {
    console.log("setting players error");
  }
});
app.listen(port, () => {});
