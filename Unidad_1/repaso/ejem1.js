function contarImpar(arr) {
    let pares = 0;
    let impares = 0;

    for (let num of arr) {
        num % 2 === 0 ? pares++ : impares++;
    }

    return { pares, impares };
}

const contarImpares2 = (arr) => {
    let pares = 0;
    let impares = 0;

    for (let num of arr) {
        num % 2 === 0 ? pares++ : impares++;
    }

    return { pares, impares };
};

console.log(contarImpar([1,2,3,4,5,6]));
console.log(contarImpares2([1,2,3,4,5,6]));