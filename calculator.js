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

listOfButtons.forEach(button => button.addEventListener('click', displayValue));
function displayValue(e) {
	const text = e.target.dataset.value;
	screen.textContent += text;
}