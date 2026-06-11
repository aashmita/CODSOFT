// Get hold of the display input element
const display = document.getElementById('display');
let currentInput = '';

// Appends numbers or operator strings when buttons are pressed
function appendValue(value) {
    // Prevent starting expression inputs with multiple operators
    if (currentInput === '' && ['+', '-'].includes(value)) {
        currentInput = value;
        display.value = currentInput;
        return;
    }
    
    // Wipe zero placeholder cleanly if entering fresh inputs
    if (display.value === '0') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

// Empties the calculation state back to fresh default
function clearDisplay() {
    currentInput = '';
    display.value = '0';
}

// Evaluates mathematical string input string securely via calculation logic
function calculate() {
    try {
        // Evaluate expression if not empty
        if (currentInput !== '') {
            // Evaluates math syntax seamlessly using Function construction safely
            const result = new Function(`return ${currentInput}`)();
            
            // Check for edge cases like dividing by zero
            if (!isFinite(result)) {
                display.value = "Error";
                currentInput = '';
            } else {
                display.value = result;
                currentInput = result.toString(); // Allows ongoing operations with result
            }
        }
    } catch (error) {
        display.value = "Error";
        currentInput = '';
    }
}