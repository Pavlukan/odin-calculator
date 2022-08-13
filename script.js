const currentDisplayValue = document.querySelector(".display-current");
const previousDisplayValue = document.querySelector(".display-history");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const percentageButton = document.querySelector("#percentage");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
let num1 = "";
let num2 = "";
let operator = "";
let result = null;
let waitingForSecondNumber = false;
let isDecimal = false;

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
    return parseFloat(num1) / parseFloat(num2);
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "×":
            return multiply(num1, num2);
        
        case "÷":
            return divide(num1, num2);
        
        default:
            return "OOPS! Something went wrong"
    }
}

function populateDisplay(event) {
    if (!waitingForSecondNumber) {
        num1 += event.target.value;
        currentDisplayValue.textContent = num1;
    } else if (waitingForSecondNumber) {
        num2 += event.target.value;
        currentDisplayValue.textContent = num2;
    }
}

function addDecimal(event) {
    if (isDecimal) {
        return;
    } else {
        currentDisplayValue.textContent += event.target.value;
        isDecimal = true;
    }
}

function clearDisplay() {
    currentDisplayValue.textContent = "";
    previousDisplayValue.textContent = "";
    num1 = "";
    num2 = "";
    operator = "";
    waitingForSecondNumber = false;
}

function deleteCharacter() {
    currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1);
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", (event) => populateDisplay(event));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", (event) => {
        operator = event.target.value;
        isDecimal = false;
        waitingForSecondNumber = true;
    });
});

decimalButton.addEventListener("click", (event) => addDecimal(event));

percentageButton.addEventListener("click", (event) => populateDisplay(event));

clearButton.addEventListener("click", clearDisplay);

deleteButton.addEventListener("click", deleteCharacter);






