const paisDestino = "Ecuador";
const paisDisponible = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

let valorPasaje = 0; // Corregido el nombre de la variable

// Usando Switch (es más limpio para este caso que muchos if/else)
switch (paisDestino) {
    case "Bolivia":
        valorPasaje = 100;
        break;
    case "Ecuador":
        valorPasaje = 200;
        break;
    case "Brasil":
        valorPasaje = 300;
        break;
    default:
        console.log("No existe pasaje para esa ciudad");
}

// Verificación y salida
if (valorPasaje > 0) {
    // Usando interpolación de texto correctamente
    console.log(`El valor del pasaje es ${valorPasaje}`);
}