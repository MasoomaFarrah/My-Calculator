document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('output');
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return;
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = keys.dataset.previousKeyType;
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }
        if (action === 'clear') {
            display.textContent = '0';
            keys.dataset.previousKeyType = '';
        }
        if (action === 'backspace') {
            display.textContent = displayedNum.slice(0, -1) || '0';
            keys.dataset.previousKeyType = 'backspace';
        }
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            keys.dataset.previousKeyType = 'operator';
            keys.dataset.firstValue = displayedNum;
            keys.dataset.operator = action;
            display.textContent = '0';
        }
        if (action === 'calculate') {
            const firstValue = keys.dataset.firstValue;
            const operator = keys.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);
            keys.dataset.previousKeyType = 'calculate';
        }
    });
    function calculate(first, operator, second) {
        first = parseFloat(first);
        second = parseFloat(second);
        if (operator === 'add') return first + second;
        if (operator === 'subtract') return first - second;
        if (operator === 'multiply') return first * second;
        if (operator === 'divide') return first / second;
    }
});