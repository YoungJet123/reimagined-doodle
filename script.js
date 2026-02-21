class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('.btn');
        this.clear();
        this.bindEvents();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.resetOnNextInput = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentValue;
    }

    handleNumber(number) {
        if (this.resetOnNextInput) {
            this.currentValue = number;
            this.resetOnNextInput = false;
        } else {
            if (this.currentValue === '0' && number !== '.') {
                this.currentValue = number;
            } else if (number === '.' && this.currentValue.includes('.')) {
                return;
            } else {
                this.currentValue += number;
            }
        }
        this.updateDisplay();
    }

    handleOperation(op) {
        if (this.operation !== null && !this.resetOnNextInput) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operation = op;
        this.resetOnNextInput = true;
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.currentValue = 'Error';
                    this.updateDisplay();
                    this.resetOnNextInput = true;
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.resetOnNextInput = true;
        this.updateDisplay();
    }

    handleSpecial(key) {
        switch (key) {
            case 'AC':
                this.clear();
                break;
            case '±':
                this.currentValue = (parseFloat(this.currentValue) * -1).toString();
                this.updateDisplay();
                break;
            case '%':
                this.currentValue = (parseFloat(this.currentValue) / 100).toString();
                this.updateDisplay();
                break;
            case '=':
                this.calculate();
                break;
        }
    }

    bindEvents() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                
                if (!isNaN(value) || value === '.') {
                    this.handleNumber(value);
                } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
                    this.handleOperation(value);
                } else {
                    this.handleSpecial(value);
                }
            });
        });
    }
}

// 初始化计算器
new Calculator();