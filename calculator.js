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

// Code adapted from: https://rosettacode.org/wiki/Parsing/Shunting-yard_algorithm#JavaScript
function getAbstractSyntaxTree(infix) {
  function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.length = length;
  }

  function push(element) {
    this.dataStore[this.top++] = element;
  }

  function pop() {
    return this.dataStore[--this.top];
  }

  function peek() {
    return this.dataStore[this.top - 1];
  }

  function length() {
    return this.top;
  }

  let s = new Stack();
  let ops = "-+/*^";
  const precedence = { "^": 4, "*": 3, "/": 3, "+": 2, "-": 2 };
  const associativity = {
    "^": "Right",
    "*": "Left",
    "/": "Left",
    "+": "Left",
    "-": "Left",
  };
  let postfix = [];
  let o1, o2;

  for (let i = 0; i < infix.length; i++) {
    let token = infix[i];
    if (token >= "0" && token <= "9") {
      // if token is operand (here limited to 0 <= x <= 9)
      postfix.push(token);
    } else if (ops.indexOf(token) != -1) {
      // if token is an operator
      o1 = token;
      o2 = s.peek();
      while (
        ops.indexOf(o2) != -1 && // while operator token, o2, on top of the stack
        // and o1 is left-associative and its precedence is less than or equal to that of o2
        ((associativity[o1] == "Left" && precedence[o1] <= precedence[o2]) ||
          // the algorithm on wikipedia says: or o1 precedence < o2 precedence, but I think it should be
          // or o1 is right-associative and its precedence is less than that of o2
          (associativity[o1] == "Right" && precedence[o1] < precedence[o2]))
      ) {
        postfix.push(o2); // add o2 to output queue
        s.pop(); // pop o2 of the stack
        o2 = s.peek(); // next round
      }
      s.push(o1); // push o1 onto the stack
    } else if (token == "(") {
      // if token is left parenthesis
      s.push(token); // then push it onto the stack
    } else if (token == ")") {
      // if token is right parenthesis
      while (s.peek() != "(") {
        // until token at top is (
        postfix += s.pop() + " ";
      }
      s.pop(); // pop (, but not onto the output queue
    }
  }
  return postfix.concat(s.dataStore.reverse());
}

function isOperator(character) {
  return character.match(operatorRegex);
}

function isNumber(character) {
  return character.match(numberRegex);
}

function operate(character, operand1, operand2) {
  switch (character) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "÷":
      return operand1 / operand2;
  }
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

function evaluate(expression) {
  let splitOperators = expression.match(/[^\d()]+|[\d.]+/g);
  const expressionAST = getAbstractSyntaxTree(splitOperators);
  console.log(expressionAST);
  const result = evaluatePostFixExpression(expressionAST);
  console.log(result);
  return result;
}

