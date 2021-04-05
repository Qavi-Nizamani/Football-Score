console.log("index");
updateScore();

let timer = document.getElementById("timer");
let score = document.getElementById("score");
setInterval(() => {
  fetch("/time", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset = UTF-8",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      const time = JSON.parse(data);
      updateTime(time.minutes, time.seconds);
    });
}, 1000);
setInterval(async () => {
  await updateScore();
}, 10000);

async function updateScore() {
  let team1Logo = document.getElementById("team1Logo");
  let team2Logo = document.getElementById("team2Logo");
  const response = await fetch("/score");
  let team = await response.json();
  score.innerHTML =
    team.team1 +
    " " +
    team.team1Score +
    " - " +
    team.team2Score +
    " " +
    team.team2;
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
// function updateTime(minutes, seconds) {
//   if (seconds == 60) {
//     minutes++;
//     seconds = 0;
//   }
//   if (minutes < 10) {
//     if (seconds < 10) {
//       timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
//     } else {
//       timer.innerHTML = "0" + minutes + ":" + seconds;
//     }
//   } else {
//     if (seconds < 10) {
//       timer.innerHTML = minutes + ":" + "0" + seconds;
//     } else {
//       timer.innerHTML = minutes + ":" + seconds;
//     }
//   }
//   seconds++;
// }
