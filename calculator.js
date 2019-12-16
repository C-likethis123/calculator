const invalid_input = "not valid!";

const screen = document.querySelector('.screen');
const listOfButtons = document.querySelectorAll('button');
let valueInMemory = null;
let operationInMemory = null;

//misc helper functions
function isAllNumbers(...nums) {
	for (i in nums) {
		if (typeof(nums[i]) != "number") {
			return false;
		}
	}
	return true;
}

//Basic arithmetic functions
function add(op1, op2) {
	return isAllNumbers(op1, op2) 
		? op1 + op2
		: invalid_input;
}

function subtract(op1, op2) {
	return isAllNumbers(op1, op2) 
		? op1 - op2
		: invalid_input;
}

function multiply(op1, op2) {
	return isAllNumbers(op1, op2) 
		? op1 * op2
		: invalid_input;
}

function divide(op1, op2) {
	return isAllNumbers(op1, op2) 
		? op1 / op2
		: invalid_input;
}

function operate(operator, op1, op2) {
	switch(operator) {
		case '+':
			return add(op1, op2);
		case '-':
			return subtract(op1, op2);
		case '*':
			return multiply(op1, op2);
		case '÷':
			return divide(op1, op2);
		default:
			displayValue("invalid_input");
			return;
	}	
}

function displayValue(textToDisplay) {
	screen.textContent = textToDisplay;
}

function addValue(textToDisplay) {
	screen.textContent += textToDisplay;
}

function clearScreen() {
	screen.textContent = "";
}

function handleOperation(operation) {
	if (!valueInMemory) {
		valueInMemory = Number(screen.textContent);
		operationInMemory = operation;
	} else {
		const secondOperand = Number(screen.textContent);
		valueInMemory = operate(operationInMemory, valueInMemory, secondOperand);
		displayValue(valueInMemory);
	}
}

const listOfNumberButtons = document.querySelectorAll('.number');
listOfNumberButtons.forEach(button => button.addEventListener('click', function(e) {
	const button = e.target;
	addValue(button.dataset.value);
}));

const listOfOperatorButtons = document.querySelectorAll('button[data-operator]');
listOfOperatorButtons.forEach(button => button.addEventListener('click', function(e) {
	handleOperation(button.dataset.value);
	clearScreen();
}));

const clearButton = document.querySelector('button[data-function=clear');
clearButton.addEventListener('click', function(e) {
	clearScreen();
})
const equalsButton = document.querySelector('button[data-function=equals]');
equalsButton.addEventListener('click', function(e) {
	handleOperation(operationInMemory);
})