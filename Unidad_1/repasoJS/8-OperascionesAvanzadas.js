const ciudades=new Array("Sucre", "LaPaz", "Santa Cruz", "Beni", "Pando", "Oruro");
console.log(ciudades);

//Definir un array de manera abreviada
const paises=["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];
let conteCiudades = ciudades.length;
console.log(`El conteo total de las ciudades es:  ${conteCiudades}`);


// EJERCICIOs
ciudades.shift();//eliminar el primer elemento
console.log(ciudades);
ciudades.pop();//eliminar el ultimo elemento
console.log(ciudades);

console.log(paises.join("-"))//unifica los elementos en una cadena de caracteres
console.log(paises.sort());//lo ordena
