const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousValue = document.querySelector('[data-previous-value]');
const currentValue = document.querySelector('[data-current-value]');

class Calculator {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        //to stop decimal point after a period
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }
        if (this.currentOperand.length <= 25) {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        //if currnt operand is empty
        if (this.currentOperand === '') {
            return
        }
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let calculatedValue;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) {
            return
        }
        switch (this.operation) {
            case "+":
                calculatedValue = this.add(prev, curr);
                break;
            case "-":
                calculatedValue = this.subtract(prev, curr);
                break;
            case "*":
                calculatedValue = this.multiply(prev, curr);
                break;
            case "/":
                calculatedValue = this.divide(prev, curr);
                break;
            case "%":
                calculatedValue = this.modulo(prev, curr);
                break;
            default:
                return;

        }
        this.currentOperand = calculatedValue
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.'))
        const decimalDigits = stringNumber.split('.')[1]
        const floatNumber = parseFloat(number);
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentValue.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousValue.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousValue.innerText = ''
        }
    }

    add(a, b) {
        let answer = a + b;
        console.log(answer)
        return answer;
    }


    subtract(a, b) {
        let answer = a - b;
        console.log(answer)
        return answer;
    }


    multiply(a, b) {
        let answer = a * b;
        console.log(answer)
        return answer;
    }


    divide(a, b) {
        let answer = a / b;
        console.log(answer)
        return answer;
    }
    modulo(a, b) {
        let answer = a % b;
        console.log(answer)
        return answer;
    }


}

const calculator = new Calculator(previousValue, currentValue);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})