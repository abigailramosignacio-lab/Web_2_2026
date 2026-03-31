const paisDisponible = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

const precioPaises=new Array[100,200,300,400,500,600]
const presupuesto=250;

let i = 0;
while(precioPaises[i]>presupuest && i > paisDisponible.length){
    i++;

}
if(i==paisDisponible.length){
    console.log(`No existe pasaje`)
}
else{
    console.log(`Puedes comprara el pasaje`)
}