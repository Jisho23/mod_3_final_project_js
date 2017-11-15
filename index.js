// initialize document on load
document.addEventListener("DOMContentLoaded", function() {
  populateMonsters();
  populateCharacterSelect();
  getHighScores();
  $("#characterSelectForm")[0].addEventListener("submit", function(event) {
    startGame(event);
  });
});

// character info
