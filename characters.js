let currentCharacter = {};
let initialCharacter = {};

const Character = (() => {
  const characters = [];
  return class Character {
    constructor(json) {
      this.id = json.id;
      this.name = json.name;
      this.hp = json.hp;
      this.pp = json.pp;
      this.attack = json.attack;
      this.abilities = json.abilities;
      this.exp = 0;
      this.image = json.image;
      characters.push(this);
    }
    static all() {
      return characters;
    }
  };
})();

function populateCharacterSelect() {
  fetch(localHostCharacters)
    .then(response => response.json())
    .then(function(json) {
      json.forEach(function(character) {
        let newOption = `<option value="${character.id}">${character.name}</option>>`;
        $("#characterDropdown")[0].innerHTML += newOption;
        let newCharacter = new Character(character);
      });
    });
}

function displayCharacterInfo(characterChoice) {
  $("#characterInfo")[0].innerHTML = characterTable;
  $(
    "#characterImage"
  )[0].innerHTML = `<img src='${characterChoice.image}' id='characterImage' height="100"></img>`;
  $("#name")[0].innerHTML = `Character Class: ${characterChoice.name}`;
  $("#hp")[0].innerHTML = `Max HP: ${characterChoice.hp} `;
  $("#PP")[0].innerHTML = `Max PP: ${characterChoice.pp}`;
  $("#attack")[0].innerHTML = `Attack Power: ${characterChoice.attack}`;
  $("#exp")[0].innerHTML = `Exp: ${characterChoice.exp}`;
  $(
    "#characterInfo"
  )[0].innerHTML += `<h4>Abilities</h4><ul id='abilities'></ul>`;
  let abilities = characterChoice.abilities;
  if (abilities.length > 0) {
    abilities.forEach(function(ability) {
      $("#abilities")[0].innerHTML += `<li>${ability.name}</li>`;
    });
  } else {
    $("#abilities")[0].innerHTML = `<li> None ;_; </li>`;
  }
}

function isPlayerDead() {
  if (currentCharacter.hp <= 0) {
    return true;
  } else {
    return false;
  }
}