let displayPrevious = document.querySelector(".previousNum");
let displayCurrent = document.querySelector(".currentNum");
const numBtns = document.querySelectorAll(".number");
const operatorbtns = document.querySelectorAll(".operator");
const clearDisplay = document.querySelector(".clear");
const deleteDisplay = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");

window.addEventListener('keydown', handleKeyPress)

let previousValue = "";
let currentValue = "";
let operatorValue = "";

clearDisplay.addEventListener("click", clearCalculator);
deleteDisplay.addEventListener("click", deleteLastElement);

decimalBtn.addEventListener("click", () => {
    addDecimal();
})

equalsBtn.addEventListener("click", () => {
    if (currentValue != "" && previousValue != "") {
        calculate();
    }
})


numBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});


function handleNumber(number) {
    if (previousValue !== "" && currentValue !== "" && operatorValue === "") {
        previousValue = "";
        displayCurrent.textContent = currentValue
    }
    if (currentValue.length <= 13) {
        currentValue += number;
        displayCurrent.textContent = currentValue;
    }
}

operatorbtns.forEach((opr) => {
    opr.addEventListener("click", (e) => {
        handleOperator(e.target.textContent)
    });
});

function handleOperator(opr) {
    if (previousValue === "") {
        previousValue = currentValue;
        operatorCheck(opr);
    } else if (currentValue === "") {
        operatorCheck(opr);
    } else {
        calculate();
        operatorValue = opr;
        displayCurrent.textContent = "0";
        displayPrevious.textContent = previousValue + " " + operatorValue;
    }
}


function operatorCheck(text) {
    operatorValue = text;
    displayPrevious.textContent = previousValue + " " + operatorValue;
    displayCurrent.textContent = "0";
    currentValue = "";
}


function clearCalculator() {
    currentValue = "";
    previousValue = "";
    operatorValue = "";

    displayPrevious.textContent = "";
    displayCurrent.textContent = "0";
}

function deleteLastElement() {
    if (currentValue != "") {
        currentValue = currentValue.slice(0, -1);
        displayCurrent.textContent = currentValue
    }

}



function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operatorValue === "+") {
        previousValue += currentValue;
    } else if (operatorValue === "-") {
        previousValue -= currentValue;
    } else if (operatorValue === "*") {
        previousValue *= currentValue;
    } else if (operatorValue === "/") {
        previousValue /= currentValue;
    } else if (operatorValue === "^") {
        previousValue = Math.pow(previousValue, currentValue)

    }
    previousValue = previousValue.toString();
    displayCalculator();
    return;


}

function displayCalculator() {
    displayPrevious.textContent = "";
    operatorValue = "";
    currentValue = "";

    if (previousValue.length < 13) {

        displayCurrent.textContent = previousValue;
    } else {
        displayCurrent.textContent = previousValue.slice(0, 14);
    }




}


function addDecimal() {
    if (!currentValue.includes('.')) {
        currentValue = currentValue + '.'
        displayCurrent.textContent = currentValue
    }
}


function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

function handleDelete() {
    if (currentValue !== "") {
        currentValue = currentValue.slice(0, -1);
        displayCurrent.textContent = currentValue;
        if (currentValue === "") {
            displayCurrent.textContent = "0";
        }
    }
    if (currentValue === "" && previousValue !== "" && operatorValue === "") {
        previousValue = previousValue.slice(0, -1);
        displayCurrent.textContent = previousValue;
    }
}
