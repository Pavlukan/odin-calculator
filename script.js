// select objects
const currentDisplayValue = document.querySelector(".display-current");
const previousDisplayValue = document.querySelector(".display-history");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const percentageButton = document.querySelector("#percentage");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

// create global variables
let num1 = "";
let num2 = "";
let operator = "";
let result = null;
let waitingForSecondNumber = false;

// basic arithmetic functions
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    if (num2 === "0") { // Doesn't allow the user to divide by zero
        return "Are you mocking me?";
    }
    return parseFloat(num1) / parseFloat(num2);
}

function modulo(num1, num2) {
    if (num2 === "0") {
        return "Are you mocking me?";
    }
    return parseFloat(num1) % parseFloat(num2);
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);
        
        case "/":
            return divide(num1, num2);
        
        case "%":
            return modulo(num1, num2);
        
        default:
            return "OOPS! Something went wrong"
    }
}

function evaluate() {
    if (currentDisplayValue.textContent === "") { // prevents user from running calculation on an empty expression
        return;
    } else if (num2 === "" || num1 === "") { // prevents user from running calculation only on a single number
        return;
    } else if (num1 === "Are you mocking me?") { // prevents user from being too smart and operating on "Are you mocking me?"
        return clearDisplay();
    } else if (currentDisplayValue.textContent) {
        result = operate(num1, operator, num2);
        currentDisplayValue.textContent = result;
        clearGlobalVariables();
        num1 = result;
    }
}

// function which populates the display with numbers
function populateDisplay(value) {
    if (!waitingForSecondNumber && value <= 9 && value >= 0) {
        num1 += value;
        currentDisplayValue.textContent = num1;
    } else if (waitingForSecondNumber && value <= 9 && value >= 0) {
        num2 += value;
        currentDisplayValue.textContent = num2;
    }
}

// function which adds a decimal point
function addDecimal() {
    if(!waitingForSecondNumber && num1.toString().includes(".") === false) {
        num1 += "."
        currentDisplayValue.textContent = num1;
    } else if (waitingForSecondNumber && num2.toString().includes(".") === false) {
        num2 += "."
        currentDisplayValue.textContent = num2;
    } else {
        return;
    }
}

// function which clears all the global variables to their initial state
function clearGlobalVariables() {
    num1 = "";
    num2 = "";
    operator = "";
    waitingForSecondNumber = false;
}

// function which clears the display
function clearDisplay() {
    currentDisplayValue.textContent = "";
    previousDisplayValue.textContent = "";
    clearGlobalVariables();
}

// this function saves the operator and refreshes the values of two of the global variables
function saveOperator(value) {
    operator = value;
    waitingForSecondNumber = true;
}

// function which removes the last character
function deleteCharacter(event) {
    if (!waitingForSecondNumber) {
        num1 = num1.toString().slice(0, -1);
        currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1);
    } else if (waitingForSecondNumber) {
        num2 = num2.toString().slice(0, -1);
        currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1);
    }
}

// event listeners for buttons
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", (event) => populateDisplay(event.target.value));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", (event) => {
        switch (operator) { // this block of code is responsible for chaining operations
            case "+":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = add(num1, num2);
                saveOperator(event.target.value);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "-":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = subtract(num1, num2);
                saveOperator(event.target.value);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "*":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = multiply(num1, num2);
                saveOperator(event.target.value);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "/":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = divide(num1, num2);
                saveOperator(event.target.value);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "%":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = modulo(num1, num2);
                saveOperator(event.target.value);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            default: 
                if (num1 === "") {
                    break;
                }
                saveOperator(event.target.value);
                break;
        }
    });
});

equalButton.addEventListener("click", () => {
    evaluate();
});

decimalButton.addEventListener("click", (event) => addDecimal(event));

clearButton.addEventListener("click", clearDisplay);

deleteButton.addEventListener("click", deleteCharacter);

window.addEventListener("keydown", (event) => keyboardHandlers(event));


// keyboard support
function keyboardHandlers(event) {
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        switch (operator) { // this block of code is responsible for chaining operations
            case "+":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = add(num1, num2);
                saveOperator(event.key);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "-":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = subtract(num1, num2);
                saveOperator(event.key);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "*":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = multiply(num1, num2);
                saveOperator(event.key);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "/":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = divide(num1, num2);
                saveOperator(event.key);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            case "%":
                if (num1 === "" || num2 === "") {
                    break;
                }
                num1 = modulo(num1, num2);
                saveOperator(event.key);
                num2 = "";
                currentDisplayValue.textContent = num1;
                break;

            default: 
                if (num1 === "") {
                    break;
                }
                saveOperator(event.key);
                break;
        }
    } else if (event.key === ".") {
        addDecimal();
    } else if (event.key === "c" || event.key === "C") {
        clearDisplay();
    } else if (event.key === "Backspace") {
        deleteCharacter();
    } else if (event.key === "=" || event.key === "Enter") {
        evaluate();
    } else {
        populateDisplay(event.key);
    }
}






