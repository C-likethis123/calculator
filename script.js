const screen = document.querySelector(".screen");
const listOfButtons = document.querySelectorAll("button");

// Number buttons add numbers to the screen
function addNumberToScreen(button) {
  const targetButton = button.target;
  const textToDisplay = targetButton.dataset.value;
  screen.textContent += textToDisplay;
}

const listOfNumberButtons = document.querySelectorAll(".number");
listOfNumberButtons.forEach((button) =>
  button.addEventListener("click", addNumberToScreen)
);
