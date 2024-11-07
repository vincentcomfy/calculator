const display = document.querySelector('.screen');
let firstNumber = null;
let operator = null;
let currentNumber = '';

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
  updateDisplay();
}

function handleNumber(number) {
  console.log('Handling number:', number);
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
  
  if (firstNumber !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber);
    console.log('Performing operation:', firstNumber, operatorSymbol, secondNumber);

    const result = performOperation(firstNumber, secondNumber, operatorSymbol);
    firstNumber = result;
    currentNumber = result.toString();
    updateDisplay();
  } else {
    firstNumber = parseFloat(currentNumber);
  }

  operator = operatorSymbol;
  currentNumber = '';
}

function performOperation(num1, num2, operatorSymbol) {
  console.log('Performing operation:', num1, operatorSymbol, num2);
  return operations[operatorSymbol](num1, num2);
}

function handleEquals() {
  console.log('Handling equals');
  if (firstNumber !== null && operator !== null && currentNumber !== '') {
    const secondNumber = parseFloat(currentNumber);
    console.log('Performing operation:', firstNumber, operator, secondNumber);
    const result = performOperation(firstNumber, secondNumber, operator);
    currentNumber = result.toString();
    firstNumber = result; // Store the result as the first number for the next operation
    operator = null; // Reset operator after equals
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
      const operatorClass = button.textContent; // Get the text content instead of class
      handleOperator(operatorClass); // Pass the operator directly
    }
  });
});

updateDisplay();
