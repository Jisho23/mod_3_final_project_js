function getHit(el) {
  el.className = "shake";
  setTimeout(function() {
    update();
  }, 500);
}

function hitCharacter(el) {
  el.className = "shake";
  setTimeout(function() {
    $("#characterInfo")[0].innerHTML = characterTable;
    currentCharacter.hp -= currentMonster.attack;
    displayCharacterInfo(currentCharacter);
    if (isPlayerDead()) {
      textBox.innerHTML = "";
      showRandomText("You died!", 0);
      highScore();
    }
  }, 500);
  toggler();
}

const showTextHit = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showTextHit(message, index);
      if (index === message.length) {
        setTimeout(function() {
          getHit($("#monsterImage")[0]);
        }, 500);
      }
    }, 50);
  }
};

const showTextDamage = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showTextDamage(message, index);
      if (index === message.length) {
        setTimeout(function() {
          hitCharacter($("#characterImage")[0]);
        }, 500);
      }
    }, 50);
  }
};

const showTextRunAway = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showTextRunAway(message, index);
      if (index === message.length) {
        if (message === "You failed to run away!") {
          update();
        } else {
          pickAMonster();
          textBox.innerHTML += `<br>`;
          showRandomText(`A ${currentMonster.name} draws near!`, 0);
          toggler();
        }
      }
    }, 50);
  }
};

const showRandomText = function(message, index) {
  if (index < message.length) {
    textBox.innerHTML += message[index++];
    setTimeout(function() {
      showRandomText(message, index);
    }, 50);
  }
};

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
    }, 50);
  }
};
