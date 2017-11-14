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
  let monster = Monster.all()[randomNumber];
  currentMonster = monster;
  displayMonster(monster);
}

function displayMonster(monster) {
  let monsterInfo = $("#monsterInfo")[0];
  monsterInfo.innerHTML = `<h3>You are facing the...</h3><table>
    <tr>
    <td id='mName'>${monster.name}</td>
    <td id='mHp'>HP: ${monster.hp}</td>
    <td id='Difficulty'>Difficulty: ${monster.exp}</td>

    </tr>
  </table>`;
}
