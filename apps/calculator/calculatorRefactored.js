const { Observable, of, fromEvent, from, pipe } = rxjs;
const { map, concatMap, mergeMap, merge, filter, mergeAll, concat, scan, takeUntil, takeWhile, takeLast } = rxjs.operators;

var display = document.getElementById(`calculator_display_data`)
var keys = document.getElementsByClassName(`calculator_button`)

var keys = Array.from(keys)
var operators = ['+', '-', '*', '÷', 'AC', 'CE']

let clicks = from(keys)
    .pipe(
        mergeMap(elem =>
            fromEvent(elem, 'click')
        ),
        map(e => e.target.textContent)
    )

let isNumber = clicks.pipe(
    filter(value =>
        !isNaN(value)
    )
)

let isOperator = clicks.pipe(
    filter(value =>
        operators.includes(value)
    )
)

let isCalculate = clicks.pipe(
    filter(value => value == '=')
)

var inputs = isNumber
    .pipe(
        merge(isOperator, isCalculate),
        scan((acc, curr) => acc + curr),
        takeWhile(value => !value.includes('='), true)
    )

var expr = inputs.pipe(
    takeLast(1),
    map(val => val.slice(0, -1))
)

inputs.subscribe(expression => display.value = expression)
expr.subscribe(x => display.value = eval(x))