var display = document.getElementById(`calculator_display_data`)
var keys = document.getElementsByClassName(`calculator_button`)
var calculator = document.getElementById('calculator')

const calculate = (n1, operator, n2) => {
    // Perform calculation and return calculated value
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

var keysArray = Array.from(keys)

keysArray.forEach(key => {

    key.addEventListener(`click`, e => {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.value
        const previousKeyType = calculator.dataset.previousKeyType

        // Remove .is-depressed class from all keys
        keysArray.forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.value = keyContent
            } else {
                display.value = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!')

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.value = calcValue

                // Update calculated value as firstValue
                calculator.dataset.firstValue = displayedNum
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add('is-depressed')
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        if (action === 'clear') {
            console.log('clear key!')
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
            display.value = 0;
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'calculate') {
            console.log('equal key!')
            var firstValue = calculator.dataset.firstValue
            var operator = calculator.dataset.operator
            var secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.value = calculate(firstValue, operator, secondValue)
            }

            // Set modValue attribute
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'

        }

    })
})
