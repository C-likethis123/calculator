const screen = document.querySelector(".screen");
const regex = /[\+|\-|\*|÷]$/;
const numberRegex = /[0-9]$/;

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

// Operator buttons add operators to screen
function addOperatorToScreen(button) {
  const currentDisplay = screen.textContent;
  const regex = /[\+|\-|\*|÷]$/;

  const operator = button.target.dataset.value;

  if (currentDisplay === "") {
    // don't add to string
    return;
  }
  if (currentDisplay.match(regex)) {
    const newDisplay = currentDisplay.replace(regex, operator);
    screen.textContent = newDisplay;
  } else {
    screen.textContent += operator;
  }
}

const listOfOperatorButtons = document.querySelectorAll("button[data-operator]");
listOfOperatorButtons.forEach((button) =>
  button.addEventListener("click", addOperatorToScreen)
);

// Add brackets
function addBracketsToScreen() {
  const currentDisplay = screen.textContent;
  const leftBracketCount = (currentDisplay.match(/\(/g) || []).length;
  const rightBracketCount = (currentDisplay.match(/\)/g) || []).length;

  const lastCharacterRightBracket = /\)$/;
  if (leftBracketCount > 0 && currentDisplay.match(numberRegex)) {
    screen.textContent += ")";
  } else if (
    currentDisplay.match(lastCharacterRightBracket) &&
    leftBracketCount > rightBracketCount
  ) {
    screen.textContent += ")";
  } else {
    screen.textContent += "(";
  }
}

const bracketButton = document.querySelector("button[data-function=bracket");
bracketButton.addEventListener("click", addBracketsToScreen);
