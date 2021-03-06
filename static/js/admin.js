let btnPlayers = document.getElementById("btnPlayers");
btnPlayers.addEventListener("click", setPlayers);
let btnTime = document.getElementById("btnTime");
btnTime.addEventListener("click", updateTime);
let btnTeams = document.getElementById("btnTeams");
btnTeams.addEventListener("click", updateTeams);
let btnImage = document.getElementById("btnImage");
// btnImage.addEventListener("click", uploadImage);

//TEAMS NAMES AND SCORE
let team1 = document.getElementById("team1");
let team2 = document.getElementById("team2");
let team1Score = document.getElementById("team1Score");
let team2Score = document.getElementById("team2Score");
//TIME AND KICKOFF
let min = document.getElementById("minutes");
let sec = document.getElementById("seconds");
let match = document.getElementById("matchStarted");
let secHalf = document.getElementById("secondHalf");
//TEAMS PLAYERS
let team1P = document.getElementById("team1Players");
let team2P = document.getElementById("team2Players");
async function uploadImage(e) {
  e.preventDefault();
}
async function updateTeams(e) {
  e.preventDefault();
  let t1 = team1.value;
  let t2 = team2.value;
  let t1Score = team1Score.value;
  let t2Score = team2Score.value;
  let teams = { t1, t2, t1Score, t2Score };
  await updateData("/iamadmin/setscore", teams);
}
async function updateTime(e) {
  e.preventDefault();
  let minutes = min.value;
  let seconds = sec.value;
  let matchStarted = match.value;
  // let matchIsRunning = matchRun.value;
  let secondHalf = secHalf.value;
  let time = { minutes, seconds, matchStarted, secondHalf };
  await updateData("/iamadmin/settime", time);
}
async function setPlayers(e) {
  e.preventDefault();
  let team1 = team1P.value;
  let team2 = team2P.value;
  let teams = { team1Players: team1, team2Players: team2 };
  await updateData("/iamadmin/setplayers", teams);
}
async function updateData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset = UTF-8",
    },
  });
  console.log(await response.json());
}
getScore();
getTime();
getPlayers();
async function getScore() {
  let score = await getData("/score");
  team1.value = score.team1Name;
  team2.value = score.team2Name;
  team1Score.value = score.team1Score;
  team2Score.value = score.team2Score;
  console.log(score);
}
async function getTime() {
  let time = await getData("/time");
  min.value = time.minutes;
  sec.value = time.seconds;
  match.value = time.matchStarted;
  console.log(time);
}
async function getPlayers() {
  let teams = await getData("/players");
  team1P.value = JSON.stringify(teams.team1Players);
  team2P.value = JSON.stringify(teams.team2Players);
  console.log(teams);
}
async function getData(url) {
  const response = await fetch(url);
  return await response.json();
  // fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-type": "application/json; charset = UTF-8",
  //   },
  // })
  //   .then((response) => response.text())
  //   .then((data) => {
  //     info = JSON.parse(data);
  //     // updateTime(time.minutes, time.seconds);
  //   });
  // return info;
}
