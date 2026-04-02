function esPrimo(n) {
    if (n <= 1) return false;

    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }

    return true;
}

function obtenerPrimos(arr) {
    let primos = [];

    for (let num of arr) {
        if (esPrimo(num)) {
            primos.push(num);
        }
    }

    return primos;
}

const obtenerPrimos2 = (arr) =>
    arr.filter(num => esPrimo(num));

console.log(obtenerPrimos([1,2,3,4,5,6,7,8,9,10]));
console.log(obtenerPrimos2([1,2,3,4,5,6,7,8,9,10]));