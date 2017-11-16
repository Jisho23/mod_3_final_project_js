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
  difficultyUp();
  let randomNumber = Math.floor(Math.random() * Monster.all().length);
  let monster = Object.assign({}, Monster.all()[randomNumber]);
  currentMonster = monster;
  if (monstersFaced % 37 === 0 && monstersFaced !== 0) {
    Object.assign(currentMonster, boss);
  }
  displayMonster(currentMonster);
  monstersFaced += 1;
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
  if (
    currentCharacter.exp >=
    currentCharacter.level * currentCharacter.level * 10
  ) {
    levelUp();
  } else {
    displayCharacterInfo(currentCharacter);
    finishLevelUp();
  }
}

function monsterAttacks() {
  textBox.innerHTML += `<br>`;
  battleTextScroll(
    `The ${currentMonster.name} attacked! You took ${currentMonster.attack} points of damage!`,
    0,
    hitCharacter
  );
}

function difficultyUp() {
  if (monstersFaced % 9 === 0 && monstersFaced !== 0) {
    Monster.all().forEach(function(monster) {
      monster.hp += 2;
      monster.attack += 1;
      monster.exp += 1;
    });
  }
}
