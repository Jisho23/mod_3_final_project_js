let currentMonster = {};
const Monster = (() => {
  let monsters = [];

  return class Monster {
    constructor(json) {
      this.name = json.name;
      this.hp = json.hp;
      this.attack = json.attack;
      this.id = json.id;
      this.exp = json.exp;
      this.image = json.image;
      monsters.push(this);
    }
    static all() {
      return monsters;
    }
  };
})();

function populateMonsters() {
  fetch(localHostMonsters)
    .then(res => res.json())
    .then(function(json) {
      json.forEach(function(monster) {
        new Monster(monster);
      });
    });
}

function pickAMonster() {
  let randomNumber = Math.floor(Math.random() * Monster.all().length);
  let monster = Object.assign({}, Monster.all()[randomNumber]);
  currentMonster = monster;
  displayMonster(currentMonster);
}

function displayMonster(monster) {
  let monsterInfo = $("#monsterInfo")[0];
  monsterInfo.innerHTML = `<div class= ""><h3>You are facing the...</h3><table class= "table is-narrow is-bordered">
    <img src=${monster.image} height="100" id='monsterImage' class='image is-1x1'>
    <td>
    <table>
    <tr id='mName'><td>${monster.name}</td></tr>
    <tr id='mHp'><td>HP: ${monster.hp}</td></tr>
    <tr id='Difficulty'><td>Difficulty: ${monster.exp}</td></tr>
    </table>
    </td>
  </table></div>`;
}

function monsterAttacks() {
  currentCharacter.hp -= currentMonster.attack;
  alert(
    `The ${currentMonster.name} attacked! You took ${currentMonster.attack} points of damage!`
  );
  $("#characterInfo")[0].innerHTML = characterTable;
  displayCharacterInfo(currentCharacter);
}

function isMonsterDead() {
  if (currentMonster.hp < 1) {
    alert(
      `You defeated the ${currentMonster.name}! You gained ${currentMonster.exp} experience points!`
    );
    currentCharacter.exp += currentMonster.exp;
    $("#characterInfo")[0].innerHTML = characterTable;
    displayCharacterInfo(currentCharacter);
    pickAMonster();
    renderBattleOptions();
    alert(`Here comes a ${currentMonster.name}!`);
  } else {
    monsterAttacks();
    renderBattleOptions();
  }
}
