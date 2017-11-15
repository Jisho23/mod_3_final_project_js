function startGame(event) {
  event.preventDefault();
  let characterInfo = $("#characterInfo")[0];
  let characterId = parseInt($("#characterDropdown")[0].value);
  let characterChoice = Character.all().find(function(character) {
    return character.id === characterId;
  });
  initialCharacter = characterChoice;
  currentCharacter = characterChoice;
  displayCharacterInfo(characterChoice);
  pickAMonster();
  $("#characterSelectForm")[0].innerHTML = "";
  $("#highScoreArea")[0].innerHTML = "";
  battle();
}