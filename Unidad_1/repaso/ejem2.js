function palabraLarga(frase) {
    let palabras = frase.split(" ");
    let mayor = "";

    for (let palabra of palabras) {
        if (palabra.length > mayor.length) {
            mayor = palabra;
        }
    }

    return mayor;
}

const palabraLarga2 = (frase) =>
    frase.split(" ").reduce((mayor, palabra) =>
        palabra.length > mayor.length ? palabra : mayor
    );

console.log(palabraLarga("Programacion Web es interesante"));
console.log(palabraLarga2("Programacion Web es interesante"));