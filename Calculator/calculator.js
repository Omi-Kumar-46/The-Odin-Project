let display = document.querySelector('p');
let digits = document.querySelectorAll('.digit');
let operator = document.querySelectorAll('.operation');
let screenReset = false;

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        let a = e.target.id;
        if (screenReset) {
            display.textContent = a;
            screenReset = false;
        } else {
            display.textContent += a;
        }

        if (display.textContent === "80085" || display.textContent === "5318008") {
            display.textContent = "Lame Joke 🤡";
            // display.classList.add('shrink-text');
            screenReset = true;
        }
    });
});

let decimal = document.getElementById('.');
decimal.addEventListener('click', (e) => {
    if (screenReset) {
        display.textContent = "0.";
        screenReset = false;
    } else if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
})


let allClear = document.querySelector('#ac');
allClear.addEventListener('click', (e) => {
    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    result = "";
});

let clearEntry = document.querySelector('#delete');
clearEntry.addEventListener('click', (e) => {
    let currentText = display.innerText;
    display.innerText = currentText.slice(0, -1);
})

// Plus/Minus (Negation) button
let plusMinusBtn = document.querySelector('#negation');
plusMinusBtn.addEventListener('click', () => {
    if (display.textContent !== "" && display.textContent !== "0") {
        if (display.textContent.startsWith("-")) {
            display.textContent = display.textContent.slice(1);
        } else {
            display.textContent = "-" + display.textContent;
        }
    }
});

// Percentage button
let percentBtn = document.querySelector('#percent');
percentBtn.addEventListener('click', () => {
    if (display.textContent !== "") {
        let val = parseFloat(display.textContent);
        display.textContent = val / 100;
    }
});

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result;

operator.forEach((op) => {
    op.addEventListener('click', (e) => {
        if (firstNumber != "" && currentOperator != "") {
            if(display.textContent == ""){
                currentOperator = e.target.id;
                return;
            }
                secondNumber = parseFloat(display.textContent);
                result = operate(firstNumber, currentOperator, secondNumber);
                firstNumber = result;
                currentOperator = e.target.id;
                display.textContent = result;
                screenReset = true;

        }

        else {
            firstNumber = parseFloat(display.textContent);
            currentOperator = e.target.id;
            display.textContent = "";
        }

    })
})

let resultBtn = document.getElementById('=');
resultBtn.addEventListener('click', (e) => {
    secondNumber = parseFloat(display.textContent);
    result = operate(firstNumber, currentOperator, secondNumber);
    display.textContent = result;
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    result = "";
})


// Keyboard Buttons Support

window.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9'){
        document.getElementById(e.key)?.click();
    }

    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        document.getElementById(e.key)?.click();
    }

    if(e.key === 'Enter' || e.key === '='){
        document.getElementById('=')?.click();
    }

    if(e.key === '.'){
        document.getElementById('.')?.click();
    }

    if(e.key === 'Backspace'){
        document.getElementById('delete')?.click();
    }

    if(e.key === 'Escape'){
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

        case "*":
            let product = multiply(a, b);
            return product;

        case "/":
            let quotient = divide(a, b);
            return quotient;

        default:
            return "Invalid Operator!!";
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
