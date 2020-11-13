const compose = function (fn) {
    return function f (...arg) {
        if (arg.length === fn.length) {
            return fn(...arg)
        } else {
            return function(...newArg) {
                return f(...arg, ...newArg)
            }
        }
    } 
}

const newAdd = compose(function add (a, b, c, d) { return a + b + c + d });

newAdd(1, 2, 3, 4) // 10

newAdd(1, 2, 3)(4) // 10

newAdd(1)(2)(3)(4) // 10
