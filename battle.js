function battle() {
  renderBattleOptions();
}

function renderBattleOptions() {
  $("#battleArea")[0].innerHTML = `
  <button type="button" name="button" class='button is-small is-primary' value='attack'>Attack</button>
  <button type="button" name="button" class='button is-small is-warning' value='ability'>Use Ability</button>
  <button type="button" name="button" class='button is-small is-danger' value='runAway'>Run away!</button>`;
  let buttons = $(".button");
  buttons = [...buttons];
}

function performAction(value) {
  toggler();
  if (value === "attack") {
    currentMonster.hp -= currentCharacter.attack;
    if (currentMonster.hp < 0) {
      currentMonster.hp = 0;
    }
    displayMonster(currentMonster);
    textBox.innerHTML = "";
    showTextHit(
      `You attacked the ${currentMonster.name}! It took ${currentCharacter.attack} points of damage!`,
      0
    );
  } else if (value === "ability") {
    if (currentCharacter.abilities.length > 0) {
      renderAbility();
    } else {
      alert("You have no ability!");
      toggler();
    }
  } else if (value === "runAway") {
    runAway();
  }
}

function renderAbility() {
  $("#battleArea")[0].innerHTML = "";
  let abilitiesHTML = [];
  currentCharacter.abilities.forEach(function(ability) {
    let button = `<button type="button" name="abilityButton" class="button is-small is-link" value="${ability.name}">${ability.name}</button>`;
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
    textBox.innerHTML += `<br>`;
    showRandomText(
      "The spell fizzles because you don't have enough ability power!",
      0
    );
    renderBattleOptions();
    toggler();
  } else {
    currentMonster.hp -= ability.damage;
    currentCharacter.pp -= ability.cost;
    currentCharacter.hp += ability.recover;
    if (currentMonster.hp < 0) {
      currentMonster.hp = 0;
    }
    if (currentCharacter.hp > initialCharacter.hp) {
      currentCharacter.hp = initialCharacter.hp;
    }
    if (currentCharacter.pp > initialCharacter.pp) {
      currentCharacter.pp = initialCharacter.pp;
    }
    displayMonster(currentMonster);
    displayCharacterInfo(currentCharacter);
    if (ability.damage > 0 && ability.recover > 0) {
      textBox.innerHTML = "";
      showTextHit(
        `You used ${ability.name} on the ${currentMonster.name} and recovered ${ability.recover} hp! It took ${ability.damage} points of damage!`,
        0
      );
    } else if (ability.damage > 0 && ability.recover < 0) {
      textBox.innerHTML = "";
      showTextHit(
        `You used ${ability.name} on the ${currentMonster.name}, but it cost ${ability.recover} hp! It took ${ability.damage} points of damage!`,
        0
      );
    } else if (ability.damage > 0) {
      textBox.innerHTML = "";
      showTextHit(
        `You used ${ability.name} on the ${currentMonster.name}! It took ${ability.damage} points of damage!`,
        0
      );
    } else {
      textBox.innerHTML = "";
      showTextHit(
        `You used ${ability.name} on yourself! You recovered ${ability.recover} hit points!`,
        0
      );
    }
  }
}

function runAway() {
  textBox.innerHTML = "";
  let number = Math.floor(Math.random() * 5);
  if (number === 4) {
    showTextRunAway("You failed to run away!", 0);
  } else {
    showTextRunAway("You managed to escape!", 0);
  }
}

function update() {
  isMonsterDead();
}

function highScore() {
  clearScreen();
  renderHighScoreForm();
}

function clearScreen() {
  $("#battleArea")[0].innerHTML = "";
  $("#monsterInfo")[0].innerHTML = "";
}
