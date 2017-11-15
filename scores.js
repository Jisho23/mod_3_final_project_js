function renderHighScoreForm() {
  $("#highscore-form")[0].innerHTML = `<h3> Enter your Name</h3>
  <form class='' id='enter-name' method='post'>
  <input type='hidden' id='score' name='score' value=${currentCharacter.exp}>
  <input type='text' id='scoreName' name='name'>
  <input type='submit' value='submit' name='submit score'>`;

  $("#highscore-form")[0].addEventListener("submit", function(event) {
    event.preventDefault();
    postScore();
    $("#characterInfo")[0].innerHTML = "";
  });
}

function postScore() {
  let body = {
    name: $("#scoreName").val(),
    score: parseInt($("#score").val())
  };

  let header = {
    "Content-Type": "application/json"
  };
  fetch(localHostHighScore, {
    method: "POST",
    body: JSON.stringify(body),
    headers: header
  })
    .then(res => res.json())
    .then(json => console.log(json));
  location.reload();
}

function getHighScores() {
  fetch(localHostHighScore)
    .then(resp => resp.json())
    .then(function(json) {
      json.forEach(function(score) {
        createScoreOnTable(score);
      });
    });
}

function createScoreOnTable(score) {
  let newScore = `<tr><td>Name: ${score.name}</td><td>Score: ${score.score}</td></tr>`;
  $("#highScoreTable")[0].innerHTML += newScore;
}
