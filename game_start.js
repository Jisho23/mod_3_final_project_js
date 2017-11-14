function startGame(event) {
  event.preventDefault();
  let characterInfo = $("#characterInfo")[0];
  characterInfo.innerHTML = characterTable;
  let characterId = parseInt($("#characterDropdown")[0].value);
  let characterChoice = Character.all().find(function(character) {
    return character.id === characterId;
  });
  displayCharacterInfo(characterChoice);
  pickAMonster();
  $("#characterSelectForm")[0].innerHTML = "";
  battle();
}
