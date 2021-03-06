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
      this.level = 1;
      this.image = json.image;
      characters.push(this);
    }
    static all() {
      return characters;
    }
  };
})();

const populateCharacterSelect = function() {
  fetch(herokuCharacters)
    .then(response => response.json())
    .then(function(json) {
      json.forEach(function(character) {
        let newOption = `<option value="${character.id}">${character.name}</option>>`;
        $("#characterDropdown")[0].innerHTML += newOption;
        let newCharacter = new Character(character);
      });
    });
};

const displayCharacterInfo = function(characterChoice) {
  $("#characterInfo")[0].innerHTML = characterTable;
  $(
    "#characterImage"
  )[0].innerHTML = `<img src='${characterChoice.image}' id='characterImage' class='img'></img>`;
  $("#name")[0].innerHTML = `Character Class: ${characterChoice.name}`;
  $("#hp")[0].innerHTML = `HP: ${characterChoice.hp} `;
  $("#PP")[0].innerHTML = `PP: ${characterChoice.pp}`;
  $("#attack")[0].innerHTML = `Attack Power: ${characterChoice.attack}`;
  $("#exp")[0].innerHTML = `Exp: ${characterChoice.exp}`;
  $("#abilityArea")[0].innerHTML = "";
  $(
    "#abilityArea"
  )[0].innerHTML += `<h4 has-text-weight-semibold>Abilities</h4><ul id='abilities'></ul>`;
  let abilities = characterChoice.abilities;
  if (abilities.length > 0) {
    abilities.forEach(function(ability) {
      $(
        "#abilities"
      )[0].innerHTML += `<div class='box has-text-white'><li>${ability.name}: ${ability.damage} damage, Cost: ${ability.cost}</li></div>`;
    });
  } else {
    $("#abilities")[0].innerHTML = `<li> None</li>`;
  }
};

const isPlayerDead = function() {
  if (currentCharacter.hp <= 0) {
    audio.pauseAllAudio();
    audio.gameOver.play();
    return true;
  } else {
    return false;
  }
};

const levelUp = function() {
  initialCharacter.attack += 1;
  initialCharacter.hp += 3;
  initialCharacter.level += 1;
  initialCharacter.pp += 1;
  initialCharacter.exp = currentCharacter.exp;
  Object.assign(currentCharacter, initialCharacter);
  displayCharacterInfo(currentCharacter);
  textBox.innerHTML = "";
  $("#characterImage")[0].className = "celebrate";
  battleTextScroll(
    `You have progressed to level ${currentCharacter.level}!`,
    0,
    finishLevelUp
  );
};
