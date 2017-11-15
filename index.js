// initialize document on load
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
