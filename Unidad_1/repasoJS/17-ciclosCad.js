const paises = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];
const precios = [100, 200, 300, 400, 500, 600];
const presupuesto = 250;

const existePasaje = precios.some(precio => precio <= presupuesto);

if (existePasaje) {
    console.log("Puedes comprar el pasaje");
} else {
    console.log("No existe pasaje");
}