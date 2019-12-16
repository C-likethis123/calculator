const invalid_input = "not valid!";

const screen = document.querySelector('.screen');
const listOfButtons = document.querySelectorAll('button');
const listOfOperators = ['+', '-', '*', '÷'];

let lastComputedValue = null;

//misc helper functions
function isAllNumbers(...nums) {
	for (i in nums) {
		if (typeof(nums[i]) != "number") {
			return false;
		}
	}
	return true;
}

function isOperator(character) {
	return listOfOperators.includes(character);
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

function deleteCharacter() {
	let currentDisplay = screen.textContent;
	currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
	screen.textContent = currentDisplay;
}

function evaluatePostFixExpression(abstractSyntaxTree) {
	let stack = [];
	for (let i = 0; i < abstractSyntaxTree.length; i++) {
		let character = abstractSyntaxTree[i];
		
		if (isOperator(character)) {
			let firstElement = stack.pop();
			let secondElement = stack.pop();
			let result = operate(character, secondElement, firstElement);
			stack.push(result);
		} else if (isAllNumbers(+character)) {
			stack.push(+character);
		} else {
			return invalid_input;
		}
	}
	return stack.pop();
}

function handleOperation(expression) {
	let splitOperators = expression.match(/[^\d()]+|[\d.]+/g);
	let abstractSyntaxTree = getAbstractSyntaxTree(splitOperators);
	let result = evaluatePostFixExpression(abstractSyntaxTree);
}

const listOfNumberButtons = document.querySelectorAll('.number');
listOfNumberButtons.forEach(button => button.addEventListener('click', function(e) {
	const button = e.target;
	addValue(button.dataset.value);
}));

const listOfOperatorButtons = document.querySelectorAll('button[data-operator]');
listOfOperatorButtons.forEach(button => button.addEventListener('click', function(e) {
	addValue(button.dataset.value);
}));

//event handlers for misc buttons
const deleteButton = document.querySelector('button[data-function=delete]');
deleteButton.addEventListener('click', function(e) {
	deleteCharacter();
});

const clearButton = document.querySelector('button[data-function=clear');
clearButton.addEventListener('click', function(e) {
	clearScreen();
});

const decimalButton = document.querySelector('button[data-value=dot]');
decimalButton.addEventListener('click', function(e) {
	addValue(".");
});

const equalsButton = document.querySelector('button[data-function=equals]');
equalsButton.addEventListener('click', function(e) {
	const expression = screen.textContent;
	handleOperation(expression);
})