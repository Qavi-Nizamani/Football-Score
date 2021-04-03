console.log("index");
setInterval(() => {
  fetch("/score", {
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

function updateTime(minutes, seconds) {
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
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
  seconds++;
}
