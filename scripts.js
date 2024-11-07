let currentInput = "0"; // Initial value for the display
const display = document.querySelector(".screen"); // The display element
const MAX_LENGTH = 25; // Max length of the number (since you mentioned 9999999999999999999999999 as the max)
const MAX_VALUE = "9999999999999999999999999"; // Max number allowed (value limit)

function updateDisplay() {
    // Check if the current input exceeds the maximum length
    if (currentInput.length > MAX_LENGTH) {
        currentInput = currentInput.slice(0, MAX_LENGTH); // Truncate the input if it's too long
    }

    // Check if the current input exceeds the max value (e.g., if the user entered 10000000000000000000000000)
    if (BigInt(currentInput) > BigInt(MAX_VALUE)) {
        currentInput = MAX_VALUE; // Set to the max value
    }

    display.textContent = currentInput; // Update the display
}

// Initialize the display when the page loads
updateDisplay(); // Call updateDisplay to initialize the display with "0"

// Handling number button clicks
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleNumber(button.textContent);
    });
});

// Handling 00 button click
const zeroZeroButton = document.querySelector(".zero-zero");
zeroZeroButton.addEventListener("click", () => {
    handleNumber("00");
});

// Function to handle number input
function handleNumber(number) {
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
    // Update the display after modifying the input
    updateDisplay();
}

// Handling decimal button click
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += "."; // Add decimal if not already present
        updateDisplay();
    }
});
