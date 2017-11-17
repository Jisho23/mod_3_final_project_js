// initialize document on load
(function() {
  //// animations ////
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

  ///////////////////

  /////// battle ///
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

  /////////////////

  /////characters/
  let currentCharacter = {};
  let initialCharacter = {};

  const Character = (() => {
    const characters = [];
    return class Character {
      constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.hp = json.hp;
        this.pp = json.pp;
        this.attack = json.attack;
        this.abilities = json.abilities;
        this.exp = 0;
        this.level = 1;
        this.image = json.image;
        characters.push(this);
      }
      static all() {
        return characters;
      }
    };
  })();

  const populateCharacterSelect = function() {
    fetch(herokuCharacters)
      .then(response => response.json())
      .then(function(json) {
        json.forEach(function(character) {
          let newOption = `<option value="${character.id}">${character.name}</option>>`;
          $("#characterDropdown")[0].innerHTML += newOption;
          let newCharacter = new Character(character);
        });
      });
  };

  const displayCharacterInfo = function(characterChoice) {
    $("#characterInfo")[0].innerHTML = characterTable;
    $(
      "#characterImage"
    )[0].innerHTML = `<img src='${characterChoice.image}' id='characterImage' class='img'></img>`;
    $("#name")[0].innerHTML = `Character Class: ${characterChoice.name}`;
    $("#hp")[0].innerHTML = `HP: ${characterChoice.hp} `;
    $("#PP")[0].innerHTML = `PP: ${characterChoice.pp}`;
    $("#attack")[0].innerHTML = `Attack Power: ${characterChoice.attack}`;
    $("#exp")[0].innerHTML = `Exp: ${characterChoice.exp}`;
    $("#abilityArea")[0].innerHTML = "";
    $(
      "#abilityArea"
    )[0].innerHTML += `<h4 has-text-weight-semibold>Abilities</h4><ul id='abilities'></ul>`;
    let abilities = characterChoice.abilities;
    if (abilities.length > 0) {
      abilities.forEach(function(ability) {
        $(
          "#abilities"
        )[0].innerHTML += `<div class='box has-text-white'><li>${ability.name}: ${ability.damage} damage, Cost: ${ability.cost}</li></div>`;
      });
    } else {
      $("#abilities")[0].innerHTML = `<li> None</li>`;
    }
  };

  const isPlayerDead = function() {
    if (currentCharacter.hp <= 0) {
      audio.pauseAllAudio();
      audio.gameOver.play();
      return true;
    } else {
      return false;
    }
  };

  const levelUp = function() {
    initialCharacter.attack += 1;
    initialCharacter.hp += 3;
    initialCharacter.level += 1;
    initialCharacter.pp += 1;
    initialCharacter.exp = currentCharacter.exp;
    Object.assign(currentCharacter, initialCharacter);
    displayCharacterInfo(currentCharacter);
    textBox.innerHTML = "";
    $("#characterImage")[0].className = "celebrate";
    battleTextScroll(
      `You have progressed to level ${currentCharacter.level}!`,
      0,
      finishLevelUp
    );
  };

  ///////////////

  /////game_start/

  const startGame = function(event) {
    event.preventDefault();
    let characterInfo = $("#characterInfo")[0];
    let characterId = parseInt($("#characterDropdown")[0].value);
    let characterChoice = Character.all().find(function(character) {
      return character.id === characterId;
    });
    initialCharacter = characterChoice;
    Object.assign(currentCharacter, characterChoice);
    displayCharacterInfo(characterChoice);
    pickAMonster();
    $("#characterSelectForm")[0].innerHTML = "";
    $("#highScoreArea")[0].innerHTML = "";
    $(
      "#textBoxArea"
    )[0].innerHTML += `<div class='text_box' id='textArea'></div>`;
    textBox = $("#textArea")[0];
    $("#startPauseAudio")[0].click();
    $("#startPauseAudio")[0].data = "on";
    battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
    renderBattleOptions();
  };

  ///////////////

  /////globalconstants///
  const localHostCharacters = "http://localhost:3000/api/v1/characters";
  const localHostMonsters = "http://localhost:3000/api/v1/monsters";
  const localHostHighScore = "http://localhost:3000/api/v1/highscores";
  const herokuMonsters =
    "https://cryptic-inlet-42078.herokuapp.com/api/v1/monsters";
  const herokuCharacters =
    "https://cryptic-inlet-42078.herokuapp.com/api/v1/characters";
  const herokuHighScores =
    "https://cryptic-inlet-42078.herokuapp.com/api/v1/highscores";
  const test = "";
  let monstersFaced = 0;
  const boss = {
    name: "Actual John Cena",
    hp: 60,
    attack: 5,
    exp: 100,
    image:
      "http://shop.wwe.com/on/demandware.static/-/Sites/default/dw32c23792/images/slot/landing/superstar-landing/Superstar-Category_Superstar_562x408_johncena-2017.png"
  };

  const characterTable = `<h3>Character Info:</h3><div id='characterImage'></div><table class='table is-narrow is-bordered' id='characterDisplay'>
  <td>
    <table id='characterStatTable'>
    <tr>
      <td id='name'></td>
    </tr>
    <tr>
      <td id='hp'></td>
    </tr>
    <tr>
      <td id='PP'></td>
    </tr>
    <tr>
      <td id='attack'></td>
      </tr>
    <tr>
      <td id='exp'></td>
    </table>
  </table>`;

  let textBox = "";

  const toggler = function() {
    if ($("#battleColumn")[0].data === "toggled") {
      $("#battleColumn")[0].data = "";
    } else {
      $("#battleColumn")[0].data = "toggled";
    }
  };

  const audio = {
    battleTheme: new Audio("05.mp3"),
    bossTheme: new Audio("cena.mp3"),
    gameOver: new Audio("gameOver.mp3"),
    hit: new Audio("hit.mp3"),
    pauseAllAudio: function() {
      $("#startPauseAudio")[0].data = "";
      this.battleTheme.pause();
      this.bossTheme.pause();
      this.gameOver.pause();
    }
  };

  ////////////////////

  //monsters////////
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

  const populateMonsters = function() {
    fetch(herokuMonsters)
      .then(res => res.json())
      .then(function(json) {
        json.forEach(function(monster) {
          new Monster(monster);
        });
      });
  };

  const pickAMonster = function() {
    difficultyUp();
    let randomNumber = Math.floor(Math.random() * Monster.all().length);
    let monster = Object.assign({}, Monster.all()[randomNumber]);
    currentMonster = monster;
    if (monstersFaced % 23 === 0 && monstersFaced !== 0) {
      Object.assign(currentMonster, boss);
      audio.battleTheme.pause();
      audio.bossTheme.play();
    }
    displayMonster(currentMonster);
    monstersFaced += 1;
  };

  const displayMonster = function(monster) {
    let monsterInfo = $("#monsterInfo")[0];
    monsterInfo.innerHTML = `<div class= ""><h3>You are facing the...</h3><table class= "table is-narrow is-bordered" id='monsterTable'>
      <img src=${monster.image} height="100" id='monsterImage' class='img'>
      <td>
      <table>
      <tr id='mName'><td>${monster.name}</td></tr>
      <tr id='mHp'><td>HP: ${monster.hp}</td></tr>
      <tr id='Difficulty'><td>Difficulty: ${monster.exp}</td></tr>
      </table>
      </td>
    </table></div>`;
  };

  const isMonsterDead = function() {
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
  };

  const getExpReward = function() {
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
  };

  const monsterAttacks = function() {
    textBox.innerHTML += `<br>`;
    battleTextScroll(
      `The ${currentMonster.name} attacked! You took ${currentMonster.attack} points of damage!`,
      0,
      hitCharacter
    );
  };

  const difficultyUp = function() {
    if (monstersFaced % 8 === 0 && monstersFaced !== 0) {
      Monster.all().forEach(function(monster) {
        monster.hp += 2;
        monster.attack += 1;
        monster.exp = Math.round(monster.exp * 1.5);
      });
    }
  };

  ////////////////

  /// scores ////
  const renderHighScoreForm = function() {
    $("#highscore-form")[0].innerHTML = `
    <form class='form' id='enter-name' method='post'>
    <input type='hidden' id='score' name='score' value=${currentCharacter.exp}>
    <div class="control has-icons-left">
    <div class='label'>Please input your name</div>
    <input class= 'input is-success' placeholder='your name' type='text' id='scoreName' name='name'>
      </div>
    <input class='button is-sucess'type='submit' id='scoreSubmit' value='submit' name='submit score'><br>`;

    $("#highscore-form")[0].addEventListener("submit", function(event) {
      $("#scoreSubmit")[0].className = "button is-success is-loading";
      event.preventDefault();
      postScore();
      $("#characterInfo")[0].innerHTML = "";
    });
  };

  const postScore = function() {
    let body = {
      name: $("#scoreName").val(),
      score: parseInt($("#score").val())
    };

    let header = {
      "Content-Type": "application/json"
    };
    fetch(herokuHighScores, {
      method: "POST",
      body: JSON.stringify(body),
      headers: header
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(json => location.reload());
  };

  const getHighScores = function() {
    fetch(herokuHighScores)
      .then(resp => resp.json())
      .then(function(json) {
        json.forEach(function(score) {
          createScoreOnTable(score);
        });
      });
  };

  const createScoreOnTable = function(score) {
    let newScore = `<tr class='tr'><td class='td'>${score.name} - ${score.score} points</td></tr>`;
    $("#highScoreTable")[0].innerHTML += newScore;
  };

  const highScore = function() {
    clearScreen();
    renderHighScoreForm();
  };
  //////////////////////////

  document.addEventListener("DOMContentLoaded", function() {
    populateMonsters();
    populateCharacterSelect();
    getHighScores();
    $("#battleColumn")[0].data = "toggled";
    $("#characterSelectForm")[0].addEventListener("submit", function(event) {
      startGame(event);
    });
  });

  $("#battleColumn")[0].addEventListener("click", function(event) {
    if (
      event.target.nodeName === "BUTTON" &&
      $("#battleColumn")[0].data === "toggled" &&
      event.target.name != "abilityButton"
    ) {
      performAction(event.target.value);
    }
  });

  (function() {
    $("#startPauseAudio")[0].addEventListener("click", function(event) {
      let masterAudio = audio.battleTheme;
      if ($("#startPauseAudio")[0].data === "on") {
        audio.pauseAllAudio();
        $("#startPauseAudio")[0].data = "";
      } else {
        $("#startPauseAudio")[0].data = "on";
        masterAudio.play();
        masterAudio.addEventListener(
          "ended",
          function() {
            this.currentTime = 0;
            this.play();
          },
          false
        );
      }
    });
  })();
})();
