const buttons = document.querySelectorAll("button");
const displayOperations = document.querySelector("#displayOperations");
const displayResults = document.querySelector("#displayResults");

let firstNumber = "";
let secondNumber = "";
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            if (!operator) {
                if (value === "." && firstNumber.includes(".")) {
                    return;
                }

                firstNumber += value;
                updateOpsDisplay();
        
            }
            else {
                if (value === "." && secondNumber.includes(".")) {
                    return;
                }

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
        else if (value === "Clear") {
            firstNumber = "";
            secondNumber = "";
            operator = null;
            updateOpsDisplay();
            updateResultDisplay("");
        }
        else if (value === "⌫") {
            // if user is typing firstNumber
            if (secondNumber) {
                secondNumber = secondNumber.slice(0, -1);
            }
            // if typing secondNumber
            else if (operator) {
                operator = null;
            }
            else if (firstNumber) {
                firstNumber = firstNumber.slice(0, -1);
            }

            updateOpsDisplay();
        }
        else if (value === "+/-") {
            if (secondNumber) {
                secondNumber = toggleSign(secondNumber);
            }
            else if (firstNumber) {
                firstNumber = toggleSign(firstNumber);
            }

            updateOpsDisplay();
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
    console.log(typeof(result));

    if (result === null) {
        return;
    }

    let roundedResult = parseFloat(result.toFixed(7));
    firstNumber = roundedResult.toString();
    secondNumber = "";
    updateResultDisplay(roundedResult);
}

function toggleSign(number) {
    return number * -1;
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