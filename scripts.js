let displayValue = '';
let operator = ''
resultValue = 0;
let resultButtonPressedLast = false    //Changes functionally based on whether the `=` button was pressed last

const display = document.getElementById('display');
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', inputNumber)
})

document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', inputOperator)
})

document.querySelectorAll('.result').forEach(item => {
    item.addEventListener('click', calculateResult)
})

function inputNumber(e) {
    if (resultButtonPressedLast) {
        displayValue = '';
        resultValue = 0;
        resultButtonPressedLast = false
    }
    let value = e.target.value
    displayValue = displayValue + value
    display.innerText = displayValue
}

function inputOperator(e) {
    operator = e.target.value
    if (!resultButtonPressedLast) {
        if (resultValue === 0) {
            resultValue = parseInt(displayValue)
        }
        else {
            resultValue = operate(operator, resultValue, parseInt(displayValue))
        }
    }
    else {
        resultButtonPressedLast = false
    }
    displayValue = '';
}

function calculateResult(e) {
    resultValue = operate(operator, resultValue, parseInt(displayValue))
    display.innerText = resultValue
    resultButtonPressedLast = true
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case 'x':
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        default:
            throw "Wrong operator input"
    }
}
