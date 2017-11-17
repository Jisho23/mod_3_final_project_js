const localHostCharacters = "http://localhost:3000/api/v1/characters";
const localHostMonsters = "http://localhost:3000/api/v1/monsters";
const localHostHighScore = "http://localhost:3000/api/v1/highscores";
const herokuMonsters =
  "https://cryptic-inlet-42078.herokuapp.com/api/v1/monsters";
const herokuCharacters =
  "https://cryptic-inlet-42078.herokuapp.com/api/v1/characters";
const herokuHighScores =
  "https://cryptic-inlet-42078.herokuapp.com/api/v1/highscores";
const test = "";
let monstersFaced = 0;
const boss = {
  name: "Actual John Cena",
  hp: 60,
  attack: 8,
  exp: 100,
  image:
    "http://shop.wwe.com/on/demandware.static/-/Sites/default/dw32c23792/images/slot/landing/superstar-landing/Superstar-Category_Superstar_562x408_johncena-2017.png"
};

const characterTable = `<h3>Character Info:</h3><div id='characterImage'></div><table class='table is-narrow is-bordered' id='characterDisplay'>
<td>
  <table id='characterStatTable'>
  <tr>
    <td id='name'></td>
  </tr>
  <tr>
    <td id='hp'></td>
  </tr>
  <tr>
    <td id='PP'></td>
  </tr>
  <tr>
    <td id='attack'></td>
    </tr>
  <tr>
    <td id='exp'></td>
  </table>
</table>`;

let textBox = "";

const toggler = function() {
  if ($("#battleColumn")[0].data === "toggled") {
    $("#battleColumn")[0].data = "";
  } else {
    $("#battleColumn")[0].data = "toggled";
  }
};

const audio = {
  battleTheme: new Audio("05.mp3"),
  bossTheme: new Audio("24.mp3"),
  gameOver: new Audio("gameOver.mp3"),
  hit: new Audio("hit.mp3"),
  pauseAllAudio: function() {
    $("#startPauseAudio")[0].data = "";
    this.battleTheme.pause();
    this.bossTheme.pause();
    this.gameOver.pause();
  }
};
