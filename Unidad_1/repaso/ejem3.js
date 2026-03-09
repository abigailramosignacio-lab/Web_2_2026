function invertirNumero(num) {
    return parseInt(num.toString().split("").reverse().join(""));
}

const invertirNumero2 = (num) =>
    parseInt(num.toString().split("").reverse().join(""));

console.log(invertirNumero(12345));
console.log(invertirNumero2(9876));