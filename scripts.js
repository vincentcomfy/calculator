const display = document.querySelector('.screen');
let firstNumber = null;
let operator = null;
let currentNumber = '';
let operatorPending = false; // Flag to track if the operator is pending

// Map the operator symbols to the ones used in the operations object
const operatorMapping = {
  '×': '*',
  '÷': '/',
  '+': '+',
  '−': '-',
  '-': '-',
};

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
  operatorPending = false; // Reset the pending operator flag
  updateDisplay();
}

function handleNumber(number) {
  console.log('Handling number:', number);
  if (operatorPending) {
    // If an operator was just pressed, reset the current number
    currentNumber = '';
    operatorPending = false;
  }
  currentNumber += number;
  updateDisplay();
}

function handleDecimal() {
  console.log('Handling decimal point');
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    updateDisplay();
  }
}

function handleOperator(operatorClass) {
  console.log('Handling operator:', operatorClass);

  const operatorSymbol = operatorMapping[operatorClass.trim()] || operatorClass.trim();

  // If there's already a number and an operator, perform the operation
  if (firstNumber !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber); // Convert currentNumber to number
    console.log('Performing operation:', firstNumber, operatorSymbol, secondNumber);

    // Perform the operation directly using the operations object
    const result = operations[operatorSymbol](firstNumber, secondNumber);
    firstNumber = result; // Set the result as the first number for the next operation
    currentNumber = result.toString(); // Update current number to display the result
    operatorPending = true; // Flag that the operator is pending for the next number
    updateDisplay();
  } else if (firstNumber !== null && currentNumber === '') {
    // If an operator is pressed after a result, just change the operator
    operator = operatorSymbol;
    operatorPending = true; // Still waiting for the next number
  } else {
    // If there's no previous number, start a new calculation
    firstNumber = parseFloat(currentNumber) || 0;
    operator = operatorSymbol;
    operatorPending = true;
    currentNumber = '';
  }
}

function handleEquals() {
  console.log('Handling equals');
  if (firstNumber !== null && operator !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber); // Convert currentNumber to number
    console.log('Performing operation:', firstNumber, operator, secondNumber);
    
    // Perform the operation directly using the operations object
    const result = operations[operator](firstNumber, secondNumber);
    currentNumber = result.toString(); // Update current number with the result
    firstNumber = null; // Reset firstNumber after equals
    operator = null; // Reset operator after equals
    operatorPending = false; // Reset pending operator flag
    updateDisplay();
  } else {
    // If no valid operation, reset the calculator after equals
    firstNumber = null;
    operator = null;
    currentNumber = '';
    operatorPending = false;
    updateDisplay();
  }
}


const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    console.log('Button clicked:', buttonText);

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
      handleEquals(); // Use handleEquals directly for equals
    } else {
      handleOperator(buttonText); // Handle operators
    }
  });
});

updateDisplay();
