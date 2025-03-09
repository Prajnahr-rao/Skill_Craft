let display = document.getElementById('display');
let currentInput = '';
let lastOperator = '';
let lastNumber = '';
let calculationDone = false;

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

function appendNumber(num) {
    if (calculationDone) {
        currentInput = '';
        calculationDone = false;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '' && operator === '-') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    
    if (currentInput !== '') {
        if (lastNumber !== '') {
            calculate();
        }
        lastNumber = currentInput;
        lastOperator = operator;
        currentInput = '';
    } else if (lastNumber !== '') {
        lastOperator = operator;
    }
    calculationDone = false;
}

function appendDecimal() {
    if (calculationDone) {
        currentInput = '0';
        calculationDone = false;
    }
    if (!currentInput.includes('.')) {
        currentInput = currentInput === '' ? '0.' : currentInput + '.';
        updateDisplay();
    }
}

function calculate() {
    if (lastNumber === '' || currentInput === '') return;
    
    let result;
    const num1 = parseFloat(lastNumber);
    const num2 = parseFloat(currentInput);
    
    switch (lastOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                display.value = 'Error: Division by zero';
                clearVariables();
                return;
            }
            result = num1 / num2;
            break;
        case '%':
            result = num1 % num2;
            break;
    }
    
    currentInput = result.toString();
    lastNumber = '';
    lastOperator = '';
    calculationDone = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    lastNumber = '';
    lastOperator = '';
    calculationDone = false;
    updateDisplay();
}

function backspace() {
    if (!calculationDone) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function updateDisplay() {
    let displayValue = currentInput;
    if (lastNumber !== '') {
        displayValue = `${lastNumber} ${lastOperator} ${currentInput}`;
    }
    display.value = displayValue || '0';
}

function clearVariables() {
    currentInput = '';
    lastNumber = '';
    lastOperator = '';
    calculationDone = false;
}
