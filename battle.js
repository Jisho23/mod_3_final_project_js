function battle() {
  renderBattleOptions();
}

function renderBattleOptions() {
  $("#battleArea")[0].innerHTML = `
  <button type="button" name="button" class='button is-small' value='attack'>Attack</button>
  <button type="button" name="button" class='button is-small' value='ability'>Use Ability</button>
  <button type="button" name="button" class='button is-small' value='runAway'>Run away!</button>`;
  let buttons = $(".button");
  buttons = [...buttons];
  buttons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      performAction(event.target.value);
    });
  });
}

function performAction(value) {
  if (value === "attack") {
    currentMonster.hp -= currentCharacter.attack;
    displayMonster(currentMonster);
    getHit($("#monsterImage")[0]);
    alert(
      `You attacked ${currentMonster.name}! It took ${currentCharacter.attack} points of damage!`
    );
    update();
  } else if (value === "ability") {
    if (currentCharacter.abilities.length > 0) {
      renderAbility();
    } else {
      alert("You have no ability!");
    }
  } else if (value === "runAway") {
    runAway();
  }
}

function renderAbility() {
  $("#battleArea")[0].innerHTML = "";
  let abilitiesHTML = [];
  currentCharacter.abilities.forEach(function(ability) {
    let button = `<button type="button" name="button" class="button is-small" value="${ability.name}">${ability.name}</button>`;
    abilitiesHTML.push(button);
  });
  $("#battleArea")[0].innerHTML = abilitiesHTML.join("");
  let buttons = $(".button");
  buttons = [...buttons];
  buttons.forEach(function(button) {
    button.addEventListener("click", function(ev) {
      performAbility(ev.target.value);
    });
  });
}

function performAbility(value) {
  let ability = currentCharacter.abilities.find(function(ability) {
    return ability.name === value;
  });
  if (currentCharacter.pp < ability.cost) {
    alert("The spell fizzles because you don't have enough ability power!");
    renderBattleOptions();
  } else {
    currentMonster.hp -= ability.damage;
    currentCharacter.pp -= ability.cost;
    currentCharacter.hp += ability.recover;
    getHit($("#monsterImage")[0]);
    displayMonster(currentMonster);
    displayCharacterInfo(currentCharacter);
    if (ability.damage > 0) {
      alert(
        `You used ${ability.name} on the ${currentMonster.name}! It took ${ability.damage} points of damage!`
      );
    }
    if (ability.recover > 0) {
      alert(`You recovered ${ability.recover} hit points!`);
    }
    update();
  }
}

function runAway() {
  let number = Math.floor(Math.random() * 5);
  if (number === 4) {
    alert("You failed to run away!");
    update();
  } else {
    alert("You managed to escape!");
    pickAMonster();
    alert(`Here comes a ${currentMonster.name}!`);
  }
}

function update() {
  isMonsterDead();
  if (isPlayerDead()) {
    alert("You died!");
    highScore();
  }
}

function highScore() {
  clearScreen();
  renderHighScoreForm();
}

function clearScreen() {
  $("#battleArea")[0].innerHTML = "";
  $("#monsterInfo")[0].innerHTML = "";
}
