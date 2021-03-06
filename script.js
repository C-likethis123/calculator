const screen = document.querySelector(".screen");
const operatorRegex = /[\+|\-|\*|÷|\/]$/;
const numberRegex = /[0-9]$/;
const isAnswerSymbolLast = /Ans$/;

let answerValue = 0;

// Number buttons add numbers to the screen
function addNumberToScreen(button) {
  const targetButton = button.target;
  const textToDisplay = targetButton.dataset.value;
  const currentDisplay = screen.textContent;
  screen.textContent += currentDisplay.match(/\)$/)
    ? `*${textToDisplay}`
    : textToDisplay;
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
  const newDisplay = currentDisplay.match(isAnswerSymbolLast)
    ? currentDisplay.substring(0, currentDisplay.length - 3)
    : currentDisplay.substring(0, currentDisplay.length - 1);
  screen.textContent = newDisplay;
}

const deleteButton = document.querySelector("button[data-function=delete");
deleteButton.addEventListener("click", deleteFromScreen);

// Operator buttons add operators to screen
function addOperatorToScreen(button) {
  const currentDisplay = screen.textContent;
  const operator = button.target.dataset.value;

  if (currentDisplay === "") {
    // don't add to string
    return;
  }
  if (currentDisplay.match(operatorRegex)) {
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

// Add brackets when clicked
function addLeftBracket() {
  const currentDisplay = screen.textContent.substr(-1);
  screen.textContent +=
    currentDisplay.match(numberRegex) || currentDisplay === ")" ? "*(" : "(";
}
const leftBracketButton = document.querySelector("#left-bracket");
leftBracketButton.addEventListener("click", addLeftBracket);

const rightBracketButton = document.querySelector("#right-bracket");
rightBracketButton.addEventListener("click", function (button) {
  const targetButton = button.target;
  const textToDisplay = targetButton.dataset.value;
  screen.textContent += textToDisplay;
});

function isValid(mathExpression) {
  if (mathExpression.match(/[\+|\-|\/|\*|\(]$/)) {
    return false;
  } else {
    return true;
  }
}

function evaluateExpression() {
  const calculatorDisplay = screen.textContent;
  const expressionToEvaluate = calculatorDisplay
    .replace("Ans", `${answerValue}`)
    .replace("÷", "/");

  if (isValid(expressionToEvaluate)) {
    const resultOfExpression = evaluate(expressionToEvaluate);
    answerValue = resultOfExpression;
    screen.textContent = resultOfExpression;
  }
}

const equalsButton = document.querySelector("button[data-function=equals]");
equalsButton.addEventListener("click", evaluateExpression);
