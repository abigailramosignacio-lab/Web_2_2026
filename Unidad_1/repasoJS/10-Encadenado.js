const valorPasaje = 1000;
const paisDestino = "Ecuador";
const paisDisponible = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

let edadPasajero = 17;
let acompaniado = true;

console.log(`--- Iniciando proceso de venta para: ${paisDestino} ---`);

// Validación de Destino
if (paisDisponible.includes(paisDestino)) {
    console.log("El destino seleccionado está disponible.");

    // Requisitos de Viaje
    if (edadPasajero >= 18 || acompaniado) {
        console.log("Venta autorizada: Cumple con los requisitos de edad/acompañante.");
        
        // Precio y Beneficios
        if (valorPasaje >= 1000) {
            console.log("¡Felicidades! Por el costo de tu pasaje, incluyes seguro de viaje gratis.");
        }

        console.log("Pasaje procesado con éxito.");
    } else {
        console.log("Venta denegada: El pasajero es menor de edad y viaja solo.");
    }

} else {
    console.log("Lo sentimos, no tenemos vuelos disponibles a este destino.");
}