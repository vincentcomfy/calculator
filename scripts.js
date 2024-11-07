let currentInput = "0"; // The current number being input
let firstNumber = null; // The first number in the operation
let operator = null; // The operator used (+, -, ×, ÷)
let secondNumber = null; // The second number in the operation
const display = document.querySelector(".screen"); // The display element
const MAX_LENGTH = 25; // Max length of the number
const MAX_VALUE = "9999999999999999999999999"; // Max number allowed (value limit)

// Update the display with the current input
function updateDisplay() {
    if (currentInput.length > MAX_LENGTH) {
        currentInput = currentInput.slice(0, MAX_LENGTH); // Truncate the input if it's too long
    }

    if (BigInt(currentInput) > BigInt(MAX_VALUE)) {
        currentInput = MAX_VALUE; // Set to the max value
    }

    console.log("Updating display with:", currentInput); // Log display update
    display.textContent = currentInput; // Update the display
}

// Initialize the display when the page loads
updateDisplay(); // Call updateDisplay to initialize the display with "0"

// Handling number button clicks
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("Number button clicked:", button.textContent); // Log number button click
        handleNumber(button.textContent);
    });
});

// Handling 00 button click
const zeroZeroButton = document.querySelector(".zero-zero");
zeroZeroButton.addEventListener("click", () => {
    console.log("00 button clicked"); // Log 00 button click
    handleNumber("00");
});

// Function to handle number input
function handleNumber(number) {
    console.log("Handling number:", number); // Log number input

    // If we are at the initial "0" and a number is clicked, replace "0" with the clicked number
    if (currentInput === "0" && number !== "00") {
        currentInput = number; 
    } else {
        currentInput += number; // Otherwise, append the number
    }

    // If the current input exceeds MAX_LENGTH, truncate it
    if (currentInput.length > MAX_LENGTH) {
        currentInput = currentInput.slice(0, MAX_LENGTH);
    }

    console.log("Current input after number:", currentInput); // Log the input after handling
    updateDisplay(); // Update the display after modifying the input
}

// Handling decimal button click
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
    console.log("Decimal button clicked"); // Log decimal button click
    if (!currentInput.includes(".")) {
        currentInput += "."; // Add decimal if not already present
        updateDisplay();
    }
});

// Handling operator button clicks
const addButton = document.querySelector(".add");
const subtractButton = document.querySelector(".subtract");
const multiplyButton = document.querySelector(".multiply");
const divideButton = document.querySelector(".divide");

addButton.addEventListener("click", () => {
    console.log("Add operator clicked");
    handleOperator("add");
});
subtractButton.addEventListener("click", () => {
    console.log("Subtract operator clicked");
    handleOperator("subtract");
});
multiplyButton.addEventListener("click", () => {
    console.log("Multiply operator clicked");
    handleOperator("multiply");
});
divideButton.addEventListener("click", () => {
    console.log("Divide operator clicked");
    handleOperator("divide");
});

// Function to handle operator input
function handleOperator(operatorSelected) {
    console.log("Operator selected:", operatorSelected); // Log operator selection

    // If there's already a number in firstNumber and an operator is selected, calculate result first
    if (firstNumber !== null && operator !== null) {
        secondNumber = parseFloat(currentInput); // Convert current input to a number
        console.log("Calculating result due to new operator selection..."); // Log before calculating
        calculateResult(); // Perform the calculation
    }

    // Set the operator and store the first number (if it's not already set)
    operator = operatorSelected; // Set the operator correctly
    firstNumber = parseFloat(currentInput); // Store the first number
    console.log("First number after operator selection:", firstNumber); // Log first number after selection
    currentInput = "0"; // Reset the display for the second number
    updateDisplay(); // Update the display after operator input
}

// Function to calculate the result based on the operator
function calculateResult() {
    console.log("Calculating result..."); // Log before calculation

    // Ensure firstNumber and secondNumber are valid numbers
    if (firstNumber !== null && secondNumber !== null && operator !== null) {
        let result;

        // Perform the operation based on the selected operator
        switch (operator) {
            case "add":
                result = firstNumber + secondNumber;
                break;
            case "subtract":
                result = firstNumber - secondNumber;
                break;
            case "multiply":
                result = firstNumber * secondNumber;
                break;
            case "divide":
                result = firstNumber / secondNumber;
                break;
            default:
                result = "Error"; // Handle invalid operator
        }

        console.log("Raw result:", result); // Log raw result

        // Round the result to 2 decimal places
        if (typeof result === "number") {
            result = result.toFixed(2); // Round to 2 decimals
        }

        console.log("Result after rounding:", result); // Log rounded result
        
        currentInput = result.toString(); // Set the result as the new current input
        firstNumber = null; // Reset the first number for next calculation
        secondNumber = null; // Reset the second number for next calculation
        operator = null; // Reset the operator for next calculation

        updateDisplay(); // Update the display with the result
    } else {
        console.log("Invalid calculation state. Displaying error.");
        currentInput = "Error"; // In case of invalid state
        updateDisplay(); // Update display to show error
    }
}
