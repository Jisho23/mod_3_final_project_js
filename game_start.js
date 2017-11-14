function startGame(event) {
  event.preventDefault();
  let characterInfo = $("#characterInfo")[0];
  characterInfo.innerHTML = `<h3>Character Info:</h3><table>
    <tr>
    <td id='name'></td>
    <td id='hp'></td>
    <td id='PP'></td>
    <td id='attack'></td>
    </tr>
  </table>`;
  let characterId = parseInt($("#characterDropdown")[0].value);
  let characterChoice = Character.all().find(function(character) {
    return character.id === characterId;
  });
  displayCharacterInfo(characterChoice);
  pickAMonster();
  $("#characterSelectForm")[0].innerHTML = "";
}
