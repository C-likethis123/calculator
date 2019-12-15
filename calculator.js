const invalid_input = "not valid!";

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
	if (operator == "+") {
		return add(op1, op2);
	} else if (operator == "-") {
		return subtract(op1, op2);
	} else if (operator == "*") {
		return multiply(op1, op2);
	} else if (operator == "/") {
		return divide(op1, op2);
	}
}