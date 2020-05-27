const invalid_input = "ERROR";
// Code adapted from: https://rosettacode.org/wiki/Parsing/Shunting-yard_algorithm#JavaScript
function getAbstractSyntaxTree(infix) {
  const outputQueue = [];
  const operatorStack = [];
  const precedence = {
    "/": 3,
    "*": 3,
    "+": 2,
    "-": 2,
  };

  for (const token of infix) {
    if (isNumber(token)) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      var op = operatorStack[operatorStack.length - 1];
      while (isOperator(op) && precedence[token] <= precedence[op]) {
        outputQueue.push(operatorStack.pop());
        op = operatorStack[operatorStack.length - 1];
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  }
  return outputQueue.concat(operatorStack.reverse());
}

function isOperator(character) {
  return "*/+-".indexOf(character) !== -1;
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
    case "/":
      return operand1 / operand2;
  }
}

function evaluatePostFixExpression(abstractSyntaxTree) {
  let stack = [];
  for (const character of abstractSyntaxTree) {
    if (isOperator(character)) {
      let firstElement = stack.pop();
      let secondElement = stack.pop();
      let result = operate(character, secondElement, firstElement);
      stack.push(result);
    } else if (isNumber(character)) {
      stack.push(+character);
    } else {
      return invalid_input;
    }
  }
  return stack.pop();
}

function evaluate(expression) {
  const splitOperators = expression.match(/[^\d()]+|[\(\)]+|[\d.]+/g);
  const expressionAST = getAbstractSyntaxTree(splitOperators);
  console.log(expressionAST);
  const result = evaluatePostFixExpression(expressionAST);
  console.log(result);
  return result;
}
