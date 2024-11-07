let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentInput = "0";
let currentResult = null; // Store the result of the calculation

// Function to update the display
function updateDisplay() {
    console.log("Updating display with:", currentInput);
    document.querySelector(".screen").textContent = currentInput;
}

// Function to log types of key variables
function logTypes() {
    console.log("Types of current variables:");
    console.log("firstNumber:", firstNumber, "Type:", typeof firstNumber);
    console.log("secondNumber:", secondNumber, "Type:", typeof secondNumber);
    console.log("operator:", operator, "Type:", typeof operator);
    console.log("currentInput:", currentInput, "Type:", typeof currentInput);
    console.log("currentResult:", currentResult, "Type:", typeof currentResult);
}

// Log the action of converting a string to a float
function logConversion(fromValue, toValue, toType) {
    console.log(`Converting '${fromValue}' (${typeof fromValue}) to ${toValue} (${toType})`);
}

// Handle number button clicks
function handleNumber(number) {
    console.log("Number button clicked:", number);
    logTypes();

    // Reset the input if it's showing 0 or Error
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = number.toString();
    } else {
        currentInput += number.toString();
    }

    console.log("Current input after number:", currentInput);
    updateDisplay();
}

// Handle the '00' button click (double zero)
function handleDoubleZero() {
    console.log("00 button clicked");
    logTypes();

    currentInput = currentInput === "0" || currentInput === "Error" ? "0" : currentInput + "00";
    console.log("Current input after '00':", currentInput);
    updateDisplay();
}

// Handle decimal button click
function handleDecimal() {
    console.log("Decimal button clicked");
    logTypes();

    if (!currentInput.includes(".")) {
        currentInput += ".";
        console.log("Current input after decimal:", currentInput);
        updateDisplay();
    }
}

// Handle operator button clicks
function handleOperator(clickedOperator) {
    console.log("Operator button clicked:", clickedOperator);
    logTypes();

    // If an operation has been performed already, use the result as the first number
    if (currentResult !== null) {
        firstNumber = currentResult;
        currentResult = null;
        console.log("Resetting result. Using previous result as firstNumber:", firstNumber);
    }

    if (firstNumber === null) {
        operator = clickedOperator;
        firstNumber = parseFloat(currentInput);
        logConversion(currentInput, firstNumber, typeof firstNumber);
        console.log("First number set to:", firstNumber);
        currentInput = "0";  // Reset input after first number
        updateDisplay();
    } else {
        secondNumber = parseFloat(currentInput);
        logConversion(currentInput, secondNumber, typeof secondNumber);
        console.log("Second number set to:", secondNumber);
        calculateResult();  // Calculate result when the second number is provided
    }
}

// Perform calculations based on the operator
function calculateResult() {
    console.log("Calculating result...");
    logTypes();

    console.log("Values used in calculation:");
    console.log("firstNumber (before calculation):", firstNumber);
    console.log("secondNumber (before calculation):", secondNumber);
    console.log("operator (before calculation):", operator);
    console.log("currentInput (before calculation):", currentInput);
    console.log("currentResult (before calculation):", currentResult);

    if (operator === "÷" && secondNumber === 0) {
        currentInput = "Error";
        firstNumber = null;  // Reset first number on error
        secondNumber = null; // Reset second number on error
        operator = null;     // Reset operator on error
        console.log("Error: Division by zero");
    } else {
        currentResult = performOperation(firstNumber, secondNumber, operator);
        currentInput = currentResult.toString(); // Convert result to string for display
    }

    console.log("Result after calculation:", currentInput);
    updateDisplay();
}

// Perform the operation based on the operator
function performOperation(num1, num2, operator) {
    console.log("Performing operation:", operator);
    console.log(`First number (${typeof num1}):`, num1);
    console.log(`Second number (${typeof num2}):`, num2);

    switch (operator) {
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        case "+":
            return add(num1, num2);
        case "−":
            return subtract(num1, num2);
        default:
            console.log("Unknown operator:", operator);
            return "Error";
    }
}

function add(num1, num2) {
    console.log("Adding:", num1, "+", num2);
    return num1 + num2;
}

function subtract(num1, num2) {
    console.log("Subtracting:", num1, "-", num2);
    return num1 - num2;
}

function multiply(num1, num2) {
    console.log("Multiplying:", num1, "×", num2);
    return num1 * num2;
}

function divide(num1, num2) {
    console.log("Dividing:", num1, "÷", num2);
    if (num2 === 0) {
        return "Error";
    }
    return num1 / num2;
}

function handleNegative() {
    console.log("Negative sign button clicked");
    logTypes();

    if (currentInput !== "Error") {
        currentInput = currentInput.startsWith("-") ? currentInput.substring(1) : "-" + currentInput;
    }

    console.log("Current input after negative:", currentInput);
    updateDisplay();
}

function handleEquals() {
    console.log("Equals button clicked");
    logTypes();

    if (firstNumber !== null && operator !== null && currentInput !== "Error") {
        secondNumber = parseFloat(currentInput);
        logConversion(currentInput, secondNumber, typeof secondNumber);
        console.log("Second number set to:", secondNumber);
        calculateResult();

        // After calculation, store the result for potential future operations
        firstNumber = currentResult; // Store result for potential future calculations
        secondNumber = null;
        operator = null;
        console.log("Operator and secondNumber reset:", { operator, secondNumber });
    } else if (currentInput === "Error") {
        currentInput = "0";
        firstNumber = null; // Reset first number after error
        operator = null; // Reset operator after error
        updateDisplay();
    }

    console.log("After equals, firstNumber:", firstNumber, "currentInput:", currentInput);
}

// Reset calculator to initial state
function clearAll() {
    console.log("Clear All (CA) button clicked");

    firstNumber = null;
    secondNumber = null;
    operator = null;
    currentInput = "0";
    currentResult = null; // Reset the result as well

    updateDisplay();
}

// Handle 'Clear All' button
function clearAllHandler() {
    clearAll();
}

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(`Button clicked: ${e.target.textContent}`);
        logTypes();

        if (e.target.classList.contains("number-button")) {
            handleNumber(e.target.textContent);
        } else if (e.target.classList.contains("decimal")) {
            handleDecimal();
        } else if (e.target.classList.contains("operator-button")) {
            handleOperator(e.target.textContent);
        } else if (e.target.classList.contains("equals")) {
            handleEquals();
        } else if (e.target.classList.contains("clear")) {
            clearAll();
        } else if (e.target.classList.contains("double-zero")) {
            handleDoubleZero();
        } else if (e.target.classList.contains("clear-all")) {
            clearAllHandler();  // Call the clearAllHandler function
        }
    });
});

// Initialize the display
updateDisplay();
