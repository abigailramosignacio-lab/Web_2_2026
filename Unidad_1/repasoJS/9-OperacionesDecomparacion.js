
const valorPasaje=1000;
if(valorPasaje===1000){
    console.log('El pasaje es correcto')
}
const paisDestino ="Ecuador";
const paisDisponible=["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

let edadPäsajero=17;
let acompaniado=true;

console.log(`pasaje para ${paisDestino}`);
if((paisDisponible.indexOf(paisDestino)> -1 && (edadPäsajero>=18)|| acompaniado)){
    console.log("pasaje disponoble para venta");
}
else{
    console.log("no se puede vender el pasaje")
}



//hacer un ejercicio