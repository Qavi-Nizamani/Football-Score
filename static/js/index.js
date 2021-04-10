console.log("index");
updateScore();

let timer = document.getElementById("timer");
let score = document.getElementById("score");
setInterval(async () => {
  const response = await fetch("/time");
  const time = await response.json();
  updateTime(time.minutes, time.seconds);
}, 1000);
setInterval(async () => {
  await updateScore();
}, 10000);
(async function getTeamPlayers() {
  console.log("I am team Players Wrapper Function");
  const t1Players = document.getElementById("team1Players");
  const t2Players = document.getElementById("team2Players");
  const response = await fetch("/players");
  const teams = await response.json();
  let players1 = "";
  let players2 = "";
  for (const key in teams.team1Players) {
    if (Object.hasOwnProperty.call(teams.team1Players, key)) {
      players1 += `<li>${teams.team1Players[key]}</li>`;
    }
  }
  for (const key in teams.team2Players) {
    if (Object.hasOwnProperty.call(teams.team2Players, key)) {
      players2 += `<li>${teams.team2Players[key]}</li>`;
    }
  }
  t1Players.innerHTML = players1;
  t2Players.innerHTML = players2;
})();
async function updateScore() {
  let team1Logo = document.getElementById("team1Logo");
  let team2Logo = document.getElementById("team2Logo");
  const response = await fetch("/score");
  let team = await response.json();
  score.innerHTML =
    team.team1Name +
    " " +
    team.team1Score +
    " - " +
    team.team2Score +
    " " +
    team.team2Name;
  team1Logo.src = "../static/img/" + team.team1Logo + ".svg";
  team2Logo.src = "../static/img/" + team.team2Logo + ".svg";
}
function updateTime(minutes, seconds) {
  if (minutes < 10) {
    if (seconds < 10) {
      timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
    } else {
      timer.innerHTML = "0" + minutes + ":" + seconds;
    }
  } else {
    if (seconds < 10) {
      timer.innerHTML = minutes + ":" + "0" + seconds;
    } else {
      timer.innerHTML = minutes + ":" + seconds;
    }
  }
}
