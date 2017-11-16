const renderHighScoreForm = function() {
  $("#highscore-form")[0].innerHTML = `
  <form class='form' id='enter-name' method='post'>
  <input type='hidden' id='score' name='score' value=${currentCharacter.exp}>
  <div class="control has-icons-left">
  <div class='label'>Please input your name</div>
  <input class= 'input is-success' placeholder='your name' type='text' id='scoreName' name='name'>
    </div>
  <input class='button is-sucess'type='submit' value='submit' name='submit score'>`;

  $("#highscore-form")[0].addEventListener("submit", function(event) {
    event.preventDefault();
    postScore();
    $("#characterInfo")[0].innerHTML = "";
  });
};

const postScore = function() {
  let body = {
    name: $("#scoreName").val(),
    score: parseInt($("#score").val())
  };

  let header = {
    "Content-Type": "application/json"
  };
  fetch(herokuHighScores, {
    method: "POST",
    body: JSON.stringify(body),
    headers: header
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => location.reload());
};

const getHighScores = function() {
  fetch(herokuHighScores)
    .then(resp => resp.json())
    .then(function(json) {
      json.forEach(function(score) {
        createScoreOnTable(score);
      });
    });
};

const createScoreOnTable = function(score) {
  let newScore = `<tr class='tr'><td class='td'>${score.name} - ${score.score} points</td></tr>`;
  $("#highScoreTable")[0].innerHTML += newScore;
};

const highScore = function() {
  clearScreen();
  renderHighScoreForm();
};
