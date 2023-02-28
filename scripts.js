let displayValue = '';
let operator = ''
let resultValue = 0;
let resultButtonPressedLast = false;    //Changes functionally based on whether the `=` button was pressed last
let operatorButtonPressedLast = false;  //Prevents user from pressing multiple operator buttons in a row. Only the last operator is saved
let numberBuilding = false;  //True while a number is being built, becomes false after an operator or resultbutton
let minusOperator = false;

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
    if (resultButtonPressedLast) reset();
    let value = e.target.value
    displayValue = displayValue + value
    display.innerText = displayValue
    operatorButtonPressedLast = false;
    numberBuilding = true;
}

function setMinusOperator(){
    if(minusOperator) return;
    displayValue = displayValue + '-'
    display.innerText = displayValue
    minusOperator = true;
}


function inputOperator(e) {
    if (e.target.value === '-' && (!numberBuilding)) {
        setMinusOperator();
        return;
    }
    
    operator = e.target.value;
    if(operatorButtonPressedLast) return;
    if (!resultButtonPressedLast) {
        if (resultValue === 0) {
            resultValue = parseInt('0' + displayValue);
        }
        else {
            resultValue = operate(operator, resultValue, parseInt(displayValue));
        }
    }
    else {
        resultButtonPressedLast = false;
    }
    display.innerText = resultValue;
    displayValue = '';
    operatorButtonPressedLast = true;
    minusOperator = false;
    numberBuilding = false
}

function reset(){
    displayValue = '';
    operator = ''
    resultValue = 0;
    resultButtonPressedLast = false;
    operatorButtonPressedLast = false;
    minusOperator = false;
    numberBuilding = false
    display.innerText = 0
}

function calculateResult(e) {
    if(!operator && !minusOperator) {
        resultValue = parseInt(displayValue)
        resultButtonPressedLast = true;
        return;
    }
    else if (operatorButtonPressedLast) displayValue = resultValue

    resultValue = operate(operator, resultValue, parseInt(displayValue));
    display.innerText = resultValue;
    operatorButtonPressedLast = false;
    resultButtonPressedLast = true;
    minusOperator = false;
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

function modulo(a,b){
    return a % b
}

function exponent(a,b){
    return a ** b
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
        case '%':
            return modulo(a, b)
        case '^':
            return exponent(a, b)
        default:
            throw "Wrong operator input"
    }
}
