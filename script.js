const currentDisplayValue = document.querySelector(".display-current");
const previousDisplayValue = document.querySelector(".display-history");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const percentageButton = document.querySelector("#percentage");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
let isDecimal = false;
let num1 = "";
let num2 = "";
let result = null;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
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
    currentDisplayValue.textContent += event.target.value;
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
}

function deleteCharacter() {
    currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1);
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", (event) => populateDisplay(event));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", (event) => {
        populateDisplay(event);
        isDecimal = false;
    });
});

decimalButton.addEventListener("click", (event) => addDecimal(event));

percentageButton.addEventListener("click", (event) => populateDisplay(event));

clearButton.addEventListener("click", clearDisplay);

deleteButton.addEventListener("click", deleteCharacter);






