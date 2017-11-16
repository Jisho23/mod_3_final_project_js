function getHit() {
  $("#monsterImage")[0].className = "shake";
  setTimeout(function() {
    update();
  }, 500);
}

function hitCharacter() {
  $("#characterImage")[0].className = "shake";
  setTimeout(function() {
    $("#characterInfo")[0].innerHTML = characterTable;
    currentCharacter.hp -= currentMonster.attack;
    displayCharacterInfo(currentCharacter);
    if (isPlayerDead()) {
      textBox.innerHTML = "";
      battleTextScroll("You died!", 0);
      highScore();
    }
  }, 500);
  toggler();
}

const battleTextScroll = function(message, index, callback) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      battleTextScroll(message, index, callback);
      if (index === message.length) {
        setTimeout(function() {
          callback(message);
        }, 500);
      }
    }, 30);
  }
};

function finishRunning(message) {
  if (message === "You failed to run away!") {
    update();
  } else {
    pickAMonster();
    textBox.innerHTML += `<br>`;
    battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
    toggler();
  }
}

function finishLevelUp() {
  setTimeout(function() {
    pickAMonster();
    renderBattleOptions();
    textBox.innerHTML += `<br>`;
    battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
    toggler();
  }, 750);
}

const showDefeatedText = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showDefeatedText(message, index);
      if (index === message.length) {
        setTimeout(function() {
          getExpReward();
        }, 1000);
      }
    }, 30);
  }
};
