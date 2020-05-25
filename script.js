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

// Clear button clears display
function clearScreen() {
  screen.textContent = "";
}

const clearButton = document.querySelector("button[data-function=clear");
clearButton.addEventListener("click", clearScreen);

// Delete button deletes last character
function deleteFromScreen() {
  const currentDisplay = screen.textContent;
  const newDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
  screen.textContent = newDisplay;
}

const deleteButton = document.querySelector("button[data-function=delete");
deleteButton.addEventListener("click", deleteFromScreen);
