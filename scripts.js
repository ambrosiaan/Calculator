let displayValue = '';

const display = document.getElementById('display');
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', inputNumber)
})

function inputNumber(e) {
    let value = e.target.value
    console.log(value)
    displayValue = displayValue + value
    display.innerText = displayValue 
}


function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function operate(operator, a, b){
    switch (operator) {
        case '+':
            return add(a,b)
        case '-':
            return subtract(a,b)
        case 'x':
        case '*':
            return multiply(a,b)
        case '/':
            return divide(a,b)
        default:
            throw "Wrong operator input"
    }
}
