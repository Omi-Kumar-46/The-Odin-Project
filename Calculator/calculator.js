const upperScreen = document.querySelector('#upper-screen');
const lowerScreen = document.querySelector('#lower-screen');
let digits = document.querySelectorAll('.digit');
let operator = document.querySelectorAll('.operation');
let screenReset = false;

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        let a = e.target.id;
        if (screenReset) {
            lowerScreen.textContent = a;
            screenReset = false;
        } else if (lowerScreen.textContent === '0') {
            lowerScreen.textContent = a;
        } else {
            lowerScreen.textContent += a;
        }
    });
});

let decimal = document.getElementById('.');
decimal.addEventListener('click', (e) => {
    if (screenReset) {
        lowerScreen.textContent = "0.";
        screenReset = false;
    } else if (!lowerScreen.textContent.includes('.')) {
        lowerScreen.textContent += '.';
    }
})


let allClear = document.querySelector('#ac');
allClear.addEventListener('click', (e) => {
    lowerScreen.textContent = "0";
    upperScreen.textContent = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    result = "";
});

let clearEntry = document.querySelector('#delete');
clearEntry.addEventListener('click', (e) => {
        let currentText = lowerScreen.innerText;
        lowerScreen.innerText = currentText.slice(0, -1);

        if (lowerScreen.textContent === "") {
            lowerScreen.textContent = "0";
        }
    });

// Plus/Minus (Negation) button
let plusMinusBtn = document.querySelector('#negation');
plusMinusBtn.addEventListener('click', () => {
    if (lowerScreen.textContent !== "" && lowerScreen.textContent !== "0") {
        if (lowerScreen.textContent.startsWith("-")) {
            lowerScreen.textContent = lowerScreen.textContent.slice(1);
        } else {
            lowerScreen.textContent = "-" + lowerScreen.textContent;
        }
    }
});

// Percentage button
let percentBtn = document.querySelector('#percent');
percentBtn.addEventListener('click', () => {
    if (lowerScreen.textContent !== "") {
        let val = parseFloat(lowerScreen.textContent);
        lowerScreen.textContent = val / 100;
    }
});

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result;

operator.forEach((op) => {
    op.addEventListener('click', (e) => {
        if (firstNumber != "" && currentOperator != "") {
            if (lowerScreen.textContent === "" || lowerScreen.textContent === '0') {
                currentOperator = e.target.id;
                upperScreen.textContent = `${firstNumber} ${currentOperator}`;
                return;
            }
            secondNumber = parseFloat(lowerScreen.textContent)
            result = operate(firstNumber, currentOperator, secondNumber);
            firstNumber = result;
            currentOperator = e.target.id;
            lowerScreen.textContent = result;
            screenReset = true;

        }

        else {
            firstNumber = parseFloat(lowerScreen.textContent);
            currentOperator = e.target.id;
            upperScreen.textContent = `${firstNumber} ${currentOperator}`;
            lowerScreen.textContent = "0";
        }

    })
})

let resultBtn = document.getElementById('=');
resultBtn.addEventListener('click', (e) => {

    if(firstNumber === "" && currentOperator === "") return;

    secondNumber = parseFloat(lowerScreen.textContent);
    
    result = operate(firstNumber, currentOperator, secondNumber);
    upperScreen.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    lowerScreen.textContent = result;

    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    result = "";
    screenReset = true;
})


// Keyboard Buttons Support

window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        document.getElementById(e.key)?.click();
    }

    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        document.getElementById(e.key)?.click();
    }

    if (e.key === 'Enter' || e.key === '=') {
        document.getElementById('=')?.click();
    }

    if (e.key === '.') {
        document.getElementById('.')?.click();
    }

    if (e.key === 'Backspace') {
        document.getElementById('delete')?.click();
    }

    if (e.key === 'Escape') {
        document.getElementById('ac')?.click();
    }
})

function operate(a, op, b) {
    switch (op) {
        case "+":
            let sum = add(a, b);
            return sum;

        case "-":
            let difference = substract(a, b);
            return difference;

        case "x":
            let product = multiply(a, b);
            return product;

        case "/":
            let quotient = divide(a, b);
            return quotient;

        default:
            return "Invalid Operator";
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b != 0) {
        let ans = a / b;
        return ans.toFixed(3);
    } else {
        return "Invalid";
    }
}
