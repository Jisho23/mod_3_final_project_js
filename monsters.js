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
  monsterInfo.innerHTML = `<div class= ""><h3>You are facing the...</h3><table class= "table">
    <img src=${monster.image} height="100" id='monsterImage'>
    <tr>
    <td id='mName'>${monster.name}</td>
    <td id='mHp'>HP: ${monster.hp}</td>
    <td id='Difficulty'>Difficulty: ${monster.exp}</td>

    </tr>
  </table></div>`;
}

function isMonsterDead() {
  if (currentMonster.hp < 1) {
    textBox.innerHTML += `<br>`;
    showDefeatedText(
      `You defeated the ${currentMonster.name}! Your exp went up by ${currentMonster.exp}!`,
      0
    );
  } else {
    monsterAttacks();
    renderBattleOptions();
  }
}

function getExpReward() {
  currentCharacter.exp += currentMonster.exp;
  $("#characterInfo")[0].innerHTML = characterTable;
  displayCharacterInfo(currentCharacter);
  pickAMonster();
  renderBattleOptions();
  textBox.innerHTML = "";
  showRandomText(`A ${currentMonster.name} draws near!`, 0);
}

function monsterAttacks() {
  currentCharacter.hp -= currentMonster.attack;
  textBox.innerHTML += `<br>`;
  showTextDamage(
    `The ${currentMonster.name} attacked! You took ${currentMonster.attack} points of damage!`,
    0
  );
}
