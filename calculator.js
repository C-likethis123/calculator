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

listOfButtons.forEach(button => button.addEventListener('click', function(e) {
	const button = e.target;
	if (button.dataset.function == "clear") {
		clearScreen();
	} else if ("operator" in button.dataset) {
		handleOperation(button.dataset.value);
		clearScreen();
		//displayValue(button.dataset.value);
	} else if (button.dataset.function == "equals") {
		handleOperation(operationInMemory);
	} else {
		addValue(button.dataset.value);
	}
	}));