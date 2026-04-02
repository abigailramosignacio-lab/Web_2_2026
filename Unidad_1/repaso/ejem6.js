function numeroMasFrecuente(arr) {
    let contador = {};
    let max = 0;
    let resultado = null;

    for (let num of arr) {
        contador[num] = (contador[num] || 0) + 1;

        if (contador[num] > max) {
            max = contador[num];
            resultado = num;
        }
    }

    return resultado;
}

const numeroMasFrecuenteArrow = (arr) => {
    let contador = {};

    arr.forEach(num => {
        contador[num] = (contador[num] || 0) + 1;
    });

    return Object.keys(contador).reduce((a, b) =>
        contador[a] > contador[b] ? a : b
    );
};

console.log(numeroMasFrecuente([1,2,3,1,2,1]));
console.log(numeroMasFrecuenteArrow([4,5,4,6,4,5]));