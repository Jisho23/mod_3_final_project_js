const getHit = function() {
  audio.hit.play();
  $("#monsterImage")[0].className = "shake";
  setTimeout(function() {
    isMonsterDead();
  }, 500);
};

const hitCharacter = function() {
  audio.hit.play();
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
};

const battleTextScroll = function(message, index, callback = function() {}) {
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

const finishRunning = function(message) {
  if (message === "You failed to run away!") {
    isMonsterDead();
  } else {
    pickAMonster();
    textBox.innerHTML += `<br>`;
    battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
    toggler();
  }
};

const finishLevelUp = function() {
  setTimeout(function() {
    pickAMonster();
    renderBattleOptions();
    textBox.innerHTML += `<br>`;
    battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
    toggler();
  }, 750);
};

const showDefeatedText = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showDefeatedText(message, index);
      if (index === message.length) {
        setTimeout(function() {
          getExpReward();
        }, 750);
      }
    }, 30);
  }
};
