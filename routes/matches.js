const express = require("express");
const router = express.Router();
const upload = require("express-fileupload");
const Matches = require("../models/matches");
router.use(upload());
let match1 = new Matches("FC Metz", "LOSC Lille");

//GET END POINTS
router.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.send("some Error Occured");
  }
});
router.get("/time", (req, res) => {
  res.send(match1.getTime());
});
router.get("/score", (req, res) => {
  res.send(match1.getScore());
});
router.get("/players", (req, res) => {
  res.send(match1.getTeamsPlayers());
});
router.get("/iamadmin", (req, res) => {
  res.status(200).render("admin", { admin: true });
});
//POST END POINTS
router.post("/upload", async (req, res) => {
  if (req.files) {
    // console.log(req.files);
    let file = req.files.imgUploader;
    let fileName = file.name;
    // console.log(fileName);
    await file.mv("./static/img/" + fileName, (err) => {
      if (err) {
        res.send("some error" + err);
      } else {
        res.send("file saved");
      }
    });
  }
});
router.post("/iamadmin/settime", async (req, res) => {
  try {
    await match1.setTime(req.body);
    res.status(200).render("admin", { admin: true });
  } catch (error) {
    console.log("Set time: ERROR");
  }
});
router.post("/iamadmin/setscore", async (req, res) => {
  try {
    await match1.setScore(req.body);
    res.status(200).render("admin", { admin: true });
  } catch (error) {
    console.log("setScore: " + error);
  }
});
router.post("/iamadmin/setplayers", async (req, res) => {
  try {
    await match1.setTeamPlayers(req.body.team1Players, req.body.team2Players);
    res.status(200).render("admin", { admin: true });
  } catch (error) {
    console.log("setplayers: " + error);
  }
});

module.exports = router;
