const invalid_input = "not valid!";

const screen = document.querySelector('.screen');
const listOfButtons = document.querySelectorAll('button');

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
	return operator(op1, op2);
}

listOfButtons.forEach(button => button.addEventListener('click', function(e) {
	const button = e.target;
	if (button.dataset.operator == "clear") {
		clearScreen();
	} else {
		displayValue(button.dataset.value);
	}
	}));

function displayValue(textToDisplay) {
	screen.textContent += textToDisplay;
}

function clearScreen() {
	screen.textContent = "";
}