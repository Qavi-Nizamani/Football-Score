class Matches {
  constructor(team1Name, team2Name) {
    //SCORE , TIME and MatchStarted
    this.team1Name = team1Name;
    this.team2Name = team2Name;
    this.team1Players = {};
    this.team2Players = {};
    this.team1Score = 0;
    this.team2Score = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.matchStarted = 0;
    this.secondHalf = 0;
    this.updateTime();
  }

  updateTime() {
    setInterval(() => {
      if (this.matchStarted == 1) {
        this.seconds++;
        if (this.seconds == 60) {
          this.minutes++;
          this.seconds = 0;
        }
      }
    }, 1000);
  }
  getTeamsName() {
    return { team1Name: this.team1Name, team2Name: this.team2Name };
  }
  getScore() {
    return {
      team1Name: this.team1Name,
      team2Name: this.team2Name,
      team1Score: this.team1Score,
      team2Score: this.team2Score,
      team1Logo: this.team1Name.toLowerCase().replace(/ /g, "-"),
      team2Logo: this.team2Name.toLowerCase().replace(/ /g, "-"),
    };
  }
  getTeamsPlayers() {
    return { team1Players: this.team1Players, team2Players: this.team2Players };
  }
  getTime() {
    return {
      minutes: this.minutes,
      seconds: this.seconds,
      matchStarted: this.matchStarted,
      secondHalf: this.secondHalf,
    };
  }
  setTime(_time) {
    console.log("set time called");
    this.minutes = _time.minutes;
    this.seconds = _time.seconds;
    this.matchStarted = _time.matchStarted;
    this.matchEnd = _time.secondHalf;
  }

  setScore(teamsNameAndScore) {
    console.log("set score called");
    this.team1Name = teamsNameAndScore.t1;
    this.team2Name = teamsNameAndScore.t2;
    this.team1Score = teamsNameAndScore.t1Score;
    this.team2Score = teamsNameAndScore.t2Score;
  }

  setTeamPlayers(t1Players, t2Players) {
    try {
      this.team1Players = JSON.parse(t1Players);
      this.team2Players = JSON.parse(t2Players);
    } catch (error) {
      console.log("setting players error");
    }
  }
}

module.exports = Matches;
