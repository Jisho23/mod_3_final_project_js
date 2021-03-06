const renderBattleOptions = function() {
  $("#battleArea")[0].innerHTML = `
  <button type="button" name="button" class='button is-small is-primary' value='attack'>Attack</button>
  <button type="button" name="button" class='button is-small is-warning' value='ability'>Use Ability</button>
  <button type="button" name="button" class='button is-small is-danger' value='runAway'>Run away!</button>`;
  let buttons = $(".button");
  buttons = [...buttons];
};

const buttonTypes = {
  0: "button is-small is-link",
  1: "button is-small is-primary",
  2: "button is-small is-info",
  3: "button is-small is-success",
  4: "button is-small is-warning",
  5: "button is-small is-danger"
};

const returnRandomButton = function() {
  let randomNum = Math.floor(Math.random() * 6);
  return buttonTypes[randomNum];
};

const performAction = function(value) {
  toggler();
  if (value === "attack") {
    currentMonster.hp -= currentCharacter.attack;
    if (currentMonster.hp < 0) {
      currentMonster.hp = 0;
    }
    displayMonster(currentMonster);
    textBox.innerHTML = "";
    battleTextScroll(
      `You attacked the ${currentMonster.name}! It took ${currentCharacter.attack} points of damage!`,
      0,
      getHit
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
};

const renderAbility = function() {
  $("#battleArea")[0].innerHTML = "";
  let abilitiesHTML = [];
  currentCharacter.abilities.forEach(function(ability) {
    let button = ` <button type="button" name="abilityButton" class="${returnRandomButton()}" value="${ability.name}">${ability.name}</button> `;
    abilitiesHTML.push(button);
  });
  abilitiesHTML.push(
    `<button type="button" name="abilityButton" value="back" id="back" class="${returnRandomButton()}">Back</button>`
  );
  $("#battleArea")[0].innerHTML = abilitiesHTML.join("");
  let buttons = $(".button");
  buttons = [...buttons];
  buttons.forEach(function(button) {
    button.addEventListener("click", function(ev) {
      if (ev.target.value === "back") {
        renderBattleOptions();
        toggler();
      } else {
        performAbility(ev.target.value);
      }
    });
  });
};

const performAbility = function(value) {
  renderBattleOptions();
  let ability = currentCharacter.abilities.find(function(ability) {
    return ability.name === value;
  });
  if (currentCharacter.pp < ability.cost) {
    textBox.innerHTML += `<br>`;
    battleTextScroll(
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
      battleTextScroll(
        `You used ${ability.name} on the ${currentMonster.name} and recovered ${ability.recover} hp! It took ${ability.damage} points of damage!`,
        0,
        getHit
      );
    } else if (ability.damage > 0 && ability.recover < 0) {
      textBox.innerHTML = "";
      battleTextScroll(
        `You used ${ability.name} on the ${currentMonster.name}, but it cost ${ability.recover} hp! It took ${ability.damage} points of damage!`,
        0,
        getHit
      );
    } else if (ability.damage > 0) {
      textBox.innerHTML = "";
      battleTextScroll(
        `You used ${ability.name} on the ${currentMonster.name}! It took ${ability.damage} points of damage!`,
        0,
        getHit
      );
    } else {
      textBox.innerHTML = "";
      battleTextScroll(
        `You used ${ability.name} on yourself! You recovered ${ability.recover} hit points!`,
        0,
        getHit
      );
    }
  }
};

const runAway = function() {
  textBox.innerHTML = "";
  let number = Math.floor(Math.random() * 5);
  if (number === 4) {
    battleTextScroll("You failed to run away!", 0, finishRunning);
  } else {
    battleTextScroll("You managed to escape!", 0, finishRunning);
  }
};

const clearScreen = function() {
  $("#battleArea")[0].innerHTML = "";
  $("#monsterInfo")[0].innerHTML = "";
};
