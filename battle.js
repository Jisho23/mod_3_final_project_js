function battle() {
  renderBattleOptions();
}

function renderBattleOptions() {
  $("#battleArea")[0].innerHTML = `
  <button type="button" name="button" class='action' value='attack'>Attack</button>
  <button type="button" name="button" class='action' value='ability'>Use Ability</button>
  <button type="button" name="button" class='action' value='runAway'>Run away!</button>`;
  let buttons = $(".action");
  buttons = [...buttons];
  buttons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      performAction(event.target.value);
    });
  });
}

function performAction(value) {
  alert(`${value}`);
}
