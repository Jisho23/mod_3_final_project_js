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

// initialize document on load

document.addEventListener("DOMContentLoaded", function() {
  populateCharacterSelect();
  document
    .getElementById("characterSelectForm")
    .addEventListener("submit", function(event) {
      startGame(event);
    });
});

function startGame(event) {
  event.preventDefault();
  document.getElementById("characterInfo").innerHTML = `<table>
    <tr>
    <td id='name'></td>
    <td id='hp'></td>
    <td id='PP'></td>
    <td id='attack'></td>
    </tr>
  </table>`;
  let characterId = parseInt(
    document.getElementById("characterDropdown").value
  );
  let characterChoice = characters.find(function(character) {
    return character.id === characterId;
  });
  document.getElementById(
    "name"
  ).innerHTML = `Character Class: ${characterChoice.name}`;
  document.getElementById("hp").innerHTML = `Max HP: ${characterChoice.hp} `;
  document.getElementById("PP").innerHTML = `Max PP: ${characterChoice.pp}`;
  document.getElementById(
    "attack"
  ).innerHTML = `Attack Power: ${characterChoice.attack}`;
  document.getElementById("characterSelectForm").innerHTML = "";
}
// character info

const characters = [];
class Character {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.hp = json.hp;
    this.pp = json.pp;
    this.attack = json.attack;
    characters.push(this);
  }
}

function populateCharacterSelect() {
  fetch(localHostCharacters)
    .then(response => response.json())
    .then(function(json) {
      json.forEach(function(character) {
        let newOption = `<<option value="${character.id}">${character.name}</option>>`;
        document.getElementById("characterDropdown").innerHTML += newOption;
        let newCharacter = new Character(character);
      });
    });
}
