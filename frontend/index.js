import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentValue += value;
            updateDisplay();
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});

function updateDisplay() {
    display.value = currentValue;
}

function clear() {
    currentValue = '';
    operator = '';
    previousValue = '';
    updateDisplay();
}

function handleOperator(op) {
    if (currentValue !== '') {
        if (previousValue !== '') {
            calculate();
        }
        operator = op;
        previousValue = currentValue;
        currentValue = '';
    }
}

async function calculate() {
    if (previousValue !== '' && currentValue !== '' && operator !== '') {
        const x = parseFloat(previousValue);
        const y = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(x, y);
                    break;
                case '-':
                    result = await backend.subtract(x, y);
                    break;
                case '*':
                    result = await backend.multiply(x, y);
                    break;
                case '/':
                    const divisionResult = await backend.divide(x, y);
                    if (divisionResult === null) {
                        throw new Error('Division by zero');
                    }
                    result = divisionResult;
                    break;
            }

            currentValue = result.toString();
            operator = '';
            previousValue = '';
            updateDisplay();
        } catch (error) {
            currentValue = 'Error';
            updateDisplay();
            console.error('Calculation error:', error);
        }
    }
}
