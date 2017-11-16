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
  battleTextScroll(`A ${currentMonster.name} draws near!`, 0);
  renderBattleOptions();
};
