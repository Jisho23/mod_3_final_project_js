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
