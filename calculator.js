const invalid_input = "not valid!";

const screen = document.querySelector('.screen');
const listOfButtons = document.querySelectorAll('button');
let valueInMemory = [];
let tempOperand1 = null;
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

function deleteCharacter() {
	let currentDisplay = screen.textContent;
	currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
	screen.textContent = currentDisplay;
}

function handleOperation(operation) {
	/*case 1: it is empty. i put the first operand and operator in memory. 
	--> valueInMemory.length == 0, tempOperand == null

	case 2: there are two operands. i evaluate both operands and store them in memory. 
	-
	case 3: there is a previous result, but no second operand. i press add. 

	what i can do: add a 'stack' to store the operands. if there are two operators, add them both and store the result to a separate variable. 
	clear the operators. 

	if there are nothing in the 'stack' when there is an operator, check the variable. 


	*/
	if (valueInMemory.length == 0) {
		if (tempOperand1 == null) {
			const valueOnScreen = Number(screen.textContent);
			valueInMemory.push(valueOnScreen);
			operationInMemory = operation;
		} else {
			//when there is a previous evaluated value, add that to the valueInMemory array.
			valueInMemory.push(tempOperand1);
			operationInMemory = operation;
		}
	} else if (valueInMemory.length == 1) {
		//if there is an operand in memory, evaluate that expression
		const valueOnScreen = Number(screen.textContent);
		let result = operate(operation, valueInMemory.pop(), valueOnScreen);
		displayValue(result);
		tempOperand1 = result;
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
	handleOperation(operationInMemory);
	operationInMemory = null;
})