let displayValue = '';
let operator = ''
let resultValue = 0;
let resultButtonPressedLast = false;    //Changes functionally based on whether the `=` button was pressed last
let operatorButtonPressedLast = false;  //Prevents user from pressing multiple operator buttons in a row. Only the last operator is saved
let numberBuilding = false;  //True while a number is being built, becomes false after an operator or resultbutton
let minusOperator = false;
let decimalPointExists = false;
const operators = [
    '+',
    '-',
    'x',
    '/',
    '^',
    '*',
    '%',
    '*'
]


const display = document.getElementById('display');
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', inputNumberEvent)
})

document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', inputOperatorEvent)
})

document.querySelectorAll('.result').forEach(item => {
    item.addEventListener('click', calculateResult)
})

const decimal = document.querySelector('.decimal')
decimal.addEventListener('click', decimalPointEvent)

window.addEventListener('keydown', buttonPressed)

function buttonPressed(e){
    let key = e.key;
    if (key.match(/^[0-9]/)) {
        inputNumber(key);
    }
    else if (key === '.'){
         decimalPoint(key);
    }
    else if (operators.includes(key)) 
    {   console.log(key);
        inputOperator(key);
    }
    else if (key === '=' || key === 'Enter'){
        calculateResult();
    }
    else if (key === "Backspace" || key === "Delete") 
    {
        deleteLastCharacter();
    }
}

function inputNumberEvent(e){
    inputNumber(e.target.value)
}

function inputOperatorEvent(e){
    inputOperator(e.target.value)
}

function decimalPointEvent(e){
    decimalPoint(e.target.value) 
}
   
function inputNumber(value) {
    if (resultButtonPressedLast) reset();
    if (displayValue.length >= 15) return;
    displayValue = displayValue + value
    display.innerText = displayValue
    operatorButtonPressedLast = false;
    numberBuilding = true;
}

function deleteLastCharacter(){
    console.log('deleted')
    displayValue = displayValue.substring(0, displayValue.length - 1);
    display.innerText = displayValue
}

function setMinusOperator(){
    if(minusOperator) return;
    displayValue = displayValue + '-'
    display.innerText = displayValue
    minusOperator = true;
}

function decimalPoint(value) {
    if (decimalPointExists) return;
    inputNumber(value)
    decimalPointExists = true;
    decimal.disabled = true;
}

function stopNumberBuilding() {
    numberBuilding = false
    decimalPointExists = false;
    decimal.disabled = false;
    minusOperator = false;
}

function inputOperator(value) {
    if (value === '-' && (!numberBuilding) && !resultButtonPressedLast) {
        setMinusOperator();
        return;
    }
    operator = value
    if(operatorButtonPressedLast || displayValue === '' || displayValue === '.') return;   //Avoids errors when user presses multiple operator buttons in a row

    if (!resultButtonPressedLast) {     //Make intermediate calculations if user inputs multiple operations before pressing results
        if (resultValue === 0) {
            resultValue = parseFloat(displayValue);
        }
        else {
            resultValue = operate(operator, resultValue, parseFloat(displayValue));
        }
    }
    display.innerText = resultValue;
    displayValue = '';
    operatorButtonPressedLast = true;
    resultButtonPressedLast = false;
    stopNumberBuilding()
}

function reset(){
    displayValue = '';
    operator = ''
    resultValue = 0;
    resultButtonPressedLast = false;
    operatorButtonPressedLast = false;
    stopNumberBuilding();
    display.innerText = 0
}

function calculateResult() {
    if(!operator && !minusOperator) {       // Converts the - operator into a a minus sign when needed 
        resultValue = parseFloat(displayValue)
        resultButtonPressedLast = true;
        return;
    }
    else if (operatorButtonPressedLast) displayValue = resultValue

    resultValue = operate(operator, resultValue, parseFloat(displayValue));
    display.innerText = resultValue;
    operatorButtonPressedLast = false;
    resultButtonPressedLast = true;
    stopNumberBuilding();
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
    if (b === 0) return "can not divide by 0 lmao"
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
