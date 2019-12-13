var collection = [1, 2, 3, 4, 5]

// map

function inc() {
    return x + 1
}

// let result = collection.map(function inc() {
//     return x + 1
// }, collection)

// filter

function isString(value) {
    return typeof (value) == 'string'
}

// var result = collection.filter(isString)
// console.log(result)

// reduce

var result = collection.reduce(function sum(acc, curr) {
    let res = acc[0] + curr
    return [...acc, res]
}, [0])

console.log(result)

