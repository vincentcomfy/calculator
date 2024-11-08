const display = document.querySelector('.screen');
let firstNumber = null;
let operator = null;
let currentNumber = '';
let operatorPending = false;

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => (num2 === 0 ? 'Error: Division by zero' : num1 / num2),
};

function updateDisplay() {
  console.log('Updating display:', currentNumber);
  display.textContent = currentNumber || '0';
}

function clearAll() {
  console.log('Clearing all');
  firstNumber = null;
  operator = null;
  currentNumber = '';
  operatorPending = false;
  updateDisplay();
}

function handleNumber(number) {
  console.log('Number pressed:', number);
  if (operatorPending) {
    currentNumber = '';
    operatorPending = false;
  }
  currentNumber += number;
  updateDisplay();
}

function handleDecimal() {
  console.log('Decimal pressed');
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    updateDisplay();
  }
}

function handleOperator(operatorSymbol) {
  // Ensure the operator is a valid character for our operations
  operatorSymbol = operatorSymbol.replace('−', '-');
  console.log('Operator received:', operatorSymbol);

  if (operatorSymbol === '-' && (currentNumber === '' || operatorPending)) {
    // Allow '-' to be entered as a negative sign for currentNumber
    console.log('Treating as negative sign');
    currentNumber = '-' + currentNumber;
    operatorPending = false;
    updateDisplay();
    return;
  }

  if (firstNumber !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber);
    const result = operations[operator](firstNumber, secondNumber);
    console.log(`Calculating: ${firstNumber} ${operator} ${secondNumber} = ${result}`);
    firstNumber = parseFloat(result.toFixed(3));
    currentNumber = firstNumber.toString();
    operatorPending = true;
    updateDisplay();
  } else if (firstNumber !== null && currentNumber === '') {
    operator = operatorSymbol;
    console.log('Updating operator without calculation:', operator);
    operatorPending = true;
  } else {
    firstNumber = parseFloat(currentNumber) || 0;
    operator = operatorSymbol;
    console.log('Setting first number and operator:', firstNumber, operator);
    operatorPending = true;
    currentNumber = '';
  }
}

function handleEquals() {
  console.log('Equals pressed');
  if (firstNumber !== null && operator !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber);
    console.log(`Performing operation: ${firstNumber} ${operator} ${secondNumber}`);
    const result = operations[operator](firstNumber, secondNumber);
    currentNumber = parseFloat(result.toFixed(3)).toString();
    console.log('Result:', currentNumber);
    firstNumber = null;
    operator = null;
    operatorPending = false;
    updateDisplay();
  } else {
    console.log('Incomplete expression, clearing all');
    clearAll();
  }
}

function handleBackspace() {
  console.log('Backspace pressed');
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === '') currentNumber = '0';
  updateDisplay();
}

window.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  if (e.key >= '0' && e.key <= '9') {
    handleNumber(e.key);
  } else if (e.key === '.') {
    handleDecimal();
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEquals();
  } else if (e.key === 'Backspace') {
    handleBackspace();
  } else if (e.key === 'Escape') {
    clearAll();
  }
});

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    if (buttonText >= '0' && buttonText <= '9') {
      handleNumber(buttonText);
    } else if (buttonText === '.') {
      handleDecimal();
    } else if (buttonText === 'C') {
      currentNumber = '';
      updateDisplay();
    } else if (buttonText === 'CA') {
      clearAll();
    } else if (buttonText === '=') {
      handleEquals();
    } else if (buttonText === '←') {
      handleBackspace();
    } else {
      handleOperator(buttonText);
    }
  });
});

updateDisplay();
