let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentInput = "0";

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
}

// Handle number button clicks
function handleNumber(number) {
    console.log("Number button clicked:", number);

    // Log the types before updating the number
    logTypes();

    // If the display is showing "0" or "Error", reset it before appending the number
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = number.toString();
    } else {
        currentInput += number.toString();
    }

    console.log("Current input after number:", currentInput); // Log the updated number
    updateDisplay();
}

// Handle the '00' button click (double zero)
function handleDoubleZero() {
    console.log("00 button clicked");

    // Log types before handling '00' input
    logTypes();

    // Only append "00" if the current input is not "0" or "Error"
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = "0"; // Reset to "0" if it's already "0" or "Error"
    } else {
        currentInput += "00"; // Otherwise, append "00"
    }

    console.log("Current input after '00':", currentInput);
    updateDisplay();
}

// Handle decimal button click
function handleDecimal() {
    console.log("Decimal button clicked");

    // Log types before performing any operation
    logTypes();

    // Only add a decimal if one is not already present in the current input
    if (!currentInput.includes(".")) {
        currentInput += ".";
        console.log("Current input after decimal:", currentInput); // Log updated number with decimal
        updateDisplay();
    }
}

// Handle operator button clicks
function handleOperator(clickedOperator) {
    console.log("Operator button clicked:", clickedOperator);

    // Log types before proceeding with operator action
    logTypes();

    // If no operator is set, assign the operator and the first number
    if (firstNumber === null) {
        operator = clickedOperator;  // Set operator as the actual operator symbol (+, −, ×, ÷)
        firstNumber = parseFloat(currentInput);  // Store the first number
        console.log("First number set to:", firstNumber);
        currentInput = "0";  // Reset the input after setting first number
        updateDisplay();
    } else {
        // If operator is already set, calculate with the current operator
        secondNumber = parseFloat(currentInput);
        console.log("Second number set to:", secondNumber);
        calculateResult();
    }
}

// Operator functions (separate from calculateResult)
function add() {
    return firstNumber + secondNumber;
}

function subtract() {
    return firstNumber - secondNumber;
}

function multiply() {
    return firstNumber * secondNumber;
}

function divide() {
    if (secondNumber === 0) {
        return "Error"; // Prevent division by zero
    }
    return firstNumber / secondNumber;
}

// Perform the calculation based on operator
function calculateResult() {
    console.log("Calculating result...");

    // Log types of all variables involved in the calculation
    logTypes();

    // Handle division by zero
    if (operator === "÷" && secondNumber === 0) {
        currentInput = "Error";
    } else {
        // Perform calculation based on the operator
        switch (operator) {
            case "×":
                currentInput = (firstNumber * secondNumber).toString();
                break;
            case "÷":
                currentInput = (firstNumber / secondNumber).toString();
                break;
            case "+":
                currentInput = (firstNumber + secondNumber).toString();
                break;
            case "−":
                currentInput = (firstNumber - secondNumber).toString();
                break;
            default:
                currentInput = "Error";
                break;
        }

        // If result is very small or negative, show it as is
        if (currentInput === "NaN" || currentInput === "Infinity") {
            currentInput = "Error";
        }
    }

    console.log("Result:", currentInput);
    updateDisplay();
}

// Handle negative sign button
function handleNegative() {
    console.log("Negative sign button clicked");

    // Check if the current input is a valid number and not an "Error"
    if (currentInput !== "Error") {
        if (currentInput.startsWith("-")) {
            // Remove the negative sign if it already exists
            currentInput = currentInput.substring(1);
        } else {
            // Add the negative sign if it doesn't exist
            currentInput = "-" + currentInput;
        }
    }
    
    console.log("Current input after negative: ", currentInput);
    updateDisplay();
}

// Handle the equals button
function handleEquals() {
    console.log("Equals button clicked");

    // Log types before handling equals
    logTypes();

    // If we have both firstNumber and operator, calculate the result
    if (firstNumber !== null && operator !== null && currentInput !== "Error") {
        secondNumber = parseFloat(currentInput);
        console.log("Second number set to:", secondNumber);

        calculateResult();

        // Reset secondNumber after calculation to allow new calculations
        secondNumber = null;
    } else {
        currentInput = "Error";
        updateDisplay();
    }
}

// Handle the Clear All button (CA) - Reset everything
function clearAll() {
    console.log("Clear All (CA) button clicked");

    firstNumber = null;
    secondNumber = null;
    operator = null;
    currentInput = "0";

    updateDisplay();
}

// Handle all button clicks
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(`Button clicked: ${e.target.textContent}`);

        // Log types each time a button is clicked
        logTypes();

        if (e.target.classList.contains("number-button")) {
            handleNumber(e.target.textContent);
        } else if (e.target.classList.contains("decimal")) {
            handleDecimal();
        } else if (e.target.classList.contains("operator-button")) {
            handleOperator(e.target.textContent); // Use the operator symbol directly
        } else if (e.target.classList.contains("equals")) {
            handleEquals();
        } else if (e.target.classList.contains("clear")) {
            firstNumber = null;
            secondNumber = null;
            operator = null;
            currentInput = "0";
            updateDisplay();
        } else if (e.target.classList.contains("double-zero")) {
            handleDoubleZero(); // Handle the "00" button
        } else if (e.target.classList.contains("clear-all")) {
            clearAll(); // Clear All button functionality
        }
    });
});

// Initialize the display
updateDisplay();
