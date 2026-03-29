const buttons = document.querySelectorAll("button");
const displayOperations = document.querySelector("#displayOperations");
const displayResults = document.querySelector("#displayResults");

let firstNumber = "";
let secondNumber = "";
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            if (!operator) {
                firstNumber += value;
                updateOpsDisplay();
            }
            else {
                secondNumber += value;
                updateOpsDisplay();
            }
        }
        else if (value === "=") {
            if (!firstNumber || !operator || !secondNumber) {
                return;
            }

            compute();
            operator = null;
        }
        else if (value === "clear") {
            firstNumber = "";
            secondNumber = "";
            operator = null;
            updateOpsDisplay();
            updateResultDisplay("");
        }
        else {
            if (secondNumber) {
                compute();
            }

            operator = value;
            updateOpsDisplay();
        }
    });
});

function updateOpsDisplay() {
    displayOperations.textContent =
        `${firstNumber} ${operator || ""} ${secondNumber}`;
}

function updateResultDisplay(result) {
    displayResults.textContent = result;
}

function compute() {
    const result = operate(operator, firstNumber, secondNumber);

    if (result === null) {
        return;
    }

    firstNumber = result.toString();
    secondNumber = "";
    updateResultDisplay(result);
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "×": return num1 * num2;
        case "÷":
            if (num2 === 0) {
                alert("Cannot divide by zero");
                return null;
            }
            return num1 / num2;
    }
}